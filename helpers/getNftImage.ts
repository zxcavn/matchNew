import axios, { AxiosError } from 'axios';

import { xfiScanApi } from '@/crud';
import { IPFS_GATEWAYS } from '@/shared/constants/links';

const TIMEOUT = 5000;
const RETRY_LIMIT = 2;

export const getImageFromIpfs = async (ipfsUri: string): Promise<string | undefined> => {
  try {
    const result = await Promise.any(
      IPFS_GATEWAYS.map(gateway => fetchFromGatewayWithRetry(ipfsUri, gateway, RETRY_LIMIT))
    );

    return result;
  } catch (errors) {
    console.error('All IPFS requests failed:', errors);

    return undefined;
  }
};

const fetchFromGatewayWithRetry = async (
  ipfsUri: string,
  gateway: string,
  retries: number
): Promise<string | undefined> => {
  try {
    return await fetchFromGateway(ipfsUri, gateway);
  } catch (error) {
    if (retries > 0) {
      console.warn(`Retrying... (${retries} attempts left)`);

      return await fetchFromGatewayWithRetry(ipfsUri, gateway, retries - 1);
    } else {
      console.error(`Failed after ${RETRY_LIMIT} retries:`, error);
      throw error;
    }
  }
};

const fetchFromGateway = async (ipfsUri: string, gateway: string): Promise<string | undefined> => {
  try {
    const httpUrl = convertIpfsToHttp(ipfsUri, gateway);

    if (!httpUrl) return undefined;

    const response = await axios.get(httpUrl, { timeout: TIMEOUT });

    if (response.headers['content-type'] !== 'application/json') {
      console.error(`Non-JSON response from IPFS using gateway ${gateway}`);

      return httpUrl; // handle invalid created NFT
    }

    const metadata = response.data;

    if (metadata && metadata.image) {
      return convertIpfsToHttp(metadata.image, gateway);
    } else {
      return undefined;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === AxiosError.ECONNABORTED) {
        console.error(`Timeout fetching data from IPFS using gateway ${gateway}`);
      } else {
        console.error(`Error fetching data from IPFS using gateway ${gateway}:`, error.message);
      }
    } else {
      console.error(`Unexpected error:`, error);
    }

    throw error;
  }
};

function convertIpfsToHttp(ipfsUri: string, gateway: string): string | undefined {
  const IPFS_PREFIX = 'ipfs://';

  if (ipfsUri.startsWith(IPFS_PREFIX)) {
    return `${gateway}${ipfsUri.slice(IPFS_PREFIX.length)}`;
  } else return undefined;
}

export const getImageFromApi = async (contractAddress: string, tokenId: string): Promise<string | undefined> => {
  try {
    const {
      data: { metadata },
    } = await xfiScanApi.getTokenInventoryByTokenId(contractAddress, tokenId);

    if (metadata && metadata.image) {
      return metadata.image;
    } else {
      console.error('No image found in API response metadata');

      return undefined;
    }
  } catch (error) {
    console.error('Error fetching data from API:', error);

    return undefined;
  }
};
