import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import bcrypt from 'bcrypt'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('🌱 Starting seed...')

  // 1. Create Super Admin
  const hashedPassword = await bcrypt.hash('01102041221@Yuu', 10)
  
  const superAdmin = await prisma.user.upsert({
    where: { email: 'yuoseef01102@gmail.com' },
    update: { password: hashedPassword },
    create: {
      email: 'yuoseef01102@gmail.com',
      password: hashedPassword,
      name: 'Super Admin',
      role: 'SUPER_ADMIN' as const,
      status: 'ACTIVE' as const,
      emailVerified: new Date(),
    },
  })
  console.log('✅ Super Admin created:', superAdmin.email)

  // 2. Create Categories
  const categories = [
    {
      name: 'Green Coffee',
      nameAr: 'قهوة خضراء',
      slug: 'green-coffee',
      description: 'Raw, unroasted coffee beans',
      descriptionAr: 'حبوب قهوة خام غير محمصة',
      order: 1,
      icon: '🌱',
    },
    {
      name: 'Roasted Coffee',
      nameAr: 'قهوة محمصة',
      slug: 'roasted-coffee',
      description: 'Freshly roasted coffee beans',
      descriptionAr: 'حبوب قهوة محمصة طازجة',
      order: 2,
      icon: '☕',
    },
    {
      name: 'Specialty Green',
      nameAr: 'قهوة خضراء مميزة',
      slug: 'specialty-green',
      description: 'Premium specialty green coffee',
      descriptionAr: 'قهوة خضراء فاخرة مميزة',
      order: 3,
      icon: '💎',
    },
    {
      name: 'Specialty Roasted',
      nameAr: 'قهوة محمصة مميزة',
      slug: 'specialty-roasted',
      description: 'Premium specialty roasted coffee',
      descriptionAr: 'قهوة محمصة فاخرة مميزة',
      order: 4,
      icon: '✨',
    },
    {
      name: 'Espresso',
      nameAr: 'إسبريسو',
      slug: 'espresso',
      description: 'Espresso coffee blends',
      descriptionAr: 'خلطات قهوة إسبريسو',
      order: 5,
      icon: '🎯',
    },
    {
      name: 'Coffee Machines',
      nameAr: 'آلات القهوة',
      slug: 'coffee-machines',
      description: 'Coffee brewing equipment',
      descriptionAr: 'معدات تحضير القهوة',
      order: 6,
      icon: '⚙️',
    },
    {
      name: 'Coffee Tools',
      nameAr: 'أدوات القهوة',
      slug: 'coffee-tools',
      description: 'Coffee preparation tools',
      descriptionAr: 'أدوات تحضير القهوة',
      order: 7,
      icon: '🔧',
    },
  ]

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    })
  }
  console.log('✅ Categories created')

  // 3. Create Site Settings
  const siteSettings = await prisma.siteSettings.upsert({
    where: { id: 'singleton' },
    update: {},
    create: {
      id: 'singleton',
      theme: {
        primaryColor: '#0A1128',
        accentColor: '#0EA5E9',
        mode: 'dark',
      },
      navigation: {
        home: true,
        aboutUs: true,
        ourStory: true,
        marketplace: true,
        suppliers: true,
        courses: true,
        coffeeExchange: true,
        blog: true,
        affiliate: true,
        joinSupplier: true,
      },
      commissions: {
        greenCoffee: 1,
        roastedCoffee: 3,
        other: 1,
      },
      features: {
        whatsapp: true,
        email: true,
        blog: true,
        affiliate: true,
        courses: true,
        coffeeExchange: true,
      },
      content: {
        heroTitle: 'Noble Drip - Enterprise Coffee Platform',
        heroTitleAr: 'نوبل دريب - منصة القهوة المؤسسية',
        heroSubtitle: 'Your trusted partner for premium coffee in Egypt',
        heroSubtitleAr: 'شريكك الموثوق للقهوة الفاخرة في مصر',
        aboutUsText: 'Noble Drip is a leading coffee marketplace in Egypt, connecting suppliers with customers.',
        aboutUsTextAr: 'نوبل دريب هي سوق قهوة رائد في مصر، تربط الموردين بالعملاء.',
        ourStoryText: 'Founded by Albadry Institutions, Noble Drip aims to revolutionize the coffee industry in Egypt.',
        ourStoryTextAr: 'تأسست نوبل دريب بواسطة مؤسسات البدري، وتهدف إلى ثورة صناعة القهوة في مصر.',
      },
      contact: {
        email: 'info@nobledrip.com',
        phone: '+20 123 456 7890',
        address: 'Cairo, Egypt',
      },
      social: {
        facebook: 'https://facebook.com/nobledrip',
        instagram: 'https://instagram.com/nobledrip',
        twitter: 'https://twitter.com/nobledrip',
        linkedin: 'https://linkedin.com/company/nobledrip',
      },
    },
  })
  console.log('✅ Site Settings created')

  // 4. Create Sample Coffee Exchange Prices
  const coffeePrices = [
    { coffeeType: 'GREEN_COFFEE', price: 150.00, change: 2.5 },
    { coffeeType: 'ROASTED_COFFEE', price: 180.00, change: 1.8 },
    { coffeeType: 'SPECIALTY_GREEN', price: 250.00, change: 3.2 },
    { coffeeType: 'SPECIALTY_ROASTED', price: 320.00, change: 2.9 },
  ]

  for (const price of coffeePrices) {
    await prisma.coffeeExchangePrice.create({
      data: price,
    })
  }
  console.log('✅ Coffee Exchange Prices created')

  // 5. Create Sample Coupon
  await prisma.coupon.upsert({
    where: { code: 'WELCOME10' },
    update: {},
    create: {
      code: 'WELCOME10',
      discountType: 'PERCENTAGE',
      discountValue: 10.00,
      minOrderAmount: 100.00,
      maxDiscount: 50.00,
      usageLimit: 1000,
      validFrom: new Date(),
      validTo: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      isActive: true,
    },
  })
  console.log('✅ Sample Coupon created')

  console.log('🎉 Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
