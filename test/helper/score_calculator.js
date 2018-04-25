const getPlayerEventScore = function (player, eventType, eventMajorColor, eventMinorColor) {
    const part = player.parts[eventType];
    const eventMajorColorSkillLevels = part.skills.filter(skill => skill.color === eventMajorColor).map(skill => skill.level);
    let majorColorSkillLevelSum = eventMajorColorSkillLevels.length === 0 ? 0 : eventMajorColorSkillLevels.reduce((a, b) => a + b);

    const eventMinorColorSkillLevels = part.skills.filter(skill => skill.color === eventMinorColor).map(skill => skill.level);
    let minorColorSkillLevelSum = eventMinorColorSkillLevels.length === 0 ? 0 : eventMinorColorSkillLevels.reduce((a, b) => a + b);

    if (player.isThemeSingular()) {
        return part.level + (majorColorSkillLevelSum * 4) + (minorColorSkillLevelSum * 2);
    } else {
        return part.level + (majorColorSkillLevelSum * 3) + (minorColorSkillLevelSum * 1);
    }
};

const getEventScores = function (players, eventType, eventMajorColor, eventMinorColor) {
    const getEventScores = [0, 0, 0, 0];
    for (let i = 0; i < players.length; i++) {
        getEventScores[Math.floor(i / (players.length / 4))] += getPlayerEventScore(players[i], eventType, eventMajorColor, eventMinorColor);
    }
    return getEventScores;
};

module.exports = {
    getPlayerEventScore, getEventScores
};
