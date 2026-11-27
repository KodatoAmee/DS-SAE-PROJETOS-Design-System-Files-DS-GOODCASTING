# Changelog

Formato [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/), versão [SemVer](https://semver.org/lang/pt-BR/).

## [Não lançado]

### Corrigido
- `IconButton`: com `badge` acima de 99, o nome acessível agora usa o mesmo texto exibido ("Salvos, 99+"), não o número bruto (WCAG 2.5.3).

### Alterado
- Textos de componentes, stories, docs e tokens revisados para PT-BR (logotipo, grade, arquivos, tela, Entrar; cidades brasileiras nos exemplos). A story Fundações › Grelha virou Fundações › Grade.
- Exemplos de loja restantes (menus Mulher/Homem/Crianças, envio, devoluções, artigo) trocados por casting.
- Ícones `menu`, `search`, `bag`, `user`, `help`, `bookmark`, `filter`, `info`, `pin`, `calendar`, `clock`, `users`, `heart` e `star` agora vêm do Circum Icons (`react-icons/ci`); `react-icons` entra como dependência e fica externo no build.
- `Header`: mesmo layout em todos os breakpoints (menu, logo ao lado, ícones à direita, 48px); hambúrguer de 3 linhas. `MenuDrawer` acompanha a posição do X.
- `Tabs` verticais (e `MenuDrawer`): a aba ativa ganha uma linha que corre até a linha vertical à esquerda do painel.
- Textos clicáveis deixam de sublinhar no hover (Button de texto, Link padrão, cards, TextField, Breadcrumbs, Footer, Header, MenuDrawer, Pagination, Tabs).
- `CastingCard`: no hover a capa amplia 1,15× (200ms, ease-in). `MediaPlaceholder`: cantos inferiores retos.
- `Accordion`: título do item aberto em negrito (600).
- `Tag`: padding igual ao do `StatusBadge` (`px-2.5 py-0.5`) nas variantes `outline` e `solid`.
- `Breadcrumbs`: o item atual nunca é clicável (`href`/`onClick` ignorados, sem ponteiro).
- `Logo`: mínimo de 120px para 84px (abaixo do brandbook) para o logo do Header.
- Stories: foto de modelo no `CastingCard`, imagem conceitual no Detalhe do casting e fundo branco na Timeline.
- Novo token `tiffany-link` (#057571; #81D8D0 no escuro). `Link` usa essa cor e fica Azul Tiffany (`brand`) no hover.
- Hover dos itens com contorno (`Button` e `IconButton` `outline`, chips do `ChipSelector`): borda Azul Tiffany.
- Cursor de mãozinha em todos os clicáveis (regra global em `theme.css`).
- `Radio`: círculo e ponto com `border-radius: 100%`; legenda e descrições ficam na cor de desabilitado; story Desabilitado.
- `Switch`: bolinha com `border-radius: 100%`.
- `Select`: valor, rótulo e seta com 4px de recuo interno.
- Ícones: todos do React Icons. Os que ainda eram desenhados à mão (`close`, `plus`, `minus`, `check`, `chevron-*`, `arrow-right`, `mask`) e `users` passam a Phosphor Light (`react-icons/pi`); o resto segue no Circum Icons.
- `Icon`: catálogo completo do Circum Icons (288) disponível com prefixo `ci-` (ex.: `ci-bag-1`), exportado como `circumIconNames` e exibido em Fundações › Iconografia. Gerado em `src/components/icon/circum.ts`.
- Coração de salvar (CastingCard, TalentCard): salvo fica com miolo Azul Tiffany (`brand`) e contorno Tiffany Link, na mesma forma do ícone não salvo (antes vermelho).
- `Logo`: novo tom `preto` (versão monocromática oficial, `good-casting-logo-preto.svg`). Usado no Header (84px) e em Fundações › Marca › Versão monocromática.
- Novo componente `Monogram` (monograma GD Casting®, tons `preto` e `branco`, arquivos oficiais). Usado na tela Entrar e em Fundações › Marca (monograma e monograma em branco).
- `Select`: linha inferior fica Azul Tiffany no hover (fora de erro e desabilitado).
- Fundações › Marca reescrita a partir do brandbook (p. 10–21): logotipo, monograma, conceito, construção e área de proteção (X), dimensão mínima (impressão e digital), versões, versões em branco, usos incorretos e uso correto. Monograma e versões monocromática/horizontal/vertical/com símbolo aguardam os arquivos oficiais.
- Tipografia do DS: **Bodoni Moda** (`font-display`, títulos) + **Public Sans** (`font-sans`, resto), no lugar de Playfair Display + Inter. Fundações ganha as comparações Tipografia - 1 a - 5.
- `ButtonGroup` `attached`: vão de 4px entre os botões (antes bordas sobrepostas); story Quantidade sem borda no número.

## [0.1.0] — 2026-11-25

### Adicionado
- Clone estrutural do DS-Zara 0.1.0 (componentes de Ações, Formulário, Navegação e Conteúdo; Storybook 10 em pt-BR; `CONTRATO.md`, `GOVERNANCA.md`; workflow de GitHub Pages).
- Identidade Good Casting: tokens do brandbook (Azul Tiffany `#81D8D0`, preto, branco, circuito `#00FEFE`, noite `#0D2B3A`), Playfair Display + Inter, escala de raios 4–24 + pílula, sombras `card` e `overlay`.
- Cores de apoio e feedback do GC-DS2 / app (`brand-text` `#057571`, sucesso, atenção, informação).
- Componente `Logo` (versões principal e branca, arquivos oficiais) e story Fundações › Marca.
- `Button` ganha `variant="brand"` e tamanhos 40 / 48 / 56.
- Prefixo `zr` trocado por `gc` em variáveis, easing e animações.

### Decisões
- Tiffany `#81D8D0` tem 1,6:1 com branco: nunca texto branco sobre ele. Texto preto sobre Tiffany: 13:1.
- Botão primário preto (como o logotipo); Tiffany reservado ao destaque de marca.
- Foco: anel de 2px `brand-text`.

### Casting (troca dos componentes de varejo)
- `CastingCard` (fonte: `TalentCastingCard` do app): capa 16:9, categoria, estado da candidatura, local · personagens · vagas, prazo (urgente em vermelho), cachê, "Seu personagem" e salvar.
- `TalentCard`: foto 3:4, compatibilidade em Tiffany, verificado, perfis (até 3 + "+N"), favoritar.
- `CardGrid` (substitui ProductGrid): `kind="castings" | "talents"`, densidades 1/2/3.
- `FeeLabel` (substitui PriceLabel): cachê, "até", "A definir" / "A combinar".
- `StatusBadge`: estados de candidatura (enviada, em análise, selecionado, não selecionado, convite, expirado) e tons.
- `ChipSelector` (substitui SizeSelector): escolha única (`radiogroup`) ou várias (`aria-pressed`, `max`).
- `NumberStepper` (substitui QuantityStepper): `unit` ("cm", "anos"), rótulos neutros.
- `CastingCardSkeleton` e `TalentCardSkeleton` (substituem ProductCardSkeleton).
- Ícones: pin, calendar, clock, users, heart, mask, star.
- Padrões: Timeline de castings, Detalhe do casting, Candidatos de um personagem, Completar perfil, Entrar.
- Textos de exemplo de loja (cesto, produto) trocados por casting em todas as stories.
