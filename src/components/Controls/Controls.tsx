import { type FC } from 'react';
import { Select } from './Select';
import { VariationSelect } from './VariationSelect';
import { Export } from './Export';
import type { ControlsProps } from './types.ts';
import styles from './Controls.module.css';

export const Controls: FC<ControlsProps> = ({
  variations,
  visibleVariations,
  onVariationsChange,
  timeFrame,
  onTimeFrameChange,
  lineType,
  onLineTypeChange,
  theme,
  onThemeToggle,
  chartRef,
}) => {
  const classList = `${styles.controls} ${theme === 'dark' ? styles.dark : ''}`;

  return (
    <div className={classList}>
      <div className={styles.controlPart}>
        <div className={styles.controlGroup}>
          <label className={styles.controlLabel}>Variations:</label>
          <div className={styles.variationContainer}>
            <VariationSelect
              variations={variations}
              selected={visibleVariations}
              onChange={onVariationsChange}
            />
          </div>
        </div>
        <div className={styles.controlGroup}>
          <label className={styles.controlLabel}>Time Frame:</label>
          <div className={styles.timeFrameContainer}>
            <Select
              options={['day', 'week']}
              selected={timeFrame}
              onChange={onTimeFrameChange}
            />
          </div>
        </div>
      </div>
      <div className={styles.controlPart}>
        <div className={styles.controlGroup}>
          <label className={styles.controlLabel}>Line Style:</label>
          <div className={styles.lineTypeContainer}>
            <Select
              options={['line', 'smooth', 'area']}
              selected={lineType}
              onChange={onLineTypeChange}
            />
          </div>
        </div>
        <div className={styles.controlGroup}>
          <Export chartRef={chartRef} />
        </div>
        <div className={styles.controlGroup}>
          <button className={styles.themeButton} onClick={onThemeToggle}>
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>
      </div>
    </div>
  );
};
