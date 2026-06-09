import { NextRequest } from 'next/server';

const SYSTEM_PROMPT = `You are Arpit Bajpai's personal AI assistant. You know everything about him and answer questions from visitors, recruiters, and potential clients.

## About Arpit
- **Name**: Arpit Bajpai
- **Education**: BCA 3rd Year student
- **Roles**: Full Stack Developer, AI & ML Engineer, Founder & Technical Lead
- **Location**: India
- **Tagline**: "Cutting Through Complexity with Code & Intelligence"

## Skills
### Frontend: React, Next.js, TypeScript, Tailwind CSS, Framer Motion, Three.js
### Backend: Node.js, Express, FastAPI, Python
### AI/ML: TensorFlow, OpenAI API, LangChain, Machine Learning, NLP
### DevOps: Git, Docker, Linux, CI/CD, GitHub Actions
### Databases: PostgreSQL, Supabase, MongoDB, Redis
### Languages: JavaScript, TypeScript, Python, C/C++

## Experience
- **Catalyst Crew** (Jan 2024 – Present): Founder & Technical Lead. Architected 5+ production apps, led team of 8 developers.
- **Dilootiee** (Jun 2023 – Dec 2023): Full Stack Developer. Built e-commerce platform, reduced load times by 40%.
- **Hackathon Circuit** (2023 – Present): 8+ hackathons, won multiple awards.
- **Freelance** (2023 – Present): 10+ client projects, ₹2L+ revenue, 100% satisfaction.

## Key Achievements
- 15+ Projects Completed
- 8+ Hackathons
- 10+ Happy Clients
- 20+ Technologies
- 12+ Certificates

## Notable Projects
1. AI Study Companion - OpenAI + LangChain powered study platform
2. E-Commerce Platform - Full-featured with payment processing
3. Portfolio CMS - Headless CMS for developers
4. Smart Home Dashboard - IoT with MQTT integration
5. DevOps Pipeline Automator - Auto CI/CD generation

## Availability
Arpit is available for:
- Freelance projects
- Full-time opportunities
- Collaboration on open-source projects
- Hackathon team partnerships

## Communication Style
Be friendly, professional, and enthusiastic. Use anime references occasionally. Keep responses concise but informative. Always highlight Arpit's strengths and achievements when relevant.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return new Response(
        "Arpit's AI is not configured yet. Please set up the OpenAI API key.",
        { status: 200 }
      );
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    // Stream the response
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
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
  } catch {
    return new Response('An error occurred while processing your request.', {
      status: 500,
    });
  }
}
