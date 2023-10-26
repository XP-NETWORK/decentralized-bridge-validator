const promtDisplayHelp = () => {
    console.info('Usage:');
    console.info('  npm run dev [options]');
    console.info('\nOptions:');
    console.info('  --testnet         Setup for testnet environment');
    console.info('  --help            Display this help message and exit');
    console.info('\nBy default, without any options, the script sets up for production.');
};

export default promtDisplayHelp