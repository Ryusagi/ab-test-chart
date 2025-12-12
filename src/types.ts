type OriginalVariation = {
  name: 'Original';
};
interface ExtraVariation {
  id: number;
  name: string;
}

export type Variation = ExtraVariation | OriginalVariation;

// export type VariationInfo = {
//   [k: `${Variation['id']}` | '0']: number;
// };
// Как будто бы такой вариант будет по корректнее, во всяком случае тут тс уже не ругается
export type VariationInfo<TVariation extends Variation> = Record<
  TVariation extends ExtraVariation ? ExtraVariation['id'] : '0',
  number
>;

export interface PeriodInfo {
  visits: number;
  conversions: number;
}

export interface DataPoint {
  date: string;
  visits: VariationInfo<Variation>;
  conversions: VariationInfo<Variation>;
}

export interface VariationData {
  variations: Variation[];
  data: DataPoint[];
}

export interface ProcessedData {
  date: string;
  [variation: string]: number | string;
}

export type TimePeriod = 'day' | 'week';
export type LineType = 'line' | 'smooth' | 'area';
export type Theme = 'light' | 'dark';
