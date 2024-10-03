# Документация по локализации

## Важно

**Поймите какой у вас компонент**, обычно либо `серверный` либо `клиентский`.

## Серверный компонент

* Снизу код по которой можно легко понять отличие:

``` tsx
// "use client"

// import { useScopedI18n } from '@/app/locales/client'
import { getScopedI18n } from '@/app/locales/server'

export default async function Home() {
  // const t = useScopedI18n('home');
  const t = await getScopedI18n('home')

  return (
    <main className="bla bla">
      <p className="bla bla bla">
        {t('title')}
      </p>
    </main>
  );
}
```

* Важно понимать что для серверной локализации важно имееть асинхронный компонент через `async` и `await`.

---

## Клиентский компонент

* Снизу код по которой можно легко понять отличие:

``` tsx
"use client"

import { useScopedI18n } from '@/app/locales/client'
// import { getScopedI18n } from '@/app/locales/server'

export default function Home() {
  const t = useScopedI18n('home');
  // const t = await getScopedI18n('home')

  return (
    <main className="bla bla">
      <p className="bla bla bla">
        {t('title')}
      </p>
    </main>
  );
}
```

* Важно понимать что для клиентсксой локализации важно прописывать `use client` сверху файла, так как метод `useScopedI18n` является хуком.
