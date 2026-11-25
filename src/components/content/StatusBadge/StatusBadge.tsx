import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, Ref } from "react";
import { cn } from "../../../lib/cn";

export const statusBadgeVariants = cva(
  "inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-label-s font-medium",
  {
    variants: {
      tone: {
        neutral: "border-line-subtle bg-muted text-content-mid",
        brand: "border-brand bg-brand-soft text-content",
        info: "border-info bg-base text-info-text",
        success: "border-success bg-base text-success-text",
        warning: "border-warning bg-base text-warning-text",
        danger: "border-danger bg-base text-danger-text",
      },
    },
    defaultVariants: { tone: "neutral" },
  },
);

const dotClass = {
  neutral: "bg-content-mid",
  brand: "bg-brand-text",
  info: "bg-info",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
} as const;

export type StatusTone = keyof typeof dotClass;

/** Estados de candidatura do app (ver `candidacyStatusLabel` / `candidacyStatusTone` no goodcasting-app). */
export const candidacyStatus = {
  enviada: { label: "Candidatura enviada", tone: "info" },
  analise: { label: "Em análise", tone: "warning" },
  selecionado: { label: "Selecionado", tone: "success" },
  "nao-selecionado": { label: "Não selecionado", tone: "neutral" },
  convite: { label: "Convite recebido", tone: "brand" },
  expirado: { label: "Prazo expirado", tone: "danger" },
} as const satisfies Record<string, { label: string; tone: StatusTone }>;

export type CandidacyStatus = keyof typeof candidacyStatus;

export interface StatusBadgeProps
  extends ComponentPropsWithoutRef<"span">,
    VariantProps<typeof statusBadgeVariants> {
  ref?: Ref<HTMLSpanElement>;
  /** Atalho: estado de candidatura (define texto e tom). `children` e `tone` sobrepõem. */
  status?: CandidacyStatus;
  /** Ponto de cor antes do texto. Padrão `true`. */
  dot?: boolean;
}

/** Etiqueta de estado. A cor nunca é a única pista: o texto diz o estado. */
export function StatusBadge({ status, tone, dot = true, className, children, ...rest }: StatusBadgeProps) {
  const preset = status ? candidacyStatus[status] : undefined;
  const t: StatusTone = tone ?? preset?.tone ?? "neutral";
  return (
    <span className={cn(statusBadgeVariants({ tone: t }), className)} {...rest}>
      {dot && <span aria-hidden className={cn("size-1.5 rounded-full", dotClass[t])} />}
      {children ?? preset?.label}
    </span>
  );
}
