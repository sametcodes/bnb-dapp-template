// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

contract Counter {
    uint256 value = 0;

    event Increased(uint _increase, uint _value);
    event Decreased(uint _decrease, uint _value);
    function increase() public {
        value++;
        emit Increased(1, value);
    }

    function decrease() public {
        value--;
        emit Decreased(1, value);
    }

    function reset() public {
        value = 0;
    }

    function viewValue() public view returns (uint256) {
        return value;
    }
}