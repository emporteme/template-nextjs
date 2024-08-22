# Next.js + Feature-Sliced Design | Чистый Шаблон

## ВАЖНО

Не удаляйте папку `pages\*`, даже если вы используете App Router. Удаление папки `pages` приведет к [ошибке сборки](https://t.me/feature_sliced/1/107414).

В WebStorm вы можете отметить каталог как [исключенный](https://www.jetbrains.com/help/webstorm/configuring-project-structure.html#content-root). После этого вы не будете видеть его в общих файлах (например, `node_modules` или `.next`).

## ДОПОЛНИТЕЛЬНОЕ РЕШЕНИЕ ПРОБЛЕМЫ (НЕ РЕКОМЕНДУЕТСЯ)

Если вам не нравится пустая папка "pages" в корне проекта, вы можете переименовать слой `pages` (`./src/pages`), например, в `pagesLayer`, а затем удалить папку `pages` из корня проекта (также вам нужно будет изменить алиасы путей в `tsconfig` и аналогичных файлах).

**Используйте то, что вам нравится больше :)**

---

## Folders description

| Folder       | Description                                                                                                     |
| ------------ | --------------------------------------------------------------------------------------------------------------- |
| app          | Папка `App` для [App Routing](https://nextjs.org/docs/app/building-your-application/routing#the-app-router) |
| pages \*     | Папка `Pages` для [Pages Routing](https://nextjs.org/docs/pages)                                            |
| public       | Публичные файлы                                                                                           | src/app      | App слой FSD                                                                                                   |
| src/pages    | Pages слой FSD                                                                                                 |
| src/widgets  | Widgets слой FSD                                                                                               |
| src/features | Features слой FSD                                                                                              |
| src/entities | Entities слой FSD                                                                                              |
| src/shared   | Shared слой FSD                                                                                               |


**Этот шаблон использует такие помощники для разработки**

- Eslint
- Prettier
- Stylelint
- Jest

Если вам это не нужно, вы можете отключить их в любое время, удалив зависимости из вашего package.json и .*rc файла.