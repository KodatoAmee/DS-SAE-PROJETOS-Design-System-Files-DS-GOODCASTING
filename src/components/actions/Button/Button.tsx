import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ReactNode, Ref } from "react";
import { cn, focusRing } from "../../../lib/cn";
import { Icon, type IconName } from "../../icon";

export const buttonVariants = cva(
  [
    "inline-flex select-none items-center justify-center gap-2 rounded-control",
    "font-medium whitespace-nowrap",
    "transition-[background-color,border-color,color,opacity] duration-200 ease-gc",
    "disabled:pointer-events-none aria-disabled:pointer-events-none",
    focusRing,
  ],
  {
    variants: {
      variant: {
        /** Preto sólido, texto branco. Uma por tela. */
        primary:
          "border border-inverse bg-inverse text-on-inverse hover:border-inverse-hover hover:bg-inverse-hover disabled:border-content-disabled disabled:bg-content-disabled",
        /** Azul Tiffany, texto preto (13:1). Destaque de marca: "Completar perfil", "Candidatar". */
        brand:
          "border border-brand bg-brand text-on-brand hover:opacity-85 disabled:border-content-disabled disabled:bg-content-disabled disabled:text-on-inverse",
        /** Contorno 1px, fundo da página. */
        secondary:
          "border border-line bg-transparent text-content hover:border-brand disabled:border-content-disabled disabled:text-content-disabled",
        /** Só texto, sem sublinhado no hover. */
        tertiary:
          "border border-transparent bg-transparent text-content underline-offset-4 disabled:text-content-disabled",
      },
      size: {
        /** 40px: ações compactas. */
        s: "h-10 px-4 text-label",
        /** 48px: padrão. */
        m: "h-12 px-5 text-action",
        /** 56px: CTA de rodapé do app. */
        l: "h-14 px-6 text-action",
      },
      fullWidth: { true: "w-full", false: "" },
    },
    compoundVariants: [{ variant: "tertiary", class: "px-0" }],
    defaultVariants: { variant: "primary", size: "m", fullWidth: false },
  },
);

export interface ButtonProps
  extends ComponentPropsWithoutRef<"button">,
    VariantProps<typeof buttonVariants> {
  ref?: Ref<HTMLButtonElement>;
  /** Ícone antes do texto. */
  iconStart?: IconName;
  /** Ícone depois do texto. */
  iconEnd?: IconName;
  /** Mostra estado de espera e bloqueia o clique. */
  loading?: boolean;
  children?: ReactNode;
}

export function Button({
  variant,
  size,
  fullWidth,
  iconStart,
  iconEnd,
  loading = false,
  disabled,
  className,
  children,
  type = "button",
  onClick,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      aria-disabled={loading || undefined}
      aria-busy={loading || undefined}
      className={cn(buttonVariants({ variant, size, fullWidth }), className)}
      // `pointer-events-none` não bloqueia Enter/Espaço: em loading o clique é anulado aqui.
      onClick={loading ? (event) => event.preventDefault() : onClick}
      {...rest}
    >
      {loading ? (
        <span aria-hidden className="inline-flex gap-1">
          <span className="size-1 animate-gc-pulse bg-current" />
          <span className="size-1 animate-gc-pulse bg-current [animation-delay:200ms]" />
          <span className="size-1 animate-gc-pulse bg-current [animation-delay:400ms]" />
        </span>
      ) : (
        iconStart && <Icon name={iconStart} size={16} />
      )}
      {children}
      {!loading && iconEnd && <Icon name={iconEnd} size={16} />}
    </button>
  );
}
