## Smart contract 1: PvP mode

### Background Information 1: admission condition

Each PvP match admits 128 cryptobots. The match is a competition among 4 teams and each teams has 32 cryptobots. The player has to choose one team to participate. Only the cryprotobots with their all 4 parts higher than level 5 are eligible for the match.

### Background Information 2: rules

* PvP points

The part of the cryptobot that you’re using for the match (either head, body, legs or booster) will be given points depending on its level. The total team score will be the sum of the points of each cryptobot. This means the higher level your cryptobot part is, the higher your contribution to the team. For example, AI is required for the PvP bowling match, so the level of the head of each cryptobot will determine the number of points. Tug-of-war requires strength (body part), racing requires speed (legs part), and high jumping requires power (booster part).

* Lucky color

Each match has two lucky colors; this is an information that is given to the players prior to the match. The smart contract chooses one as the luckier color (the probability is 0.5). Those parts that match the lucky color get extra points and the parts that match the lucky color chosen by the smart contract get additional extra points.

### Points calculation (actual smart contract)

The total number of points that a part contributes is the sum of:  
   `Part’s level`  
   \+ `the sum of the skill level, if the part has either of the two lucky colors`  
   \+ `the sum of the skill level, if the part has either of the two lucky colors and the cryptobot has theme effect`  
   \+ `the sum of the skill level multiplied by 2, if the part has the lucky color chosen by the smart contract`  
