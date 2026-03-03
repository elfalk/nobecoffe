'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { 
  Search, 
  Filter, 
  Star, 
  ShoppingCart, 
  Grid, 
  List,
  X,
  ChevronDown,
  MapPin,
  CheckCircle
} from 'lucide-react';

// Mock data - will be replaced with API data
const mockProducts = [
  {
    id: 1,
    name: 'قهوة إثيوبيا ييرغاشيف',
    nameEn: 'Ethiopia Yirgacheffe',
    slug: 'ethiopia-yirgacheffe',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop',
    price: 450,
    originalPrice: 500,
    rating: 4.8,
    reviews: 124,
    sales: 567,
    inStock: true,
    isFeatured: true,
    supplier: {
      name: 'Noble Coffee Roasters',
      verified: true,
      location: 'Cairo'
    }
  },
  {
    id: 2,
    name: 'قهوة كولومبيا سوبريمو',
    nameEn: 'Colombia Supremo',
    slug: 'colombia-supremo',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=400&fit=crop',
    price: 380,
    originalPrice: 420,
    rating: 4.6,
    reviews: 89,
    sales: 234,
    inStock: true,
    isFeatured: false,
    supplier: {
      name: 'Arabian Coffee Co.',
      verified: true,
      location: 'Alexandria'
    }
  },
  {
    id: 3,
    name: 'قهوة يمن ماتاري',
    nameEn: 'Yemen Mokha Matari',
    slug: 'yemen-mokha-matari',
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400&h=400&fit=crop',
    price: 680,
    originalPrice: 750,
    rating: 4.9,
    reviews: 156,
    sales: 89,
    inStock: true,
    isFeatured: true,
    supplier: {
      name: 'Noble Coffee Roasters',
      verified: true,
      location: 'Cairo'
    }
  },
  {
    id: 4,
    name: 'قهوة برازيل سانتوس',
    nameEn: 'Brazil Santos',
    slug: 'brazil-santos',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop',
    price: 320,
    originalPrice: 350,
    rating: 4.5,
    reviews: 67,
    sales: 456,
    inStock: true,
    isFeatured: false,
    supplier: {
      name: 'Premium Coffee Egypt',
      verified: false,
      location: 'Giza'
    }
  },
  {
    id: 5,
    name: 'قهوة كوستا ريكا تاراتو',
    nameEn: 'Costa Rica Tarrazu',
    slug: 'costa-rica-tarrazu',
    image: 'https://images.unsplash.com/photo-1504630083234-14187a9df0f5?w=400&h=400&fit=crop',
    price: 520,
    originalPrice: 580,
    rating: 4.7,
    reviews: 98,
    sales: 123,
    inStock: true,
    isFeatured: true,
    supplier: {
      name: 'Noble Coffee Roasters',
      verified: true,
      location: 'Cairo'
    }
  },
  {
    id: 6,
    name: 'قهوة غواتيمالا أنتيغوا',
    nameEn: 'Guatemala Antigua',
    slug: 'guatemala-antigua',
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400&h=400&fit=crop',
    price: 480,
    originalPrice: 520,
    rating: 4.6,
    reviews: 45,
    sales: 78,
    inStock: false,
    isFeatured: false,
    supplier: {
      name: 'Arabian Coffee Co.',
      verified: true,
      location: 'Alexandria'
    }
  }
];

const categories = [
  { id: 'all', name: 'All Categories', nameEn: 'All Categories' },
  { id: 'green', name: 'قهوة خضراء', nameEn: 'Green Coffee' },
  { id: 'roasted', name: 'قهوة محمصة', nameEn: 'Roasted Coffee' },
  { id: 'specialty', name: 'قهوة مميزة', nameEn: 'Specialty Coffee' },
  { id: 'blends', name: 'خلطات', nameEn: 'Blends' },
];

