import { InjectedConnector } from "@web3-react/injected-connector"
import { WalletConnectConnector } from "@web3-react/walletconnect-connector"
import { WalletLinkConnector } from "@web3-react/walletlink-connector"

const INFURA_ID = 'cde6e09b8a0742c59f07920306215aa4'

const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42]
});


const WalletConnect = new WalletConnectConnector({
  // rpcUrl: `https://mainnet.infura.io/v3/${INFURA_ID}`,
  rpc: { 1: `https://mainnet.infura.io/v3/${INFURA_ID}` },
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
 });

 const CoinbaseWallet = new WalletLinkConnector({
  url: `https://mainnet.infura.io/v3/${INFURA_ID}`,
  appName: "Web3-react Demo",
  supportedChainIds: [1, 3, 4, 5, 42],
 });

export const connectors = {
  injected: injected,
  walletConnect: WalletConnect,
  coinbaseWallet: CoinbaseWallet
};