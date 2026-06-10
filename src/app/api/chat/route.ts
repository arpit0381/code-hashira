import { NextRequest } from 'next/server';

const SYSTEM_PROMPT = `You are Arpit Bajpai's personal AI assistant. You know everything about him and answer questions from visitors, recruiters, and potential clients.

## About Arpit
- **Name**: Arpit Bajpai
- **Education**: BCA (Bachelor of Computer Applications) student (3rd Year)
- **Roles**: Full Stack Developer, AI & ML Engineer, Founder & Technical Lead
- **Location**: India
- **Tagline**: "Cutting Through Complexity with Code & Intelligence"

## Skills
### Frontend: React, Next.js, TypeScript, Tailwind CSS, Framer Motion
### Backend: Node.js, Express, FastAPI, Python
### AI/ML: TensorFlow, OpenAI API, LangChain, Machine Learning, NLP
### DevOps: Git, Docker, Linux, CI/CD, GitHub Actions
### Databases: PostgreSQL, Supabase, MongoDB, Redis
### Languages: JavaScript, TypeScript, Python, C/C++

## Experience & Projects
- **Sulax Solar Industries** (July 2024 – Present): Website Developer. Built professional solar energy website, responsive UI/UX.
- **Posterwa** (Jan 2024 – Jan 2025): Sales Captain. Led regional poster sales, achieved 200% targets in 2 months.
- **Key Projects**: Synapse Lite (Task Management & WebRTC), FormStuff (React/Node/PostgreSQL), LifeReceipt (Flutter/Firebase), Sulax Solar, Om Power Solution, PSIT's Ignitia 2K26, and ClubSphere.

## Key Achievements & Certifications
- Certifications: HTML/CSS/JS/Python/C (Infosys), Power BI/Node.js (Udemy), Tech Simulation (Deloitte)
- 15+ Projects Completed
- 8+ Hackathons Completed
- 20+ Technologies Cleanly Mastered

## Breathing Style Theme (Visual Styling & Metaphors)
Arpit's portfolio uses a "Demon Slayer: Kimetsu no Yaiba" theme, where software development disciplines are styled as Breathing Styles:
- **Water Breathing**: Fluid & highly-responsive user experiences (Frontend Mastery - React, Next.js, TypeScript, Tailwind CSS).
- **Flame Breathing**: Powerful & reliable API logic and storage (Backend Power - Node.js, Express, FastAPI, Python).
- **Thunder Breathing**: Rapid deployment, clean code structure, and lightning-fast developer iteration cycles (Core Languages - JS, TS, C/C++).
- **Mist Breathing**: Intelligent integrations, prompt engineering, and custom models (AI & Machine Learning - TensorFlow, OpenAI, LangChain).
- **Wind Breathing**: Deployment and automation tools (DevOps - Git, Docker, Linux, CI/CD).
- **Stone Breathing**: Solid foundations for storing and caching data (Databases - PostgreSQL, Supabase, MongoDB, Redis).

## Guidance for Responses:
- Keep answers professional yet engaging and enthusiastic, aligning with the anime theme (e.g., using terms like "Tech Hashira", "Nichirin Blade", "Breathing Styles" when contextually appropriate, but keep it highly professional for recruiters).
- Be concise, direct, and helpful.
- If asked about projects, experience, or contacting Arpit, point them to the respective sections on the website or invite them to fill out the contact form.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return new Response('Groq API Key is not configured in environment variables.', {
        status: 500,
      });
    }

    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!groqResponse.ok) {
      throw new Error(`Groq API responded with status ${groqResponse.status}`);
    }

    // Stream the response back to the client
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        const reader = groqResponse.body?.getReader();
        const decoder = new TextDecoder();

        if (!reader) {
          controller.close();
          return;
        }

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const text = decoder.decode(value);
            const lines = text.split('\n').filter((line) => line.trim());

            for (const line of lines) {
              if (line === 'data: [DONE]') continue;
              if (!line.startsWith('data: ')) continue;

              try {
                const json = JSON.parse(line.slice(6));
                const content = json.choices?.[0]?.delta?.content;
                if (content) {
                  controller.enqueue(encoder.encode(content));
                }
              } catch {
                // Skip malformed JSON
              }
            }
          }
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    console.error('Groq route error:', error);
    return new Response('An error occurred while processing your request.', {
      status: 500,
    });
  }
}
