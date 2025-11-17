import { type FC } from 'react';
import { Goblet, Calendar } from './img';
import type { TooltipProps } from './types.ts';
import styles from './TooltipContents.module.css';

export const TooltipContents: FC<TooltipProps> = ({
  active,
  payload,
  label,
  visibleVariations,
  theme,
}) => {
  if (!active || !payload) return null;

  const isDark = theme === 'dark';
  const classList = `${styles.tooltip} ${isDark ? styles.dark : ''}`;
  const picColor = isDark ? '#e2e8f0' : '#5E5D67';

  return (
    <div className={classList}>
      <div className={styles.tooltipHeader}>
        <Calendar className={styles.calendar} color={picColor} />
        {label}
      </div>
      <div className={styles.tooltipContent}>
        {payload
          .filter(entry => visibleVariations.includes(entry.dataKey))
          .sort((a, b) => b.value - a.value)
          .map((entry, index) => (
            <div key={index} className={styles.tooltipItem}>
              <span className={styles.nameContainer}>
                <span
                  className={styles.colorDot}
                  style={{ backgroundColor: entry.color }}
                />
                <span className={styles.variationName}>{entry.dataKey}:</span>
                {index === 0 && (
                  <Goblet className={styles.goblet} color={picColor} />
                )}
              </span>
              <span className={styles.value}>{entry.value?.toFixed(2)}%</span>
            </div>
          ))}
      </div>
    </div>
  );
};
