import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Next.js PWA',
    short_name: 'NextPWA',
    description: 'A Progressive Web App built with Next.js',
    lang: 'ru-RU',
    start_url: '/',
    theme_color: '#09090b',
    background_color: '#09090b',
    display: 'standalone',
    display_override: ['window-controls-overlay'],
    icons: [
      {
        src: 'icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'icons/icon-256x256.png',
        sizes: '256x256',
        type: 'image/png',
      },
      {
        src: 'icons/icon-384x384.png',
        sizes: '384x384',
        type: 'image/png',
      },
      {
        src: 'icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
