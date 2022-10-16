var Migrations = artifacts.require("Migrations");
var Hello = artifacts.require("Hello");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(Hello);
};