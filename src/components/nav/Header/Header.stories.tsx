import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Logo } from "../../brand";
import { MenuDrawer } from "../MenuDrawer";
import { Header, type HeaderAction, type HeaderProps } from "./Header";

/** Logotipo Good Casting, versão preta (monocromática). */
const logo = (
  <a href="#" aria-label="Good Casting, início">
    <Logo tone="preto" width={84} alt="" />
  </a>
);

const actions: HeaderAction[] = [
  { label: "Notificações", icon: "info", count: 0, href: "#notificacoes" },
  { label: "Entrar", icon: "user", href: "#entrar" },
  { label: "Ajuda", icon: "help", href: "#ajuda" },
];

const noop = () => {};

const meta = {
  title: "Navegação/Header",
  component: Header,
  tags: ["autodocs"],
  args: {
    logo,
    actions,
    search: { onClick: noop },
    onMenuClick: noop,
    variant: "transparent",
    sticky: false,
  },
  argTypes: {
    variant: { control: "inline-radio", options: ["transparent", "solid"] },
    sticky: { control: "boolean" },
    menuOpen: { control: "boolean" },
    logo: { control: false },
  },
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
**O que é.** Cabeçalho global editorial, com o mesmo layout em todos os breakpoints (altura 48px). À esquerda, o botão de menu (hambúrguer de 3 linhas, 20x13, traço 1px) e o logotipo logo ao lado. À direita, pesquisa e ações como ícones 20px em alvos 40x40 (ações sem \`icon\` aparecem em texto).

**Quando usar.** No topo de todas as páginas da plataforma. \`transparent\` sobre mídia editorial (hero, campanha); \`solid\` (\`bg-base\`) sobre listagens e quando o conteúdo rola por baixo com \`sticky\`.

**Quando não usar.** Para navegação dentro de uma seção use \`Tabs\` ou \`Breadcrumbs\`. Não coloque mais de 3 ou 4 ações: o resto vai para o \`MenuDrawer\`.

**Anatomia.** Botão de menu · logotipo (slot \`logo\`) · pesquisa · lista de ações (\`label\`, \`href\`/\`onClick\`, \`icon\`, \`count\`). Abaixo de \`md\` (768px): altura 48, padding 20/12, ícones 20px em alvos 40x40. De \`md\` em diante: rótulos de texto.

**Acessibilidade.** Raiz \`<header>\` (landmark *banner*). O botão de menu tem \`aria-expanded\`, nome "Abrir menu"/"Fechar menu" e \`aria-controls\` apontando para a gaveta (via \`menuId\`) enquanto aberta. No mobile cada ícone recebe o rótulo como nome acessível, com o contador ("Notificações, 0"). Ações com \`href\` viram links; sem, botões.
        `,
      },
    },
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Sobre mídia: o cabeçalho é posicionado por cima do conteúdo pelo consumidor. */
export const Transparente: Story = {
  render: (args) => (
    <div className="relative">
      <Header {...args} className="absolute" />
      <div className="aspect-[2/3] w-full bg-muted md:aspect-[16/9]" />
    </div>
  ),
};

export const Solido: Story = {
  name: "Sólido",
  args: { variant: "solid" },
};

export const Fixo: Story = {
  args: { variant: "solid", sticky: true },
  render: (args) => (
    <div>
      <Header {...args} />
      <div className="flex flex-col gap-4 p-5 md:px-20">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="aspect-[2/3] w-full max-w-sm bg-muted" />
        ))}
      </div>
    </div>
  ),
};

export const SemPesquisaNemIcones: Story = {
  name: "Ações só em texto",
  args: {
    search: undefined,
    actions: [
      { label: "Salvos", count: 2, href: "#salvos" },
      { label: "Ajuda", href: "#ajuda" },
    ],
  },
};

export const MenuAberto: Story = {
  name: "Estado: menu aberto (X)",
  args: { menuOpen: true },
};

function HeaderComMenu(props: HeaderProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Header
        {...props}
        menuOpen={open}
        menuId="menu-principal"
        onMenuClick={() => setOpen((v) => !v)}
      />
      <MenuDrawer
        id="menu-principal"
        open={open}
        onOpenChange={setOpen}
        sections={[
          {
            id: "castings",
            label: "Castings",
            items: [
              { label: "Novos", href: "#" },
              { label: "Publicidade", href: "#" },
              { label: "Cinema", href: "#" },
              { label: "Televisão", href: "#" },
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
        ]}
      />
      <div className="aspect-[16/9] w-full bg-muted" />
    </>
  );
}

export const ComMenuDrawer: Story = {
  name: "Com MenuDrawer",
  render: (args) => <HeaderComMenu {...args} />,
};

export const Playground: Story = { name: "Área de testes" };