export default function MarketplacePage() {
  const t = useTranslations('marketplace');
  const [products, setProducts] = useState(mockProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.nameEn.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesSearch && matchesPrice;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'sales':
        return b.sales - a.sales;
      default:
        return b.isFeatured ? 1 : -1;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-slate-800/50 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-white mb-2">{t('title')}</h1>
          <p className="text-slate-400">{t('subtitle')}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filters Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <Input
              type="search"
              placeholder={t('searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10 bg-slate-800/50 border-slate-700 text-white"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="border-slate-700 text-slate-300 hover:bg-slate-800 md:hidden"
          >
            <Filter className="ml-2 h-4 w-4" />
            {t('filters')}
          </Button>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className={`${showFilters ? 'block' : 'hidden'} md:block w-full md:w-64 space-y-6`}>
            {/* Categories */}
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
              <h3 className="font-semibold text-white mb-4">{t('categories')}</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`block w-full text-right px-3 py-2 rounded-md transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    {category.nameEn}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
              <h3 className="font-semibold text-white mb-4">{t('priceRange')}</h3>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={1000}
                step={10}
                className="mb-4"
              />
              <div className="flex justify-between text-sm text-slate-400">
                <span>{priceRange[0]} ج.م</span>
                <span>{priceRange[1]} ج.م</span>
              </div>
            </div>

            <Button
              variant="outline"
              onClick={() => {
                setSelectedCategory('all');
                setPriceRange([0, 1000]);
                setSearchQuery('');
              }}
              className="w-full border-slate-700 text-slate-300 hover:bg-slate-800"
            >
              {t('resetFilters')}
            </Button>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort and View Options */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-slate-400">
                {t('showingResults', { count: sortedProducts.length })}
              </p>
              <div className="flex items-center gap-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-slate-800/50 border border-slate-700 text-white rounded-md px-3 py-2 text-sm"
                >
                  <option value="featured">{t('sortFeatured')}</option>
                  <option value="price-low">{t('sortPriceLow')}</option>
                  <option value="price-high">{t('sortPriceHigh')}</option>
                  <option value="rating">{t('sortRating')}</option>
                  <option value="sales">{t('sortReviews')}</option>
                </select>
                <div className="flex gap-1">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="icon"
                    onClick={() => setViewMode('grid')}
                    className="h-8 w-8"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="icon"
                    onClick={() => setViewMode('list')}
                    className="h-8 w-8"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products */}
            {sortedProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-slate-400 text-lg">{t('noResults')}</p>
                <p className="text-slate-500 text-sm mt-2">{t('noResultsDescription')}</p>
              </div>
            ) : (
              <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                {sortedProducts.map(product => (
                  <Card key={product.id} className="bg-slate-800/50 border-slate-700 overflow-hidden group">
                    <Link href={`/products/${product.slug}`}>
                      <div className="relative aspect-square overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                        />
                        {product.isFeatured && (
                          <Badge className="absolute top-2 right-2 bg-blue-500">
                            {t('featured')}
                          </Badge>
                        )}
                        {!product.inStock && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <Badge variant="destructive" className="text-lg">
                              {t('outOfStock')}
                            </Badge>
                          </div>
                        )}
                      </div>
                    </Link>
                    <CardContent className="p-4">
                      <Link href={`/products/${product.slug}`}>
                        <h3 className="font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                          {product.name}
                        </h3>
                      </Link>
                      <div className="flex items-center gap-2 mb-2">
                        <Link href={`/suppliers/${product.supplier.name}`} className="flex items-center gap-1 text-sm text-slate-400 hover:text-blue-400">
                          {product.supplier.verified && (
                            <CheckCircle className="w-3 h-3 text-blue-400" />
                          )}
                          {product.supplier.name}
                        </Link>
                        <span className="text-slate-600">•</span>
                        <span className="text-sm text-slate-500 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {product.supplier.location}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-white">{product.rating}</span>
                        </div>
                        <span className="text-slate-600">•</span>
                        <span className="text-sm text-slate-500">({product.reviews} {t('reviews')})</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold text-white">{product.price} ج.م</span>
                          {product.originalPrice > product.price && (
                            <span className="text-sm text-slate-500 line-through">
                              {product.originalPrice} ج.م
                            </span>
                          )}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button
                        className="w-full"
                        disabled={!product.inStock}
                      >
                        <ShoppingCart className="ml-2 h-4 w-4" />
                        {product.inStock ? t('addToCart') : t('outOfStock')}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
