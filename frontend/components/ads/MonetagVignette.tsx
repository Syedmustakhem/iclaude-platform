"use client";

import Script from "next/script";

export default function MonetagVignette() {
  return (
    <Script
      id="monetag-vignette-11895170"
      strategy="afterInteractive"
    >{`
      (function(s) {
        s.dataset.zone = '11895170';
        s.src = 'https://n6wxm.com/vignette.min.js';

        ([document.documentElement, document.body]
          .filter(Boolean)
          .pop()
          .appendChild(document.createElement('script')));
      })(document.createElement('script'));
    `}</Script>
  );
}