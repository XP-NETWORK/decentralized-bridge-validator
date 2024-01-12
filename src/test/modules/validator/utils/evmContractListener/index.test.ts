import { expect } from 'chai';
import sinon from 'sinon';
import { Repository } from 'typeorm';
import Web3 from 'web3';
import { Block } from '@src/db/entity/Block';
import { evmContractListener } from '@src/modules/validator/utils'; // Import your function here
import { LogEntry } from '@src/modules/validator/utils/evmContractListener/types'; // Import your types here
import { AppDataSource } from '@src/db/data-source';
import { BLOCK_CHUNKS } from '@src/config/chainSpecs';

describe('evmContractListener', () => {
    afterEach(() => {
        sinon.restore();
    });

    const testCases = [
        {
            description:
                'should handle logs and update the last block when there are logs',
            contractAddress: '0xContract1',
            rpcURL: 'mockRpcURL',
            lastBlock_: 0,
            chain: 'mockChain',
            logs: ['Log1', 'Log2'],
            handleLog: async ({ log }: { log: LogEntry }) => {
                console.info(log);
            },
            expectedLastBlock: 110,
            latestBlock: BigInt('110'),
        },
        {
            description:
                'should handle logs and update the last block when there are no logs',
            contractAddress: '0xContract1',
            rpcURL: 'mockRpcURL',
            lastBlock_: 0,
            chain: 'mockChain',
            logs: [],
            handleLog: async ({ log }: { log: LogEntry }) => {
                console.info(log);
            },
            expectedLastBlock: 110,
            latestBlock: BigInt('110'),
        },
        {
            description:
                'should use BLOCK_CHUNKS if the latest block is greater than the BLOCK_CHUNKS size, and no previous logs were read',
            contractAddress: '0xContract1',
            rpcURL: 'mockRpcURL',
            lastBlock_: 0,
            chain: 'mockChain',
            logs: [],
            handleLog: async ({ log }: { log: LogEntry }) => {
                console.info(log);
            },
            expectedLastBlock: BLOCK_CHUNKS,
            latestBlock: BigInt(BLOCK_CHUNKS + 56745),
        },
        {
            description:
                'should use BLOCK_CHUNKS + lastBlock_ if the latest block is greater than BLOCK_CHUNKS + lastBlock_, and previous logs were read',
            contractAddress: '0xContract1',
            rpcURL: 'mockRpcURL',
            lastBlock_: 5000,
            chain: 'mockChain',
            logs: [],
            handleLog: async ({ log }: { log: LogEntry }) => {
                console.info(log);
            },
            expectedLastBlock: BLOCK_CHUNKS + 5000,
            latestBlock: BigInt(BLOCK_CHUNKS + 56757 + 5000),
        },
    ];

    testCases.forEach(
        ({
            description,
            contractAddress,
            rpcURL,
            lastBlock_,
            chain,
            handleLog,
            expectedLastBlock,
            latestBlock,
            logs,
        }) => {
            it(description, async () => {
                const getBlockNumberStub = sinon.stub().resolves(latestBlock);
                const getPastLogsStub = sinon.stub().resolves(logs);

                Object.setPrototypeOf(
                    Web3,
                    sinon.stub().returns({
                        request: sinon.stub().resolves(),
                        use: sinon.stub().returns({
                            getBlockNumber: getBlockNumberStub,
                            getPastLogs: getPastLogsStub,
                        }),
                    }),
                );

                const blockRepositorySaveStub = sinon.stub();
                const blockRepositoryFindOneStub = sinon
                    .stub()
                    .resolves({ chain, contractAddress });

                blockRepositorySaveStub.resolves({
                    chain,
                    contractAddress,
                    lastBlock: expectedLastBlock,
                }); // Simulate saving the block instance

                sinon.stub(AppDataSource, 'getRepository').returns({
                    findOne: blockRepositoryFindOneStub,
                    save: blockRepositorySaveStub,
                } as unknown as Repository<Block>);

                await evmContractListener({
                    contractAddress,
                    rpcURL,
                    lastBlock_,
                    chain,
                    handleLog,
                });

                expect(getBlockNumberStub.calledOnce).to.be.true;
                expect(
                    getPastLogsStub.calledOnceWith({
                        fromBlock: lastBlock_,
                        toBlock: expectedLastBlock,
                        address: contractAddress,
                    }),
                ).to.be.true;
                expect(
                    blockRepositoryFindOneStub.calledOnceWith({
                        where: { chain, contractAddress },
                    }),
                ).to.be.true;
                expect(
                    blockRepositorySaveStub.calledOnceWith({
                        chain,
                        contractAddress,
                        lastBlock: expectedLastBlock,
                    }),
                ).to.be.true;
            });
        },
    );
});
