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
**O que é.** Chips em pílula para escolher uma opção (\`radiogroup\`) ou várias (\`multiple\`, botões \`aria-pressed\`). Selecionado, nos dois modos: ícone de check, borda \`inverse\` (preta no claro, branca no escuro) e fundo \`brand-soft\`. Não selecionado: borda \`line-subtle\`, que escurece para \`line-field\` no hover (nunca imita o selecionado).

**Quando usar.** Categoria do casting, perfis do talento (ator, modelo, locutor), idiomas, gênero, filtros da busca. Até ~10 opções curtas.

**Quando não usar.** Listas longas (use \`Select\` ou \`SearchField\`) ou ligar/desligar uma opção (use \`Switch\`).

**Anatomia.** Rótulo · chips (40px de altura, \`text-label\` 13/18, peso 500; check de 16px no selecionado) · ajuda ou erro. O check ocupa parte do padding lateral: o chip tem a mesma largura selecionado ou não, e a linha não se rearruma ao clicar.

**Acessibilidade.** Escolha única: padrão ARIA \`radiogroup\`, Tab entra no selecionado e as setas movem e selecionam. Várias: cada chip é um botão com \`aria-pressed\`. Nos dois modos a cor não é a única pista (WCAG 1.4.1): o check e a borda \`inverse\` marcam o selecionado, com 21:1 contra o fundo da página e 14:1 (claro) / 11,4:1 (escuro) contra a borda do não selecionado. Com \`max\` atingido, os demais ficam \`aria-disabled\`.
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
      <ChipSelector label="Escolha única, nada selecionado" options={categorias} />
      <ChipSelector label="Escolha única, selecionado" options={categorias} defaultValue={["Cinema"]} />
      <ChipSelector label="Várias, duas selecionadas" options={perfis} multiple defaultValue={["Modelo", "Locutor"]} />
      <ChipSelector
        label="Uma opção desabilitada"
        options={[{ value: "Feminino" }, { value: "Masculino" }, { value: "Não binário" }, { value: "Indiferente", disabled: true }]}
        defaultValue={["Não binário"]}
      />
      <ChipSelector label="Com erro" options={categorias} error="Selecione uma categoria" required />
    </div>
  ),
};

export const Playground: Story = { name: "Área de testes" };
