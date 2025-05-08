import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavLink from "../components/NavLink";
import Footer from "../components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://harshmuriki.com"),
  title: {
    default: "Harsh Muriki | Robotics Researcher",
    template: "%s | Harsh Muriki",
  },
  description:
    "Robotics researcher and engineer specializing in agricultural robotics, computer vision, and autonomous systems. Explore my research projects, publications, and academic journey.",
  keywords: [
    "robotics",
    "agricultural robotics",
    "computer vision",
    "autonomous systems",
    "research",
    "engineering",
    "academic",
    "publications",
    "projects",
  ],
  authors: [{ name: "Harsh Muriki" }],
  creator: "Harsh Muriki",
  publisher: "Harsh Muriki",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://harshmuriki.com",
    title: "Harsh Muriki | Robotics Researcher",
    description:
      "Robotics researcher and engineer specializing in agricultural robotics, computer vision, and autonomous systems.",
    siteName: "Harsh Muriki",
    images: [
      {
        url: "/images/me-og.jpeg",
        width: 1200,
        height: 630,
        alt: "Harsh Muriki - Robotics Researcher",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Harsh Muriki | Robotics Researcher",
    description:
      "Robotics researcher and engineer specializing in agricultural robotics, computer vision, and autonomous systems.",
    creator: "@harshmuriki24",
    images: ["/images/me-og.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification",
    yandex: "your-yandex-verification",
    yahoo: "your-yahoo-verification",
  },
  alternates: {
    canonical: "https://harshmuriki.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} overflow-x-hidden`}>
        <div className="min-h-screen flex flex-col w-full">
          <NavLink title="Harsh Muriki" href="/" />
          <main className="flex-grow container mx-auto px-4 w-full">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
