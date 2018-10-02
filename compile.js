const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

console.log(buildPath);
const tokenPath = path.resolve(__dirname, 'contracts', 'EchToken.sol');
//const EchCrowsalePath = path.resolve(__dirname, 'contracts', 'EchCrowdsale.sol');
console.log(tokenPath);

const source = fs.readFileSync(tokenPath, 'utf8');
console.log(source);
const output = solc.compile(source, 1).contracts;
module.exports = solc.compile(source, 1).contracts[':Echtoken'];
console.log(output);
/*
const source2 = fs.readFileSync(EchCrowsalePath, 'utf8');
const output2 = solc.compile(source2, 1).contracts;
*/
fs.ensureDirSync(buildPath);


  fs.outputJsonSync(
    path.resolve(buildPath,'prueba.json'),
    output
  );

/*
for (let contract in output2) {
    fs.outputJsonSync(
      path.resolve(buildPath, contract.replace(':', '') + '.json'),
      output2[contract]
    );  
}
*/