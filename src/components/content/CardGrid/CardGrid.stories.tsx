import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { ViewSelector } from "../../actions";
import { CastingCard } from "../CastingCard";
import { TalentCard } from "../TalentCard";
import { CardGrid, type CardGridView } from "./CardGrid";

const meta = {
  title: "Conteúdo/CardGrid",
  component: CardGrid,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
**O que é.** Grade responsiva de cartões, em lista semântica (\`<ul>\`/\`<li>\`). Dois tipos: \`castings\` (cartões largos, 1–3 colunas) e \`talents\` (retratos, 2–6 colunas). Três densidades com \`view\`.

**Quando usar.** Timeline e busca de castings; busca, shortlist e candidatos de talentos. Combine com \`ViewSelector\` para trocar a densidade.

**Quando não usar.** Para uma fila horizontal curta (use \`Carousel\`).

**Acessibilidade.** A lista anuncia o total de itens. Cada filho é embrulhado em \`<li>\`.
        `,
      },
    },
  },
} satisfies Meta<typeof CardGrid>;

export default meta;
type Story = StoryObj;

const talents = [
  { name: "Ana Ribeiro", age: 28, location: "Rio de Janeiro", skills: ["Atriz", "Modelo"] },
  { name: "Bruno Costa", age: 34, location: "São Paulo", skills: ["Ator", "Locução"] },
  { name: "Carla Mendes", age: 22, location: "Belo Horizonte", skills: ["Dança", "Modelo"] },
  { name: "Diego Alves", age: 41, location: "Curitiba", skills: ["Ator"] },
  { name: "Eva Martins", age: 19, location: "Faro", skills: ["Modelo", "Influencer"] },
  { name: "Filipe Rocha", age: 30, location: "São Paulo", skills: ["Ator", "Canto"] },
];

const castings = [
  { title: "Campanha de verão — cosméticos", category: "Publicidade", location: "São Paulo", fee: 2500 },
  { title: "Longa-metragem: elenco de apoio", category: "Cinema", location: "Rio de Janeiro", fee: 8000 },
  { title: "Desfile semana de moda", category: "Moda", location: "São Paulo", fee: 1200 },
];

export const Talentos: Story = {
  render: () => {
    const [view, setView] = useState<CardGridView>(2);
    return (
      <div className="space-y-6">
        <ViewSelector options={[1, 2, 3]} value={view} onValueChange={(v) => setView(v as CardGridView)} />
        <CardGrid kind="talents" view={view} aria-label="Talentos">
          {talents.map((t) => (
            <TalentCard key={t.name} href="#" {...t} />
          ))}
        </CardGrid>
      </div>
    );
  },
};

export const Castings: Story = {
  render: () => (
    <CardGrid kind="castings" view={3} aria-label="Castings">
      {castings.map((c) => (
        <CastingCard
          key={c.title}
          href="#"
          title={c.title}
          category={c.category}
          location={c.location}
          roles={2}
          deadline={{ text: "Encerra em 5 dias" }}
          fee={{ amount: c.fee, upTo: true }}
        />
      ))}
    </CardGrid>
  ),
};
