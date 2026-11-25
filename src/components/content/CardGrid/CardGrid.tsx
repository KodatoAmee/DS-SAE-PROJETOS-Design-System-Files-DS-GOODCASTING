import { cva } from "class-variance-authority";
import { Children, isValidElement, type ComponentPropsWithoutRef, type ReactNode, type Ref } from "react";
import { cn } from "../../../lib/cn";

export type CardGridView = 1 | 2 | 3;

/**
 * Densidades da grelha. `castings` usa cartões largos (1 / 2 / 3 colunas);
 * `talents` usa retratos (2 / 4 / 6 colunas).
 */
export const cardGridVariants = cva("grid list-none p-0", {
  variants: {
    kind: { castings: "", talents: "" },
    view: { 1: "", 2: "", 3: "" },
  },
  compoundVariants: [
    { kind: "castings", view: 1, class: "grid-cols-1 gap-4" },
    { kind: "castings", view: 2, class: "grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6" },
    { kind: "castings", view: 3, class: "grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6" },
    { kind: "talents", view: 1, class: "grid-cols-2 gap-x-3 gap-y-6 md:grid-cols-3 lg:grid-cols-4" },
    { kind: "talents", view: 2, class: "grid-cols-2 gap-x-3 gap-y-6 md:grid-cols-4 lg:grid-cols-5" },
    { kind: "talents", view: 3, class: "grid-cols-3 gap-x-2 gap-y-4 md:grid-cols-5 lg:grid-cols-6" },
  ],
  defaultVariants: { kind: "castings", view: 2 },
});

export interface CardGridProps extends ComponentPropsWithoutRef<"ul"> {
  ref?: Ref<HTMLUListElement>;
  /** Tipo de cartão. Padrão `castings`. */
  kind?: "castings" | "talents";
  /** Densidade: 1 (grande), 2 (padrão), 3 (compacta). */
  view?: CardGridView;
  /** Cartões. Cada filho é embrulhado em `<li>` (exceto se já for `<li>`). */
  children?: ReactNode;
}

export function CardGrid({ kind = "castings", view = 2, className, children, ...rest }: CardGridProps) {
  return (
    <ul className={cn(cardGridVariants({ kind, view }), className)} {...rest}>
      {Children.map(children, (child) => {
        if (child === null || child === undefined || typeof child === "boolean") return null;
        if (isValidElement(child) && child.type === "li") return child;
        return <li className="flex min-w-0 [&>*]:flex-1">{child}</li>;
      })}
    </ul>
  );
}
