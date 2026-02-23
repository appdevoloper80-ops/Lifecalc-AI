/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  IndianRupee, 
  Briefcase, 
  Clock, 
  Home, 
  Trophy, 
  User, 
  ChevronLeft, 
  Share2, 
  Mic, 
  Calculator as CalcIcon,
  Flame,
  CheckCircle2,
  Plus,
  Minus,
  X,
  Divide,
  Sigma,
  Zap,
  Equal
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  ResponsiveContainer,
  YAxis,
  XAxis,
  Tooltip
} from 'recharts';
import { Page, CalculationResult, UserData } from './types';

// --- Components ---

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  key?: React.Key;
}

const GlassCard = ({ children, className = "" }: GlassCardProps) => (
  <div className={`glass-card p-6 ${className}`}>
    {children}
  </div>
);

const BottomNav = ({ currentPage, setPage }: { currentPage: Page, setPage: (p: Page) => void }) => {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'challenges', icon: Trophy, label: 'Challenges' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 glass h-14 flex items-center justify-around px-6 z-50">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setPage(item.id as Page)}
      className={`relative flex flex-col items-center transition-all ${
            currentPage === item.id ? 'text-cyan-vibrant' : 'text-white/60'
          }`}
        >
          <item.icon size={18} />
          <span className="text-[8px] uppercase tracking-widest font-medium">{item.label}</span>
          {currentPage === item.id && (
            <motion.div
              layoutId="nav-glow"
              className="absolute -bottom-1 w-5 h-0.5 bg-cyan-vibrant rounded-full shadow-[0_0_6px_#00e5ff]"
            />
          )}
        </button>
      ))}
    </div>
  );
};

// --- Pages ---

