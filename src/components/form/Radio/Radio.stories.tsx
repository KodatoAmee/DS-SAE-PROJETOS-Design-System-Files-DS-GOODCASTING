import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Radio, RadioGroup } from "./Radio";

const meta = {
  title: "Formulário/Radio",
  component: RadioGroup,
  subcomponents: { Radio },
  tags: ["autodocs"],
  args: {
    legend: "Formato do teste",
    defaultValue: "presencial",
    children: null,
  },
  render: (args) => (
    <RadioGroup {...args}>
      <Radio value="presencial" label="Teste presencial" description="Na produtora, em São Paulo" />
      <Radio value="selftape" label="Self-tape" description="Envie o vídeo em até 48h" />
      <Radio value="online" label="Chamada de vídeo" description="Horário marcado pela produtora" />
    </RadioGroup>
  ),
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
**O que é.** Escolha única entre opções. \`Radio\` é **quadrado** (raio 0 em tudo, por coerência com o sistema) com um ponto quadrado interno de 8px quando marcado. \`RadioGroup\` agrupa, dá \`name\` comum e controla o valor.

**Quando usar.** De 2 a ~5 opções mutuamente exclusivas que valem a pena ver todas de uma vez (formato do teste, disponibilidade).

**Quando não usar.** Opções independentes (use \`Checkbox\`). Listas longas (use \`Select\`). Categorias e perfis (use \`ChipSelector\`).

**Anatomia.** \`<fieldset>\` · \`<legend>\` (12px maiúsculas) · opções (caixa 16px · ponto · rótulo 12px · descrição 11px) · ajuda ou erro.

**Acessibilidade.** Inputs \`radio\` nativos, visualmente ocultos: setas movem e marcam, Tab entra e sai do grupo (comportamento do navegador). O \`<fieldset>\` recebe \`role="radiogroup"\`, \`aria-labelledby\` na legenda, \`aria-invalid\`/\`aria-required\` e \`aria-describedby\` para ajuda/erro. Controlado (\`value\` + \`onValueChange\`) ou não (\`defaultValue\`).
        `,
      },
    },
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Vertical: Story = {};

export const Horizontal: Story = {
  args: { legend: "Tratamento", orientation: "horizontal", defaultValue: "" },
  render: (args) => (
    <RadioGroup {...args}>
      <Radio value="sra" label="Sra." />
      <Radio value="sr" label="Sr." />
      <Radio value="nd" label="Prefiro não dizer" />
    </RadioGroup>
  ),
};

export const Controlado: Story = {
  render: (args) => {
    const [value, setValue] = useState("pix");
    return (
      <div className="flex flex-col gap-4">
        <RadioGroup {...args} legend="Pagamento" value={value} onValueChange={setValue}>
          <Radio value="cartao" label="Cartão de crédito" />
          <Radio value="pix" label="Pix" />
          <Radio value="boleto" label="Boleto" />
        </RadioGroup>
        <p className="text-label-s font-normal text-content-mid">Selecionado: {value}</p>
      </div>
    );
  },
};

export const Estados: Story = {
  render: () => (
    <div className="flex flex-col gap-10">
      <RadioGroup legend="Com erro" required error="Escolha um formato de teste.">
        <Radio value="a" label="Opção A" />
        <Radio value="b" label="Opção B" />
      </RadioGroup>
      <RadioGroup legend="Grupo desabilitado" defaultValue="a" disabled>
        <Radio value="a" label="Opção A" />
        <Radio value="b" label="Opção B" />
      </RadioGroup>
      <RadioGroup legend="Uma opção desabilitada" defaultValue="a" helperText="A opção B não está disponível na sua região.">
        <Radio value="a" label="Opção A" />
        <Radio value="b" label="Opção B" disabled />
      </RadioGroup>
    </div>
  ),
};

export const Desabilitado: Story = {
  render: () => (
    <RadioGroup legend="Formato do teste" defaultValue="presencial" disabled>
      <Radio value="presencial" label="Teste presencial" description="Na produtora, em São Paulo" />
      <Radio value="selftape" label="Self-tape" description="Envie o vídeo em até 48h" />
      <Radio value="online" label="Chamada de vídeo" description="Horário marcado pela produtora" />
    </RadioGroup>
  ),
};

export const Playground: Story = { name: "Área de testes" };
