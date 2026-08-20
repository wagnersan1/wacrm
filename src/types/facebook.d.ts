export interface FacebookLoginStatusResponse {
  status: "connected" | "not_authorized" | "unknown";
  authResponse?: {
    accessToken: string;
    expiresIn: string;
    signedRequest: string;
    userID: string;
  };
}

declare global {
  interface Window {
    FB?: {
      init: (options: {
        appId: string;
        cookie: boolean;
        xfbml: boolean;
        version: string;
      }) => void;
      getLoginStatus: (
        callback: (response: FacebookLoginStatusResponse) => void,
      ) => void;
      login: (
        callback: (response: FacebookLoginStatusResponse) => void,
        options?: { scope?: string },
      ) => void;
      logout: (callback?: (response: unknown) => void) => void;
      AppEvents: {
        logPageView: () => void;
      };
    };
    fbAsyncInit?: () => void;
  }
}

export {};
