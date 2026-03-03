# 🚀 Noble Drip - دليل البدء السريع

## ✅ ما تم إنجازه حتى الآن

### المرحلة 1: التأسيس الأساسي (مكتملة جزئياً)

#### ✅ إعداد المشروع
- [x] إنشاء مشروع Next.js 14 مع TypeScript
- [x] تثبيت جميع التبعيات الأساسية
- [x] إعداد ESLint و Prettier
- [x] إنشاء هيكل المجلدات الأساسي
- [x] إعداد ملفات البيئة (.env)

#### ✅ قاعدة البيانات
- [x] إنشاء schema.prisma مع جميع النماذج (18 model)
- [x] إنشاء seed script مع:
  - حساب Super Admin (yuoseef01102@gmail.com / Admin@123)
  - 7 فئات للقهوة
  - إعدادات الموقع الأولية
  - أسعار بورصة القهوة
  - كوبون تجريبي

#### ✅ المصادقة
- [x] إعداد NextAuth.js v5
- [x] إنشاء API route للمصادقة
- [x] إعداد middleware للتحكم في الصلاحيات
- [x] إعداد التوجيه التلقائي حسب الدور

#### ✅ التصميم الأساسي
- [x] إعداد Tailwind مع الألوان المخصصة
- [x] إنشاء ملف globals.css مع تأثيرات مخصصة
- [x] إعداد الدعم للعربية (RTL)
- [x] إنشاء ملفات الترجمة (ar.json, en.json)
- [x] إعداد next-intl

#### ✅ البنية الأساسية
- [x] إنشاء ملف lib/prisma.ts
- [x] إنشاء ملف lib/auth.ts
- [x] إنشاء ملف lib/utils.ts مع دوال مساعدة
- [x] إنشاء ملف types/index.ts
- [x] إنشاء ملف i18n.ts
- [x] إنشاء ملف middleware.ts
- [x] إنشاء الصفحة الرئيسية البسيطة

## 📋 الخطوات التالية للبدء

### 1. إعداد قاعدة البيانات

أولاً، تحتاج إلى إعداد قاعدة بيانات PostgreSQL. لديك خياران:

#### الخيار A: استخدام PostgreSQL محلي (للتطوير)

```bash
# تثبيت PostgreSQL على Ubuntu/Debian
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib

# بدء خدمة PostgreSQL
sudo service postgresql start

# إنشاء قاعدة البيانات
sudo -u postgres psql
CREATE DATABASE noble_drip;
CREATE USER postgres WITH PASSWORD 'postgres';
GRANT ALL PRIVILEGES ON DATABASE noble_drip TO postgres;
\q
```

#### الخيار B: استخدام قاعدة بيانات سحابية (موصى به للإنتاج)

يمكنك استخدام:
- **Supabase**: https://supabase.com (مجاني)
- **Railway**: https://railway.app
- **Neon**: https://neon.tech (مجاني)

بعد إنشاء قاعدة البيانات، قم بتحديث ملف `.env`:

```env
DATABASE_URL="postgresql://user:password@host:port/database?schema=public"
```

### 2. تشغيل Migrations

```bash
cd noble-drip
npm run db:push
```

### 3. تشغيل Seed Script

```bash
npm run db:seed
```

هذا سيقوم بإنشاء:
- حساب Super Admin
- الفئات الأولية
- إعدادات الموقع
- أسعار بورصة القهوة
- كوبون تجريبي

### 4. توليد Prisma Client

```bash
npm run db:generate
```

### 5. تشغيل خادم التطوير

```bash
npm run dev
```

### 6. فتح المتصفح

افتح المتصفح على:
```
http://localhost:3000
```

## 🔑 تسجيل الدخول

استخدم بيانات Super Admin:

- **البريد الإلكتروني**: yuoseef01102@gmail.com
- **كلمة المرور**: Admin@123

## 📊 ما يمكن عمله الآن

بعد تشغيل المشروع، يمكنك:

1. **عرض الصفحة الرئيسية**: http://localhost:3000
2. **تسجيل الدخول**: http://localhost:3000/login (سيتم إنشاؤها قريباً)
3. **لوحة تحكم المسؤول**: http://localhost:3000/dashboard/admin (بعد تسجيل الدخول)
4. **Prisma Studio**: `npm run db:studio` لعرض قاعدة البيانات

## 🎯 المهام القادمة

### المرحلة 2: الموقع العام والسوق

- [ ] إنشاء صفحة تسجيل الدخول
- [ ] إنشاء صفحة التسجيل
- [ ] إنشاء Header component
- [ ] إنشاء Footer component
- [ ] إنشاء صفحة السوق
- [ ] إنشاء ProductCard component
- [ ] إنشاء نظام السلة
- [ ] إنشاء صفحة Checkout

### المرحلة 3: لوحات التحكم

- [ ] لوحة تحكم المسؤول
- [ ] لوحة تحكم المورد
- [ ] لوحة تحكم العميل
- [ ] لوحة تحكم المسوق

### المرحلة 4: الميزات الإضافية

- [ ] بورصة القهوة
- [ ] نظام الإشعارات
- [ ] المدونة
- [ ] الكورسات
- [ ] نظام التسويق بالعمولة
- [ ] نظام الكوبونات

## 🛠️ استكشاف الأخطاء

### مشكلة: فشل الاتصال بقاعدة البيانات

**الحل**: تأكد من أن:
1. قاعدة البيانات تعمل
2. DATABASE_URL في ملف .env صحيح
3. المستخدم لديه الصلاحيات اللازمة

### مشكلة: خطأ في Prisma Client

**الحل**: قم بتشغيل:
```bash
npm run db:generate
```

### مشكلة: خطأ في NextAuth

**الحل**: تأكد من:
1. NEXTAUTH_SECRET معرف في ملف .env
2. NEXTAUTH_URL صحيح

## 📚 موارد مفيدة

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://authjs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [next-intl Documentation](https://next-intl-docs.vercel.app/)

## 🤞 الدعم

إذا واجهت أي مشاكل، راجع:
1. ملف README.md
2. ملف Noble Drip - Enterprise Coffee SaaS Platform - Complete Implementation Plan.md
3. سجلات الأخطاء في terminal

---

**ملاحظة**: هذا المشروع في مرحلة التطوير النشط. الميزات الجديدة تُضاف باستمرار.