import { getInitialProps } from '@expo/next-adapter/document'
import Document, { Head, Main, NextScript } from 'next/document'
import React from 'react'

class CustomDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        </Head>
        <body>
          <Main />
          <NextScript />

          {/* Detecas input Must be server rendered and local script must be executed before the external detecas script is loaded  */}
          <input
            id="detecas-analysis"
            name="detecas-analysis"
            value="{}"
            type="hidden"
          />
          <input id="__tk" name="__tk" value="" type="hidden" />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              var analysis = document.getElementById("detecas-analysis")
              if (analysis) {
                analysis.value =
                  "js-enabled" + String.fromCharCode(64) + new Date().getTime()
              }
        
              /* Copyright(c) 2018, iovation, inc. All rights reserved. */
              window.IGLOO = window.IGLOO || {
                enable_flash: false,
                loader: {
                  fp_dyn: false,
                  version: "5.4.0",
                },
              }
                  `,
            }}
          />
          {/* ====== */}
        </body>
      </html>
    )
  }
}

// Import the getInitialProps method and assign it to your component to ensure
// the react-native-web styles are used.
CustomDocument.getInitialProps = getInitialProps

export default CustomDocument
