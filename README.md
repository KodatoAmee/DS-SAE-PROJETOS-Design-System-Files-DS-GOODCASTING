# DS-GoodCasting

Design system da **Good Casting** em React 19 + Tailwind v4, documentado no Storybook 10. Estrutura clonada do [DS-Zara](https://kodatoamee.github.io/DS-SAE-PROJETOS-Design-System-Files-DS-ZARA/) (mesmos componentes, contrato e governança); identidade do brandbook Good Casting: preto, branco e Azul Tiffany `#81D8D0`, logotipo oficial; tipo do DS: Bodoni Moda + Public Sans. Tons de apoio e feedback vêm do GC-DS2 e do app (`goodcasting-app`).

## Rodar

```powershell
npm install
npm run dev              # Storybook em http://localhost:6017
npm run build            # biblioteca em dist/lib (JS + CSS + .d.ts)
npm run build-storybook  # Storybook estático em storybook-static
npm run typecheck
```

## Estrutura

```
tokens/tokens.json         fonte canônica (W3C DTCG)
src/styles/theme.css       tema: primitivas -> semânticas [data-theme] -> @theme
src/lib/cn.ts              cn() e focusRing
src/lib/overlay.ts         pilha de sobreposições, trava de scroll, foco preso (Modal, Drawer, MenuDrawer)
src/components/icon        Icon (traço 1px, 20x20)
src/components/brand       Logo (arquivos oficiais em src/assets/brand)
src/components/actions     Button, IconButton, Link, ViewSelector, ButtonGroup
src/components/form        TextField, TextArea, Select, SearchField, Checkbox, Radio, Switch, ChipSelector, NumberStepper
src/components/nav         Header, MenuDrawer, Tabs, Breadcrumbs, Pagination, Footer, SkipLink
src/components/content     MediaPlaceholder, FeeLabel, StatusBadge, Tag, CastingCard, TalentCard, CardGrid, Carousel, Modal, Drawer, Accordion, Toast, Skeleton, Divider, Banner
src/stories                Introdução, Fundações, Padrões (telas compostas)
CONTRATO.md                regras para quem escreve componente
GOVERNANCA.md              contribuição, versionamento, métricas
```

## Fundações

| | Valor |
|---|---|
| Marca | Azul Tiffany `#81D8D0` · preto `#121212` / `#000` · branco; circuito `#00FEFE` (decorativo); noite `#0D2B3A` (fundo negativo) |
| Texto de marca | `#057571` (links, AA 5,6:1) |
| Feedback | erro `#DC3535` / `#C62828` texto · sucesso `#2CA54E` / `#1E7E3E` · atenção `#BCAA09` / `#8A6D00` · info `#3A75E9` |
| Tipo | Bodoni Moda (títulos) + Public Sans (resto); 10 · 12 · 13 · 14 · 15 · 16 · 18 · 20 · 28 px |
| Raio | 4 · 6 · 10 · 12 (controles) · 16 · 24 · pílula |
| Espaço | base 4px |
| Controles | botão 40 / 48 / 56, campo 40, toque 44 |
| Movimento | 200ms e 300–500ms ease-in-out |
| Breakpoints | 768 · 1024 · 1280 · 1920 |

## Consumir

```tsx
import "ds-goodcasting/styles.css";
import { Button } from "ds-goodcasting";
```

Com Tailwind v4 no app, importe `ds-goodcasting/theme.css` e declare `@source "../node_modules/ds-goodcasting/dist/lib";` para as classes dos componentes serem geradas.

## Fontes

Public Sans e Bodoni Moda (Google Fonts, OFL). O Storybook carrega as duas em `.storybook/preview-head.html`; no app, carregue-as você (no Expo: `@expo-google-fonts/public-sans` e `@expo-google-fonts/bodoni-moda`).
