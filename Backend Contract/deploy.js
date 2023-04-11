const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { abi, bytecode } = require("./compile.js");


const provider = new HDWalletProvider(
  // Recovery phrase (Mnemonics) for metamask
  // infura API Goerli Ethereum test network link
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("Attempting to deploy from account: ", accounts[0]);

  const result = await new web3.eth.Contract(abi)
    .deploy({ data: bytecode })
    .send({ from: accounts[0], gas: "1000000" });
  
  console.log(abi);
  console.log("Contract deployed at address: ", result.options.address);
  provider.engine.stop();
};
deploy();
