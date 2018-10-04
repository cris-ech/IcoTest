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

//console.log(web3.utils.isHex(tokenBytecode));
//console.log(tokenBytecode);

let accounts;
let EchToken;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  //console.log(accounts);

  EchToken = await new web3.eth.Contract(tokenInterface)
    .deploy({ data: tokenBytecode
 })
    .send({from: accounts[0], gas:'4500000'});
});

describe('EchToken', () => {
  it('deploys a contract', () => {
    assert.ok(EchToken.options.address);
  });
  
  it('can mint tokens', async () => {
    await EchToken.methods.mint(accounts[2],1000).send({from: accounts[0]});
    const n_tokens = await EchToken.methods.balanceOf(accounts[2]).call();
    assert.equal(n_tokens, 1000);
    
  });

  it('Only owner can mint', async () => {
    let canMint = false;
    try{
    canMint = await EchToken.methods.mint(accounts[2],1000).send({from: accounts[1]});
    }
    catch(err){
    assert.equal(canMint,false);
    }
  });

  it('change owner', async () => {
    const oldOwner = await EchToken.methods.owner().call();

    await EchToken.methods.transferOwnership(accounts[2]).send({from: accounts[0]});
    const newOwner = await EchToken.methods.owner().call();

    assert.equal(oldOwner, accounts[0]);
    assert.equal(newOwner, accounts[2]);
    
  });

  it('Total suply correct', async () => {
    await EchToken.methods.mint(accounts[2],1000).send({from: accounts[0]});
    const n_tokens = await EchToken.methods.totalSupply().call();
    assert.equal(n_tokens, 1000);
    
  });  

  it('transfer user to user', async () => {
    //mint 1000 tokens for user 2
    await EchToken.methods.mint(accounts[2],1000).send({from: accounts[0]});
    let n_tokens_1 = await EchToken.methods.balanceOf(accounts[1]).call();
    let n_tokens_2 = await EchToken.methods.balanceOf(accounts[2]).call();
    assert.equal(n_tokens_1, 0);
    assert.equal(n_tokens_2, 1000);

    await EchToken.methods.transfer(accounts[1], 500).send({from: accounts[2]});
    n_tokens_1 = await EchToken.methods.balanceOf(accounts[1]).call();
    n_tokens_2 = await EchToken.methods.balanceOf(accounts[2]).call();
    assert.equal(n_tokens_1, 500);
    assert.equal(n_tokens_2, 500);    

    
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