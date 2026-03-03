'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { 
  ShoppingCart, 
  CreditCard, 
  Truck, 
  Shield,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  MapPin,
  ShoppingBag
} from 'lucide-react';

const mockCartItems = [
  {
    id: 1,
    name: 'قهوة إثيوبيا ييرغاشيف',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=100&h=100&fit=crop',
    price: 450,
    quantity: 2,
    supplier: 'Noble Coffee Roasters'
  },
  {
    id: 2,
    name: 'قهوة كولومبيا سوبريمو',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=100&h=100&fit=crop',
    price: 380,
    quantity: 1,
    supplier: 'Arabian Coffee Co.'
  }
];

const mockAddresses = [
  {
    id: 'standard',
    label: 'المنزل',
    name: 'أحمد محمد',
    phone: '0123456789',
    duration: '3-5 أيام',
    icon: Truck
  },
  {
    id: 'express',
    name: 'توصيل سريع',
    nameEn: 'Express Delivery',
    price: 100,
    duration: '1-2 أيام',
    icon: Truck
  },
  {
    id: 'pickup',
    name: 'استلام من الفرع',
    nameEn: 'Pickup from Store',
    price: 0,
    duration: 'متاح فوراً',
    icon: MapPin
  }
];

const paymentMethods = [
  {
    id: 'cod',
    name: 'الدفع عند الاستلام',
    nameEn: 'Cash on Delivery',
    icon: CreditCard
  },
  {
    id: 'card',
    name: 'بطاقة ائتمان',
    nameEn: 'Credit Card',
    icon: CreditCard
  },
  {
    id: 'wallet',
    name: 'محفظة إلكترونية',
    nameEn: 'Digital Wallet',
    icon: CreditCard
  }
];

