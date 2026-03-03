'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Coffee, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const t = useTranslations('common');
  const locale = useLocale();

  // Helper function to get locale-aware href
  const getHref = (path: string) => {
    const cleanPath = path.replace(/^\/(ar|en)/, '');
    return `/${locale}${cleanPath || '/'}`;
  };

  const footerLinks = {
    company: [
      { name: t('aboutUs'), href: getHref('/about') },
      { name: t('ourStory'), href: getHref('/our-story') },
      { name: t('careers'), href: getHref('/careers') },
      { name: t('contactUs'), href: getHref('/contact') },
    ],
    marketplace: [
      { name: t('marketplace'), href: getHref('/marketplace') },
      { name: t('suppliers'), href: getHref('/suppliers') },
      { name: t('categories'), href: getHref('/categories') },
      { name: t('coffeeExchange'), href: getHref('/coffee-exchange') },
    ],
    support: [
      { name: t('helpCenter'), href: getHref('/help') },
      { name: t('faq'), href: getHref('/faq') },
      { name: t('shipping'), href: getHref('/shipping') },
      { name: t('returns'), href: getHref('/returns') },
    ],
    legal: [
      { name: t('termsOfService'), href: getHref('/terms') },
      { name: t('privacyPolicy'), href: getHref('/privacy') },
      { name: t('cookiePolicy'), href: getHref('/cookies') },
      { name: t('affiliateTerms'), href: getHref('/affiliate-terms') },
    ],
  };

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
  ];

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 space-x-reverse mb-4">
              <Coffee className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">Noble Drip</span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm">
              {t('footerDescription')}
            </p>
            <div className="flex space-x-4 space-x-reverse">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-4">{t('company')}</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Marketplace Links */}
          <div>
            <h3 className="font-semibold mb-4">{t('marketplace')}</h3>
            <ul className="space-y-3">
              {footerLinks.marketplace.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Legal Links */}
          <div>
            <h3 className="font-semibold mb-4">{t('support')}</h3>
            <ul className="space-y-3 mb-6">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="font-semibold mb-4">{t('legal')}</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3 space-x-reverse">
              <Mail className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">{t('email')}</p>
                <p className="text-sm text-muted-foreground">info@nobledrip.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 space-x-reverse">
              <Phone className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">{t('phone')}</p>
                <p className="text-sm text-muted-foreground">+20 123 456 7890</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 space-x-reverse">
              <MapPin className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">{t('address')}</p>
                <p className="text-sm text-muted-foreground">Cairo, Egypt</p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Noble Drip. {t('allRightsReserved')}
          </p>
        </div>
      </div>
    </footer>
  );
}