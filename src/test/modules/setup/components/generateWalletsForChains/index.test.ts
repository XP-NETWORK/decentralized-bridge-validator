import { expect } from 'chai';
import sinon from 'sinon';
import { HDNodeWallet, ethers } from 'ethers';
import { promises as fs } from 'fs';
import { generateWalletsForChains } from '@src/modules/setup/components';
import * as utils from '@src/utils/functions';
import { mockWallets } from '@src/test/mockData';

describe('generateWalletsForChains', () => {
    beforeEach(() => {
        console.info = () => {}; // Override console.info to do nothing
    });

    afterEach(() => {
        sinon.restore();
    });

    const testCases = [
        {
            description: 'should return existing secrets if they are valid',
            readJsonFileStubResolves: mockWallets,
            expectedWriteFileCalled: false,
        },
        {
            description: 'should generate new secrets if existing secrets are invalid',
            readJsonFileStubResolves: { invalid: 'data' },
            expectedWriteFileCalled: true,
        },
        {
            description: 'should generate new secrets if no secrets file is found',
            readJsonFileStubRejects: new Error('File not found'),
            expectedWriteFileCalled: true,
        },
    ];

    testCases.forEach(({ description, readJsonFileStubResolves, readJsonFileStubRejects, expectedWriteFileCalled }) => {
        it(description, async () => {
            const readJsonFileStub = sinon.stub(utils, 'readJsonFile');
            if (readJsonFileStubResolves) {
                readJsonFileStub.resolves(readJsonFileStubResolves);
            } else if (readJsonFileStubRejects) {
                readJsonFileStub.rejects(readJsonFileStubRejects);
            }

            const writeFileStub = sinon.stub(fs, 'writeFile').resolves();

            sinon.stub(ethers.Wallet, 'createRandom').returns({
                address: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdef',
                privateKey: '0x1234567890123456789012345678901234567890123456789012345678901234',
            } as unknown as HDNodeWallet);

            const result = await generateWalletsForChains();
            expect(writeFileStub.calledOnce).to.equal(expectedWriteFileCalled);
            if (expectedWriteFileCalled) {
                expect(result.evmWallet).to.have.property('address');
                expect(result.evmWallet).to.have.property('privateKey');
            }
        });
    });
});
