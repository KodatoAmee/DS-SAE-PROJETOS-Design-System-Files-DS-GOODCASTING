import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Button } from "../../actions/Button";
import { Divider } from "../Divider";
import { MediaPlaceholder } from "../MediaPlaceholder";
import { ChipSelector } from "../../form/ChipSelector";
import { Drawer, type DrawerProps } from "./Drawer";

function Demo({ trigger = "Abrir gaveta", ...args }: DrawerProps & { trigger?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        {trigger}
      </Button>
      <Drawer {...args} open={open} onOpenChange={setOpen} />
    </>
  );
}


const meta = {
  title: "Conteúdo/Drawer",
  component: Drawer,
  tags: ["autodocs"],
  args: { title: "Filtros", side: "right", children: "Conteúdo da gaveta." },
  argTypes: {
    side: { control: "inline-radio", options: ["left", "right", "bottom"] },
  },
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
**O que é.** Painel lateral (ou inferior) que desliza sobre a página: branco, sem sombra, sem raio, backdrop \`rgba(0,0,0,.5)\`. 400px de largura no desktop, largura total no mobile. Transição de 500ms.

**Quando usar.** Filtros da busca, ordenação, detalhes de um personagem no mobile (\`side="bottom"\`): tarefas que pedem contexto da página por trás.

**Quando não usar.** Para confirmações curtas use \`Modal\`. Para a navegação principal use o menu da frente Navegação.

**Anatomia.** Backdrop (irmão do painel) · painel · cabeçalho (título, descrição opcional, Fechar) · corpo rolável · rodapé fixo opcional.

**Acessibilidade.** Mesmo comportamento do \`Modal\`: portal em \`document.body\`, \`role="dialog"\` + \`aria-modal\`, rotulado pelo título, foco preso, Esc fecha, foco devolvido ao gatilho, scroll da página bloqueado. Fica montado durante a animação de saída. \`prefers-reduced-motion\` anula a transição.
        `,
      },
    },
  },
  render: (args) => <Demo {...args} />,
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Direita: Story = {};
export const Esquerda: Story = { args: { side: "left", title: "Ordenar" } };
export const Inferior: Story = {
  args: { side: "bottom", title: "Ordenar por", children: "Mais recentes · Prazo · Maior cachê" },
};

export const Filtros: Story = {
  args: {
    title: "Filtros",
    children: (
      <div className="flex flex-col gap-8">
        <ChipSelector
          label="Categoria"
          multiple
          options={["Publicidade", "Cinema", "Televisão", "Moda", "Teatro"].map((value) => ({ value }))}
        />
        <ChipSelector
          label="Cachê"
          options={["Qualquer", "Até R$ 1.000", "R$ 1.000–5.000", "Acima de R$ 5.000"].map((value) => ({ value }))}
          defaultValue={["Qualquer"]}
        />
        <MediaPlaceholder aspect="16/9" label="Mapa de localização" />
      </div>
    ),
    footer: (
      <>
        <Divider />
        <Button size="l" fullWidth>
          Ver 24 castings
        </Button>
      </>
    ),
  },
  render: (args) => <Demo {...args} trigger="Filtrar castings" />,
};

export const Playground: Story = { name: "Área de testes" };