export default function CheckoutPage() {
  const t = useTranslations('checkout');
  const [step, setStep] = useState(1);
  const [selectedShipping, setSelectedShipping] = useState('standard');
  const [selectedPayment, setSelectedPayment] = useState('cod');
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    notes: ''
  });

  const subtotal = mockCartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = mockAddresses.find(m => m.id === selectedShipping)?.price || 0;
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // TODO: Submit order
      window.location.href = '/order-success';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-slate-800/50 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                <ShoppingBag className="w-8 h-8 text-blue-400" />
                {t('title')}
              </h1>
            </div>
            <Link href="/cart">
              <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                <ArrowLeft className="ml-2 h-4 w-4" />
                {t('backToCart')}
              </Button>
            </Link>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mt-8 gap-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  step >= s ? 'bg-blue-500' : 'bg-slate-700'
                }`}>
                  {step > s ? (
                    <CheckCircle className="w-6 h-6 text-white" />
                  ) : (
                    <span className="text-white font-semibold">{s}</span>
                  )}
                </div>
                {s < 3 && (
                  <div className={`w-16 h-1 ${step > s ? 'bg-blue-500' : 'bg-slate-700'}`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center mt-4 gap-8 text-sm">
            <span className={step >= 1 ? 'text-blue-400' : 'text-slate-500'}>
              {t('shippingInfo')}
            </span>
            <span className={step >= 2 ? 'text-blue-400' : 'text-slate-500'}>
              {t('paymentMethod')}
            </span>
            <span className={step >= 3 ? 'text-blue-400' : 'text-slate-500'}>
              {t('review')}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Step 1: Shipping Info */}
              {step === 1 && (
                <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-blue-400" />
                      {t('shippingInfo')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-slate-300">{t('fullName')}</Label>
                        <Input
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                          className="bg-slate-700/50 border-slate-600 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-slate-300">{t('phone')}</Label>
                        <Input
                          required
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="bg-slate-700/50 border-slate-600 text-white"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-300">{t('email')}</Label>
                      <Input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="bg-slate-700/50 border-slate-600 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-300">{t('address')}</Label>
                      <Input
                        required
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                        className="bg-slate-700/50 border-slate-600 text-white"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-slate-300">{t('city')}</Label>
                        <Input
                          required
                          value={formData.city}
                          onChange={(e) => setFormData({...formData, city: e.target.value})}
                          className="bg-slate-700/50 border-slate-600 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-slate-300">{t('postalCode')}</Label>
                        <Input
                          value={formData.postalCode}
                          onChange={(e) => setFormData({...formData, postalCode: e.target.value})}
                          className="bg-slate-700/50 border-slate-600 text-white"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-300">{t('notes')}</Label>
                      <Input
                        value={formData.notes}
                        onChange={(e) => setFormData({...formData, notes: e.target.value})}
                        placeholder={t('notesPlaceholder')}
                        className="bg-slate-700/50 border-slate-600 text-white"
                      />
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 2: Shipping & Payment */}
              {step === 2 && (
                <>
                  {/* Shipping Methods */}
                  <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <Truck className="w-5 h-5 text-blue-400" />
                        {t('shippingMethod')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <RadioGroup value={selectedShipping} onValueChange={setSelectedShipping}>
                        {mockAddresses.map((method) => (
                          <div
                            key={method.id}
                            className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                              selectedShipping === method.id
                                ? 'border-blue-500 bg-blue-500/10'
                                : 'border-slate-700 hover:border-slate-600'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <RadioGroupItem value={method.id} id={method.id} />
                              <div className="flex items-center gap-3">
                                <method.icon className="w-5 h-5 text-slate-400" />
                                <div>
                                  <Label htmlFor={method.id} className="text-white cursor-pointer">
                                    {method.name}
                                  </Label>
                                  <p className="text-sm text-slate-400">{method.duration}</p>
                                </div>
                              </div>
                            </div>
                            <span className="font-semibold text-white">
                              {method.price === 0 ? t('free') : `${method.price} ج.م`}
                            </span>
                          </div>
                        ))}
                      </RadioGroup>
                    </CardContent>
                  </Card>

                  {/* Payment Methods */}
                  <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-blue-400" />
                        {t('paymentMethod')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <RadioGroup value={selectedPayment} onValueChange={setSelectedPayment}>
                        {paymentMethods.map((method) => (
                          <div
                            key={method.id}
                            className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                              selectedPayment === method.id
                                ? 'border-blue-500 bg-blue-500/10'
                                : 'border-slate-700 hover:border-slate-600'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <RadioGroupItem value={method.id} id={method.id} />
                              <div className="flex items-center gap-3">
                                <method.icon className="w-5 h-5 text-slate-400" />
                                <Label htmlFor={method.id} className="text-white cursor-pointer">
                                  {method.name}
                                </Label>
                              </div>
                            </div>
                          </div>
                        ))}
                      </RadioGroup>
                    </CardContent>
                  </Card>
                </>
              )}

              {/* Step 3: Review */}
              {step === 3 && (
                <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">{t('reviewOrder')}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Shipping Address */}
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">{t('shippingAddress')}</h3>
                      <div className="p-4 bg-slate-700/50 rounded-lg">
                        <p className="text-white">{formData.fullName}</p>
                        <p className="text-slate-400">{formData.phone}</p>
                        <p className="text-slate-400">{formData.email}</p>
                        <p className="text-slate-400">{formData.address}</p>
                        <p className="text-slate-400">{formData.city} {formData.postalCode}</p>
                      </div>
                    </div>

                    {/* Shipping Method */}
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">{t('shippingMethod')}</h3>
                      <div className="p-4 bg-slate-700/50 rounded-lg flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Truck className="w-5 h-5 text-blue-400" />
                          <span className="text-white">
                            {mockAddresses.find(m => m.id === selectedShipping)?.name}
                          </span>
                        </div>
                        <span className="text-white font-semibold">
                          {shipping === 0 ? t('free') : `${shipping} ج.م`}
                        </span>
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">{t('paymentMethod')}</h3>
                      <div className="p-4 bg-slate-700/50 rounded-lg flex items-center gap-3">
                        <CreditCard className="w-5 h-5 text-green-400" />
                        <span className="text-white">
                          {paymentMethods.find(m => m.id === selectedPayment)?.name}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between">
                {step > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(step - 1)}
                    className="border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    <ArrowLeft className="ml-2 h-4 w-4" />
                    {t('previous')}
                  </Button>
                )}
                <Button
                  type="submit"
                  className={`bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 ${
                    step === 1 ? 'mr-auto' : ''
                  }`}
                >
                  {step === 3 ? t('placeOrder') : t('next')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 sticky top-24">
                <CardHeader>
                  <CardTitle className="text-white">{t('orderSummary')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Order Items */}
                  <div className="space-y-3">
                    {mockCartItems.map(item => (
                      <div key={item.id} className="flex gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="text-sm font-semibold text-white line-clamp-2">
                            {item.name}
                          </h4>
                          <p className="text-xs text-slate-400">{t('quantity')}: {item.quantity}</p>
                          <p className="text-sm font-semibold text-white mt-1">
                            {item.price * item.quantity} ج.م
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator className="bg-slate-700" />

                  {/* Totals */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-slate-400">
                      <span>{t('subtotal')}</span>
                      <span>{subtotal} ج.م</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>{t('shipping')}</span>
                      <span>{shipping === 0 ? t('free') : `${shipping} ج.م`}</span>
                    </div>
                    <Separator className="bg-slate-700" />
                    <div className="flex justify-between text-xl font-bold text-white">
                      <span>{t('total')}</span>
                      <span>{total} ج.م</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
