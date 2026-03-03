'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  ShoppingBag, 
  Package, 
  TrendingUp,
  DollarSign,
  ArrowUp,
  ArrowDown,
  Settings,
  AlertCircle,
  CheckCircle2,
  Clock,
  Truck,
  Star,
  Eye,
  MoreHorizontal,
  XCircle
} from 'lucide-react';
import Link from 'next/link';

// Mock data
const mockStats = {
  totalUsers: 1234,
  activeUsers: 890,
  totalOrders: 5678,
  pendingOrders: 45,
  totalProducts: 890,
  activeProducts: 756,
  totalRevenue: 456789,
  monthlyRevenue: 45678,
  pendingSuppliers: 12,
  reportedIssues: 8
};

const mockRecentOrders = [
  {
    id: 'ORD-2024-001234',
    customer: 'أحمد محمد',
    supplier: 'Noble Coffee Roasters',
    date: '2024-01-15',
    status: 'pending',
    total: 1280
  },
  {
    id: 'ORD-2024-001233',
    customer: 'سارة أحمد',
    supplier: 'Arabian Coffee Co.',
    date: '2024-01-14',
    status: 'processing',
    total: 890
  },
  {
    id: 'ORD-2024-001232',
    customer: 'محمد علي',
    supplier: 'Premium Coffee Egypt',
    date: '2024-01-13',
    status: 'shipped',
    total: 1560
  },
  {
    id: 'ORD-2024-001231',
    customer: 'فاطمة حسن',
    supplier: 'Noble Coffee Roasters',
    date: '2024-01-12',
    status: 'delivered',
    total: 680
  }
];

const mockPendingSuppliers = [
  {
    id: 1,
    name: 'Coffee House Egypt',
    email: 'info@coffeehouse.eg',
    date: '2024-01-15',
    status: 'pending'
  },
  {
    id: 2,
    name: 'Premium Roasters',
    email: 'contact@premiumroasters.com',
    date: '2024-01-14',
    status: 'pending'
  }
];

const getStatusBadge = (status: string) => {
  const statusConfig = {
    pending: { label: 'قيد الانتظار', color: 'bg-yellow-500' },
    processing: { label: 'قيد المعالجة', color: 'bg-blue-500' },
    shipped: { label: 'تم الشحن', color: 'bg-purple-500' },
    delivered: { label: 'تم التوصيل', color: 'bg-green-500' },
    cancelled: { label: 'ملغي', color: 'bg-red-500' }
  };
  
  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
  return (
    <Badge className={config.color}>
      {config.label}
    </Badge>
  );
};

