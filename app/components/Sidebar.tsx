'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const NAV_ITEMS = [
    { href: '/', label: 'Accueil', icon: '🏠' },
    { href: '/resume', label: 'Résumer un cours', icon: '📝' },
    { href: '/fiche', label: 'Fiche de synthèse', icon: '📊' },
    { href: '/quiz', label: 'Générer un quiz', icon: '❓' },
];

export default function Sidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Bouton d'ouverture pour mobile */}
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className="fixed left-4 top-4 z-50 inline-flex items-center justify-center rounded-lg bg-white p-2 text-gray-700 shadow-md md:hidden dark:bg-gray-800 dark:text-gray-300"
                aria-label="Ouvrir la navigation"
                aria-expanded={isOpen}
            >
                <span className="text-xl">☰</span>
            </button>

            {/* Overlay pour fermer la sidebar sur mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/40 md:hidden"
                    onClick={() => setIsOpen(false)}
                    aria-hidden="true"
                />
            )}

            <aside
                className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r border-gray-200 bg-white shadow-xl transition-transform duration-200 ease-in-out dark:border-gray-700 dark:bg-gray-800 ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                } md:translate-x-0`}
            >
                <div className="flex h-full flex-col px-4 py-6">
                    <Link
                        href="/"
                        onClick={() => setIsOpen(false)}
                        className="mb-8 block text-center text-2xl font-bold text-gray-900 dark:text-white"
                    >
                        Intellicours
                    </Link>

                    <nav className="flex-1 space-y-2">
                        {NAV_ITEMS.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                                        isActive
                                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'
                                            : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                                    }`}
                                >
                                    <span className="text-lg">{item.icon}</span>
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </aside>
        </>
    );
}
