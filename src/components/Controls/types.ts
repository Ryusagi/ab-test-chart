import { RefObject } from 'react';
import type { TimePeriod, LineType, Theme } from '../../types.ts';

export interface ControlsProps {
  variations: string[];
  visibleVariations: string[];
  onVariationsChange: (variations: string[]) => void;
  timeFrame: TimePeriod;
  onTimeFrameChange: (timeFrame: TimePeriod) => void;
  lineType: LineType;
  onLineTypeChange: (type: LineType) => void;
  theme: Theme;
  onThemeToggle: () => void;
  chartRef: RefObject<HTMLElement | null>;
}
