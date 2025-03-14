import { createWallet } from "thirdweb/wallets";

export const supportedWallets = [
  createWallet("io.metamask"),
  createWallet("com.okex.wallet"),
  createWallet("com.bitget.web3"),
];
