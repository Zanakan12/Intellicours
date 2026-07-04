import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans" }); 
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] }); 

export const metadata: Metadata = { 
  title: 'Intellicours | Plateforme d\'apprentissage IA',
  description: "Résumez, synthétisez et testez vos cours avec l'IA"
};

// Configuration de la navigation pour les modules / sections du site
const navLinks = [
  { id: "home", path: "/", label: "Accueil", icon: "🧠️" }, 
]; 

export default function RootLayout({ children }: Readonly<{ children?: React.ReactNode }>) {
  
}