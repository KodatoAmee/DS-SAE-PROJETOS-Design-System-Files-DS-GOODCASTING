import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";
import { Logo } from "../components/brand";
import { Icon, iconNames } from "../components/icon";

const meta = {
  title: "Fundações",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Fundações do DS-GoodCasting. Marca do brandbook Good Casting (Azul Tiffany #81D8D0, preto, branco; Playfair Display + Inter); apoio e feedback do GC-DS2 / app. Fonte canônica: `tokens/tokens.json`; runtime: `src/styles/theme.css`.",
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
  { token: "night", cls: "bg-night", use: "Fundo da versão negativa" },
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
      note="Preto, branco e Azul Tiffany (#81D8D0), como no brandbook. Tiffany não leva texto branco: use texto preto sobre ele (13:1) e `brand-text` (#057571) para links. Troque o tema na barra para ver as semânticas mudarem."
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

const typeScale: { cls: string; name: string; spec: string; caps?: boolean }[] = [
  { cls: "text-display font-display", name: "display", spec: "28/34 · Playfair" },
  { cls: "text-heading font-display", name: "heading", spec: "20/28 · Playfair" },
  { cls: "text-title font-semibold", name: "title", spec: "18/24" },
  { cls: "text-title-s font-medium", name: "title-s", spec: "16/24" },
  { cls: "text-body", name: "body", spec: "14/20" },
  { cls: "text-action font-medium", name: "action", spec: "15/20" },
  { cls: "text-label", name: "label", spec: "13/18" },
  { cls: "text-label-s", name: "label-s", spec: "12/16" },
  { cls: "text-caption", name: "caption", spec: "10/14" },
];

export const Tipografia: Story = {
  render: () => (
    <Section
      title="Tipografia"
      note="Duas famílias, como no logotipo: Playfair Display (serifada clássica, GOOD: sofisticação, autoridade) em títulos; Inter (sem serifa, CASTING: clareza, modernidade) em todo o resto. 14px é a base; 400 texto, 500 ações, 600 títulos."
    >
      <div className="divide-y divide-line-subtle border-y border-line-subtle">
        {typeScale.map((t) => (
          <div key={t.name} className="grid grid-cols-[120px_80px_1fr] items-baseline gap-4 py-4">
            <span className="text-label-s text-content-mid">{t.name}</span>
            <span className="text-label-s text-content-mid">{t.spec}</span>
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
    <Section title="Iconografia" note="Traço 1px, terminação quadrada, grade 20x20, sem preenchimento. Decorativo por padrão; passe `label` quando o ícone for o único rótulo.">
      <div className="grid grid-cols-3 gap-6 md:grid-cols-6">
        {iconNames.map((n) => (
          <div key={n} className="flex flex-col items-center gap-2 border border-line-subtle py-6">
            <Icon name={n} />
            <span className="text-caption text-content-mid">{n}</span>
          </div>
        ))}
      </div>
    </Section>
  ),
};

export const Marca: Story = {
  render: () => (
    <Section
      title="Marca"
      note="Logotipo oficial (brandbook p. 10–21). Usar só os arquivos oficiais; não distorcer, recolorir, girar nem aplicar sombra. Área de proteção = altura do G. Mínimo no DS 84px (o brandbook pede 120px); recomendado 200px."
    >
      <div className="grid gap-6 md:grid-cols-3">
        <div className="flex h-48 items-center justify-center rounded-lg border border-line-subtle bg-base p-8" data-theme="light">
          <Logo width={200} />
        </div>
        <div className="flex h-48 items-center justify-center rounded-lg bg-black p-8">
          <Logo tone="branco" width={200} />
        </div>
        <div className="flex h-48 items-center justify-center rounded-lg bg-night p-8">
          <Logo tone="branco" width={200} />
        </div>
      </div>
      <p className="mt-4 text-label-s text-content-mid">Principal · Negativa (preto) · Negativa (noite)</p>
      <div className="mt-10 grid max-w-[720px] gap-6 md:grid-cols-2">
        <div>
          <p className="font-display text-display">GOOD</p>
          <p className="text-body text-content-mid">Playfair Display. Elegância, confiança, credibilidade.</p>
        </div>
        <div>
          <p className="text-display tracking-wide">CASTING</p>
          <p className="text-body text-content-mid">Inter. Clareza, especialização, modernidade.</p>
        </div>
      </div>
    </Section>
  ),
};
