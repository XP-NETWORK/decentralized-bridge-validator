const promtDisplayHelp = () => {
    console.log('Usage:');
    console.log('  npm run dev [options]');
    console.log('\nOptions:');
    console.log('  --testnet         Setup for testnet environment');
    console.log('  --help            Display this help message and exit');
    console.log('\nBy default, without any options, the script sets up for production.');
};

export default promtDisplayHelp