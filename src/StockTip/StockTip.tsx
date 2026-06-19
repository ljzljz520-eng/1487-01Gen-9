import React from 'react';
import { BaseWidgetProps } from '../types';
import './StockTip.css';

export type StockStatus = 'in-stock' | 'low-stock' | 'out-of-stock';

export interface StockTipProps extends BaseWidgetProps {
  stock: number;
  lowStockThreshold?: number;
  type?: 'inline' | 'badge' | 'bar';
  color?: string;
  soldOutText?: string;
  lowStockText?: string;
  inStockText?: string;
  showExact?: boolean;
  unit?: string;
}

export const StockTip: React.FC<StockTipProps> = ({
  stock,
  lowStockThreshold = 10,
  type = 'inline',
  color,
  soldOutText = '已售罄',
  lowStockText = '仅剩{stock}件',
  inStockText = '库存充足',
  showExact = true,
  unit = '件',
  className,
  style,
}) => {
  const getStatus = (): StockStatus => {
    if (stock <= 0) return 'out-of-stock';
    if (stock <= lowStockThreshold) return 'low-stock';
    return 'in-stock';
  };

  const status = getStatus();

  const getStatusColor = () => {
    if (color) return color;
    switch (status) {
      case 'out-of-stock':
        return '#999';
      case 'low-stock':
        return '#fa8c16';
      default:
        return '#52c41a';
    }
  };

  const getText = () => {
    switch (status) {
      case 'out-of-stock':
        return soldOutText;
      case 'low-stock':
        return lowStockText.replace('{stock}', String(stock));
      default:
        if (showExact) {
          return `${stock}${unit}${inStockText}`;
        }
        return inStockText;
    }
  };

  const statusColor = getStatusColor();
  const text = getText();

  if (type === 'badge') {
    return (
      <span
        className={`epw-stock epw-stock--badge epw-stock--${status} ${className || ''}`}
        style={{ '--epw-stock-color': statusColor, ...style } as React.CSSProperties}
      >
        <span className="epw-stock__dot" />
        {text}
      </span>
    );
  }

  if (type === 'bar') {
    const maxBar = lowStockThreshold * 3;
    const percentage = Math.min(100, (stock / maxBar) * 100);

    return (
      <div
        className={`epw-stock epw-stock--bar epw-stock--${status} ${className || ''}`}
        style={{ '--epw-stock-color': statusColor, ...style } as React.CSSProperties}
      >
        <div className="epw-stock__bar">
          <div
            className="epw-stock__bar-fill"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className="epw-stock__text">{text}</span>
      </div>
    );
  }

  return (
    <span
      className={`epw-stock epw-stock--inline epw-stock--${status} ${className || ''}`}
      style={{ '--epw-stock-color': statusColor, ...style } as React.CSSProperties}
    >
      {text}
    </span>
  );
};

export default StockTip;
