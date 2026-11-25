import { cva, type VariantProps } from "class-variance-authority";
import { useMemo, type ComponentPropsWithoutRef, type Ref } from "react";
import { cn } from "../../../lib/cn";

export const feeLabelVariants = cva("inline-flex flex-col text-content", {
  variants: {
    align: { start: "items-start", end: "items-end text-right" },
  },
  defaultVariants: { align: "start" },
});

const valueSize = { s: "text-title-s", m: "text-title" } as const;

export type FeeAmount = number | "a-definir" | "a-combinar";

export interface FeeLabelProps
  extends Omit<ComponentPropsWithoutRef<"span">, "children">,
    VariantProps<typeof feeLabelVariants> {
  ref?: Ref<HTMLSpanElement>;
  /** Valor do cachê, ou `a-definir` / `a-combinar`. */
  amount: FeeAmount;
  /** Mostra "até" antes do valor (maior cachê entre personagens). */
  upTo?: boolean;
  /** Código ISO 4217. Padrão `BRL`. */
  currency?: string;
  /** Localidade do `Intl.NumberFormat`. Padrão `pt-BR`. */
  locale?: string;
  /** Legenda acima do valor. Padrão "Cachê". `null` esconde. */
  caption?: string | null;
  /** `s` 16px (cartão) · `m` 18px (detalhe). Padrão `s`. */
  size?: keyof typeof valueSize;
}

const textual: Record<Exclude<FeeAmount, number>, string> = {
  "a-definir": "A definir",
  "a-combinar": "A combinar",
};

/** Cachê de casting: legenda pequena + valor em destaque. */
export function FeeLabel({
  amount,
  upTo = false,
  currency = "BRL",
  locale = "pt-BR",
  caption = "Cachê",
  size = "s",
  align,
  className,
  ...rest
}: FeeLabelProps) {
  const format = useMemo(
    () => new Intl.NumberFormat(locale, { style: "currency", currency, maximumFractionDigits: 0 }).format,
    [locale, currency],
  );
  const value = typeof amount === "number" ? format(amount) : textual[amount];

  return (
    <span className={cn(feeLabelVariants({ align }), className)} {...rest}>
      {caption && <span className="text-label-s text-content-mid">{caption}</span>}
      <span className={cn("font-semibold tabular-nums", valueSize[size])}>
        {upTo && typeof amount === "number" && <span className="font-normal">até </span>}
        {value}
      </span>
    </span>
  );
}
