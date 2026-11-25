import type { Meta, StoryObj } from "@storybook/react-vite";
import { FeeLabel } from "./FeeLabel";

const meta = {
  title: "Conteúdo/FeeLabel",
  component: FeeLabel,
  tags: ["autodocs"],
  args: { amount: 2500 },
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
**O que é.** Cachê de um casting ou personagem: legenda "Cachê" (12px, \`content-mid\`) e valor em 600.

**Quando usar.** Em \`CastingCard\`, no detalhe do casting e na lista de personagens.

**Quando não usar.** Para pagamentos, faturas ou saldo: não é componente de preço.

**Anatomia.** Legenda opcional · "até" opcional · valor (\`Intl.NumberFormat\`, sem casas decimais) ou "A definir" / "A combinar".

**Acessibilidade.** Texto puro, lido na ordem visual ("Cachê, até R$ 8.000"). Números com \`tabular-nums\`.
        `,
      },
    },
  },
} satisfies Meta<typeof FeeLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = { name: "Padrão" };
export const Ate: Story = { name: "Até (maior cachê)", args: { amount: 8000, upTo: true } };
export const ADefinir: Story = { name: "A definir", args: { amount: "a-definir" } };
export const Euro: Story = { name: "Euro (pt-PT)", args: { amount: 1200, currency: "EUR", locale: "pt-PT" } };
export const Grande: Story = { name: "Tamanho M", args: { amount: 15000, size: "m" } };
