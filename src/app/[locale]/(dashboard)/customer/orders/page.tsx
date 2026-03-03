'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  ShoppingBag, 
  Search, 
  Filter,
  Clock,
  Package,
  Truck,
  CheckCircle2,
  XCircle,
  Eye,
  Download,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

// Mock orders data
const mockOrders = [
  {
    id: 'ORD-2024-001234',
    date: '2024-01-15',
    status: 'pending',
    total: 1280,
    items: [
      { name: 'قهوة إثيوبيا ييرغاشيف', quantity: 2, price: 450 },
      { name: 'قهوة كولومبيا سوبريمو', quantity: 1, price: 380 }
    ],
    shippingAddress: 'القاهرة، مصر',
    paymentMethod: 'الدفع عند الاستلام'
  },
  {
    id: 'ORD-2024-001233',
    date: '2024-01-12',
    status: 'shipped',
    total: 890,
    items: [
      { name: 'قهوة يمن ماتاري', quantity: 1, price: 680 },
      { name: 'قهوة برازيل سانتوس', quantity: 1, price: 210 }
    ],
    shippingAddress: 'الإسكندرية، مصر',
    paymentMethod: 'بطاقة ائتمان'
  },
  {
    id: 'ORD-2024-001232',
    date: '2024-01-10',
    status: 'delivered',
    total: 1560,
    items: [
      { name: 'قهوة كينيا AA', quantity: 2, price: 520 },
      { name: 'قهوة غواتيمالا أنتيغوا', quantity: 2, price: 260 }
    ],
    shippingAddress: 'الجيزة، مصر',
    paymentMethod: 'الدفع عند الاستلام'
  },
  {
    id: 'ORD-2024-001231',
    date: '2024-01-08',
    status: 'delivered',
    total: 680,
    items: [
      { name: 'قهوة إثيوبيا ييرغاشيف', quantity: 1, price: 680 }
    ],
    shippingAddress: 'القاهرة، مصر',
    paymentMethod: 'محفظة إلكترونية'
  },
  {
    id: 'ORD-2024-001230',
    date: '2024-01-05',
    status: 'cancelled',
    total: 450,
    items: [
      { name: 'قهوة كولومبيا سوبريمو', quantity: 1, price: 450 }
    ],
    shippingAddress: 'القاهرة، مصر',
    paymentMethod: 'بطاقة ائتمان'
  }
];

const getStatusBadge = (status: string) => {
  const statusConfig = {
    pending: { label: 'قيد الانتظار', color: 'bg-yellow-500', icon: Clock },
    processing: { label: 'قيد المعالجة', color: 'bg-blue-500', icon: Package },
    shipped: { label: 'تم الشحن', color: 'bg-purple-500', icon: Truck },
    delivered: { label: 'تم التوصيل', color: 'bg-green-500', icon: CheckCircle2 },
    cancelled: { label: 'ملغي', color: 'bg-red-500', icon: XCircle }
  };
  
  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
  const Icon = config.icon;
  return (
    <Badge className={config.color}>
      <Icon className="w-3 h-3 ml-1" />
      {config.label}
    </Badge>
  );
};

export default function CustomerOrdersPage() {
  const t = useTranslations('customerOrders');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Filter orders
  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-slate-800/50 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                <ShoppingBag className="w-8 h-8 text-blue-400" />
                {t('title')}
              </h1>
              <p className="text-slate-400 mt-2">
                {t('description')}
              </p>
            </div>
            <Link href="/dashboard/customer">
              <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                <ArrowLeft className="ml-2 h-4 w-4" />
                {t('backToDashboard')}
              </Button>
            </Link>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[200px] bg-slate-700/50 border-slate-600 text-white">
                <Filter className="ml-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="all">{t('allStatuses')}</SelectItem>
                <SelectItem value="pending">{t('pending')}</SelectItem>
                <SelectItem value="processing">{t('processing')}</SelectItem>
                <SelectItem value="shipped">{t('shipped')}</SelectItem>
                <SelectItem value="delivered">{t('delivered')}</SelectItem>
                <SelectItem value="cancelled">{t('cancelled')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Orders List */}
        {filteredOrders.length > 0 ? (
          <div className="space-y-4">
            {filteredOrders.map(order => (
              <Card key={order.id} className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    {/* Order Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-lg font-semibold text-white">{order.id}</h3>
                        {getStatusBadge(order.status)}
                      </div>
                      <p className="text-sm text-slate-400 mb-2">
                        {t('orderDate')}: {order.date}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {order.items.map((item, index) => (
                          <span key={index} className="text-sm text-slate-300">
                            {item.name} × {item.quantity}
                            {index < order.items.length - 1 && '، '}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                        <span>{t('items')}: {order.items.length}</span>
                        <span>{t('payment')}: {order.paymentMethod}</span>
                      </div>
                    </div>

                    {/* Total & Actions */}
                    <div className="flex lg:flex-col items-start lg:items-end gap-4">
                      <div className="text-right">
                        <p className="text-sm text-slate-400">{t('total')}</p>
                        <p className="text-2xl font-bold text-white">{order.total} ج.م</p>
                      </div>
                      <div className="flex gap-2">
                        <Link href={`/dashboard/customer/orders/${order.id}`}>
                          <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                            <Eye className="ml-2 h-4 w-4" />
                            {t('viewDetails')}
                          </Button>
                        </Link>
                        {order.status === 'delivered' && (
                          <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                            <Download className="ml-2 h-4 w-4" />
                            {t('invoice')}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
            <CardContent className="p-12 text-center">
              <div className="w-24 h-24 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-12 h-12 text-slate-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {t('noOrders')}
              </h3>
              <p className="text-slate-400 mb-6">
                {t('noOrdersDescription')}
              </p>
              <Link href="/marketplace">
                <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                  {t('startShopping')}
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
