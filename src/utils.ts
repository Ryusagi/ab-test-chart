import { theme as antdTheme } from 'antd';
import type {
  PeriodInfo,
  Variation,
  TimePeriod,
  ProcessedData,
  VariationData,
} from './types.ts';

import { COLORS, DARK_THEME_COLORS } from './const.ts';

export const getVariationNames = (variations: Variation[]) =>
  variations.map(variation => variation.name);

export const calculateConversionRate = (periodInfo: PeriodInfo): number => {
  const { conversions, visits } = periodInfo;
  return visits > 0 ? (conversions / visits) * 100 : 0;
};

const getWeekKey = (dateString: string): string => {
  const date = new Date(dateString);
  const startOfWeek = new Date(date);
  const day = date.getDay();
  const daysToSubtract = day === 0 ? 6 : day - 1;
  startOfWeek.setDate(date.getDate() - daysToSubtract);
  return startOfWeek.toISOString().split('T')[0];
};

export const processData = (
  rawData: VariationData,
  timeFrame: TimePeriod
): ProcessedData[] => {
  const { variations, data } = rawData;
  const allDates = new Set<string>();
  const variationMap = new Map<string, Map<string, PeriodInfo>>();

  variations.forEach(entry => {
    const id = entry['id'] ?? '0';
    const variation = entry.name;
    const dateMap = new Map<string, PeriodInfo>();
    data.forEach(({ date, visits, conversions }) => {
      const dateKey = timeFrame === 'week' ? getWeekKey(date) : date;
      const variationId = `${id}`;
      allDates.add(dateKey);

      if (dateMap.has(dateKey)) {
        const prevPoint = dateMap.get(dateKey);
        dateMap.set(dateKey, {
          visits: (visits[variationId] ?? 0) + prevPoint.visits,
          conversions: (conversions[variationId] ?? 0) + prevPoint.conversions,
        });
      } else {
        dateMap.set(dateKey, {
          visits: visits[variationId] ?? 0,
          conversions: conversions[variationId] ?? 0,
        });
      }
    });
    variationMap.set(variation, dateMap);
  });

  const processedData: ProcessedData[] = Array.from(allDates)
    .sort()
    .map(date => {
      const dataPoint: ProcessedData = { date };
      variationMap.forEach((dateMap, variation) => {
        dataPoint[variation] = dateMap.has(date)
          ? calculateConversionRate(dateMap.get(date))
          : 0;
      });
      return dataPoint;
    });

  return processedData;
};

export const getColors = (allVariations: string[], isDark = false) => {
  const variationsColors = {};
  allVariations.forEach((variation, index) => {
    const colors = isDark ? DARK_THEME_COLORS : COLORS;
    variationsColors[variation] = colors[index % colors.length];
  });
  return variationsColors;
};

// Filter data based on visible variations and zoom
export const filterDataByZoom = (
  data: ProcessedData[],
  zoomDomain?: number[]
): ProcessedData[] => {
  if (!zoomDomain) return data;

  const [startIndex, endIndex] = zoomDomain;
  return data.slice(startIndex, endIndex + 1);
};

export const getAntdTheme = isDark => {
  const { darkAlgorithm, defaultAlgorithm } = antdTheme;
  if (isDark) {
    return {
      algorithm: darkAlgorithm,
      token: {
        colorBgBase: '#0a0a0a',
        colorTextBase: '#e2e8f0',
        colorBgContainer: '#4a5568',
        colorBorder: '#718096',
        borderWidth: 2,
        lineWidth: 2,
      },
    };
  }
  return defaultAlgorithm;
};
