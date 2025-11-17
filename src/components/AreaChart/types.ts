import { RefObject } from 'react';
import type { ProcessedData, Theme } from '../../types.ts';

export interface AreaChartProps {
  data: ProcessedData[];
  visibleVariations: string[];
  chartRef: RefObject<HTMLElement | null>;
  colors: {[key: string]: string };
  theme: Theme;
}
