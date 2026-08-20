"use client";

import Script from "next/script";

export function FacebookSDK() {
  const appId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID;
  const version = process.env.NEXT_PUBLIC_FACEBOOK_API_VERSION ?? "v21.0";

  if (!appId) {
    return null;
  }

  const initScript = `
    window.fbAsyncInit = function() {
      if (window.FB) {
        window.FB.init({
          appId: '${appId}',
          cookie: true,
          xfbml: true,
          version: '${version}',
        });
        window.FB.AppEvents.logPageView();
      }
    };
  `;

  return (
    <>
      <div id="fb-root" />
      <Script
        id="facebook-jssdk-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: initScript }}
      />
      <Script
        id="facebook-jssdk"
        strategy="afterInteractive"
        src="https://connect.facebook.net/pt_BR/sdk.js"
      />
    </>
  );
}
