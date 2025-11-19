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
Génère un quiz à partir de ce cours.
Format demandé :
1. 3 QCM (4 choix chacun, 1 bonne réponse)
2. 3 Questions Vrai/Faux
3. 3 Questions ouvertes

Cours :
${text}
        `,
        stream: false,
      }),
    });

    const data = await ollamaRes.json();

    return NextResponse.json({ quiz: data.response });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
