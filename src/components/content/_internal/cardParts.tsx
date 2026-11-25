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

/** Link que cobre o cartão inteiro via ::after (um só ponto de tabulação). */
export const stretchedLink = [
  "outline-none after:absolute after:inset-0 after:rounded-[inherit] after:content-['']",
  "focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-brand-text",
].join(" ");

/** Botão "salvar" (coração) por cima da mídia, fora do link. `aria-pressed` diz o estado. */
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
        className,
      )}
    >
      <Icon
        name="heart"
        size={20}
        className={cn(saved && "fill-danger stroke-danger")}
      />
    </button>
  );
}

/** Linha de metadado: ícone 16px + texto. */
export function MetaItem({ icon, children, className }: { icon: IconName; children: ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex min-w-0 items-center gap-1 text-label text-content-mid", className)}>
      <Icon name={icon} size={16} className="shrink-0" />
      <span className="truncate">{children}</span>
    </span>
  );
}
