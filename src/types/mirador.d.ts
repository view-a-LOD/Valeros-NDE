declare module 'mirador' {
  // TODO: Expand this type
  export interface MiradorConfig {
    id: string;
    windows?: Array<{
      manifestId: string;
      thumbnailNavigationPosition?: string;
      thumbnailNavigationVisible?: boolean;
    }>;
    window?: {
      allowClose?: boolean;
      allowMaximize?: boolean;
      sideBarOpenByDefault?: boolean;
    };
    workspace?: {
      showZoomControls?: boolean;
    };
    workspaceControlPanel?: {
      enabled?: boolean;
    };
  }

  export interface MiradorInstance {
    unmount: () => void;
  }

  export function viewer(config: MiradorConfig): MiradorInstance;

  const Mirador: {
    viewer: typeof viewer;
  };

  export default Mirador;
}
