'use client';

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <main className="w-full max-w-2xl px-6 py-12">
        <div className="rounded-2xl bg-white p-12 shadow-2xl dark:bg-gray-800">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-5xl font-bold text-gray-900 dark:text-white">
              Cours à la maison
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Résumez, synthétisez et testez vos cours avec l'IA
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
            <Link
              href="/resume"
              className="group rounded-lg border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-8 text-center transition-all hover:border-blue-400 hover:shadow-lg dark:border-blue-900 dark:from-gray-700 dark:to-gray-600 dark:hover:border-blue-700"
            >
              <div className="mb-3 text-4xl">📝</div>
              <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                Résumer un cours
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Uploadez ou collez votre cours pour obtenir un résumé structuré
              </p>
            </Link>

            <Link
              href="/fiche"
              className="group rounded-lg border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 p-8 text-center transition-all hover:border-purple-400 hover:shadow-lg dark:border-purple-900 dark:from-gray-700 dark:to-gray-600 dark:hover:border-purple-700"
            >
              <div className="mb-3 text-4xl">📊</div>
              <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400">
                Fiche de synthèse
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Créez une fiche bien structurée à partir de vos notes
              </p>
            </Link>

            <Link
              href="/quiz"
              className="group rounded-lg border-2 border-green-200 bg-gradient-to-br from-green-50 to-green-100 p-8 text-center transition-all hover:border-green-400 hover:shadow-lg dark:border-green-900 dark:from-gray-700 dark:to-gray-600 dark:hover:border-green-700"
            >
              <div className="mb-3 text-4xl">❓</div>
              <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400">
                Générer un quiz
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Testez vos connaissances avec des questions générées
              </p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
