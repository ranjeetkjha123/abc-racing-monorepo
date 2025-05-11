'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function LanguageSwitcher() {
  const router = useRouter();
  const [currentLocale, setCurrentLocale] = useState('en');

  useEffect(() => {
    const locale = document.cookie
      .split('; ')
      .find(row => row.startsWith('locale='))
      ?.split('=')[1] || 'en';
    setCurrentLocale(locale);
  }, []);

  function setLocale(locale: string) {
    document.cookie = `locale=${locale}; path=/; max-age=31536000; SameSite=Lax`;
    document.documentElement.lang = locale;
    setCurrentLocale(locale);
    router.refresh();
  }

  return (
    <div className="flex gap-1">
      <Button
        variant={currentLocale === 'en' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setLocale('en')}
        className="px-2 min-w-[32px]"
      >
        EN
      </Button>
      <Button
        variant={currentLocale === 'fr' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setLocale('fr')}
        className="px-2 min-w-[32px]"
      >
        FR
      </Button>
    </div>
  );
}