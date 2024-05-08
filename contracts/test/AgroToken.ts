import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("AgroToken", function () {
  async function initFixture() {
    // Get signers
    const [deployer, userOne, userTwo, userThree] = await ethers.getSigners();
    // Deploy contracts
    const usdTokenContractFactory = await ethers.getContractFactory("USDToken");
    const usdTokenContract = await usdTokenContractFactory.deploy();
    const agroTokenContractFactory = await ethers.getContractFactory(
      "AgroToken"
    );
    const agroTokenContract = await agroTokenContractFactory.deploy();
    // Send usd tokens to users
    await usdTokenContract
      .connect(deployer)
      .transfer(userOne, ethers.parseEther("1000"));
    await usdTokenContract
      .connect(deployer)
      .transfer(userTwo, ethers.parseEther("1000"));
    return {
      deployer,
      userOne,
      userTwo,
      userThree,
      usdTokenContract,
      agroTokenContract,
    };
  }

  it("Should support the main flow", async function () {
    const { userOne, userTwo, usdTokenContract, agroTokenContract } =
      await loadFixture(initFixture);
    // Create token
    await expect(
      agroTokenContract
        .connect(userOne)
        .create(
          ethers.parseEther("420"),
          usdTokenContract.getAddress(),
          "ipfs://"
        )
    ).to.be.not.reverted;
    const tokenId = (await agroTokenContract.getNextTokenId()) - 1n;
    // Make investment
    await expect(
      usdTokenContract
        .connect(userTwo)
        .approve(agroTokenContract.getAddress(), ethers.MaxUint256)
    ).to.be.not.reverted;
    await expect(
      agroTokenContract.connect(userTwo).makeInvestment(tokenId)
    ).to.changeTokenBalances(
      usdTokenContract,
      [userOne, userTwo],
      [ethers.parseEther("420"), ethers.parseEther("-420")]
    );
    // Return investment
    await expect(
      usdTokenContract
        .connect(userOne)
        .approve(agroTokenContract.getAddress(), ethers.MaxUint256)
    ).to.be.not.reverted;
    await expect(
      agroTokenContract
        .connect(userOne)
        .returnInvestment(tokenId, ethers.parseEther("690"))
    ).to.changeTokenBalances(
      usdTokenContract,
      [userOne, userTwo],
      [ethers.parseEther("-690"), ethers.parseEther("690")]
    );
  });
});
