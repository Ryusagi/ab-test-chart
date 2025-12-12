import type { Theme } from '@src/types.ts';
export interface TooltipProps {
  active?: boolean;
  // наверняка мы знаем тип payload в рамках задания, лучше типизировать
  // что бы тс не ругался и вывел типы
  payload?: unknown[];
  label?: string;
  visibleVariations: string[];
  theme: Theme;
}
