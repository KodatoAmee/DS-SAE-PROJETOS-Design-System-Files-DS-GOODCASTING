import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Logo } from "../components/brand";
import {
  Accordion,
  AccordionItem,
  Banner,
  Breadcrumbs,
  Button,
  CardGrid,
  CastingCard,
  ChipSelector,
  Divider,
  Drawer,
  FeeLabel,
  Footer,
  Header,
  MediaPlaceholder,
  MenuDrawer,
  NumberStepper,
  StatusBadge,
  Tabs,
  TalentCard,
  TextArea,
  TextField,
  ViewSelector,
  type CandidacyStatus,
  type CardGridView,
} from "../index";

const meta = {
  title: "Padrões",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Telas da Good Casting compostas só com componentes do DS. Referência de composição: nomes, valores e castings são fictícios.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

const sections = [
  {
    id: "castings",
    label: "Castings",
    items: ["Todos", "Publicidade", "Cinema", "Televisão", "Moda", "Teatro"].map((l) => ({ label: l, href: "#" })),
  },
  {
    id: "perfil",
    label: "O meu perfil",
    items: ["Dados pessoais", "Book de fotos", "Vídeos", "Agências"].map((l) => ({ label: l, href: "#" })),
  },
  {
    id: "ajuda",
    label: "Ajuda",
    items: ["Perguntas frequentes", "Contato"].map((l) => ({ label: l, href: "#" })),
  },
];

const castings: {
  title: string;
  category: string;
  location: string;
  roles: number;
  slots: number;
  deadline: { text: string; urgent?: boolean };
  fee: number | "a-definir";
  status?: CandidacyStatus;
  expired?: boolean;
}[] = [
  { title: "Campanha de verão — marca de cosméticos", category: "Publicidade", location: "São Paulo", roles: 3, slots: 6, deadline: { text: "Encerra em 5 dias" }, fee: 2500, status: "analise" },
  { title: "Longa-metragem: elenco de apoio", category: "Cinema", location: "Rio de Janeiro", roles: 8, slots: 12, deadline: { text: "Encerra hoje às 18h", urgent: true }, fee: 8000 },
  { title: "Desfile da semana de moda", category: "Moda", location: "São Paulo", roles: 1, slots: 20, deadline: { text: "Encerra em 12 dias" }, fee: 1200, status: "selecionado" },
  { title: "Série de TV: participação especial", category: "Televisão", location: "Remoto", roles: 2, slots: 2, deadline: { text: "Encerra em 3 dias" }, fee: "a-definir" },
  { title: "Videoclipe de banda independente", category: "Videoclipe", location: "Belo Horizonte", roles: 4, slots: 10, deadline: { text: "" }, fee: 400, expired: true },
  { title: "Peça de teatro infantil", category: "Teatro", location: "Curitiba", roles: 5, slots: 5, deadline: { text: "Encerra em 20 dias" }, fee: 1800, status: "convite" },
];

const footerColumns = [
  { title: "Good Casting", links: [{ label: "Sobre nós", href: "#" }, { label: "Manifesto", href: "#" }] },
  { title: "Para talentos", links: [{ label: "Criar perfil", href: "#" }, { label: "Como funciona", href: "#" }] },
  { title: "Para produtoras", links: [{ label: "Publicar casting", href: "#" }, { label: "Planos", href: "#" }] },
  { title: "Políticas", links: [{ label: "Privacidade", href: "#" }, { label: "Termos", href: "#" }] },
];

function Timeline() {
  const [menu, setMenu] = useState(false);
  const [filters, setFilters] = useState(false);
  const [view, setView] = useState<CardGridView>(3);
  const [saved, setSaved] = useState<string[]>([]);
  const [category, setCategory] = useState<string[]>(["Todos"]);

  const list = castings.filter((c) => category[0] === "Todos" || c.category === category[0]);

  return (
    <div className="-m-6 bg-canvas">
      <Header
        variant="solid"
        sticky
        logo={<Logo width={120} />}
        menuOpen={menu}
        menuId="menu-principal"
        onMenuClick={() => setMenu(true)}
        search={{ onClick: () => {} }}
        actions={[
          { label: "Salvos", icon: "heart", count: saved.length, href: "#" },
          { label: "Perfil", icon: "user", href: "#" },
        ]}
      />
      <MenuDrawer id="menu-principal" open={menu} onOpenChange={setMenu} sections={sections} />

      <main className="mx-auto max-w-[1280px] px-4 pb-12 lg:px-10">
        <div className="py-8">
          <h1 className="font-display text-display">Castings abertos</h1>
          <p className="mt-1 text-body text-content-mid">Uma plataforma. Mil oportunidades.</p>
        </div>

        <Banner title="Complete o seu perfil" actions={<Button variant="brand" size="s">Completar perfil</Button>} className="mb-6 bg-brand-soft">
          Perfis com book e vídeo recebem até 3x mais convites.
        </Banner>

        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <ChipSelector
            aria-label="Categoria"
            options={["Todos", "Publicidade", "Cinema", "Televisão", "Moda", "Teatro"].map((value) => ({ value }))}
            value={category}
            onValueChange={setCategory}
            className="w-auto"
          />
          <div className="flex items-center gap-4">
            <Button variant="secondary" size="s" iconStart="filter" onClick={() => setFilters(true)}>
              Filtros
            </Button>
            <ViewSelector options={[1, 2, 3]} value={view} onValueChange={(v) => setView(v as CardGridView)} />
          </div>
        </div>

        <CardGrid kind="castings" view={view} aria-label="Castings">
          {list.map((c) => (
            <CastingCard
              key={c.title}
              href="#"
              title={c.title}
              category={c.category}
              location={c.location}
              roles={c.roles}
              slots={c.slots}
              deadline={c.deadline.text ? c.deadline : undefined}
              fee={{ amount: c.fee, upTo: typeof c.fee === "number" }}
              status={c.status}
              expired={c.expired}
              saved={saved.includes(c.title)}
              onSavedChange={(on) =>
                setSaved((s) => (on ? [...s, c.title] : s.filter((t) => t !== c.title)))
              }
            />
          ))}
        </CardGrid>
      </main>

      <Footer
        columns={footerColumns}
        region={{ country: "Brasil", language: "Português" }}
        legal="© 2026 Good Casting. Exemplo para documentação."
      />

      <Drawer
        open={filters}
        onOpenChange={setFilters}
        title="Filtros"
        footer={
          <Button fullWidth size="l" onClick={() => setFilters(false)}>
            Ver resultados
          </Button>
        }
      >
        <div className="flex flex-col gap-8">
          <ChipSelector
            label="Localização"
            multiple
            options={["São Paulo", "Rio de Janeiro", "Belo Horizonte", "Curitiba", "Remoto"].map((value) => ({ value }))}
          />
          <ChipSelector
            label="Cachê"
            options={["Qualquer", "Até R$ 1.000", "R$ 1.000–5.000", "Acima de R$ 5.000"].map((value) => ({ value }))}
            defaultValue={["Qualquer"]}
          />
          <ChipSelector
            label="Perfil"
            multiple
            options={["Ator / Atriz", "Modelo", "Figurante", "Locutor", "Bailarino"].map((value) => ({ value }))}
          />
        </div>
      </Drawer>
    </div>
  );
}

export const TimelineDeCastings: Story = {
  name: "Timeline de castings",
  render: () => <Timeline />,
};

const personagens = [
  { id: "mae", nome: "Mãe", perfil: "Feminino · 35–45 anos", fee: 2500 },
  { id: "filha", nome: "Filha", perfil: "Feminino · 8–12 anos", fee: 1500 },
  { id: "vizinho", nome: "Vizinho", perfil: "Masculino · 50–65 anos", fee: 800 },
];

export const DetalheDoCasting: Story = {
  name: "Detalhe do casting",
  parameters: { layout: "padded" },
  render: () => (
    <div className="mx-auto max-w-[1100px]">
      <Breadcrumbs items={[{ label: "Castings", href: "#" }, { label: "Publicidade", href: "#" }, { label: "Campanha de verão" }]} />
      <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <MediaPlaceholder aspect="16/9" label="Capa do casting" className="rounded-lg" />
          <div className="space-y-3">
            <StatusBadge status="enviada" />
            <h1 className="font-display text-display">Campanha de verão — marca de cosméticos</h1>
            <p className="text-body text-content-mid">Produtora Luz Norte · São Paulo · Gravação 12–14 de março</p>
          </div>
          <Tabs
            label="Secções do casting"
            items={[
              {
                id: "sobre",
                label: "Sobre",
                content: (
                  <p className="max-w-[640px] pt-4 text-body">
                    Campanha nacional para televisão e redes sociais. Procuramos uma família natural e
                    luminosa para um dia de praia. Gravação em exteriores, com direitos de imagem por 12
                    meses no Brasil.
                  </p>
                ),
              },
              {
                id: "personagens",
                label: "Personagens (3)",
                content: (
                  <Accordion type="multiple" className="pt-2">
                    {personagens.map((p) => (
                      <AccordionItem key={p.id} value={p.id} title={`${p.nome} — ${p.perfil}`}>
                        <div className="flex items-center justify-between pb-4">
                          <p className="text-body text-content-mid">Sem falas. Experiência em publicidade é um plus.</p>
                          <FeeLabel amount={p.fee} align="end" />
                        </div>
                      </AccordionItem>
                    ))}
                  </Accordion>
                ),
              },
              { id: "produtora", label: "Produtora", content: <p className="pt-4 text-body">Luz Norte Produções, São Paulo.</p> },
            ]}
          />
        </div>
        <aside className="space-y-6 self-start rounded-lg border border-line-subtle p-6 lg:sticky lg:top-6">
          <FeeLabel amount={2500} upTo size="m" />
          <Divider />
          <ul className="space-y-2 text-body">
            <li className="flex justify-between"><span className="text-content-mid">Prazo</span><span>até 20 de fevereiro</span></li>
            <li className="flex justify-between"><span className="text-content-mid">Vagas</span><span>6</span></li>
            <li className="flex justify-between"><span className="text-content-mid">Local</span><span>São Paulo</span></li>
          </ul>
          <Button variant="brand" size="l" fullWidth>
            Candidatar-me
          </Button>
          <Button variant="secondary" size="m" fullWidth iconStart="heart">
            Salvar casting
          </Button>
        </aside>
      </div>
    </div>
  ),
};

const talentos = [
  { name: "Ana Ribeiro", age: 38, location: "São Paulo", skills: ["Atriz", "Modelo"], match: 96, verified: true },
  { name: "Beatriz Costa", age: 41, location: "Rio de Janeiro", skills: ["Atriz", "Locução", "Inglês"], match: 91 },
  { name: "Carla Mendes", age: 36, location: "São Paulo", skills: ["Modelo"], match: 88, verified: true },
  { name: "Diana Alves", age: 44, location: "Setúbal", skills: ["Atriz", "Dança", "Canto", "Francês"], match: 84 },
  { name: "Eva Martins", age: 39, location: "Cascais", skills: ["Atriz"], match: 80 },
  { name: "Filipa Rocha", age: 42, location: "São Paulo", skills: ["Modelo", "Influencer"], match: 77 },
];

function Shortlist() {
  const [fav, setFav] = useState<string[]>(["Ana Ribeiro"]);
  return (
    <div className="mx-auto max-w-[1280px]">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-label text-content-mid">Campanha de verão · Personagem "Mãe"</p>
          <h1 className="font-display text-display">Candidatos (24)</h1>
        </div>
        <p className="text-label text-content-mid">{fav.length} na shortlist</p>
      </div>
      <CardGrid kind="talents" view={2} aria-label="Candidatos">
        {talentos.map((t) => (
          <TalentCard
            key={t.name}
            href="#"
            {...t}
            saved={fav.includes(t.name)}
            onSavedChange={(on) => setFav((f) => (on ? [...f, t.name] : f.filter((n) => n !== t.name)))}
          />
        ))}
      </CardGrid>
    </div>
  );
}

export const ShortlistDeTalentos: Story = {
  name: "Candidatos de um personagem",
  parameters: { layout: "padded" },
  render: () => <Shortlist />,
};

export const CompletarPerfil: Story = {
  name: "Completar perfil",
  parameters: { layout: "padded" },
  render: () => (
    <form className="mx-auto max-w-[480px] space-y-8 py-6" onSubmit={(e) => e.preventDefault()}>
      <div className="space-y-1">
        <p className="text-label text-content-mid">Passo 2 de 4</p>
        <h1 className="font-display text-display">Conte-nos sobre si</h1>
        <div className="mt-4 h-1 overflow-hidden rounded-full bg-muted" aria-hidden>
          <div className="h-full w-1/2 rounded-full bg-brand" />
        </div>
      </div>
      <TextField label="Nome artístico" autoComplete="nickname" />
      <ChipSelector
        label="Perfis"
        multiple
        max={3}
        helperText="Escolha até 3."
        options={["Ator / Atriz", "Modelo", "Figurante", "Locutor", "Bailarino", "Influencer"].map((value) => ({ value }))}
        defaultValue={["Modelo"]}
      />
      <div className="flex flex-wrap gap-8">
        <div className="space-y-2">
          <p className="text-label text-content-low">Altura</p>
          <NumberStepper label="Altura" min={100} max={220} defaultValue={170} unit="cm" size="m" />
        </div>
        <div className="space-y-2">
          <p className="text-label text-content-low">Experiência</p>
          <NumberStepper label="Experiência" min={0} max={50} defaultValue={2} unit="anos" size="m" />
        </div>
      </div>
      <TextArea label="Sobre mim" helperText="Formação, trabalhos marcantes, idiomas." />
      <div className="flex gap-3">
        <Button variant="secondary" size="l" className="flex-1">
          Anterior
        </Button>
        <Button type="submit" variant="brand" size="l" className="flex-1">
          Seguinte
        </Button>
      </div>
    </form>
  ),
};

export const IniciarSessao: Story = {
  name: "Entrar",
  parameters: { layout: "padded" },
  render: () => (
    <form className="mx-auto mt-10 max-w-[398px] space-y-6" onSubmit={(e) => e.preventDefault()}>
      <Logo width={160} className="mx-auto" />
      <h1 className="pt-4 text-center font-display text-heading">Entrar na Good Casting</h1>
      <TextField label="E-mail" type="email" placeholder="Digite o seu e-mail" autoComplete="email" />
      <TextField label="Senha" type="password" autoComplete="current-password" />
      <Button type="submit" fullWidth size="l">
        Entrar
      </Button>
      <p className="text-center text-label">
        Ainda não tem conta? <a href="#" className="text-brand-text underline underline-offset-2">Criar perfil</a>
      </p>
      <p className="pt-10 text-label text-content-mid">
        Ao continuar, aceita os termos de uso e a política de privacidade.
      </p>
    </form>
  ),
};
