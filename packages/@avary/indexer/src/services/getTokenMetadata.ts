import { avaryTokenAbi } from "../avary/abis/avaryTokenABI";
import { createPublicClient } from "viem";
import { isAddress } from "viem";

export const getTokenMetadata = async (client: ReturnType<typeof createPublicClient>, tokenAddress: string) => {
    if (!isAddress(tokenAddress)) {
        throw new Error("Invalid token address");
    }

    const name = await client.readContract({
        abi: avaryTokenAbi,
        address: tokenAddress,
        functionName: "name",
    });

    const symbol = await client.readContract({
        abi: avaryTokenAbi,
        address: tokenAddress,
        functionName: "symbol",
    });

    const totalSupply = await client.readContract({
        abi: avaryTokenAbi,
        address: tokenAddress,
        functionName: "totalSupply",
    });

    const image = await client.readContract({
        abi: avaryTokenAbi,
        address: tokenAddress,
        functionName: "image",
    });

    const deployer = await client.readContract({
        abi: avaryTokenAbi,
        address: tokenAddress,
        functionName: "deployer",
    });

    return {
        name,
        symbol,
        totalSupply,
        image,
        deployer,
    };
}; 