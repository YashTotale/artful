import { ElvClient } from "elv-client-js";
const Utils = require("@eluvio/elv-client-js/src/Utils");
const { ElvClient } = require("elv-client-js");
const { Marketplace } = require("../src/Marketplace");

// Assume some input from the API - TO BE SENT IN BY YASH
const INPUT_FILE = ____; // array buffer
const INPUT_PRICE = ____; // number for how much they're selling it at
const INPUT_CURRENCY = "USD"; // USD for now
const INPUT_MAX_COPIES = 1; //since only one unique art piece

const INPUT_FILESIZE = 0;
const INPUT_FILENAME = "";
const MAIN_OBJECT_ID = "iq__suqRJUt2vmXsyiWS5ZaSGwtFU9R"; // No idea what this does
const CONFIG_URL = "https://main.net955305.contentfabric.io"; //
const MARKETPLACE_HASH =
  "hq__FKuEpQG3hRQJVgwpnEzdpbNaoHm3wLVCAV8dmh1f6az8oDbUBcTAyVbTP8XarpsW8BS3CeLQqC";

const LIBRARY_ID = "ilib3dSvxMaDDdUYpnt35PEF5eDaoy9F";
const NFT_TEMPLATE_HASH =
  "hq__2Wuci8wepZr9RksFxmfuXSZipH4Tqa1YAVZWQmo6ykvcoWUbN2oTgz9kZgbWXkDLKoi3PrnSm3"; // Corresponds to the ELuv.io Version hash of images

const TENANT_ID = "iten2ZVoxsh4FHM3fvVG3HuCBhfv7r8g";
const MINTER = "0x4331b4E29279B95da5E34D33a1b36135696dd119";
const MINT_HELPER = "0xD312c4a56A1Fba420192ddC430B53383F399Cc9C";

/**
 * Initializing client.
 */

const client = await ElvClient.FromConfigurationUrl({
  configUrl: "https://main.net955305.contentfabric.io/config",
});

const wallet = client.GenerateWallet();
const signer = wallet.AddAccount({
  privateKey:
    "0x5a1a317daf794fa9338821f4a1024ad65ed311bf0a875b722c7c518f0c257353",
});

/**
 * Create content object with our file.
 */

const createResponse = await client.CreateContentObject({
  libraryId: LIBRARY_ID,
  options: {
    type: NFT_TEMPLATE_HASH,
    meta: {
      name: INPUT_FILENAME,
    },
  },
});

const objectID = createResponse.id;
const writeToken = createResponse.write_token;

/**
 * Upload the files (combine later).
 */

client.uploadFiles({
  libraryId: LIBRARY_ID,
  objectId: objectID,
  writeToken: writeToken,
  encrypted: false,
  fileInfo: [
    {
      path: INPUT_FILENAME,
      type: "file",
      size: INPUT_FILESIZE,
      data: INPUT_FILE,
    },
  ],
});

/**
 * Create the marketplace.
 */

let marketplace;
let elvlv;

const config = {
  configUrl: CONFIG_URL,
  mainObjectId: MAIN_OBJECT_ID,
};

const Init = async ({ debugLogging = false } = {}) => {
  console.log("Network: " + CONFIG_URL);

  elvlv = new EluvioLive(config);
  await elvlv.Init({ debugLogging });

  marketplace = new Marketplace(config);
  await marketplace.Init({ debugLogging });
};

await Init();

/**
 * Create contract. Hopefully this is internally connected to the actual content object.
 */
let contract = await elvlv.NftTemplateAddNftContract({
  libraryId: LIBRARY_ID,
  objectId: objectID,
  //nftAddr,
  tenantId: TENANT_ID,
  mintHelperAddr: MINT_HELPER, //"0x59e79eFE007F5208857a646Db5cBddA82261Ca81",
  minterAddr: MINTER,
  totalSupply: INPUT_MAX_COPIES,
  collectionName: argv.name, // what you want to call your nft https://github.com/eluv-io/elv-live-js/blob/d4d9f145e5aea5a5258acfb34bac2b17ba142a75/src/EluvioLive.js#L1487
  collectionSymbol: argv.symbol,
  // keep the 7 days default hold. is this how long they have to keep for minimum?
  contractUri: "",
  proxyAddress: "",
});

/**
 * Build the NFT.
 */
let res = await elvlv.NftBuild({
  libraryId: LIBRARY_ID,
  objectId: objectID,
  nftDir: null,
});

/**
 * Put the nft on the marketplace.
 */
const res = await marketplace.MarketplaceAddItem({
  nftObjectId: objectID,
  nftObjectHash: NFT_TEMPLATE_HASH,
  marketplaceObjectId: MARKETPLACE_HASH,
  name: INPUT_FILENAME,
  price: INPUT_CURRENCY,
  currency: INPUT_CURRENCY,
  maxPerUser: INPUT_MAX_COPIES,
  forSale: true,
});

client.SetSigner({ signer });
