import type { ComponentPropsWithRef, ComponentPropsWithoutRef } from "react";
import { cn } from "../../lib/cn";
import monogramWhite from "../../assets/brand/gd-casting.svg";
import monogramBlack from "../../assets/brand/gd-casting-preto.svg";

const sources = {
  preto: monogramBlack,
  branco: monogramWhite,
} as const;

/** Versões do monograma, mais `auto`, que segue o tema. */
export type MonogramTone = "auto" | keyof typeof sources;

/** Atributos repassados às `<img>`. */
export type MonogramImageProps = Pick<
  ComponentPropsWithoutRef<"img">,
  "loading" | "decoding" | "crossOrigin" | "referrerPolicy" | "fetchPriority"
>;

/**
 * Atributos do `<span>` raiz: `className`, `style`, `id`, `ref`, `hidden`, `data-*`, `aria-*` e eventos.
 * `onLoad`/`onError` ficam de fora porque não disparam num `<span>`.
 */
export type MonogramWrapperProps = Omit<
  ComponentPropsWithRef<"span">,
  "children" | "onLoad" | "onLoadCapture" | "onError" | "onErrorCapture"
>;

export interface MonogramProps extends MonogramWrapperProps, MonogramImageProps {
  /**
   * `auto`: preto no claro, branco no escuro (segue o `[data-theme]` mais próximo).
   * `preto`: sobre fundo claro. `branco`: sobre fundo escuro ou de cor.
   */
  tone?: MonogramTone;
  /** Largura em px. Padrão 120. Sem piso: o brandbook não define mínimo para o monograma (valor pendente). */
  width?: number;
  /** Texto alternativo. Vazio quando o monograma é decorativo ao lado do nome. */
  alt?: string;
}

/**
 * Monograma GD Casting®. Redesenho provisório; o texto Casting usa fonte do sistema quando
 * renderizado como imagem. Substituir pelo vetor oficial. Símbolo para espaços pequenos:
 * avatar, favicon, ícone do app, telas de acesso. Não alterar cor, proporção nem aplicar efeitos.
 *
 * Renderiza um `<span>` raiz (`block`, largura do conteúdo) com as imagens dentro. Em `auto` há duas
 * `<img>` e o tema decide qual aparece (`--gc-show-on-light` e `--gc-show-on-dark`); a oculta sai da
 * árvore de acessibilidade.
 */
export function Monogram({
  tone = "auto",
  width = 120,
  alt = "GD Casting",
  className,
  loading,
  decoding,
  crossOrigin,
  referrerPolicy,
  fetchPriority,
  ...rest
}: MonogramProps) {
  const img = {
    alt,
    width,
    draggable: false,
    className: "block h-auto",
    loading,
    decoding,
    crossOrigin,
    referrerPolicy,
    fetchPriority,
  };

  return (
    <span className={cn("block w-fit select-none", className)} {...rest}>
      {tone === "auto" ? (
        <>
          <img src={sources.preto} {...img} style={{ display: "var(--gc-show-on-light, block)" }} />
          <img src={sources.branco} {...img} style={{ display: "var(--gc-show-on-dark, none)" }} />
        </>
      ) : (
        <img src={sources[tone]} {...img} />
      )}
    </span>
  );
}
