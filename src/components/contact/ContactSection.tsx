'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';
import { staggerContainer, fadeInUp } from '@/features/animations/variants';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
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
      // TODO: Submit to Supabase contacts table
      // const { error } = await supabase.from('contacts').insert(formData);
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
    <section id="contact" className="section-wrapper relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full glow-circle-primary pointer-events-none" />

      <div className="max-w-3xl mx-auto" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-14"
        >
          <motion.p
            variants={fadeInUp}
            className="text-accent text-sm font-mono tracking-[0.3em] uppercase mb-3"
          >
            — Contact —
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="text-4xl sm:text-5xl font-bold font-heading"
          >
            Send a <span className="text-gradient-primary">Signal</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mt-4 text-muted max-w-2xl mx-auto"
          >
            Ready to build something extraordinary together?
            Drop me a message and let&apos;s create the future.
          </motion.p>
        </motion.div>

        {/* Form or Success State */}
        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-12 text-center"
          >
            {/* Slash animation */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1] }}
              className="w-24 h-[2px] bg-accent mx-auto mb-8"
            />
            <CheckCircle className="w-16 h-16 text-accent mx-auto mb-4" />
            <h3 className="text-2xl font-bold font-heading text-light mb-2">
              Message Received, Hashira.
            </h3>
            <p className="text-muted">
              I&apos;ll get back to you faster than a Thunder Breathing technique.
            </p>
            <button
              onClick={() => setIsSuccess(false)}
              suppressHydrationWarning
              className="mt-6 px-6 py-2.5 text-sm text-accent border border-accent/30 rounded-lg hover:bg-accent/5 transition-colors"
            >
              Send Another
            </button>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="glass-card p-8"
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
                  className={`w-full px-4 py-3 text-sm bg-white/5 border rounded-lg text-light placeholder:text-muted/40 outline-none transition-colors ${
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
                  className={`w-full px-4 py-3 text-sm bg-white/5 border rounded-lg text-light placeholder:text-muted/40 outline-none transition-colors ${
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
                className={`w-full px-4 py-3 text-sm bg-white/5 border rounded-lg text-light placeholder:text-muted/40 outline-none transition-colors resize-none ${
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
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              suppressHydrationWarning
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-accent text-dark font-semibold rounded-lg hover:bg-accent-dim transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-5 h-5 border-2 border-dark/30 border-t-dark rounded-full"
                />
              ) : (
                <>
                  <Send size={16} />
                  Send Message
                </>
              )}
            </motion.button>
          </motion.form>
        )}
      </div>
    </section>
  );
}
