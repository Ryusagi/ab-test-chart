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
// Я бы не хардкодил моки, а сделал бы promise like апи клиент и из него получал данные
// унес бы туда логику по фильтрации данных через условные query params
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
  // Компоненты которые зависят от этих стейтов, лучше унести в контейнер для этих селекторов, а сам
  // чарт уже бы подключл к условному UIContext, тогда весь
  // App не будет зависить от данных которые ему не нужны.
  // и из контекста уже по месту использовал.
  // В рамках тестового задания, возможно это будет не очень актуально
  const [timeFrame, setTimeFrame] = useState<TimePeriod>('day');
  const [lineType, setLineType] = useState<LineType>('line');
  const [theme, setTheme] = useState<Theme>('light');
  // этого быть не должно
  //const [zoomDomain, setZoomDomain] = useState<number[] | undefined>(undefined);

  const chartRef = useRef<HTMLElement | null>(null);
  // 'light' и 'dark' можно унести в enum или константы, что бы не дублировать строки
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
  // Субъективно, но я бы унес эту логику в какой нибудь <ChartManager chartType={lineType} ...otherProps />
  // Хорошим тоном считается держать App без логики, оставив только подключения контекстов, сторов и т.п.
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
