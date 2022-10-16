// React Imports
import { FC } from "react";

const Marketplace: FC = () => {
  return (
    <iframe
      src={
        process.env.ELUVIO_IFRAME_URL ||
        "https://wallet.preview.contentfabric.io/?mid=iq__2zotYUbpVuf3Z6vUw7UpXR8BPx1c&preview=iq__2zotYUbpVuf3Z6vUw7UpXR8BPx1c#/marketplace/iq__2zotYUbpVuf3Z6vUw7UpXR8BPx1c/store"
      }
      style={{
        height: 1176.5,
        width: "100%",
        border: "none",
        overflow: "hidden",
      }}
    ></iframe>
  );
};

export default Marketplace;
