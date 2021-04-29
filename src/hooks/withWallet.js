// import React, { useEffect, useState } from 'react'

// import { Map } from 'immutable'

// import Web3 from 'web3'
// import Onboard from 'bnc-onboard'

// import config from "../mainnet.multiple.config.json"

// import Engine from '../utils/Engine'

// let web3
// let onboard
// let engine
// let network
// let address
// let syncer

// const withWallet = (WrappedComponent) => {

//   return (props) => {

//     const [state, setState] = useState(Map({}))

//     const [loggedIn, setLoggedIn] = useState(false)

//     const [walletSelected, setWalletSelected] = useState(true)

//     const selectWallet = async () => {

//         const walletSelected = await onboard.walletSelect();

//         if (walletSelected) {

//           const walletChecked = await onboard.walletCheck();

//           if (!walletChecked) {

//             selectWallet()

//           } else {

//             setLoggedIn(true)

//           }

//         } else {

//           selectWallet()

//         }

//     }

//     // init application
//     useEffect(() => {

//       init()

//       async function init () {

//         onboard = Onboard({
//           dappId: config.blocknative, // [String] The API key created by step one above
//           networkId: config.network, // [Integer] The Ethereum network ID your Dapp uses.
//           subscriptions: {
//             address: async _address => {

//               address = _address

//               if (!_address) {

//                 return await selectWallet()

//               } else if (network == config.network) {

//                 engine = engine ? engine : new Engine(web3, setState)

//                 engine.sync(address)

//                 if (!syncer) syncer = setInterval(() => engine.sync(), 7500)

//               }

//             },
//             network: async _network => {

//               network = _network

//               if (address && _network == config.network) {

//                 engine = engine ? engine : new Engine(web3, setState)

//                 engine.sync(address)

//                 if (!syncer) syncer = setInterval(() => engine.sync(address), 7500)

//               } else if (_network != config.network) {

//                 selectWallet()

//               }

//             },
//             wallet: async wallet => {

//               if (wallet.name == undefined) return

//               web3 = new Web3(wallet.provider)

//               engine = new Engine(web3, setState)

//               engine.wallet = wallet.name

//             },
//           },
//           walletSelect: {
//             wallets: [
//               { walletName: "metamask", preferred: true },
//               { walletName: "walletConnect", preferred: true, infuraKey: config.infuraKey },
//             ]
//           }
//         });
//       }

//       selectWallet()

//     }, [])

//     return (
//       <>
//         <WrappedComponent
//           {...props}
//           hasMetamask={!!window.ethereum}
//           selectWallet={selectWallet}
//           network={network}
//           walletSelected={walletSelected}
//           web3={web3}
//           engine={engine}
//           loggedIn={loggedIn}
//           state={state}
//         />
//       </>
//     )
//   }
// }

// export default withWallet