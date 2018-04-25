pragma solidity ^0.4.18;

import "truffle/Assert.sol";
import "../contracts/GoCryptobotRandom.sol";

contract TestGoCryptobotRandom is GoCryptobotRandom {
    function testShuffle() public {
        uint8[] memory deck = new uint8[](128);

        _initRandom();

        for (uint8 i = 0; i < deck.length; i++) {
            deck[i] = i;
        }

        uint gasUsage = msg.gas;
        _shuffle(deck);
        gasUsage = gasUsage - msg.gas;

        Assert.isAtMost(gasUsage, 180000, "gasUsage of _shuffle() should not exceeds 180000");

        bool[] memory flag = new bool[](deck.length);
        for (i = 0; i < deck.length; i++) {
            if (flag[deck[i]]) {
                Assert.fail("deck crached while _shuffle()");
            }
            flag[deck[i]] = true;
        }
    }
}
