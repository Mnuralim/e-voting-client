import { getContract } from "thirdweb";
import {
  NFTContractAbi,
  NFTContractAddress,
  smartContractAbi,
  smartContractAddress,
} from "@/lib/constant";
import { client } from "@/lib/thirdweb-client";
import { arbitrumSepolia } from "thirdweb/chains";

export const contract = getContract({
  address: smartContractAddress,
  chain: arbitrumSepolia,
  client: client,
  abi: smartContractAbi,
});

export const nftContract = getContract({
  address: NFTContractAddress,
  chain: arbitrumSepolia,
  client: client,
  abi: NFTContractAbi,
});
