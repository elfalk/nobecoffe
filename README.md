# Noble Drip - Enterprise Coffee SaaS Platform

منصة SaaS شاملة للقهوة في مصر - مشروع Noble Drip

## 📋 نظرة عامة

Noble Drip هي منصة متعددة البائعين للقهوة توفر:
- سوق قهوة متعدد البائعين
- بيانات بورصة القهوة في الوقت الفعلي
- نظام محفظة مع عمولات تلقائية
- لوحة تحكم للمسؤولين
- دعم كامل للعربية (RTL)
- إشعارات WhatsApp آلية
- نظام تسويق بالعمولة
- نظام كوبونات
- مدونة ودورات تدريبية

## 🚀 البدء السريع

### المتطلبات الأساسية

- Node.js 18+ 
- PostgreSQL 14+
- npm أو pnpm

### التثبيت

1. استنساخ المشروع:
```bash
git clone <repository-url>
cd noble-drip
```

2. تثبيت التبعيات:
```bash
npm install
```

3. إعداد متغيرات البيئة:
```bash
cp .env.example .env
```

4. تحديث ملف `.env` ببيانات قاعدة البيانات الخاصة بك:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/noble_drip?schema=public"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
```

5. إنشاء قاعدة البيانات وتشغيل الـ migrations:
```bash
npm run db:push
```

6. تشغيل seed script للبيانات الأولية:
```bash
npm run db:seed
```

7. تشغيل خادم التطوير:
```bash
npm run dev
```

8. افتح المتصفح على:
```
http://localhost:3000
```

## 👤 حساب المسؤول

بعد تشغيل seed script، سيتم إنشاء حساب Super Admin:

- **البريد الإلكتروني**: yuoseef01102@gmail.com
- **كلمة المرور**: Admin@123

## 📁 هيكل المشروع

```
noble-drip/
├── prisma/
│   ├── schema.prisma          # قاعدة البيانات schema
│   └── seed.ts                # البيانات الأولية
├── src/
│   ├── app/
│   │   ├── [locale]/          # الصفحات مع دعم اللغات
│   │   │   ├── (public)/      # الصفحات العامة
│   │   │   ├── (auth)/        # صفحات المصادقة
│   │   │   └── (dashboard)/   # لوحات التحكم
│   │   └── api/               # API routes
│   ├── components/            # مكونات React
│   │   ├── ui/               # مكونات واجهة المستخدم
│   │   ├── layout/           # مكونات التخطيط
│   │   ├── dashboard/        # مكونات لوحة التحكم
│   │   ├── marketplace/      # مكونات السوق
│   │   └── forms/            # مكونات النماذج
│   ├── lib/                  # المكتبات المساعدة
│   │   ├── prisma.ts         # Prisma client
│   │   ├── auth.ts           # NextAuth config
│   │   └── utils.ts          # دوال مساعدة
│   ├── services/             # خدمات الأعمال
│   ├── types/                # تعريفات TypeScript
│   ├── middleware.ts         # Next.js middleware
│   └── i18n.ts              # إعداد الترجمة
├── messages/                 # ملفات الترجمة
│   ├── ar.json              # العربية
│   └── en.json              # الإنجليزية
└── public/                  # الملفات الثابتة
```

## 🛠️ الأوامر المتاحة

```bash
# التطوير
npm run dev              # تشغيل خادم التطوير
npm run build            # بناء للإنتاج
npm run start            # تشغيل خادم الإنتاج

# قاعدة البيانات
npm run db:generate      # توليد Prisma client
npm run db:push          # دفع schema إلى قاعدة البيانات
npm run db:migrate       # إنشاء migration
npm run db:seed          # تشغيل seed script
npm run db:studio        # فتح Prisma Studio

# الكود
npm run lint             # فحص الكود
```

## 🎨 التقنيات المستخدمة

### Frontend
- **Next.js 14** - React framework مع App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - Component library
- **Framer Motion** - Animations
- **next-intl** - Internationalization
- **next-themes** - Dark/Light mode
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Recharts** - Data visualization
- **React Query** - Server state
- **Zustand** - Client state

### Backend
- **Next.js API Routes** - RESTful API
- **Prisma ORM** - Database ORM
- **PostgreSQL** - Database
- **NextAuth.js v5** - Authentication
- **bcrypt** - Password hashing

### Third-party Services
- **WATI** - WhatsApp API
- **Cloudinary** - Image CDN
- **Resend** - Email service
- **Pusher** - Real-time notifications

## 🌐 الميزات الرئيسية

### 1. نظام الأدوار (RBAC)
- **Super Admin**: تحكم كامل في المنصة
- **Admin**: إدارة المستخدمين والمنتجات
- **Supplier**: إدارة المنتجات والطلبات
- **Customer**: التسوق وإدارة الطلبات
- **Affiliate**: التسويق بالعمولة

### 2. نظام السوق
- تصفح المنتجات حسب الفئة
- فلترة وترتيب المنتجات
- سلة تسوق متكاملة
- نظام كوبونات
- تقييمات المنتجات

### 3. نظام الطلبات
- إنشاء الطلبات
- تتبع حالة الطلب
- إشعارات WhatsApp آلية
- فواتير PDF

### 4. نظام الموردين
- تسجيل الموردين
- إدارة المنتجات
- نظام المحفظة
- خصم العمولات تلقائياً
- تعطيل المنتجات عند انخفاض الرصيد

### 5. بورصة القهوة
- أسعار القهوة في الوقت الفعلي
- رسوم بيانية تاريخية
- Noble Coffee Index

### 6. لوحة تحكم المسؤول
- إحصائيات شاملة
- إدارة المنتجات
- إدارة الطلبات
- إدارة الموردين
- إدارة المحافظ
- إعدادات الموقع

## 🔐 الأمان

- كلمات مرور مشفرة باستخدام bcrypt
- JWT tokens للمصادقة
- Role-based access control
- حماية من SQL injection (Prisma)
- حماية من XSS
- Rate limiting على API

## 📱 الدعم اللغوي

- العربية (RTL) - اللغة الافتراضية
- الإنجليزية

## 🚀 النشر

### النشر على Hostinger VPS

1. إعداد VPS مع Node.js و PostgreSQL
2. رفع الكود إلى VPS
3. تثبيت التبعيات
4. تشغيل migrations
5. إعداد Nginx كـ reverse proxy
6. إعداد SSL certificate
7. تشغيل التطبيق باستخدام PM2

راجع `DEPLOYMENT_HOSTINGER.md` للتفاصيل الكاملة.

## 📄 الترخيص

© 2024 Noble Drip - Albadry Institutions

## 🤝 المساهمة

المساهمات مرحب بها! يرجى فتح issue أو pull request.

## 📞 الدعم

للدعم والاستفسارات، تواصل معنا على:
- البريد الإلكتروني: info@nobledrip.com
- الهاتف: +20 123 456 7890

---

**صُنع بـ ❤️ بواسطة Noble Drip Team**