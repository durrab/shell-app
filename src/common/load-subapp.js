/**
 * When user navigates from one subapp to other, we need a way to load subapp without impacting SPA experience
 * This utility helps in achieving that SPA experience without reloading the entire page
 *
 * supports "serverSideRendering" and "clientSideRendering"
 *
 * Ideally, this logic should be part of electrodeX framework
 * Once Electrode X has this capability, we should get rid of this functionality here
 **/

import { lazyLoadSubApp, AppContext, xarc } from 'subapp-react';
import React, { Component } from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { connect } from 'react-redux';
import { subappMain } from '../main/reducers';
import { getProductIdByPath } from '../main/utils';
import loadRemoteModule from '../utils/Utils';
import axios from 'axios';
import { ui as uiConfig } from "electrode-ui-config";
import { SubappLoadError } from './SubappLoadError';

// ssr inline subapp
const SSRSubApp = (props) => {
  return (
    <AppContext.Consumer>
      {({ ssr }) => {
        let __html;
        if (!ssr) {
          __html = `<!-- SSRSubApp did not get ssr from AppContext: ${props.name} -->`;
        } else if (props.dynamic) {
          // everything on SSR is static so we can't handle dynamic render subapp into
          // a DOM element.
          return "";
        } else {
          const xarcInlineSSR = ssr.request.app.xarcInlineSSR;
          const ssrInfo = xarcInlineSSR && xarcInlineSSR[props.name];
          if (ssrInfo) {
            __html = ssrInfo.lib.handleSSRSync();
          } else {
            __html = `<!-- SSRSubApp did not find ssrInfo: ${props.name} -->`;
          }
        }
        return <div dangerouslySetInnerHTML={{ __html }} />;
      }}
    </AppContext.Consumer>
  );
};

// client side inlining subapp
class ClientSubApp extends Component {
  constructor(props) {
    super(props);

    const { name, subappId } = props;
    this.scope = subappId && subappId.replace('@hub/', '__remote_').replaceAll('-', '_')
    this.remoteModule = `./${name}`;

    this.state = { ready: false, remoteUrl: null };
  }

  componentWillUnmount() {
    if (this.elementId) {
      const el = window.document.getElementById(this.elementId);
      if (el) {
        unmountComponentAtNode(el);
      }
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(this.state.remoteUrl !== prevState.remoteUrl) {
      loadRemoteModule(this.state.remoteUrl, this.scope, this.remoteModule)
        .then((mod) => {
          this.setState({ remoteLoading: true });
        })
        .catch(err => {
          console.error("Subapp module not loaded", err);
          this.setState({ remoteLoading: false, remoteErr: 'Subapp module not loaded' });
        })
    }
  }

  componentDidMount() {
    const {
      name,
      remote,
      setSubappInPreview,
      subappId,
      remoteUrl
    } = this.props;

    if (remote === true) {
      this.setState({ remoteLoading: false });

      const locallyDefinedSubapps = (uiConfig && uiConfig['subapps']) || (window.config && window.config.ui && window.config.ui['subapps']);
      const subappOverride = locallyDefinedSubapps[name.toLowerCase()] || remoteUrl;

      if(subappOverride !== null && subappOverride !== undefined) {
        // Use defined subapp if present
        console.log(`Using local subapp definition for ${name}`)
        this.setState({ remoteUrl: subappOverride })
      } else {
        // otherwise use the subapp config from common api
        console.log(`Using deployed subapp definition for ${name}`)


        const [productId, pageTitle, subappPath] = getProductIdByPath();

        const subappVersionParam = new URLSearchParams(this.props.location?.search).get("showVersion")
        // if there's a subapp version, mark subapp as previewing in state, for user alert
        if(subappVersionParam) {
          setSubappInPreview(subappPath, pageTitle, subappVersionParam);
        }

        const subappVersion = (this.props.subappsInPreview[subappPath]?.version) || subappVersionParam;

        axios.get(`/common/api/subapps/${subappId.toLowerCase()}${subappVersion ? '?v=' + subappVersion : ''}`)
          .then(resp => resp.data)
          .then(data => {
            this.setState({ remoteUrl: data.url })
          })
          .catch(err => {
            console.error(err);
            this.setState({ remoteErr: err.message })
          })
      }
    }
  }

  render() {
    const { name, group, dynamic, fallback, remote } = this.props;
    const { remoteLoading, remoteErr } = this.state;
    const onLoad = () => this.setState({ ready: true });
    const subapp = xarc.getSubApp(name);

    if (remote === true) {
      if(remoteErr) {
        return <SubappLoadError msg={remoteErr} />
      }

      if (remoteLoading === undefined) {
        return null;
      } else if (remoteLoading === false) {
        return <div id={this.elementId}>{fallback}</div>;
      } else {
        if (dynamic) {
          // dynamic means we will create a DOM element with an id for the subapp to render itself into later
          // in hub-app cases, each subapp has a unique name; use that as id.
          this.elementId = name;
          console.log('Lazily loading dynamic subapp')
          lazyLoadSubApp({ id: this.elementId, group, name, onLoad });
          // if not, return loadingComponent
          return <div id={this.elementId}>{fallback}</div>;
        } else {
          // the subapp should return its component to us to be directly rendered into the component tree
          if (subapp && xarc.getBundle(name)) {
            // subapp instantiated and bundle available, directly execute it to get its component
            // for the component tree.
            return subapp.inline({ group, props: this.props });
          }
          console.log('loading subapp from xarc bundle')
          lazyLoadSubApp({ group, name, onLoad });
          // if not, return loadingComponent
          return this.props.fallback || <div>loading bundle for subapp {name}</div>;
        }
      }
    } else {
      if (dynamic) {
        // dynamic means we will create a DOM element with an id for the subapp to render itself into later
        // in hub-app cases, each subapp has a unique name; use that as id.
        this.elementId = name;
        lazyLoadSubApp({ id: this.elementId, group, name, onLoad });
        // if not, return loadingComponent
        return <div id={this.elementId}>{fallback}</div>;
      } else {
        // the subapp should return its component to us to be directly rendered into the component tree
        if (subapp && xarc.getBundle(name)) {
          // subapp instantiated and bundle available, directly execute it to get its component
          // for the component tree.
          return subapp.inline({ group, props: this.props });
        }
        lazyLoadSubApp({ group, name, onLoad });
        // if not, return loadingComponent
        return this.props.fallback || <div>loading bundle for subapp {name}</div>;
      }
    }
  }
}
export default xarc.IS_BROWSER
  ? connect(
    (state) => { return { subappsInPreview: state.subappMain.subappsInPreview } },
    { setSubappInPreview: subappMain.setSubappInPreview })(ClientSubApp)
  : SSRSubApp;
