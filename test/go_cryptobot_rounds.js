const GoCryptobotCore = artifacts.require("GoCryptobotCore.sol");

const { Player } = require("./helper/random_player_generator");
const { getEventScores } = require("./helper/score_calculator");

contract("GoCryptobotRounds", function (accounts) {
    it("run()", async function () {
        const core = await GoCryptobotCore.deployed();
        
        const players = [];
        let num = 128;
        while (num--) {
            players.push(new Player());
        }
        const data = ["0x", ...players.map(player => player.toHex())].join("");

        await core.commitment();

        const receipt = await core.run(data, [3, 2, 1, 0], [[1, 2], [2, 1], [3, 4], [4, 3]]);
        const roundFinishedLogs = receipt.logs.filter(log => log.event === "RoundFinished");
        const helperTotalScores = [0, 0, 0, 0];
        for (log of roundFinishedLogs) {
            const { eventType, eventMajorColor, eventMinorColor } = log.args;
            const contractScores = [
                log.args.scoreA.toNumber(),
                log.args.scoreB.toNumber(),
                log.args.scoreC.toNumber(),
                log.args.scoreD.toNumber()
            ];
            const helperScores = getEventScores(players, eventType.toNumber(), eventMajorColor.toNumber(), eventMinorColor.toNumber());

            assert.deepEqual(contractScores, helperScores);

            helperTotalScores[0] += helperScores[0];
            helperTotalScores[1] += helperScores[1];
            helperTotalScores[2] += helperScores[2];
            helperTotalScores[3] += helperScores[3];
        }

        const allFinishedLog = receipt.logs.find(log => log.event === "AllFinished");
        const contractTotalScores = [
            allFinishedLog.args.scoreA.toNumber(),
            allFinishedLog.args.scoreB.toNumber(),
            allFinishedLog.args.scoreC.toNumber(),
            allFinishedLog.args.scoreD.toNumber()
        ];
        assert.deepEqual(contractTotalScores, helperTotalScores);
    });
});