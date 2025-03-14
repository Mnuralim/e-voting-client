import { getContract } from "thirdweb";
import {
  NFTContractAbi,
  NFTContractAddress,
  smartContractAbi,
  smartContractAddress,
} from "@/lib/constant";
import { client } from "@/lib/thirdweb-client";
import { sepolia } from "thirdweb/chains";

export const contract = getContract({
  address: smartContractAddress,
  chain: sepolia,
  client: client,
  abi: smartContractAbi,
});

export const nftContract = getContract({
  address: NFTContractAddress,
  chain: sepolia,
  client: client,
  abi: NFTContractAbi,
});
