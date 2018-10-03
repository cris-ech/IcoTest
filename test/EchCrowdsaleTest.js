const path = require('path');
const fs = require('fs-extra');
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

//path that contain the compiled contract
const crowdsalePath = path.resolve('.','build','EchCrowdsale.json');
//console.log(crowdsalePath);
//reading the information 
const sourceCrowdsale = JSON.parse(fs.readFileSync(crowdsalePath,'utf8'));
//console.log(typeof(sourceCrowdsale));
const crowsaleInterface = sourceCrowdsale.abi;
//console.log(crowsaleInterface);
const crowsaleBytecode = JSON.stringify(sourceCrowdsale.bytecode);
//console.log(typeof(crowsaleBytecode));


const tokenPath = path.resolve('.','build','EchToken.json');
//reading the information 
const sourceToken = JSON.parse(fs.readFileSync(tokenPath,'utf8'));
//console.log(typeof(sourceCrowdsale));
const tokenInterface = sourceToken.abi;
//console.log(crowsaleInterface);
//const tokenBytecode = web3.utils.toHex(JSON.stringify(sourceToken.bytecode));
const tokenBytecode = sourceToken.bytecode;

console.log(web3.utils.isHex(tokenBytecode));
console.log(tokenBytecode);

let accounts;
let EchToken;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  console.log(accounts);

  EchToken = await new web3.eth.Contract(tokenInterface)
    .deploy({ data: tokenBytecode
 })
    .send({from: accounts[0], gas:'4500000'});
});

describe('EchToken', () => {
  it('deploys a contract', () => {
    assert.ok(EchToken.options.address);
  });
  
});     
/*
* example code 

let accounts;
let inbox;

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();

  // Use one of those accounts to deploy
  // the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: ['Hi there!']
    })
    .send({ from: accounts[0], gas: '1000000' });
});

describe('Inbox', () => {
  it('deploys a contract', () => {
    assert.ok(inbox.options.address);
  });

  it('has a default message', async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, 'Hi there!');
  });

  it('can change the message', async () => {
    await inbox.methods.setMessage('bye').send({ from: accounts[0] });
    const message = await inbox.methods.message().call();
    assert.equal(message, 'bye');
  });
});
*/