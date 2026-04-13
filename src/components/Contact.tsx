'use client';

import { useState, useTransition } from 'react';
import { Send, Mail, MessageCircle, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { GitHubIcon, LinkedInIcon, WhatsAppIcon } from './icons/BrandIcons';
import { AnimateIn } from './AnimateIn';
import { submitContact } from '@/app/actions/contact';

const SOCIAL_LINKS = [
  {
    href: 'mailto:raffy7792@gmail.com',
    Icon: Mail,
    label: 'Email',
    display: 'raffy7792@gmail.com',
  },
  {
    href: 'https://wa.me/639600723886',
    Icon: WhatsAppIcon,
    label: 'WhatsApp',
    display: '+63 960 072 3886',
  },
  {
    href: 'https://github.com/NullsCollection?tab=repositories',
    Icon: GitHubIcon,
    label: 'GitHub',
    display: 'NullsCollection',
  },
  {
    href: 'https://www.linkedin.com/in/raffy-francisco-50607b325/',
    Icon: LinkedInIcon,
    label: 'LinkedIn',
    display: 'raffy-francisco',
  },
] as const;

type FormStatus = 'idle' | 'success' | 'error';

const inputClass =
  'w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-muted transition-colors focus:border-secondary/50 focus:bg-white/[0.07] focus:outline-none focus:ring-1 focus:ring-secondary/30';

export function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('idle');

    startTransition(async () => {
      const result = await submitContact({ name, email, message });
      if (result.success) {
        setStatus('success');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setStatus('error');
        setErrorMessage(result.error ?? 'Something went wrong. Please try again.');
      }
    });
  };

  return (
    <section id="contact" aria-labelledby="contact-heading" className="py-24">
      <div className="mx-auto max-w-4xl px-6">
        <AnimateIn>
          <div className="mb-16">
            <p className="mb-3 text-xs font-medium uppercase tracking-widest text-tertiary">
              Get in Touch
            </p>
            <h2
              id="contact-heading"
              className="text-3xl font-semibold tracking-tight text-white"
            >
              Contact
            </h2>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {/* Form */}
          <AnimateIn>
            {status === 'success' ? (
              <div className="flex h-full flex-col items-center justify-center gap-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-8 text-center">
                <CheckCircle className="h-8 w-8 text-emerald-400" />
                <div>
                  <p className="font-medium text-white">Message sent.</p>
                  <p className="mt-1 text-sm text-muted">
                    I&apos;ll get back to you within 24 hours.
                  </p>
                </div>
                <button
                  onClick={() => setStatus('idle')}
                  className="text-sm text-muted underline-offset-2 hover:text-white hover:underline"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block text-xs font-medium text-muted"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-xs font-medium text-muted"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-xs font-medium text-muted"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="What are you working on?"
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {status === 'error' && (
                  <div className="flex items-start gap-2 rounded-lg border border-red-500/20 bg-red-500/5 p-3 text-sm text-red-400">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    {errorMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isPending}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-secondary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-[#202124] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isPending ? 'Sending…' : 'Send Message'}
                  {!isPending && <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />}
                </button>
              </form>
            )}
          </AnimateIn>

          {/* Sidebar */}
          <AnimateIn delay={0.12}>
            <div className="flex flex-col gap-8">
              <div>
                <p className="mb-4 text-sm leading-relaxed text-white/70">
                  Prefer a faster response? Reach out directly — I check everything daily.
                </p>
                <ul className="flex flex-col gap-3" role="list">
                  {SOCIAL_LINKS.map(({ href, Icon, label, display }) => (
                    <li key={label}>
                      <a
                        href={href}
                        target={href.startsWith('mailto') ? undefined : '_blank'}
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 text-sm text-muted transition-colors hover:text-white"
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-colors group-hover:border-white/20">
                          <Icon className="h-3.5 w-3.5" />
                        </span>
                        <span>
                          <span className="mr-2 font-medium text-white/40">{label}</span>
                          {display}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* AI chat CTA */}
              <div className="rounded-xl border border-secondary/20 bg-secondary/5 p-5">
                <div className="mb-3 flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-secondary" aria-hidden="true" />
                  <p className="text-sm font-medium text-white">Have a quick question?</p>
                </div>
                <p className="mb-4 text-xs leading-relaxed text-muted">
                  Chat with my AI assistant for instant answers about my skills, availability,
                  and projects.
                </p>
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('open-chat-widget'))}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-secondary transition-colors hover:text-white"
                >
                  Chat with my AI assistant
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
