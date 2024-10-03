"use client"
import { createI18nClient } from 'next-international/client'

export const { useI18n, useScopedI18n, I18nProviderClient, useChangeLocale, useCurrentLocale } = createI18nClient({
  ru: () => import('./ru'),
  en: () => import('./en'),
  kz: () => import('./kz'),
})