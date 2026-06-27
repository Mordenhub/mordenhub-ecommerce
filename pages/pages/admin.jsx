import React, { useState } from 'react';
import { 
  BarChart3, Users, ShoppingCart, TrendingUp, Plus, Edit2, Trash2, 
  Eye, EyeOff, LogOut, Settings, Download, Filter, Search, Bell,
  DollarSign, Package, Truck, Clock, CheckCircle, AlertCircle,
  Mail, Smartphone, MapPin, Calendar, ChevronDown, ChevronUp,
  PieChart, LineChart, ArrowUp, ArrowDown, X
} from 'lucide-react';

export default function AdminDashboard() {
  const [currentSection, setCurrentSection] = useState('dashboard');
  const [showProductModal, setShowProductModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [notification, setNotification] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // SAMPLE DATA
  const [orders, setOrders] = useState([
    {
      id: 'ORD-001',
      customer: 'John Doe',
      email: 'john@example.com',
      total: 299.99,
      status: 'processing',
      date: '2024-01-15',
      items: 2,
      trackingNumber: null,
      address: '123 Main St, New York, NY 10001'
    },
    {
      id: 'ORD-002',
      customer: 'Jane Smith',
      email: 'jane@example.com',
      total: 149.99,
      status: 'shipped',
      date: '2024-01-14',
      items: 1,
      trackingNumber: 'TRACK123456',
      address: '456 Oak Ave, Los Angeles, CA 90001'
    },
    {
      id: 'ORD-003',
      customer: 'Bob Johnson',
      email: 'bob@example.com',
      total: 449.99,
      status: 'delivered',
      date: '2024-01-13',
      items: 3,
      trackingNumber: 'TRACK789012',
      address: '789 Pine St, Chicago, IL 60601'
    },
    {
      id: 'ORD-004',
      customer: 'Alice Williams',
      email: 'alice@example.com',
      total: 189.99,
      status: 'pending',
      date: '2024-01-16',
      items: 1,
      trackingNumber: null,
      address: '321 Elm St, Houston, TX 77001'
    }
  ]);

  const [products, setProducts] = useState([
    { id: 1, name: 'Pro Wireless Headphones', price: 299.99, stock: 15, sales: 342, rating: 4.8 },
    { id: 2, name: 'Artisan Coffee Collection', price: 34.99, stock: 45, sales: 512, rating: 4.9 },
    { id: 3, name: 'Minimalist Leather Wallet', price: 89.99, stock: 22, sales: 218, rating: 4.7 },
    { id: 4, name: 'Eco Water Bottle', price: 49.99, stock: 30, sales: 189, rating: 4.6 },
    { id: 5, name: 'Ergonomic Mouse Pro', price: 79.99, stock: 25, sales: 421, rating: 4.8 },
  ]);

  const [customers, setCustomers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', totalSpent: 899.97, orders: 3, joinDate: '2023-06-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', totalSpent: 299.99, orders: 2, joinDate: '2023-08-20' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', totalSpent: 1200.00, orders: 5, joinDate: '2023-05-10' },
    { id: 4, name: 'Alice Williams', email: 'alice@example.com', totalSpent: 450.00, orders: 2, joinDate: '2024-01-01' },
  ]);

  // ANALYTICS DATA
  const analytics = {
    totalRevenue: 12500.50,
    totalOrders: 145,
    totalCustomers: 89,
    averageOrderValue: 86.21,
    conversionRate: 3.2,
    repeatCustomers: 34,
    returnRate: 2.1,
    revenueGrowth: 24.5,
    ordersGrowth: 18.3,
  };

  const revenueByMonth = [
    { month: 'Jan', revenue: 2500, orders: 30 },
    { month: 'Feb', revenue: 3200, orders: 38 },
    { month: 'Mar', revenue: 2800, orders: 35 },
    { month: 'Apr', revenue: 4000, orders: 42 },
  ];

  const topProducts = [
    { name: 'Pro Wireless Headphones', sales: 342, revenue: 102600 },
    { name: 'Smart Watch Ultra', sales: 256, revenue: 89600 },
    { name: 'Natural Skincare Set', sales: 189, revenue: 22700 },
  ];

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 3000);
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    showNotification(`Order ${orderId} status updated to ${newStatus}`);
  };

  const generateTrackingNumber = (orderId) => {
    const tracking = 'TRACK' + Math.random().toString(36).substr(2, 9).toUpperCase();
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, trackingNumber: tracking, status: 'shipped' } : order
    ));
    showNotification(`Tracking number ${tracking} assigned`);
  };

  const deleteProduct = (productId) => {
    setProducts(products.filter(p => p.id !== productId));
    showNotification('Product deleted successfully');
  };

  const deleteOrder = (orderId) => {
    setOrders(orders.filter(o => o.id !== orderId));
    showNotification('Order deleted successfully');
  };

  const exportData = (type) => {
    let csvContent = '';
    let filename = '';

    if (type === 'orders') {
      csvContent = 'ID,Customer,Email,Total,Status,Date\n';
      orders.forEach(order => {
        csvContent += `${order.id},${order.customer},${order.email},${order.total},${order.status},${order.date}\n`;
      });
      filename = 'orders.csv';
    } else if (type === 'products') {
      csvContent = 'Name,Price,Stock,Sales,Rating\n';
      products.forEach(product => {
        csvContent += `${product.name},${product.price},${product.stock},${product.sales},${product.rating}\n`;
      });
      filename = 'products.csv';
    } else if (type === 'customers') {
      csvContent = 'Name,Email,Total Spent,Orders,Join Date\n';
      customers.forEach(customer => {
        csvContent += `${customer.name},${customer.email},${customer.totalSpent},${customer.orders},${customer.joinDate}\n`;
      });
      filename = 'customers.csv';
    }

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent));
    element.setAttribute('download', filename);
    element.click();
    showNotification(`${type} exported successfully`);
  };

  // DASHBOARD PAGE
  if (currentSection === 'dashboard') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <Header currentSection={currentSection} setCurrentSection={setCurrentSection} showNotification={showNotification} />
        
        {notification && <NotificationToast message={notification} />}

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* KPI Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <KPICard
              title="Total Revenue"
              value={`$${analytics.totalRevenue.toLocaleString('en-US', {minimumFractionDigits: 2})}`}
              change={analytics.revenueGrowth}
              icon={<DollarSign size={24} />}
              color="from-purple-600 to-purple-400"
            />
            <KPICard
              title="Total Orders"
              value={analytics.totalOrders}
              change={analytics.ordersGrowth}
              icon={<ShoppingCart size={24} />}
              color="from-blue-600 to-blue-400"
            />
            <KPICard
              title="Total Customers"
              value={analytics.totalCustomers}
              change={12.4}
              icon={<Users size={24} />}
              color="from-emerald-600 to-emerald-400"
            />
            <KPICard
              title="Avg Order Value"
              value={`$${analytics.averageOrderValue.toFixed(2)}`}
              change={8.1}
              icon={<TrendingUp size={24} />}
              color="from-orange-600 to-orange-400"
            />
          </div>

          {/* Charts */}
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {/* Revenue Chart */}
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <LineChart size={20} /> Revenue & Orders Trend
              </h3>
              <div className="space-y-4">
                {revenueByMonth.map((data, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">{data.month}</span>
                      <span className="text-white font-bold">${data.revenue.toLocaleString()} • {data.orders} orders</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded h-2">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded"
                        style={{ width: `${(data.revenue / 4000) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Products */}
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <BarChart3 size={20} /> Top Performing Products
              </h3>
              <div className="space-y-3">
                {topProducts.map((product, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-slate-900 rounded-lg">
                    <div>
                      <p className="text-white font-medium">{product.name}</p>
                      <p className="text-xs text-gray-400">{product.sales} sales</p>
                    </div>
                    <div className="text-right">
                      <p className="text-green-400 font-bold">${product.revenue.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white font-bold flex items-center gap-2">
                <ShoppingCart size={20} /> Recent Orders
              </h3>
              <button
                onClick={() => setCurrentSection('orders')}
                className="text-purple-400 hover:text-purple-300 text-sm font-medium"
              >
                View All →
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-3 px-2 text-gray-400 text-sm font-medium">#ID</th>
                    <th className="text-left py-3 px-2 text-gray-400 text-sm font-medium">Customer</th>
                    <th className="text-left py-3 px-2 text-gray-400 text-sm font-medium">Total</th>
                    <th className="text-left py-3 px-2 text-gray-400 text-sm font-medium">Status</th>
                    <th className="text-left py-3 px-2 text-gray-400 text-sm font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 5).map(order => (
                    <tr key={order.id} className="border-b border-slate-700 hover:bg-slate-700/50 transition">
                      <td className="py-3 px-2 text-white font-mono text-sm">{order.id}</td>
                      <td className="py-3 px-2 text-white text-sm">{order.customer}</td>
                      <td className="py-3 px-2 text-green-400 font-bold">${order.total}</td>
                      <td className="py-3 px-2">
                        <StatusBadge status={order.status} />
                      </td>
                      <td className="py-3 px-2 text-gray-400 text-sm">{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ORDERS MANAGEMENT PAGE
  if (currentSection === 'orders') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <Header currentSection={currentSection} setCurrentSection={setCurrentSection} showNotification={showNotification} />
        
        {notification && <NotificationToast message={notification} />}

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-3xl font-bold text-white">Orders Management</h2>
            <button
              onClick={() => exportData('orders')}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition"
            >
              <Download size={18} /> Export CSV
            </button>
          </div>

          {/* Search and Filter */}
          <div className="mb-6 flex gap-4">
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-800 text-white pl-10 pr-4 py-2 rounded-lg border border-slate-700 focus:border-purple-500 focus:outline-none"
              />
            </div>
            <select className="bg-slate-800 text-white px-4 py-2 rounded-lg border border-slate-700 focus:border-purple-500 focus:outline-none">
              <option>All Status</option>
              <option>Pending</option>
              <option>Processing</option>
              <option>Shipped</option>
              <option>Delivered</option>
            </select>
          </div>

          {/* Orders Table */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-900 border-b border-slate-700">
                    <th className="text-left py-4 px-4 text-gray-400 text-sm font-medium">Order ID</th>
                    <th className="text-left py-4 px-4 text-gray-400 text-sm font-medium">Customer</th>
                    <th className="text-left py-4 px-4 text-gray-400 text-sm font-medium">Email</th>
                    <th className="text-left py-4 px-4 text-gray-400 text-sm font-medium">Total</th>
                    <th className="text-left py-4 px-4 text-gray-400 text-sm font-medium">Status</th>
                    <th className="text-left py-4 px-4 text-gray-400 text-sm font-medium">Date</th>
                    <th className="text-left py-4 px-4 text-gray-400 text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.filter(o => 
                    o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    o.customer.toLowerCase().includes(searchTerm.toLowerCase())
                  ).map(order => (
                    <tr key={order.id} className="border-b border-slate-700 hover:bg-slate-700/50 transition">
                      <td className="py-4 px-4 text-white font-mono">{order.id}</td>
                      <td className="py-4 px-4 text-white">{order.customer}</td>
                      <td className="py-4 px-4 text-gray-400 text-sm">{order.email}</td>
                      <td className="py-4 px-4 text-green-400 font-bold">${order.total}</td>
                      <td className="py-4 px-4">
                        <StatusBadge status={order.status} />
                      </td>
                      <td className="py-4 px-4 text-gray-400 text-sm">{order.date}</td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setSelectedOrder(order);
                              setShowOrderModal(true);
                            }}
                            className="p-2 hover:bg-slate-600 rounded-lg text-blue-400 transition"
                            title="View Details"
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            onClick={() => deleteOrder(order.id)}
                            className="p-2 hover:bg-red-600/20 rounded-lg text-red-400 transition"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Order Details Modal */}
        {showOrderModal && selectedOrder && (
          <OrderDetailsModal
            order={selectedOrder}
            onClose={() => setShowOrderModal(false)}
            onUpdateStatus={updateOrderStatus}
            onGenerateTracking={generateTrackingNumber}
            showNotification={showNotification}
          />
        )}
      </div>
    );
  }

  // PRODUCTS MANAGEMENT PAGE
  if (currentSection === 'products') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <Header currentSection={currentSection} setCurrentSection={setCurrentSection} showNotification={showNotification} />
        
        {notification && <NotificationToast message={notification} />}

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-3xl font-bold text-white">Products Management</h2>
            <div className="flex gap-3">
              <button
                onClick={() => exportData('products')}
                className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition"
              >
                <Download size={18} /> Export
              </button>
              <button
                onClick={() => setShowProductModal(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition"
              >
                <Plus size={18} /> Add Product
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
              <div key={product.id} className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-purple-500 transition">
                <div className="bg-slate-900 h-32 rounded-lg mb-4 flex items-center justify-center text-4xl">
                  📦
                </div>
                <h3 className="text-white font-bold mb-2">{product.name}</h3>
                <div className="space-y-2 mb-4 text-sm">
                  <p className="text-gray-400">Price: <span className="text-white font-bold">${product.price}</span></p>
                  <p className="text-gray-400">Stock: <span className={product.stock < 10 ? 'text-red-400 font-bold' : 'text-green-400 font-bold'}>{product.stock}</span></p>
                  <p className="text-gray-400">Sales: <span className="text-white font-bold">{product.sales}</span></p>
                  <p className="text-gray-400">Rating: <span className="text-amber-400 font-bold">★ {product.rating}</span></p>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 p-2 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition flex items-center justify-center gap-2">
                    <Edit2 size={16} /> Edit
                  </button>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="flex-1 p-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 transition flex items-center justify-center gap-2"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {showProductModal && (
          <ProductModal onClose={() => setShowProductModal(false)} showNotification={showNotification} />
        )}
      </div>
    );
  }

  // CUSTOMERS PAGE
  if (currentSection === 'customers') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <Header currentSection={currentSection} setCurrentSection={setCurrentSection} showNotification={showNotification} />
        
        {notification && <NotificationToast message={notification} />}

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-3xl font-bold text-white">Customers</h2>
            <button
              onClick={() => exportData('customers')}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition"
            >
              <Download size={18} /> Export CSV
            </button>
          </div>

          <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-900 border-b border-slate-700">
                    <th className="text-left py-4 px-4 text-gray-400 text-sm font-medium">Name</th>
                    <th className="text-left py-4 px-4 text-gray-400 text-sm font-medium">Email</th>
                    <th className="text-left py-4 px-4 text-gray-400 text-sm font-medium">Total Spent</th>
                    <th className="text-left py-4 px-4 text-gray-400 text-sm font-medium">Orders</th>
                    <th className="text-left py-4 px-4 text-gray-400 text-sm font-medium">Join Date</th>
                    <th className="text-left py-4 px-4 text-gray-400 text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map(customer => (
                    <tr key={customer.id} className="border-b border-slate-700 hover:bg-slate-700/50 transition">
                      <td className="py-4 px-4 text-white font-medium">{customer.name}</td>
                      <td className="py-4 px-4 text-gray-400">{customer.email}</td>
                      <td className="py-4 px-4 text-green-400 font-bold">${customer.totalSpent.toLocaleString()}</td>
                      <td className="py-4 px-4 text-white">{customer.orders}</td>
                      <td className="py-4 px-4 text-gray-400 text-sm">{customer.joinDate}</td>
                      <td className="py-4 px-4">
                        <button className="p-2 hover:bg-slate-600 rounded-lg text-blue-400 transition">
                          <Mail size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // SETTINGS PAGE
  if (currentSection === 'settings') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <Header currentSection={currentSection} setCurrentSection={setCurrentSection} showNotification={showNotification} />
        
        {notification && <NotificationToast message={notification} />}

        <div className="max-w-4xl mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold text-white mb-8">Settings & Configuration</h2>

          {/* Store Settings */}
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 mb-6">
            <h3 className="text-xl font-bold text-white mb-4">Store Information</h3>
            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Store Name</label>
                <input type="text" defaultValue="ModernHub" className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg border border-slate-600 focus:border-purple-500 focus:outline-none" />
              </div>
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Store Email</label>
                <input type="email" defaultValue="support@modernhub.com" className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg border border-slate-600 focus:border-purple-500 focus:outline-none" />
              </div>
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Phone Number</label>
                <input type="tel" defaultValue="+1 (555) 000-0000" className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg border border-slate-600 focus:border-purple-500 focus:outline-none" />
              </div>
            </div>
          </div>

          {/* Payment Settings */}
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 mb-6">
            <h3 className="text-xl font-bold text-white mb-4">Payment Gateway</h3>
            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Stripe Public Key</label>
                <input type="password" defaultValue="pk_live_••••••••••••" className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg border border-slate-600" />
              </div>
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Stripe Secret Key</label>
                <input type="password" defaultValue="sk_live_••••••••••••" className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg border border-slate-600" />
              </div>
              <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-sm text-green-400">
                ✓ Stripe Connected and Active
              </div>
            </div>
          </div>

          {/* Email Settings */}
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 mb-6">
            <h3 className="text-xl font-bold text-white mb-4">Email Configuration</h3>
            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Mailgun API Key</label>
                <input type="password" defaultValue="••••••••••••••••" className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg border border-slate-600" />
              </div>
              <div>
                <label className="text-gray-400 text-sm mb-2 block">From Email Address</label>
                <input type="email" defaultValue="noreply@modernhub.com" className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg border border-slate-600" />
              </div>
              <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-sm text-green-400">
                ✓ Email Service Active - 2,450 emails sent this month
              </div>
            </div>
          </div>

          {/* Shipping Settings */}
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 mb-6">
            <h3 className="text-xl font-bold text-white mb-4">Shipping Settings</h3>
            <div className="space-y-3">
              <div className="p-3 bg-slate-900 rounded-lg">
                <p className="text-white font-medium">US</p>
                <p className="text-gray-400 text-sm">Base: $0 | Delivery: 3-5 days | Free over $100</p>
              </div>
              <div className="p-3 bg-slate-900 rounded-lg">
                <p className="text-white font-medium">International</p>
                <p className="text-gray-400 text-sm">Base: $15-25 | Delivery: 7-21 days | Free over $150</p>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-red-600/10 p-6 rounded-xl border border-red-600/30">
            <h3 className="text-xl font-bold text-red-400 mb-4">Danger Zone</h3>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
              Reset All Settings
            </button>
          </div>

          <button
            onClick={() => showNotification('Settings saved successfully!')}
            className="mt-6 w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 rounded-lg hover:shadow-lg transition"
          >
            Save Settings
          </button>
        </div>
      </div>
    );
  }
}

// ============================================================================
// COMPONENTS
// ============================================================================

function Header({ currentSection, setCurrentSection, showNotification }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'orders', label: 'Orders', icon: '📦' },
    { id: 'products', label: 'Products', icon: '🛍️' },
    { id: 'customers', label: 'Customers', icon: '👥' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
            ✨
          </div>
          <h1 className="text-2xl font-bold text-white">ModernHub Admin</h1>
        </div>

        <nav className="hidden md:flex gap-2">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => setCurrentSection(item.id)}
              className={`px-4 py-2 rounded-lg transition flex items-center gap-2 ${
                currentSection === item.id
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="flex gap-3 items-center">
          <button className="p-2 hover:bg-slate-800 rounded-lg text-gray-400 hover:text-white transition">
            <Bell size={20} />
          </button>
          <button className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white font-bold hover:shadow-lg transition">
            👤
          </button>
        </div>
      </div>
    </header>
  );
}

function KPICard({ title, value, change, icon, color }) {
  const isPositive = change > 0;
  return (
    <div className={`bg-gradient-to-br ${color} p-6 rounded-xl text-white`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm font-medium opacity-90">{title}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
        <div className="opacity-50">{icon}</div>
      </div>
      <div className="flex items-center gap-1 text-sm font-medium">
        {isPositive ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
        <span className={isPositive ? 'text-green-300' : 'text-red-300'}>
          {isPositive ? '+' : ''}{change}%
        </span>
        <span className="opacity-75">vs last month</span>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const statusConfig = {
    pending: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', label: 'Pending' },
    processing: { bg: 'bg-blue-500/20', text: 'text-blue-400', label: 'Processing' },
    shipped: { bg: 'bg-purple-500/20', text: 'text-purple-400', label: 'Shipped' },
    delivered: { bg: 'bg-green-500/20', text: 'text-green-400', label: 'Delivered' },
  };
  const config = statusConfig[status] || statusConfig.pending;
  
  return <span className={`${config.bg} ${config.text} px-3 py-1 rounded-full text-xs font-medium`}>{config.label}</span>;
}

function OrderDetailsModal({ order, onClose, onUpdateStatus, onGenerateTracking, showNotification }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-xl border border-slate-700 max-w-2xl w-full max-h-96 overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-white">Order {order.id}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <p className="text-gray-400 text-sm mb-1">Customer</p>
            <p className="text-white font-bold">{order.customer}</p>
            <p className="text-gray-400 text-sm">{order.email}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm mb-1">Total</p>
            <p className="text-green-400 text-2xl font-bold">${order.total}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm mb-1">Shipping Address</p>
            <p className="text-white text-sm">{order.address}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm mb-1">Tracking</p>
            <p className="text-white font-mono">{order.trackingNumber || 'Not assigned'}</p>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <select
            defaultValue={order.status}
            onChange={(e) => onUpdateStatus(order.id, e.target.value)}
            className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg border border-slate-600"
          >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>
          
          {!order.trackingNumber && (
            <button
              onClick={() => onGenerateTracking(order.id)}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition"
            >
              Generate Tracking Number
            </button>
          )}
        </div>

        <button
          onClick={onClose}
          className="w-full bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-lg transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}

function ProductModal({ onClose, showNotification }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-xl border border-slate-700 max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">Add New Product</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <label className="text-gray-400 text-sm mb-2 block">Product Name</label>
            <input type="text" placeholder="Enter product name" className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg border border-slate-600 focus:border-purple-500 focus:outline-none" />
          </div>
          <div>
            <label className="text-gray-400 text-sm mb-2 block">Price</label>
            <input type="number" placeholder="0.00" className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg border border-slate-600 focus:border-purple-500 focus:outline-none" />
          </div>
          <div>
            <label className="text-gray-400 text-sm mb-2 block">Stock</label>
            <input type="number" placeholder="0" className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg border border-slate-600 focus:border-purple-500 focus:outline-none" />
          </div>
          <div>
            <label className="text-gray-400 text-sm mb-2 block">Category</label>
            <select className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg border border-slate-600 focus:border-purple-500 focus:outline-none">
              <option>Electronics</option>
              <option>Beauty</option>
              <option>Accessories</option>
              <option>Lifestyle</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => {
              showNotification('Product added successfully!');
              onClose();
            }}
            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg hover:shadow-lg transition"
          >
            Add Product
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-slate-700 text-white py-2 rounded-lg hover:bg-slate-600 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function NotificationToast({ message }) {
  return (
    <div className="fixed top-20 right-4 bg-slate-800 text-white px-4 py-3 rounded-lg border border-slate-700 shadow-lg animate-pulse z-50">
      {message}
    </div>
  );
}
