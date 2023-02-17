import { ethers, Contract } from 'ethers';
import contractABI from './Counter.json';

const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

export const getContract = async (CONTRACT_ADDRESS) => {
    const contract = new Contract(CONTRACT_ADDRESS, contractABI.abi, provider.getSigner());
    const [account] = await provider.send("eth_requestAccounts", []);
    contract.attach(account);
    return contract;
}