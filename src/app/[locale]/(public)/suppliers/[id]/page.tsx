'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  MapPin, 
  Star, 
  Phone, 
  Mail, 
  Globe, 
  Calendar,
  Package,
  ShoppingCart,
  CheckCircle,
  Award,
  Users,
  TrendingUp
} from 'lucide-react';
import Link from 'next/link';

// Mock supplier data - will be replaced with real data from API
const mockSupplier = {
  id: 1,
  name: 'Noble Coffee Roasters',
  nameAr: 'نوبل كوفي روسترز',
  slug: 'noble-coffee-roasters',
  logo: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=200&h=200&fit=crop',
  coverImage: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1200&h=400&fit=crop',
  description: 'نوبل كوفي روسترز هي محامص قهوة متخصصة تأسست عام 2015، نقدم أجود أنواع القهوة من مختلف المناطق حول العالم. نحن نؤمن بأن القهوة ليست مجرد مشروب، بل هي تجربة فريدة تستحق الاستمتاع بها.',
  descriptionEn: 'Noble Coffee Roasters is a specialty coffee roaster founded in 2015, offering the finest coffee from various regions around the world. We believe that coffee is not just a beverage, but a unique experience worth enjoying.',
  rating: 4.9,
  reviews: 342,
  products: 156,
  orders: 2340,
  customers: 890,
  location: 'القاهرة، مصر',
  address: 'شارع المعز، القاهرة، مصر',
  phone: '+20 123 456 7890',
  email: 'info@noblecoffee.com',
  website: 'www.noblecoffee.com',
  founded: '2015',
  verified: true,
  featured: true,
  categories: ['قهوة مختصة', 'قهوة محمصة'],
  specialties: ['قهوة إثيوبية', 'قهوة كولومبية', 'قهوة يمنية'],
  achievements: [
    'أفضل محامص قهوة في مصر 2023',
    'شهادة الجودة ISO 9001',
    'عضو في جمعية القهوة المختصة'
  ],
  stats: {
    rating: 4.9,
    reviews: 342,
    products: 156,
    orders: 2340,
    customers: 890,
    responseTime: '2 ساعة'
  }
};

const mockProducts = [
  {
    id: 1,
    name: 'قهوة إثيوبيا ييرغاشيف',
    slug: 'ethiopia-yirgacheffe',
    price: 450,
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop',
    rating: 4.8,
    reviews: 124,
    inStock: true
  },
  {
    id: 2,
    name: 'قهوة كولومبيا سوبريمو',
    slug: 'colombia-supremo',
    price: 380,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=400&fit=crop',
    rating: 4.6,
    reviews: 89,
    inStock: true
  },
  {
    id: 3,
    name: 'قهوة يمن ماتاري',
    slug: 'yemen-mokha-matari',
    price: 680,
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400&h=400&fit=crop',
    rating: 5.0,
    reviews: 203,
    inStock: true
  },
  {
    id: 4,
    name: 'قهوة كينيا AA',
    slug: 'kenya-aa',
    price: 520,
    image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=400&h=400&fit=crop',
    rating: 4.9,
    reviews: 156,
    inStock: true
  },
  {
    id: 5,
    name: 'قهوة برازيل سانتوس',
    slug: 'brazil-santos',
    price: 320,
    image: 'https://images.unsplash.com/photo-1610632380989-680fe40816c6?w=400&h=400&fit=crop',
    rating: 4.5,
    reviews: 67,
    inStock: false
  },
  {
    id: 6,
    name: 'قهوة غواتيمالا أنتيغوا',
    slug: 'guatemala-antigua',
    price: 410,
    image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=400&h=400&fit=crop',
    rating: 4.7,
    reviews: 98,
    inStock: true
  }
];

const reviews = [
  {
    id: 1,
    user: 'أحمد محمد',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    rating: 5,
    date: 'منذ 3 أيام',
    comment: 'مورد ممتاز! القهوة عالية الجودة والتوصيل سريع. أنصح بالتعامل معهم.'
  },
  {
    id: 2,
    user: 'سارة أحمد',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    rating: 5,
    date: 'منذ أسبوع',
    comment: 'أفضل محامص قهوة في مصر! النكهة رائعة والخدمة احترافية.'
  },
  {
    id: 3,
    user: 'محمد علي',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    rating: 4,
    date: 'منذ أسبوعين',
    comment: 'جودة جيدة جداً لكن الأسعار مرتفعة قليلاً. القهوة تستحق التجربة.'
  }
];

