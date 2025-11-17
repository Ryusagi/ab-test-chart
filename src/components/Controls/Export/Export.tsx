import { type FC, useState } from 'react';
import { Button } from 'antd';
import { ExportOutlined } from '@ant-design/icons';
import { exportChart } from './utils.ts';
import type { ExportProps } from './types.ts';
import styles from './Export.module.css';

export const Export: FC<ExportProps> = ({ chartRef }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClick = () => exportChart(chartRef.current, setIsLoading);

  return (
    <Button
      id={styles.id}
      type="primary"
      onClick={handleClick}
      loading={isLoading}
      icon={<ExportOutlined />}
    >
      Export PNG
    </Button>
  );
};