const SplashScreen = ({ onFinish }: { onFinish: () => void }) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center z-[100] bg-gradient-to-br from-teal-deep to-cyan-vibrant">
      <motion.div
        animate={{ scale: [0.9, 1.1, 0.9] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="w-40 h-40 rounded-full bg-white/20 backdrop-blur-3xl border border-white/30 shadow-[0_0_50px_rgba(0,229,255,0.5)] flex items-center justify-center"
      >
        <div className="w-24 h-24 rounded-full bg-cyan-vibrant/40 animate-pulse" />
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 font-display text-5xl font-bold text-white text-glow"
      >
        LifeCalc AI
      </motion.h1>
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        onClick={onFinish}
        className="absolute bottom-20 btn-amber overflow-hidden group"
      >
        <span className="relative z-10">Tap to Analyze</span>
        <motion.div
          animate={{ x: ['-100%', '100%'] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          className="absolute inset-0 bg-white/20 skew-x-12"
        />
      </motion.button>
    </div>
  );
};

const Dashboard = ({ setPage, userData }: { setPage: (p: Page) => void, userData: UserData }) => {
  const categories = [
    { id: 'health', icon: Heart, label: 'Health', color: 'text-cyan-vibrant' },
    { id: 'money', icon: IndianRupee, label: 'Money', color: 'text-amber-vibrant' },
    { id: 'career', icon: Briefcase, label: 'Career', color: 'text-violet-vibrant' },
    { id: 'daily', icon: Clock, label: 'Daily', color: 'text-teal-400' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-6 pb-16"
    >
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-display font-bold">Dashboard</h2>
        <button onClick={() => setPage('calculator')} className="glass p-3 rounded-xl text-cyan-vibrant">
          <CalcIcon size={24} />
        </button>
      </div>

      <GlassCard className="mb-8 relative overflow-hidden">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-white/60 text-sm uppercase tracking-widest font-bold mb-1">Life Score</p>
            <h3 className="text-5xl font-display font-bold text-glow">{userData.lifeScore}/100</h3>
          </div>
          <div className="w-32 h-16 flex items-end gap-1">
            {[40, 60, 45, 70, 65, 80, 72].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                className="flex-1 bg-cyan-vibrant/40 rounded-t-sm"
              />
            ))}
          </div>
        </div>
      </GlassCard>

      <div className="grid grid-cols-2 gap-4">
        {categories.map((cat) => (
          <motion.button
            key={cat.id}
            whileTap={{ scale: 0.95 }}
            onClick={() => setPage(cat.id as Page)}
            className="glass-card aspect-square flex flex-col items-center justify-center gap-3 group"
          >
            <div className={`p-4 rounded-2xl bg-white/5 group-hover:bg-white/10 transition-colors ${cat.color}`}>
              <cat.icon size={32} />
            </div>
            <span className="font-bold tracking-wide">{cat.label}</span>
          </motion.button>
        ))}
      </div>

      <div className="mt-8">
        <h4 className="text-lg font-bold mb-4">Active Challenges</h4>
        <div className="space-y-4">
          <GlassCard className="flex items-center gap-4 py-4">
            <div className="w-12 h-12 rounded-full bg-cyan-vibrant/20 flex items-center justify-center text-cyan-vibrant">
              <Zap size={24} />
            </div>
            <div className="flex-1">
              <p className="font-bold text-sm">Walk 10k Steps</p>
              <div className="w-full h-1.5 bg-white/10 rounded-full mt-2 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '70%' }}
                  className="h-full bg-cyan-vibrant shadow-[0_0_10px_#00e5ff]"
                />
              </div>
            </div>
            <div className="text-xs font-bold text-cyan-vibrant">+5 Score</div>
          </GlassCard>
        </div>
      </div>
    </motion.div>
  );
};

const InputPage = ({ category, onPredict, onBack }: { category: string, onPredict: (res: CalculationResult) => void, onBack: () => void }) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isPredicting, setIsPredicting] = useState(false);

  const fields = useMemo(() => {
    switch (category) {
      case 'health':
        return [
          { id: 'weight', label: 'Weight (kg)', placeholder: '70' },
          { id: 'height', label: 'Height (cm)', placeholder: '175' },
          { id: 'age', label: 'Age', placeholder: '25' },
        ];
      case 'money':
        return [
          { id: 'principal', label: 'Principal (₹)', placeholder: '100000' },
          { id: 'rate', label: 'Interest Rate (%)', placeholder: '10' },
          { id: 'years', label: 'Years', placeholder: '5' },
        ];
      case 'career':
        return [
          { id: 'salary', label: 'Current Salary', placeholder: '50000' },
          { id: 'raise', label: 'Exp. Raise (%)', placeholder: '15' },
          { id: 'years', label: 'Years', placeholder: '3' },
        ];
      default:
        return [];
    }
  }, [category]);

  const handlePredict = () => {
    setIsPredicting(true);
    setTimeout(() => {
      let result: CalculationResult;
      const w = parseFloat(formData.weight) || 70;
      const h = parseFloat(formData.height) || 175;
      const a = parseFloat(formData.age) || 25;

      if (category === 'health') {
        const bmi = w / ((h / 100) ** 2);
        const bmr = 10 * w + 6.25 * h - 5 * a + 5;
        const idealWeight = h - 100 - (h - 150) / 2;
        
        let interpretation = "";
        if (bmi < 18.5) interpretation = "Your weight is lower than the ideal range for your height.";
        else if (bmi < 25) interpretation = "Your weight is in the healthy range for your height.";
        else if (bmi < 30) interpretation = "Your weight is slightly above the ideal range for your height.";
        else interpretation = "Your weight is significantly above the ideal range for your height.";

        result = {
          title: 'Health Projection',
          score: bmi,
          formula: `BMI = ${w} / (${h / 100}²) = ${bmi.toFixed(1)}`,
          details: [
            `BMI: ${bmi.toFixed(1)} ${bmi < 25 ? '✅' : '⚠️'}`,
            `BMR: ${bmr.toFixed(0)} kcal/day`,
            `Ideal Weight: ${idealWeight.toFixed(1)} kg`
          ],
          breakdown: [
            { label: 'Weight', value: `${w}kg` },
            { label: 'Height', value: `${(h/100).toFixed(1)}m` },
            { label: 'Calculation', value: `${w} ÷ (${(h/100).toFixed(1)} × ${(h/100).toFixed(1)})` },
            { label: 'Result', value: bmi.toFixed(1) }
          ],
          interpretation,
          category: 'health'
        };
      } else if (category === 'money') {
        const p = parseFloat(formData.principal) || 100000;
        const r = (parseFloat(formData.rate) || 10) / 100;
        const n = parseFloat(formData.years) || 5;
        const fv = p * (1 + r) ** n;
        result = {
          title: 'Wealth Projection',
          score: fv / 1000,
          formula: `FV = ${p} * (1 + ${r})^${n}`,
          details: [
            `Projected Value: ₹${fv.toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
            `Estimated Interest: ₹${(fv - p).toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
            `Savings Goal: Projected Progress 🚀`
          ],
          breakdown: [
            { label: 'Principal', value: `₹${p.toLocaleString()}` },
            { label: 'Rate', value: `${(r * 100).toFixed(1)}%` },
            { label: 'Years', value: `${n} years` },
            { label: 'Final Value', value: `₹${fv.toLocaleString(undefined, { maximumFractionDigits: 0 })}` }
          ],
          interpretation: `Your investment is projected to grow by ₹${(fv - p).toLocaleString()} over ${n} years.`,
          category: 'money'
        };
      } else {
        result = {
          title: 'Career Projection',
          score: 92,
          formula: 'Growth = Current * (1 + rate)^years',
          details: ['Potential promotion in 1.2 years', 'Salary growth estimate: +45%', 'Skill match: 94%'],
          breakdown: [
            { label: 'Current Salary', value: formData.salary || '50000' },
            { label: 'Raise Rate', value: `${formData.raise || '15'}%` },
            { label: 'Timeline', value: `${formData.years || '3'} years` },
            { label: 'Projection', value: 'High Growth' }
          ],
          interpretation: "Your career path shows strong growth potential with a high likelihood of promotion.",
          category: 'career'
        };
      }
      onPredict(result);
      setIsPredicting(false);
    }, 2000);
  };

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-50 glass flex flex-col"
    >
      <div className="p-6 flex items-center justify-between border-b border-white/10">
        <button onClick={onBack} className="p-2 glass rounded-xl"><ChevronLeft /></button>
        <h3 className="text-xl font-display font-bold capitalize">{category} Estimator</h3>
        <button className="p-2 glass rounded-xl"><Share2 size={20} /></button>
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        <div className="space-y-6 mt-4">
          {fields.map((field) => (
            <div key={field.id} className="relative">
              <input
                type="number"
                placeholder={field.placeholder}
                value={formData[field.id] || ''}
                onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                className="w-full h-16 glass bg-white/5 rounded-2xl px-6 pt-6 pb-2 outline-none border border-white/10 focus:border-cyan-vibrant transition-colors text-lg"
              />
              <label className="absolute left-6 top-2 text-[10px] uppercase font-bold text-white/40 tracking-widest">
                {field.label}
              </label>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-8">
          <button
            onClick={handlePredict}
            disabled={isPredicting}
            className="w-full btn-amber relative overflow-hidden h-16 flex items-center justify-center"
          >
            {isPredicting ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="w-6 h-6 border-2 border-teal-deep border-t-transparent rounded-full"
              />
            ) : (
              <span className="text-xl uppercase tracking-widest">Analyze</span>
            )}
          </button>

          <button className="w-16 h-16 rounded-full glass flex items-center justify-center text-cyan-vibrant animate-pulse">
            <Mic size={28} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const FormulaCurve = ({ category }: { category: string }) => {
  const data = useMemo(() => {
    // Mock curve data based on category
    return Array.from({ length: 20 }, (_, i) => ({
      x: i,
      y: category === 'health' ? 40 / (1 + i * 0.1) : 10 * Math.pow(1.1, i)
    }));
  }, [category]);

  return (
    <div className="w-full h-full min-h-[200px] bg-white/5 rounded-3xl p-6 border border-white/10 flex flex-col">
      <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-4 text-center">Formula Curve</span>
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <Line 
              type="monotone" 
              dataKey="y" 
              stroke="#9c4aff" 
              strokeWidth={3} 
              dot={false}
              animationDuration={2000}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const ResultsPage = ({ result, onBack }: { result: CalculationResult, onBack: () => void }) => {
  const scoreColor = result.score > 80 ? 'text-cyan-vibrant' : result.score > 50 ? 'text-amber-vibrant' : 'text-red-400';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 sm:p-8 pb-24 min-h-screen flex flex-col"
    >
      <div className="w-full flex justify-between mb-8">
        <button onClick={onBack} className="p-2 glass rounded-xl"><ChevronLeft /></button>
        <h3 className="text-xl font-display font-bold">Analysis Result</h3>
        <div className="w-10" />
      </div>

      <div className="glass-card p-6 sm:p-10 flex flex-col lg:flex-row gap-10">
        <div className="flex-1">
          <div className="mb-8">
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest block mb-2">Final Result</span>
            <motion.h2 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`text-7xl sm:text-8xl font-display font-bold ${scoreColor} leading-none`}
            >
              {result.score.toFixed(2)}
            </motion.h2>
            {result.interpretation && (
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-4 text-sm text-white/60 font-medium max-w-md"
              >
                {result.interpretation}
              </motion.p>
            )}
          </div>

          <div className="space-y-6">
            <h4 className="text-sm font-bold text-white/60 uppercase tracking-wider">Step-by-step Breakdown</h4>
            <div className="space-y-3">
              {result.breakdown?.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/5 border border-white/5 rounded-2xl p-4 flex items-center gap-4"
                >
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold text-white/40">
                    {i + 1}
                  </div>
                  <div className="flex-1 text-sm font-medium text-white/80">
                    <span className="text-white/40">{step.label}:</span> {step.value}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:w-1/3 flex flex-col gap-6">
          <FormulaCurve category={result.category} />
          
          <div className="space-y-3">
            {result.details.map((detail, i) => (
              <div key={i} className="bg-white/5 border border-white/5 rounded-xl p-3 flex justify-between items-center text-xs">
                <span className="text-white/60">{detail}</span>
                <CheckCircle2 className="text-cyan-vibrant" size={14} />
              </div>
            ))}
          </div>

          <button className="w-full btn-amber mt-auto uppercase tracking-widest text-sm py-4">
            Apply Improvements
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const CalculatorPage = ({ onBack }: { onBack: () => void }) => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');

  const buttons = [
    'C', '√', '^', '/',
    '7', '8', '9', '*',
    '4', '5', '6', '-',
    '1', '2', '3', '+',
    '0', '.', '=', 'DEL'
  ];

  const handlePress = (btn: string) => {
    if (btn === 'C') {
      setDisplay('0');
      setEquation('');
    } else if (btn === 'DEL') {
      setDisplay(display.length > 1 ? display.slice(0, -1) : '0');
    } else if (btn === '=') {
      try {
        // Simple eval for demo, in real app use a math parser
        const res = eval(display.replace('^', '**'));
        setEquation(`${display} =`);
        setDisplay(String(res));
      } catch {
        setDisplay('Error');
      }
    } else {
      setDisplay(display === '0' ? btn : display + btn);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-4 sm:p-6 min-h-screen flex flex-col overflow-y-auto"
    >
      <div className="flex items-center gap-4 mb-4 sm:mb-8">
        <button onClick={onBack} className="p-2 glass rounded-xl"><ChevronLeft /></button>
        <h3 className="text-xl font-display font-bold">Advanced Calc</h3>
      </div>

      <GlassCard className="mb-4 sm:mb-8 h-24 sm:h-32 flex flex-col justify-end items-end p-4 sm:p-6 shrink-0">
        <div className="text-white/40 text-xs sm:text-sm font-mono mb-1">{equation}</div>
        <div className="text-2xl sm:text-4xl font-display font-bold text-glow truncate w-full text-right">{display}</div>
      </GlassCard>

      <div className="grid grid-cols-4 gap-2 sm:gap-3 flex-1 min-h-[350px] pb-4">
        {buttons.map((btn) => (
          <motion.button
            key={btn}
            whileTap={{ scale: 0.9 }}
            onClick={() => handlePress(btn)}
            className={`glass-card flex items-center justify-center text-lg sm:text-xl font-bold ${
              ['/', '*', '-', '+', '=', '√', '^'].includes(btn) ? 'text-amber-vibrant' : ''
            } ${btn === '=' ? 'bg-amber-vibrant/20 border-amber-vibrant/40' : ''}`}
          >
            {btn === '/' ? <Divide size={20} /> : 
             btn === '*' ? <X size={20} /> : 
             btn === '-' ? <Minus size={20} /> : 
             btn === '+' ? <Plus size={20} /> : 
             btn === '√' ? <Sigma size={20} /> : 
             btn === '=' ? <Equal size={20} /> :
             btn}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

const ProfilePage = ({ userData }: { userData: UserData }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 pb-16"
    >
      <div className="flex flex-col items-center mb-12">
        <div className="relative mb-4">
          <div className="w-32 h-32 rounded-full glass p-1">
            <img 
              src="https://picsum.photos/seed/user/200/200" 
              alt="Avatar" 
              className="w-full h-full rounded-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-cyan-vibrant flex items-center justify-center shadow-lg">
            <Zap size={16} className="text-teal-deep" />
          </div>
        </div>
        <h3 className="text-2xl font-display font-bold">Alex Architect</h3>
        <p className="text-white/40 font-bold uppercase tracking-widest text-xs mt-1">Level 12 Life Architect</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <GlassCard className="flex flex-col items-center py-4">
          <span className="text-2xl font-bold text-cyan-vibrant">1,240</span>
          <span className="text-[10px] uppercase font-bold text-white/40">Points</span>
        </GlassCard>
        <GlassCard className="flex flex-col items-center py-4">
          <span className="text-2xl font-bold text-amber-vibrant">12</span>
          <span className="text-[10px] uppercase font-bold text-white/40">Streak</span>
        </GlassCard>
      </div>

      <h4 className="text-lg font-bold mb-4">Life Score History</h4>
      <GlassCard className="h-48 flex items-end justify-between gap-2 p-4">
        {userData.history.map((h, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-2">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${h.score}%` }}
              className="w-full bg-gradient-to-t from-cyan-vibrant/20 to-cyan-vibrant rounded-t-lg shadow-[0_0_10px_rgba(0,229,255,0.3)]"
            />
            <span className="text-[8px] font-bold text-white/40">{h.date}</span>
          </div>
        ))}
      </GlassCard>

      <button className="w-full glass-card py-4 mt-8 flex items-center justify-center gap-3 font-bold text-white/60">
        <Share2 size={20} />
        <span>Share Profile QR</span>
      </button>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const [page, setPage] = useState<Page>('splash');
  const [prevPage, setPrevPage] = useState<Page>('splash');
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [result, setResult] = useState<CalculationResult | null>(null);

  const [userData] = useState<UserData>({
    name: "Alex",
    lifeScore: 72,
    history: [
      { date: 'Jan', score: 65 },
      { date: 'Feb', score: 68 },
      { date: 'Mar', score: 72 },
      { date: 'Apr', score: 70 },
      { date: 'May', score: 75 },
      { date: 'Jun', score: 72 },
    ]
  });

  const handleSetPage = (p: Page) => {
    setPrevPage(page);
    setPage(p);
  };

  const handlePredict = (res: CalculationResult) => {
    setResult(res);
    setPage('results');
  };

  const renderPage = () => {
    switch (page) {
      case 'splash':
        return <SplashScreen onFinish={() => handleSetPage('home')} />;
      case 'home':
        return <Dashboard setPage={(p) => {
          if (['health', 'money', 'career', 'daily'].includes(p)) {
            setActiveCategory(p);
          }
          handleSetPage(p);
        }} userData={userData} />;
      case 'health':
      case 'money':
      case 'career':
      case 'daily':
        return <InputPage category={activeCategory} onPredict={handlePredict} onBack={() => handleSetPage('home')} />;
      case 'results':
        return result ? <ResultsPage result={result} onBack={() => handleSetPage('home')} /> : null;
      case 'calculator':
        return <CalculatorPage onBack={() => handleSetPage('home')} />;
      case 'profile':
        return <ProfilePage userData={userData} />;
      case 'challenges':
        return (
          <div className="p-6 pb-16">
            <h2 className="text-2xl font-display font-bold mb-8">Challenges</h2>
            <div className="space-y-4">
              {['Walk 10k Steps', 'Save ₹500 today', 'Read for 30 mins', 'No Sugar Day'].map((c, i) => (
                <GlassCard key={i} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-cyan-vibrant/20 flex items-center justify-center text-cyan-vibrant">
                    <Zap size={24} />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold">{c}</p>
                    <div className="text-xs text-white/40">Progress: {i * 25}%</div>
                  </div>
                  <Flame className={i === 0 ? 'text-amber-vibrant animate-bounce' : 'text-white/20'} size={20} />
                </GlassCard>
              ))}
            </div>
          </div>
        );
      default:
        return <div className="p-6">Page not found</div>;
    }
  };

  return (
    <div className="relative min-h-screen font-sans">
      <AnimatePresence mode="wait">
        {renderPage()}
      </AnimatePresence>
      
      {page !== 'splash' && page !== 'results' && !['health', 'money', 'career', 'daily'].includes(page) && (
        <BottomNav currentPage={page} setPage={handleSetPage} />
      )}
    </div>
  );
}
