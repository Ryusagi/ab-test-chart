import type { ProcessedData, LineType, Theme } from '@src/types.ts';
import { RefObject } from 'react';

export interface LineChartProps {
  data: ProcessedData[];
  visibleVariations: string[];
  lineType: LineType;
  theme: Theme;
  colors: {[key: string]: string };
  chartRef: RefObject<HTMLElement | null>;
  onZoomChange?: (domain: number[] | undefined) => void;
  zoomDomain?: number[];
}
