import { describe, it, expect, vi } from 'vitest';
import { getTokensByDeployer } from './getTokensByDeployer';
import { createPublicClient } from 'viem';

describe('getTokensByDeployer', () => {
    it('should throw error for invalid address', async () => {
        const mockClient = {} as ReturnType<typeof createPublicClient>;
        await expect(getTokensByDeployer(mockClient, 'invalid-address'))
            .rejects
            .toThrow('Invalid deployer address');
    });
}); 