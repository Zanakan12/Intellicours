import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();

    const ollamaRes = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama3.2:3b",
        prompt: `
Crée une fiche de synthèse claire et organisée :
- Titre du chapitre
- Définition(s) importante(s)
- Points essentiels
- Formules / Dates / Mots-clés
- Petit résumé final

Texte :
${text}
        `,
        stream: false,
      }),
    });

    const data = await ollamaRes.json();

    return NextResponse.json({ synthesis: data.response });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
