pragma solidity ^0.4.18;

import "truffle/Assert.sol";
import "../contracts/GoCryptobotRounds.sol";

contract TestGoCryptobotRounds is GoCryptobotRounds {
    function testRound() public {
        bytes memory playerData = new bytes(128 * PLAYER_SIZE);
        initialize(playerData);
        uint8 eventType = 1;
        uint8 eventMajorColor = 0;
        uint8 eventMinorColor = 4;

        uint gasUsage = msg.gas;
        _round(playerData, EventType(eventType), EventColor(eventMajorColor), EventColor(eventMinorColor));
        gasUsage = gasUsage - msg.gas;

        Assert.isAtMost(gasUsage, 270000, "gasUsage of _round() should not exceeds 270000");
    }

    function initialize(bytes playerData) private pure {
        for (uint i = 0; i < 128; i++) {
            playerData[i * PLAYER_SIZE] = byte(1);
            for (uint j = 0; j < 4; j++) {
                playerData[i * PLAYER_SIZE + PLAYER_BASE_SIZE + j * PART_SIZE + 0] = byte(60); // Part Level
                playerData[i * PLAYER_SIZE + PLAYER_BASE_SIZE + j * PART_SIZE + 1] = byte(1); // Part Skill 1 - Color
                playerData[i * PLAYER_SIZE + PLAYER_BASE_SIZE + j * PART_SIZE + 2] = byte(4); // Part Skill 1 - Level
                playerData[i * PLAYER_SIZE + PLAYER_BASE_SIZE + j * PART_SIZE + 3] = byte(1); // Part Skill 2 - Color
                playerData[i * PLAYER_SIZE + PLAYER_BASE_SIZE + j * PART_SIZE + 4] = byte(3); // Part Skill 2 - Level
                playerData[i * PLAYER_SIZE + PLAYER_BASE_SIZE + j * PART_SIZE + 5] = byte(1); // Part Skill 3 - Color
                playerData[i * PLAYER_SIZE + PLAYER_BASE_SIZE + j * PART_SIZE + 6] = byte(2); // Part Skill 3 - Level
            }
        }
    }
}