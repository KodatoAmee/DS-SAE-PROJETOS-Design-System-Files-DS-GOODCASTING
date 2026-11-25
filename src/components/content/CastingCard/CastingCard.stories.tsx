import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { fn } from "storybook/test";
import { CastingCard } from "./CastingCard";

const meta = {
  title: "Conteúdo/CastingCard",
  component: CastingCard,
  tags: ["autodocs"],
  args: {
    title: "Campanha de verão — marca de cosméticos",
    href: "#",
    category: "Publicidade",
    location: "São Paulo",
    roles: 3,
    slots: 6,
    deadline: { text: "Encerra em 5 dias" },
    fee: { amount: 2500, upTo: true },
  },
  decorators: [
    (Story) => (
      <div className="max-w-[380px]">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
**O que é.** Cartão de casting da timeline do talento (fonte: \`TalentCastingCard\` do app). Capa 16:9 com categoria, estado da candidatura, título, local · personagens · vagas, prazo e cachê.

**Quando usar.** Em \`CardGrid kind="castings"\` ou \`Carousel\`, na timeline, busca e salvos do talento.

**Quando não usar.** Para o detalhe do casting (monte a página com \`FeeLabel\`, \`StatusBadge\`, \`Accordion\`) ou para listar talentos (use \`TalentCard\`).

**Anatomia.** Capa (categoria, faixa "prazo expirado") · \`StatusBadge\` opcional · título 2 linhas · metadados · prazo + \`FeeLabel\` · "Seu personagem" opcional · coração opcional.

**Acessibilidade.** \`<article>\` rotulado pelo título. Um único link, no título, estendido sobre o cartão com \`::after\`. O coração fica **fora** do link, com \`aria-pressed\` e nome "Salvar <título>". Prazo urgente usa texto vermelho **e** a frase do prazo (cor não é a única pista).
        `,
      },
    },
  },
} satisfies Meta<typeof CastingCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = { name: "Padrão" };

export const ComCandidatura: Story = {
  name: "Com candidatura",
  args: {
    status: "analise",
    match: { role: "Mãe, 35–45 anos", percent: 92 },
  },
};

export const PrazoUrgente: Story = {
  name: "Prazo urgente",
  args: { deadline: { text: "Encerra hoje às 18h", urgent: true }, fee: { amount: "a-definir" } },
};

export const Expirado: Story = {
  args: { expired: true, status: "expirado" },
};

export const Salvar: Story = {
  name: "Salvar (interativo)",
  args: { onSavedChange: fn() },
  render: (args) => {
    const [saved, setSaved] = useState(false);
    return <CastingCard {...args} saved={saved} onSavedChange={(v) => { setSaved(v); args.onSavedChange?.(v); }} />;
  },
};
