import type { FC } from 'react';
import {
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { TooltipContents } from '../TooltipContents';
import type { AreaChartProps } from './types.ts';
import styles from './AreaChart.module.css';

export const AreaChart: FC<AreaChartProps> = ({
  data,
  visibleVariations,
  colors,
  theme,
  chartRef,
}) => {
  if (!data || data.length === 0) {
    return (
      <div
        className={`${styles.chartContainer} ${theme === 'dark' ? styles.dark : ''}`}
      >
        <div className={styles.noData}>No data available</div>
      </div>
    );
  }

  return (
    <div
      className={`${styles.chartContainer} ${theme === 'dark' ? styles.dark : ''}`}
      ref={chartRef}
    >
      <ResponsiveContainer width="100%" height={400}>
        <RechartsAreaChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          tabIndex={-1}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tick={{ fill: theme === 'dark' ? '#e2e8f0' : '#333' }}
            axisLine={{ stroke: theme === 'dark' ? '#4a5568' : '#666' }}
            tickLine={{ stroke: theme === 'dark' ? '#4a5568' : '#666' }}
          />
          <YAxis
            tickFormatter={value => `${value.toFixed(1)}%`}
            tick={{ fill: theme === 'dark' ? '#e2e8f0' : '#333' }}
            axisLine={{ stroke: theme === 'dark' ? '#4a5568' : '#666' }}
            tickLine={{ stroke: theme === 'dark' ? '#4a5568' : '#666' }}
          />
          <Tooltip
            content={
              <TooltipContents
                visibleVariations={visibleVariations}
                theme={theme}
              />
            }
            cursor={{
              stroke: theme === 'dark' ? '#718096' : '#a0a0a0',
              strokeWidth: 1,
            }}
          />
          {visibleVariations.map(variation => (
            <Area
              key={variation}
              type="monotone"
              dataKey={variation}
              stroke={colors[variation]}
              fill={colors[variation]}
              fillOpacity={0.5}
              strokeWidth={2}
              dot={false}
              activeDot={{
                r: 4,
                fill: colors[variation],
                stroke: theme === 'dark' ? '#2d3748' : '#fff',
                strokeWidth: 2,
              }}
              isAnimationActive={false}
            />
          ))}
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  );
};
