import { TonConnect } from "@tonconnect/sdk";
import { createContext, memo, useMemo } from "react";

interface TonConnectContext {
  connector: TonConnect;
}

interface Props {
  children: JSX.Element;
  manifestUrl: string;
}

export const TonConnectContext = createContext<TonConnect | null>(null);

const Component: React.FC<Props> = ({ children, manifestUrl }) => {
  const connector = useMemo(
    () =>
      new TonConnect({
        manifestUrl,
      }),
    [manifestUrl]
  );

  return (
    <TonConnectContext.Provider value={connector}>
      {children}
    </TonConnectContext.Provider>
  );
};

export default memo(Component);
