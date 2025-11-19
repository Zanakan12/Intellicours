'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ResumePage() {
    const [input, setInput] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState('');
    const [error, setError] = useState('');
    const [progress, setProgress] = useState(0);

    // Simulate progress while loading
    useEffect(() => {
        if (!loading) {
            setProgress(0);
            return;
        }

        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 90) return prev; // Don't go past 90% until response arrives
                return prev + Math.random() * 30;
            });
        }, 500);

        return () => clearInterval(interval);
    }, [loading]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setInput(''); // Reset textarea if file is selected
        }
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value);
        if (e.target.value) {
            setFile(null); // Reset file if text is entered
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setResult('');
        setLoading(true);

        try {
            let textToSummarize = input;

            if (file) {
                const text = await file.text();
                textToSummarize = text;
            }

            if (!textToSummarize.trim()) {
                setError('Veuillez entrer du texte ou charger un fichier');
                setLoading(false);
                return;
            }

            const response = await fetch('/api/summarize', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: textToSummarize }),
            });

            if (!response.ok) {
                throw new Error('Erreur lors du résumé');
            }

            const data = await response.json();
            setProgress(100); // Complete the progress bar
            setResult(data.summary);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Une erreur est survenue');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6 dark:from-gray-900 dark:to-gray-800">
            <div className="w-full max-w-2xl">
                <Link
                    href="/"
                    className="mb-6 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-gray-700 shadow-md transition hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                    ← Retour à l'accueil
                </Link>

                <div className="rounded-2xl bg-white p-8 shadow-2xl dark:bg-gray-800">
                    <h1 className="mb-2 text-4xl font-bold text-gray-900 dark:text-white">
                        Résumer un cours
                    </h1>
                    <p className="mb-8 text-gray-600 dark:text-gray-400">
                        Uploadez un fichier ou collez votre cours pour obtenir un résumé structuré
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="rounded-lg border-2 border-dashed border-blue-300 bg-blue-50 p-6 dark:border-blue-700 dark:bg-gray-700">
                            <label className="block">
                                <span className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Charger un fichier (txt, pdf, etc.)
                                </span>
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    accept=".txt,.pdf,.doc,.docx"
                                    className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100 dark:text-gray-400 dark:file:bg-gray-600 dark:file:text-blue-300 dark:hover:file:bg-gray-500"
                                />
                            </label>
                            {file && (
                                <p className="mt-2 text-sm text-green-600 dark:text-green-400">
                                    ✓ Fichier sélectionné : {file.name}
                                </p>
                            )}
                        </div>

                        <div className="relative">
                            <div className="flex items-center gap-4">
                                <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
                                <span className="text-gray-500 dark:text-gray-400">OU</span>
                                <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
                            </div>
                        </div>

                        <div>
                            <label className="block">
                                <span className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Ou collez votre cours directement
                                </span>
                                <textarea
                                    value={input}
                                    onChange={handleTextChange}
                                    placeholder="Collez votre cours ici..."
                                    className="h-48 w-full rounded-lg border border-gray-300 bg-white p-4 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:ring-blue-900"
                                />
                            </label>
                        </div>

                        {error && (
                            <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400">
                                {error}
                            </div>
                        )}

                        {loading && (
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Traitement en cours...
                                    </span>
                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                        {Math.round(progress)}%
                                    </span>
                                </div>
                                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                                    <div
                                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300 ease-out dark:from-blue-400 dark:to-indigo-500"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:bg-gray-400 dark:bg-blue-700 dark:hover:bg-blue-600 dark:disabled:bg-gray-600"
                        >
                            {loading ? 'Résumé en cours...' : 'Résumer le cours'}
                        </button>
                    </form>

                    {result && (
                        <div className="mt-8 rounded-lg border-l-4 border-green-500 bg-green-50 p-6 dark:bg-green-900/20">
                            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                                Résumé généré
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
