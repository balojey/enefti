const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const uuid = require("uuid")
const { initiateUserControlledWalletsClient } = require("@circle-fin/user-controlled-wallets");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(cors())
const port = process.env.PORT || 3000;

const client = initiateUserControlledWalletsClient({
  apiKey: process.env.CIRCLE_API_KEY,
});

// Create a new user
app.get("/create-user", async (req, res) => {
  try {
    await createUser();
    res.send("User created successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating user");
  }
});

// Create session token
app.get("/create-token", async (req, res) => {
  try {
    const response = await createSessionToken();
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating session token");
  }
});

// Create Challenge for Wallet Creation
app.post("/create-challenge-wallet", async (req, res) => {
  const { userId, userToken } = req.body;

  try {
    const challengeId = await createChallengeForWalletCreation(userId, userToken);
    res.json({ challengeId });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating challenge for wallet creation");
  }
});

// List user wallets
app.post("/wallets", async (req, res) => {
  const { userId, userToken } = req.body;
  console.log(userId, userToken);
  try {
    const wallets = await listWallets(userId, userToken);
    res.json({ wallets });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error listing wallets");
  }
});

// Create Challenge for SCA Wallet Creation
app.get("/create-challenge-sca-wallet", async (req, res) => {
  try {
    const challengeId = await createChallengeForSCAWalletCreation();
    res.json({ challengeId });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating challenge for SCA wallet creation");
  }
});

// Fetch Wallet Balance
app.post("/fetch-wallet", async (req, res) => {
  const { walletId, userToken, userId } = req.body;
  try {
    const tokenBalances = await fetchWallet(walletId, userToken, userId);
    res.json({ tokenBalances });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching wallet");
  }
});

// Create Challenge for Outbound Transfer
app.post("/create-challenge-outbound-transfer", async (req, res) => {
  const { amount, destinationAddress, walletId, userId, userToken } = req.body
  try {
    const challengeId = await createChallengeForOutboundTransfer(amount, destinationAddress, walletId, userId, userToken);
    res.json({ challengeId });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating challenge for outbound transfer");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Functions from your script

async function createUser() {
  let response = await client.createUser({
    userId: "User_SCA",
  });
}

async function createSessionToken() {
  let response = await client.createUserToken({
    userId: "User_SCA",
  });
  return response.data;
}

async function createChallengeForWalletCreation(userId, userToken) {
  let response = await client.createUserPinWithWallets({
    idempotencyKey: uuid.v4(),
    userId: userId,
    blockchains: ["ETH-SEPOLIA"],
    userToken: userToken,
  });
  return response.data?.challengeId;
}

async function createChallengeForSCAWalletCreation() {
  let response = await client.createUserPinWithWallets({
    userId: "User_SCA",
    blockchains: ["ETH-SEPOLIA"],
    accountType: "SCA",
    userToken: process.env.USER_TOKEN_2,
  });
  return response.data?.challengeId;
}

async function fetchWallet(walletId, userToken, userId) {
  let response = await client.getWalletTokenBalance({
    walletId: walletId,
    userToken: userToken,
    userId: userId,
  });
  return response.data?.tokenBalances;
}

async function listWallets(userId, userToken) {
  let response = await client.listWallets({
    userId: userId,
    // userToken: userToken,
  });
  return response.data?.wallets;
}

async function createChallengeForOutboundTransfer(amount, destinationAddress, walletId, userId, userToken) {
  let response = await client.createTransaction({
    idempotencyKey: uuid.v4(),
    amounts: [amount],
    destinationAddress: destinationAddress,
    walletId: walletId,
    userId: userId,
    fee: {
      type: "level",
      config: {
        feeLevel: "MEDIUM",
      },
    },
    userToken: userToken,
  });
  return response.data?.challengeId;
}

