import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Accordion, AccordionItem } from "./Accordion";

const secoes = [
  {
    value: "requisitos",
    title: "Requisitos",
    body: "Mulher entre 30 e 45 anos, naturalidade diante da câmera e boa dicção.",
  },
  {
    value: "agenda",
    title: "Agenda",
    body: "Testes em 3 de março. Gravação de 12 a 14 de março, em São Paulo.",
  },
  {
    value: "cache",
    title: "Cachê e pagamento",
    body: "R$ 2.500 por diária, pagos em até 30 dias após a gravação.",
  },
];

function itens() {
  return secoes.map((s) => (
    <AccordionItem key={s.value} value={s.value} title={s.title}>
      {s.body}
    </AccordionItem>
  ));
}

const meta = {
  title: "Conteúdo/Accordion",
  component: Accordion,
  subcomponents: { AccordionItem },
  tags: ["autodocs"],
  args: { type: "single", divided: true },
  argTypes: {
    type: { control: "inline-radio", options: ["single", "multiple"] },
    headingLevel: { control: "inline-radio", options: [2, 3, 4, 5, 6] },
  },
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
**O que é.** Lista de seções que expandem e recolhem. Cabeçalho de 13px em maiúsculas com ícone \`plus\`/\`minus\`; linha de 1px \`line-subtle\` entre itens.

**Quando usar.** Detalhes do casting (personagens, datas de gravação, direitos de imagem), perguntas frequentes, grupos de filtros dentro do \`Drawer\`.

**Quando não usar.** Para conteúdo que o usuário precisa comparar lado a lado, ou quando só há uma seção (mostre aberta). Para navegação entre vistas use abas.

**Anatomia.** \`Accordion\` (contêiner, linha superior) · \`AccordionItem\` (título em \`<h3>\` com \`<button>\`, ícone, região de conteúdo, linha inferior).

**Acessibilidade.** Padrão WAI-ARIA Accordion: cada cabeçalho é um \`<button aria-expanded aria-controls>\` dentro de um título (\`headingLevel\`, padrão 3); o painel é \`role="region"\` rotulado pelo botão e usa \`hidden\` quando fechado. Enter/Espaço alternam; ↑/↓ movem entre cabeçalhos; Home/End vão ao primeiro/último. \`type="single"\` abre um de cada vez; \`multiple\` permite vários. Controlado (\`value\`/\`onValueChange\`) ou não (\`defaultValue\`).
        `,
      },
    },
  },
  render: (args) => (
    <div className="max-w-[480px]">
      <Accordion {...args}>{itens()}</Accordion>
    </div>
  ),
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = { name: "Único", args: { defaultValue: ["requisitos"] } };
export const Multiple: Story = { name: "Múltiplo", args: { type: "multiple", defaultValue: ["requisitos", "agenda"] } };
export const SemLinhas: Story = { name: "Sem linhas", args: { divided: false } };

export const Estados: Story = {
  render: (args) => (
    <div className="max-w-[480px]">
      <Accordion {...args} defaultValue={["aberto"]}>
        <AccordionItem value="aberto" title="Aberto">
          Conteúdo visível.
        </AccordionItem>
        <AccordionItem value="fechado" title="Fechado">
          Conteúdo oculto.
        </AccordionItem>
        <AccordionItem value="desabilitado" title="Desabilitado" disabled>
          Indisponível.
        </AccordionItem>
      </Accordion>
    </div>
  ),
};

export const Controlado: Story = {
  render: function Render(args) {
    const [value, setValue] = useState<string[]>(["agenda"]);
    return (
      <div className="flex max-w-[480px] flex-col gap-4">
        <p className="text-label text-content-low">Abertos: {value.join(", ") || "nenhum"}</p>
        <Accordion {...args} type="multiple" value={value} onValueChange={setValue}>
          {itens()}
        </Accordion>
      </div>
    );
  },
};

export const Playground: Story = { name: "Área de testes" };
