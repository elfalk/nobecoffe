'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  MapPin, 
  Star, 
  Package,
  CheckCircle,
  Filter
} from 'lucide-react';

const mockSuppliers = [
  {
    id: 1,
    name: 'Noble Coffee Roasters',
    description: 'محمصة القهوة الفاخرة منذ 2015',
    logo: 'N',
    rating: 4.9,
    reviews: 256,
    products: 45,
    location: 'Cairo',
    verified: true,
    featured: true
  },
  {
    id: 2,
    name: 'Arabian Coffee Co.',
    description: 'أفضل قهوة عربية في مصر',
    logo: 'A',
    rating: 4.7,
    reviews: 189,
    products: 32,
    location: 'Alexandria',
    verified: true,
    featured: true
  },
  {
    id: 3,
    name: 'Premium Coffee Egypt',
    description: 'قهوة مميزة من أفضل المزارع',
    logo: 'P',
    rating: 4.5,
    reviews: 98,
    products: 28,
    location: 'Giza',
    verified: false,
    featured: false
  },
  {
    id: 4,
    name: 'Egyptian Beans',
    description: 'ق beans مصرية عالية الجودة',
    logo: 'E',
    rating: 4.6,
    reviews: 145,
    products: 22,
    location: 'Mansoura',
    verified: true,
    featured: false
  },
  {
    id: 5,
    name: 'Coffee House Egypt',
    description: 'تجربة قهوة فريدة',
    logo: 'C',
    rating: 4.8,
    reviews: 312,
    products: 38,
    location: 'Cairo',
    verified: true,
    featured: true
  },
  {
    id: 6,
    name: 'Golden Bean',
    description: 'أجود أنواع القهوة العالمية',
    logo: 'G',
    rating: 4.4,
    reviews: 76,
    products: 18,
    location: 'Alexandria',
    verified: false,
    featured: false
  }
];

export default function SuppliersPage() {
  const t = useTranslations('suppliers');
  const [searchQuery, setSearchQuery] = useState('');
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const filteredSuppliers = mockSuppliers.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         supplier.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesVerified = verifiedOnly ? supplier.verified : true;
    return matchesSearch && matchesVerified;
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
        {/* Search and Filters */}
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
            variant={verifiedOnly ? 'default' : 'outline'}
            onClick={() => setVerifiedOnly(!verifiedOnly)}
            className={verifiedOnly ? '' : 'border-slate-700'}
          >
            <Filter className="ml-2 h-4 w-4" />
            {t('verifiedOnly')}
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-white">{mockSuppliers.length}</p>
              <p className="text-sm text-slate-400">{t('totalSuppliers')}</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-blue-400">
                {mockSuppliers.filter(s => s.verified).length}
              </p>
              <p className="text-sm text-slate-400">{t('verifiedSuppliers')}</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-green-400">
                {mockSuppliers.reduce((sum, s) => sum + s.products, 0)}
              </p>
              <p className="text-sm text-slate-400">{t('totalProducts')}</p>
            </CardContent>
          </Card>
        </div>

        {/* Suppliers Grid */}
        {filteredSuppliers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-400 text-lg">{t('noResults')}</p>
            <p className="text-slate-500 text-sm mt-2">{t('noResultsDescription')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSuppliers.map(supplier => (
              <Card key={supplier.id} className="bg-slate-800/50 border-slate-700 overflow-hidden group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-2xl font-bold text-white">
                      {supplier.logo}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Link 
                          href={`/suppliers/${supplier.id}`}
                          className="font-semibold text-white group-hover:text-blue-400 transition-colors"
                        >
                          {supplier.name}
                        </Link>
                        {supplier.verified && (
                          <CheckCircle className="w-4 h-4 text-blue-400" />
                        )}
                      </div>
                      {supplier.featured && (
                        <Badge className="bg-blue-500 mt-1">{t('featured')}</Badge>
                      )}
                    </div>
                  </div>

                  <p className="text-slate-400 text-sm mb-4">{supplier.description}</p>

                  <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {supplier.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Package className="w-4 h-4" />
                      {supplier.products} {t('products')}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-white font-semibold">{supplier.rating}</span>
                      <span className="text-slate-500 text-sm">({supplier.reviews})</span>
                    </div>
                    <Link href={`/suppliers/${supplier.id}`}>
                      <Button variant="outline" size="sm" className="border-slate-700">
                        View
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
