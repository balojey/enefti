import { W3SSdk } from '@circle-fin/w3s-pw-web-sdk';
import axios from 'axios';
import { v4 as uuid4 } from "uuid"

let circleSDK = new W3SSdk()

const appId = import.meta.env.VITE_CIRCLE_APP_ID
circleSDK.setAppSettings({
    appId,
})

const createUser = (userId) => {
    const options = {
        method: 'POST',
        url: import.meta.env.VITE_CIRCLE_API + '/users',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            authorization: 'Bearer ' + import.meta.env.VITE_CIRCLE_API_KEY
        },
        data: {userId: userId}
    };

    return axios
    .request(options)
    .then(function (response) {
        console.log(response.data);
    })
    .catch(function (error) {
        console.error(error);
        return null
    });
}

const getUser = (userId) => {
    const options = {
        method: 'GET',
        url: import.meta.env.VITE_CIRCLE_API + `/users/${userId}`,
        headers: {accept: 'application/json', authorization: 'Bearer ' + import.meta.env.VITE_CIRCLE_API_KEY}
    };

    return axios
    .request(options)
    .then(function (response) {
        return response.data.data.user
    })
    .catch(function (error) {
        console.error(error);
        return null
    });
}

const createUserToken = (userId) => {
    const options = {
        method: 'POST',
        url: import.meta.env.VITE_CIRCLE_API + '/users/token',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            authorization: 'Bearer ' + import.meta.env.VITE_CIRCLE_API_KEY
        },
        data: {userId: userId}
    };

    return axios
    .request(options)
    .then(function (response) {
        const { userToken, encryptionKey } = response.data.data
        return {userToken: userToken, encryptionKey: encryptionKey}
    })
    .catch(function (error) {
        console.error(error);
        return null
    });
}

const getUserStatus = (userToken) => {
    const options = {
        method: 'GET',
        url: import.meta.env.VITE_CIRCLE_API + '/user',
        headers: {accept: 'application/json', 'X-User-Token': userToken, authorization: 'Bearer ' + import.meta.env.VITE_CIRCLE_API_KEY}
    };

    return axios
    .request(options)
    .then(function (response) {
        const user = response.data.data.user
        console.log(user);
        return user
    })
    .catch(function (error) {
        console.error(error);
        return null
    });
}

const generateChallengeId = (userId, userToken) => {
    const options = {
    method: 'POST',
    url: import.meta.env.VITE_BACKEND_API + "/create-challenge-wallet",
    data: {
        userId: userId,
        userToken: userToken
    }
    };

    return axios
    .request(options)
    .then(function (response) {
        return response.data.challengeId
    })
    .catch(function (error) {
        console.error(error);
    });
}

const listWallets = (userId) => {
    const options = {
    method: 'GET',
    url: import.meta.env.VITE_CIRCLE_API + '/wallets?blockchain=ETH-SEPOLIA&userId=' + new URLSearchParams(userId).toString().slice(0, -1),
    headers: {
        accept: 'application/json',
        authorization: 'Bearer ' + import.meta.env.VITE_CIRCLE_API_KEY
    }
    };

    return axios
    .request(options)
    .then(function (response) {
        const wallets = response.data.data.wallets
        // console.log(wallets);
        return wallets
    })
    .catch(function (error) {
        console.error(error);
    });
}

const useFaucet = (address) => {
    const options = {
    method: 'POST',
    url: import.meta.env.VITE_CIRCLE_FAUCET_API,
    headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: 'Bearer ' + import.meta.env.VITE_CIRCLE_API_KEY
    },
    data: {
        blockchain: 'ETH-SEPOLIA',
        native: false,
        usdc: true,
        eurc: false,
        address: address
    }
    };

    return axios
    .request(options)
    .then(function (response) {
        console.log(response.data);
    })
    .catch(function (error) {
        console.error(error);
    });
}

const getTokenBalances = (userId, userToken, walletId) => {
    // const options = {
    // method: 'POST',
    // url: import.meta.env.VITE_BACKEND_API + "/fetch-wallet",
    // data: {
    //     userId: userId,
    //     userToken: userToken,
    //     walletId: walletId
    // }
    // };

    // return axios
    // .request(options)
    // .then(function (response) {
    //     const tokenBalances = response.data.tokenBalances
    //     // console.log(tokenBalances);
    //     return tokenBalances
    // })
    // .catch(function (error) {
    //     console.error(error);
    // });

    const options = {
        method: 'GET',
        url: import.meta.env.VITE_CIRCLE_API + `/wallets/${walletId}/balances`,
        headers: {
            accept: 'application/json',
            authorization: 'Bearer ' + import.meta.env.VITE_CIRCLE_API_KEY
        },
        data: {
            userToken: userToken,
        }
    };

    return axios
    .request(options)
    .then(function (response) {
        return response.data.data.tokenBalances
    })
    .catch(function (error) {
        console.error(error);
    });
}

const getChallengeIdForOutboundTransfer = async (amount, destinationAddress, walletId, userId, userToken, tokenId) => {
    const options = {
    method: 'POST',
    url: import.meta.env.VITE_BACKEND_API + "/create-challenge-outbound-transfer",
    data: {
        userId: userId,
        userToken: userToken,
        walletId: walletId,
        amount: amount,
        destinationAddress: destinationAddress,
        tokenId: tokenId
    }
    };

    return axios
    .request(options)
    .then(function (response) {
        return response.data.challengeId
    })
    .catch(function (error) {
        console.error(error);
    });
}

export { circleSDK, createUser, createUserToken, getUser, getUserStatus, generateChallengeId, listWallets, useFaucet, getTokenBalances, getChallengeIdForOutboundTransfer }