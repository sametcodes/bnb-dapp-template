const hre = require("hardhat");

async function main() {
  const contract2 = await hre.ethers.getContractFactory("Todo");
  const deployedContract2 = await contract2.deploy();
  await deployedContract2.deployed();
  console.log(deployedContract2.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });