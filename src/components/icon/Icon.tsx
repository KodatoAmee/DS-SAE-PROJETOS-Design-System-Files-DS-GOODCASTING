import type { SVGProps } from "react";
import type { IconType } from "react-icons";
import {
  CiBag1,
  CiBookmark,
  CiCalendar,
  CiCircleInfo,
  CiCircleQuestion,
  CiClock1,
  CiFilter,
  CiHeart,
  CiLocationOn,
  CiMenuBurger,
  CiSearch,
  CiStar,
  CiUser,
} from "react-icons/ci";
import {
  PiArrowRightLight,
  PiCaretDownLight,
  PiCaretLeftLight,
  PiCaretRightLight,
  PiCaretUpLight,
  PiCheckLight,
  PiMaskHappyLight,
  PiMinusLight,
  PiPlusLight,
  PiUsersLight,
  PiXLight,
} from "react-icons/pi";
import { cn } from "../../lib/cn";
import { circumIcons } from "./circum";

/**
 * Todos os ícones vêm do React Icons, em traço fino:
 * Circum Icons (`react-icons/ci`) e, onde ele não tem par sem moldura,
 * Phosphor Light (`react-icons/pi`).
 */
const icons = {
  menu: CiMenuBurger,
  search: CiSearch,
  bag: CiBag1,
  user: CiUser,
  help: CiCircleQuestion,
  bookmark: CiBookmark,
  filter: CiFilter,
  info: CiCircleInfo,
  pin: CiLocationOn,
  calendar: CiCalendar,
  clock: CiClock1,
  users: PiUsersLight,
  heart: CiHeart,
  star: CiStar,
  close: PiXLight,
  plus: PiPlusLight,
  minus: PiMinusLight,
  check: PiCheckLight,
  "chevron-down": PiCaretDownLight,
  "chevron-up": PiCaretUpLight,
  "chevron-left": PiCaretLeftLight,
  "chevron-right": PiCaretRightLight,
  "arrow-right": PiArrowRightLight,
  mask: PiMaskHappyLight,
} satisfies Record<string, IconType>;

/** Nomes semânticos do DS + os 288 do Circum Icons com prefixo `ci-` (ex.: `ci-bag-1`). */
const allIcons = { ...icons, ...circumIcons };

export type IconName = keyof typeof allIcons;
/** Ícones semânticos do DS (os usados pelos componentes). */
export const iconNames = Object.keys(icons) as IconName[];
/** Catálogo completo do Circum Icons disponível via `name="ci-…"`. */
export const circumIconNames = Object.keys(circumIcons) as IconName[];

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, "name"> {
  name: IconName;
  /** Lado em px. Padrão 20. */
  size?: number;
  /** Nome acessível. Sem ele o ícone é decorativo (aria-hidden). */
  label?: string;
}

export function Icon({ name, size = 20, label, className, ...rest }: IconProps) {
  const Glyph = allIcons[name];
  return (
    <Glyph
      size={size}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
      className={cn("shrink-0", className)}
      {...rest}
    />
  );
}
