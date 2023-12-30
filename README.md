# E-Voting-System-using-Blockchain

Follow the steps below to download, install, and run this project.

## Demo
### [Link to the Video Demo](https://drive.google.com/file/d/18w5Ra3OL_k5fINXPxJ2M5MPHGAe9EGzQ/view?usp=drive_link)

## Dependencies
- NPM: https://nodejs.org
- Truffle: https://github.com/trufflesuite/truffle
- Ganache: http://truffleframework.com/ganache/
- Metamask: https://metamask.io/


## Step 1. Clone the project
`git clone <URL>`

## Step 2. Install dependencies
```
$ cd election
$ npm install
```
## Step 3. Start Ganache
Open the Ganache GUI client that you downloaded and installed. This will start your local blockchain instance. 

## Step 4. Compile & Deploy Election Smart Contract
`$ truffle migrate --reset`
You must migrate the election smart contract each time your restart ganache.

## Step 5. Configure Metamask
- Unlock Metamask
- Connect metamask to your local Etherum blockchain provided by Ganache.
- Import an account provided by ganache.

## Step 6. Run the Front End Application
`$ npm install`
`$ npm run dev`
Visit this URL in your browser: http://localhost:3000
