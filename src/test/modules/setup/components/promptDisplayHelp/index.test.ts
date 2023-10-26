import { expect } from 'chai';
import sinon from 'sinon';
import promtDisplayHelp from '@src/modules/setup/components/promtDisplayHelp';

describe('promtDisplayHelp', () => {
    it('should display help information', () => {
        const consoleInfoStub = sinon.stub(console, 'info');

        try {
            promtDisplayHelp();

            // Check if console.info was called with the expected messages
            expect(consoleInfoStub.callCount).to.equal(6);
            expect(consoleInfoStub.getCall(0).calledWithExactly('Usage:')).to.be.true
            expect(consoleInfoStub.getCall(1).calledWithExactly('  npm run dev [options]')).to.be.true
            expect(consoleInfoStub.getCall(2).calledWithExactly('\nOptions:')).to.be.true
            expect(consoleInfoStub.getCall(3).calledWithExactly('  --testnet         Setup for testnet environment')).to.be.true
            expect(consoleInfoStub.getCall(4).calledWithExactly('  --help            Display this help message and exit')).to.be.true
            expect(consoleInfoStub.getCall(5).calledWithExactly('\nBy default, without any options, the script sets up for production.')).to.be.true
        } finally {
            // Restore the stubbed console.info function
            consoleInfoStub.restore();
        }
    });
});
