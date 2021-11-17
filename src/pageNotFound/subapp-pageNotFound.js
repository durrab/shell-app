import React from "react";
import { loadSubApp } from "subapp-react";
import "./page-not-found.css";

const PageNotFound = () => {
  return (
    <div>
      <div>
        <div className="help-text">
        report the page as missing. 
        </div>
      </div>
    </div>
  );
};

export default loadSubApp({ Component: PageNotFound, name: "PageNotFound" });
