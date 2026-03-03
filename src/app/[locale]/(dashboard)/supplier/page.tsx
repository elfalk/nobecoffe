'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Package, 
  ShoppingBag, 
  DollarSign, 
  TrendingUp,
  ArrowRight,
  Settings,
  Plus,
  Clock,
  CheckCircle,
  Eye
} from 'lucide-react';
import Link from 'next/link';

const mockStats = {
  totalProducts: 45,
  activeProducts: 38,
  pendingOrders: 5,
  completedOrders: 156,
  totalRevenue: 45600,
  thisMonthRevenue: 8900,
  walletBalance: 12500,
  rating: 4.8
};

const mockRecentOrders = [
  {
    id: 'ORD-2024-001',
    customer: 'أحمد محمد',
    date: '2024-01-15',
    status: 'pending',
    total: 1250,
    items: 3
  },
  {
    id: 'ORD-2024-002',
    customer: 'سارة أحمد',
    date: '2024-01-14',
    status: 'processing',
    total: 890,
    items: 2
  },
  {
    id: 'ORD-2024-003',
    customer: 'محمد علي',
    date: '2024-01-13',
    status: 'shipped',
    total: 2100,
    items: 5
  }
];

const getStatusBadge = (status: string) => {
  const statusConfig: Record<string, { label: string; color: string }> = {
    pending: { label: 'قيد الانتظار', color: 'bg-yellow-500' },
    processing: { label: 'قيد المعالجة', color: 'bg-blue-500' },
    shipped: { label: 'تم الشحن', color: 'bg-purple-500' },
    delivered: { label: 'تم التوصيل', color: 'bg-green-500' },
    cancelled: { label: 'ملغي', color: 'bg-red-500' }
  };
  
  const config = statusConfig[status] || statusConfig.pending;
  return <Badge className={config.color}>{config.label}</Badge>;
};

export default function SupplierDashboardPage() {
  const t = useTranslations('supplierDashboard');

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-slate-800/50 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">{t('title')}</h1>
              <p className="text-slate-400 mt-2">{t('welcome')}</p>
            </div>
            <div className="flex gap-3">
              <Link href="/dashboard/supplier/products/new">
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="ml-2 h-4 w-4" />
                  {t('addProduct')}
                </Button>
              </Link>
              <Link href="/dashboard/supplier/settings">
                <Button variant="outline" className="border-slate-600">
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
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">{t('totalProducts')}</p>
                  <p className="text-2xl font-bold text-white">{mockStats.totalProducts}</p>
                  <p className="text-xs text-green-400">{mockStats.activeProducts} {t('active')}</p>
                </div>
                <Package className="w-10 h-10 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">{t('pendingOrders')}</p>
                  <p className="text-2xl font-bold text-yellow-400">{mockStats.pendingOrders}</p>
                </div>
                <Clock className="w-10 h-10 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">{t('totalRevenue')}</p>
                  <p className="text-2xl font-bold text-white">{mockStats.totalRevenue.toLocaleString()} ج.م</p>
                  <p className="text-xs text-green-400">{mockStats.thisMonthRevenue} ج.م {t('thisMonth')}</p>
                </div>
                <DollarSign className="w-10 h-10 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">{t('walletBalance')}</p>
                  <p className="text-2xl font-bold text-white">{mockStats.walletBalance.toLocaleString()} ج.م</p>
                  <p className="text-xs text-blue-400">{t('available')}</p>
                </div>
                <TrendingUp className="w-10 h-10 text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <div className="lg:col-span-2">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-blue-400" />
                    {t('recentOrders')}
                  </CardTitle>
                  <Link href="/dashboard/supplier/orders">
                    <Button variant="ghost" size="sm" className="text-blue-400">
                      {t('viewAll')} <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockRecentOrders.map(order => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg"
                    >
                      <div>
                        <p className="font-semibold text-white">{order.id}</p>
                        <p className="text-sm text-slate-400">{order.customer} • {order.date}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        {getStatusBadge(order.status)}
                        <span className="font-bold text-white">{order.total} ج.م</span>
                        <Link href={`/dashboard/supplier/orders/${order.id}`}>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">{t('quickActions')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/dashboard/supplier/products/new" className="block">
                  <Button variant="outline" className="w-full border-slate-600 justify-start">
                    <Plus className="ml-2 h-4 w-4" />
                    {t('addProduct')}
                  </Button>
                </Link>
                <Link href="/dashboard/supplier/orders" className="block">
                  <Button variant="outline" className="w-full border-slate-600 justify-start">
                    <ShoppingBag className="ml-2 h-4 w-4" />
                    {t('manageOrders')}
                  </Button>
                </Link>
                <Link href="/dashboard/supplier/products" className="block">
                  <Button variant="outline" className="w-full border-slate-600 justify-start">
                    <Package className="ml-2 h-4 w-4" />
                    {t('manageProducts')}
                  </Button>
                </Link>
                <Link href="/dashboard/supplier/wallet" className="block">
                  <Button variant="outline" className="w-full border-slate-600 justify-start">
                    <DollarSign className="ml-2 h-4 w-4" />
                    {t('wallet')}
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
