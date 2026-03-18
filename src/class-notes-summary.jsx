import { useState, useRef } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Inter', sans-serif;
    background-color: #C4DDAB;
    min-height: 100vh;
  }

  .app {
    min-height: 100vh;
    background-color: #C4DDAB;
    font-family: 'Inter', sans-serif;
    position: relative;
    overflow: hidden;
  }

  /* Decorative circles */
  .bg-circle {
    position: fixed;
    border-radius: 50%;
    opacity: 0.18;
    pointer-events: none;
    z-index: 0;
  }
  .bg-circle-1 {
    width: 520px; height: 520px;
    background: #374528;
    top: -140px; right: -120px;
  }
  .bg-circle-2 {
    width: 320px; height: 320px;
    background: #374528;
    bottom: -80px; left: -80px;
  }
  .bg-circle-3 {
    width: 180px; height: 180px;
    background: #6a8c4a;
    top: 55%; left: 8%;
  }

  .container {
    max-width: 860px;
    margin: 0 auto;
    padding: 48px 24px 80px;
    position: relative;
    z-index: 1;
  }

  /* Header */
  .header {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 10px;
  }
  .logo-badge {
    background: #374528;
    color: #C4DDAB;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.18em;
    padding: 5px 13px;
    border-radius: 50px;
    text-transform: uppercase;
  }
  .header-line {
    flex: 1;
    height: 1.5px;
    background: #374528;
    opacity: 0.18;
    border-radius: 2px;
  }

  h1 {
    font-size: clamp(32px, 5vw, 54px);
    font-weight: 900;
    color: #374528;
    letter-spacing: -0.03em;
    line-height: 1.08;
    margin-bottom: 10px;
  }
  h1 span {
    display: inline-block;
    background: #374528;
    color: #C4DDAB;
    padding: 0 10px 2px;
    border-radius: 6px;
    margin-left: 6px;
  }

  .subtitle {
    color: #4e6035;
    font-size: 15px;
    font-weight: 400;
    margin-bottom: 40px;
    max-width: 480px;
    line-height: 1.6;
  }

  /* Input card */
  .card {
    background: rgba(255,255,255,0.55);
    border: 1.5px solid rgba(55,69,40,0.13);
    border-radius: 20px;
    padding: 32px;
    margin-bottom: 24px;
    backdrop-filter: blur(8px);
    box-shadow: 0 4px 32px rgba(55,69,40,0.07);
    transition: box-shadow 0.2s;
  }
  .card:hover {
    box-shadow: 0 8px 40px rgba(55,69,40,0.12);
  }

  .label {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #374528;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .label::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #374528;
    opacity: 0.12;
  }

  textarea {
    width: 100%;
    min-height: 240px;
    background: rgba(196,221,171,0.22);
    border: 1.5px solid rgba(55,69,40,0.14);
    border-radius: 12px;
    padding: 18px;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    line-height: 1.7;
    color: #263017;
    resize: vertical;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  textarea::placeholder { color: #7a9a5a; opacity: 0.7; }
  textarea:focus {
    border-color: #374528;
    box-shadow: 0 0 0 3px rgba(55,69,40,0.10);
  }

  .char-count {
    text-align: right;
    font-size: 11px;
    color: #6a8c4a;
    margin-top: 8px;
    font-weight: 500;
  }

  /* Button */
  .btn-row {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-top: 20px;
  }

  .btn-summarize {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: #374528;
    color: #C4DDAB;
    border: none;
    border-radius: 50px;
    padding: 14px 32px;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.03em;
    cursor: pointer;
    transition: transform 0.15s, box-shadow 0.15s, background 0.15s;
    box-shadow: 0 4px 20px rgba(55,69,40,0.25);
    position: relative;
    overflow: hidden;
  }
  .btn-summarize:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(55,69,40,0.35);
    background: #2a3520;
  }
  .btn-summarize:active:not(:disabled) { transform: translateY(0); }
  .btn-summarize:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  .btn-ghost-tag {
    font-size: 9px;
    font-weight: 900;
    letter-spacing: 0.2em;
    background: #C4DDAB;
    color: #374528;
    padding: 2px 8px;
    border-radius: 50px;
    margin-left: 2px;
  }

  .btn-clear {
    background: transparent;
    border: 1.5px solid rgba(55,69,40,0.25);
    color: #4e6035;
    border-radius: 50px;
    padding: 13px 22px;
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s;
  }
  .btn-clear:hover { border-color: #374528; color: #374528; }

  /* Spinner */
  .spinner {
    width: 16px; height: 16px;
    border: 2px solid rgba(196,221,171,0.3);
    border-top-color: #C4DDAB;
    border-radius: 50%;
    animation: spin 0.75s linear infinite;
    flex-shrink: 0;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* Processing indicator */
  .processing-bar {
    height: 3px;
    background: linear-gradient(90deg, #374528 0%, #6a8c4a 50%, #374528 100%);
    background-size: 200% 100%;
    border-radius: 2px;
    margin-top: 18px;
    animation: shimmer 1.5s infinite;
  }
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }

  /* Output */
  .output-card {
    background: #374528;
    border-radius: 20px;
    padding: 36px;
    margin-top: 10px;
    box-shadow: 0 8px 40px rgba(55,69,40,0.22);
    animation: slideUp 0.4s cubic-bezier(.16,1,.3,1);
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .output-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 28px;
    border-bottom: 1px solid rgba(196,221,171,0.15);
    padding-bottom: 20px;
  }
  .output-title {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba(196,221,171,0.6);
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .output-title::before {
    content: '';
    width: 6px; height: 6px;
    background: #8bc34a;
    border-radius: 50%;
    box-shadow: 0 0 6px #8bc34a;
  }

  .btn-copy {
    background: rgba(196,221,171,0.1);
    border: 1px solid rgba(196,221,171,0.2);
    color: rgba(196,221,171,0.75);
    border-radius: 50px;
    padding: 7px 16px;
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s;
  }
  .btn-copy:hover { background: rgba(196,221,171,0.18); color: #C4DDAB; }
  .btn-copy.copied { color: #8bc34a; border-color: rgba(139,195,74,0.4); }

  /* Summary content styles */
  .summary-content {
    color: #ddefc8;
    font-size: 14.5px;
    line-height: 1.8;
  }
  .summary-content h2 {
    font-size: 18px;
    font-weight: 800;
    color: #C4DDAB;
    margin: 28px 0 10px;
    letter-spacing: -0.02em;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .summary-content h2:first-child { margin-top: 0; }
  .summary-content h2::before {
    content: '';
    width: 3px; height: 18px;
    background: #8bc34a;
    border-radius: 2px;
    flex-shrink: 0;
  }
  .summary-content h3 {
    font-size: 14px;
    font-weight: 700;
    color: #b5d690;
    margin: 18px 0 6px;
    letter-spacing: 0.01em;
  }
  .summary-content p {
    margin-bottom: 12px;
    color: #c8e2aa;
  }
  .summary-content ul, .summary-content ol {
    padding-left: 0;
    margin-bottom: 14px;
    list-style: none;
  }
  .summary-content li {
    padding: 6px 0 6px 22px;
    position: relative;
    color: #c8e2aa;
    border-bottom: 1px solid rgba(196,221,171,0.06);
  }
  .summary-content li:last-child { border-bottom: none; }
  .summary-content ul li::before {
    content: '→';
    position: absolute;
    left: 0;
    color: #6a8c4a;
    font-weight: 700;
  }
  .summary-content ol { counter-reset: item; }
  .summary-content ol li { counter-increment: item; }
  .summary-content ol li::before {
    content: counter(item) '.';
    position: absolute;
    left: 0;
    color: #6a8c4a;
    font-weight: 700;
    font-size: 12px;
  }
  .summary-content strong {
    color: #C4DDAB;
    font-weight: 700;
  }
  .summary-content blockquote {
    border-left: 3px solid #6a8c4a;
    padding: 10px 16px;
    margin: 14px 0;
    background: rgba(196,221,171,0.06);
    border-radius: 0 8px 8px 0;
    color: #aacf85;
    font-style: italic;
  }
  .summary-content hr {
    border: none;
    border-top: 1px solid rgba(196,221,171,0.12);
    margin: 20px 0;
  }

  .error-box {
    background: rgba(220,60,60,0.12);
    border: 1px solid rgba(220,60,60,0.25);
    border-radius: 12px;
    padding: 16px 20px;
    color: #ff9090;
    font-size: 14px;
    margin-top: 16px;
    display: flex;
    align-items: flex-start;
    gap: 10px;
  }

  .footer-note {
    text-align: center;
    font-size: 12px;
    color: rgba(55,69,40,0.45);
    margin-top: 40px;
    font-weight: 500;
  }

  /* Responsive */
  @media (max-width: 600px) {
    .container { padding: 28px 16px 60px; }
    .card { padding: 20px; }
    .output-card { padding: 24px; }
    .btn-row { flex-direction: column; align-items: stretch; }
    .btn-summarize, .btn-clear { width: 100%; justify-content: center; border-radius: 12px; }
  }
`;

function parseMarkdown(text) {
  const lines = text.split("\n");
  let html = "";
  let inUl = false;
  let inOl = false;

  const closeList = () => {
    if (inUl) { html += "</ul>"; inUl = false; }
    if (inOl) { html += "</ol>"; inOl = false; }
  };

  const inline = (s) =>
    s
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/`(.+?)`/g, "<code>$1</code>");

  for (const raw of lines) {
    const line = raw.trimEnd();
    if (!line.trim()) {
      closeList();
      continue;
    }
    if (/^### (.+)/.test(line)) {
      closeList();
      html += `<h3>${inline(line.replace(/^### /, ""))}</h3>`;
    } else if (/^## (.+)/.test(line)) {
      closeList();
      html += `<h2>${inline(line.replace(/^## /, ""))}</h2>`;
    } else if (/^# (.+)/.test(line)) {
      closeList();
      html += `<h2>${inline(line.replace(/^# /, ""))}</h2>`;
    } else if (/^---/.test(line)) {
      closeList();
      html += "<hr/>";
    } else if (/^> (.+)/.test(line)) {
      closeList();
      html += `<blockquote>${inline(line.replace(/^> /, ""))}</blockquote>`;
    } else if (/^\d+\. (.+)/.test(line)) {
      if (!inOl) { if (inUl) { html += "</ul>"; inUl = false; } html += "<ol>"; inOl = true; }
      html += `<li>${inline(line.replace(/^\d+\. /, ""))}</li>`;
    } else if (/^[-*] (.+)/.test(line)) {
      if (!inUl) { if (inOl) { html += "</ol>"; inOl = false; } html += "<ul>"; inUl = true; }
      html += `<li>${inline(line.replace(/^[-*] /, ""))}</li>`;
    } else {
      closeList();
      html += `<p>${inline(line)}</p>`;
    }
  }
  closeList();
  return html;
}

export default function App() {
  const [notes, setNotes] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const outputRef = useRef(null);

  const summarize = async () => {
    if (!notes.trim()) return;
    setLoading(true);
    setError("");
    setSummary("");

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

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: systemPrompt,
          messages: [{ role: "user", content: `Here are my raw class notes:\n\n${notes}` }],
        }),
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error.message);
      const text = data.content?.map((b) => b.text || "").join("") || "";
      setSummary(text);
      setTimeout(() => outputRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    } catch (e) {
      setError(e.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(summary).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const clear = () => {
    setNotes("");
    setSummary("");
    setError("");
  };

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <div className="bg-circle bg-circle-1" />
        <div className="bg-circle bg-circle-2" />
        <div className="bg-circle bg-circle-3" />

        <div className="container">
          {/* Header */}
          <div className="header">
            <span className="logo-badge">GHOST</span>
            <div className="header-line" />
          </div>

          <h1>Class Notes<span>Summary</span></h1>
          <p className="subtitle">
            Paste your raw notes or lecture transcript below. GHOST will distill them into a structured, professional summary — fast.
          </p>

          {/* Input */}
          <div className="card">
            <div className="label">Raw Notes / Transcript</div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Paste your class notes, lecture transcript, meeting notes, or any unstructured text here…"
            />
            <div className="char-count">{notes.length.toLocaleString()} characters</div>

            {loading && <div className="processing-bar" />}

            <div className="btn-row">
              <button
                className="btn-summarize"
                onClick={summarize}
                disabled={loading || !notes.trim()}
              >
                {loading ? (
                  <>
                    <div className="spinner" />
                    Processing…
                  </>
                ) : (
                  <>
                    ✦ Summarize with
                    <span className="btn-ghost-tag">GHOST</span>
                  </>
                )}
              </button>
              {(notes || summary) && (
                <button className="btn-clear" onClick={clear}>
                  Clear all
                </button>
              )}
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="error-box">
              <span>⚠</span>
              <span>{error}</span>
            </div>
          )}

          {/* Output */}
          {summary && (
            <div className="output-card" ref={outputRef}>
              <div className="output-header">
                <div className="output-title">Summary Ready</div>
                <button className={`btn-copy ${copied ? "copied" : ""}`} onClick={copy}>
                  {copied ? "✓ Copied" : "Copy"}
                </button>
              </div>
              <div
                className="summary-content"
                dangerouslySetInnerHTML={{ __html: parseMarkdown(summary) }}
              />
            </div>
          )}

          <p className="footer-note">Powered by Amlan Dey(GHOST)· Built for focused professionals</p>
        </div>
      </div>
    </>
  );
}
