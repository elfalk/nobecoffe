'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Calendar, 
  User, 
  Clock,
  ArrowRight,
  Filter
} from 'lucide-react';
import Link from 'next/link';

// Mock blog posts
const mockBlogPosts = [
  {
    id: 1,
    title: 'دليلك الشامل لتحميص القهوة في المنزل',
    titleEn: 'Your Complete Guide to Home Coffee Roasting',
    slug: 'guide-to-home-coffee-roasting',
    excerpt: 'تعلم كيفية تحميص القهوة في المنزل خطوة بخطوة. اكتشف الأدوات والمعدات التي تحتاجها والنصائح للحصول على أفضل النتائج.',
    excerptEn: 'Learn how to roast coffee at home step by step. Discover the tools and equipment you need and tips for best results.',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&h=400&fit=crop',
    category: 'تعليمي',
    categoryEn: 'Tutorial',
    author: 'أحمد محمد',
    date: '2024-01-15',
    readTime: '8 دقائق',
    featured: true
  },
  {
    id: 2,
    title: 'أفضل أنواع القهوة المختصة في 2024',
    titleEn: 'Best Specialty Coffee Types in 2024',
    slug: 'best-specialty-coffee-2024',
    excerpt: 'اكتشف أفضل أنواع القهوة المختصة التي يجب تجربتها هذا العام. من إثيوبيا إلى كولومبيا، دليلك الشامل.',
    excerptEn: 'Discover the best specialty coffee types you must try this year. From Ethiopia to Colombia, your complete guide.',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&h=400&fit=crop',
    category: 'مراجعات',
    categoryEn: 'Reviews',
    author: 'سارة أحمد',
    date: '2024-01-12',
    readTime: '6 دقائق',
    featured: true
  },
  {
    id: 3,
    title: 'فن تحضير الإسبريسو المثالي',
    titleEn: 'The Art of Brewing Perfect Espresso',
    slug: 'art-of-perfect-espresso',
    excerpt: 'تعلم أسرار تحضير الإسبريسو المثالي. من اختيار الحبوب إلى ضغط القهوة، كل ما تحتاج معرفته.',
    excerptEn: 'Learn the secrets of brewing perfect espresso. From choosing beans to tamping, everything you need to know.',
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=800&h=400&fit=crop',
    category: 'تعليمي',
    categoryEn: 'Tutorial',
    author: 'محمد علي',
    date: '2024-01-10',
    readTime: '10 دقائق',
    featured: false
  },
  {
    id: 4,
    title: 'تاريخ القهوة: من إثيوبيا إلى العالم',
    titleEn: 'Coffee History: From Ethiopia to the World',
    slug: 'coffee-history-ethiopia-world',
    excerpt: 'رحلة عبر تاريخ القهوة من اكتشافها في إثيوبيا حتى انتشارها في جميع أنحاء العالم.',
    excerptEn: 'A journey through coffee history from its discovery in Ethiopia to its spread around the world.',
    image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&h=400&fit=crop',
    category: 'تاريخ',
    categoryEn: 'History',
    author: 'فاطمة حسن',
    date: '2024-01-08',
    readTime: '12 دقائق',
    featured: false
  },
  {
    id: 5,
    title: 'كيفية اختيار آلة القهوة المناسبة',
    titleEn: 'How to Choose the Right Coffee Machine',
    slug: 'how-to-choose-coffee-machine',
    excerpt: 'دليل شامل لاختيار آلة القهوة المناسبة لاحتياجاتك. مقارنة بين الأنواع المختلفة والميزات.',
    excerptEn: 'Complete guide to choosing the right coffee machine for your needs. Comparison of different types and features.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&h=400&fit=crop',
    category: 'مراجعات',
    categoryEn: 'Reviews',
    author: 'أحمد محمد',
    date: '2024-01-05',
    readTime: '7 دقائق',
    featured: false
  },
  {
    id: 6,
    title: 'فوائد القهوة للصحة: الحقائق والأساطير',
    titleEn: 'Coffee Health Benefits: Facts and Myths',
    slug: 'coffee-health-benefits-facts-myths',
    excerpt: 'اكتشف الحقائق العلمية حول فوائد القهوة للصحة وفصلها عن الأساطير الشائعة.',
    excerptEn: 'Discover scientific facts about coffee health benefits and separate them from common myths.',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&h=400&fit=crop',
    category: 'صحة',
    categoryEn: 'Health',
    author: 'سارة أحمد',
    date: '2024-01-03',
    readTime: '9 دقائق',
    featured: false
  }
];

const categories = [
  { id: 'all', name: 'جميع المقالات', nameEn: 'All Posts' },
  { id: 'tutorial', name: 'تعليمي', nameEn: 'Tutorial' },
  { id: 'reviews', name: 'مراجعات', nameEn: 'Reviews' },
  { id: 'history', name: 'تاريخ', nameEn: 'History' },
  { id: 'health', name: 'صحة', nameEn: 'Health' }
];

export default function BlogPage() {
  const t = useTranslations('blog');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Filter posts
  const filteredPosts = mockBlogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.titleEn.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           post.category.toLowerCase().includes(selectedCategory.toLowerCase());
    
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = mockBlogPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('title')}
          </h1>
          <p className="text-xl text-blue-100">
            {t('subtitle')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <Input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map(category => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category.id)}
                className={
                  selectedCategory === category.id
                    ? 'bg-blue-500 hover:bg-blue-600'
                    : 'border-slate-700 text-slate-300 hover:bg-slate-700'
                }
              >
                <Filter className="ml-2 h-4 w-4" />
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Posts */}
        {selectedCategory === 'all' && featuredPosts.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-8 bg-blue-500 rounded"></span>
              {t('featuredPosts')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredPosts.map(post => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                  <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 overflow-hidden hover:border-blue-500/50 transition-all duration-300">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <Badge className="absolute top-4 right-4 bg-blue-500">
                        {t('featured')}
                      </Badge>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 text-sm text-slate-400 mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {post.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.readTime}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-slate-400 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-slate-400" />
                          <span className="text-sm text-slate-400">{post.author}</span>
                        </div>
                        <Badge variant="outline" className="border-slate-600 text-slate-300">
                          {post.category}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Regular Posts */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="w-2 h-8 bg-blue-500 rounded"></span>
            {t('allPosts')}
          </h2>
          {regularPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularPosts.map(post => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                  <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 overflow-hidden hover:border-blue-500/50 transition-all duration-300">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {post.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-sm text-slate-400 line-clamp-2 mb-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3 text-slate-400" />
                          <span className="text-xs text-slate-400">{post.author}</span>
                        </div>
                        <Badge variant="outline" className="text-xs border-slate-600 text-slate-300">
                          {post.category}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
              <CardContent className="p-12 text-center">
                <div className="w-24 h-24 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-12 h-12 text-slate-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {t('noPosts')}
                </h3>
                <p className="text-slate-400">
                  {t('noPostsDescription')}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
