import { expect } from 'chai';
import sinon from 'sinon';
import promtDisplayHelp, {
    PromtDisplayHelpStatements,
} from '@src/modules/setup/components/promtDisplayHelp';

describe('promtDisplayHelp', () => {
    it('should display help information', () => {
        const consoleInfoStub = sinon.stub(console, 'info');

        try {
            promtDisplayHelp();

            // Check if console.info was called with the expected messages
            expect(consoleInfoStub.callCount).to.equal(6);
            expect(
                consoleInfoStub
                    .getCall(0)
                    .calledWithExactly(PromtDisplayHelpStatements.statement1),
            ).to.be.true;
            expect(
                consoleInfoStub
                    .getCall(1)
                    .calledWithExactly(PromtDisplayHelpStatements.statement2),
            ).to.be.true;
            expect(
                consoleInfoStub
                    .getCall(2)
                    .calledWithExactly(PromtDisplayHelpStatements.statement3),
            ).to.be.true;
            expect(
                consoleInfoStub
                    .getCall(3)
                    .calledWithExactly(PromtDisplayHelpStatements.statement4),
            ).to.be.true;
            expect(
                consoleInfoStub
                    .getCall(4)
                    .calledWithExactly(PromtDisplayHelpStatements.statement5),
            ).to.be.true;
            expect(
                consoleInfoStub
                    .getCall(5)
                    .calledWithExactly(PromtDisplayHelpStatements.statement6),
            ).to.be.true;
        } finally {
            // Restore the stubbed console.info function
            consoleInfoStub.restore();
        }
    });
});
