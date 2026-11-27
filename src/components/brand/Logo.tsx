import type { ComponentPropsWithoutRef } from "react";
import { cn } from "../../lib/cn";
import logoDark from "../../assets/brand/good-casting-logo.svg";
import logoWhite from "../../assets/brand/good-casting-logo-white.svg";
import logoBlack from "../../assets/brand/good-casting-logo-preto.svg";

const sources = { principal: logoDark, branco: logoWhite, preto: logoBlack } as const;

export interface LogoProps extends Omit<ComponentPropsWithoutRef<"img">, "src" | "alt"> {
  /**
   * `principal`: texto #121212 e circuito Tiffany, sobre fundo claro.
   * `preto`: versão monocromática (tudo preto), quando a principal não garantir contraste.
   * `branco`: sobre fundo escuro ou de cor.
   */
  tone?: keyof typeof sources;
  /** Largura em px. Mínimo do DS: 84 (o brandbook pede 120; reduzido para o Header). Recomendado: 200. */
  width?: number;
  /** Texto alternativo. Vazio quando o logo é decorativo ao lado do nome. */
  alt?: string;
}

/** Logotipo oficial Good Casting. Não alterar cor, proporção nem aplicar efeitos (brandbook, p. 19). */
export function Logo({ tone = "principal", width = 200, alt = "Good Casting", className, ...rest }: LogoProps) {
  return (
    <img
      src={sources[tone]}
      alt={alt}
      width={Math.max(width, 84)}
      className={cn("block h-auto select-none", className)}
      draggable={false}
      {...rest}
    />
  );
}
