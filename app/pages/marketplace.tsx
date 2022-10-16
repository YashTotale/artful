// React Imports
import React, { FC, ReactEventHandler, IframeHTMLAttributes } from "react";

const Marketplace: FC = () => {
  return (
    <iframe
      src={process.env.ELUVIO_IFRAME_URL}
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
