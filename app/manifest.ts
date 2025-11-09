import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Редактус',
    short_name: 'Редактус',
    description: 'Редактус',
    lang: 'ru-RU',
    start_url: '/',
    theme_color: '#09090b',
    background_color: '#09090b',
    display: 'standalone',
    display_override: ['window-controls-overlay'],
    icons: [
      {
        src: 'icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'icon-256x256.png',
        sizes: '256x256',
        type: 'image/png',
      },
      {
        src: 'icon-384x384.png',
        sizes: '384x384',
        type: 'image/png',
      },
      {
        src: 'icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
