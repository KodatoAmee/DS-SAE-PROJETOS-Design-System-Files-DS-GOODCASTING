import type { Meta, StoryObj } from "@storybook/react-vite";
import { StatusBadge, candidacyStatus, type CandidacyStatus } from "./StatusBadge";

const meta = {
  title: "Conteúdo/StatusBadge",
  component: StatusBadge,
  tags: ["autodocs"],
  args: { status: "analise" },
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
**O que é.** Pílula de estado com ponto de cor. O atalho \`status\` cobre os estados de candidatura do app.

**Quando usar.** Estado da candidatura no \`CastingCard\`, estado do casting (aberto, encerrado) e do perfil (verificado, incompleto).

**Quando não usar.** Para categorias ou habilidades (use \`Tag\`) ou filtros clicáveis (use \`ChipSelector\`).

**Anatomia.** Ponto (decorativo) · texto 12px 500.

**Acessibilidade.** O texto carrega o significado; a cor é reforço (WCAG 1.4.1). Textos de tom com contraste AA.
        `,
      },
    },
  },
} satisfies Meta<typeof StatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = { name: "Padrão" };

export const Candidatura: Story = {
  name: "Estados de candidatura",
  render: () => (
    <div className="flex flex-wrap gap-2">
      {(Object.keys(candidacyStatus) as CandidacyStatus[]).map((s) => (
        <StatusBadge key={s} status={s} />
      ))}
    </div>
  ),
};

export const Tons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {(["neutral", "brand", "info", "success", "warning", "danger"] as const).map((t) => (
        <StatusBadge key={t} tone={t}>
          {t}
        </StatusBadge>
      ))}
    </div>
  ),
};
