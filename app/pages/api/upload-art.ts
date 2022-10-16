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
  image: File;
  type: string;
  name: string;
  price: string;
  shares: string;
};

const apiRoute = nextConnect<NextApiRequest, NextApiResponse>({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something happened! ${error.message}` });
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
  //Console.log(fields)
  const buffer = await readFile(fields.image.filepath);

  console.log(fields);

  const ART_NAME = fields.name;
  const ART_ORIGIN = "MOMA";
  const ART_DESCRIPTION = "Amazing art";
  const ART_PRICE = fields.price; // number for how much they're selling it at
  const ART_TYPE = fields.type; // Set this to either "fundraiser" or "commercial"
  const ART_SHARES = fields.shares;

  const ART_IMAGE_FILE = buffer; // array buffer
  const ART_IMAGE_FILE_SIZE = buffer.length;
  const ART_IMAGE_FILENAME = `${fields.image.newFilename}.jpg`; // every time the corresp function below is called, a new map is created. so each file name doesn't need to be unique.

  const ART_CURRENCY = "USD"; // USD for now
  const ART_MAX_COPIES = ART_TYPE === "Fundraiser" ? parseInt(ART_SHARES) : 1;

  var eluvio_description = `${ART_NAME} from ${ART_ORIGIN}: ${ART_DESCRIPTION}`;

  const MAIN_OBJECT_ID = "iq__suqRJUt2vmXsyiWS5ZaSGwtFU9R"; // No idea what this does
  const CONFIG_URL = "https://main.net955305.contentfabric.io"; //
  const MARKETPLACE_HASH =
    "hq__FKuEpQG3hRQJVgwpnEzdpbNaoHm3wLVCAV8dmh1f6az8oDbUBcTAyVbTP8XarpsW8BS3CeLQqC";

  const MARKETPLACE_OBJECTID = "iq__2zotYUbpVuf3Z6vUw7UpXR8BPx1c";

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
        permissioned: {
          mint_private: {},
        },
        public: {
          name: ART_NAME,
          description: eluvio_description,
          asset_metadata: {
            asset_type: "primary",
            title_type: "nft_template",
            slug: `artful-${ART_NAME.replace(" ", "-")}`,
            title: ART_NAME,
            display_title: ART_NAME,
            info: {
              permission: {
                "/": "./meta/permissioned",
              },
              storefront: {
                sections: [
                  {
                    section_header: ART_TYPE,
                    section_subheader: "",
                  },
                ],
              },
              items: [],
            },
            mint: {
              cauth_id: "ikmswJ8k6XzxQNAdyumJzdHnhyqeJQx",
              merge_meta: {},
              token_template: "",
            },
            nft: {
              attributes: [],
              copyright: "",
              created_at: "",
              creator: "",
              description: ART_DESCRIPTION,
              display_name: ART_NAME,
              edition_name: "",
              enable_watermark: "",
              generative: "",
              has_audio: "",
              media: null,
              media_type: "Image",
              image: "",
              marketplace_attributes: {
                opensea: {},
              },
              name: ART_NAME,
              pack_options: {
                is_openable: "",
                item_slots: [],
                open_animation: "",
              },
              playable: false,
              rich_text: "",
              template_id: "Ei5d6Ki1x9f6HzRee5Kj2N",
            },
          },
        },
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
        path: ART_IMAGE_FILENAME,
        mime_type: "image/jpeg",
        size: ART_IMAGE_FILE_SIZE,
        data: ART_IMAGE_FILE,
      },
    ],
  });

  console.log("UPLOAD RESPONSE:", uploadResponse);

  const permissionResponse = await client.SetPermission({
    objectId: objectID,
    permission: "public",
    writeToken: writeToken,
  });

  /**
   * Update with image value & Finalize Content Object
   */

  const finalizeResponse = await client.FinalizeContentObject({
    libraryId: LIBRARY_ID,
    objectId: objectID,
    writeToken: writeToken,
    awaitCommitConfirmation: true,
  });
  console.log("FINALIZE RESPONSE:", finalizeResponse);

  var new_url = `https://main.net955305.contentfabric.io/s/main/q/${finalizeResponse.hash}/files/${ART_IMAGE_FILENAME}`;

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  await sleep(10);

  console.log("New URL using Finalized hash", new_url);
  const metadataReadout = await client.AssetMetadata({
    libraryId: LIBRARY_ID,
    objectId: objectID,
  });
  console.log("OBJECT METADATA", metadataReadout);

  const editResponse = await client.EditContentObject({
    libraryId: LIBRARY_ID,
    objectId: objectID,
  });

  const writeTokenTwo = editResponse.writeToken;

  const replaceResponse = await client.MergeMetadata({
    libraryId: LIBRARY_ID,
    objectId: objectID,
    writeToken: writeTokenTwo,
    metadata: {
      public: {
        asset_metadata: {
          nft: {
            image: new_url,
          },
        },
      },
    },
  });

  console.log("REPLACE RESPONSE:", replaceResponse);

  const finalResponseTwo = await client.FinalizeContentObject({
    libraryId: LIBRARY_ID,
    objectId: objectID,
    writeToken: writeTokenTwo,
    awaitCommitConfirmation: true,
  });

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
    totalSupply: ART_MAX_COPIES,
    collectionName: ART_NAME,
    collectionSymbol: ART_NAME,
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
    nftObjectHash: res_build.hash,
    marketplaceObjectId: MARKETPLACE_OBJECTID,
    name: ART_NAME,
    price: ART_PRICE,
    currency: ART_CURRENCY,
    maxPerUser: ART_MAX_COPIES,
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

  console.log(ART_TYPE);

  const res_store_section = await marketplace.StorefrontSectionAddItem({
    objectId: objectID,
    sku: res_mkt.sku,
    name: ART_TYPE,
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
