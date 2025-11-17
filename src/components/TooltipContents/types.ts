import type { Theme } from '@src/types.ts';
export interface TooltipProps {
  active?: boolean;
  payload?: unknown[];
  label?: string;
  visibleVariations: string[];
  theme: Theme;
}
