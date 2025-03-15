import { getContract } from "thirdweb";
import {
  NFTContractAbi,
  NFTContractAddress,
  smartContractAbi,
  smartContractAddress,
} from "@/lib/constant";
import { client } from "@/lib/thirdweb-client";
import { baseSepolia } from "thirdweb/chains";

export const contract = getContract({
  address: smartContractAddress,
  chain: baseSepolia,
  client: client,
  abi: smartContractAbi,
});

export const nftContract = getContract({
  address: NFTContractAddress,
  chain: baseSepolia,
  client: client,
  abi: NFTContractAbi,
});
