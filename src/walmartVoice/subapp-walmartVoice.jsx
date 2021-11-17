import { useEffect } from 'react';
import get from 'lodash/get';
import { React, loadSubApp } from 'subapp-react'

const walmartVoiceConfigUrl = '/api/walmart-voice/config';

/*
Payload from above REST has format of:
{
    "appId": "e4a11b23-9578-4a49-85a8-df2aab94ba53",
    "encryptedUserId": {
        "iv": "...",
        "encryptedData": "...."
    },
    "javascriptSrc": "https://productanalytics.azureedge.net/widget/script.js"
}
*/

/**
 * Use callback to run the setup steps, after <script/> src is loaded.
 * The order of (loading src -> setup steps) matters.
 * @param src: src for <script/> tag.
 * @param callback: A function to be executed only after src is loaded.
 */
function loadScript(src, callback) {
  const script = document.createElement( "script" )
  script.type = "text/javascript";
  script.onload = function() {
    callback();
  }
  script.src = src;

  document.getElementsByTagName( "head" )[0].appendChild( script );
}

/**
 * A function to run setup steps for Walmart Voice.
 * As instructed here: https://collaboration.wal-mart.com/display/APPS/Product+Onboarding.
 * @param walmartVoiceConfig: See walmartVoiceConfig format as a payload from walmartVoiceConfigUrl, at top.
 */
function setupWalmartVoice(walmartVoiceConfig) {
  const type = 'slide';
  const appId = get(walmartVoiceConfig, 'appId', '');
  const iv = get(walmartVoiceConfig, 'encryptedUserId.iv', '');
  const user = get(walmartVoiceConfig, 'encryptedUserId.encryptedData', '');

  window.WMVoice = {type, appId, iv, user};
  document.dispatchEvent(new Event('injectFeedback'));
}

export default loadSubApp({
  name: 'WalmartVoice',
  Component: () => {
    useEffect(() => {
      fetch(walmartVoiceConfigUrl)
        .then(response => response.json())
        .then(data => {
          const src = get(data, 'javascriptSrc');
          if (src) {
            loadScript(src, () => setupWalmartVoice(data));
          }
        })
        .catch(error => {
          console.error(`Fetching Walmart Voice from ${walmartVoiceConfigUrl} failed: `, error);
        });

      return () => {
        document.body.dispatchEvent(new Event('removeFeedback'));
      };
    }, []);

    return null;
  },
})
