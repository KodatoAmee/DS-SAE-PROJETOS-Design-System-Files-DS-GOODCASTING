# Changelog

Formato [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/), versão [SemVer](https://semver.org/lang/pt-BR/).

## [Não lançado]

Inclui quebras de compatibilidade (marcadas abaixo). Pela GOVERNANCA (Versionamento), elas exigem versão major; a versão é decidida no commit.

### Alterado
- **Quebra de compatibilidade:** `peerDependencies` `react` e `react-dom` de `>=18` para `^19.0.0` (NC-008). No React 18 o `ref` não chega às props e os componentes com `ref` deixavam de repassá-lo sem erro; `>=18` aceitava também um React 20 nunca testado. Com React 18 no app, o npm agora acusa o conflito de peer na instalação.
- `CastingCard`: raio de `rounded-lg` (16px) para `rounded-md` (10px), o raio de cartão do `CONTRATO.md` (NC-042, junto do NC-005).
- `MenuDrawer` sem nenhuma linha: sem o divisor vertical entre seções e links, sem o traço sob a seção ativa e sem a borda do rodapé. Seções e links destacam com fundo Azul Tiffany 20% (`bg-brand/20`) e raio de 4px (`rounded-xs`) no hover e no selecionado; a seção ativa e o link com `aria-current` também ficam em peso 500, porque o fundo sozinho não basta como sinal (WCAG 1.4.1). Pedido fora da revisão de 28/11.
- **Quebra de compatibilidade:** `Logo` e `Monogram` têm um `<span>` como raiz (`block`, `w-fit`) em todos os tons, antes `<img>`. `className`, `style`, `id`, `ref`, `hidden`, `data-*`, `aria-*` e eventos vão para o `<span>`; as `<img>` recebem só `src`, `alt`, `width` e os atributos de imagem `loading`, `decoding`, `crossOrigin`, `referrerPolicy` e `fetchPriority`. `onLoad` e `onError` saíram das props. Tipos novos: `LogoImageProps`, `LogoWrapperProps`, `MonogramImageProps` e `MonogramWrapperProps`.
- **Quebra de compatibilidade:** `Logo` `tone="branco"` agora é a versão toda branca (brandbook p. 18). A versão anterior, branca com circuito ciano, passou a `tone="negativa"` (p. 17): quem usava `branco` e quer o circuito deve trocar para `negativa`.
- **Quebra de compatibilidade:** o padrão do `Logo` passou de `principal` a `tone="auto"`: principal no tema claro, negativa no escuro, pelo `[data-theme]` mais próximo (funciona em ilhas de tema). Em `auto` o `<span>` contém duas `<img>` e o tema decide qual aparece; a oculta sai da árvore de acessibilidade. O `Monogram` segue o mesmo modelo, com padrão `auto` (antes `preto`): preto no claro, branco no escuro.
- **Quebra de compatibilidade:** largura mínima do `Logo` de 84 para 120px (`LOGO_MIN_WIDTH = 120`, constante no componente que espelha o token `size.logo-min`; brandbook p. 15), o mesmo valor da 0.1.0. Larguras menores são elevadas a 120 e geram aviso no console em desenvolvimento: no Storybook do DS e em consumidores que definem `process.env.NODE_ENV` (webpack, Next.js); em consumidor Vite no navegador o aviso não aparece. Abaixo de 120px, use o `Monogram`.
- Stories do `Header` e padrão Timeline: `Monogram` a 56px no lugar do `Logo` `preto` a 84px. A tela Entrar usa o `Monogram` no tom padrão.
- Tokens: preto da marca `#000000` (`black`) em `content`, `line`, `inverse` e `on-brand` no tema claro e em `on-inverse` e `on-brand` no escuro, antes `ink` `#121212`. `ink` continua `#121212`, agora só como superfície elevada do tema escuro.
- Token `navy` (`night`): azul-noite de `#0d2b3a` para `#022330`, fundo alternativo das versões em branco do logotipo (p. 18).
- Degradê institucional (`bg-brand-gradient`): base de `#a3a3a3` para `#9b9b9b`.
- Assets: texto do logotipo principal de `#121212` para `#000000` (`src/assets/brand` e `.storybook/public/brand`).
- Os SVGs de `Logo` e `Monogram` passam a ser declarados "de referência" até a marca enviar os vetores oficiais. O monograma é provisório.
- Fundações › Marca: versões com os tons corretos (`negativa` sobre preto), ilhas de tema (`data-theme` com `text-content`) nas molduras para não virar preto sobre preto no tema escuro, X da área de proteção igual à altura do "G" (0,25 × a largura do logotipo, antes 0,14; no monograma, 0,53 × a largura), módulo de construção (p. 13) separado da área de proteção, fundos em azul-noite e azul-petróleo, área de proteção do monograma.
- Textos de componentes, stories, docs e tokens revisados para PT-BR (logotipo, grade, arquivos, tela, Entrar; cidades brasileiras nos exemplos). A story Fundações › Grelha virou Fundações › Grade.
- Exemplos de loja restantes (menus Mulher/Homem/Crianças, envio, devoluções, artigo) trocados por casting.
- Ícones `menu`, `search`, `bag`, `user`, `help`, `bookmark`, `filter`, `info`, `pin`, `calendar`, `clock`, `users`, `heart` e `star` agora vêm do Circum Icons (`react-icons/ci`); `react-icons` entra como dependência e fica externo no build.
- `Header`: mesmo layout em todos os breakpoints (menu, logo ao lado, ícones à direita, 48px); hambúrguer de 3 linhas. `MenuDrawer` acompanha a posição do X.
- `Tabs` verticais: a aba ativa ganha uma linha que corre até a linha vertical à esquerda do painel. O `MenuDrawer` não usa essas linhas (ver acima).
- Textos clicáveis deixam de sublinhar no hover (Button de texto, cards, TextField, Breadcrumbs, Footer, Header, MenuDrawer, Pagination, Tabs).
- `CastingCard`: no hover a capa amplia 1,15× (200ms, ease-in). `MediaPlaceholder`: cantos inferiores retos.
- `Accordion`: título do item aberto em negrito (600).
- `Tag`: padding igual ao do `StatusBadge` (`px-2.5 py-0.5`) nas variantes `outline` e `solid`.
- `Breadcrumbs`: o item atual nunca é clicável (`href`/`onClick` ignorados, sem ponteiro).
- Stories: foto de modelo no `CastingCard`, imagem conceitual no Detalhe do casting e fundo branco na Timeline.
- Novo token `tiffany-link` (#057571; #81D8D0 no escuro).
- Hover dos itens com contorno (`Button` e `IconButton` `outline`): borda Azul Tiffany.
- Cursor de mãozinha em todos os clicáveis (regra global em `theme.css`).
- `Radio`: círculo e ponto com `border-radius: 100%`; legenda e descrições ficam na cor de desabilitado; story Desabilitado.
- `Switch`: bolinha com `border-radius: 100%`.
- `Select`: valor, rótulo e seta com 4px de recuo interno.
- Ícones: todos do React Icons. Os que ainda eram desenhados à mão (`close`, `plus`, `minus`, `check`, `chevron-*`, `arrow-right`, `mask`) e `users` passam a Phosphor Light (`react-icons/pi`); o resto segue no Circum Icons.
- `Icon`: catálogo completo do Circum Icons (288) disponível com prefixo `ci-` (ex.: `ci-bag-1`), exportado como `circumIconNames` e exibido em Fundações › Iconografia. Gerado em `src/components/icon/circum.ts`.
- Coração de salvar (CastingCard, TalentCard): salvo fica com miolo Azul Tiffany (`brand`) e contorno Tiffany Link, na mesma forma do ícone não salvo (antes vermelho).
- `Logo`: novo tom `preto` (versão monocromática, `good-casting-logo-preto.svg`), em Fundações › Marca › Versão monocromática.
- Novo componente `Monogram` (monograma GD Casting®, tons `preto` e `branco`). Usado na tela Entrar e em Fundações › Marca (monograma e monograma em branco).
- `Select`: linha inferior fica Azul Tiffany no hover (fora de erro e desabilitado).
- Fundações › Marca reescrita a partir do brandbook (p. 10–21): logotipo, monograma, conceito, construção e área de proteção (X), dimensão mínima (impressão e digital), versões, versões em branco, usos incorretos e uso correto.
- Tipografia do DS: **Bodoni Moda** (`font-display`, títulos) + **Public Sans** (`font-sans`, resto), no lugar de Playfair Display + Inter. Fundações ganha as comparações Tipografia - 1 a - 5.
- `ButtonGroup` `attached`: vão de 4px entre os botões (antes bordas sobrepostas); story Quantidade sem borda no número.

### Adicionado
- Tom `negativa` no `Logo` e arquivo `good-casting-logo-branco.svg` (versão toda branca).
- `LOGO_MIN_WIDTH` e o tipo `LogoTone`, exportados de `Logo`.
- Token `petrol` (azul-petróleo `#043c50`, classe `bg-petrol`): fundo das versões em branco (p. 20–21); branco sobre ele: 11,9:1.
- Token `gradient.brand` em `tokens.json` (`#ffffff` a `#9b9b9b`, 180deg), espelhado por `bg-brand-gradient`.
- Variáveis `--gc-show-on-light` e `--gc-show-on-dark` no tema, que alternam as versões de `Logo` e `Monogram` em `auto`.
- Stories `Marca/Logo` (principal, negativa, branco, preto, auto) e `Marca/Monograma` (preto, branco, auto).
- Fundações › Marca: bloco Grafismos (malha hexagonal pendente, degradê) e régua do módulo de construção.
- Pacote: script `prepare` (`npm run build`) e campo `license: "UNLICENSED"`; segue `private: true` (NC-009). Antes o pacote saía sem `dist/lib` (`dist` está no `.gitignore`), e `main`, `types` e `./styles.css` apontavam para arquivos inexistentes. O `prepare` roda no `npm pack`, no `npm publish` e na instalação via git (com as dependências de desenvolvimento) e gera `dist/lib`. No repositório, `npm install` também passa a rodar o build.
- `MetaItem` (parte interna dos cartões): prop `wrap`, que quebra a linha em vez de cortar com reticências.
- `MenuDrawerLink.current`: marca a página atual com `aria-current="page"`, fundo Tiffany 20% e peso 500.

### Corrigido
- `IconButton`: com `badge` acima de 99, o nome acessível agora usa o mesmo texto exibido ("Salvos, 99+"), não o número bruto (WCAG 2.5.3).
- Contrastes declarados em tokens e docs: branco sobre Tiffany 1,7:1 (antes 1,6:1); preto sobre Tiffany 12,7:1 (antes 13:1); `teal-text` 5,5:1 (antes 5,6:1); `gray-500` 3,4:1 (antes 3,5:1); `gray-600` 5,8:1 (antes 5,9:1). Preto sobre a base do degradê: 7,6:1.
- Resíduos de pt-PT convertidos para PT-BR ("Secções", "Candidatar-me", "Seguinte", "Conte-nos sobre si", "O meu perfil", "rodar", "parcimónia"; Setúbal e Cascais trocadas por Salvador e Recife nos exemplos).
- Frases que prometiam resultado reescritas (Banner e padrão Timeline: "receber convites", "até 3x mais convites").
- Footer: "© 2026 Maison" trocado por "© 2026 Good Casting".
- Introdução: tabelas em JSX, porque o MDX do Storybook roda sem `remark-gfm` e tabela em Markdown não renderiza.
- Anel de foco (`focusRing`, `src/lib/cn.ts`) não era desenhado em nenhum componente (NC-001, WCAG 2.4.7): `outline-none` gravava `--tw-outline-style: none`, o `focus-visible:outline-2` herdava esse `none` e o `cn` descartava `focus-visible:outline`. A classe passa a `outline-hidden focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-text`, e o `outline-solid` sobrevive ao `cn`.
- `Toast`: o anel da ação e do Fechar (`inverseFocusRing`) tinha o mesmo defeito e 1px; agora aparece, com 2px em `on-inverse` (NC-004).
- `ChipSelector`: na escolha única, o selecionado se distinguia só pela cor (fundo `brand-soft` e borda Tiffany, abaixo de 1,2:1 contra o não selecionado; WCAG 1.4.1 e 1.4.11), e o hover do não selecionado ficava igual ao selecionado. Agora, nos dois modos, o selecionado tem ✓ e borda `inverse` (preta no claro, branca no escuro) sobre `brand-soft`; o hover do não selecionado escurece a borda para `line-field`. O padding cede espaço ao ✓ (`px-5` sem seleção, `pl-2 pr-3` com), e o chip não muda de largura ao alternar (NC-002).
- `Link`: no hover o texto virava Azul Tiffany sobre branco, 1,66:1 (WCAG 1.4.3). O texto fica sempre `brand-text` (antes `tiffany-link`, mesmo valor) e o hover é o sublinhado Tiffany (`decoration-brand`): em `default` ele aparece no hover; em `underline` o traço passa de 1px na cor do texto a 2px Tiffany (NC-003, NC-034b).
- `CastingCard`: o `overflow-hidden` do `<article>` cortava o anel de foco do link do cartão (no `::after`). O recorte passa ao invólucro da mídia (`overflow-hidden rounded-t-[inherit]`) e o `::after` usa `rounded-md` (NC-005, WCAG 2.4.7).
- Botão de salvar dos cards (`SaveToggle`): anel de foco em dois tons, halo `base` de 2px e contorno `brand-text` por fora, visível sobre qualquer foto (5,54:1 no claro, 12,67:1 no escuro). Com `focus-visible:opacity-100`, o esmaecimento do hover não apaga o anel.
- `CardGrid` `kind="talents"`: a 320px a página rolava na horizontal e os cartões da 2ª coluna cobriam os da 1ª. O cartão agora encolhe com a coluna (`[&>*]:min-w-0` na `li`; NC-006, WCAG 1.4.10).
- `CastingCard`: o prazo era cortado com reticências a 320px ("Encerra hoje às 1…"). Agora quebra a linha (`MetaItem` com `wrap`), a linha prazo/cachê também quebra (`flex-wrap`) e o cachê fica à direita (NC-007, WCAG 1.4.10).

### Documentação
- Introdução: Propósito e Posicionamento; 6 traços de personalidade na ordem do brandbook (Inovadora, Humana, Confiável, Elegante, Visionária, Inclusiva; entrou Visionária); Valores, com a consequência de cada um no DS; Voz e texto.
- `CONTRATO.md`: regras de `Logo` e `Monogram` (mínimo de 120px, versões, `tone="auto"`, área de proteção), azul-noite (`night`) e azul-petróleo (`petrol`) só como fundo alternativo das versões em branco, `petrol` na lista de classes, arquivos de referência e remissão a Introdução › Voz e texto.
- `README.md`: preto `#000000`, azul-noite `#022330` e azul-petróleo `#043C50`, contraste no Tiffany, mínimo do logotipo, `Monogram` e arquivos de referência na pasta `brand`.
- `README.md` (Consumir) e Introdução (Uso): instalação via git (`npm install github:KodatoAmee/DS-SAE-PROJETOS-Design-System-Files-DS-GOODCASTING#<tag-ou-branch>`; `#main` até existir tag), requisitos (React 19; Tailwind v4 só com `theme.css`), import do CSS e tema no `<html>` com `data-theme` (NC-010).
- Stories do `Link`: descrição e anatomia do hover novo; peso 400 (a descrição dizia 300).
- Stories do `ChipSelector`: descrição do selecionado; Estados com escolha única vazia e selecionada, várias, opção desabilitada e erro; nova story Área de testes.

**Pendências (aguardando a marca):** vetores oficiais (logotipo, monograma, malha hexagonal, versões horizontal, com símbolo e vertical), cor do circuito sobre fundo claro, nomes das fontes, mínimo do monograma, regra de fotografia, X da área de proteção (o texto da p. 14 diz altura do "G", ≈ 0,25 × a largura; o desenho da mesma página sugere ≈ 0,16).

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
