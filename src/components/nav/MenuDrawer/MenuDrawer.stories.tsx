import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Button } from "../../actions/Button";
import { MenuDrawer, type MenuDrawerProps, type MenuDrawerSection } from "./MenuDrawer";

const sections: MenuDrawerSection[] = [
  {
    id: "castings",
    label: "Castings",
    items: [
      { label: "Novos", href: "#" },
      { label: "Publicidade", href: "#", current: true },
      { label: "Cinema", href: "#" },
      { label: "Televisão", href: "#" },
      { label: "Moda", href: "#" },
      { label: "Teatro", href: "#" },
      { label: "Videoclipe", href: "#" },
      { label: "Encerrando hoje", href: "#" },
    ],
  },
  {
    id: "talentos",
    label: "Talentos",
    items: [
      { label: "Atores e atrizes", href: "#" },
      { label: "Modelos", href: "#" },
      { label: "Locutores", href: "#" },
      { label: "Figurantes", href: "#" },
      { label: "Bailarinos", href: "#" },
    ],
  },
  {
    id: "produtoras",
    label: "Produtoras",
    items: [
      { label: "Publicar casting", href: "#" },
      { label: "Planos", href: "#" },
      { label: "Casos de sucesso", href: "#" },
    ],
  },
  {
    id: "ajuda",
    label: "Ajuda",
    items: [
      { label: "Como funciona", href: "#" },
      { label: "Perguntas frequentes", href: "#" },
      { label: "Fale conosco", href: "#" },
    ],
  },
];

const meta = {
  title: "Navegação/MenuDrawer",
  component: MenuDrawer,
  tags: ["autodocs"],
  args: { sections },
  argTypes: {
    footer: { control: false },
    open: { control: false },
    panelClassName: { control: "text" },
  },
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
**O que é.** Gaveta lateral esquerda com o menu principal: abas verticais de seção (Castings, Talentos, Produtoras…) e a lista de links da seção selecionada, em 15px. A navegação ocupa no máximo 80% da largura da tela (no mobile sobra ao menos 20% de overlay à direita), metade em \`md\` e 1/3 a partir de \`lg\`. O \`footer\`, quando existe, ocupa a largura toda da tela, ancorado embaixo.

**Quando usar.** Como destino do botão de menu do \`Header\`, para a árvore de seções da plataforma.

**Quando não usar.** Para filtros ou detalhes de casting use um painel genérico (Drawer/Modal). Para 2 ou 3 links, prefira ações diretas no \`Header\`.

**Anatomia.** Backdrop \`bg-overlay\` (irmão do painel) · navegação \`bg-base\` (máx. 80% da tela) · botão Fechar no topo, à direita da navegação, 26px abaixo da borda superior · \`Tabs\` verticais · lista de links · \`footer\` opcional na largura toda da tela, com o mesmo fundo. Sem linhas nem bordas: seções e links destacam com fundo Tiffany 20% (\`bg-brand/20\`) e raio \`rounded-xs\` (4px) no hover e no selecionado (seção ativa e link com \`current\`). O selecionado também ganha peso 500. A navegação entra e sai com \`translate-x\` e o rodapé com \`translate-y\`, ambos em 500ms \`ease-in-out\` (instantâneo com \`prefers-reduced-motion\`).

**Acessibilidade.** \`role="dialog"\`, \`aria-modal="true"\`, rotulado pelo título (padrão "Menu", visualmente oculto). Renderizado com \`createPortal\` no \`body\`. Foco vai para "Fechar" ao abrir, fica preso no menu, rodapé incluído (Tab/Shift+Tab) e volta ao gatilho ao fechar. \`Esc\` e clique no backdrop fecham; clicar na navegação ou no rodapé não fecha. Scroll do \`body\` bloqueado enquanto aberto. As abas seguem o padrão WAI-ARIA (setas ↑/↓, Home/End). O link com \`current\` recebe \`aria-current="page"\`. O fundo Tiffany 20% tem contraste baixo com o painel, então nunca é o único sinal: o selecionado também muda de peso (WCAG 1.4.1). Controlado (\`open\` + \`onOpenChange\`) ou não controlado (\`defaultOpen\`).
        `,
      },
    },
  },
} satisfies Meta<typeof MenuDrawer>;

export default meta;
type Story = StoryObj<typeof meta>;

function Demo(props: MenuDrawerProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)} aria-expanded={open}>
        Abrir menu
      </Button>
      <MenuDrawer {...props} open={open} onOpenChange={setOpen} />
    </>
  );
}

export const Padrao: Story = {
  name: "Padrão",
  render: (args) => <Demo {...args} />,
};

export const ComRodape: Story = {
  name: "Com rodapé",
  args: {
    footer: (
      <ul className="flex flex-col gap-2 text-action font-normal">
        <li>
          <a href="#">
            Entrar
          </a>
        </li>
        <li>
          <a href="#">
            Ajuda
          </a>
        </li>
        <li className="text-label-s text-content-low">Brasil / Português</li>
      </ul>
    ),
  },
  render: (args) => <Demo {...args} />,
};

export const SecaoInicial: Story = {
  name: "Seção inicial (Talentos)",
  args: { defaultSection: "talentos" },
  render: (args) => <Demo {...args} />,
};

export const UmaSecao: Story = {
  name: "Uma seção (sem abas)",
  args: { sections: [sections[0]] },
  render: (args) => <Demo {...args} />,
};

export const Playground: Story = {
  name: "Área de testes",
  parameters: {
    docs: {
      description: {
        story:
          "`panelClassName` estiliza o painel de navegação (Fechar, seções e links); experimente `bg-muted` no controle. `className` e os demais atributos vão para o diálogo, a camada de tela cheia e transparente que contém a navegação e o rodapé.",
      },
    },
  },
  render: (args) => <Demo {...args} />,
};
