import React from 'react';
import Badge from '../components/common/Badge';

const mockOrders = [
  { id: 'ORD-98234', date: '2023-10-15', total: 240.00, status: 'Delivered', items: 2 },
  { id: 'ORD-98456', date: '2023-11-02', total: 120.00, status: 'Processing', items: 1 }
];

const OrdersPage = () => {
  return (
    <div className="container" style={{ padding: '40px 20px', minHeight: '70vh', animation: 'fadeIn 0.4s' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '40px' }}>Order History</h1>
      
      {mockOrders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', background: 'var(--bg-card)', borderRadius: 'var(--radius-md)' }}>
          <p style={{ color: 'var(--text-secondary)' }}>You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {mockOrders.map((order) => (
            <div key={order.id} style={{ background: 'var(--bg-card)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>{order.id}</h3>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Placed on {order.date} • {order.items} items</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '5px' }}>${order.total.toFixed(2)}</div>
                <Badge type={order.status === 'Delivered' ? 'success' : 'default'}>{order.status}</Badge>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
