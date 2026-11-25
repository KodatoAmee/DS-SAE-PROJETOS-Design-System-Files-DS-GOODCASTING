import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { NumberStepper } from "./NumberStepper";

const meta = {
  title: "Formulário/NumberStepper",
  component: NumberStepper,
  tags: ["autodocs"],
  args: { min: 140, max: 210, defaultValue: 170, unit: "cm", label: "Altura" },
  argTypes: {
    size: { control: "inline-radio", options: ["s", "m"] },
  },
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
**O que é.** Contador \`−  170 cm  +\` para números curtos do perfil e do casting. Botões só de ícone, valor em 15px 500 e unidade opcional.

**Quando usar.** Altura, idade, anos de experiência, número de vagas ou personagens no cadastro do casting.

**Quando não usar.** Números grandes ou livres (use \`TextField\` com \`inputMode="numeric"\`) ou faixas (idade 25–35: use dois campos).

**Anatomia.** Grupo · botão diminuir (\`minus\`) · valor + unidade · botão aumentar (\`plus\`).

**Acessibilidade.** \`role="group"\` com nome (\`label\`, padrão "Valor"). Botões "Diminuir"/"Aumentar" com \`aria-controls\` no valor. O valor é um \`<output aria-live="polite">\`: cada mudança é anunciada com a unidade. No limite, o botão recebe \`aria-disabled\` (não \`disabled\`) para não perder o foco. \`size="m"\` dá alvos de 44px.
        `,
      },
    },
  },
} satisfies Meta<typeof NumberStepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = { name: "Padrão" };

export const Toque: Story = { args: { size: "m" } };

export const Controlado: Story = {
  args: { min: 1, max: 50, unit: "vagas", label: "Vagas" },
  render: (args) => {
    const [slots, setSlots] = useState(4);
    return (
      <div className="flex flex-col gap-4">
        <NumberStepper {...args} value={slots} onValueChange={setSlots} />
        <p className="text-label-s text-content-mid">O casting aceita {slots} talentos.</p>
      </div>
    );
  },
};

export const Estados: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-4">
      <NumberStepper defaultValue={18} min={18} max={99} unit="anos" label="Idade no mínimo" />
      <NumberStepper defaultValue={5} min={0} max={5} unit="anos" label="Experiência no máximo" />
      <NumberStepper defaultValue={2} disabled label="Desabilitado" />
    </div>
  ),
};

export const Playground: Story = { name: "Área de testes" };
