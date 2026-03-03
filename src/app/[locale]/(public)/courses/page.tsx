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
  Users, 
  Clock,
  Star,
  Play,
  Filter,
  BookOpen
} from 'lucide-react';
import Link from 'next/link';

// Mock courses data
const mockCourses = [
  {
    id: 1,
    title: 'دورة تحميص القهوة الاحترافي',
    titleEn: 'Professional Coffee Roasting Course',
    slug: 'professional-coffee-roasting',
    description: 'تعلم فن تحميص القهوة من المحترفين. دورة شاملة تغطي جميع جوانب تحميص القهوة من المبتدئ إلى المحترف.',
    descriptionEn: 'Learn the art of coffee roasting from professionals. A comprehensive course covering all aspects of coffee roasting from beginner to expert.',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&h=400&fit=crop',
    instructor: 'أحمد محمد',
    price: 2500,
    originalPrice: 3000,
    duration: '4 أسابيع',
    lessons: 24,
    students: 156,
    rating: 4.9,
    reviews: 89,
    level: 'متقدم',
    category: 'تحميص',
    featured: true
  },
  {
    id: 2,
    title: 'دورة تحضير الإسبريسو',
    titleEn: 'Espresso Brewing Course',
    slug: 'espresso-brewing',
    description: 'أتقن فن تحضير الإسبريسو المثالي. تعلم التقنيات والمهارات اللازمة لعمل إسبريسو احترافي.',
    descriptionEn: 'Master the art of brewing perfect espresso. Learn the techniques and skills needed to make professional espresso.',
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=800&h=400&fit=crop',
    instructor: 'سارة أحمد',
    price: 1800,
    originalPrice: 2200,
    duration: '3 أسابيع',
    lessons: 18,
    students: 234,
    rating: 4.8,
    reviews: 124,
    level: 'متوسط',
    category: 'تحضير',
    featured: true
  },
  {
    id: 3,
    title: 'دورة تذوق القهوة المختصة',
    titleEn: 'Specialty Coffee Cupping Course',
    slug: 'specialty-coffee-cupping',
    description: 'تعلم كيفية تذوق وتقييم القهوة المختصة مثل المحترفين. دورة عملية شاملة.',
    descriptionEn: 'Learn how to taste and evaluate specialty coffee like professionals. A comprehensive practical course.',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&h=400&fit=crop',
    instructor: 'محمد علي',
    price: 2000,
    originalPrice: 2500,
    duration: '2 أسابيع',
    lessons: 12,
    students: 189,
    rating: 4.7,
    reviews: 67,
    level: 'متوسط',
    category: 'تذوق',
    featured: false
  },
  {
    id: 4,
    title: 'دورة إدارة مقهى القهوة',
    titleEn: 'Coffee Shop Management Course',
    slug: 'coffee-shop-management',
    description: 'تعلم كيفية إدارة مقهى القهوة بنجاح. من التخطيط إلى التشغيل، كل ما تحتاج معرفته.',
    descriptionEn: 'Learn how to successfully manage a coffee shop. From planning to operations, everything you need to know.',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=400&fit=crop',
    instructor: 'فاطمة حسن',
    price: 3000,
    originalPrice: 3500,
    duration: '6 أسابيع',
    lessons: 30,
    students: 98,
    rating: 4.9,
    reviews: 45,
    level: 'مبتدئ',
    category: 'إدارة',
    featured: false
  },
  {
    id: 5,
    title: 'دورة فن اللاتيه',
    titleEn: 'Latte Art Course',
    slug: 'latte-art',
    description: 'تعلم فن اللاتيه من الأساسيات إلى التصاميم المتقدمة. دورة عملية مع تدريب مكثف.',
    descriptionEn: 'Learn latte art from basics to advanced designs. A practical course with intensive training.',
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=800&h=400&fit=crop',
    instructor: 'أحمد محمد',
    price: 1500,
    originalPrice: 1800,
    duration: '2 أسابيع',
    lessons: 10,
    students: 312,
    rating: 4.8,
    reviews: 156,
    level: 'مبتدئ',
    category: 'فن',
    featured: false
  },
  {
    id: 6,
    title: 'دورة تاريخ القهوة وثقافتها',
    titleEn: 'Coffee History and Culture Course',
    slug: 'coffee-history-culture',
    description: 'اكتشف تاريخ القهوة الغني وثقافتها المتنوعة حول العالم. رحلة تعليمية ممتعة.',
    descriptionEn: 'Discover the rich history of coffee and its diverse cultures around the world. An enjoyable educational journey.',
    image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&h=400&fit=crop',
    instructor: 'سارة أحمد',
    price: 800,
    originalPrice: 1000,
    duration: '1 أسبوع',
    lessons: 8,
    students: 445,
    rating: 4.6,
    reviews: 89,
    level: 'مبتدئ',
    category: 'تاريخ',
    featured: false
  }
];

