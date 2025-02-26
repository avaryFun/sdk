import { avaryAbi } from "../avary";
import { contracts } from "../avary";
import { createPublicClient } from "viem";
import { isAddress } from "viem";
import { getTokenMetadata } from "./getTokenMetadata";

export const getTokensByDeployer = async (client: ReturnType<typeof createPublicClient>, deployerAddress: string) => {
    if (!isAddress(deployerAddress)) {
        throw new Error("Invalid deployer address");
    }

    const contractAddress = contracts["avary-contract"].address;
    if (!contractAddress) {
        throw new Error("Contract address is undefined");
    }

    const events = await client.getContractEvents({
        abi: avaryAbi,
        address: contractAddress as `0x${string}`,
        eventName: "TokenCreated",
        fromBlock: BigInt(57544690),
        toBlock: 'latest',
    });

    const tokenAddresses = events
        .filter(event => event.args.deployer === deployerAddress)
        .map(event => event.args.tokenAddress)
        .filter((address): address is `0x${string}` => address !== undefined && isAddress(address));

    const tokensMetadata = await Promise.all(
        tokenAddresses.map(address => getTokenMetadata(client, address))
    );

    return tokensMetadata;
}; 