const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("Development Test workflow", function () {

    before( async () =>{
        //  Getting list of signers
        [ContractOwner, ...producer] =  await ethers.getSigners();
        const HONEYPRODUCTION = await ethers.getContractFactory("HONEYPRODUCTION");
        hp  = await HONEYPRODUCTION.deploy();
        // Storing contract address
        contractAddress = hp.address

    });

    describe('Basic Contract Deployment', () => {

        it('Contract owner is correct', async function () {
            expect(await hp.owner()).to.equal(ContractOwner.address);
        });

        it('Contract deployed address is not null', async function () {
            expect(hp.address).not.equal(0);
        });
    });

    describe('Giving Access to Producer_0 and Producer_1', () => {

        it('Only Contract Owner can give grant or revoke Access', async function () {
            await expect(hp.connect(producer[0]).permitAccess(producer[0].address)).to.revertedWith('Ownable: caller is not the owner');
        });

        it('Cannot Revoke Permit without initially granting Access (for Producer_0)', async function () {
            await expect(hp.revokeAccess(producer[0].address)).to.revertedWith('No Access');
        });

        it('Granting Access to Producer_0 and Producer_1', async function () {
            await hp.permitAccess(producer[0].address);
            await hp.permitAccess(producer[1].address);
        });

        it('Once granted access, it cannot be granted again', async function () {
            await expect(hp.permitAccess(producer[0].address)).to.revertedWith('Already permitted');
        });


    });

    describe('Producing honey', () => {

        it('Producer_0 cannot produce honey (type: CLOVER, amount: 100), because no access', async function () {
            await expect(hp.connect(producer[3]).producePackage(100, "CLOVER")).to.revertedWith('No permission to produce package');
        });

        it('Cannot produce honey with zero ammount', async function () {
            await expect(hp.connect(producer[0]).producePackage(0, "CLOVER")).to.revertedWith('Minimum weight should be 1 grams');
        });

        it('Producing by producer 0 a honey (type: CLOVER, amount: 100)', async function () {
            await hp.connect(producer[0]).producePackage(100, "CLOVER");
        });

        it('Honey created exists, with correct values', async function () {
            let response = await hp.getHoneyInfo(0);
            expect(response.serialNumber).eq(0);
            expect(response.quantityWeight).eq(100);
            expect(response.honeyType).eq('CLOVER');
            expect(response.Producer).eq(producer[0].address);
            expect(response.sold).eq(false);
        });

        it('Producing by producer 1 a honey (type: DANDELION, amount: 1000), and Verifying the information', async function () {
            await hp.connect(producer[1]).producePackage(1000, "DANDELION");
            let response = await hp.getHoneyInfo(1);
            expect(response.serialNumber).eq(1);
            expect(response.quantityWeight).eq(1000);
            expect(response.honeyType).eq('DANDELION');
            expect(response.Producer).eq(producer[1].address);
            expect(response.sold).eq(false);
        });

        it('Cannot get honey Information if no Sno exists', async function () {
            await expect(hp.getHoneyInfo(5)).to.revertedWith('Sno. does not exists');
        });
    });

    describe('Selling Honey', () => {
        it('Only owner can sell honey', async function () {
            await expect(hp.connect(producer[1]).sellProduct(0)).to.be.revertedWith('You are not the owner');
        });

        it('Selling the honey', async function () {
            await hp.connect(producer[0]).sellProduct(0);
        });

        it('The sold honey cannot be re-sold', async function () {
            await expect(hp.connect(producer[0]).sellProduct(0)).to.be.revertedWith('The product is sold already');
        });

        it('Verifying the information of serial_ID:0, which was just sold = true', async function () {
            let response = await hp.getHoneyInfo(0);
            expect(response.serialNumber).eq(0);
            expect(response.quantityWeight).eq(100);
            expect(response.honeyType).eq('CLOVER');
            expect(response.Producer).eq(producer[0].address);
            expect(response.sold).eq(true);
        });

        it('Revoking permission for Producer_1', async function () {
            await hp.revokeAccess(producer[1].address);
        });

        it('Selling the honey produced by Producer_1 (After Revoke)', async function () {
            await hp.connect(producer[1]).sellProduct(1);
        });
    });

    describe('Modifying data', () => {

        it('Producing by producer_0 a new honey package (type: BUCKWHEAT, amount: 1000)', async function () {
            await hp.connect(producer[0]).producePackage(1000, "BUCKWHEAT");
        });

        it('Honey created exists, with some values, But Producer realised Type and amount is user input error', async function () {
            let response = await hp.getHoneyInfo(2);
            expect(response.serialNumber).eq(2);
            expect(response.quantityWeight).eq(1000);
            expect(response.honeyType).eq('BUCKWHEAT');
            expect(response.Producer).eq(producer[0].address);
            expect(response.sold).eq(false);
        });

        it('Only correct producer (i.e. Producer_0) can modify the package correct: (type: SOURWOOD, amount: 100)', async function () {
            await expect(hp.connect(producer[1]).modifyInfo(2,100, "SOURWOOD")).to.revertedWith('You are not the owner');
        });

        it('Modify package correct: (Serial no: 2, type: SOURWOOD, amount: 100)', async function () {
            await hp.connect(producer[0]).modifyInfo(2,100, "SOURWOOD");
        });

        it('Modify package correct: (Serial no: 2, type: SOURWOOD, amount: 100)', async function () {
            let response = await hp.getHoneyInfo(2);
            expect(response.serialNumber).eq(2);
            expect(response.quantityWeight).eq(100);
            expect(response.honeyType).eq('SOURWOOD');
            expect(response.Producer).eq(producer[0].address);
            expect(response.sold).eq(false);
        });

        it('Selling the honey produced Sno. 2', async function () {
            await hp.connect(producer[0]).sellProduct(2);
        });

        it('Cannot Modify if the product sold (Sno. 2)', async function () {
            await expect(hp.connect(producer[0]).modifyInfo(2,1000, "SOURWOOD")).to.revertedWith('Product already sold');
        });

    });
});