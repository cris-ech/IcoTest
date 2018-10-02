pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/crowdsale/validation/CappedCrowdsale.sol";
import "openzeppelin-solidity/contracts/crowdsale/emission/MintedCrowdsale.sol";
import "openzeppelin-solidity/contracts/token/ERC20/MintableToken.sol";

/**
 * @title SampleCrowdsaleToken
 * @dev Very simple ERC20 Token that can be minted.
 * It is meant to be used in a crowdsale contract.
 * Using an external smart contract now 
 
 --test in the future this--
 
contract SampleCrowdsaleToken is ERC20Mintable {

  string public constant name = "Sample Crowdsale Token";
  string public constant symbol = "SCT";
  uint8 public constant decimals = 18;
}

*/

/**
 * @title SampleCrowdsale
 * @dev This is an example of a fully fledged crowdsale.
 * The way to add new features to a base crowdsale is by multiple inheritance.
 * In this example we are providing following extensions:
 * CappedCrowdsale - sets a max boundary for raised funds
 *
 *
 * After adding multiple features it's good practice to run integration tests
 * to ensure that subcontracts works together as intended.
 */

contract SampleCrowdsale is CappedCrowdsale, MintedCrowdsale {

  constructor(
    uint256 rate,
    address wallet,
    uint256 cap,
    ERC20 token //address of the token

  )
    public
    Crowdsale(rate, wallet, token)
    CappedCrowdsale(cap)

  {

  }
}