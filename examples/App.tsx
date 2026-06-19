import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Activity from './pages/Activity';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">电商促销小组件</h1>
        <p className="app__subtitle">Countdown · Coupon · ProgressBar · StockTip</p>
        <nav className="app__nav">
          <NavLink to="/" end className={({ isActive }) => `app__nav-item ${isActive ? 'is-active' : ''}`}>
            商品详情
          </NavLink>
          <NavLink to="/cart" className={({ isActive }) => `app__nav-item ${isActive ? 'is-active' : ''}`}>
            购物车
          </NavLink>
          <NavLink to="/activity" className={({ isActive }) => `app__nav-item ${isActive ? 'is-active' : ''}`}>
            活动页
          </NavLink>
        </nav>
      </header>
      <main className="app__main">
        <Routes>
          <Route path="/" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/activity" element={<Activity />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
