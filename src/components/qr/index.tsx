import QRCodeStyling from "qr-code-styling";
import { useEffect, useRef } from "react";
import WebApp from "@twa-dev/sdk";
import style from "./index.module.css";

const qrCode = new QRCodeStyling({
  width: 250,
  height: 250,
  margin: 0,
  type: "canvas",
  qrOptions: {
    errorCorrectionLevel: "Q",
  },
  backgroundOptions: {
    color: "transparent",
  },
  image: "/tonkeeper.svg",
  imageOptions: {
    margin: 3,
    hideBackgroundDots: true,
    imageSize: 0.4,
  },
  dotsOptions: {
    type: "extra-rounded",
    color: "#999",
    gradient: {
      type: "linear",
      rotation: 45,
      colorStops: [
        { offset: 0, color: "#45aef5" },
        { offset: 1, color: "#666" },
      ],
    },
  },
  cornersSquareOptions: {
    type: "extra-rounded",
    color: "#45aef5",
  },
  cornersDotOptions: {
    type: "dot",
    color: "#45aef5",
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
  }, [url]);

  return <div className={style.qr} ref={ref} />;
};

export default Component;
