'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  CheckCircle2, 
  Package, 
  Truck, 
  Clock,
  Home,
  ShoppingBag,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

export default function OrderSuccessPage() {
  const t = useTranslations('orderSuccess');

  // Mock order data - will be replaced with real data
  const orderNumber = 'ORD-2024-001234';
  const estimatedDelivery = '2024-01-20';

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 max-w-2xl w-full">
        <CardContent className="p-12 text-center">
          {/* Success Icon */}
          <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-green-500" />
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-white mb-2">
            {t('title')}
          </h1>
          <p className="text-slate-400 mb-8">
            {t('description')}
          </p>

          {/* Order Number */}
          <div className="bg-slate-700/50 rounded-lg p-4 mb-8">
            <p className="text-sm text-slate-400 mb-1">{t('orderNumber')}</p>
            <p className="text-2xl font-bold text-white">{orderNumber}</p>
          </div>

          {/* Order Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-slate-700/50 rounded-lg p-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Package className="w-6 h-6 text-blue-400" />
              </div>
              <p className="text-sm text-slate-400">{t('confirmed')}</p>
              <p className="text-white font-semibold">{t('now')}</p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-purple-400" />
              </div>
              <p className="text-sm text-slate-400">{t('processing')}</p>
              <p className="text-white font-semibold">{t('within24Hours')}</p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Truck className="w-6 h-6 text-green-400" />
              </div>
              <p className="text-sm text-slate-400">{t('estimatedDelivery')}</p>
              <p className="text-white font-semibold">{estimatedDelivery}</p>
            </div>
          </div>

          {/* Info */}
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-8 text-left">
            <p className="text-sm text-blue-400">
              {t('infoMessage')}
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard/customer/orders">
              <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                <Package className="ml-2 h-5 w-5" />
                {t('viewOrder')}
              </Button>
            </Link>
            <Link href="/marketplace">
              <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                <ShoppingBag className="ml-2 h-5 w-5" />
                {t('continueShopping')}
              </Button>
            </Link>
          </div>

          {/* Back to Home */}
          <div className="mt-8">
            <Link href="/" className="inline-flex items-center text-slate-400 hover:text-white transition-colors">
              <ArrowLeft className="ml-2 h-4 w-4" />
              {t('backToHome')}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
