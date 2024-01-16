import { expect } from 'chai';
import { isGeneratedWallets } from '@src/modules/setup/typesGuardRuntime';
import { mockWallets } from '@src/test/mockData';

describe('isGeneratedWallets', () => {
    const testCases = [
        {
            input: null,
            expected: false,
            description: 'should return false for null input',
        },
        {
            input: undefined,
            expected: false,
            description: 'should return false for undefined input',
        },
        {
            input: 123,
            expected: false,
            description: 'should return false for number input',
        },
        {
            input: 'string',
            expected: false,
            description: 'should return false for string input',
        },
        {
            input: {},
            expected: false,
            description: 'should return false for empty object input',
        },
        {
            input: { randomProp: 'value' },
            expected: false,
            description:
                'should return false for objects without evmWallet property',
        },
        {
            input: { evmWallet: {} },
            expected: false,
            description:
                'should return false for objects with invalid evmWallet structure',
        },
        {
            input: { evmWallet: { address: '0x1234' } },
            expected: false,
            description:
                'should return false for objects with invalid evmWallet structure',
        },
        {
            input: mockWallets,
            expected: true,
            description:
                'should return true for valid IGeneratedWallets structure',
        },
    ];

    beforeEach(() => {
        console.info = () => {};
    });

    testCases.forEach(({ input, expected, description }) => {
        it(description, () => {
            expect(isGeneratedWallets(input)).to.equal(expected);
        });
    });
});
