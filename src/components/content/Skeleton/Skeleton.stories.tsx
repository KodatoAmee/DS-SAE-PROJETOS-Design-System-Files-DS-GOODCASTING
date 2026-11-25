import type { Meta, StoryObj } from "@storybook/react-vite";
import { CastingCardSkeleton, Skeleton, TalentCardSkeleton } from "./Skeleton";

const meta = {
  title: "Conteúdo/Skeleton",
  component: Skeleton,
  subcomponents: { CastingCardSkeleton, TalentCardSkeleton },
  tags: ["autodocs"],
  args: { variant: "text", lines: 3 },
  argTypes: {
    variant: { control: "inline-radio", options: ["text", "media", "block"] },
    aspect: { control: "inline-radio", options: ["2/3", "3/4", "1/1", "16/9"] },
  },
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
**O que é.** Blocos \`bg-muted\` pulsando (\`animate-gc-pulse\`) que reservam o lugar do conteúdo enquanto carrega. Variantes \`text\` (linhas), \`media\` (proporção do \`MediaPlaceholder\`) e \`block\` (tamanho livre). \`CastingCardSkeleton\` e \`TalentCardSkeleton\` reproduzem a geometria dos cartões de casting e de talento.

**Quando usar.** Carregamento inicial de grelhas, carrosséis e fichas, quando a forma do conteúdo é conhecida.

**Quando não usar.** Para ações curtas (botão enviando) use \`loading\` do \`Button\`. Para carregamentos de menos de ~300ms, não mostre nada.

**Anatomia.** Blocos retangulares sem raio, mesma altura de linha da tipografia real.

**Acessibilidade.** Os blocos são \`aria-hidden\`. Marque o contêiner com \`aria-busy="true"\` durante o carregamento e, se for demorado, anuncie com um texto \`sr-only\` ("Carregando castings"). A pulsação respeita \`prefers-reduced-motion\`.
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="max-w-[280px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Texto: Story = {};
export const Midia: Story = { name: "Mídia", args: { variant: "media", aspect: "2/3" } };
export const Bloco: Story = { args: { variant: "block", className: "h-10 w-32" } };

export const CartaoDeCasting: Story = {
  name: "Cartão de casting",
  render: () => <CastingCardSkeleton className="max-w-[380px]" />,
};

export const CartaoDeTalento: Story = {
  name: "Cartão de talento",
  render: () => <TalentCardSkeleton className="max-w-[240px]" />,
};

export const Playground: Story = { name: "Área de testes" };
