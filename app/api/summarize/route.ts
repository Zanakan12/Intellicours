import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();

    if (!text || text.trim() === "") {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    const ollamaRes = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama3.2:3b",
        prompt: `
Tu es un assistant pédagogique. Résume ce texte de manière structurée :
- Titre
- 3 à 5 points clés
- Explication simple
Voici le texte :
${text}
        `,
        stream: false,
      }),
    });

    const data = await ollamaRes.json();

    return NextResponse.json({ summary: data.response });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
