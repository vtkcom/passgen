import WebApp from "@twa-dev/sdk";

interface Data {
  twa: typeof WebApp["platform"] | false;
  platform: string;
  appCodeName: string;
}

export function useDetect(): Data {
  return {
    twa: WebApp.platform === "unknown" ? false : WebApp.platform,
    platform: navigator.platform,
    appCodeName: navigator.appCodeName,
  };
}
