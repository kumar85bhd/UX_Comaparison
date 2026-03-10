import React from 'react';
import { motion } from 'framer-motion';

const RobotAnimation: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Outer Glows */}
      <motion.div
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-[100px]"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-[80px]"
      />

      {/* Robot Body */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 2, 0, -2, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative z-10 w-32 h-32 md:w-48 md:h-48"
      >
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_0_30px_rgba(79,70,229,0.3)]">
          {/* Head */}
          <motion.path
            d="M60 80C60 57.9086 77.9086 40 100 40C122.091 40 140 57.9086 140 80V100H60V80Z"
            fill="currentColor"
            className="text-slate-800 dark:text-slate-200"
          />
          {/* Eyes with Glow */}
          <g>
            <motion.circle
              cx="85" cy="75" r="6"
              animate={{ scaleY: [1, 0.1, 1] }}
              transition={{ duration: 4, repeat: Infinity, repeatDelay: 3 }}
              fill="#4f46e5"
            />
            <circle cx="85" cy="75" r="10" fill="#4f46e5" fillOpacity="0.2" />
          </g>
          <g>
            <motion.circle
              cx="115" cy="75" r="6"
              animate={{ scaleY: [1, 0.1, 1] }}
              transition={{ duration: 4, repeat: Infinity, repeatDelay: 3 }}
              fill="#4f46e5"
            />
            <circle cx="115" cy="75" r="10" fill="#4f46e5" fillOpacity="0.2" />
          </g>
          
          {/* Mouth/Line */}
          <path d="M85 90H115" stroke="#4f46e5" strokeWidth="4" strokeLinecap="round" opacity="0.5" />
          
          {/* Body/Base */}
          <rect x="70" y="105" width="60" height="40" rx="10" fill="currentColor" className="text-slate-700 dark:text-slate-300" />
          
          {/* Floating Rings - More complex */}
          <motion.circle
            cx="100" cy="100" r="75"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="20 40"
            className="text-indigo-500/40"
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          />
          <motion.circle
            cx="100" cy="100" r="90"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="10 30"
            className="text-purple-500/30"
            animate={{ rotate: -360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          />
          <motion.circle
            cx="100" cy="100" r="60"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeDasharray="5 10"
            className="text-blue-400/20"
            animate={{ rotate: 180 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
        </svg>
      </motion.div>
    </div>
  );
};

export default RobotAnimation;
