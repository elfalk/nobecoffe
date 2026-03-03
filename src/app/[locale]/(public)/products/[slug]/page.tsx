'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  Share2, 
  Truck, 
  Shield, 
  RefreshCw,
  CheckCircle,
  MapPin,
  Minus,
  Plus,
  ArrowLeft
} from 'lucide-react';

// Mock product data - will be replaced with API
const mockProduct = {
  id: 1,
  name: 'قهوة إثيوبيا ييرغاشيف',
  nameEn: 'Ethiopia Yirgacheffe',
  slug: 'ethiopia-yirgacheffe',
  images: [
    'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&h=800&fit=crop',
  ],
  price: 450,
  originalPrice: 500,
  description: 'قهوة إثيوبيا ييرغاشيف هي واحدة من أجود أنواع القهوة في العالم. تتميز بطعمها الفريد الذي يجمع بين الحموضة المتوازنة والنكهات الزهرية والفاكهية.',
  descriptionEn: 'Ethiopia Yirgacheffe is one of the finest coffees in the world. It features a unique taste combining balanced acidity with floral and fruity notes.',
  specs: {
    origin: 'Ethiopia',
    region: 'Yirgacheffe',
    altitude: '1800-2200m',
    roastLevel: 'Medium',
    processing: 'Washed',
    flavorNotes: 'Jasmine, Bergamot, Peach'
  },
  rating: 4.8,
  reviews: 124,
  sales: 567,
  inStock: true,
  stockQuantity: 50,
  isFeatured: true,
  supplier: {
    id: 1,
    name: 'Noble Coffee Roasters',
    verified: true,
    location: 'Cairo',
    rating: 4.9,
    products: 45,
    responseTime: '< 1 hour'
  }
};

const relatedProducts = [
  {
    id: 2,
    name: 'قهوة كولومبيا سوبريمو',
    slug: 'colombia-supremo',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=400&fit=crop',
    price: 380,
    rating: 4.6
  },
  {
    id: 3,
    name: 'قهوة يمن ماتاري',
    slug: 'yemen-mokha-matari',
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400&h=400&fit=crop',
    price: 680,
    rating: 4.9
  },
  {
    id: 5,
    name: 'قهوة كوستا ريكا تاراتو',
    slug: 'costa-rica-tarrazu',
    image: 'https://images.unsplash.com/photo-1504630083234-14187a9df0f5?w=400&h=400&fit=crop',
    price: 520,
    rating: 4.7
  }
];

export default function ProductPage() {
  const t = useTranslations('product');
  const params = useParams();
  const slug = params.slug as string;
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const product = mockProduct;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Breadcrumb */}
      <div className="bg-slate-800/50 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Link href="/" className="hover:text-white">{t('home')}</Link>
            <span>/</span>
            <Link href="/marketplace" className="hover:text-white">{t('marketplace')}</Link>
            <span>/</span>
            <span className="text-white">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-lg overflow-hidden bg-slate-800">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="object-cover w-full h-full"
              />
              {product.isFeatured && (
                <Badge className="absolute top-4 right-4 bg-blue-500">
                  {t('featured')}
                </Badge>
              )}
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-blue-500' : 'border-transparent'
                  }`}
                >
                  <img src={image} alt="" className="object-cover w-full h-full" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{product.name}</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="text-white font-semibold">{product.rating}</span>
                  <span className="text-slate-400">({product.reviews} {t('reviews')})</span>
                </div>
                <span className="text-slate-600">•</span>
                <span className="text-slate-400">{product.sales} {t('sold')}</span>
              </div>
            </div>

            <div className="flex items-baseline gap-4">
              <span className="text-4xl font-bold text-white">{product.price} ج.م</span>
              {product.originalPrice > product.price && (
                <>
                  <span className="text-xl text-slate-500 line-through">
                    {product.originalPrice} ج.م
                  </span>
                  <Badge variant="destructive">
                    {t('save')} {Math.round((1 - product.price / product.originalPrice) * 100)}%
                  </Badge>
                </>
              )}
            </div>

            <Separator className="bg-slate-700" />

            {/* Supplier Info */}
            <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold text-white">
                    {product.supplier.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <Link 
                    href={`/suppliers/${product.supplier.id}`}
                    className="flex items-center gap-1 text-white font-semibold hover:text-blue-400"
                  >
                    {product.supplier.name}
                    {product.supplier.verified && (
                      <CheckCircle className="w-4 h-4 text-blue-400" />
                    )}
                  </Link>
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <MapPin className="w-3 h-3" />
                    {product.supplier.location}
                  </div>
                </div>
              </div>
              <Button variant="outline" className="border-slate-700">
                {t('viewSupplier')}
              </Button>
            </div>

            <Separator className="bg-slate-700" />

            {/* Quantity & Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-slate-400">Quantity:</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="border-slate-700"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-12 text-center text-white font-semibold">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
                    className="border-slate-700"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <span className="text-slate-400">
                  {product.stockQuantity} {t('available')}
                </span>
              </div>

              <div className="flex gap-3">
                <Button className="flex-1" size="lg">
                  <ShoppingCart className="ml-2 h-5 w-5" />
                  {t('addToCart')}
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`border-slate-700 ${isWishlisted ? 'text-red-500' : ''}`}
                >
                  <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </Button>
                <Button variant="outline" size="icon" className="border-slate-700">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-slate-800/50 rounded-lg">
                <Truck className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                <p className="text-xs text-slate-400">{t('fastDelivery')}</p>
              </div>
              <div className="text-center p-3 bg-slate-800/50 rounded-lg">
                <Shield className="w-6 h-6 text-green-400 mx-auto mb-2" />
                <p className="text-xs text-slate-400">{t('qualityGuarantee')}</p>
              </div>
              <div className="text-center p-3 bg-slate-800/50 rounded-lg">
                <RefreshCw className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <p className="text-xs text-slate-400">{t('easyReturns')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="description" className="mb-12">
          <TabsList className="bg-slate-800">
            <TabsTrigger value="description">{t('description')}</TabsTrigger>
            <TabsTrigger value="specifications">{t('specifications')}</TabsTrigger>
            <TabsTrigger value="reviews">{t('reviews')}</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-6">
                <p className="text-slate-300 leading-relaxed">{product.description}</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="specifications" className="mt-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key}>
                      <p className="text-slate-400 text-sm">{key}</p>
                      <p className="text-white font-semibold">{value}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="reviews" className="mt-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-6">
                <p className="text-slate-400 text-center">Reviews coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">{t('relatedProducts')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map(product => (
              <Card key={product.id} className="bg-slate-800/50 border-slate-700 overflow-hidden group">
                <Link href={`/products/${product.slug}`}>
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Link>
                <CardContent className="p-4">
                  <Link href={`/products/${product.slug}`}>
                    <h3 className="font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-white">{product.rating}</span>
                    </div>
                    <span className="font-bold text-white">{product.price} ج.م</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
