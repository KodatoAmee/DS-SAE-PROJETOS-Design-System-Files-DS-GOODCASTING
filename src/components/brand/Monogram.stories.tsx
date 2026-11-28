import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";
import { cn } from "../../lib/cn";
import { Monogram } from "./Monogram";

/** Moldura com o fundo indicado pelo brandbook para cada versão. */
function Fundo({ label, className, theme, children }: { label: string; className: string; theme?: "light" | "dark"; children: ReactNode }) {
  return (
    <figure className="m-0 flex flex-col gap-2">
      <div data-theme={theme} className={cn("flex min-h-40 items-center justify-center border border-line-subtle px-10 py-8", className)}>
        {children}
      </div>
      <figcaption className="text-label-s text-content-mid">{label}</figcaption>
    </figure>
  );
}

const meta = {
  title: "Marca/Monograma",
  component: Monogram,
  tags: ["autodocs"],
  args: { tone: "auto", width: 120, alt: "GD Casting" },
  argTypes: {
    tone: { control: "inline-radio", options: ["auto", "preto", "branco"] },
    width: { control: { type: "range", min: 32, max: 320, step: 4 } },
    alt: { control: "text" },
  },
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
**O que é.** Monograma GD Casting®: símbolo para espaços pequenos (avatar, favicon, ícone do app, telas de acesso).

**Versões.** \`preto\`: sobre fundo claro. \`branco\`: sobre preto ou azul-noite (p. 18). \`auto\`: preto no claro, branco no escuro.

**Tamanho.** Sem mínimo oficial: o brandbook não define valor para o monograma (pendente). Use-o onde o logotipo não cabe em 120px.

**Não fazer.** Alterar cor ou proporção, girar ou aplicar efeitos.

**Acessibilidade.** \`alt="GD Casting"\` por padrão; use \`alt=""\` quando for decorativo ao lado do nome. Em \`auto\`, a versão oculta sai da árvore de acessibilidade.

**Arquivos.** Redesenho provisório; o texto Casting usa fonte do sistema quando renderizado como imagem. Substituir pelo vetor oficial.
        `,
      },
    },
  },
} satisfies Meta<typeof Monogram>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preto: Story = {
  args: { tone: "preto" },
  render: (args) => (
    <Fundo label="Sobre branco" theme="light" className="bg-white">
      <Monogram {...args} />
    </Fundo>
  ),
};

export const Branco: Story = {
  args: { tone: "branco" },
  render: (args) => (
    <div className="grid gap-6 sm:grid-cols-2">
      <Fundo label="Sobre preto" className="bg-black">
        <Monogram {...args} />
      </Fundo>
      <Fundo label="Sobre azul-noite" className="bg-night">
        <Monogram {...args} />
      </Fundo>
    </div>
  ),
};

export const Auto: Story = {
  name: "Auto (segue o tema)",
  args: { tone: "auto" },
  render: (args) => (
    <div className="grid gap-6 sm:grid-cols-2">
      <Fundo label='Ilha data-theme="light": preto' theme="light" className="bg-base">
        <Monogram {...args} />
      </Fundo>
      <Fundo label='Ilha data-theme="dark": branco' theme="dark" className="bg-base">
        <Monogram {...args} />
      </Fundo>
    </div>
  ),
};
