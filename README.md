# DS-GoodCasting

Design system da **Good Casting** em React 19 + Tailwind v4, documentado no Storybook 10. Estrutura clonada do [DS-Zara](https://kodatoamee.github.io/DS-SAE-PROJETOS-Design-System-Files-DS-ZARA/) (mesmos componentes, contrato e governança); identidade do brandbook Good Casting: preto, branco e Azul Tiffany `#81D8D0`, logotipo do brandbook; tipo do DS: Bodoni Moda + Public Sans. Tons de apoio e feedback vêm do GC-DS2 e do app (`goodcasting-app`).

## Rodar

```powershell
npm install              # também gera dist/lib (script prepare)
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
src/components/brand       Logo, Monogram (arquivos de referência em src/assets/brand; substituir pelos vetores oficiais)
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
| Marca | Azul Tiffany `#81D8D0` · preto `#000000` · branco; circuito `#00FEFE` (decorativo); azul-noite `#022330` (branco sobre ele 16,3:1) e azul-petróleo `#043C50` (branco sobre ele 11,9:1): fundo alternativo das versões em branco do logotipo; medidos no brandbook, não declarados |
| Texto de marca | `#057571` (links, AA 5,5:1 sobre branco) |
| Contraste no Tiffany | texto só preto: `#000` sobre `#81D8D0` 12,7:1; branco sobre Tiffany 1,7:1 (proibido) |
| Feedback | erro `#DC3535` / `#C62828` texto · sucesso `#2CA54E` / `#1E7E3E` · atenção `#BCAA09` / `#8A6D00` · info `#3A75E9` |
| Logotipo | mínimo 120 px (brandbook p. 15), recomendado 200 px. Abaixo disso (Header, avatar, favicon), use o `Monogram`. Mínimo do monograma: pendente da marca. |
| Tipo | Bodoni Moda (títulos) + Public Sans (resto); 10 · 12 · 13 · 14 · 15 · 16 · 18 · 20 · 28 px |
| Raio | 4 · 6 · 10 · 12 (controles) · 16 · 24 · pílula |
| Espaço | base 4px |
| Controles | botão 40 / 48 / 56, campo 40, toque 44 |
| Movimento | 200ms e 300–500ms ease-in-out |
| Breakpoints | 768 · 1024 · 1280 · 1920 |

## Consumir

Requisitos: React 19 (`react` e `react-dom` `^19.0.0`) e, só se usar `theme.css`, Tailwind v4.

O pacote é privado (não está no npm) e se instala direto do GitHub:

```powershell
npm install github:KodatoAmee/DS-SAE-PROJETOS-Design-System-Files-DS-GOODCASTING#<tag-ou-branch>
```

Ainda não há tags: use `#main` e troque pela tag da versão quando ela existir, para a instalação não mudar sem aviso. O npm baixa as dependências de desenvolvimento do DS e roda o `prepare` (`npm run build`), que gera `dist/lib`; por isso a instalação demora mais que a de um pacote comum.

Sem Tailwind no app, importe o CSS compilado uma vez, na entrada do app:

```tsx
import "ds-goodcasting/styles.css";
import { Button } from "ds-goodcasting";
```

Com Tailwind v4 no app, use o `theme.css` no lugar do `styles.css`. Ele já importa o `tailwindcss`; o `@source` (relativo ao arquivo CSS) faz o Tailwind gerar as classes dos componentes:

```css
@import "ds-goodcasting/theme.css";
@source "../node_modules/ds-goodcasting/dist/lib";
```

O tema vai no `<html>`: `<html data-theme="light">` ou `<html data-theme="dark">`. Sem o atributo vale o claro. Um `data-theme` em outro elemento cria uma ilha de tema.

## Fontes

Public Sans e Bodoni Moda (Google Fonts, OFL). O Storybook carrega as duas em `.storybook/preview-head.html`; no app, carregue-as você (no Expo: `@expo-google-fonts/public-sans` e `@expo-google-fonts/bodoni-moda`).
