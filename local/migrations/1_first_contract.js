const DataHashing = artifacts.require("DataHashing");

module.exports = function(deployer) {
  deployer.deploy(DataHashing);
};