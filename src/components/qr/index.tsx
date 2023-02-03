import { QRCodeSVG } from "qrcode.react";

interface Props {
  text: string;
}

const Component: React.FC<Props> = ({ text }) => {
  return <QRCodeSVG value={text} />;
};

export default Component;
