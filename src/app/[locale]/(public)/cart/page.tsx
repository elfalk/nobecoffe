'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight,
  Truck,
  Shield,
  RefreshCw
} from 'lucide-react';
import Link from 'next/link';

// Mock cart data - will be replaced with real data from Zustand store
const mockCartItems = [
  {
    id: 1,
    productId: 1,
    name: 'قهوة إثيوبيا ييرغاشيف',
    nameEn: 'Ethiopia Yirgacheffe',
    slug: 'ethiopia-yirgacheffe',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=200&h=200&fit=crop',
    price: 450,
    originalPrice: 500,
    quantity: 2,
    inStock: true,
    supplier: 'Noble Coffee Roasters'
  },
  {
    id: 2,
    productId: 2,
    name: 'قهوة كولومبيا سوبريمو',
    nameEn: 'Colombia Supremo',
    slug: 'colombia-supremo',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=200&h=200&fit=crop',
    price: 380,
    originalPrice: 420,
    quantity: 1,
    inStock: true,
    supplier: 'Arabian Coffee Co.'
  },
  {
    id: 3,
    productId: 3,
    name: 'قهوة يمن ماتاري',
    nameEn: 'Yemen Mokha Matari',
    slug: 'yemen-mokha-matari',
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=200&h=200&fit=crop',
    price: 680,
    originalPrice: 750,
    quantity: 1,
    inStock: true,
    supplier: 'Noble Coffee Roasters'
  }
];

const mockCoupon = {
  code: 'WELCOME10',
  discount: 10,
  type: 'percentage'
};

export default function CartPage() {
  const t = useTranslations('cart');
  const [cartItems, setCartItems] = useState(mockCartItems);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<typeof mockCoupon | null>(mockCoupon);

  const updateQuantity = (itemId: number, delta: number) => {
    setCartItems(items =>
      items.map(item => {
        if (item.id === itemId) {
          const newQuantity = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const removeItem = (itemId: number) => {
    setCartItems(items => items.filter(item => item.id !== itemId));
  };

  const applyCoupon = () => {
    // TODO: Implement coupon validation API
    if (couponCode.toUpperCase() === 'WELCOME10') {
      setAppliedCoupon({
        code: couponCode.toUpperCase(),
        discount: 10,
        type: 'percentage'
      });
    } else {
      alert(t('invalidCoupon'));
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
  };

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = appliedCoupon 
    ? appliedCoupon.type === 'percentage' 
      ? subtotal * (appliedCoupon.discount / 100)
      : appliedCoupon.discount
    : 0;
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal - discount + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 max-w-md w-full mx-4">
          <CardContent className="p-12 text-center">
            <div className="w-24 h-24 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-slate-500" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              {t('emptyCart')}
            </h2>
            <p className="text-slate-400 mb-6">
              {t('emptyCartDescription')}
            </p>
            <Link href="/marketplace">
              <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                <ShoppingBag className="ml-2 h-5 w-5" />
                {t('startShopping')}
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-slate-800/50 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <ShoppingBag className="w-8 h-8 text-blue-400" />
            {t('title')}
          </h1>
          <p className="text-slate-400 mt-2">
            {t('itemsCount', { count: cartItems.length })}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(item => (
              <Card key={item.id} className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <Link href={`/products/${item.slug}`}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 rounded-lg object-cover hover:opacity-80 transition-opacity"
                      />
                    </Link>

                    {/* Product Info */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <Link href={`/products/${item.slug}`}>
                            <h3 className="font-semibold text-white hover:text-blue-400 transition-colors">
                              {item.name}
                            </h3>
                          </Link>
                          <p className="text-sm text-slate-400">{item.supplier}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                          className="text-slate-400 hover:text-red-400 hover:bg-red-500/10"
                        >
                          <Trash2 className="w-5 h-5" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        {/* Quantity */}
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.id, -1)}
                            disabled={item.quantity <= 1}
                            className="w-8 h-8 border-slate-600 text-slate-400 hover:text-white hover:bg-slate-700"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-12 text-center text-white font-semibold">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-8 h-8 border-slate-600 text-slate-400 hover:text-white hover:bg-slate-700"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <div className="text-xl font-bold text-white">
                            {item.price * item.quantity} ج.م
                          </div>
                          {item.originalPrice > item.price && (
                            <div className="text-sm text-slate-500 line-through">
                              {item.originalPrice * item.quantity} ج.م
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 sticky top-24">
              <CardHeader>
                <CardTitle className="text-white">{t('orderSummary')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Coupon */}
                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">
                    {t('couponCode')}
                  </label>
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-500">
                          {appliedCoupon.code}
                        </Badge>
                        <span className="text-sm text-green-400">
                          {appliedCoupon.discount}% {t('off')}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={removeCoupon}
                        className="text-slate-400 hover:text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Input
                        type="text"
                        placeholder={t('enterCoupon')}
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="flex-1 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500"
                      />
                      <Button
                        onClick={applyCoupon}
                        variant="outline"
                        className="border-slate-600 text-slate-300 hover:bg-slate-700"
                      >
                        {t('apply')}
                      </Button>
                    </div>
                  )}
                </div>

                <Separator className="bg-slate-700" />

                {/* Totals */}
                <div className="space-y-3">
                  <div className="flex justify-between text-slate-400">
                    <span>{t('subtotal')}</span>
                    <span>{subtotal} ج.م</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-400">
                      <span>{t('discount')}</span>
                      <span>-{discount.toFixed(2)} ج.م</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-400">
                    <span>{t('shipping')}</span>
                    <span>{shipping === 0 ? t('free') : `${shipping} ج.م`}</span>
                  </div>
                  <Separator className="bg-slate-700" />
                  <div className="flex justify-between text-xl font-bold text-white">
                    <span>{t('total')}</span>
                    <span>{total.toFixed(2)} ج.م</span>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3 pt-4">
                  <div className="flex items-center gap-3 text-sm text-slate-400">
                    <Truck className="w-5 h-5 text-blue-400" />
                    <span>{t('fastDelivery')}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-400">
                    <Shield className="w-5 h-5 text-green-400" />
                    <span>{t('securePayment')}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-400">
                    <RefreshCw className="w-5 h-5 text-purple-400" />
                    <span>{t('easyReturns')}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <Link href="/checkout" className="block">
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-lg py-6">
                    {t('proceedToCheckout')}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>

                {/* Continue Shopping */}
                <Link href="/marketplace">
                  <Button variant="ghost" className="w-full text-slate-400 hover:text-white">
                    {t('continueShopping')}
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
