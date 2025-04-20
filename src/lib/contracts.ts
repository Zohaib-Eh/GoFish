import { abi } from "@/app/api/abi";
import { Contract } from "ethers";
import { getProvider } from "./ether";

export const CONTRACT_ADDRESS = "0x2ef03b9ca261c4D230b4914E70F1333e46963B7A";

export const CONTRACT_ABI = abi;

export const getContract = () => {
  const provider = getProvider();
  return new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
};

export const getSignedContract = async (signer) => {
  return new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
};