export default function AdminDashboardPage() {
  const t = useTranslations('adminDashboard');

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-slate-800/50 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                <Settings className="w-8 h-8 text-blue-400" />
                {t('title')}
              </h1>
              <p className="text-slate-400 mt-2">
                {t('welcome')}
              </p>
            </div>
            <div className="flex gap-3">
              <Link href="/dashboard/admin/settings">
                <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                  <Settings className="ml-2 h-4 w-4" />
                  {t('settings')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">{t('totalUsers')}</p>
                  <p className="text-2xl font-bold text-white mt-1">{mockStats.totalUsers}</p>
                  <p className="text-xs text-green-400 mt-1 flex items-center gap-1">
                    <ArrowUp className="w-3 h-3" />
                    +12% {t('thisMonth')}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">{t('totalOrders')}</p>
                  <p className="text-2xl font-bold text-white mt-1">{mockStats.totalOrders}</p>
                  <p className="text-xs text-green-400 mt-1 flex items-center gap-1">
                    <ArrowUp className="w-3 h-3" />
                    +8% {t('thisMonth')}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">{t('totalProducts')}</p>
                  <p className="text-2xl font-bold text-white mt-1">{mockStats.totalProducts}</p>
                  <p className="text-xs text-green-400 mt-1 flex items-center gap-1">
                    <ArrowUp className="w-3 h-3" />
                    +15% {t('thisMonth')}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                  <Package className="w-6 h-6 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">{t('totalRevenue')}</p>
                  <p className="text-2xl font-bold text-white mt-1">{mockStats.totalRevenue.toLocaleString()} ج.م</p>
                  <p className="text-xs text-green-400 mt-1 flex items-center gap-1">
                    <ArrowUp className="w-3 h-3" />
                    +20% {t('thisMonth')}
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-yellow-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400">{t('activeUsers')}</p>
                  <p className="text-xl font-bold text-white">{mockStats.activeUsers}</p>
                </div>
                <CheckCircle2 className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400">{t('activeProducts')}</p>
                  <p className="text-xl font-bold text-white">{mockStats.activeProducts}</p>
                </div>
                <Package className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400">{t('pendingOrders')}</p>
                  <p className="text-xl font-bold text-white">{mockStats.pendingOrders}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400">{t('monthlyRevenue')}</p>
                  <p className="text-xl font-bold text-white">{mockStats.monthlyRevenue.toLocaleString()} ج.م</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <div className="lg:col-span-2">
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-blue-400" />
                    {t('recentOrders')}
                  </CardTitle>
                  <Link href="/dashboard/admin/orders">
                    <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
                      {t('viewAll')}
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockRecentOrders.map(order => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <p className="font-semibold text-white">{order.id}</p>
                          {getStatusBadge(order.status)}
                        </div>
                        <p className="text-sm text-slate-400">
                          {t('customer')}: {order.customer} • {t('supplier')}: {order.supplier}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-white">{order.total} ج.م</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Alerts & Actions */}
          <div className="space-y-6">
            {/* Pending Suppliers */}
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-yellow-400" />
                    {t('pendingSuppliers')}
                  </CardTitle>
                  <Badge className="bg-yellow-500">{mockStats.pendingSuppliers}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockPendingSuppliers.map(supplier => (
                    <div
                      key={supplier.id}
                      className="p-3 bg-slate-700/50 rounded-lg"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold text-white">{supplier.name}</p>
                        <Badge className="bg-yellow-500 text-xs">{t('pending')}</Badge>
                      </div>
                      <p className="text-xs text-slate-400 mb-2">{supplier.email}</p>
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-green-500 hover:bg-green-600 text-xs">
                          <CheckCircle2 className="ml-1 h-3 w-3" />
                          {t('approve')}
                        </Button>
                        <Button size="sm" variant="outline" className="border-red-500 text-red-400 hover:bg-red-500/10 text-xs">
                          <XCircle className="ml-1 h-3 w-3" />
                          {t('reject')}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">{t('quickActions')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/dashboard/admin/users" className="block">
                  <Button variant="outline" className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 justify-start">
                    <Users className="ml-2 h-4 w-4" />
                    {t('manageUsers')}
                  </Button>
                </Link>
                <Link href="/dashboard/admin/products" className="block">
                  <Button variant="outline" className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 justify-start">
                    <Package className="ml-2 h-4 w-4" />
                    {t('manageProducts')}
                  </Button>
                </Link>
                <Link href="/dashboard/admin/orders" className="block">
                  <Button variant="outline" className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 justify-start">
                    <ShoppingBag className="ml-2 h-4 w-4" />
                    {t('manageOrders')}
                  </Button>
                </Link>
                <Link href="/dashboard/admin/suppliers" className="block">
                  <Button variant="outline" className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 justify-start">
                    <Star className="ml-2 h-4 w-4" />
                    {t('manageSuppliers')}
                  </Button>
                </Link>
                <Link href="/dashboard/admin/categories" className="block">
                  <Button variant="outline" className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 justify-start">
                    <Package className="ml-2 h-4 w-4" />
                    {t('manageCategories')}
                  </Button>
                </Link>
                <Link href="/dashboard/admin/coupons" className="block">
                  <Button variant="outline" className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 justify-start">
                    <DollarSign className="ml-2 h-4 w-4" />
                    {t('manageCoupons')}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
