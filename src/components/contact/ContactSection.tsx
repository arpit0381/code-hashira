'use client';

import { useRef, useState, useEffect } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactSection() {
  const containerRef = useScrollReveal();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Auto-save draft to localStorage
  useEffect(() => {
    const saved = localStorage.getItem('contact-draft');
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
      } catch {
        // ignore
      }
    }
  }, []);

  useEffect(() => {
    if (formData.name || formData.email || formData.message) {
      localStorage.setItem('contact-draft', JSON.stringify(formData));
    }
  }, [formData]);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!validateEmail(formData.email))
      newErrors.email = 'Invalid email format';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulated
      setIsSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      localStorage.removeItem('contact-draft');
    } catch {
      // Error handling
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <section id="contact" ref={containerRef} className="section-wrapper relative overflow-hidden py-24 md:py-32">
      {/* Background Image with Dark Linear Gradient Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-700 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(5, 5, 5, 0.75), rgba(5, 5, 5, 0.95)), url("/contact_bg.png")',
          willChange: 'transform, opacity',
        }}
      />

      {/* Dark overlay for extra text contrast */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-dark/10 via-dark/40 to-dark pointer-events-none" />

      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full glow-circle-primary pointer-events-none z-[1]" />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14">
          <p className="reveal-title text-accent text-sm font-mono tracking-[0.3em] uppercase mb-3">
            — Contact —
          </p>
          <h2 className="reveal-title text-4xl sm:text-5xl font-bold font-heading">
            Send a <span className="text-gradient-primary">Signal</span>
          </h2>
          <p className="reveal-text mt-4 text-muted max-w-2xl mx-auto">
            Ready to build something extraordinary together?
            Drop me a message and let&apos;s create the future.
          </p>
        </div>

        {/* Form or Success State */}
        {isSuccess ? (
          <div className="reveal-fade glass-card p-12 text-center">
            <div className="w-24 h-[2px] bg-accent mx-auto mb-8 animate-pulse" />
            <CheckCircle className="w-16 h-16 text-accent mx-auto mb-4 animate-bounce" />
            <h3 className="text-2xl font-bold font-heading text-light mb-2">
              Message Received, Hashira.
            </h3>
            <p className="text-muted">
              I&apos;ll get back to you faster than a Thunder Breathing technique.
            </p>
            <button
              onClick={() => setIsSuccess(false)}
              suppressHydrationWarning
              className="mt-6 px-6 py-2.5 text-sm text-accent border border-accent/30 rounded-lg hover:bg-accent/5 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              Send Another
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="reveal-fade glass-card p-8 relative z-10"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              {/* Name */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-sm text-muted mb-2"
                >
                  Name *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  suppressHydrationWarning
                  className={`w-full px-4 py-3 text-sm bg-white/5 border rounded-lg text-light placeholder:text-muted/40 outline-none transition-all ${
                    errors.name
                      ? 'border-primary/60 focus:border-primary'
                      : 'border-white/10 focus:border-accent/40'
                  }`}
                />
                {errors.name && (
                  <p className="text-xs text-primary mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-sm text-muted mb-2"
                >
                  Email *
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  suppressHydrationWarning
                  className={`w-full px-4 py-3 text-sm bg-white/5 border rounded-lg text-light placeholder:text-muted/40 outline-none transition-all ${
                    errors.email
                      ? 'border-primary/60 focus:border-primary'
                      : 'border-white/10 focus:border-accent/40'
                  }`}
                />
                {errors.email && (
                  <p className="text-xs text-primary mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Subject */}
            <div className="mb-5">
              <label
                htmlFor="contact-subject"
                className="block text-sm text-muted mb-2"
              >
                Subject
              </label>
              <input
                id="contact-subject"
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Project discussion, collaboration, etc."
                suppressHydrationWarning
                className="w-full px-4 py-3 text-sm bg-white/5 border border-white/10 rounded-lg text-light placeholder:text-muted/40 outline-none focus:border-accent/40 transition-colors"
              />
            </div>

            {/* Message */}
            <div className="mb-6">
              <label
                htmlFor="contact-message"
                className="block text-sm text-muted mb-2"
              >
                Message *
              </label>
              <textarea
                id="contact-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about your project or idea..."
                rows={5}
                suppressHydrationWarning
                className={`w-full px-4 py-3 text-sm bg-white/5 border rounded-lg text-light placeholder:text-muted/40 outline-none transition-all resize-none ${
                  errors.message
                    ? 'border-primary/60 focus:border-primary'
                    : 'border-white/10 focus:border-accent/40'
                }`}
              />
              {errors.message && (
                <p className="text-xs text-primary mt-1">{errors.message}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              suppressHydrationWarning
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-accent text-dark font-semibold rounded-lg hover:bg-accent-dim hover:scale-102 active:scale-98 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-dark/30 border-t-dark rounded-full animate-spin" />
              ) : (
                <>
                  <Send size={16} />
                  Send Message
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
