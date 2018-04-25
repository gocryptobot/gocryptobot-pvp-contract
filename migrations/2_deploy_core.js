var GoCryptobotCore = artifacts.require("./GoCryptobotCore.sol");

module.exports = function(deployer) {
  deployer.deploy(GoCryptobotCore);
};
