import type { FC } from 'react';
import type { ImageProps } from './types.ts';

export const Calendar: FC<ImageProps> = ({ className, color }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g transform="translate(-0 0)">
      <rect width="16" height="16" />
      <path
        d="M13 7L13 8L3 8L3 7L13 7ZM6 11L6 12L10 12L10 11L6 11ZM4 2L12 2L12 0L13 0L13 2L15.5 2C15.7764 2 16 2.22388 16 2.5L16 15.5C16 15.7761 15.7764 16 15.5 16L0.5 16C0.223633 16 0 15.7761 0 15.5L0 2.5C0 2.22388 0.223633 2 0.5 2L3 2L3 0L4 0L4 2ZM12 5L13 5L13 3L14.75 3C14.8877 3 15 3.11182 15 3.25L15 14.75C15 14.8882 14.8877 15 14.75 15L1.25 15C1.1123 15 1 14.8882 1 14.75L1 3.25C1 3.11182 1.1123 3 1.25 3L3 3L3 5L4 5L4 3L12 3L12 5Z"
        fill={color}
      />
    </g>
  </svg>
);
