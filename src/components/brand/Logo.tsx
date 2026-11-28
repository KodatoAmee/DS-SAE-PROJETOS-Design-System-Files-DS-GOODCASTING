import { useEffect, useRef, type ComponentPropsWithRef, type ComponentPropsWithoutRef } from "react";
import { cn } from "../../lib/cn";
import logoPrincipal from "../../assets/brand/good-casting-logo.svg";
import logoNegativa from "../../assets/brand/good-casting-logo-white.svg";
import logoBranco from "../../assets/brand/good-casting-logo-branco.svg";
import logoPreto from "../../assets/brand/good-casting-logo-preto.svg";

// Tipagem mínima, local ao módulo: dispensa @types/node e não conflita com a global se ela existir.
declare const process: { env?: { NODE_ENV?: string } } | undefined;

const sources = {
  principal: logoPrincipal,
  negativa: logoNegativa,
  branco: logoBranco,
  preto: logoPreto,
} as const;

/**
 * Largura mínima digital do logotipo em px (brandbook p. 15). Espelha o token `size.logo-min`
 * de tokens/tokens.json; não é importado de lá porque o build de tipos tem `rootDir: "src"`.
 */
export const LOGO_MIN_WIDTH = 120;

/** Versões do logotipo (brandbook, pp. 17 e 18), mais `auto`, que segue o tema. */
export type LogoTone = "auto" | keyof typeof sources;

/** Atributos repassados às `<img>`. */
export type LogoImageProps = Pick<
  ComponentPropsWithoutRef<"img">,
  "loading" | "decoding" | "crossOrigin" | "referrerPolicy" | "fetchPriority"
>;

/**
 * Atributos do `<span>` raiz: `className`, `style`, `id`, `ref`, `hidden`, `data-*`, `aria-*` e eventos.
 * `onLoad`/`onError` ficam de fora porque não disparam num `<span>`.
 */
export type LogoWrapperProps = Omit<
  ComponentPropsWithRef<"span">,
  "children" | "onLoad" | "onLoadCapture" | "onError" | "onErrorCapture"
>;

export interface LogoProps extends LogoWrapperProps, LogoImageProps {
  /**
   * `auto`: principal no claro, negativa no escuro (segue o `[data-theme]` mais próximo).
   * `principal`: texto preto #000000 e circuito ciano (token `circuit`), sobre fundo claro.
   * `negativa`: branco com circuito ciano, sobre preto (p. 17).
   * `branco`: tudo branco, sobre preto ou azul-noite (p. 18).
   * `preto`: versão monocromática, quando a principal não garantir contraste.
   */
  tone?: LogoTone;
  /** Largura em px. Mínimo 120 (brandbook p. 15); recomendado 200. Abaixo disso, use o Monogram. */
  width?: number;
  /** Texto alternativo. Vazio quando o logo é decorativo ao lado do nome. */
  alt?: string;
}

/**
 * Logotipo Good Casting. Os arquivos atuais são de referência e serão substituídos pelos
 * vetores oficiais quando a marca os fornecer. Não alterar cor, proporção nem aplicar efeitos (brandbook, p. 19).
 *
 * Renderiza um `<span>` raiz (`block`, largura do conteúdo) com as imagens dentro. Em `auto` há duas
 * `<img>` e o tema decide qual aparece (`--gc-show-on-light` e `--gc-show-on-dark`); a oculta sai da
 * árvore de acessibilidade.
 */
export function Logo({
  tone = "auto",
  width = 200,
  alt = "Good Casting",
  className,
  loading,
  decoding,
  crossOrigin,
  referrerPolicy,
  fetchPriority,
  ...rest
}: LogoProps) {
  // `import.meta.env.DEV` cobre o Storybook (lá não há `process`) e vira `false` no build da lib;
  // `process.env.NODE_ENV` o Vite não substitui no modo biblioteca, e o bundler de quem consome substitui.
  const warned = useRef(false);
  useEffect(() => {
    const dev =
      import.meta.env.DEV || (typeof process !== "undefined" && process.env?.NODE_ENV !== "production");
    if (!dev || warned.current || width >= LOGO_MIN_WIDTH) return;
    warned.current = true;
    console.warn(`Logo: largura mínima ${LOGO_MIN_WIDTH} px (brandbook p. 15). Para espaços pequenos use o Monogram.`);
  }, [width]);

  const img = {
    alt,
    width: Math.max(width, LOGO_MIN_WIDTH),
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
          <img src={sources.principal} {...img} style={{ display: "var(--gc-show-on-light, block)" }} />
          <img src={sources.negativa} {...img} style={{ display: "var(--gc-show-on-dark, none)" }} />
        </>
      ) : (
        <img src={sources[tone]} {...img} />
      )}
    </span>
  );
}
