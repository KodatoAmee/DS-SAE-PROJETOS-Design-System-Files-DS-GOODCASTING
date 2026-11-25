import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { fn } from "storybook/test";
import { TalentCard } from "./TalentCard";

const meta = {
  title: "Conteúdo/TalentCard",
  component: TalentCard,
  tags: ["autodocs"],
  args: {
    name: "Ana Ribeiro",
    href: "#",
    age: 28,
    location: "Rio de Janeiro",
    skills: ["Atriz", "Modelo", "Inglês fluente", "Dança"],
  },
  decorators: [
    (Story) => (
      <div className="max-w-[240px]">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
**O que é.** Cartão de talento: foto 3:4, nome artístico, idade · cidade e até 3 perfis (o resto vira "+N").

**Quando usar.** Em \`CardGrid kind="talents"\`, na busca e na shortlist do diretor de casting, e nos candidatos de um personagem.

**Quando não usar.** Para o perfil completo (monte a página) ou para listar castings (use \`CastingCard\`).

**Anatomia.** Foto (pílula Tiffany de compatibilidade opcional) · nome + selo de verificado · metadados · perfis (\`Tag\`) · coração opcional.

**Acessibilidade.** \`<article>\` rotulado pelo nome. Link único estendido sobre o cartão. O coração fica fora do link, com \`aria-pressed\`. Foto com \`alt=""\`: o nome já a descreve. Selo de verificado com nome acessível "Perfil verificado".
        `,
      },
    },
  },
} satisfies Meta<typeof TalentCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = { name: "Padrão" };

export const Compatibilidade: Story = {
  name: "Com compatibilidade",
  args: { match: 92, verified: true },
};

export const Favoritar: Story = {
  name: "Favoritar (interativo)",
  args: { onSavedChange: fn() },
  render: (args) => {
    const [saved, setSaved] = useState(false);
    return <TalentCard {...args} saved={saved} onSavedChange={(v) => { setSaved(v); args.onSavedChange?.(v); }} />;
  },
};
