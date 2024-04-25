import { circleSDK, createUser, createUserToken, generateChallengeId, listWallets, getChallengeIdForOutboundTransfer } from "./circle";


const createNewUser = async (user) => {
    // add user to circle
    await createUser(user.email);

    // Create Wallet
    await createWallet(user.email)
}

const createWallet = async (userId) => {
  // Acquire user token and encryption key
  const { userToken, encryptionKey } = await createUserToken(userId);

  // Initialize new user's account and acquire the challenge id
  const challengeId = await generateChallengeId(userId, userToken)

  // Pass to Sdk for pin creation and security questions
  await execute(userToken, encryptionKey, challengeId)
}

const execute = async (userToken, encryptionKey, challengeId) => {
  circleSDK.setAuthentication({
    userToken,
    encryptionKey,
  })
  console.log("Authenticated!")
  circleSDK.execute(challengeId, (error, result) => {
    console.log("In execute")
      if (error) {
        console.log(
          `${error?.code?.toString() || 'Unknown code'}: ${
            error?.message ?? 'Error!'
          }`
        )

        return
      }

      console.log(`Challenge: ${result.type}`)
      console.log(`status: ${result.status}`)

      if (result.data) {
        console.log(`signature: ${result.data?.signature}`)
      }
  })
}

const getWallet = async (userId) => {
  const wallets = await listWallets(userId);
  const wallet = wallets[0]
  return wallet
}

const transact = async (userId, amount, destinationAddress) => {
  const wallet = await getWallet(userId)
  const { userToken, encryptionKey } = await createUserToken(userId)
  const challengeId = await getChallengeIdForOutboundTransfer(amount, destinationAddress, wallet.id, userId, userToken)
  await execute(userToken, encryptionKey, challengeId)
}

export { createNewUser, createWallet, getWallet, transact }