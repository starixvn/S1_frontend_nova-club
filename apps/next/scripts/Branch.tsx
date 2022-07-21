import Script from 'next/script'
import React from 'react'

/* current unused, changes to integrations/Branch.tsx
export default function Branch() {
  return (
    <Script
      id="branch.io"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
        (function(b,r,a,n,c,h,_,s,d,k){if(!b[n]||!b[n]._q){for(;s<_.length;)c(h,_[s++]);d=r.createElement(a);d.async=1;d.src="https://cdn.branch.io/branch-latest.min.js";k=r.getElementsByTagName(a)[0];k.parentNode.insertBefore(d,k);b[n]=h}})(window,document,"script","branch",function(b,r){b[r]=function(){b._q.push([r,arguments])}},{_q:[],_v:1},"addListener applyCode autoAppIndex banner closeBanner closeJourney creditHistory credits data deepview deepviewCta first getCode init link logout redeem referrals removeListener sendSMS setBranchViewData setIdentity track validateCode trackCommerceEvent logEvent disableTracking qrCode".split(" "), 0);
        branch.init('key_live_pjWNXjndLKIjpf4FrFB04kloDEcC2LqC', { }, function(err, data) {
          console.log("branch", err, data);
          // https://novaclub88-staging.app.link/?ref=abc&$fallback_url=http%3A%2F%2Flocalhost%3A3000
        });
        `,
      }}
    />
  )
}
