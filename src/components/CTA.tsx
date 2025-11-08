import { useState } from 'react';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';

export default function CTA() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/newsletter`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {
        setStatus('success');
        setMessage('Welcome! Check your email for updates.');
        setEmail('');
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
        setMessage('Something went wrong. Please try again.');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch (error) {
      setStatus('error');
      setMessage('Network error. Please try again.');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-500 to-primary-700" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Ready to Discover Algeria?
          </h2>
          <p className="text-lg text-primary-100 max-w-2xl mx-auto">
            Get early access, exclusive tips, and AI travel recommendations delivered to your inbox.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto animate-fade-in-up"
          style={{ animationDelay: '0.1s' }}
        >
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Mail className="absolute left-4 top-4 w-5 h-5 text-primary-200" />
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'loading'}
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-primary-100/70 focus:outline-none focus:border-white/50 focus:bg-white/20 transition-all duration-300 disabled:opacity-50"
              />
            </div>
            <button
              type="submit"
              disabled={status === 'loading' || !email}
              className="px-8 py-3 bg-white hover:bg-slate-50 text-primary-600 font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
            </button>
          </div>

          {status === 'success' && (
            <div className="mt-4 flex items-center gap-2 text-white animate-fade-in-up">
              <CheckCircle className="w-5 h-5" />
              <span>{message}</span>
            </div>
          )}

          {status === 'error' && (
            <div className="mt-4 flex items-center gap-2 text-red-200 animate-fade-in-up">
              <AlertCircle className="w-5 h-5" />
              <span>{message}</span>
            </div>
          )}
        </form>

        <p className="text-center text-primary-100/70 text-sm mt-6">
          Join 50,000+ explorers already using Contouria. No spam, just great travel tips.
        </p>
      </div>
    </section>
  );
}
