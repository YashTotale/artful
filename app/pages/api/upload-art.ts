// System Imports
import { readFile } from "fs/promises";

// Next Imports
import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import formidable, { File } from "formidable";

// Eluvio Imports
import { ElvClient } from "../../elv-client-js/src/ElvClient";
import { EluvioLive } from "../../elv-live-js/src/EluvioLive";
import { Marketplace } from "../../elv-live-js/src/Marketplace";

type ProcessedFiles = {
  name: string;
  price: string;
  image: File;
};

const apiRoute = nextConnect<NextApiRequest, NextApiResponse>({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
}).post(async (req, res) => {
  const fields = await new Promise<ProcessedFiles>((resolve, reject) => {
    const form = new formidable.IncomingForm();
    let formFields = {} as ProcessedFiles;

    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      formFields = { ...fields, ...files } as ProcessedFiles;
      resolve(formFields);
    });
  });

  const buffer = await readFile(fields.image.filepath);

  const INPUT_NAME = fields.name;
  const INPUT_FILE = buffer; // array buffer
  const INPUT_PRICE = fields.price; // number for how much they're selling it at
  const INPUT_CURRENCY = "USD"; // USD for now
  let INPUT_MAX_COPIES; //since only one unique art piece
  const INPUT_SECTION = "Commercial"; // Set this to either "fundraiser" or "commercial"
  if (INPUT_SECTION == "Commercial") {
    INPUT_MAX_COPIES = 1;
  } else {
    // Read something in
    INPUT_MAX_COPIES = 100; // TODO
  }

  const INPUT_FILESIZE = buffer.length;
  const INPUT_FILENAME = `${fields.image.newFilename}.jpg`; // every time the corresp function below is called, a new map is created. so each file name doesn't need to be unique.
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

  const SKU_LENGTH = 22; // That's the convention i think

  /**
   * Initializing client.
   */
  const client = await ElvClient.FromConfigurationUrl({
    configUrl: "https://main.net955305.contentfabric.io/config",
  });

  console.log("CLIENT:", client);

  const wallet = await client.GenerateWallet();

  console.log("WALLET:", wallet);

  const signer = await wallet.AddAccount({
    privateKey: process.env.PRIVATE_KEY,
  });
  console.log("SIGNER:", signer);

  const res_signer = await client.SetSigner({ signer });

  console.log("SIGNER RESPONSE:", res_signer);

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
  console.log("CREATE RESPONSE:", createResponse);

  const objectID = createResponse.id;
  const writeToken = createResponse.write_token;

  /**
   * Upload the files (combine later).
   */

  const uploadResponse = await client.UploadFiles({
    libraryId: LIBRARY_ID,
    objectId: objectID,
    writeToken: writeToken,
    encrypted: false,
    fileInfo: [
      {
        path: INPUT_FILENAME,
        mime_type: "image/jpeg",
        size: INPUT_FILESIZE,
        data: INPUT_FILE,
      },
    ],
  });

  console.log("UPLOAD RESPONSE:", uploadResponse);

  /**
   * Finalize Content Object
   */

  const finalizeResponse = await client.FinalizeContentObject({
    libraryId: LIBRARY_ID,
    objectId: objectID,
    writeToken: writeToken,
    awaitCommitConfirmation: true,
  });

  console.log("FINALIZE RESPONSE:", finalizeResponse);

  /**
   * Create the marketplace.
   */

  let marketplace: any;
  let elvlv: any;

  const config = {
    configUrl: CONFIG_URL,
    mainObjectId: MAIN_OBJECT_ID,
  };

  const Init = async ({ debugLogging = false } = {}) => {
    console.log("Network: " + CONFIG_URL);

    // @ts-expect-error Eluvio has no TS definitions
    elvlv = new EluvioLive(config);
    await elvlv.Init({ debugLogging });

    // @ts-expect-error Eluvio has no TS definitions
    marketplace = new Marketplace(config);
    await marketplace.Init({ debugLogging });
  };

  await Init();

  console.log("MARKETPLACE:", marketplace);
  console.log("ELUVIO LIVE:", elvlv);

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
    collectionName: INPUT_NAME,
    collectionSymbol: INPUT_NAME,
    // keep the 7 days default hold. is this how long they have to keep for minimum?
    contractUri: "",
    proxyAddress: "",
  });

  console.log("CONTRACT:", contract);

  /**
   * Build the NFT.
   */
  let res_build = await elvlv.NftBuild({
    libraryId: LIBRARY_ID,
    objectId: objectID,
    nftDir: null,
  });

  console.log("BUILD RESPONSE:", res_build);

  /**
   * Put the nft on the marketplace.
   */
  const res_mkt = await marketplace.MarketplaceAddItem({
    nftObjectId: objectID,
    nftObjectHash: NFT_TEMPLATE_HASH,
    marketplaceObjectId: MARKETPLACE_HASH,
    name: INPUT_FILENAME,
    price: INPUT_PRICE,
    currency: INPUT_CURRENCY,
    maxPerUser: INPUT_MAX_COPIES,
    forSale: true,
  });

  console.log("ADD RESPONSE:", res_mkt);

  function generateSKU(length: number) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  let objectSKU = generateSKU(SKU_LENGTH);

  const res_store_section = await marketplace.StorefrontSectionAddItem({
    objectId: objectID,
    sku: objectSKU,
    name: INPUT_SECTION,
  });

  console.log("SECTION RESPONSE:", res_store_section);

  res.status(200).json({ data: "success" });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
