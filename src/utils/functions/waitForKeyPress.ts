import * as readline from 'readline';

async function waitForKeyPress(promt: string): Promise<void> {
    await new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        rl.question(promt, () => {
            rl.close();
            resolve(undefined);
        });
    });
}

export default waitForKeyPress;
