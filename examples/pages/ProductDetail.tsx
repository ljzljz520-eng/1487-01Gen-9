import React, { useState } from 'react';
import { Countdown, Coupon, StockTip } from 'ecommerce-promo-widgets';
import './ProductDetail.css';

const ProductDetail: React.FC = () => {
  const [quantity, setQuantity] = useState(1);
  const endTime = new Date(Date.now() + 3600 * 1000 * 24 + 3600 * 1000 * 5 + 60 * 1000 * 30);

  const coupons = [
    { value: 20, condition: '满199可用', name: '新人专享券', description: '仅限新用户使用' },
    { value: 50, condition: '满399可用', name: '店铺优惠券', description: '全店商品可用' },
    { value: 100, condition: '满699可用', name: '限时满减券', description: '活动期间可用', color: '#fa8c16' },
  ];

  return (
    <div className="product-detail">
      <div className="product-detail__section">
        <h2 className="product-detail__section-title">商品详情</h2>
      </div>

      <div className="product-detail__main">
        <div className="product-detail__image">
          <div className="product-detail__image-placeholder">
            <span>商品图片</span>
            <div className="product-detail__promo-tag">限时特惠</div>
          </div>
        </div>

        <div className="product-detail__info">
          <h1 className="product-detail__title">
            简约时尚百搭休闲运动鞋 2024新款 男女同款
          </h1>
          <p className="product-detail__subtitle">
            舒适透气 · 防滑耐磨 · 多色可选
          </p>

          <div className="product-detail__countdown">
            <Countdown
              endTime={endTime}
              format="short"
              color="#ff4d4f"
              label="限时特惠 距结束"
            />
          </div>

          <div className="product-detail__price">
            <span className="product-detail__price-label">券后价</span>
            <span className="product-detail__price-current">¥199.00</span>
            <span className="product-detail__price-origin">¥299.00</span>
            <span className="product-detail__price-discount">6.6折</span>
          </div>

          <div className="product-detail__coupons">
            <div className="product-detail__coupons-label">优惠券</div>
            <div className="product-detail__coupons-list">
              {coupons.map((coupon, index) => (
                <Coupon
                  key={index}
                  value={coupon.value}
                  condition={coupon.condition}
                  name={coupon.name}
                  description={coupon.description}
                  color={coupon.color || '#ff4d4f'}
                  type="mini"
                  actionText="领取"
                  onAction={() => alert(`领取了${coupon.value}元优惠券`)}
                />
              ))}
            </div>
          </div>

          <div className="product-detail__stock">
            <StockTip
              stock={128}
              lowStockThreshold={20}
              type="badge"
              showExact={true}
            />
          </div>

          <div className="product-detail__quantity">
            <span className="product-detail__quantity-label">数量</span>
            <div className="product-detail__quantity-controls">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
          </div>

          <div className="product-detail__actions">
            <button className="product-detail__btn product-detail__btn--cart">
              加入购物车
            </button>
            <button className="product-detail__btn product-detail__btn--buy">
              立即购买
            </button>
          </div>
        </div>
      </div>

      <div className="product-detail__more">
        <h3 className="product-detail__more-title">组件展示</h3>
        <div className="product-detail__demo-grid">
          <div className="product-detail__demo-item">
            <h4>倒计时 - 完整样式</h4>
            <Countdown endTime={endTime} format="full" />
          </div>
          <div className="product-detail__demo-item">
            <h4>倒计时 - 简洁样式</h4>
            <Countdown endTime={endTime} format="minimal" />
          </div>
          <div className="product-detail__demo-item">
            <h4>库存提示 - 行内样式</h4>
            <StockTip stock={128} type="inline" />
          </div>
          <div className="product-detail__demo-item">
            <h4>库存提示 - 进度条样式</h4>
            <StockTip stock={15} type="bar" lowStockThreshold={20} />
          </div>
        </div>

        <h3 className="product-detail__more-title">售罄状态展示</h3>
        <div className="product-detail__demo-grid">
          <div className="product-detail__demo-item">
            <h4>库存为0 - 徽章</h4>
            <StockTip stock={0} type="badge" />
          </div>
          <div className="product-detail__demo-item">
            <h4>库存为0 - 行内</h4>
            <StockTip stock={0} type="inline" />
          </div>
          <div className="product-detail__demo-item">
            <h4>库存为0 - 进度条</h4>
            <StockTip stock={0} type="bar" />
          </div>
          <div className="product-detail__demo-item">
            <h4>自定义售罄文案</h4>
            <StockTip stock={0} type="inline" soldOutText="暂无库存" />
          </div>
        </div>

        <h3 className="product-detail__more-title">自定义颜色</h3>
        <div className="product-detail__demo-grid">
          <div className="product-detail__demo-item">
            <h4>蓝色主题</h4>
            <Countdown endTime={endTime} format="short" color="#1890ff" />
          </div>
          <div className="product-detail__demo-item">
            <h4>紫色主题</h4>
            <Coupon value={30} condition="满200可用" type="mini" color="#722ed1" />
          </div>
          <div className="product-detail__demo-item">
            <h4>绿色主题</h4>
            <StockTip stock={100} type="badge" color="#52c41a" inStockText="现货速发" />
          </div>
          <div className="product-detail__demo-item">
            <h4>橙色主题</h4>
            <StockTip stock={8} type="bar" lowStockThreshold={10} color="#fa8c16" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
