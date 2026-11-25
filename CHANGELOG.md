# Changelog

Formato [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/), versão [SemVer](https://semver.org/lang/pt-BR/).

## [Não lançado]

### Corrigido
- `IconButton`: com `badge` acima de 99, o nome acessível agora usa o mesmo texto exibido ("Salvos, 99+"), não o número bruto (WCAG 2.5.3).

### Alterado
- Textos de componentes, stories, docs e tokens revisados para PT-BR (logotipo, grade, arquivos, tela, Entrar; cidades brasileiras nos exemplos). A story Fundações › Grelha virou Fundações › Grade.
- Exemplos de loja restantes (menus Mulher/Homem/Crianças, envio, devoluções, artigo) trocados por casting.

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
