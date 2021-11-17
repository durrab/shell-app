import React from "react";
import { Alert } from "antd";

export function PagerAlert() {

  const crcMatrixHref = <a href='https://confluence.walmart.com/display/OPSCAMO/Incident+Matrix' target='_blank'> CRC incident matrix </a>;

  const desc =
    <div className="pager-msg">
      <h3>You are about to page the on-call person</h3>
      <p>
        While paging on-call can be justifiable in certain non-production situations it is typically reserved for production related issues and support.
        Please review the severity of your issue and ensure it warrants off-hours support.
      </p>
      <h3>Revenue Impacting Issues - Contact NOC Directly</h3>
      <p>
        Please review the {crcMatrixHref} to determine if there is impact to the customer journey/revenue generation.
        If the issue meets the CRC criteria, do NOT use this On-Call pager. Contact the NOC directly at <strong>650-837-5555</strong>.
      </p>
    </div>

  return (
    <div>
      <Alert
        message=''
        className="pager-alert"
        description={desc}
        type="warning"
        showIcon
      />
    </div>
  )
}
