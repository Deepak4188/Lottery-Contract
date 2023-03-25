// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Lottery {
    address payable public manager;
    address[] public players;

    constructor() {
        manager = payable(msg.sender);
    }

    function enter() public payable {
        require(msg.value > 0.01 ether);
        players.push(msg.sender);
    }

    function random() private view returns (uint256) {
        return
            uint256(
                keccak256(
                    abi.encodePacked(block.prevrandao, block.timestamp, players)
                )
            );
    }

    function pickWinner() public restricted {
        address winningAcc = players[random() % players.length];
        payable(winningAcc).transfer(
            address(this).balance - address(this).balance / 10
        );
        manager.transfer(address(this).balance);
        players = new address[](0);
    }

    function getPlayers() public view returns (address[] memory) {
        return players;
    }

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
}