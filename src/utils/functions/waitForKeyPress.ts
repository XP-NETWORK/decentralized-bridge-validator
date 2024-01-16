import * as readline from 'readline';

function waitForKeyPress(promt: string): Promise<void> {
    return new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        rl.question(promt, () => {
            rl.close();
            resolve();
        });
    });
}

export default waitForKeyPress;
