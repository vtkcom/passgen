import { memo } from "react";
import { Sprites } from "./@ui";

export type IconName =
  | "PowerOff"
  | "LogoTON"
  | "Toncoin"
  | "AlertCircle"
  | "MyTonWallet"
  | "Tonkeeper"
  | "OpenMask"
  | "TonSafe";

const Component: React.FC = () => {
  return (
    <Sprites xmlns="http://www.w3.org/2000/svg">
      {/* Icons */}
      <symbol
        id="svg-PowerOff"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        <path d="M18.36 6.64a9 9 0 11-12.73 0M12 2v10" />
      </symbol>
      <symbol id="svg-LogoTON" viewBox="0 0 40 40">
        <circle cx={20} cy={20} r={20} fill="#0088CC" />
        <path
          d="M14.9 12h10.2c.642 0 1.186 0 1.616.039.434.04.908.127 1.309.415.55.397.902 1.005.967 1.673.047.486-.118.931-.306 1.318-.186.383-.464.842-.792 1.384l-7.103 11.73A.923.923 0 0120 29a.923.923 0 01-.79-.442L12.105 16.83c-.328-.542-.606-1.001-.792-1.384-.188-.387-.353-.832-.306-1.318a2.342 2.342 0 01.967-1.673c.401-.288.875-.376 1.309-.415.43-.039.974-.039 1.615-.039zM20 12v17"
          stroke="#fff"
          strokeWidth={2}
          strokeLinejoin="round"
          fill="none"
        />
      </symbol>
      <symbol
        id="svg-Toncoin"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        <path d="M6.9 4h10.2c.642 0 1.186 0 1.616.039.434.04.908.127 1.309.416.55.396.902 1.004.967 1.672.047.486-.118.931-.306 1.318-.186.383-.464.842-.792 1.384l-7.103 11.73A.923.923 0 0112 21a.923.923 0 01-.79-.442L4.105 8.83c-.328-.542-.606-1.001-.792-1.384-.188-.387-.353-.832-.306-1.318a2.342 2.342 0 01.967-1.672c.401-.289.875-.377 1.309-.416C5.714 4 6.258 4 6.899 4zM12 4v17" />
      </symbol>
      <symbol
        id="svg-AlertCircle"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
        <path d="M12 8V12" />
        <path d="M12 16H12.01" />
      </symbol>

      {/* Wallets */}
      <symbol id="svg-MyTonWallet" viewBox="0 0 60 60" fill="none">
        <path
          d="M57.642 18.322A30.101 30.101 0 1 0 60 30a29.907 29.907 0 0 0-2.358-11.678Zm-2.549 23.917-1.335-3.512 3.285-1.758a27.699 27.699 0 0 1-1.95 5.274v-.004ZM2.97 37.019l3.245 1.737-1.317 3.468A27.668 27.668 0 0 1 2.97 37.02Zm-.893-7.02c0-.91.043-1.809.13-2.697l2.485 2.756-2.476 2.748A29.077 29.077 0 0 1 2.076 30ZM4.875 17.82l1.342 3.549-3.294 1.762a27.776 27.776 0 0 1 1.952-5.31Zm52.19 5.294-3.314-1.778 1.353-3.563a27.755 27.755 0 0 1 1.96 5.34ZM40.822 48.882l-2.612-1.767a18.702 18.702 0 0 0 2.38-1.374l.231 3.141Zm-7.057 2.483L32 48.873a18.938 18.938 0 0 0 2.618-.46l-.853 2.952Zm-7.52.09-.878-3.038a19.05 19.05 0 0 0 2.797.476l-1.918 2.563Zm-1.696 1.608-3.92 2.41-1.368-4.204 3.988-2.698 1.3 4.492Zm-5.393-4.23.227-3.087c.747.506 1.53.957 2.341 1.35l-2.568 1.737Zm0-37.617 2.512 1.709c-.792.39-1.555.836-2.285 1.333l-.227-3.042Zm7.088-2.638 1.88 2.53c-.923.088-1.838.244-2.739.466l.86-2.996Zm7.518.09.836 2.912a18.969 18.969 0 0 0-2.562-.451l1.726-2.46Zm1.656-1.754 3.92-2.429 1.372 4.246-3.987 2.72-1.305-4.537Zm5.394 4.257-.226 3.079c-.74-.502-1.515-.95-2.319-1.342l2.545-1.737ZM29.987 46.904c-9.32 0-16.905-7.584-16.905-16.904a16.872 16.872 0 0 1 5.89-12.813.982.982 0 0 0 .337-.28 16.924 16.924 0 0 1 4.72-2.725.978.978 0 0 0 .338-.124 16.88 16.88 0 0 1 16.388 2.929.915.915 0 0 0 .12.101A16.871 16.871 0 0 1 46.89 30c0 9.32-7.583 16.904-16.904 16.904ZM11.073 31.518 8.04 30.064l3.016-1.448a19.11 19.11 0 0 0 .01 2.902h.006Zm37.848-2.929 3.017 1.449-3.024 1.45c.037-.489.056-.985.057-1.488a21.707 21.707 0 0 0-.057-1.413l.007.002Zm-1.571-6.277 2.986.264-2.1 2.177a18.69 18.69 0 0 0-.886-2.44Zm-3.745-5.526 3.042-.762-1.247 2.893a19.163 19.163 0 0 0-1.795-2.136v.005Zm-13.509-6.504-2.88-3.873 2.685-3.562 2.906 3.573-2.71 3.862Zm-6.845 1.22-3.99-2.727 1.37-4.243 3.922 2.427-1.302 4.543Zm-8.685 7.436-1.24-2.88 3.02.756a19.158 19.158 0 0 0-1.78 2.114v.01Zm-2.835 5.848L9.639 22.6l2.973-.263a18.862 18.862 0 0 0-.88 2.439v.01ZM7.29 23.163l3.271 3.398-4.355 2.08-2.981-3.311 4.065-2.167Zm-1.084 8.32 4.35 2.09-3.27 3.4-4.07-2.178 2.99-3.311Zm5.557 3.831c.245.847.549 1.676.91 2.48l-3.04-.269 2.13-2.211Zm4.681 7.987-3.124.78 1.276-2.965a19.395 19.395 0 0 0 1.848 2.185Zm13.653 6.482 2.71 3.821-2.906 3.55-2.685-3.539 2.881-3.832Zm6.626-1.163 3.987 2.698-1.366 4.206-3.92-2.411 1.3-4.493Zm8.664-7.515 1.268 2.949-3.1-.777a19.269 19.269 0 0 0 1.832-2.173v.001Zm2.836-5.808 2.12 2.205-3.025.267c.36-.803.662-1.631.905-2.477v.005Zm4.475 1.646-3.27-3.398 4.35-2.09 2.986 3.311-4.066 2.177Zm1.072-8.33-4.355-2.091 3.27-3.397 4.067 2.176-2.982 3.311Zm-1.964-7.997-4.698-.415 1.908-4.433 4.427.537-1.637 4.311Zm-4.6-6.875-4.574 1.145.352-4.813 4.353-.94-.13 4.608ZM34.412 5.098l-2.399-2.95c1.89.135 3.761.462 5.584.977l-3.185 1.973Zm-8.845.046-3.23-1.998a27.686 27.686 0 0 1 5.477-.985l-2.247 2.983Zm-8.218 9.771-4.574-1.145-.137-4.609 4.359.941.352 4.813Zm-6.384.882 1.909 4.432-4.698.416-1.644-4.312 4.433-.536ZM8.157 39.48l4.698.416-1.904 4.432-4.428-.54 1.634-4.308Zm4.61 6.871 4.574-1.146-.353 4.814-4.358.941.136-4.609Zm12.8 8.521 2.245 2.962a27.78 27.78 0 0 1-5.465-.976l3.22-1.986Zm8.844.047 3.173 1.952c-1.82.515-3.688.842-5.574.976l2.401-2.928Zm8.221-9.742 4.574 1.15.135 4.61-4.359-.942-.35-4.818Zm6.392-.882-1.909-4.433 4.698-.416 1.637 4.312-4.426.537Zm6.258-14.27 2.507-2.78a28.45 28.45 0 0 1-.005 5.556l-2.502-2.777Zm-2.298-15.867-3.704-.45.112-3.783a28.044 28.044 0 0 1 3.591 4.233Zm-6.801-6.903-3.52.762-1.11-3.436a27.865 27.865 0 0 1 4.63 2.674ZM18.432 4.587l-1.117 3.46-3.538-.765a27.96 27.96 0 0 1 4.655-2.695ZM10.583 9.95l.112 3.783-3.698.449a28.142 28.142 0 0 1 3.586-4.232Zm-3.49 35.997 3.595.436-.108 3.66a28.129 28.129 0 0 1-3.487-4.09v-.006Zm6.82 6.872 3.43-.741 1.083 3.338a28.001 28.001 0 0 1-4.513-2.597Zm27.646 2.604 1.099-3.37 3.45.741a27.9 27.9 0 0 1-4.548 2.623v.006Zm7.843-5.354-.11-3.71 3.645-.442a28.105 28.105 0 0 1-3.535 4.152Z"
          fill="#71AAEF"
        />
      </symbol>
      <symbol id="svg-Tonkeeper" viewBox="3 3 42 42" fill="#45AEF5">
        <path opacity="0.5" d="M24 22.002L44 13.002L24 44.002V22.002Z" />
        <path opacity="0.75" d="M24 22.002L4 13.002L24 44.002V22.002Z" />
        <path d="M24 22.002L4 13.002L24 4.00201L44 13.002L24 22.002Z" />
      </symbol>
      <symbol id="svg-OpenMask" viewBox="0 0 300 300">
        <g>
          <path d="M 85,0 150,250 215,0 z" fill="#a0ddfe" stroke="#a0ddfe" />
          <path d="M 215,0 150,250 300,85 z" fill="#88d3ff" stroke="#88d3ff" />
          <path
            d="M 300,85 150,250 300,215 z"
            fill="#73cbff"
            stroke="#73cbff"
          />
          <path
            d="M 300,215 150,250 215,300 z"
            fill="#5bc1ff"
            stroke="#5bc1ff"
          />
          <path
            d="M 215,300 150,250 85,300 z"
            fill="#80cfff"
            stroke="#80cfff"
          />
          <path d="M 85,300 150,250 0,215 z" fill="#95d9ff" stroke="#95d9ff" />
          <path d="M 0,215 150,250 0,85 z" fill="#ade2ff" stroke="#ade2ff" />
          <path d="M 0,85 150,250 85,0 z" fill="#b7e7ff" stroke="#b7e7ff" />
        </g>
      </symbol>
      <symbol id="svg-TonSafe" viewBox="0 0 20 20">
        <circle cx={10} cy={10} r={10} fill="#01406B" />
        <path
          d="M16 13l-6-6-6 6"
          stroke="#fff"
          fill="none"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </symbol>
    </Sprites>
  );
};

Component.displayName = "Sprites";

export default memo(Component);