export default function SupplierDetailsPage() {
  const t = useTranslations('supplier');
  const params = useParams();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Cover Image */}
      <div className="relative h-64 md:h-80">
        <img
          src={mockSupplier.coverImage}
          alt={mockSupplier.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/70" />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Supplier Header */}
        <div className="relative -mt-32 mb-8">
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                {/* Logo */}
                <div className="relative">
                  <img
                    src={mockSupplier.logo}
                    alt={mockSupplier.name}
                    className="w-32 h-32 rounded-2xl object-cover border-4 border-slate-800"
                  />
                  {mockSupplier.verified && (
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold text-white">
                      {mockSupplier.nameAr}
                    </h1>
                    {mockSupplier.featured && (
                      <Badge className="bg-gradient-to-r from-blue-500 to-blue-600">
                        {t('featured')}
                      </Badge>
                    )}
                  </div>
                  <p className="text-lg text-slate-400 mb-3">
                    {mockSupplier.name}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {mockSupplier.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-white">{mockSupplier.rating}</span>
                      <span>({mockSupplier.reviews} {t('reviews')})</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Package className="w-4 h-4" />
                      {mockSupplier.products} {t('products')}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3">
                  <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                    <ShoppingCart className="ml-2 h-5 w-5" />
                    {t('viewProducts')}
                  </Button>
                  <Button variant="outline" className="border-slate-600 text-slate-300">
                    {t('contactSupplier')}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Star className="w-5 h-5 text-yellow-400" />
                <div className="text-2xl font-bold text-white">{mockSupplier.stats.rating}</div>
              </div>
              <div className="text-xs text-slate-400">{t('rating')}</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users className="w-5 h-5 text-blue-400" />
                <div className="text-2xl font-bold text-white">{mockSupplier.stats.customers}</div>
              </div>
              <div className="text-xs text-slate-400">{t('customers')}</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Package className="w-5 h-5 text-green-400" />
                <div className="text-2xl font-bold text-white">{mockSupplier.stats.products}</div>
              </div>
              <div className="text-xs text-slate-400">{t('products')}</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <ShoppingCart className="w-5 h-5 text-purple-400" />
                <div className="text-2xl font-bold text-white">{mockSupplier.stats.orders}</div>
              </div>
              <div className="text-xs text-slate-400">{t('orders')}</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-orange-400" />
                <div className="text-2xl font-bold text-white">{mockSupplier.stats.reviews}</div>
              </div>
              <div className="text-xs text-slate-400">{t('reviews')}</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Calendar className="w-5 h-5 text-pink-400" />
                <div className="text-2xl font-bold text-white">{mockSupplier.stats.responseTime}</div>
              </div>
              <div className="text-xs text-slate-400">{t('responseTime')}</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="about" className="w-full">
          <TabsList className="bg-slate-800/50 border border-slate-700">
            <TabsTrigger value="about" className="data-[state=active]:bg-blue-500">
              {t('about')}
            </TabsTrigger>
            <TabsTrigger value="products" className="data-[state=active]:bg-blue-500">
              {t('products')} ({mockSupplier.products})
            </TabsTrigger>
            <TabsTrigger value="reviews" className="data-[state=active]:bg-blue-500">
              {t('reviews')} ({mockSupplier.reviews})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* About */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">{t('aboutSupplier')}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-slate-300 leading-relaxed mb-6">
                      {mockSupplier.description}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-blue-400" />
                        <div>
                          <div className="text-sm text-slate-400">{t('founded')}</div>
                          <div className="text-white font-medium">{mockSupplier.founded}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-green-400" />
                        <div>
                          <div className="text-sm text-slate-400">{t('location')}</div>
                          <div className="text-white font-medium">{mockSupplier.location}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Contact Info */}
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">{t('contactInfo')}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-blue-400" />
                      <div>
                        <div className="text-sm text-slate-400">{t('phone')}</div>
                        <div className="text-white font-medium">{mockSupplier.phone}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-green-400" />
                      <div>
                        <div className="text-sm text-slate-400">{t('email')}</div>
                        <div className="text-white font-medium">{mockSupplier.email}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-purple-400" />
                      <div>
                        <div className="text-sm text-slate-400">{t('website')}</div>
                        <div className="text-white font-medium">{mockSupplier.website}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-orange-400 mt-1" />
                      <div>
                        <div className="text-sm text-slate-400">{t('address')}</div>
                        <div className="text-white font-medium">{mockSupplier.address}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Achievements */}
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Award className="w-5 h-5 text-yellow-400" />
                      {t('achievements')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <ul className="space-y-3">
                      {mockSupplier.achievements.map((achievement, index) => (
                        <li key={index} className="flex items-start gap-2 text-slate-300">
                          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Categories */}
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">{t('categories')}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="flex flex-wrap gap-2">
                      {mockSupplier.categories.map((category, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="border-slate-600 text-slate-300"
                        >
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Specialties */}
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">{t('specialties')}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <ul className="space-y-2">
                      {mockSupplier.specialties.map((specialty, index) => (
                        <li key={index} className="flex items-center gap-2 text-slate-300">
                          <div className="w-2 h-2 bg-blue-500 rounded-full" />
                          {specialty}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="products" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockProducts.map(product => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="group"
                >
                  <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 overflow-hidden hover:border-blue-500/50 transition-all duration-300">
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <Badge variant="destructive" className="text-lg px-4 py-2">
                            {t('outOfStock')}
                          </Badge>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-1 mb-3">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-slate-300">{product.rating}</span>
                        <span className="text-sm text-slate-500">({product.reviews})</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-white">
                          {product.price} ج.م
                        </span>
                        <Button
                          size="sm"
                          className="bg-blue-500 hover:bg-blue-600"
                          disabled={!product.inStock}
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">
                  {t('customerReviews')} ({mockSupplier.reviews})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {reviews.map(review => (
                  <div key={review.id} className="border-b border-slate-700 pb-6 last:border-0">
                    <div className="flex items-start gap-4">
                      <img
                        src={review.avatar}
                        alt={review.user}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-white">{review.user}</h4>
                          <span className="text-sm text-slate-400">{review.date}</span>
                        </div>
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-slate-600'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-slate-300">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
