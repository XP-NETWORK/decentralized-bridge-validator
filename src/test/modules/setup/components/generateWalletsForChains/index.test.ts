import { expect } from 'chai';
import sinon from 'sinon';
import { HDNodeWallet, ethers } from 'ethers';
import { promises as fs } from 'fs';
import { generateWalletsForChains } from '@src/modules/setup/components';
import * as utils from '@src/utils/functions';
import { mockWallets } from '@src/test/mockData';


describe('generateWalletsForChains', () => {
    beforeEach(() => {
        console.info = () => { }; // Override console.info to do nothing
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should return existing secrets if they are valid', async () => {

        sinon.stub(utils, "readJsonFile").resolves(mockWallets);

        const result = await generateWalletsForChains();
        expect(result).to.deep.equal(mockWallets);
    });

    it('should generate new secrets if existing secrets are invalid', async () => {
        sinon.stub(utils, "readJsonFile").resolves({ invalid: 'data' });
        sinon.stub(ethers.Wallet, 'createRandom').returns({
            address: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdef",
            privateKey: "0x1234567890123456789012345678901234567890123456789012345678901234"
        } as unknown as HDNodeWallet);

        const writeFileStub = sinon.stub(fs, 'writeFile').resolves();

        const result = await generateWalletsForChains();
        expect(writeFileStub.calledOnce).to.be.true;
        expect(result.evmWallet).to.have.property('address');
        expect(result.evmWallet).to.have.property('privateKey');
    });

    it('should generate new secrets if no secrets file is found', async () => {
        sinon.stub(utils, "readJsonFile").rejects(new Error('File not found'));
        sinon.stub(ethers.Wallet, 'createRandom').returns({
            address: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdef",
            privateKey: "0x1234567890123456789012345678901234567890123456789012345678901234"
        } as unknown as HDNodeWallet);

        const writeFileStub = sinon.stub(fs, 'writeFile').resolves();

        const result = await generateWalletsForChains();
        expect(writeFileStub.calledOnce).to.be.true;
        expect(result.evmWallet).to.have.property('address');
        expect(result.evmWallet).to.have.property('privateKey');
    });
});
