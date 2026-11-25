import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { ChipSelector } from "./ChipSelector";

const categorias = ["Publicidade", "Cinema", "Televisão", "Moda", "Teatro", "Videoclipe"].map((v) => ({ value: v }));
const perfis = ["Ator / Atriz", "Modelo", "Figurante", "Locutor", "Bailarino", "Influencer", "Músico"].map((v) => ({ value: v }));

const meta = {
  title: "Formulário/ChipSelector",
  component: ChipSelector,
  tags: ["autodocs"],
  args: { label: "Categoria", options: categorias, defaultValue: ["Publicidade"] },
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
**O que é.** Chips em pílula para escolher uma opção (\`radiogroup\`) ou várias (\`multiple\`, botões \`aria-pressed\`). Selecionado: fundo \`brand-soft\`, borda Tiffany e, em \`multiple\`, ícone de check.

**Quando usar.** Categoria do casting, perfis do talento (ator, modelo, locutor), idiomas, gênero, filtros da busca. Até ~10 opções curtas.

**Quando não usar.** Listas longas (use \`Select\` ou \`SearchField\`) ou ligar/desligar uma opção (use \`Switch\`).

**Anatomia.** Rótulo · chips (40px de altura, 13px 500) · ajuda ou erro.

**Acessibilidade.** Escolha única: padrão ARIA \`radiogroup\`, Tab entra no selecionado e as setas movem e selecionam. Várias: cada chip é um botão com \`aria-pressed\` e o check reforça o estado (cor não é a única pista). Com \`max\` atingido, os demais ficam \`aria-disabled\`.
        `,
      },
    },
  },
} satisfies Meta<typeof ChipSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EscolhaUnica: Story = { name: "Escolha única" };

export const Varias: Story = {
  name: "Várias (perfis)",
  args: { label: "Perfis", options: perfis, multiple: true, defaultValue: ["Modelo", "Ator / Atriz"] },
};

export const ComLimite: Story = {
  name: "Com limite",
  args: { label: "Perfis (até 3)", options: perfis, multiple: true, max: 3, helperText: "Escolha até 3 perfis." },
  render: (args) => {
    const [v, setV] = useState<string[]>(["Modelo"]);
    return <ChipSelector {...args} value={v} onValueChange={setV} />;
  },
};

export const Estados: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <ChipSelector
        label="Gênero"
        options={[{ value: "Feminino" }, { value: "Masculino" }, { value: "Não binário" }, { value: "Indiferente", disabled: true }]}
      />
      <ChipSelector label="Categoria" options={categorias} error="Selecione uma categoria" required />
    </div>
  ),
};
