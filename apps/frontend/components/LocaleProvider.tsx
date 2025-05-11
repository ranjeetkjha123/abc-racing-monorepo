import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import React from 'react';
import path from 'path';
import fs from 'fs';

export default async function LocaleProvider({
  children,
  locale
}: {
  children: React.ReactNode;
  locale: string;
}) {
  let messages;
  try {
    messages = JSON.parse(
      fs.readFileSync(
        path.resolve(process.cwd(), `./locales/${locale}/${locale}.json`),
        'utf8'
      )
    );
  } catch (error) {
    notFound();
  }
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
