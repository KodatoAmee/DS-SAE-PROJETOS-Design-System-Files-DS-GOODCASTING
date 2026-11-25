import { useId, type ComponentPropsWithoutRef, type ReactNode, type Ref } from "react";
import { cn } from "../../../lib/cn";
import { Icon } from "../../icon";
import { FeeLabel, type FeeLabelProps } from "../FeeLabel";
import type { MediaPlaceholderProps } from "../MediaPlaceholder";
import { StatusBadge, type CandidacyStatus } from "../StatusBadge";
import { MetaItem, SaveToggle, renderMedia, stretchedLink } from "../_internal/cardParts";

type TitleTag = "h2" | "h3" | "h4" | "p";

export interface CastingCardProps extends Omit<ComponentPropsWithoutRef<"article">, "children" | "title"> {
  ref?: Ref<HTMLElement>;
  /** Título do casting. */
  title: string;
  /** Destino do link (cartão inteiro). */
  href: string;
  linkProps?: Omit<ComponentPropsWithoutRef<"a">, "href" | "children">;
  /** Capa 16:9: nó React ou props do `MediaPlaceholder`. */
  cover?: ReactNode | MediaPlaceholderProps;
  /** Categoria sobre a capa ("Publicidade", "Cinema", "Moda"). */
  category?: string;
  /** Estado da candidatura do talento, quando houver. */
  status?: CandidacyStatus;
  /** Cidade ou "Remoto". */
  location?: string;
  /** Número de personagens. */
  roles?: number;
  /** Número de vagas. */
  slots?: number;
  /** Prazo já formatado ("Encerra em 3 dias"). `urgent` pinta de vermelho. */
  deadline?: { text: string; urgent?: boolean };
  /** Props do `FeeLabel`. */
  fee?: FeeLabelProps;
  /** Prazo da candidatura expirado: faixa sobre a capa. */
  expired?: boolean;
  /** Personagem do talento e compatibilidade. */
  match?: { role: string; percent?: number };
  /** Salvo pelo talento. Com `onSavedChange`, mostra o botão de coração. */
  saved?: boolean;
  onSavedChange?: (saved: boolean) => void;
  titleAs?: TitleTag;
}

/**
 * Cartão de casting da timeline do talento. Fonte: `TalentCastingCard` do goodcasting-app.
 */
export function CastingCard({
  title,
  href,
  linkProps,
  cover,
  category,
  status,
  location,
  roles,
  slots,
  deadline,
  fee,
  expired = false,
  match,
  saved = false,
  onSavedChange,
  titleAs: TitleEl = "h3",
  className,
  ...rest
}: CastingCardProps) {
  const titleId = useId();

  return (
    <article
      aria-labelledby={titleId}
      className={cn(
        "relative flex flex-col overflow-hidden rounded-lg border border-line-subtle bg-surface text-content",
        "transition-shadow duration-200 ease-gc hover:shadow-card",
        className,
      )}
      {...rest}
    >
      <div className="relative">
        {renderMedia(cover, "16/9")}
        {category && (
          <span className="absolute top-3 left-3 rounded-full bg-base/90 px-2.5 py-0.5 text-label-s font-medium">
            {category}
          </span>
        )}
        {expired && (
          <span className="absolute inset-x-0 bottom-0 flex items-center gap-1.5 bg-black/75 px-3 py-2 text-label text-white">
            <Icon name="clock" size={16} />
            Prazo da candidatura expirado
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        {status && <StatusBadge status={status} className="self-start" />}

        <TitleEl id={titleId} className="line-clamp-2 text-title-s font-semibold">
          <a href={href} {...linkProps} className={cn(stretchedLink, "hover:underline underline-offset-2", linkProps?.className)}>
            {title}
          </a>
        </TitleEl>

        {(location || roles || slots) && (
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {location && <MetaItem icon="pin">{location}</MetaItem>}
            {roles ? <MetaItem icon="mask">{`${roles} ${roles === 1 ? "personagem" : "personagens"}`}</MetaItem> : null}
            {slots ? <MetaItem icon="users">{`${slots} ${slots === 1 ? "vaga" : "vagas"}`}</MetaItem> : null}
          </div>
        )}

        {((deadline && !expired) || fee) && (
          <div className="mt-auto flex items-end justify-between gap-4 pt-1">
            {deadline && !expired ? (
              <MetaItem icon="calendar" className={cn(deadline.urgent && "font-medium text-danger-text")}>
                {deadline.text}
              </MetaItem>
            ) : (
              <span />
            )}
            {fee && <FeeLabel align="end" {...fee} />}
          </div>
        )}

        {match && (
          <p className="border-t border-line-subtle pt-3 text-label text-content-mid">
            Seu personagem: <strong className="font-semibold text-content">{match.role}</strong>
            {match.percent !== undefined && ` · ${match.percent}% compatível`}
          </p>
        )}
      </div>

      {onSavedChange && (
        <SaveToggle
          saved={saved}
          onToggle={() => onSavedChange(!saved)}
          label={saved ? `Remover ${title} dos salvos` : `Salvar ${title}`}
          className="absolute top-2 right-2"
        />
      )}
    </article>
  );
}
