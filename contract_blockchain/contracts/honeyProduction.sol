// SPDX-License-Identifier: MIT
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

pragma solidity ^0.8.13;

contract HONEYPRODUCTION is Ownable {

// HoneyFeatures
    struct Honey{
        uint serialNumber;
        uint packagingDate;
        uint quantityWeight;
        string honeyType;
        address Producer;
        bool sold;
    }

//    todo: Maybe later
//    enum Suit{CLOVER,
//            WILDFLOWER,
//            DANDELION,
//            ORANGEBLOSSOM,
//            LINDEN,
//            ACACIA,
//            MANUKA,
//            TUPELO,
//            BUCKWHEAT,
//            SAGE,
//            EUCALYPTUS,
//            SOURWOOD}

    uint public serialNumber;

    mapping(address => bool) public permitted;

    // Mapping the production packages.
    mapping(uint => Honey) private honeyInfo;

    // Mapping of ownerShip
    mapping(address => uint[]) private ownerShipId;

    function producePackage(uint _quantityWeight, string memory _honeyType) public onlyPermitted{
        require(_quantityWeight > 0, 'Minimum weight should be 1 grams');

        // Inputting data
        honeyInfo[serialNumber].serialNumber = serialNumber;
        honeyInfo[serialNumber].packagingDate = block.timestamp;
        honeyInfo[serialNumber].quantityWeight = _quantityWeight;
        honeyInfo[serialNumber].honeyType = _honeyType;
        honeyInfo[serialNumber].Producer = msg.sender;

        // ownerShipId input
        ownerShipId[msg.sender].push(serialNumber);

        serialNumber++;
    }

    //selling a product onlyOwner of the product
    function sellProduct(uint _serialNumber) public onlyProducer(_serialNumber){
        // checking the honeyExists
        require(_serialNumber < serialNumber, "Invalid serial Number");
        // checking the product is not Sold
        require(honeyInfo[_serialNumber].sold == false, "The product is sold already");
        // actions to sell/mark consume
        honeyInfo[_serialNumber].sold = true;
    }

    function modifyInfo(uint _serialNumber, uint _quantityWeight, string memory _honeyType) public onlyProducer(_serialNumber){
        require(_quantityWeight > 0, 'Minimum weight should be 1 grams');
        require(honeyInfo[_serialNumber].sold == false, 'Product already sold');
        // Inputting data
        honeyInfo[_serialNumber].quantityWeight = _quantityWeight;
        honeyInfo[_serialNumber].honeyType = _honeyType;
    }

    // Getting information of the producer
    function getProducerInfo(address _producerAddress) public view returns(uint[] memory){
        return ownerShipId[_producerAddress];
    }

    // getting Honey Information
    function getHoneyInfo(uint _serialNumber) public view returns(Honey memory){
        require(_serialNumber < serialNumber, 'Sno. does not exists');
        return honeyInfo[_serialNumber];
    }

    // Granting access
    function permitAccess(address _producerAddress) public onlyOwner{
        require(permitted[_producerAddress] == false, 'Already permitted');
        permitted[_producerAddress] = true;
    }

    // Granting access
    function revokeAccess(address _producerAddress) public onlyOwner{
        require(permitted[_producerAddress] == true, 'No Access');
        permitted[_producerAddress] = false;
    }

    modifier onlyProducer(uint _serialNumber){
        require(msg.sender == honeyInfo[_serialNumber].Producer, "You are not the owner");
        _;
    }

    modifier onlyPermitted(){
        require(permitted[msg.sender] == true, 'No permission to produce package');
        _;
    }
}