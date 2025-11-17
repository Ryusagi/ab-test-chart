import { type FC } from 'react';
import { Select } from 'antd';
import type { VariationSelectProps } from './types.ts';
import { getSelectOptions } from '../utils.ts';
import styles from './VariationSelect.module.css';

export const VariationSelect: FC<VariationSelectProps> = ({
  variations,
  selected,
  onChange,
}) => {
  const handleChange = (values: string[]) => {
    if (values.length === 0) {
      return;
    }
    onChange(values);
  };

  const options = getSelectOptions(variations);

  const tagRender = () => {
    const number =
      selected.length === variations.length ? 'All' : `${selected.length}`;
    const variationsText = selected.length > 1 ? 'variations' : 'variation';
    return (
      <div className={styles.placeholder}>{`${number} ${variationsText} selected`}</div>
    );
  };

  return (
    <Select
      mode="multiple"
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
      onChange={handleChange}
      tagRender={tagRender}
      maxTagCount={0}
      options={options}
      value={selected}
    />
  );
};
