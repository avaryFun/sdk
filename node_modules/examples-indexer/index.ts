import {
    listAllTokens,
    getTokenMetadata,
    getTokensByDeployer
} from "@avary/indexer";
import { createPublicClient, http } from "viem";
import { avalanche } from "viem/chains";

const client = createPublicClient({
    chain: avalanche,
    transport: http("https://rpc.ankr.com/avalanche"),
});

const main = async () => {
    try {
        console.log('Fetching tokens...');
        const tokens = await listAllTokens(client);
        console.log('Fetched validated token addresses:', tokens);

        // Fetch metadata for a specific token address
        const tokenAddress = "0xa98Ced7fd28212B3c89e05f679528D072B37158f";
        const metadata = await getTokenMetadata(client, tokenAddress);
        console.log('Token Metadata:', metadata);
        console.log('Deployer:', metadata.deployer);
        console.log('Total Supply:', metadata.totalSupply);

        // Fetch all tokens by deployer
        const deployerAddress = "0xE7dee4F0C7a1c9d269EE53C9cfc6e0a5D3C32A56";
        const tokensByDeployer = await getTokensByDeployer(client, deployerAddress);
        console.log('Tokens deployed by:', deployerAddress);
        console.log(tokensByDeployer);

      
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error fetching tokens:', error);
            console.error('Error details:', error.message);
        } else {
            console.error('Unknown error occurred:', error);
        }
    }
};

main();