const categories = [
  { id: 'all', name: 'جميع الدورات', nameEn: 'All Courses' },
  { id: 'roasting', name: 'تحميص', nameEn: 'Roasting' },
  { id: 'brewing', name: 'تحضير', nameEn: 'Brewing' },
  { id: 'cupping', name: 'تذوق', nameEn: 'Cupping' },
  { id: 'management', name: 'إدارة', nameEn: 'Management' },
  { id: 'art', name: 'فن', nameEn: 'Art' },
  { id: 'history', name: 'تاريخ', nameEn: 'History' }
];

const levels = [
  { id: 'all', name: 'جميع المستويات', nameEn: 'All Levels' },
  { id: 'beginner', name: 'مبتدئ', nameEn: 'Beginner' },
  { id: 'intermediate', name: 'متوسط', nameEn: 'Intermediate' },
  { id: 'advanced', name: 'متقدم', nameEn: 'Advanced' }
];

export default function CoursesPage() {
  const t = useTranslations('courses');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');

  // Filter courses
  const filteredCourses = mockCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.titleEn.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           course.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesLevel = selectedLevel === 'all' ||
                        course.level.toLowerCase().includes(selectedLevel.toLowerCase());
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const featuredCourses = mockCourses.filter(course => course.featured);
  const regularCourses = filteredCourses.filter(course => !course.featured);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="w-12 h-12 text-white" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              {t('title')}
            </h1>
          </div>
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

        {/* Level Filter */}
        <div className="flex gap-2 mb-8">
          {levels.map(level => (
            <Button
              key={level.id}
              variant={selectedLevel === level.id ? 'default' : 'outline'}
              onClick={() => setSelectedLevel(level.id)}
              size="sm"
              className={
                selectedLevel === level.id
                  ? 'bg-purple-500 hover:bg-purple-600'
                  : 'border-slate-700 text-slate-300 hover:bg-slate-700'
              }
            >
              {level.name}
            </Button>
          ))}
        </div>

        {/* Featured Courses */}
        {selectedCategory === 'all' && selectedLevel === 'all' && featuredCourses.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-8 bg-blue-500 rounded"></span>
              {t('featuredCourses')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredCourses.map(course => (
                <Link key={course.id} href={`/courses/${course.slug}`} className="group">
                  <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 overflow-hidden hover:border-blue-500/50 transition-all duration-300">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <Badge className="absolute top-4 right-4 bg-blue-500">
                        {t('featured')}
                      </Badge>
                      <div className="absolute bottom-4 left-4 flex gap-2">
                        <Badge className="bg-purple-500">
                          {course.level}
                        </Badge>
                        <Badge variant="outline" className="bg-slate-900/80 border-slate-600 text-white">
                          {course.category}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 text-sm text-slate-400 mb-3">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {course.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4" />
                          {course.lessons} {t('lessons')}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {course.students} {t('students')}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-slate-400 line-clamp-2 mb-4">
                        {course.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-semibold text-white">{course.rating}</span>
                          <span className="text-xs text-slate-500">({course.reviews})</span>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2">
                            <span className="text-xl font-bold text-white">
                              {course.price} ج.م
                            </span>
                            {course.originalPrice > course.price && (
                              <span className="text-sm text-slate-500 line-through">
                                {course.originalPrice} ج.م
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Regular Courses */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="w-2 h-8 bg-blue-500 rounded"></span>
            {t('allCourses')}
          </h2>
          {regularCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularCourses.map(course => (
                <Link key={course.id} href={`/courses/${course.slug}`} className="group">
                  <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 overflow-hidden hover:border-blue-500/50 transition-all duration-300">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute bottom-4 left-4 flex gap-2">
                        <Badge className="bg-purple-500 text-xs">
                          {course.level}
                        </Badge>
                        <Badge variant="outline" className="bg-slate-900/80 border-slate-600 text-white text-xs">
                          {course.category}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {course.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen className="w-3 h-3" />
                          {course.lessons} {t('lessons')}
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-sm text-slate-400 line-clamp-2 mb-3">
                        {course.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs font-semibold text-white">{course.rating}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-bold text-white">
                            {course.price} ج.م
                          </span>
                        </div>
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
                  {t('noCourses')}
                </h3>
                <p className="text-slate-400">
                  {t('noCoursesDescription')}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
