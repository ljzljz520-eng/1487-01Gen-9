import React, { useState, useEffect, useMemo } from 'react';
import { BaseWidgetProps } from '../types';
import './Countdown.css';

export interface CountdownProps extends BaseWidgetProps {
  endTime: Date | number | string;
  format?: 'full' | 'short' | 'minimal';
  color?: string;
  label?: string;
  endedText?: string;
  showDays?: boolean;
  onEnd?: () => void;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

export const Countdown: React.FC<CountdownProps> = ({
  endTime,
  format = 'full',
  color = '#ff4d4f',
  label = '距结束',
  endedText = '活动已结束',
  showDays = true,
  onEnd,
  className,
  style,
}) => {
  const getEndTimestamp = (): number => {
    if (endTime instanceof Date) {
      return endTime.getTime();
    }
    if (typeof endTime === 'number') {
      return endTime;
    }
    return new Date(endTime).getTime();
  };

  const calculateTimeLeft = (): TimeLeft => {
    const now = Date.now();
    const end = getEndTimestamp();
    const total = Math.max(0, end - now);

    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    const hours = Math.floor((total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((total % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds, total };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft);
  const hasEnded = timeLeft.total <= 0;

  useEffect(() => {
    if (hasEnded) {
      if (onEnd) {
        onEnd();
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [hasEnded, onEnd, endTime]);

  const pad = (num: number): string => num.toString().padStart(2, '0');

  const renderFull = () => (
    <div className="epw-countdown__numbers" style={{ '--epw-countdown-color': color } as React.CSSProperties}>
      {showDays && (
        <>
          <span className="epw-countdown__number">{pad(timeLeft.days)}</span>
          <span className="epw-countdown__unit">天</span>
        </>
      )}
      <span className="epw-countdown__number">{pad(timeLeft.hours)}</span>
      <span className="epw-countdown__colon">:</span>
      <span className="epw-countdown__number">{pad(timeLeft.minutes)}</span>
      <span className="epw-countdown__colon">:</span>
      <span className="epw-countdown__number">{pad(timeLeft.seconds)}</span>
    </div>
  );

  const renderShort = () => (
    <div className="epw-countdown__numbers epw-countdown__numbers--short" style={{ '--epw-countdown-color': color } as React.CSSProperties}>
      {showDays && <span className="epw-countdown__block">{pad(timeLeft.days)}<i>天</i></span>}
      <span className="epw-countdown__block">{pad(timeLeft.hours)}<i>时</i></span>
      <span className="epw-countdown__block">{pad(timeLeft.minutes)}<i>分</i></span>
      <span className="epw-countdown__block">{pad(timeLeft.seconds)}<i>秒</i></span>
    </div>
  );

  const renderMinimal = () => (
    <div className="epw-countdown__numbers epw-countdown__numbers--minimal" style={{ '--epw-countdown-color': color } as React.CSSProperties}>
      {showDays && <span className="epw-countdown__item">{pad(timeLeft.days)}天</span>}
      <span className="epw-countdown__item">{pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:{pad(timeLeft.seconds)}</span>
    </div>
  );

  const content = useMemo(() => {
    if (hasEnded) {
      return <span className="epw-countdown__ended">{endedText}</span>;
    }
    switch (format) {
      case 'short':
        return renderShort();
      case 'minimal':
        return renderMinimal();
      default:
        return renderFull();
    }
  }, [hasEnded, format, timeLeft, color, endedText, showDays]);

  return (
    <div className={`epw-countdown ${className || ''}`} style={style}>
      {label && !hasEnded && <span className="epw-countdown__label">{label}</span>}
      {content}
    </div>
  );
};

export default Countdown;
