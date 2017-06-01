import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';

const DefaultHeadMeta = (props, { metadata: { pkg } }) => (
  <div hidden>
    <Helmet
      meta={ [
        {name: 'generator', content: `${process.env.PHENOMIC_NAME } ${ process.env.PHENOMIC_VERSION }`},
        {property: 'og:site_name', content: pkg.name},
        {name: 'twitter:site', content: `@${ pkg.twitter }`},
        {name: 'theme-color', content: '#185500'},
        {name: 'msapplication-TileColor', content: '#185500'},
        {name: 'apple-mobile-web-app-status-bar', content: 'black-transparent'},
        {name: 'apple-mobile-web-app-capable', content: 'yes'},
        {name: 'mobile-web-app-capable', content: 'yes'}
      ] }
      link={[
        {rel: 'author', href: '/humans.txt'},
      ]}
      script={ [
        {src: 'https://cdn.polyfill.io/v2/polyfill.min.js'},
        {type: 'application/javascript', innerHTML: '(function(l,o,a,d,e,r){d=o.head;function f(){a.forEach(function(u){r=o.createElement(\'link\');r.rel=\'stylesheet\';r.href=u;d.appendChild(r);});}e=requestAnimationFrame;if (e)e(f);else l.addEventListener(\'load\',f);}(window,document,[\'https://fonts.googleapis.com/css?family=Roboto+Mono\']));'}
      ] }
    />

    {/* Icons */}
    <Helmet
      link={[
        {rel: 'icon', sizes:'196x196', href: '/assets/icon/196.png'},
        {rel: 'icon', sizes:'144x144', href: '/assets/icon/144.png'},
        {rel: 'icon', sizes:'96x96', href: '/assets/icon/96.png'},
        {rel: 'icon', sizes:'48x48', href: '/assets/icon/48.png'},
        {rel: 'apple-touch-icon', sizes:'152x152', href: '/assets/icon/apple-152.png'},
        {rel: 'apple-touch-icon', sizes:'144x144', href: '/assets/icon/apple-144.png'},
        {rel: 'apple-touch-icon', sizes:'120x120', href: '/assets/icon/apple-120.png'},
        {rel: 'apple-touch-icon', sizes:'114x114', href: '/assets/icon/apple-114.png'},
        {rel: 'apple-touch-icon', sizes:'76x76', href: '/assets/icon/apple-76.png'},
        {rel: 'apple-touch-icon', sizes:'72x72', href: '/assets/icon/apple-72.png'},
        {rel: 'apple-touch-icon', sizes:'57x57', href: '/assets/icon/apple-57.png'},
      ]}
      meta={[
        {name: 'msapplication-square310x310logo', content: '/assets/icon/ms-310.png'},
        {name: 'msapplication-square150x150logo', content: '/assets/icon/ms-150.png'},
        {name: 'msapplication-square70x70logo', content: '/assets/icon/ms-70.png'},
        {name: 'msapplication-wide310x150logo', content: '/assets/icon/ms-wide.png'}
      ]}
    />

    { /* meta viewport safari/chrome/edge */ }
    <Helmet
      meta={[
        {name: 'viewport', content: 'width=device-width, initial-scale=1'}
      ]}
    />
    <style>{ '@-ms-viewport { width: device-width; }' }</style>
  </div>
);

DefaultHeadMeta.contextTypes = {
  metadata: PropTypes.object.isRequired,
};

export default DefaultHeadMeta;
