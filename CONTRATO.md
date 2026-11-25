# Contrato de componentes — DS-GoodCasting

Lido por todo agente antes de escrever componente. Fonte da verdade dos valores: `tokens/tokens.json` e `src/styles/theme.css`.

## Linguagem visual (brandbook Good Casting + app)

- Preto, branco e **Azul Tiffany `#81D8D0`** (`brand`). Tiffany nunca leva texto branco: texto sobre ele é `text-on-brand` (preto). Link e texto de marca: `text-brand-text` (`#057571`, AA).
- Ciano do circuito (`circuit`, `#00fefe`) só decorativo (traços, pontos). Azul noite (`night`) só como fundo da versão negativa.
- Botão primário = preto sólido (`bg-inverse`). Destaque de marca = `variant="brand"` (Tiffany + texto preto). Secundário = contorno 1px `border-line`.
- Raios: `rounded-xs`(4) checkbox · `rounded-sm`(6) · `rounded-md`(10) cartões e mídia · `rounded-control`(12) botões e controles · `rounded-lg`(16) modais e folhas · `rounded-xl`(24) · `rounded-full` pílulas, radio, switch.
- Sombra só `shadow-card` (cartão elevado) e `shadow-overlay` (sobreposição). Nunca sombra no logótipo.
- Tipo: **Inter** (`font-sans`) em tudo; **Playfair Display** (`font-display`) só em títulos editoriais (`text-heading`, `text-display`). Pesos: 400 texto, 500 ações e selecionado, 600 títulos Inter. Caixa normal (sem maiúsculas forçadas).
- Campo = só linha inferior 1px `border-line-field`, rótulo 13px `text-content-low`, altura 40.
- Movimento: `duration-200` hover/opacidade, `duration-300`–`duration-500` painéis, `ease-gc` (ease-in-out).
- Logótipo: só via componente `Logo` (ficheiros oficiais). Mínimo 120px no digital. Não distorcer, recolorir, rodar ou aplicar efeitos.

## Classes Tailwind disponíveis (só estas — o resto da paleta foi zerado)

- Cor: `base surface muted sheet canvas content content-mid content-low content-disabled line line-subtle line-field inverse on-inverse inverse-hover brand on-brand brand-soft brand-text circuit night info info-text success success-text warning warning-text danger danger-text overlay black white transparent current`.
- Texto: `text-caption`(10/14) `text-label-s`(12/16) `text-label`(13/18) `text-action`(15/20) `text-body`(14/20) `text-title-s`(16/24) `text-title`(18/24) `text-heading`(20/28) `text-display`(28/34). **Não usar `text-sm`, `text-xs`, `text-lg` etc. — não existem.**
- Fonte: `font-sans` (Inter), `font-display` (Playfair Display).
- Espaço: escala numérica padrão do Tailwind (base 4px).
- Z: `z-overlay` (1200), `z-toast` (1300), `z-10`.
- Animações: `animate-gc-fade-in`, `animate-gc-slide-up`, `animate-gc-pulse`. Fundo decorativo: `bg-brand-gradient`.
- Breakpoints: `md:` 768, `lg:` 1024, `xl:` 1280, `2xl:` 1920.
- **Nunca** hex, `rgb()` ou valor arbitrário de cor (`bg-[#...]`). Valores arbitrários de tamanho só se o token não existir (ex.: `aspect-[3/4]`).
- **Nunca** classes dinâmicas em template (`text-${x}`): use mapa de literais ou `cva`.

## Padrões de código

- React 19 + TypeScript estrito. Componentes função, `forwardRef` não é necessário (React 19 aceita `ref` como prop): declare `ref?: React.Ref<HTMLButtonElement>` quando fizer sentido.
- Variantes com `cva` de `class-variance-authority`. Junte classes com `cn` de `src/lib/cn.ts`. Foco: `focusRing` de `src/lib/cn.ts` (anel de 2px `brand-text`).
- Ícones: `Icon` de `src/components/icon` (`name`: menu, close, search, bag, user, help, bookmark, filter, plus, minus, check, chevron-down/up/left/right, arrow-right, info, pin, calendar, clock, users, heart, mask, star). Não crie outro sistema de ícones; se precisar de um ícone novo, desenhe SVG inline 20x20 traço 1px no próprio componente.
- Sem dependências novas. Sem Radix, sem Headless UI. Implementar foco, teclado e ARIA à mão.
- Props estendem os atributos HTML nativos do elemento raiz (`ComponentPropsWithoutRef<"button">` etc.) e repassam `...rest` e `className`.
- Textos padrão em **português** (rótulos ARIA incluídos): "Fechar", "Abrir menu", "Pesquisar", "Anterior", "Próximo".
- Componente controlado **e** não controlado quando houver estado (`value`/`defaultValue`/`onValueChange`, `open`/`defaultOpen`/`onOpenChange`).
- Acessibilidade WCAG 2.2 AA: contraste já garantido pelos tokens; alvo mínimo 24x24 (AA 2.5.8), preferir 44 em toque; roles e `aria-*` corretos; `Escape` fecha sobreposições; foco preso em Modal/Drawer e devolvido ao gatilho; `prefers-reduced-motion` já tratado no tema.
- Overlays (Modal, Drawer, MenuDrawer): `createPortal` para `document.body`, backdrop `bg-overlay` **irmão** do painel, `aria-modal="true"`, `role="dialog"`, rótulo via `aria-labelledby`. **Sempre** usar `src/lib/overlay.ts` (`useOverlay`, ou `pushOverlay`/`isTopOverlay`/`lockScroll`): nunca pilha ou trava de scroll própria.
- Estado desabilitado em controles de navegação (Anterior/Próximo, pontas de carrossel, limites de stepper): `aria-disabled` + ignorar clique, não `disabled` nativo, para o foco não cair no body.
- Contêiner com `overflow-*` em volta de itens focáveis: dar `p-1 -m-1` para o anel de foco (offset 2px) não ser recortado.

## Estrutura de arquivos por componente

```
src/components/<frente>/<Nome>/<Nome>.tsx
src/components/<frente>/<Nome>/<Nome>.stories.tsx
src/components/<frente>/<Nome>/index.ts        // export { Nome, type NomeProps } from "./Nome";
src/components/<frente>/index.ts                // barril da frente: export * from "./Nome";
```

## Stories (Storybook 10, CSF3)

- `import type { Meta, StoryObj } from "@storybook/react-vite";`
- `title: "<Frente>/<Nome>"` com Frente ∈ `Marca`, `Ações`, `Formulário`, `Navegação`, `Conteúdo`.
- `tags: ["autodocs"]`. `parameters.docs.description.component` com, em português: **O que é**, **Quando usar**, **Quando não usar**, **Anatomia**, **Acessibilidade**. Markdown simples.
- Uma story por variante + uma de estados (hover/foco não dá para forçar; mostre desabilitado, erro, carregando, selecionado) + `Playground` com `args`.
- Stories que só usam `render` sem args: tipar `type Story = StoryObj;` e meta `satisfies Meta`, senão o TS exige props obrigatórias.
- Imagens: sem fotos de pessoas reais sem autorização. Use `MediaPlaceholder` ou `<div className="aspect-[3/4] rounded-md bg-muted" />`. Marca: só `Logo`.

## Referência pronta

`src/components/actions/Button/Button.tsx` é o exemplo canônico: siga a forma dele.
