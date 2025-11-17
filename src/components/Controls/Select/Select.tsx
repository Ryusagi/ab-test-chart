import { type FC } from 'react';
import { Select } from 'antd';
import type { SelectProps } from './types.ts';
import { getSelectOptions } from '../utils.ts';
import styles from './Select.module.css';

export const SelectOptions: FC<SelectProps<T>> = ({
  options: rawOptions,
  selected,
  onChange,
}) => {
  const options = getSelectOptions(rawOptions);

  return (
    <Select
      className={styles.container}
      showSearch={false}
      filterOption={false}
      style={{ width: '100%' }}
      styles={{
        popup: {
          root: {
            maxHeight: 250, // Максимальная высота
            overflow: 'auto',
          },
        },
      }}
      onChange={onChange}
      options={options}
      value={selected}
    />
  );
};
