import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'New Era Computer Training Centre',
    short_name: 'New Era Training',
    description: 'Computer training and skills development in Port Elizabeth (Gqeberha).',
    start_url: '/',
    display: 'standalone',
    background_color: '#F8FAFC',
    theme_color: '#0F4C81',
    icons: [{ src: '/icon.png', sizes: '120x120', type: 'image/png' }]
  };
}
