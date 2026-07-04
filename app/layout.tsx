import type { Metadata } from "next";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Intellicours",
  description: "Résumez, synthétisez et testez vos cours avec l'IA",
};

// Configuration de la navigation pour les différents modules / sections du site
const navSections = [
  // Header (visible sur tous les screens) : retour à l'accueil + titre marque
  { id: "home", path: "/", label: "Accueil" },
  
  {/* Navigation sidebar visible sous le contener principal - Desktop */}
];

export default function RootLayout({
  children,
}: Readonly<{ children?: React.ReactNode }>) {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

  // Header navigation (mobile/tablet) + logo marque (visible sur tous les pages du site)
}

const layoutHeader = () => 