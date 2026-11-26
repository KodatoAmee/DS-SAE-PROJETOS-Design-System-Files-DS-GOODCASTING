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
import { cn } from "../../lib/cn";

/** Ícones com par direto no Circum Icons (react-icons/ci). */
const ciIcons = {
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
  users: CiUser,
  heart: CiHeart,
  star: CiStar,
} satisfies Record<string, IconType>;

/**
 * Ícones de traço fino (1px), desenhados para o DS. Grade 20x20.
 * Mantidos porque o Circum Icons não tem versão sem moldura deles.
 */
const paths = {
  close: <path d="M4 4l12 12M16 4L4 16" />,
  plus: <path d="M10 4v12M4 10h12" />,
  minus: <path d="M4 10h12" />,
  check: <path d="M4 10.5l4 4 8-9" />,
  "chevron-down": <path d="M5 7.5l5 5 5-5" />,
  "chevron-up": <path d="M5 12.5l5-5 5 5" />,
  "chevron-left": <path d="M12.5 5l-5 5 5 5" />,
  "chevron-right": <path d="M7.5 5l5 5-5 5" />,
  "arrow-right": <path d="M3 10h14M12 5l5 5-5 5" />,
  mask: (
    <>
      <path d="M4 4.5c4 1.2 8 1.2 12 0v5.5a6 6 0 01-12 0z" />
      <path d="M7 9h1.5M11.5 9H13M8 12.5c1.2.8 2.8.8 4 0" />
    </>
  ),
} as const;

type CiName = keyof typeof ciIcons;
type PathName = keyof typeof paths;
export type IconName = CiName | PathName;
export const iconNames = [...Object.keys(ciIcons), ...Object.keys(paths)] as IconName[];

const isCi = (name: IconName): name is CiName => name in ciIcons;

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, "name"> {
  name: IconName;
  /** Lado em px. Padrão 20. */
  size?: number;
  /** Nome acessível. Sem ele o ícone é decorativo (aria-hidden). */
  label?: string;
}

export function Icon({ name, size = 20, label, className, ...rest }: IconProps) {
  if (isCi(name)) {
    const CiIcon = ciIcons[name];
    return (
      <CiIcon
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

  return (
    <svg
      viewBox="0 0 20 20"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      strokeLinecap="square"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
      className={cn("shrink-0", className)}
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}
