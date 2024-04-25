# Enefti - An NFT Marketplace

[Project Description](https://www.notion.so/ENEFTI-An-NFT-Marketplace-3767c4b83aaa455d8c0672baa13d8dd7)

[Live app](https://enefti-5d110.web.app/)

Enefti is an NFT marketplace that integrates circle’s programmable user-controlled wallets to streamline the challenges of wallet creation, and token transactions.

Due to the focus of the application being on the display of how Circle’s User Programmable Wallets work, Firestore was utilized for the storage of NFTs and their metadata.

## Setup

1. Prerequisites:
    * Nodejs
2. Clone repository:
    `git clone https://github.com/balojey/enefti`
3. Install dependencies
    `cd enefti && npm install`
4. Populate `.env` file with the following
```bash
# CIRCLE
VITE_CIRCLE_API_KEY=""
VITE_CIRCLE_APP_ID=""
VITE_BACKEND_API=""
VITE_CIRCLE_API=""
VITE_CIRCLE_FAUCET_API=""

# FIREBASE
VITE_FIREBASE_API_KEY=""
VITE_FIREBASE_AUTH_DOMAIN=""
VITE_FIREBASE_PROJECT_ID=""
VITE_FIREBASE_STORAGE_BUCKET=""
VITE_FIREBASE_MESSAGING_SENDER_ID=""
VITE_FIREBASE_APP_ID=""
```
5. Run development server
    `npm run dev`
6. Build application
    `npm run build`

This application was built with [React](https://react.dev) through [Vite](https://vitejs.dev), made beautiful with [Material UI](https://mui.com/material-ui) and hosted on [firebase](https://firebase.google.com).
