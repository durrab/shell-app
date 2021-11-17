const { getRedirectionUrlIfRequired } = require('../../../src/server/utils')

test('Gets redirect url if redirect is required', () => {

    const request = {
    };

    let url = getRedirectionUrlIfRequired(request);
    expect(url).toBe(null);

    request.app = {
        config: {
            plugins: {
                '@gtpjs/sso-pingfed': {
                    options: {
                        redirect: {
                            "protocol": "https",
                            "host": "console-stage.dx.walmart.com",
                            "port": "",
                            "path": "/loggedin"
                        }
                    }
                }
            }
        }
    };

    request.url = {
        host: 'hub-app-stg.strati.walmart.com',
        pathname: '/some-path/that-the-user/was-headed'
    }

    url = getRedirectionUrlIfRequired(request);
    expect(url).toBe('https://console-stage.dx.walmart.com/some-path/that-the-user/was-headed');

    request.query = {
        projectId: 'DX-02021',
        active_tab: 'metrics'
    }

    url = getRedirectionUrlIfRequired(request);
    expect(url).toBe('https://console-stage.dx.walmart.com/some-path/that-the-user/was-headed?projectId=DX-02021&active_tab=metrics');

});