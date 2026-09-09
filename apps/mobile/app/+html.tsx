import { ScrollViewStyleReset } from 'expo-router/html';
import type { ReactNode } from 'react';

// This file is web-only and used to configure the root HTML for every
// web page during static rendering.
// The contents of this function only run in Node.js environments and
// do not have access to the DOM or browser APIs.
export default function Root({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="theme-color" content="#08090D" />
        <meta name="application-name" content="Scoreva" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Scoreva" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <title>Scoreva</title>

        {/*
          Disable body scrolling on web. This makes ScrollView components work closer to how they do on native.
          However, body scrolling is often nice to have for mobile web. If you want to enable it, remove this line.
        */}
        <ScrollViewStyleReset />

        {/* Using raw CSS styles as an escape-hatch to ensure the background color never flickers in dark-mode. */}
        <style dangerouslySetInnerHTML={{ __html: responsiveBackground }} />
        {/* Add any additional <head> elements that you want globally available on web... */}
      </head>
      <body>
        <div id="scoreva-shell">{children}</div>
      </body>
    </html>
  );
}

const responsiveBackground = `
html, body {
  height: 100%;
  margin: 0;
}
body {
  background-color: #08090D;
}
#scoreva-shell {
  min-height: 100%;
}
@media (min-width: 720px) {
  body {
    display: flex;
    justify-content: center;
  }
  #scoreva-shell {
    width: 390px;
    min-height: 100vh;
    border-left: 1px solid #2A313C;
    border-right: 1px solid #2A313C;
  }
}
@media (prefers-color-scheme: light) {
  body {
    background-color: #F4F1EA;
  }
  @media (min-width: 720px) {
    #scoreva-shell {
      background-color: #F4F1EA;
    }
  }
}`;
