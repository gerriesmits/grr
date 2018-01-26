pragma solidity ^0.4.11;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';
import 'zeppelin-solidity/contracts/token/ERC20Basic.sol';

contract BookBonus is Ownable {

	function award(address _destination,uint _amountETH, address _token, uint _amountToken) public onlyOwner {
		assert(_destination.send(_amountETH));
		if (_token != 0){
			ERC20Basic GrrToken = ERC20Basic(_token);
			assert(GrrToken.transfer(_destination,_amountToken));
		}
	}

}

