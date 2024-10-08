# Next.js + Feature-Sliced Design | Чистый Шаблон

## Важно

**Не удаляйте папку `pages\*`**, даже если вы используете App Router. Удаление папки `pages` приведет к [ошибке сборки](https://t.me/feature_sliced/1/107414).

В WebStorm вы можете отметить каталог как [исключенный](https://www.jetbrains.com/help/webstorm/configuring-project-structure.html#content-root). После этого вы не будете видеть его в общих файлах (например, `node_modules` или `.next`).

## Дополнительное решение проблемы (не рекомендуется)

Если вам не нравится пустая папка "pages" в корне проекта, вы можете переименовать слой `pages` (`./src/pages`), например, в `pagesLayer`, а затем удалить папку `pages` из корня проекта (также вам нужно будет изменить алиасы путей в `tsconfig` и аналогичных файлах).

**Используйте то, что вам нравится больше :)**

---

## Описание структуры папок

| Папка        | Описание                                                                                                         |
| ------------ | --------------------------------------------------------------------------------------------------------------- |
| `app`        | Папка для [App Routing](https://nextjs.org/docs/app/building-your-application/routing#the-app-router)           |
| `pages\*`    | Папка для [Pages Routing](https://nextjs.org/docs/pages)                                                        |
| `public`     | Публичные файлы                                                                                                 |
| `src/app`    | Слой `App` в FSD                                                                                                |
| `src/pages`  | Слой `Pages` в FSD                                                                                              |
| `src/widgets`| Слой `Widgets` в FSD                                                                                            |
| `src/features`| Слой `Features` в FSD                                                                                          |
| `src/entities`| Слой `Entities` в FSD                                                                                          |
| `src/shared` | Слой `Shared` в FSD                                                                                             |

---

**Этот шаблон использует следующие инструменты для разработки:**

- Eslint
- Prettier
- Stylelint
- Jest

Если вам это не нужно, вы можете отключить их в любое время, удалив зависимости из вашего `package.json` и соответствующие конфигурационные файлы (например, `.*rc` файлы).

---

## Документация про FSD

Слои

Каталоги верхнего уровня в FSD называются «слоями», и это первый уровень дробления приложения. У нас есть строго определённое число возможных слоёв, некоторые из них опциональные. Слои стандартизируются, и в настоящее время выделяется семь таких слоёв:

- **Разделяемый уровень**. Содержит различные ресурсы для повторного использования, не зависящие от функционирования бизнес-логики. Отличные примеры таких элементов – инструменты для работы с UI, вспомогательные функции, логгеры.
- **Уровень объектов**. Он содержит бизнес-объекты, специфичные для проекта. Например, User, Payments, Products и т.д.
- **Уровень фич**. Содержит пользовательские истории. Код, ценный с точки зрения бизнеса. Например, ChangePassword, MakePayment, BuyProduct.
- **Уровень виджетов**. Содержит компоненты, из которых составляются объекты и фичи. Например, UserSettings, PaymentsList, ProductsList.
- **Уровень страниц**. Содержит страницы приложения. Это композиционный уровень, собираемый из объектов, фич и виджетов.
- **Уровень процессов**. Содержит сложные внутристраничные сценарии, например, механизмы аутентификации и капчу.
- **Уровень приложения**. Содержит настройки приложения, стили и провайдеры. Например, withAuth.

---

## Структура приложения

```plaintext
├── app/
|   # Слой композиции приложения
|   # Содержит только абстрактную логику инициализации и статические ресурсы – следовательно, не содержит никаких срезов
|
├── processes/
|   # Срезы, реализующие потоки задач, не зависящие от страниц, такие, в выполнение которых вовлечено множество страниц 
|   ├── auth
|   ├── payment
|   ├── quick-tour
|
|
├── pages/
|   # Срезы, реализующие полные представления для этого приложения
|   ├── feed
|   |
|   ├── profile
|   |   # Из-за специфики маршрутизации в этом слое могут содержаться вложенные структуры 
|   |   ├── edit
|   |   └── stats
|   |
|   ├── sign-up
|
|
├── widgets/
|   # Срезы, реализующие различные комбинации абстрактных и/или бизнес-блоков с нижележащих слоёв,
|   # для предоставления изолированных атомарных фрагментов пользовательского интерфейса
|   ├── chat-window
|   ├── header
|   ├── feed
|
|
├── features/
|   # Срезы, реализующие пользовательские сценарии; обычно здесь приходится оперировать бизнес-объектами 
|   ├── auth-by-phone
|   ├── create-post
|   ├── write-message
|
|
├── entities/
|   # Срезы, реализующие бизнес-блоки в терминах того, какая бизнес-логика приложения сработает 
|   ├── account
|   ├── conversation
|   ├── post
|   ├── wallet
|
|
├── shared/
|   # Этот слой – набор абстрактных сегментов
|   # Это означает, что на нём недопустимы какие-либо бизнес-блоки или логика, имеющая отношение к бизнесу 
```

---

## Примеры картинок

### Структура FSD на верхнем уровне

![FSD Overview](https://habrastorage.org/webt/ve/ey/w8/veeyw8lxdr-8dyiyf7d2a4ixzok.jpeg)

### Структура слоев FSD

![FSD Layers](https://habrastorage.org/webt/ek/0o/wi/ek0owiw6zqfn6j6zpogb7neyqmo.png)


### Презентация
1. [Презентация](https://docs.google.com/presentation/d/1dY98-F_sVpmx69KuXYs-unDy9q-CRwiQjKFZI8_VgPM/edit?usp=sharing)
