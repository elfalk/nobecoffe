'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, SlidersHorizontal, ShoppingCart, Star, Filter } from 'lucide-react';
import Link from 'next/link';

// Mock category data - will be replaced with real data from API
const mockCategories = {
  'green-coffee': {
    id: 'green-coffee',
    name: 'قهوة خضراء',
    nameEn: 'Green Coffee',
    slug: 'green-coffee',
    description: 'أجود أنواع القهوة الخضراء من مختلف المناطق حول العالم',
    descriptionEn: 'The finest green coffee beans from various regions around the world',
    image: 'https://images.unsplash.com/photo-1610632380989-680fe40816c6?w=1200&h=400&fit=crop',
    productCount: 156
  },
  'roasted-coffee': {
    id: 'roasted-coffee',
    name: 'قهوة محمصة',
    nameEn: 'Roasted Coffee',
    slug: 'roasted-coffee',
    description: 'قهوة محمصة طازجة من أفضل المحامص',
    descriptionEn: 'Freshly roasted coffee from the best roasters',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=1200&h=400&fit=crop',
    productCount: 234
  },
  'specialty-coffee': {
    id: 'specialty-coffee',
    name: 'قهوة مختصة',
    nameEn: 'Specialty Coffee',
    slug: 'specialty-coffee',
    description: 'قهوة مختصة بجودة عالية وتقييم فوق 80 نقطة',
    descriptionEn: 'High-quality specialty coffee with rating above 80 points',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=1200&h=400&fit=crop',
    productCount: 89
  }
};

const mockProducts = [
  {
    id: 1,
    name: 'قهوة إثيوبيا ييرغاشيف',
    nameEn: 'Ethiopia Yirgacheffe',
    slug: 'ethiopia-yirgacheffe',
    price: 450,
    originalPrice: 500,
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop',
    rating: 4.8,
    reviews: 124,
    supplier: 'Noble Coffee Roasters',
    inStock: true,
    featured: true
  },
  {
    id: 2,
    name: 'قهوة كولومبيا سوبريمو',
    nameEn: 'Colombia Supremo',
    slug: 'colombia-supremo',
    price: 380,
    originalPrice: 420,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=400&fit=crop',
    rating: 4.6,
    reviews: 89,
    supplier: 'Arabian Coffee Co.',
    inStock: true,
    featured: true
  },
  {
    id: 3,
    name: 'قهوة برازيل سانتوس',
    nameEn: 'Brazil Santos',
    slug: 'brazil-santos',
    price: 320,
    originalPrice: 350,
    image: 'https://images.unsplash.com/photo-1610632380989-680fe40816c6?w=400&h=400&fit=crop',
    rating: 4.5,
    reviews: 67,
    supplier: 'Noble Coffee Roasters',
    inStock: true,
    featured: false
  },
  {
    id: 4,
    name: 'قهوة كينيا AA',
    nameEn: 'Kenya AA',
    slug: 'kenya-aa',
    price: 520,
    originalPrice: 580,
    image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=400&h=400&fit=crop',
    rating: 4.9,
    reviews: 156,
    supplier: 'Premium Coffee Egypt',
    inStock: true,
    featured: true
  },
  {
    id: 5,
    name: 'قهوة غواتيمالا أنتيغوا',
    nameEn: 'Guatemala Antigua',
    slug: 'guatemala-antigua',
    price: 410,
    originalPrice: 450,
    image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=400&h=400&fit=crop',
    rating: 4.7,
    reviews: 98,
    supplier: 'Arabian Coffee Co.',
    inStock: false,
    featured: false
  },
  {
    id: 6,
    name: 'قهوة يمن ماتاري',
    nameEn: 'Yemen Mokha Matari',
    slug: 'yemen-mokha-matari',
    price: 680,
    originalPrice: 750,
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400&h=400&fit=crop',
    rating: 5.0,
    reviews: 203,
    supplier: 'Noble Coffee Roasters',
    inStock: true,
    featured: true
  }
];

export default function CategoryPage() {
  const t = useTranslations('category');
  const params = useParams();
  const categorySlug = params.slug as string;
  
  const category = mockCategories[categorySlug as keyof typeof mockCategories] || mockCategories['green-coffee'];
  
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);

  // Filter products
  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.nameEn.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    return matchesSearch && matchesPrice;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'reviews':
        return b.reviews - a.reviews;
      case 'featured':
      default:
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Category Hero */}
      <div className="relative h-64 md:h-80">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/70" />
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="text-center max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {category.name}
            </h1>
            <p className="text-xl text-slate-300 mb-4">
              {category.description}
            </p>
            <Badge className="bg-blue-500 text-lg px-4 py-2">
              {category.productCount} {t('products')}
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  {t('filters')}
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden text-slate-400 hover:text-white"
                >
                  <SlidersHorizontal className="w-5 h-5" />
                </Button>
              </div>

              <div className={`${showFilters ? 'block' : 'hidden'} lg:block space-y-6`}>
                {/* Search */}
                <div>
                  <h3 className="text-sm font-medium text-slate-300 mb-3">
                    {t('search')}
                  </h3>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      type="text"
                      placeholder={t('searchPlaceholder')}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500"
                    />
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="text-sm font-medium text-slate-300 mb-3">
                    {t('priceRange')}
                  </h3>
                  <div className="space-y-4">
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                      className="w-full"
                    />
                    <div className="flex items-center justify-between text-sm text-slate-400">
                      <span>0 ج.م</span>
                      <span>{priceRange[1]} ج.م</span>
                    </div>
                  </div>
                </div>

                {/* Reset Filters */}
                <Button
                  variant="outline"
                  className="w-full border-slate-600 text-slate-300 hover:bg-slate-700"
                  onClick={() => {
                    setSearchQuery('');
                    setPriceRange([0, 1000]);
                  }}
                >
                  {t('resetFilters')}
                </Button>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <p className="text-slate-400">
                {t('showingResults', { count: sortedProducts.length })}
              </p>
              <div className="flex items-center gap-4">
                <span className="text-sm text-slate-400">{t('sortBy')}</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px] bg-slate-800/50 border-slate-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="featured">{t('sortFeatured')}</SelectItem>
                    <SelectItem value="price-low">{t('sortPriceLow')}</SelectItem>
                    <SelectItem value="price-high">{t('sortPriceHigh')}</SelectItem>
                    <SelectItem value="rating">{t('sortRating')}</SelectItem>
                    <SelectItem value="reviews">{t('sortReviews')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Products */}
            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map(product => (
                  <Link
                    key={product.id}
                    href={`/products/${product.slug}`}
                    className="group"
                  >
                    <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
                      <div className="relative aspect-square overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        {product.featured && (
                          <Badge className="absolute top-3 right-3 bg-gradient-to-r from-blue-500 to-blue-600">
                            {t('featured')}
                          </Badge>
                        )}
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
                        <p className="text-sm text-slate-400 mb-3">
                          {product.supplier}
                        </p>
                        <div className="flex items-center gap-1 mb-3">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm text-slate-300">{product.rating}</span>
                          <span className="text-sm text-slate-500">({product.reviews})</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-xl font-bold text-white">
                              {product.price} ج.م
                            </span>
                            {product.originalPrice > product.price && (
                              <span className="text-sm text-slate-500 line-through">
                                {product.originalPrice} ج.م
                              </span>
                            )}
                          </div>
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
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-12 h-12 text-slate-600" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {t('noResults')}
                </h3>
                <p className="text-slate-400">
                  {t('noResultsDescription')}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
