import React from 'react';
import { BaseWidgetProps } from '../types';
import './Coupon.css';

export interface CouponProps extends BaseWidgetProps {
  value: number | string;
  condition?: string;
  name?: string;
  description?: string;
  color?: string;
  type?: 'full' | 'mini';
  status?: 'available' | 'used' | 'expired' | 'disabled';
  actionText?: string;
  onAction?: () => void;
  currency?: string;
}

export const Coupon: React.FC<CouponProps> = ({
  value,
  condition,
  name = '优惠券',
  description,
  color = '#ff4d4f',
  type = 'full',
  status = 'available',
  actionText = '立即领取',
  onAction,
  currency = '¥',
  className,
  style,
}) => {
  const isDisabled = status !== 'available';

  const handleClick = () => {
    if (!isDisabled && onAction) {
      onAction();
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'used':
        return '已使用';
      case 'expired':
        return '已过期';
      case 'disabled':
        return '已领完';
      default:
        return '';
    }
  };

  if (type === 'mini') {
    return (
      <div
        className={`epw-coupon epw-coupon--mini ${isDisabled ? 'is-disabled' : ''} ${className || ''}`}
        style={{ '--epw-coupon-color': color, ...style } as React.CSSProperties}
        onClick={handleClick}
      >
        <div className="epw-coupon__left">
          <span className="epw-coupon__currency">{currency}</span>
          <span className="epw-coupon__value">{value}</span>
          {condition && <span className="epw-coupon__condition">{condition}</span>}
        </div>
        <div className="epw-coupon__right">
          {isDisabled ? (
            <span className="epw-coupon__status">{getStatusText()}</span>
          ) : (
            <span className="epw-coupon__action">{actionText}</span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`epw-coupon ${isDisabled ? 'is-disabled' : ''} ${className || ''}`}
      style={{ '--epw-coupon-color': color, ...style } as React.CSSProperties}
      onClick={handleClick}
    >
      <div className="epw-coupon__left">
        <div className="epw-coupon__amount">
          <span className="epw-coupon__currency">{currency}</span>
          <span className="epw-coupon__value">{value}</span>
        </div>
        {condition && <div className="epw-coupon__condition">{condition}</div>}
      </div>
      <div className="epw-coupon__divider" />
      <div className="epw-coupon__right">
        <div className="epw-coupon__name">{name}</div>
        {description && <div className="epw-coupon__desc">{description}</div>}
        {isDisabled ? (
          <div className="epw-coupon__status-badge">{getStatusText()}</div>
        ) : (
          <button className="epw-coupon__btn" onClick={(e) => { e.stopPropagation(); handleClick(); }}>
            {actionText}
          </button>
        )}
      </div>
    </div>
  );
};

export default Coupon;
