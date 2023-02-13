import { useEffect, useRef, memo } from "react";
import QRCodeStyling from "qr-code-styling";
import WebApp from "@twa-dev/sdk";
import { Qr } from "./@ui";

const qrCode = new QRCodeStyling({
  width: 250,
  height: 250,
  margin: 0,
  type: "canvas",
  qrOptions: {
    errorCorrectionLevel: "L",
  },
  backgroundOptions: {
    color: "transparent",
  },
  imageOptions: {
    margin: 3,
    hideBackgroundDots: true,
    imageSize: 0.4,
  },
  dotsOptions: {
    type: "extra-rounded",
    color: WebApp.themeParams.text_color ?? "#777",
    // gradient: {
    //   type: "linear",
    //   rotation: 45,
    //   colorStops: [
    //     { offset: 0, color: WebApp.themeParams.text_color },
    //     { offset: 1, color: "#666" },
    //   ],
    // },
  },
  cornersSquareOptions: {
    type: "extra-rounded",
    color: WebApp.themeParams.text_color ?? "#777",
  },
  cornersDotOptions: {
    type: "dot",
    color: WebApp.themeParams.text_color ?? "#777",
  },
});

interface Props {
  url: string;
}

const Component: React.FC<Props> = ({ url }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(init, [ref.current, url]);

  function init() {
    if (ref.current && url) {
      qrCode.append(ref?.current ?? undefined);
      qrCode.update({
        data: url,
      });
    }
  }

  return <Qr ref={ref} />;
};

Component.displayName = "QRCode";

export default Component;
