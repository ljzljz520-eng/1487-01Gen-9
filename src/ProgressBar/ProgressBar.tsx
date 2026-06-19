import React from 'react';
import { BaseWidgetProps } from '../types';
import './ProgressBar.css';

export interface Threshold {
  amount: number;
  discount: number | string;
  label?: string;
}

export interface ProgressBarProps extends BaseWidgetProps {
  current: number;
  thresholds: Threshold[];
  currency?: string;
  color?: string;
  tipTemplate?: string;
  achievedText?: string;
  showAmount?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  thresholds,
  currency = '¥',
  color = '#ff4d4f',
  tipTemplate = '再购{diff}可享{discount}',
  achievedText = '已享优惠',
  showAmount = true,
  size = 'medium',
  className,
  style,
}) => {
  const sortedThresholds = [...thresholds].sort((a, b) => a.amount - b.amount);
  const maxAmount = sortedThresholds[sortedThresholds.length - 1]?.amount || 0;

  const currentThreshold = sortedThresholds
    .filter((t) => current >= t.amount)
    .pop();
  const nextThreshold = sortedThresholds.find((t) => current < t.amount);

  const progress = Math.min(100, (current / maxAmount) * 100);

  const getTipText = () => {
    if (!nextThreshold) {
      return achievedText;
    }
    const diff = nextThreshold.amount - current;
    return tipTemplate
      .replace('{diff}', `${currency}${diff.toFixed(2)}`)
      .replace('{discount}', String(nextThreshold.discount));
  };

  return (
    <div
      className={`epw-progress epw-progress--${size} ${className || ''}`}
      style={{ '--epw-progress-color': color, ...style } as React.CSSProperties}
    >
      {showAmount && (
        <div className="epw-progress__amounts">
          <span className="epw-progress__current">
            已购 {currency}
            {current.toFixed(2)}
          </span>
          {nextThreshold && (
            <span className="epw-progress__next">
              满{currency}
              {nextThreshold.amount}减{nextThreshold.discount}
            </span>
          )}
        </div>
      )}

      <div className="epw-progress__bar">
        <div
          className="epw-progress__fill"
          style={{ width: `${progress}%` }}
        />
        {sortedThresholds.map((t, index) => {
          const position = (t.amount / maxAmount) * 100;
          const isAchieved = current >= t.amount;
          return (
            <div
              key={index}
              className={`epw-progress__marker ${isAchieved ? 'is-achieved' : ''}`}
              style={{ left: `${position}%` }}
              title={t.label || `满${t.amount}减${t.discount}`}
            />
          );
        })}
      </div>

      <div className="epw-progress__tip">
        {currentThreshold && (
          <span className="epw-progress__achieved">
            已享{currentThreshold.discount}优惠
          </span>
        )}
        {nextThreshold && (
          <span className="epw-progress__tip-text">{getTipText()}</span>
        )}
        {!nextThreshold && currentThreshold && (
          <span className="epw-progress__tip-text epw-progress__tip-text--success">
            {getTipText()}
          </span>
        )}
      </div>
    </div>
  );
};

export default ProgressBar;
