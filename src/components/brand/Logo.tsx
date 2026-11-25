import type { ComponentPropsWithoutRef } from "react";
import { cn } from "../../lib/cn";
import logoDark from "../../assets/brand/good-casting-logo.svg";
import logoWhite from "../../assets/brand/good-casting-logo-white.svg";

export interface LogoProps extends Omit<ComponentPropsWithoutRef<"img">, "src" | "alt"> {
  /** `principal`: texto #121212 sobre fundo claro. `branco`: sobre fundo escuro ou de cor. */
  tone?: "principal" | "branco";
  /** Largura em px. Mínimo digital do brandbook: 120. Recomendado: 200. */
  width?: number;
  /** Texto alternativo. Vazio quando o logo é decorativo ao lado do nome. */
  alt?: string;
}

/** Logotipo oficial Good Casting. Não alterar cor, proporção nem aplicar efeitos (brandbook, p. 19). */
export function Logo({ tone = "principal", width = 200, alt = "Good Casting", className, ...rest }: LogoProps) {
  return (
    <img
      src={tone === "branco" ? logoWhite : logoDark}
      alt={alt}
      width={Math.max(width, 120)}
      className={cn("block h-auto select-none", className)}
      draggable={false}
      {...rest}
    />
  );
}
