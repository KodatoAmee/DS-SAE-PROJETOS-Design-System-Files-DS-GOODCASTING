import type { ComponentPropsWithoutRef } from "react";
import { cn } from "../../lib/cn";
import monogramWhite from "../../assets/brand/gd-casting.svg";
import monogramBlack from "../../assets/brand/gd-casting-preto.svg";

const sources = {
  preto: monogramBlack,
  branco: monogramWhite,
} as const;

export type MonogramTone = keyof typeof sources;

export interface MonogramProps extends Omit<ComponentPropsWithoutRef<"img">, "src" | "alt"> {
  /** `preto`: sobre fundo claro. `branco`: sobre fundo escuro ou de cor. */
  tone?: MonogramTone;
  /** Largura em px. Padrão 120. */
  width?: number;
  /** Texto alternativo. Vazio quando o monograma é decorativo ao lado do nome. */
  alt?: string;
}

/**
 * Monograma GD Casting® (arquivos oficiais). Símbolo para espaços pequenos:
 * avatar, favicon, ícone do app, telas de acesso. Não alterar cor, proporção nem aplicar efeitos.
 */
export function Monogram({ tone = "preto", width = 120, alt = "GD Casting", className, ...rest }: MonogramProps) {
  return (
    <img
      src={sources[tone]}
      alt={alt}
      width={width}
      className={cn("block h-auto select-none", className)}
      draggable={false}
      {...rest}
    />
  );
}
