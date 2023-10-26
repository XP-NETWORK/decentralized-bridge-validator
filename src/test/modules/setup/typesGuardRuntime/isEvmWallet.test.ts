import { expect } from 'chai';
import { isEvmWallet } from "@src/modules/setup/typesGuardRuntime"

describe('isEvmWallet', () => {

    const testCases = [
        {
            input: {
                address: "0x1234567890abcdef1234567890abcdef12345678",
                privateKey: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdef"
            },
            expected: true,
            description: 'should return true for valid EVM wallets'
        },
        {
            input: {
                privateKey: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdef"
            },
            expected: false,
            description: 'should return false for missing address'
        },
        {
            input: {
                address: "0x1234567890abcdef1234567890abcdef12345678"
            },
            expected: false,
            description: 'should return false for missing privateKey'
        },
        {
            input: {
                address: 12345,
                privateKey: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdef"
            },
            expected: false,
            description: 'should return false for invalid address'
        },
        {
            input: {
                address: "0x1234567890abcdef1234567890abcdef12345678",
                privateKey: 12345
            },
            expected: false,
            description: 'should return false for invalid privateKey'
        },
        {
            input: null,
            expected: false,
            description: 'should return false for null input'
        },
        {
            input: 12345,
            expected: false,
            description: 'should return false for non-object input'
        },
        {
            input: "0x1234567890abcdef1234567890abcdef12345678",
            expected: false,
            description: 'should return false for non-object input'
        },
        {
            input: {},
            expected: false,
            description: 'should return false for empty object input'
        },
        {
            input: [],
            expected: false,
            description: 'should return false for empty array input'
        },
    ];

    beforeEach(() => {
        console.info = () => { };
    });


    testCases.forEach(({ input, expected, description }) => {
        it(description, () => {
            expect(isEvmWallet(input)).to.equal(expected);
        });
    });
});
