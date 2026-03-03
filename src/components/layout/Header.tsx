'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ShoppingCart, Search, Menu, User, Globe, Coffee } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useSession } from 'next-auth/react';

export default function Header() {
  const t = useTranslations('common');
  const locale = useLocale();
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cartItemsCount = 0; // TODO: Get from cart store

  // Helper function to get locale-aware href
  const getHref = (path: string) => {
    // Remove existing locale prefix if present
    const cleanPath = path.replace(/^\/(ar|en)/, '');
    return `/${locale}${cleanPath || '/'}`;
  };

  const navigation = [
    { name: t('marketplace'), href: getHref('/marketplace') },
    { name: t('suppliers'), href: getHref('/suppliers') },
    { name: t('coffeeExchange'), href: getHref('/coffee-exchange') },
    { name: t('courses'), href: getHref('/courses') },
    { name: t('blog'), href: getHref('/blog') },
  ];

  const toggleLocale = () => {
    const newLocale = locale === 'ar' ? 'en' : 'ar';
    // Replace locale in current path
    const newPath = pathname.replace(/^\/(ar|en)/, `/${newLocale}`);
    window.location.href = newPath || `/${newLocale}`;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 space-x-reverse">
            <Coffee className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">Noble Drip</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 space-x-reverse">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2 space-x-reverse">
            {/* Search */}
            <div className="hidden lg:flex items-center">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder={t('search')}
                  className="w-64 pr-10"
                />
              </div>
            </div>

            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLocale}
              title={locale === 'ar' ? 'English' : 'العربية'}
            >
              <Globe className="h-5 w-5" />
            </Button>

            {/* Cart */}
            <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cartItemsCount > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                    >
                      {cartItemsCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full sm:max-w-md">
                <div className="flex flex-col h-full">
                  <h2 className="text-lg font-semibold mb-4">{t('cart')}</h2>
                  <div className="flex-1 flex items-center justify-center text-muted-foreground">
                    {t('cartEmpty')}
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {/* User Menu */}
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{session.user?.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {session.user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={getHref('/dashboard/customer')}>
                      {t('dashboard')}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={getHref('/dashboard/customer/orders')}>
                      {t('myOrders')}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={getHref('/dashboard/customer/profile')}>
                      {t('profile')}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/api/auth/signout">{t('logout')}</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex items-center space-x-2 space-x-reverse">
                <Button variant="ghost" asChild>
                  <Link href={getHref('/login')}>{t('login')}</Link>
                </Button>
                <Button asChild>
                  <Link href={getHref('/register')}>{t('register')}</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu Trigger */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <nav className="flex flex-col space-y-4 mt-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-lg font-medium transition-colors hover:text-primary"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <Separator />
                  {!session && (
                    <>
                      <Button variant="outline" asChild className="w-full">
                        <Link href={getHref('/login')}>{t('login')}</Link>
                      </Button>
                      <Button asChild className="w-full">
                            <Link href={getHref('/register')}>{t('register')}</Link>
                      </Button>
                    </>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}