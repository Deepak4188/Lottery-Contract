const path = require('path');
const fs = require('fs');
const solc = require('solc');
const lotteryPath = path.resolve(__dirname, 'Contracts', 'Lottery.sol');
const source = fs.readFileSync(lotteryPath, 'utf8');


const input = {
    language: "Solidity",
    sources: {
        "Lottery.sol": {
            content: source,
        },
    },
    settings: {
        outputSelection: {
            "*": {
                "*": ["*"],
            },
        },
    },
};
const output = JSON.parse(solc.compile(JSON.stringify(input)));

const outputContracts = output.contracts["Lottery.sol"]['Lottery'];


module.exports.abi = outputContracts.abi;
module.exports.bytecode = outputContracts.evm.bytecode.object;