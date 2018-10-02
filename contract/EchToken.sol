pragma solidity ^0.4.24;

import "node_modules/openzeppelin-solidity/contracts/token/ERC20/MintableToken.sol";
import "node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";

/**
 * @title EchToken
 * @dev Very simple ERC20 mintable token to use in a crowdsale
 */
contract  EchToken is MintableToken, Ownable {

  string public constant name = "EchToken";
  string public constant symbol = "ECH";
  uint8 public constant decimals = 18;


}