import React, { useState } from 'react';
import { ProgressBar, StockTip, Coupon } from 'ecommerce-promo-widgets';
import './Cart.css';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  stock: number;
  image: string;
}

const Cart: React.FC = () => {
  const [items, setItems] = useState<CartItem[]>([
    {
      id: 1,
      name: '简约时尚百搭休闲运动鞋 2024新款',
      price: 199,
      quantity: 1,
      stock: 128,
      image: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    {
      id: 2,
      name: '轻薄透气速干运动T恤 男女同款',
      price: 89,
      quantity: 2,
      stock: 5,
      image: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    },
    {
      id: 3,
      name: '大容量双肩背包 15.6寸电脑包',
      price: 159,
      quantity: 1,
      stock: 0,
      image: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    },
  ]);

  const totalPrice = items
    .filter((item) => item.stock > 0)
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  const thresholds = [
    { amount: 199, discount: '20元', label: '满199减20' },
    { amount: 399, discount: '50元', label: '满399减50' },
    { amount: 699, discount: '100元', label: '满699减100' },
  ];

  const updateQuantity = (id: number, delta: number) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(1, Math.min(item.stock, item.quantity + delta));
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const availableItems = items.filter((item) => item.stock > 0);
  const soldOutItems = items.filter((item) => item.stock <= 0);

  return (
    <div className="cart">
      <h2 className="cart__title">购物车</h2>

      <div className="cart__progress">
        <div className="cart__progress-title">满减活动</div>
        <ProgressBar
          current={totalPrice}
          thresholds={thresholds}
          color="#ff4d4f"
          size="medium"
        />
      </div>

      <div className="cart__coupons">
        <h3 className="cart__section-title">可用优惠券</h3>
        <div className="cart__coupons-list">
          <Coupon
            value={20}
            condition="满199可用"
            name="店铺满减券"
            description="全店商品通用"
            type="full"
            actionText="去使用"
            onAction={() => alert('使用优惠券')}
          />
          <Coupon
            value={50}
            condition="满399可用"
            name="新人专享券"
            description="仅限新用户使用"
            type="full"
            color="#fa8c16"
            actionText="去使用"
            onAction={() => alert('使用优惠券')}
          />
          <Coupon
            value={10}
            condition="无门槛"
            name="运费券"
            description="抵扣运费"
            type="full"
            color="#52c41a"
            status="used"
          />
        </div>
      </div>

      <div className="cart__items">
        <h3 className="cart__section-title">商品清单</h3>

        {availableItems.map((item) => (
          <div key={item.id} className="cart-item">
            <div
              className="cart-item__image"
              style={{ background: item.image }}
            />
            <div className="cart-item__info">
              <h4 className="cart-item__name">{item.name}</h4>
              <div className="cart-item__stock">
                <StockTip
                  stock={item.stock}
                  lowStockThreshold={10}
                  type="inline"
                />
              </div>
              <div className="cart-item__bottom">
                <span className="cart-item__price">¥{item.price.toFixed(2)}</span>
                <div className="cart-item__quantity">
                  <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                </div>
              </div>
            </div>
            <div className="cart-item__subtotal">
              <span className="cart-item__subtotal-label">小计</span>
              <span className="cart-item__subtotal-price">
                ¥{(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          </div>
        ))}

        {soldOutItems.length > 0 && (
          <>
            <div className="cart__sold-out-title">
              <span>已售罄商品</span>
              <span className="cart__sold-out-count">{soldOutItems.length}件</span>
            </div>
            {soldOutItems.map((item) => (
              <div key={item.id} className="cart-item is-sold-out">
                <div
                  className="cart-item__image"
                  style={{ background: item.image }}
                >
                  <div className="cart-item__sold-out-mask">
                    <StockTip stock={0} type="badge" />
                  </div>
                </div>
                <div className="cart-item__info">
                  <h4 className="cart-item__name">{item.name}</h4>
                  <div className="cart-item__stock">
                    <StockTip stock={0} type="inline" />
                  </div>
                  <div className="cart-item__bottom">
                    <span className="cart-item__price">¥{item.price.toFixed(2)}</span>
                    <span className="cart-item__sold-out-text">暂时缺货</span>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      <div className="cart__footer">
        <div className="cart__footer-left">
          <span className="cart__total-label">合计：</span>
          <span className="cart__total-price">¥{totalPrice.toFixed(2)}</span>
        </div>
        <button className="cart__checkout-btn">
          去结算 ({availableItems.reduce((sum, i) => sum + i.quantity, 0)})
        </button>
      </div>

      <div className="cart__demo">
        <h3 className="cart__section-title">组件更多展示</h3>
        <div className="cart__demo-grid">
          <div className="cart__demo-item">
            <h4>小尺寸进度条</h4>
            <ProgressBar current={150} thresholds={thresholds} size="small" />
          </div>
          <div className="cart__demo-item">
            <h4>大尺寸进度条</h4>
            <ProgressBar current={450} thresholds={thresholds} size="large" color="#722ed1" />
          </div>
          <div className="cart__demo-item">
            <h4>已达最高档位</h4>
            <ProgressBar current={800} thresholds={thresholds} color="#52c41a" />
          </div>
          <div className="cart__demo-item">
            <h4>自定义文案</h4>
            <ProgressBar
              current={280}
              thresholds={thresholds}
              tipTemplate="还差{diff}享{discount}"
              achievedText="已达最高优惠"
              color="#fa8c16"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
