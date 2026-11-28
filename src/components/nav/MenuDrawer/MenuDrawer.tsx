/**
 * MenuDrawer — gaveta de navegação (frente Navegação).
 *
 * Usa a MESMA pilha de sobreposições e o MESMO contador de scroll de Modal e Drawer
 * (`src/lib/overlay`): só a sobreposição do topo reage a Escape/Tab, e o body só volta a
 * rolar quando a última fecha, em qualquer ordem de abertura. Escape com
 * `defaultPrevented` (ex.: SearchField limpando) é ignorado.
 *
 * Sem linhas: nem divisória entre seções e links, nem traço sob a seção ativa, nem borda
 * no rodapé. Seções e links destacam com fundo Tiffany 20% (`bg-brand/20`) no hover e no
 * selecionado; o selecionado também ganha peso 500, porque o fundo sozinho (~1,1:1 sobre o
 * branco) não basta como sinal (WCAG 1.4.1/1.4.11).
 *
 * Largura: a navegação (Fechar, seções e links) ocupa no máximo 80% da tela (metade em `md`,
 * 1/3 em `lg`) e o overlay segue visível à direita. O `footer`, quando existe, ocupa a largura
 * toda da tela, ancorado embaixo, com o mesmo fundo. Os dois ficam dentro do mesmo diálogo: o
 * foco preso e o Escape valem para ambos, e clicar neles não fecha; só o overlay fecha.
 * `className` e `...rest` vão para o diálogo, a camada de tela cheia e transparente que contém
 * os dois; para estilizar o painel de navegação (fundo, largura, respiro), use `panelClassName`.
 */
