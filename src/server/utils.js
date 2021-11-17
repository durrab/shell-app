"use strict";

module.exports = {

  /**
   * Determines if client is requesting a deprecated endpoint that requires redirect.
   * If redirect is necessary this function will return the URL that should be followed instead.
   * @param request
   * @return redirection URL if redirect is required; null otherwise.
   */
  getRedirectionUrlIfRequired: (request) => {
    // TODO:  We can probably take this out after some time
    // This was to redirect any requests sent to the old domain (pre dx-console rebrand)
    // If nothing else it will need to be updated when we integrate the new pingfed-sso plugin -- see STRPORT-2521
    let redirectConf = request.app?.config?.plugins['@gtpjs/sso-pingfed']?.options?.redirect;
    if(redirectConf && request.url.host !== redirectConf.host) {
      const newUrl = new URL(`${redirectConf.protocol || 'https'}://${redirectConf.host}${request.url.pathname}`);
      if(request.query) {
        Object.keys(request.query).forEach(q => newUrl.searchParams.append(q, request.query[q]))
      }
      return newUrl.toString();
    }
    return null;
  },

  getUserDetailsFromSSO: (creds) => {
    if(!creds) {
      return null;
    }
    let { name='', email='', loginId='', userid='', sub='' } = creds;
    const loginIdArr = loginId && loginId.split("\\");
    if(loginIdArr && loginIdArr.length === 2) {
      loginId = loginIdArr[1];
    }
    return { name, email, loginId, userid, sub };
  }
};
