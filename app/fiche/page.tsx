'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function FichePage() {
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setResult('');
        setLoading(true);

        try {
            if (!input.trim()) {
                setError('Veuillez entrer un cours ou un résumé');
                setLoading(false);
                return;
            }

            const response = await fetch('/api/synthesis', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: input }),
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la création de la fiche');
            }

            const data = await response.json();
            setResult(data.synthesis);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Une erreur est survenue');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-pink-100 p-6 dark:from-gray-900 dark:to-gray-800">
            <div className="w-full max-w-2xl">
                <Link
                    href="/"
                    className="mb-6 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-gray-700 shadow-md transition hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                    ← Retour à l'accueil
                </Link>

                <div className="rounded-2xl bg-white p-8 shadow-2xl dark:bg-gray-800">
                    <h1 className="mb-2 text-4xl font-bold text-gray-900 dark:text-white">
                        Fiche de synthèse
                    </h1>
                    <p className="mb-8 text-gray-600 dark:text-gray-400">
                        Créez une fiche bien structurée à partir de vos notes ou d'un résumé
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block">
                                <span className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Cours ou résumé
                                </span>
                                <textarea
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Collez votre cours ou résumé ici..."
                                    className="h-64 w-full rounded-lg border border-gray-300 bg-white p-4 text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:ring-purple-900"
                                />
                            </label>
                        </div>

                        {error && (
                            <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white transition hover:bg-purple-700 disabled:bg-gray-400 dark:bg-purple-700 dark:hover:bg-purple-600 dark:disabled:bg-gray-600"
                        >
                            {loading ? 'Génération en cours...' : 'Générer la fiche'}
                        </button>
                    </form>

                    {result && (
                        <div className="mt-8 rounded-lg border-l-4 border-purple-500 bg-purple-50 p-6 dark:bg-purple-900/20">
                            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                                Fiche de synthèse générée
                            </h2>
                            <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">
                                {result}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
