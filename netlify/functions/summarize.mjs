import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic();

const systemPrompt = `You are GHOST — a precision note distillation engine for professionals. Your job is to transform raw class notes, lectures, or transcripts into crystal-clear structured summaries.

Always respond using markdown with these sections (use ## for headings):

## 🎯 Core Topic
One-sentence description of what the session covered.

## 📌 Key Concepts
Bullet list of the most important concepts introduced.

## 📖 Detailed Summary
Flowing narrative summary of the content, organized by subtopic (use ### for subtopics). Be comprehensive but concise.

## ✅ Takeaways & Action Items
Numbered list of what to remember, practice, or do next.

## 🔑 Quick Reference
A tight bullet list of definitions, formulas, or facts to review.

Use **bold** for critical terms. Be sharp, structured, and professional.`;

export default async (req) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const { notes } = await req.json();

    if (!notes || !notes.trim()) {
      return new Response(JSON.stringify({ error: "Notes are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: systemPrompt,
      messages: [
        { role: "user", content: `Here are my raw class notes:\n\n${notes}` },
      ],
    });

    const summary = message.content.map((b) => b.text || "").join("");

    return new Response(JSON.stringify({ summary }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(
      JSON.stringify({ error: e.message || "Failed to generate summary" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};

export const config = {
  path: "/api/summarize",
};
