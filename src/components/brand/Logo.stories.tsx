import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";
import { cn } from "../../lib/cn";
import { Logo } from "./Logo";

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
  title: "Marca/Logo",
  component: Logo,
  tags: ["autodocs"],
  args: { tone: "auto", width: 200, alt: "Good Casting" },
  argTypes: {
    tone: { control: "inline-radio", options: ["auto", "principal", "negativa", "branco", "preto"] },
    width: { control: { type: "range", min: 120, max: 400, step: 4 } },
    alt: { control: "text" },
  },
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
**O que é.** Logotipo Good Casting nas versões do brandbook, mais \`auto\`, que segue o tema.

**Versões.** \`principal\`: texto preto #000000 e circuito ciano, sobre fundo claro (preferencial). \`negativa\`: branco com circuito ciano, sobre preto (p. 17). \`branco\`: tudo branco, sobre preto ou azul-noite (p. 18). \`preto\`: monocromática, quando a principal não garantir contraste. \`auto\`: principal no claro, negativa no escuro.

**Tamanho.** Mínimo 120px (brandbook p. 15); recomendado 200px. Abaixo disso, use o Monogram. Larguras menores são elevadas a 120 e, em desenvolvimento, geram aviso no console.

**Não fazer.** Alterar cor ou proporção, girar, aplicar efeitos ou usar sobre fundo sem contraste (p. 19).

**Acessibilidade.** \`alt="Good Casting"\` por padrão; use \`alt=""\` quando o nome já estiver escrito ao lado. Em \`auto\`, a versão oculta sai da árvore de acessibilidade.

**Arquivos.** De referência: serão substituídos pelos vetores oficiais quando a marca os fornecer.
        `,
      },
    },
  },
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Principal: Story = {
  args: { tone: "principal" },
  render: (args) => (
    <Fundo label="Sobre branco" theme="light" className="bg-white">
      <Logo {...args} />
    </Fundo>
  ),
};

export const Negativa: Story = {
  args: { tone: "negativa" },
  render: (args) => (
    <Fundo label="Sobre preto" className="bg-black">
      <Logo {...args} />
    </Fundo>
  ),
};

export const Branco: Story = {
  args: { tone: "branco" },
  render: (args) => (
    <div className="grid gap-6 sm:grid-cols-2">
      <Fundo label="Sobre preto" className="bg-black">
        <Logo {...args} />
      </Fundo>
      <Fundo label="Sobre azul-noite" className="bg-night">
        <Logo {...args} />
      </Fundo>
    </div>
  ),
};

export const Preto: Story = {
  name: "Preto (monocromática)",
  args: { tone: "preto" },
  render: (args) => (
    <Fundo label="Sobre branco" theme="light" className="bg-white">
      <Logo {...args} />
    </Fundo>
  ),
};

export const Auto: Story = {
  name: "Auto (segue o tema)",
  args: { tone: "auto" },
  render: (args) => (
    <div className="grid gap-6 sm:grid-cols-2">
      <Fundo label='Ilha data-theme="light": principal' theme="light" className="bg-base">
        <Logo {...args} />
      </Fundo>
      <Fundo label='Ilha data-theme="dark": negativa' theme="dark" className="bg-base">
        <Logo {...args} />
      </Fundo>
    </div>
  ),
};
