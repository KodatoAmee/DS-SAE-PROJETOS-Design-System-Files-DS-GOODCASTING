import { useId, type ComponentPropsWithoutRef, type ReactNode, type Ref } from "react";
import { cn } from "../../../lib/cn";
import { Icon } from "../../icon";
import type { MediaPlaceholderProps } from "../MediaPlaceholder";
import { Tag } from "../Tag";
import { MetaItem, SaveToggle, renderMedia, stretchedLink } from "../_internal/cardParts";

type NameTag = "h2" | "h3" | "h4" | "p";

export interface TalentCardProps extends Omit<ComponentPropsWithoutRef<"article">, "children"> {
  ref?: Ref<HTMLElement>;
  /** Nome artístico. */
  name: string;
  /** Destino do link (perfil). */
  href: string;
  linkProps?: Omit<ComponentPropsWithoutRef<"a">, "href" | "children">;
  /** Foto 3:4: nó React ou props do `MediaPlaceholder`. Use `alt=""`: o nome já descreve. */
  photo?: ReactNode | MediaPlaceholderProps;
  /** Idade, em anos. */
  age?: number;
  /** Cidade. */
  location?: string;
  /** Perfis, habilidades ou idiomas (até 3 visíveis; o resto vira "+N"). */
  skills?: string[];
  /** Compatibilidade com o personagem (0–100). Mostra pílula Tiffany sobre a foto. */
  match?: number;
  /** Perfil verificado pela agência. */
  verified?: boolean;
  /** Favorito do diretor de casting. Com `onSavedChange`, mostra o botão de coração. */
  saved?: boolean;
  onSavedChange?: (saved: boolean) => void;
  nameAs?: NameTag;
}

/** Cartão de talento para buscas e shortlists do diretor de casting. */
export function TalentCard({
  name,
  href,
  linkProps,
  photo,
  age,
  location,
  skills = [],
  match,
  verified = false,
  saved = false,
  onSavedChange,
  nameAs: NameEl = "h3",
  className,
  ...rest
}: TalentCardProps) {
  const nameId = useId();
  const visible = skills.slice(0, 3);
  const extra = skills.length - visible.length;
  const meta = [age !== undefined ? `${age} anos` : null, location].filter(Boolean).join(" · ");

  return (
    <article aria-labelledby={nameId} className={cn("relative flex flex-col text-content", className)} {...rest}>
      <div className="relative">
        {renderMedia(photo, "3/4")}
        {match !== undefined && (
          <span className="absolute bottom-2 left-2 rounded-full bg-brand px-2.5 py-0.5 text-label-s font-semibold text-on-brand">
            {Math.round(match)}% compatível
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1.5 pt-3">
        <NameEl id={nameId} className="flex items-center gap-1 text-title-s font-semibold">
          <a href={href} {...linkProps} className={cn(stretchedLink, "truncate hover:underline underline-offset-2", linkProps?.className)}>
            {name}
          </a>
          {verified && <Icon name="check" size={16} label="Perfil verificado" className="text-brand-text" />}
        </NameEl>
        {meta && <MetaItem icon="pin">{meta}</MetaItem>}
        {visible.length > 0 && (
          <ul className="flex flex-wrap gap-1 pt-1" aria-label="Perfis">
            {visible.map((s) => (
              <li key={s}>
                <Tag variant="outline" size="s" className="border-line-subtle px-2 py-0.5 text-content-mid">
                  {s}
                </Tag>
              </li>
            ))}
            {extra > 0 && (
              <li>
                <Tag size="s" className="px-1 py-0.5 text-content-mid">
                  +{extra}
                </Tag>
              </li>
            )}
          </ul>
        )}
      </div>

      {onSavedChange && (
        <SaveToggle
          saved={saved}
          onToggle={() => onSavedChange(!saved)}
          label={saved ? `Remover ${name} dos favoritos` : `Favoritar ${name}`}
          className="absolute top-2 right-2"
        />
      )}
    </article>
  );
}
