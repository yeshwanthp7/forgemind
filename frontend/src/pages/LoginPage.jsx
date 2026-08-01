import React, { useState } from 'react';
import { Shield, Lock, Mail, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';

export const LoginPage = () => {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState('alex.vance@enterprise.io');
  const [password, setPassword] = useState('••••••••••••');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter valid security credentials');
      return;
    }
    setError('');
    try {
      await login(email, password);
    } catch (err) {
      setError('Authentication failed. Please verify credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-[#07090e] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <Card variant="glass" glow className="w-full max-w-md p-8 relative z-10">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-[0_0_25px_rgba(6,182,212,0.4)] mb-4">
            <Shield className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold font-mono text-slate-100 tracking-tight">
            NEBULA <span className="text-cyan-400 font-normal">AUTH</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">Enterprise Access Control Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Security Identifier / Email"
            type="email"
            icon={Mail}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="operator@enterprise.io"
            required
          />

          <Input
            label="Access Key / Password"
            type="password"
            icon={Lock}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••"
            required
          />

          {error && (
            <p className="text-xs text-rose-400 bg-rose-950/40 border border-rose-500/30 p-2.5 rounded-lg text-center font-medium">
              {error}
            </p>
          )}

          <Button
            type="submit"
            variant="primary"
            fullWidth
            loading={loading}
            rightIcon={ArrowRight}
            size="lg"
          >
            Authenticate Session
          </Button>
        </form>

        <div className="mt-8 pt-4 border-t border-slate-800/80 text-center text-xs text-slate-500 font-mono">
          <span>RESTRICTED SYSTEM • AUTHORIZED PERSONNEL ONLY</span>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
