import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  Lock,
  Mail,
  Eye,
  EyeOff,
  CheckCircle2,
  Copy,
  Check,
  ArrowRight,
  UserCheck,
  AlertTriangle
} from 'lucide-react';
import { useAuth, DEMO_ACCOUNTS } from '../../context/AuthContext';
import { AuthTransitionScreen } from '../../components/auth/AuthTransitionScreen';

export const Login = () => {
  const navigate = useNavigate();
  const { login, selectDemoAccount } = useAuth();

  const [email, setEmail] = useState('manager@forgemind.ai');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedRole, setCopiedRole] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [capsLockOn, setCapsLockOn] = useState(false);

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionUser, setTransitionUser] = useState(null);

  // Caps Lock detection
  const handleKeyDown = (e) => {
    if (e.getModifierState) {
      setCapsLockOn(e.getModifierState('CapsLock'));
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCopyEmail = (acc) => {
    navigator.clipboard.writeText(acc.email);
    setEmail(acc.email);
    setPassword(acc.password);
    setCopiedRole(acc.role);
    showToast(`Loaded ${acc.role} credentials (${acc.email})`);
    setTimeout(() => setCopiedRole(null), 2000);
  };

  const handleQuickLogin = (acc) => {
    selectDemoAccount(acc);
    setTransitionUser(acc);
    setIsTransitioning(true);
  };

  const handleTransitionComplete = () => {
    const targetUser = transitionUser || DEMO_ACCOUNTS[2];
    if (targetUser.role === 'Worker') navigate('/worker');
    else if (targetUser.role === 'Safety Officer') navigate('/safety');
    else navigate('/dashboard');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      const loggedUser = await login(email, password);
      setTransitionUser(loggedUser);
      setIsTransitioning(true);
    } catch (err) {
      showToast('Authentication failed. Using default session.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#030712] text-slate-100 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 relative font-sans selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 right-6 z-50 px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-cyan-300 text-xs font-mono font-semibold shadow-2xl flex items-center gap-2.5 backdrop-blur-md"
          >
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Centered Minimal Container */}
      <div className="w-full max-w-md space-y-8 z-10">
        
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20 border border-cyan-400/30">
            <Shield className="w-6 h-6" />
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl font-extrabold text-white tracking-tight font-sans">
              ForgeMind <span className="text-cyan-400">Sentinel AI</span>
            </h1>
            <p className="text-xs text-slate-400 font-medium">
              Industrial AI Safety & Predictive Maintenance Platform
            </p>
          </div>
        </div>

        {/* Minimal Enterprise Login Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl space-y-6">
          
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-white tracking-tight">
              Sign in to your account
            </h2>
            <p className="text-xs text-slate-400">
              Enter your enterprise credentials to access command core
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300 block">
                Work Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={handleKeyDown}
                  required
                  placeholder="name@forgemind.ai"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 transition"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-medium text-slate-300 block">
                  Password
                </label>
                {capsLockOn && (
                  <span className="text-[10px] text-amber-400 font-mono font-bold flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    Caps Lock is ON
                  </span>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyDown}
                  required
                  placeholder="••••••••••••"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-10 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition"
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password Row */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded bg-slate-950 border-slate-800 text-cyan-500 focus:ring-cyan-500/40"
                />
                <span>Remember me</span>
              </label>
              <button
                type="button"
                onClick={() => showToast('Password reset link sent to work email')}
                className="text-cyan-400 hover:text-cyan-300 transition font-medium"
              >
                Forgot password?
              </button>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/10 transition flex items-center justify-center gap-2 active:scale-[0.99]"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Accounts */}
          <div className="space-y-3 pt-2 border-t border-slate-800/80">
            <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span>QUICK DEMO ACCOUNTS</span>
              <span>1-Click Tester</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {DEMO_ACCOUNTS.map((acc, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/90 hover:border-cyan-500/40 transition text-center space-y-1.5 group"
                >
                  <span className="text-[11px] font-bold text-slate-200 group-hover:text-cyan-300 block truncate">
                    {acc.role}
                  </span>
                  
                  <div className="flex items-center justify-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleCopyEmail(acc)}
                      className="p-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-cyan-400 border border-slate-800 transition"
                      title="Copy email"
                    >
                      {copiedRole === acc.role ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickLogin(acc)}
                      className="px-2 py-1 rounded bg-slate-900 hover:bg-cyan-500 hover:text-slate-950 text-slate-300 font-mono text-[10px] font-bold transition border border-slate-800"
                    >
                      Login
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Small Bottom Feature List & Footer */}
        <div className="text-center space-y-3">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-xs text-slate-400">
            <span>AI Hazard Detection</span>
            <span>•</span>
            <span>Predictive Maintenance</span>
            <span>•</span>
            <span>Computer Vision</span>
            <span>•</span>
            <span>Live Telemetry</span>
            <span>•</span>
            <span>Executive Analytics</span>
          </div>

          <p className="text-[11px] text-slate-500 font-mono">
            © 2026 ForgeMind AI Inc. • ISO-45001 & ISO-27001 Certified
          </p>
        </div>

      </div>

      {/* Microsoft Azure-Style Authentication Transition Overlay Screen */}
      <AnimatePresence>
        {isTransitioning && (
          <AuthTransitionScreen
            user={transitionUser}
            onComplete={handleTransitionComplete}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