import {
  useEffect,
  useId,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { cn, focusRing } from "../../../lib/cn";
import { Icon } from "../../icon";
import { useControllableState } from "../_internal/useControllableState";
import {
  isTopOverlay,
  lockScroll,
  popOverlay,
  pushOverlay,
  unlockScroll,
  type OverlayToken,
} from "../../../lib/overlay";
import { Tabs } from "../Tabs";

/** Mesma duração da classe `duration-500`. */
const TRANSITION_MS = 500;

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Item do menu (link do painel): mesma altura, respiro e raio das seções. */
const ITEM = "flex min-h-8 items-center rounded-xs px-3 py-1.5 text-action transition-colors duration-200 ease-gc";

/**
 * Lista de seções (o `Tabs` vertical), ajustada só aqui, sem mexer no padrão do Tabs:
 * - sem o traço `::after` da aba ativa; cada aba vira um item igual aos links;
 * - fundo Tiffany 20% no hover e na ativa; a ativa também em peso 500, forçado aqui porque
 *   o `font-normal` da base do Tabs vence o `font-medium` na cascata;
 * - `pr-4` no lugar do `pr-8`: sem a linha, o respiro entre as colunas pode ser menor.
 */
const SECTION_LIST = cn(
  "pr-4",
  "[&>[role=tab]]:after:hidden",
  "[&>[role=tab]]:min-h-8 [&>[role=tab]]:rounded-xs [&>[role=tab]]:px-3 [&>[role=tab]]:py-1.5",
  "[&>[role=tab]]:transition-colors [&>[role=tab]]:duration-200 [&>[role=tab]]:ease-gc",
  "[&>[role=tab]:hover]:bg-brand/20",
  "[&>[aria-selected=true]]:bg-brand/20 [&>[aria-selected=true]]:font-medium",
);

export interface MenuDrawerLink {
  label: string;
  href: string;
  /** Página atual: recebe `aria-current="page"`, fundo Tiffany 20% e peso 500. */
  current?: boolean;
}

export interface MenuDrawerSection {
  id: string;
  label: string;
  items: MenuDrawerLink[];
}

export interface MenuDrawerProps
  extends Omit<ComponentPropsWithoutRef<"div">, "title" | "children"> {
  /** Aberto (controlado). */
  open?: boolean;
  /** Aberto inicialmente (não controlado). */
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  sections: MenuDrawerSection[];
  /** Seção inicial. Padrão: a primeira. */
  defaultSection?: string;
  /** Nome acessível do diálogo. Padrão: "Menu". */
  title?: string;
  /** Padrão: "Fechar". */
  closeLabel?: string;
  /** Rodapé da gaveta (ex.: links de conta, país). */
  footer?: ReactNode;
  /** Chamado ao clicar num link. */
  onNavigate?: (link: MenuDrawerLink, section: MenuDrawerSection) => void;
  /** Fecha a gaveta ao clicar num link. Padrão: `true`. */
  closeOnNavigate?: boolean;
  /**
   * Classes do diálogo: a camada de tela cheia e transparente (`fixed inset-0`) que contém a
   * navegação e o rodapé. Os demais atributos (`...rest`: `id`, `style`, `data-*`, `aria-*`,
   * eventos) também vão para ela. Para estilizar o painel de navegação, use `panelClassName`.
   */
  className?: string;
  /**
   * Classes do painel de navegação (Fechar, seções e links; máx. 80% da tela), mescladas com
   * `cn` às do componente. Ex.: `bg-muted` troca o fundo; `lg:w-1/4` troca a largura em `lg`.
   * Não vale para o `footer`, que fica fora do painel.
   */
  panelClassName?: string;
}

export function MenuDrawer({
  open,
  defaultOpen = false,
  onOpenChange,
  sections,
  defaultSection,
  title = "Menu",
  closeLabel = "Fechar",
  footer,
  onNavigate,
  closeOnNavigate = true,
  className,
  panelClassName,
  ...rest
}: MenuDrawerProps) {
  const [isOpen, setOpen] = useControllableState({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });
  const [mounted, setMounted] = useState(isOpen);
  const [visible, setVisible] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const titleId = useId();

  // Monta, anima a entrada (2 frames) e desmonta após a saída.
  useEffect(() => {
    if (isOpen) {
      const active = typeof document !== "undefined" ? document.activeElement : null;
      if (active instanceof HTMLElement && !panelRef.current?.contains(active)) {
        returnFocusRef.current = active;
      }
      setMounted(true);
      let inner = 0;
      const outer = requestAnimationFrame(() => {
        inner = requestAnimationFrame(() => setVisible(true));
      });
      return () => {
        cancelAnimationFrame(outer);
        cancelAnimationFrame(inner);
      };
    }
    setVisible(false);
    const previous = returnFocusRef.current;
    returnFocusRef.current = null;
    if (previous?.isConnected) previous.focus();
    const timer = window.setTimeout(() => setMounted(false), TRANSITION_MS);
    return () => window.clearTimeout(timer);
  }, [isOpen]);

  // Foco inicial no botão Fechar.
  useEffect(() => {
    if (mounted && isOpen) closeRef.current?.focus();
  }, [mounted, isOpen]);

  // Entra na pilha compartilhada e bloqueia o scroll do body enquanto aberto.
  const tokenRef = useRef<OverlayToken | null>(null);
  useEffect(() => {
    if (!isOpen) return;
    const token = pushOverlay();
    tokenRef.current = token;
    lockScroll();
    return () => {
      popOverlay(token);
      unlockScroll();
      tokenRef.current = null;
    };
  }, [isOpen]);

  // Esc fecha; Tab fica preso no painel. Só quando este painel é o do topo.
  useEffect(() => {
    if (!isOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.defaultPrevented) return;
      if (!tokenRef.current || !isTopOverlay(tokenRef.current)) return;
      const panel = panelRef.current;
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }
      if (event.key !== "Tab") return;
      if (!panel) return;
      const focusables = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => !el.closest("[hidden]"),
      );
      if (focusables.length === 0) {
        event.preventDefault();
        return;
      }
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;
      if (!panel.contains(active)) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, setOpen]);

  if (!mounted || typeof document === "undefined") return null;

  const renderLinks = (section: MenuDrawerSection) => (
    <ul className="flex flex-col gap-1">
      {section.items.map((link) => (
        <li key={`${link.label}-${link.href}`}>
          <a
            href={link.href}
            aria-current={link.current ? "page" : undefined}
            onClick={() => {
              onNavigate?.(link, section);
              if (closeOnNavigate) setOpen(false);
            }}
            className={cn(
              ITEM,
              "hover:bg-brand/20",
              link.current ? "bg-brand/20 font-medium" : "font-normal",
              focusRing,
            )}
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );

  return createPortal(
    <>
      <div
        aria-hidden
        onClick={() => setOpen(false)}
        className={cn(
          "fixed inset-0 z-overlay bg-overlay transition-opacity duration-500 ease-gc",
          visible ? "opacity-100" : "opacity-0",
        )}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={cn(
          // Camada de tela cheia e transparente: só a navegação e o rodapé recebem clique;
          // o resto passa para o overlay de trás (clique fora fecha).
          "pointer-events-none fixed inset-0 z-overlay flex flex-col text-content",
          className,
        )}
        {...rest}
      >
        {/* Navegação: no máximo 80% da tela (metade em `md`, 1/3 em `lg`). Entra pela esquerda. */}
        <div
          className={cn(
            "pointer-events-auto flex min-h-0 w-full max-w-4/5 flex-1 flex-col overflow-y-auto bg-base",
            "transition-transform duration-500 ease-gc md:w-1/2 lg:w-1/3",
            visible ? "translate-x-0" : "-translate-x-full",
            panelClassName,
          )}
        >
          {/* Fechar à direita da navegação, alinhado ao respiro lateral dos links. */}
          {/* 26 px por pedido do Mario (fora da escala) */}
          <div className="flex shrink-0 justify-end pr-5 pt-[26px] md:pr-10">
            <button
              ref={closeRef}
              type="button"
              aria-label={closeLabel}
              onClick={() => setOpen(false)}
              className={cn(
                "inline-flex size-10 items-center justify-center transition-opacity duration-200 ease-gc hover:opacity-60",
                focusRing,
              )}
            >
              <Icon name="close" />
            </button>
            <h2 id={titleId} className="sr-only">
              {title}
            </h2>
          </div>

          <div className="flex-1 px-5 pb-10 pt-4 md:pl-20 md:pr-10">
            {/* `-ml-3` compensa o `px-3` dos itens: o texto fica onde estava, só o fundo invade. */}
            {sections.length === 1 ? (
              <div className="-ml-3">{renderLinks(sections[0])}</div>
            ) : (
              <Tabs
                orientation="vertical"
                label={title}
                defaultValue={defaultSection}
                className="-ml-3"
                listClassName={SECTION_LIST}
                // Sem a borda à esquerda do painel nem o `pl-8` que afastava o texto dela.
                panelClassName="border-l-0 pl-0"
                items={sections.map((section) => ({
                  id: section.id,
                  label: section.label,
                  content: renderLinks(section),
                }))}
              />
            )}
          </div>
        </div>

        {footer && (
          // Rodapé na largura toda da tela, ancorado embaixo, com o mesmo fundo. Sobe de baixo,
          // no mesmo tempo da navegação.
          <div
            className={cn(
              "pointer-events-auto shrink-0 bg-base px-5 py-6 md:px-20",
              "transition-transform duration-500 ease-gc",
              visible ? "translate-y-0" : "translate-y-full",
            )}
          >
            {footer}
          </div>
        )}
      </div>
    </>,
    document.body,
  );
}
