import React from 'react';
import { Head } from 'react-static';

export default function DefaultHead() {
  return (
    <Head
      meta={[
        // General properties
        { name: 'charset', content: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { property: 'og:site_name', content: 'Stuart Thomson' },
        { name: 'theme-color', content: '#15181A' },
        { name: 'msapplication-TileColor', content: '#15181A' },
        { name: 'apple-mobile-web-app-status-bar', content: 'black-transparent' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'mobile-web-app-capable', content: 'yes' },
        // Icons
        { name: 'msapplication-square310x310logo', content: '/assets/icon/ms-310.png' },
        { name: 'msapplication-square150x150logo', content: '/assets/icon/ms-150.png' },
        { name: 'msapplication-square70x70logo', content: '/assets/icon/ms-70.png' },
      ]}
      link={[
        // General Properties
        { rel: 'author', href: '/humans.txt' },
        { rel: 'manifest', href: '/manifest.json' },
        // Icons
        { rel: 'icon', sizes: '196x196', href: '/assets/icon/196.png' },
        { rel: 'icon', sizes: '144x144', href: '/assets/icon/144.png' },
        { rel: 'icon', sizes: '96x96', href: '/assets/icon/96.png' },
        { rel: 'icon', sizes: '48x48', href: '/assets/icon/48.png' },
        { rel: 'apple-touch-icon', sizes: '152x152', href: '/assets/icon/apple-152.png' },
        { rel: 'apple-touch-icon', sizes: '144x144', href: '/assets/icon/apple-144.png' },
        { rel: 'apple-touch-icon', sizes: '120x120', href: '/assets/icon/apple-120.png' },
        { rel: 'apple-touch-icon', sizes: '114x114', href: '/assets/icon/apple-114.png' },
        { rel: 'apple-touch-icon', sizes: '76x76', href: '/assets/icon/apple-76.png' },
        { rel: 'apple-touch-icon', sizes: '72x72', href: '/assets/icon/apple-72.png' },
        { rel: 'apple-touch-icon', sizes: '57x57', href: '/assets/icon/apple-57.png' },
      ]}
    />
  );
}
