import { avaryAbi, contracts } from "../avary";
import { z } from "zod";
import { isAddress, createPublicClient } from "viem";

const tokenAddressSchema = z.string().refine(isAddress, { message: "Invalid token address" });

export const listAllTokens = async (client: ReturnType<typeof createPublicClient>) => {
    const contractAddress = contracts["avary-contract"].address;
    if (!isAddress(contractAddress)) {
        throw new Error("Invalid contract address");
    }

    const events = await client.getContractEvents({
        abi: avaryAbi,
        address: contractAddress as `0x${string}`,
        eventName: "TokenCreated",
        fromBlock: BigInt(
            57544690),
        toBlock: 'latest',
    });

    const tokenAddresses = events.map(event => {
        const tokenAddress = event.args.tokenAddress;
        if (!tokenAddress) {
            throw new Error("Token address is undefined");
        }
        return tokenAddress;
    });

    const validatedAddresses = tokenAddresses.map(address => tokenAddressSchema.parse(address));

    return validatedAddresses;
};
