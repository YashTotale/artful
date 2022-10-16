import { ElvClient } from "elv-client-js";
const Utils = require("@eluvio/elv-client-js/src/Utils");
const { ElvClient } = require("elv-client-js");
const { Marketplace } = require("../src/Marketplace");

// Assume some input from the API
const INPUT_FILE = ____;
const INPUT_FILESIZE = 0;
const INPUT_FILENAME = "";
const MAIN_OBJECT_ID = "iq__suqRJUt2vmXsyiWS5ZaSGwtFU9R"; // No idea what this does
const CONFIG_URL = "https://main.net955305.contentfabric.io"; //

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

const LIBRARY_ID = "ilib3dSvxMaDDdUYpnt35PEF5eDaoy9F";
const NFT_TEMPLATE_HASH =
  "hq__2Wuci8wepZr9RksFxmfuXSZipH4Tqa1YAVZWQmo6ykvcoWUbN2oTgz9kZgbWXkDLKoi3PrnSm3";

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

let marketplace;

const config = {
  configUrl: CONFIG_URL,
  mainObjectId: MAIN_OBJECT_ID,
};

marketplace = new Marketplace(config);

client.SetSigner({ signer });
