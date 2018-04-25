class Skill {
    constructor({ level, color }) {
        this.level = level || Math.floor(Math.random() * 4) + 1;
        this.color = color || Math.floor(Math.random() * 4) + 1;
    }

    toHex() {
        const { level, color } = this;
        return `0${color}0${level}`;
    }
}

const NUM_OF_COLOR = 4;
const MAX_LEVEL = 50;
const NUM_OF_THEME = 3;

class Part {
    constructor({ type, color, level, theme }) {
        this.type = type || Math.floor(Math.random() * 4) + 1;
        this.color = color || Math.floor(Math.random() * NUM_OF_COLOR) + 1;
        this.level = level || Math.floor(Math.random() * MAX_LEVEL) + 1;
        this.theme = theme || Math.floor(Math.random() * NUM_OF_THEME) + 1;
        this.skills = [new Skill({ color: this.color })];
        (Math.random() > 0.5) && this.skills.push(new Skill({ color: this.color }));
        (Math.random() > 0.5) && this.skills.push(new Skill({ color: this.color }));
    }

    toHex() {
        const { type, color, level, skills } = this;
        const levelHex = level < 0x10 ? `0${level.toString(16)}` : level.toString(16);
        return [`${levelHex}`,
                skills[0].toHex(),
                skills[1] ? skills[1].toHex() : "0000",
                skills[2] ? skills[2].toHex() : "0000"].join("");
    }
}

class Player {
    constructor() {
        this.parts = [
            new Part({ type: 1 }),
            new Part({ type: 2 }),
            new Part({ type: 3 }),
            new Part({ type: 4 })
        ];
    }

    isColorSingular() {
        const colors = this.parts.map(part => part.color);
        return colors.findIndex(color => color !== colors[0]) === -1;
    }

    isThemeSingular() {
        const themes = this.parts.map(part => part.theme);
        return themes.findIndex(theme => theme !== themes[0]) === -1;
    }

    toHex() {
        const { parts } = this;
        const themeEffect = parts.filter(part => part.theme === parts[0].theme).length === parts.length ? 1 : 0;
        return `0${themeEffect}${this.parts.map(part => part.toHex()).join("")}`;
    }
}

exports.Skill = Skill;
exports.Part = Part;
exports.Player = Player;
