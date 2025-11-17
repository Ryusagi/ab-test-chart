import { type FC } from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { TooltipContents } from '../TooltipContents';
import { type LineChartProps } from './types';
import styles from './LineChart.module.css';

export const LineChart: FC<LineChartProps> = ({
  data,
  visibleVariations,
  lineType,
  colors,
  theme,
  chartRef,
  zoomDomain,
}) => {
  const renderLine = (variation: string) => {
    const color = colors[variation];

    return (
      <Line
        key={variation}
        type={lineType === 'smooth' ? 'natural' : 'linear'}
        dataKey={variation}
        stroke={color}
        strokeWidth={2}
        dot={false}
        activeDot={{
          r: 1,
          stroke: 'black', // Обводка контрастным цветом
          strokeWidth: 2, // Толщина обводки
        }}
        isAnimationActive={false}
      />
    );
  };

  const formatYAxis = (value: number) => `${value.toFixed(1)}%`;

  const getYAxisDomain = () => {
    if (data.length === 0) return [0, 100];

    const filteredData = zoomDomain
      ? data.slice(zoomDomain[0], zoomDomain[1] + 1)
      : data;

    let maxValue = 0;
    filteredData.forEach(item => {
      visibleVariations.forEach(variation => {
        const value = item[variation] as number;
        if (value > maxValue) maxValue = value;
      });
    });

    return [0, Math.ceil(maxValue * 1.1)];
  };

  return (
    <div
      className={`${styles.chartContainer} ${theme === 'dark' ? styles.dark : ''}`}
      ref={chartRef}
    >
      <ResponsiveContainer width="100%" height={400}>
        <RechartsLineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={theme === 'dark' ? '#4a5568' : '#e0e0e0'}
          />
          <XAxis
            dataKey="date"
            tick={{ fill: theme === 'dark' ? '#e2e8f0' : '#333' }}
            axisLine={{ stroke: theme === 'dark' ? '#4a5568' : '#e0e0e0' }}
            tickLine={{ stroke: theme === 'dark' ? '#4a5568' : '#e0e0e0' }}
          />
          <YAxis
            tickFormatter={formatYAxis}
            tick={{ fill: theme === 'dark' ? '#e2e8f0' : '#333' }}
            axisLine={{ stroke: theme === 'dark' ? '#4a5568' : '#e0e0e0' }}
            tickLine={{ stroke: theme === 'dark' ? '#4a5568' : '#e0e0e0' }}
            domain={getYAxisDomain()}
          />

          <Tooltip
            content={
              <TooltipContents
                visibleVariations={visibleVariations}
                theme={theme}
              />
            }
            cursor={{
              stroke: 'lightgray',
              strokeWidth: 2,
            }}
          />

          {visibleVariations.map(variation => renderLine(variation))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
};
