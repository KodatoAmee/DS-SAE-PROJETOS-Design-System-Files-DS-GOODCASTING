import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ComponentProps, CSSProperties, ReactNode } from "react";
import { LOGO_MIN_WIDTH, Logo, Monogram } from "../components/brand";
import { cn } from "../lib/cn";
import { Icon, circumIconNames, iconNames } from "../components/icon";

const meta = {
  title: "Fundações",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Fundações do DS-GoodCasting. Marca do brandbook Good Casting (Azul Tiffany #81D8D0, preto, branco); tipo do DS: Bodoni Moda + Public Sans; apoio e feedback do GC-DS2 / app. Fonte canônica: `tokens/tokens.json`; runtime: `src/styles/theme.css`.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

function Section({ title, note, children }: { title: string; note?: string; children: ReactNode }) {
  return (
    <section className="mb-18">
      <h2 className="mb-1 font-display text-heading">{title}</h2>
      {note && <p className="mb-6 max-w-[640px] text-body text-content-mid">{note}</p>}
      {children}
    </section>
  );
}

const semanticColors: { token: string; cls: string; use: string }[] = [
  { token: "base", cls: "bg-base", use: "Fundo da página" },
  { token: "surface", cls: "bg-surface", use: "Modal, gaveta, painel" },
  { token: "muted", cls: "bg-muted", use: "Mídia vazia, esqueleto, hover" },
  { token: "content", cls: "bg-content", use: "Texto e ícones" },
  { token: "content-mid", cls: "bg-content-mid", use: "Texto secundário" },
  { token: "content-low", cls: "bg-content-low", use: "Rótulo de campo" },
  { token: "content-disabled", cls: "bg-content-disabled", use: "Desabilitado" },
  { token: "line", cls: "bg-line", use: "Contorno de botão" },
  { token: "line-subtle", cls: "bg-line-subtle", use: "Divisores" },
  { token: "line-field", cls: "bg-line-field", use: "Linha de campo" },
  { token: "inverse", cls: "bg-inverse", use: "Botão primário (preto)" },
  { token: "brand", cls: "bg-brand", use: "Azul Tiffany #81D8D0: destaque, seleção, progresso" },
  { token: "brand-soft", cls: "bg-brand-soft", use: "Fundo de item selecionado" },
  { token: "brand-text", cls: "bg-brand-text", use: "Texto de marca (AA)" },
  { token: "tiffany-link", cls: "bg-tiffany-link", use: "Tiffany Link: cor do componente Link (AA)" },
  { token: "circuit", cls: "bg-circuit", use: "Circuito do logotipo. Só decorativo" },
  { token: "night", cls: "bg-night", use: "Fundo alternativo das versões em branco do logotipo (p. 18)" },
  {
    token: "petrol",
    cls: "bg-petrol",
    use: "Azul-petróleo #043C50: fundo das versões em branco (p. 20–21); branco sobre ele 11,9:1. Medido no brandbook, não declarado",
  },
  { token: "sheet", cls: "bg-sheet", use: "Folha do app" },
  { token: "success", cls: "bg-success", use: "Sucesso" },
  { token: "warning", cls: "bg-warning", use: "Atenção" },
  { token: "info", cls: "bg-info", use: "Informação" },
  { token: "on-inverse", cls: "bg-on-inverse", use: "Texto sobre inverse" },
  { token: "danger", cls: "bg-danger", use: "Borda e ícone de erro" },
  { token: "danger-text", cls: "bg-danger-text", use: "Texto de erro" },
  { token: "overlay", cls: "bg-overlay", use: "Fundo de modal" },
];

export const Cor: Story = {
  render: () => (
    <Section
      title="Cor"
      note="Preto, branco e Azul Tiffany (#81D8D0), como no brandbook. Tiffany não leva texto branco: use texto preto sobre ele (preto sobre Tiffany: 12,7:1) e `brand-text` (#057571) para links. Troque o tema na barra para ver as semânticas mudarem."
    >
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
        {semanticColors.map((c) => (
          <div key={c.token}>
            <div className={`h-20 rounded-lg border border-line-subtle ${c.cls}`} />
            <p className="mt-2 text-label-s">{c.token}</p>
            <p className="text-label-s text-content-mid">{c.use}</p>
          </div>
        ))}
      </div>
    </Section>
  ),
};

const typeScale: { cls: string; name: string; spec: string; display?: boolean }[] = [
  { cls: "text-display font-display", name: "display", spec: "28/34", display: true },
  { cls: "text-heading font-display", name: "heading", spec: "20/28", display: true },
  { cls: "text-title font-semibold", name: "title", spec: "18/24" },
  { cls: "text-title-s font-medium", name: "title-s", spec: "16/24" },
  { cls: "text-body", name: "body", spec: "14/20" },
  { cls: "text-action font-medium", name: "action", spec: "15/20" },
  { cls: "text-label", name: "label", spec: "13/18" },
  { cls: "text-label-s", name: "label-s", spec: "12/16" },
  { cls: "text-caption", name: "caption", spec: "10/14" },
];

type FontPair = { serif: string; sans: string; serifStack: string; sansStack: string };

/**
 * Escala tipográfica com um par de fontes. Troca `--font-display` e `--font-sans`
 * só dentro do bloco, então os tokens `font-display`/`font-sans` seguem valendo.
 */
function TypeSpecimen({ pair, title, note }: { pair: FontPair; title: string; note: string }) {
  return (
    <div
      className="font-sans"
      style={{ "--font-display": pair.serifStack, "--font-sans": pair.sansStack } as CSSProperties}
    >
      <Section title={title} note={note}>
        <div className="mb-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-line-subtle p-5">
            <p className="font-display text-display">Aa Bb Cc 0123</p>
            <p className="mt-2 text-label-s text-content-mid">Títulos · {pair.serif}</p>
          </div>
          <div className="rounded-lg border border-line-subtle p-5">
            <p className="text-display font-normal">Aa Bb Cc 0123</p>
            <p className="mt-2 text-label-s text-content-mid">Texto · {pair.sans}</p>
          </div>
        </div>
        <div className="divide-y divide-line-subtle border-y border-line-subtle">
          {typeScale.map((t) => (
            <div key={t.name} className="grid grid-cols-[120px_160px_1fr] items-baseline gap-4 py-4">
              <span className="text-label-s text-content-mid">{t.name}</span>
              <span className="text-label-s text-content-mid">
                {t.spec} · {t.display ? pair.serif : pair.sans}
              </span>
              <span className={t.cls}>Toda grande história começa por uma oportunidade.</span>
            </div>
          ))}
        </div>
        <div className="mt-8 flex gap-10">
          {(["font-normal", "font-medium", "font-semibold"] as const).map((w, i) => (
            <div key={w}>
              <p className={`text-title ${w}`}>Aa Casting</p>
              <p className="text-label-s text-content-mid">{[400, 500, 600][i]}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

const pairs: Record<"atual" | "1" | "2" | "3" | "4" | "5", FontPair> = {
  atual: {
    serif: "Bodoni Moda",
    sans: "Public Sans",
    serifStack: '"Bodoni Moda", Georgia, "Times New Roman", serif',
    sansStack: '"Public Sans", system-ui, -apple-system, "Segoe UI", Arial, sans-serif',
  },
  "1": {
    serif: "Cormorant Garamond",
    sans: "Jost",
    serifStack: '"Cormorant Garamond", Georgia, serif',
    sansStack: '"Jost", system-ui, sans-serif',
  },
  "2": {
    serif: "Fraunces",
    sans: "Alegreya Sans",
    serifStack: '"Fraunces", Georgia, serif',
    sansStack: '"Alegreya Sans", system-ui, sans-serif',
  },
  "3": {
    serif: "Instrument Serif",
    sans: "Instrument Sans",
    serifStack: '"Instrument Serif", Georgia, serif',
    sansStack: '"Instrument Sans", system-ui, sans-serif',
  },
  "4": {
    serif: "Bodoni Moda",
    sans: "Josefin Sans",
    serifStack: '"Bodoni Moda", Georgia, serif',
    sansStack: '"Josefin Sans", system-ui, sans-serif',
  },
  "5": {
    serif: "Bodoni Moda",
    sans: "Public Sans",
    serifStack: '"Bodoni Moda", Georgia, serif',
    sansStack: '"Public Sans", system-ui, sans-serif',
  },
};

export const Tipografia: Story = {
  render: () => (
    <TypeSpecimen
      pair={pairs.atual}
      title="Tipografia"
      note="Duas famílias: Bodoni Moda (serifada de alto contraste, ar de moda e fine art) em títulos; Public Sans (sem serifa neutra e legível) em todo o resto. 14px é a base; 400 texto, 500 ações, 600 títulos. O logotipo segue com as fontes do brandbook."
    />
  ),
};

export const Tipografia1: Story = {
  name: "Tipografia - 1",
  render: () => (
    <TypeSpecimen
      pair={pairs["1"]}
      title="Tipografia - 1"
      note="Candidato: Cormorant Garamond + Jost. Galeria clássica: serifa fina e caligráfica nos títulos, sem serifa geométrica (linhagem Futura) no texto."
    />
  ),
};

export const Tipografia2: Story = {
  name: "Tipografia - 2",
  render: () => (
    <TypeSpecimen
      pair={pairs["2"]}
      title="Tipografia - 2"
      note="Candidato: Fraunces + Alegreya Sans. Editorial e acolhedor: serifa suave e expressiva, sem serifa humanista com traço de pena. Alegreya Sans não tem peso 600 (usa 700)."
    />
  ),
};

export const Tipografia3: Story = {
  name: "Tipografia - 3",
  render: () => (
    <TypeSpecimen
      pair={pairs["3"]}
      title="Tipografia - 3"
      note="Candidato: Instrument Serif + Instrument Sans. Arte contemporânea: serifa estreita e elegante com sem serifa da mesma família. Instrument Serif só tem peso 400."
    />
  ),
};

export const Tipografia4: Story = {
  name: "Tipografia - 4",
  render: () => (
    <TypeSpecimen
      pair={pairs["4"]}
      title="Tipografia - 4"
      note="Candidato: Bodoni Moda + Josefin Sans. Moda e glamour: serifa de alto contraste e sem serifa geométrica vintage."
    />
  ),
};

export const Tipografia5: Story = {
  name: "Tipografia - 5",
  render: () => (
    <TypeSpecimen
      pair={pairs["5"]}
      title="Tipografia - 5"
      note="Candidato: Bodoni Moda + Public Sans. Serifa de alto contraste nos títulos e sem serifa neutra e legível no texto."
    />
  ),
};

const spaces = [
  { k: "1", px: 4, cls: "w-1" },
  { k: "2", px: 8, cls: "w-2" },
  { k: "3", px: 12, cls: "w-3" },
  { k: "4", px: 16, cls: "w-4" },
  { k: "5", px: 20, cls: "w-5" },
  { k: "6", px: 24, cls: "w-6" },
  { k: "8", px: 32, cls: "w-8" },
  { k: "10", px: 40, cls: "w-10" },
  { k: "18", px: 72, cls: "w-18" },
];

export const Espaco: Story = {
  name: "Espaço e tamanho",
  render: () => (
    <>
      <Section title="Espaço" note="Base 4px, igual à escala numérica do Tailwind. 16px é a margem lateral no app; 24px separa grupos.">
        <div className="space-y-3">
          {spaces.map((s) => (
            <div key={s.k} className="flex items-center gap-4">
              <span className="w-10 text-label-s text-content-mid">{s.k}</span>
              <span className={`h-4 bg-content ${s.cls}`} />
              <span className="text-label-s text-content-mid">{s.px}px</span>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Tamanho" note="Botão 40 · 48 · 56 (CTA do app), campo 40, alvo de toque 44. Raios: 4 · 6 · 10 · 12 (controles) · 16 · 24 · pílula.">
        <div className="flex items-end gap-6">
          {[40, 48, 56].map((h) => (
            <div key={h} className="text-center">
              <div className="w-24 rounded-control border border-line" style={{ height: h }} />
              <p className="mt-2 text-label-s text-content-mid">{h}px</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  ),
};

export const Movimento: Story = {
  render: () => (
    <Section title="Movimento" note="200ms para hover e opacidade; 300–500ms ease-in-out para painéis e gavetas. Tudo cai para ~0ms com prefers-reduced-motion.">
      <div className="flex gap-10">
        {[
          { d: "duration-200", l: "200ms · rápido" },
          { d: "duration-500", l: "500ms · base" },
        ].map((m) => (
          <div key={m.d} className="group w-48 cursor-default">
            <div className="h-24 overflow-hidden border border-line">
              <div className={`h-full w-1/3 bg-inverse transition-transform ease-gc group-hover:translate-x-[200%] ${m.d}`} />
            </div>
            <p className="mt-2 text-label-s text-content-mid">{m.l} (passe o mouse)</p>
          </div>
        ))}
      </div>
    </Section>
  ),
};

export const Grade: Story = {
  render: () => (
    <Section title="Grade e breakpoints" note="md 768 · lg 1024 · xl 1280 · 2xl 1920. Grade de talentos e castings com 2/4/6 colunas.">
      <div className="grid grid-cols-2 gap-x-2 gap-y-6 md:grid-cols-4 lg:grid-cols-6 lg:gap-x-10">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i}>
            <div className="aspect-[3/4] rounded-md bg-muted" />
            <p className="mt-2 text-label-s">Coluna {i + 1}</p>
          </div>
        ))}
      </div>
    </Section>
  ),
};

export const Iconografia: Story = {
  render: () => (
    <Section title="Iconografia" note="React Icons em traço fino: Circum Icons (`react-icons/ci`) e, onde ele não tem par sem moldura, Phosphor Light (`react-icons/pi`). 20px por padrão. Decorativo por padrão; passe `label` quando o ícone for o único rótulo.">
      <div className="grid grid-cols-3 gap-6 md:grid-cols-6">
        {iconNames.map((n) => (
          <div key={n} className="flex flex-col items-center gap-2 border border-line-subtle py-6">
            <Icon name={n} />
            <span className="text-caption text-content-mid">{n}</span>
          </div>
        ))}
      </div>
      <h3 className="mt-12 mb-1 text-title font-semibold">Circum Icons completo ({circumIconNames.length})</h3>
      <p className="mb-6 max-w-[640px] text-body text-content-mid">
        Todo o Circum Icons fica disponível no componente com o prefixo <code>ci-</code>, por exemplo{" "}
        <code>{'<Icon name="ci-bag-1" />'}</code>. Use os nomes semânticos acima nos componentes do DS.
      </p>
      <div className="grid grid-cols-3 gap-3 md:grid-cols-6 lg:grid-cols-8">
        {circumIconNames.map((n) => (
          <div key={n} className="flex flex-col items-center gap-2 border border-line-subtle px-1 py-4">
            <Icon name={n} />
            <span className="w-full truncate text-center text-caption text-content-mid">{n}</span>
          </div>
        ))}
      </div>
    </Section>
  ),
};

/* ---------- Marca (brandbook Good Casting, p. 10–21) ---------- */

/** Rótulo de seção no estilo do brandbook: caixa alta em teal com fio até a borda. */
function BrandLabel({ children }: { children: ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-4">
      <span className="shrink-0 text-label-s font-semibold tracking-wide text-brand-text uppercase">{children}</span>
      <span aria-hidden className="h-px flex-1 bg-brand-text/40" />
    </div>
  );
}

function BrandNote({ children }: { children: ReactNode }) {
  return (
    <p className="mt-4 flex max-w-[720px] items-start gap-3 text-label text-content-mid">
      <span
        aria-hidden
        className="inline-flex size-6 shrink-0 items-center justify-center rounded-[100%] border border-brand-text text-label-s font-semibold text-brand-text"
      >
        !
      </span>
      <span>{children}</span>
    </p>
  );
}

function BrandBlock({ title, lead, children }: { title: string; lead: string; children: ReactNode }) {
  return (
    <section className="grid gap-8 border-t border-line-subtle py-12 lg:grid-cols-[280px_1fr]">
      <div>
        <h3 className="font-display text-heading">{title}</h3>
        <p className="mt-1 text-title-s text-content-mid">{lead}</p>
      </div>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

/**
 * Unidade X da área de proteção, proporcional à largura do logotipo (altura do "G").
 * Brandbook p. 14: X = altura do "G" do logotipo principal. Medido: o "G" tem 24,9% da largura do logotipo; o DS usa 25%.
 */
const xUnit = (logoWidth: number) => Math.round(logoWidth * 0.25);

/**
 * Unidade X do monograma: altura do "G" do monograma (p. 20), na prática a altura da pílula GD.
 * Medido na p. 20: 58,6% da largura do GD. No SVG do `Monogram` (pílula de 358 de altura num viewBox de 680 de
 * largura, com folga lateral) isso dá ≈ 53% da largura do componente.
 */
const monogramXUnit = (monogramWidth: number) => Math.round(monogramWidth * 0.53);

type LogoTone = NonNullable<ComponentProps<typeof Logo>["tone"]>;
type MonogramTone = NonNullable<ComponentProps<typeof Monogram>["tone"]>;

/**
 * `theme` vira `data-theme` no contêiner. "light" (padrão) é a ilha de tema da versão principal sobre branco, para
 * não virar preto sobre preto no tema escuro; use "dark" sobre preto, azul-noite ou petróleo, para o tracejado e os X ficarem legíveis.
 */
type ProtectionAreaProps = { width: number; bg?: string; theme?: "light" | "dark" } & (
  | { mark?: "logo"; tone?: LogoTone }
  | { mark: "monograma"; tone?: MonogramTone }
);

function ProtectionArea(props: ProtectionAreaProps) {
  const { width, bg = "bg-base", theme = "light" } = props;
  const x = props.mark === "monograma" ? monogramXUnit(width) : xUnit(width);
  return (
    <div
      className={cn("relative inline-block border border-dashed border-brand-text text-content", bg)}
      style={{ padding: x }}
      data-theme={theme}
    >
      {props.mark === "monograma" ? (
        <Monogram tone={props.tone ?? "preto"} width={width} alt="" />
      ) : (
        <Logo tone={props.tone ?? "principal"} width={width} alt="" />
      )}
      <span aria-hidden className="absolute left-1/2 -translate-x-1/2 text-label-s font-semibold text-brand-text" style={{ top: x / 2 - 8 }}>
        X
      </span>
      <span aria-hidden className="absolute left-1/2 -translate-x-1/2 text-label-s font-semibold text-brand-text" style={{ bottom: x / 2 - 8 }}>
        X
      </span>
      <span aria-hidden className="absolute top-1/2 -translate-y-1/2 text-label-s font-semibold text-brand-text" style={{ left: x / 2 - 4 }}>
        X
      </span>
      <span aria-hidden className="absolute top-1/2 -translate-y-1/2 text-label-s font-semibold text-brand-text" style={{ right: x / 2 - 4 }}>
        X
      </span>
    </div>
  );
}

const formatX = (u: number) => `${String(u).replace(".", ",")}X`;

/** Régua de cotas do módulo de construção (p. 13). Esquema sem escala: mostra a ordem e a proporção das cotas. */
function ModuleRuler({
  label,
  segments,
  vertical = false,
  axis = false,
}: {
  label: string;
  segments: { u: number; name?: string }[];
  vertical?: boolean;
  axis?: boolean;
}) {
  return (
    <figure>
      <figcaption className="mb-2 text-label-s text-content-mid">{label}</figcaption>
      <div className={cn("relative flex", vertical ? "w-max flex-col" : "w-full max-w-[440px]")}>
        {segments.map((s, i) => (
          <div
            key={i}
            className={cn("relative flex min-w-0 items-center", vertical ? "gap-2 pl-5" : "flex-col pt-4")}
            style={vertical ? { height: s.u * 28 } : { flex: `${s.u} 1 0` }}
          >
            <span aria-hidden className={cn("absolute bg-brand-text", vertical ? "inset-y-0 left-1.5 w-px" : "inset-x-0 top-1.5 h-px")} />
            <span aria-hidden className={cn("absolute bg-brand-text", vertical ? "top-0 left-0 h-px w-3" : "top-0 left-0 h-3 w-px")} />
            {i === segments.length - 1 && (
              <span aria-hidden className={cn("absolute bg-brand-text", vertical ? "bottom-0 left-0 h-px w-3" : "top-0 right-0 h-3 w-px")} />
            )}
            <span className="text-label-s font-semibold text-brand-text">{formatX(s.u)}</span>
            {s.name && <span className="text-label-s text-content-mid">{s.name}</span>}
          </div>
        ))}
        {axis && <span aria-hidden className="absolute -top-3 left-1/2 h-7 border-l border-dashed border-brand-text" />}
      </div>
      {axis && <p className="mt-2 max-w-[440px] text-center text-label-s text-brand-text">eixo central</p>}
    </figure>
  );
}

function Pending({ label }: { label: string }) {
  return (
    <div className="flex h-36 flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-line-field p-4 text-center">
      <span className="text-label font-medium">{label}</span>
      <span className="text-label-s text-content-mid">Arquivo oficial pendente</span>
    </div>
  );
}

const wrongUses: { caption: string; tile: ReactNode }[] = [
  { caption: "Não distorcer ou deformar.", tile: <Logo width={150} alt="" style={{ transform: "scaleX(0.7)" }} /> },
  { caption: "Não alterar as cores.", tile: <Logo width={150} alt="" style={{ filter: "hue-rotate(110deg) saturate(3)" }} /> },
  {
    caption: "Não alterar a tipografia.",
    tile: (
      <span aria-hidden className="text-center leading-none">
        <span className="block text-[44px] font-semibold italic" style={{ fontFamily: "Georgia, serif" }}>
          Good
        </span>
        <span className="block text-label tracking-[0.4em]">CASTING</span>
      </span>
    ),
  },
  {
    caption: "Não alterar a posição dos elementos.",
    tile: (
      <span aria-hidden className="flex flex-col items-start leading-none">
        <span className="font-display text-[40px] font-bold">GOOD</span>
        <span className="mt-1 text-label tracking-wide">CASTING</span>
      </span>
    ),
  },
  {
    caption: "Não aplicar efeitos, sombras ou contornos.",
    tile: <Logo width={150} alt="" style={{ filter: "drop-shadow(0 6px 6px rgb(0 0 0 / 0.55))" }} />,
  },
  { caption: "Não girar o logotipo.", tile: <Logo width={140} alt="" style={{ transform: "rotate(-18deg)" }} /> },
  {
    caption: "Não aplicar sobre fundos com baixo contraste.",
    tile: (
      <span className="flex size-full items-center justify-center bg-[#3b4045]">
        <Logo tone="branco" width={150} alt="" style={{ opacity: 0.55 }} />
      </span>
    ),
  },
  {
    caption: "Não aplicar sobre imagens sem o devido contraste.",
    tile: (
      <span
        className="flex size-full items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url(https://images.unsplash.com/photo-1742360401311-b8a56a428dbc?w=600&h=340&fit=crop)" }}
      >
        <Logo tone="branco" width={150} alt="" />
      </span>
    ),
  },
];

const logoConcept = [
  {
    k: "GOOD",
    words: "Elegância · Confiança · Credibilidade",
    text: "A tipografia clássica transmite sofisticação, solidez e autoridade.",
    cls: "font-display text-display",
  },
  {
    k: "CASTING",
    words: "Clareza · Especialização · Modernidade",
    text: "Composição contemporânea que reforça o posicionamento na indústria audiovisual.",
    cls: "text-display tracking-wide",
  },
  {
    k: "CIRCUITO",
    words: "Tecnologia · Conectividade · Inovação",
    text: "Os grafismos inspirados em circuitos representam a transformação digital, a conexão entre pessoas e a evolução do processo de casting.",
    cls: "text-display tracking-wide text-brand-text",
  },
];

const minSizes = [
  { k: "Impressão", min: "25 mm", rec: "40 mm", w: [120, 190] },
  { k: "Digital", min: `${LOGO_MIN_WIDTH} px`, rec: "200 px", w: [LOGO_MIN_WIDTH, 200] },
];

export const Marca: Story = {
  render: () => (
    <Section
      title="Marca"
      note="Fonte: brandbook Good Casting (p. 10–21). Usar só os arquivos de referência (substituir pelos vetores oficiais quando a marca fornecer), via componente `Logo`. O logotipo segue as fontes do brandbook; a tipografia de interface do DS é Bodoni Moda + Public Sans."
    >
      <BrandBlock title="O logotipo" lead="O principal elemento de identificação da marca.">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="space-y-3 text-body text-content-mid">
            <p>Representa a união entre tecnologia, criatividade e indústria audiovisual.</p>
            <p>Uma marca moderna, inovadora e confiável, pensada para uma plataforma de alcance internacional.</p>
            <p>Como principal elemento da marca, deve ser usado de forma consistente em todos os pontos de contato.</p>
          </div>
          <div className="flex items-center justify-center rounded-lg bg-night p-10">
            <Logo tone="negativa" width={280} />
          </div>
        </div>
        <p className="mt-3 text-label-s text-content-mid">Logotipo principal</p>
      </BrandBlock>

      <BrandBlock title="Monograma" lead="O símbolo da Good Casting.">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <p className="text-body text-content-mid">
            As iniciais G e D formam uma assinatura visual única, para comunicar simplicidade, inovação e confiança. É o
            elemento de reconhecimento imediato em espaços pequenos (avatar, favicon, ícone do app).
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex h-36 items-center justify-center rounded-lg border border-line-subtle bg-base text-content" data-theme="light">
              <Monogram tone="preto" width={110} />
            </div>
            <div className="flex h-36 items-center justify-center rounded-lg bg-black">
              <Monogram tone="branco" width={110} />
            </div>
          </div>
        </div>
      </BrandBlock>

      <BrandBlock title="Conceito do logotipo" lead="Design com propósito: tradição, inovação e tecnologia.">
        <div className="grid gap-6 md:grid-cols-3">
          {logoConcept.map((c) => (
            <div key={c.k} className="rounded-lg border border-line-subtle p-5">
              <p className={c.cls}>{c.k}</p>
              <p className="mt-3 text-label font-semibold">{c.words}</p>
              <p className="mt-1 text-body text-content-mid">{c.text}</p>
            </div>
          ))}
        </div>
      </BrandBlock>

      <BrandBlock title="Grafismos" lead="Malha e degradê.">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <BrandLabel>Malha hexagonal</BrandLabel>
            <Pending label="Malha hexagonal (aguardando vetor oficial)" />
            <BrandNote>
              No canto superior esquerdo, ocupando até 15% da largura e 24% da altura da área, na cor <code>circuit</code>. Só
              decorativa.
            </BrandNote>
          </div>
          <div>
            <BrandLabel>Degradê</BrandLabel>
            <div
              className="flex h-36 flex-col justify-between rounded-lg border border-line-subtle bg-brand-gradient p-4 text-label font-medium text-content"
              data-theme="light"
            >
              <span>#FFFFFF</span>
              <span>#9B9B9B</span>
            </div>
            <BrandNote>
              Só decorativo, em telas institucionais. Texto sobre ele: apenas <code>content</code> (preto #000000, 7,6:1 na
              base).
            </BrandNote>
          </div>
        </div>
      </BrandBlock>

      <BrandBlock title="Construção" lead="Precisão em cada detalhe.">
        <div className="grid gap-10 md:grid-cols-[1fr_auto]">
          <div className="min-w-0 space-y-8">
            <p className="text-body text-content-mid">
              O logotipo é desenhado sobre um módulo geométrico que garante equilíbrio, legibilidade e consistência (p. 13). As
              proporções entre símbolo, tipografia e espaçamentos não mudam.
            </p>
            <ModuleRuler label="Largura de GOOD: 6X" segments={[{ u: 2 }, { u: 2 }, { u: 2 }]} />
            <ModuleRuler
              label="Base: simétrica ao eixo central"
              segments={[{ u: 1 }, { u: 1 }, { u: 3 }, { u: 1 }, { u: 3 }, { u: 1 }, { u: 1 }]}
              axis
            />
          </div>
          <ModuleRuler
            vertical
            label="Alturas, de cima para baixo"
            segments={[
              { u: 1, name: "margem" },
              { u: 3, name: "GOOD" },
              { u: 1, name: "respiro" },
              { u: 1.5, name: "CASTING" },
              { u: 1, name: "circuito" },
            ]}
          />
        </div>
        <BrandNote>
          Esquema sem escala, só com as cotas da p. 13. O X do módulo é uma unidade de grade (GOOD mede 3X de altura) e não é o
          X da área de proteção, que vale a altura inteira do “G” (p. 14).
        </BrandNote>
      </BrandBlock>

      <BrandBlock title="Área de proteção" lead="Respeitar o espaço.">
        <div className="grid items-center gap-10 md:grid-cols-[1fr_auto]">
          <div className="space-y-3 text-body text-content-mid">
            <p>
              A unidade <strong className="text-content">X</strong> é a altura da letra “G” do logotipo principal (p. 14).
              Nenhum texto, imagem ou elemento gráfico entra na margem X em volta do logotipo ou do monograma.
            </p>
            <p>No monograma, X é a altura do “G” do próprio monograma (p. 20).</p>
          </div>
          <ProtectionArea width={200} />
        </div>
        <BrandNote>
          No DS, X sai da largura: 25% da largura do logotipo (50px para 200px; o “G” medido tem 24,9%) e 53% da largura do
          monograma (a altura da pílula GD).
        </BrandNote>
      </BrandBlock>

      <BrandBlock title="Dimensão mínima" lead="Garantir legibilidade.">
        <div className="grid gap-8 md:grid-cols-2">
          {minSizes.map((g) => (
            <div key={g.k}>
              <BrandLabel>{g.k}</BrandLabel>
              <div
                className="flex flex-wrap items-end gap-x-8 gap-y-6 rounded-lg border border-line-subtle bg-base p-5 text-content"
                data-theme="light"
              >
                {[
                  { t: "Tamanho mínimo", v: g.min, w: g.w[0] },
                  { t: "Tamanho recomendado", v: g.rec, w: g.w[1] },
                ].map((sz) => (
                  <div key={sz.t}>
                    <p className="mb-3 text-label-s text-content-mid">{sz.t}</p>
                    <Logo width={sz.w} alt="" />
                    <div className="mt-3 flex items-center" style={{ width: sz.w }}>
                      <span aria-hidden className="h-3 w-px bg-brand-text" />
                      <span aria-hidden className="h-px flex-1 bg-brand-text" />
                      <span aria-hidden className="h-3 w-px bg-brand-text" />
                    </div>
                    <p className="mt-1 text-label font-semibold text-brand-text">{sz.v}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <BrandNote>
          Valem para o logotipo principal (com tipografia). Abaixo de 120 px (Header, avatar, favicon), use o Monogram. O
          Header do DS usa o Monogram a 56 px. Mínimo do monograma: pendente da marca.
        </BrandNote>
      </BrandBlock>

      <BrandBlock title="Versões do logotipo" lead="Consistência em qualquer aplicação.">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <BrandLabel>Versão principal</BrandLabel>
            <div className="flex h-36 items-center justify-center rounded-lg border border-line-subtle bg-base text-content" data-theme="light">
              <Logo width={200} />
            </div>
          </div>
          <div>
            <BrandLabel>Versão negativa</BrandLabel>
            <div className="flex h-36 items-center justify-center rounded-lg bg-black">
              <Logo tone="negativa" width={200} />
            </div>
          </div>
          <div>
            <BrandLabel>Versão monocromática</BrandLabel>
            <div className="flex h-36 items-center justify-center rounded-lg border border-line-subtle bg-base text-content" data-theme="light">
              <Logo tone="preto" width={200} />
            </div>
          </div>
          <div>
            <BrandLabel>Versão horizontal</BrandLabel>
            <Pending label="Monograma | Logotipo" />
          </div>
          <div>
            <BrandLabel>Versão com símbolo</BrandLabel>
            <Pending label="Monograma sobre o logotipo" />
          </div>
          <div>
            <BrandLabel>Versão vertical</BrandLabel>
            <Pending label="Logotipo vertical" />
          </div>
        </div>
        <BrandNote>
          Sempre que possível, use a versão principal sobre fundo claro. Negativa e monocromática só quando a principal não
          garantir contraste.
        </BrandNote>
      </BrandBlock>

      <BrandBlock title="Versões em branco" lead="Visibilidade em qualquer fundo.">
        <BrandLabel>Logotipo em branco</BrandLabel>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="flex h-44 items-center justify-center rounded-lg bg-black">
            <Logo tone="branco" width={220} />
          </div>
          <div className="flex h-44 items-center justify-center rounded-lg bg-night">
            <Logo tone="branco" width={220} />
          </div>
        </div>
        <div className="mt-8">
          <BrandLabel>Monograma em branco</BrandLabel>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex h-44 items-center justify-center rounded-lg bg-black">
              <Monogram tone="branco" width={150} />
            </div>
            <div className="flex h-44 items-center justify-center rounded-lg bg-night">
              <Monogram tone="branco" width={150} />
            </div>
          </div>
        </div>
        <BrandNote>Só sobre fundos escuros ou de cor que garantam contraste. Sem efeitos, contornos ou sombras.</BrandNote>
      </BrandBlock>

      <BrandBlock title="Área de proteção nas versões" lead="Respeitar o espaço da marca.">
        <div className="flex flex-wrap items-center gap-8">
          <ProtectionArea width={180} />
          <ProtectionArea width={180} tone="branco" bg="bg-black" theme="dark" />
          <ProtectionArea width={180} tone="branco" bg="bg-night" theme="dark" />
          <ProtectionArea width={180} tone="branco" bg="bg-petrol" theme="dark" />
          <ProtectionArea mark="monograma" width={120} tone="branco" bg="bg-black" theme="dark" />
        </div>
        <BrandNote>A área de proteção vale para todas as versões do logotipo e do monograma.</BrandNote>
      </BrandBlock>

      <BrandBlock title="Usos incorretos" lead="Preservar a integridade da marca.">
        <BrandLabel>O que não fazer</BrandLabel>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {wrongUses.map((u) => (
            <li key={u.caption}>
              <div
                className="flex h-36 items-center justify-center overflow-hidden rounded-lg border border-line-subtle bg-base text-content"
                data-theme="light"
              >
                {u.tile}
              </div>
              <p className="mt-3 flex items-start gap-2 text-label text-content-mid">
                <span
                  aria-hidden
                  className="inline-flex size-6 shrink-0 items-center justify-center rounded-[100%] border border-brand-text text-brand-text"
                >
                  <Icon name="close" size={14} />
                </span>
                <span>{u.caption}</span>
              </p>
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <BrandLabel>Uso correto</BrandLabel>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex h-32 items-center justify-center rounded-lg bg-night">
              <Logo tone="branco" width={170} />
            </div>
            <div className="flex h-32 items-center justify-center rounded-lg bg-petrol">
              <Logo tone="branco" width={170} />
            </div>
            <div className="flex h-32 items-center justify-center rounded-lg border border-line-subtle bg-base text-content" data-theme="light">
              <Logo width={170} />
            </div>
          </div>
        </div>
        <BrandNote>A lista não é exaustiva. Use sempre as versões do brandbook, respeitando cores, proporções e área de proteção.</BrandNote>
      </BrandBlock>
    </Section>
  ),
};
