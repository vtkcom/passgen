import { useEffect, useRef, memo } from "react";
import QRCodeStyling from "qr-code-styling";
import WebApp from "@twa-dev/sdk";
import style from "./index.module.css";

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
    color: WebApp.themeParams.button_color ?? "#777",
    // gradient: {
    //   type: "linear",
    //   rotation: 45,
    //   colorStops: [
    //     { offset: 0, color: WebApp.themeParams.button_color },
    //     { offset: 1, color: "#666" },
    //   ],
    // },
  },
  cornersSquareOptions: {
    type: "extra-rounded",
    color: WebApp.themeParams.button_color ?? "#777",
  },
  cornersDotOptions: {
    type: "dot",
    color: WebApp.themeParams.button_color ?? "#777",
  },
});

interface Props {
  url: string;
}

const Component: React.FC<Props> = ({ url }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    qrCode.append(ref?.current ?? undefined);
  }, []);

  useEffect(() => {
    qrCode.update({
      data: url,
    });
  }, []);

  return <div className={style.qr} ref={ref} />;
};

Component.displayName = "QRCode";

export default Component;
