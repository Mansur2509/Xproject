import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { animateCounter } from '@shared/lib/counters';
import './StatsCounter.css';

interface StatsCounterProps {
  value: number;
  label: string;
  suffix?: string;
  duration?: number;
}

export const StatsCounter = ({ value, label, suffix = '', duration = 2000 }: StatsCounterProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    animateCounter(0, value, duration, setCount);
  }, [value, duration]);

  return (
    <motion.div
      className="stat"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
    >
      <b>
        {count}
        {suffix}
      </b>
      <span>{label}</span>
    </motion.div>
  );
};
