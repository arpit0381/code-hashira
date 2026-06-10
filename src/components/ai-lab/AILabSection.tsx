'use client';

import { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Send, Sparkles, Bot, User } from 'lucide-react';
import { SUGGESTED_QUESTIONS } from '@/features/constants';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function AILabSection() {
  const containerRef = useScrollReveal();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'greeting',
      role: 'assistant',
      content:
        "I am Arpit's AI assistant. Ask me anything about his skills, projects, experience, or availability. I know everything about him! ⚔️",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isLoading) return;

      const userMsg: Message = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: text.trim(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setInput('');
      setIsLoading(true);

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: [...messages, userMsg].map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
        });

        if (!res.ok) throw new Error('API request failed');

        const reader = res.body?.getReader();
        const decoder = new TextDecoder();
        let fullContent = '';

        const assistantMsg: Message = {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: '',
        };

        setMessages((prev) => [...prev, assistantMsg]);

        if (reader) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            const chunk = decoder.decode(value);
            fullContent += chunk;
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantMsg.id ? { ...m, content: fullContent } : m
              )
            );
          }
        }
      } catch {
        // Fallback response when Groq API is not configured or fails
        const fallbackResponses: Record<string, string> = {
          'what can arpit build':
            "Arpit is a Full Stack Developer and AI/ML Engineer who can build everything from modern web applications with Next.js and React to AI-powered platforms using OpenAI and LangChain. He's delivered 15+ projects spanning e-commerce, IoT dashboards, and intelligent study platforms.",
          'tell me about his ai projects':
            "Arpit has built several AI projects including an AI Study Companion powered by OpenAI and LangChain, a Neural Style Transfer application using TensorFlow, and various automation tools. His expertise spans machine learning, NLP, and integrating AI into production applications.",
          'is he available for hire':
            'Yes! Arpit is currently available for freelance projects and full-time opportunities. He specializes in full-stack development and AI integration. You can reach him through the contact section below! ⚔️',
          default:
            "Arpit Bajpai is a BCA 3rd Year student, Full Stack Developer, AI & ML Engineer, and Founder of Catalyst Crew. He's skilled in React, Next.js, Python, TensorFlow, and 20+ other technologies. He's competed in 8+ hackathons, delivered 15+ projects, and served 10+ happy clients. Feel free to ask me anything specific!",
        };

        const key = text.toLowerCase().trim();
        const response =
          Object.entries(fallbackResponses).find(([k]) => key.includes(k))?.[1] ||
          fallbackResponses.default;

        setMessages((prev) => [
          ...prev,
          {
            id: `assistant-${Date.now()}`,
            role: 'assistant',
            content: response,
          },
        ]);
      } finally {
        setIsLoading(false);
        setTimeout(() => {
          chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    },
    [messages, isLoading]
  );

  return (
    <section id="ai-lab" ref={containerRef} className="section-wrapper relative overflow-hidden py-24 md:py-32">
      {/* Background Image with Dark Linear Gradient Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-700 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(5, 5, 5, 0.75), rgba(5, 5, 5, 0.95)), url("/ai_lab_bg.png")',
          willChange: 'transform, opacity',
        }}
      />

      {/* Dark overlay for extra text contrast */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-dark/10 via-dark/40 to-dark pointer-events-none" />

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full glow-circle-mist pointer-events-none z-[1]" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="reveal-title text-accent text-sm font-mono tracking-[0.3em] uppercase mb-3">
            — AI Lab —
          </p>
          <h2 className="reveal-title text-4xl sm:text-5xl font-bold font-heading">
            Ask <span className="text-gradient-accent">Arpit&apos;s AI</span>
          </h2>
          <p className="reveal-text mt-4 text-muted max-w-2xl mx-auto">
            An AI that knows everything about me. Ask it anything —
            skills, projects, experience, or availability.
          </p>
        </div>

        {/* Chat Interface */}
        <div className="reveal-fade relative glass-card overflow-hidden scanline">
          {/* Header Bar */}
          <div className="flex items-center gap-3 px-6 py-4 border-b border-white/5">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <div className="w-3 h-3 rounded-full bg-thunder" />
              <div className="w-3 h-3 rounded-full bg-wind" />
            </div>
            <span className="text-xs font-mono text-muted select-none">
              arpit_ai_terminal v1.0
            </span>
            <Sparkles className="ml-auto w-4 h-4 text-accent/60" />
          </div>

          {/* Messages */}
          <div className="h-[400px] overflow-y-auto p-6 space-y-4 scrollbar-thin">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${
                  msg.role === 'user' ? 'flex-row-reverse' : ''
                }`}
              >
                <div
                  className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                    msg.role === 'user'
                      ? 'bg-primary/20 text-primary'
                      : 'bg-accent/10 text-accent'
                  }`}
                >
                  {msg.role === 'user' ? (
                    <User size={14} />
                  ) : (
                    <Bot size={14} />
                  )}
                </div>
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-primary/10 text-light border border-primary/20'
                      : 'bg-white/5 text-muted border border-white/5'
                  }`}
                >
                  {msg.content}
                </div>
              </motion.div>
            ))}

            {/* Typing indicator */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
                  <Bot size={14} />
                </div>
                <div className="px-4 py-3 bg-white/5 border border-white/5 rounded-xl">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                        className="w-2 h-2 rounded-full bg-accent/60"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Suggested Questions */}
          <div className="px-6 py-3 border-t border-white/5 flex flex-wrap gap-2">
            {SUGGESTED_QUESTIONS.map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                disabled={isLoading}
                suppressHydrationWarning
                className="px-3 py-1.5 text-xs font-medium text-muted bg-white/5 hover:bg-white/10 hover:text-light rounded-full border border-white/5 transition-colors disabled:opacity-50 cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="flex items-center gap-3 px-6 py-4 border-t border-white/5">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
              placeholder="Ask me anything about Arpit..."
              disabled={isLoading}
              suppressHydrationWarning
              className="flex-1 bg-transparent text-sm text-light placeholder:text-muted/40 outline-none disabled:opacity-50"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={isLoading || !input.trim()}
              suppressHydrationWarning
              className="p-2.5 bg-accent text-dark rounded-lg hover:bg-accent-dim transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
