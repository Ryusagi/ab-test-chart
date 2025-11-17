import { useState, useRef, useMemo } from 'react';
import { ConfigProvider } from 'antd';
import { LineChart, AreaChart, Controls, ErrorBoundary } from './components';
import {
  getColors,
  getVariationNames,
  processData,
  getAntdTheme,
} from './utils';
import type { ProcessedData, TimePeriod, LineType, Theme } from './types';
import { MOCK_DATA } from './const.ts';
import styles from './App.module.css';

export const App = () => {
  const { variations } = MOCK_DATA;
  const allVariations = useMemo(
    () => getVariationNames(variations),
    [variations]
  );
  const [visibleVariations, setVisibleVariations] =
    useState<string[]>(allVariations);
  const [timeFrame, setTimeFrame] = useState<TimePeriod>('day');
  const [lineType, setLineType] = useState<LineType>('line');
  const [theme, setTheme] = useState<Theme>('light');
  //const [zoomDomain, setZoomDomain] = useState<number[] | undefined>(undefined);

  const chartRef = useRef<HTMLElement | null>(null);
  const isDark = theme === 'dark';

  const processedData: ProcessedData[] = useMemo(
    () => processData(MOCK_DATA, timeFrame),
    [timeFrame]
  );

  const handleThemeToggle = () =>
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  const variationsColors = useMemo(
    () => getColors(allVariations, isDark),
    [allVariations, isDark]
  );

  const antdTheme = useMemo(() => getAntdTheme(isDark), [isDark]);

  const renderChart = () => {
    if (lineType === 'area') {
      return (
        <AreaChart
          data={processedData}
          visibleVariations={visibleVariations}
          chartRef={chartRef}
          colors={variationsColors}
          theme={theme}
        />
      );
    }

    return (
      <LineChart
        data={processedData}
        visibleVariations={visibleVariations}
        chartRef={chartRef}
        lineType={lineType}
        colors={variationsColors}
        theme={theme}
      />
    );
  };

  const classList = `${styles.app} ${isDark ? styles.dark : ''}`;

  return (
    <ErrorBoundary>
      <ConfigProvider theme={antdTheme}>
        <div className={classList}>
          <div className={styles.container}>
            <h1 className={styles.title}>A/B Test Conversion Rates</h1>
            <Controls
              variations={allVariations}
              visibleVariations={visibleVariations}
              onVariationsChange={setVisibleVariations}
              timeFrame={timeFrame}
              onTimeFrameChange={setTimeFrame}
              lineType={lineType}
              onLineTypeChange={setLineType}
              theme={theme}
              onThemeToggle={handleThemeToggle}
              chartRef={chartRef}
            />
            {renderChart()}
          </div>
        </div>
      </ConfigProvider>
    </ErrorBoundary>
  );
};
