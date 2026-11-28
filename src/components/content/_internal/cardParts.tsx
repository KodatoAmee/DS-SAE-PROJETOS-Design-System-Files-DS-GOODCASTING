/*
 * Peças internas dos cartões de casting e talento. Não exportadas pelo barril.
 */
import { isValidElement, type MouseEvent, type ReactNode } from "react";
import { cn, focusRing } from "../../../lib/cn";
import { Icon, type IconName } from "../../icon";
import { MediaPlaceholder, type MediaAspect, type MediaPlaceholderProps } from "../MediaPlaceholder";

/** Distingue props de placeholder de um nó React qualquer. */
export function isPlaceholderProps(media: unknown): media is MediaPlaceholderProps {
  return (
    typeof media === "object" &&
    media !== null &&
    !isValidElement(media) &&
    Object.getPrototypeOf(media) === Object.prototype &&
    !("$$typeof" in media)
  );
}

export function renderMedia(media: ReactNode | MediaPlaceholderProps | undefined, aspect: MediaAspect) {
  if (media === undefined) return <MediaPlaceholder aspect={aspect} />;
  if (isPlaceholderProps(media)) return <MediaPlaceholder aspect={aspect} {...media} />;
  return media;
}

/**
 * Link que cobre o cartão inteiro via ::after (um só ponto de tabulação).
 * O anel fica no ::after e sai 4px da caixa: nenhum ancestral até o cartão pode ter `overflow-hidden`.
 */
export const stretchedLink = [
  "outline-none after:absolute after:inset-0 after:rounded-md after:content-['']",
  "focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-brand-text",
].join(" ");

/** Botão "salvar" (coração) por cima da mídia, fora do link. `aria-pressed` diz o estado. */
/* Geometria do Circum Heart (react-icons/ci): contorno completo e o miolo (subcaminho interno). */
const heartInner =
  "M8.355,4.963A4.015,4.015,0,0,0,6.511,5.4,4.4,4.4,0,0,0,4.122,8.643a4.345,4.345,0,0,0,1.215,3.73l6.675,6.675,6.651-6.675a4.345,4.345,0,0,0,1.215-3.73A4.4,4.4,0,0,0,17.489,5.4a4.338,4.338,0,0,0-4.968.852h0a.744.744,0,0,1-1.042,0A4.474,4.474,0,0,0,8.355,4.963Z";
const heartOutline =
  "M12,20.043a.977.977,0,0,1-.7-.288L4.63,13.08A5.343,5.343,0,0,1,6.053,4.513,5.266,5.266,0,0,1,12,5.371a5.272,5.272,0,0,1,5.947-.858A5.343,5.343,0,0,1,19.37,13.08l-6.676,6.675A.977.977,0,0,1,12,20.043Z" +
  heartInner;

export function SaveToggle({
  saved,
  onToggle,
  label,
  className,
}: {
  saved: boolean;
  onToggle: (event: MouseEvent<HTMLButtonElement>) => void;
  label: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={label}
      onClick={onToggle}
      className={cn(
        "relative z-10 inline-flex size-11 items-center justify-center rounded-full bg-base/90 text-content",
        "transition-opacity duration-200 ease-gc hover:opacity-80",
        focusRing,
        // Anel de dois tons (fica sobre qualquer foto): halo `base` de 2px preenche o offset e o outline
        // `brand-text` corre por fora dele, então o contraste do anel é sempre brand-text × base.
        // `opacity-100` no foco: o hover não esmaece o anel.
        "focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-base",
        className,
      )}
    >
      {saved ? (
        /* Salvo: miolo Azul Tiffany (`brand`) e contorno Tiffany Link (`tiffany-link`), mesma forma do Circum Heart. */
        <svg aria-hidden focusable="false" viewBox="0 0 24 24" width={20} height={20} className="shrink-0">
          <path className="fill-brand" d={heartInner} />
          <path className="fill-tiffany-link" d={heartOutline} />
        </svg>
      ) : (
        <Icon name="heart" size={20} />
      )}
    </button>
  );
}

/**
 * Linha de metadado: ícone 16px + texto. Corta com reticências por padrão;
 * `wrap` quebra a linha em vez de cortar (use em informação essencial, como o prazo).
 */
export function MetaItem({
  icon,
  wrap = false,
  children,
  className,
}: {
  icon: IconName;
  wrap?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex min-w-0 gap-1 text-label text-content-mid",
        wrap ? "items-start" : "items-center",
        className,
      )}
    >
      {/* Na quebra, o ícone (16px) fica centrado na 1ª linha (18px). */}
      <Icon name={icon} size={16} className={cn("shrink-0", wrap && "mt-px")} />
      <span className={wrap ? "min-w-0 whitespace-normal break-words" : "truncate"}>{children}</span>
    </span>
  );
}
