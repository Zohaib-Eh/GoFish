import { abi } from "@/app/api/abi";
import { Contract } from "ethers";
import { getProvider } from "./ether";

export const CONTRACT_ADDRESS = "0x01BBcf7461398Cb13AAC1D4B28FC917037AD750A";

export const CONTRACT_ABI = abi;

export const getContract = () => {
  const provider = getProvider();
  return new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
};

export const getSignedContract = async (signer) => {
  return new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
};
