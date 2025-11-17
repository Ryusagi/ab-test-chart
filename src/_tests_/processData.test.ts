import { processData } from '../utils';
import { MOCK_DATA } from '../const';

describe('process input data', () => {
  const processedDataDay =
    processData(MOCK_DATA, 'day').filter(
      entry => entry.date === '2025-01-04'
    )[0] ?? {};

  const processedDataWeek =
    processData(MOCK_DATA, 'week').filter(
      entry => entry.date === '2024-12-30'
    )[0] ?? {};

  it("should calculate 'Original' percentage day 2025-01-04", () => {
    expect(processedDataDay['Original']).toBe((243 / 1779) * 100);
  });
  it("should calculate 'Variation A' percentage day 2025-01-04", () => {
    expect(processedDataDay['Variation A']).toBe(0);
  });
  it("should calculate 'Variation B' percentage day 2025-01-04", () => {
    expect(processedDataDay['Variation B']).toBe((404 / 1763) * 100);
  });

  it("should calculate 'Original' percentage for week ending on 2024-12-30", () => {
    expect(processedDataWeek['Original']).toBe(
      ((158 + 173 + 120 + 243 + 150) / (1866 + 1547 + 1125 + 1779 + 1276)) * 100
    );
  });
  it("should calculate 'Variation B' percentage for week ending on 2024-12-30", () => {
    expect(processedDataWeek['Variation B']).toBe(
      ((463 + 504 + 413 + 404 + 344) / (1957 + 1968 + 1642 + 1763 + 1634)) * 100
    );
  });
});
