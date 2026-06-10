import type { Metadata } from 'next';
import { Inter, Outfit, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://arpit-bajpai.dev'),
  title: 'Arpit Bajpai — Full Stack Developer & AI Engineer',
  description:
    'Portfolio of Arpit Bajpai — BCA 3rd Year Student, Full Stack Developer, AI & ML Engineer, and Founder. Cutting through complexity with code and intelligence.',
  keywords: [
    'Arpit Bajpai',
    'Full Stack Developer',
    'AI Engineer',
    'ML Engineer',
    'React Developer',
    'Next.js Developer',
    'Portfolio',
    'Web Developer India',
  ],
  authors: [{ name: 'Arpit Bajpai' }],
  creator: 'Arpit Bajpai',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://arpitbajpai.in',
    siteName: 'Arpit Bajpai Portfolio',
    title: 'Arpit Bajpai — Full Stack Developer & AI Engineer',
    description:
      'Cutting through complexity with code and intelligence. Full Stack Developer, AI & ML Engineer, and Founder.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Arpit Bajpai Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arpit Bajpai — Full Stack Developer & AI Engineer',
    description:
      'Cutting through complexity with code and intelligence.',
    images: ['/og-image.jpg'],
    creator: '@arpit_bajpai',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// JSON-LD structured data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Arpit Bajpai',
  url: 'https://arpit-bajpai.dev',
  jobTitle: ['Full Stack Developer', 'AI & ML Engineer', 'Founder'],
  description:
    'BCA 3rd Year Student, Full Stack Developer, AI & ML Engineer, and Founder. Building the future with code.',
  sameAs: [
    'https://github.com/arpit0381',
    'https://www.linkedin.com/in/arpit-bajpai-6780aa220/',
    'https://twitter.com/arpit_bajpai',
  ],
  knowsAbout: [
    'React',
    'Next.js',
    'TypeScript',
    'Python',
    'TensorFlow',
    'Machine Learning',
    'Full Stack Development',
    'AI Engineering',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} ${jetbrains.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
                `,
              }}
            />
          </>
        )}
      </head>
      <body className="min-h-full bg-dark text-light antialiased noise-overlay">
        {children}
      </body>
    </html>
  );
}
