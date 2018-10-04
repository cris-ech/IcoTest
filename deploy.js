const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const contractname = require('./build/'); //fix after 

const provider = new HDWalletProvider( "mnemonic" , 
	"infura key"
); //fix after
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(contractname.interface)
  )
    .deploy({ data: contractname.bytecode })
    .send({ gas: '1000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
};
deploy();