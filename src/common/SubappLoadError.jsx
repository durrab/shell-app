//import { Page404 } from '@hub/ui-lib';
import React from 'react';

export const SubappLoadError = ({ msg }) => {
  return <div style={{ height: '100vh' }}>
    <div
      header="That page was not found."
      text=""
    >
      <>
        Try going <a href="/">home</a> or{' '}
        <a
          href="https://walmart.slack.com/archives/CUDT0KYBZ"
          target="_blank"
        >
          report the page as missing.
        </a>
      </>
    </div>
  </div>
}
