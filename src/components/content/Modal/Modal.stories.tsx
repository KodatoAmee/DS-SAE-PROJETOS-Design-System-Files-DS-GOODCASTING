import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Button } from "../../actions/Button";
import { Modal, type ModalProps } from "./Modal";

function Demo(props: Partial<ModalProps> & { trigger?: string }) {
  const { trigger = "Abrir modal", ...rest } = props;
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        {trigger}
      </Button>
      <Modal
        title="Requisitos do personagem"
        {...rest}
        open={open}
        onOpenChange={(next) => {
          setOpen(next);
          rest.onOpenChange?.(next);
        }}
      />
    </>
  );
}

const meta = {
  title: "Conteúdo/Modal",
  component: Modal,
  tags: ["autodocs"],
  args: {
    title: "Requisitos do personagem",
    children:
      "Mulher entre 30 e 45 anos, naturalidade e boa dicção. Disponibilidade para gravar de 12 a 14 de março.",
  },
  argTypes: {
    size: { control: "inline-radio", options: ["s", "m", "l"] },
  },
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
**O que é.** Diálogo modal centrado: painel branco, sem sombra, sem raio, sobre backdrop \`rgba(0,0,0,.5)\`. Título de 15px em maiúsculas, botão Fechar e rodapé opcional para ações.

**Quando usar.** Decisões curtas que bloqueiam o fluxo: confirmar remoção, requisitos do personagem, aviso legal, escolha de país.

**Quando não usar.** Para listas longas ou filtros use \`Drawer\`. Para avisos que não exigem resposta use \`Toast\` ou \`Banner\`.

**Anatomia.** Backdrop (irmão do painel) · painel · cabeçalho (título, descrição opcional, Fechar) · corpo rolável · rodapé opcional.

**Acessibilidade.** Renderizado com \`createPortal\` em \`document.body\`. \`role="dialog"\`, \`aria-modal="true"\`, rotulado pelo título (\`aria-labelledby\`) e descrito por \`description\`. Ao abrir, o foco vai para o painel (ou \`initialFocusRef\`) e fica preso nele (Tab/Shift+Tab circulam); Esc fecha; ao fechar, o foco volta ao gatilho. Bloqueia o scroll da página. Controlado (\`open\`/\`onOpenChange\`) ou não controlado (\`defaultOpen\`).
        `,
      },
    },
  },
  render: (args) => <Demo {...args} />,
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = { name: "Padrão" };

export const ComRodape: Story = {
  name: "Com rodapé",
  args: {
    title: "Retirar candidatura",
    description: "A candidatura sai da lista do casting. Você pode se candidatar de novo enquanto o prazo estiver aberto.",
    children: undefined,
    size: "s",
  },
  render: function Render(args) {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="secondary" onClick={() => setOpen(true)}>
          Remover
        </Button>
        <Modal
          {...args}
          open={open}
          onOpenChange={setOpen}
          footer={
            <>
              <Button variant="secondary" size="m" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button size="m" onClick={() => setOpen(false)}>
                Remover
              </Button>
            </>
          }
        />
      </>
    );
  },
};

export const ConteudoLongo: Story = {
  name: "Conteúdo longo",
  args: {
    title: "Termos de uso de imagem",
    size: "l",
    children: (
      <div className="flex flex-col gap-4">
        {Array.from({ length: 12 }, (_, i) => (
          <p key={i}>
            Parágrafo {i + 1}. Ao se candidatar, você autoriza a produtora a usar as fotos e vídeos enviados
            apenas nesta seleção. Os materiais são apagados ao fim do processo.
          </p>
        ))}
      </div>
    ),
  },
};

export const SemBotaoFechar: Story = {
  name: "Sem botão fechar",
  args: { title: "Escolha o país", hideClose: true, size: "s", children: "Pressione Esc ou clique fora para fechar." },
};

export const Playground: Story = { name: "Área de testes" };
