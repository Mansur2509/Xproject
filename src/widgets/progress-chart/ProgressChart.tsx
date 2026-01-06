import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import './ProgressChart.css';

const data = [
  { name: 'Неделя 1', progress: 20 },
  { name: 'Неделя 2', progress: 35 },
  { name: 'Неделя 3', progress: 50 },
  { name: 'Неделя 4', progress: 65 },
  { name: 'Неделя 5', progress: 75 },
  { name: 'Неделя 6', progress: 85 },
];

export const ProgressChart = () => {
  return (
    <div className="progress-chart">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorProgress" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--line)" />
          <XAxis dataKey="name" stroke="var(--muted)" fontSize={12} />
          <YAxis stroke="var(--muted)" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--card)',
              border: '1px solid var(--line)',
              borderRadius: 'var(--radius)',
            }}
          />
          <Area
            type="monotone"
            dataKey="progress"
            stroke="#3b82f6"
            strokeWidth={3}
            fill="url(#colorProgress)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
