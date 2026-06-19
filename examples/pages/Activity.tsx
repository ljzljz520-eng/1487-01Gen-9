import React from 'react';
import { Countdown, Coupon, ProgressBar, StockTip } from 'ecommerce-promo-widgets';
import './Activity.css';

const Activity: React.FC = () => {
  const flashSaleEndTime = new Date(Date.now() + 3600 * 1000 * 2 + 60 * 1000 * 35);
  const activityEndTime = new Date(Date.now() + 3600 * 1000 * 24 * 3);

  const flashSaleProducts = [
    {
      id: 1,
      name: '爆款无线蓝牙耳机',
      originalPrice: 299,
      salePrice: 149,
      stock: 50,
      sold: 128,
      image: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    {
      id: 2,
      name: '智能运动手表',
      originalPrice: 599,
      salePrice: 299,
      stock: 12,
      sold: 356,
      image: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    },
    {
      id: 3,
      name: '便携充电宝 20000mAh',
      originalPrice: 199,
      salePrice: 99,
      stock: 0,
      sold: 999,
      image: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    },
    {
      id: 4,
      name: '高清蓝牙音箱',
      originalPrice: 399,
      salePrice: 199,
      stock: 88,
      sold: 45,
      image: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    },
  ];

  const coupons = [
    { value: 10, condition: '无门槛', name: '新人券', description: '新用户专享' },
    { value: 30, condition: '满199可用', name: '满减券', description: '全场通用' },
    { value: 80, condition: '满499可用', name: '大额券', description: '限时领取', color: '#fa8c16' },
    { value: 150, condition: '满999可用', name: '至尊券', description: '限量发放', color: '#722ed1' },
  ];

  const thresholds = [
    { amount: 199, discount: '30元' },
    { amount: 499, discount: '80元' },
    { amount: 999, discount: '150元' },
  ];

  return (
    <div className="activity">
      <div className="activity__banner">
        <div className="activity__banner-content">
          <h1 className="activity__title">618年中大促</h1>
          <p className="activity__subtitle">全场低至5折 · 限时抢购</p>
          <div className="activity__countdown">
            <span className="activity__countdown-label">活动倒计时</span>
            <Countdown
              endTime={activityEndTime}
              format="short"
              color="#fff"
              label=""
              endedText="活动已结束"
            />
          </div>
        </div>
      </div>

      <div className="activity__section">
        <div className="activity__section-header">
          <h2 className="activity__section-title">限时秒杀</h2>
          <div className="activity__flash-countdown">
            <span>距结束</span>
            <Countdown endTime={flashSaleEndTime} format="minimal" label="" color="#ff4d4f" />
          </div>
        </div>
        <div className="activity__flash-grid">
          {flashSaleProducts.map((product) => (
            <div key={product.id} className={`flash-card ${product.stock === 0 ? 'is-sold-out' : ''}`}>
              <div className="flash-card__image" style={{ background: product.image }}>
                {product.stock === 0 && (
                  <div className="flash-card__sold-out">
                    <StockTip stock={0} type="badge" />
                  </div>
                )}
                <div className="flash-card__discount">
                  {Math.round((1 - product.salePrice / product.originalPrice) * 100)}%OFF
                </div>
              </div>
              <div className="flash-card__info">
                <h3 className="flash-card__name">{product.name}</h3>
                <div className="flash-card__price">
                  <span className="flash-card__price-current">¥{product.salePrice}</span>
                  <span className="flash-card__price-origin">¥{product.originalPrice}</span>
                </div>
                <div className="flash-card__stock-bar">
                  <StockTip
                    stock={product.stock}
                    lowStockThreshold={20}
                    type="bar"
                    showExact={true}
                  />
                </div>
                <button
                  className={`flash-card__btn ${product.stock === 0 ? 'is-disabled' : ''}`}
                  disabled={product.stock === 0}
                >
                  {product.stock === 0 ? '已抢光' : '立即抢'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="activity__section">
        <div className="activity__section-header">
          <h2 className="activity__section-title">优惠券中心</h2>
          <span className="activity__section-more">先领券再购物</span>
        </div>
        <div className="activity__coupons-grid">
          {coupons.map((coupon, index) => (
            <Coupon
              key={index}
              value={coupon.value}
              condition={coupon.condition}
              name={coupon.name}
              description={coupon.description}
              color={coupon.color || '#ff4d4f'}
              type="full"
              actionText="立即领取"
              onAction={() => alert(`领取了${coupon.value}元${coupon.name}`)}
            />
          ))}
        </div>
      </div>

      <div className="activity__section">
        <div className="activity__section-header">
          <h2 className="activity__section-title">满减阶梯</h2>
        </div>
        <div className="activity__progress">
          <ProgressBar
            current={350}
            thresholds={thresholds}
            color="#ff4d4f"
            size="large"
            tipTemplate="再买{diff}可减{discount}"
            achievedText="已享最高优惠"
          />
        </div>
        <div className="activity__progress-tips">
          <div className="activity__progress-tip">
            <span className="dot" />
            满199减30
          </div>
          <div className="activity__progress-tip">
            <span className="dot" />
            满499减80
          </div>
          <div className="activity__progress-tip">
            <span className="dot" />
            满999减150
          </div>
        </div>
      </div>

      <div className="activity__section">
        <div className="activity__section-header">
          <h2 className="activity__section-title">组件自定义演示</h2>
        </div>
        <div className="activity__demo-section">
          <h3 className="activity__demo-title">倒计时组件</h3>
          <div className="activity__demo-row">
            <div className="activity__demo-item">
              <p className="activity__demo-label">完整样式</p>
              <Countdown endTime={flashSaleEndTime} format="full" color="#ff4d4f" label="" />
            </div>
            <div className="activity__demo-item">
              <p className="activity__demo-label">短样式</p>
              <Countdown endTime={flashSaleEndTime} format="short" color="#722ed1" label="" />
            </div>
            <div className="activity__demo-item">
              <p className="activity__demo-label">极简样式</p>
              <Countdown endTime={flashSaleEndTime} format="minimal" color="#1890ff" label="" />
            </div>
            <div className="activity__demo-item">
              <p className="activity__demo-label">自定义文案</p>
              <Countdown endTime={flashSaleEndTime} format="full" color="#52c41a" label="还剩" />
            </div>
          </div>
        </div>

        <div className="activity__demo-section">
          <h3 className="activity__demo-title">库存状态演示</h3>
          <div className="activity__demo-row">
            <div className="activity__demo-item">
              <p className="activity__demo-label">库存充足</p>
              <StockTip stock={100} type="badge" />
            </div>
            <div className="activity__demo-item">
              <p className="activity__demo-label">库存紧张</p>
              <StockTip stock={8} lowStockThreshold={10} type="badge" />
            </div>
            <div className="activity__demo-item">
              <p className="activity__demo-label">已售罄</p>
              <StockTip stock={0} type="badge" />
            </div>
            <div className="activity__demo-item">
              <p className="activity__demo-label">自定义文案</p>
              <StockTip stock={0} type="inline" soldOutText="补货中，请稍后" />
            </div>
          </div>
        </div>

        <div className="activity__demo-section">
          <h3 className="activity__demo-title">不同颜色主题</h3>
          <div className="activity__demo-row">
            <div className="activity__demo-item">
              <p className="activity__demo-label">红色主题</p>
              <Coupon value={50} condition="满299可用" type="mini" color="#ff4d4f" />
            </div>
            <div className="activity__demo-item">
              <p className="activity__demo-label">橙色主题</p>
              <Coupon value={50} condition="满299可用" type="mini" color="#fa8c16" />
            </div>
            <div className="activity__demo-item">
              <p className="activity__demo-label">蓝色主题</p>
              <Coupon value={50} condition="满299可用" type="mini" color="#1890ff" />
            </div>
            <div className="activity__demo-item">
              <p className="activity__demo-label">绿色主题</p>
              <Coupon value={50} condition="满299可用" type="mini" color="#52c41a" />
            </div>
            <div className="activity__demo-item">
              <p className="activity__demo-label">紫色主题</p>
              <Coupon value={50} condition="满299可用" type="mini" color="#722ed1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activity;
