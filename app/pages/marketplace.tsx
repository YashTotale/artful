// React Imports
import React, { FC, ReactEventHandler, IframeHTMLAttributes } from "react";

const Marketplace: FC = () => {
  const onLoad: ReactEventHandler<HTMLIFrameElement> = (i) => {
    i.currentTarget.style.height = `${i.currentTarget.contentWindow?.document.body.scrollHeight}px`;
  };

  return (
    <iframe
      src={process.env.ELUVIO_IFRAME_URL}
      onLoad={onLoad}
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
