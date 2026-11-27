import { useId, useRef, type ComponentPropsWithoutRef, type KeyboardEvent, type ReactNode, type Ref } from "react";
import { cn, focusRing } from "../../../lib/cn";
import { Icon } from "../../icon";
import { FieldMessage, useFieldIds } from "../FormField/FormField";
import { staticLabel, useControllableState } from "../FormField/field";

export interface ChipOption {
  value: string;
  /** Texto do chip. Padrão: o próprio `value`. */
  label?: ReactNode;
  disabled?: boolean;
}

export interface ChipSelectorProps
  extends Omit<ComponentPropsWithoutRef<"div">, "defaultValue" | "onChange" | "children"> {
  ref?: Ref<HTMLDivElement>;
  options: ChipOption[];
  /** `false` (padrão): escolha única, padrão `radiogroup`. `true`: várias, botões `aria-pressed`. */
  multiple?: boolean;
  /** Valores selecionados (controlado). Em escolha única, no máximo um. */
  value?: string[];
  /** Valores iniciais (não controlado). */
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  /** Máximo de escolhas em `multiple`. */
  max?: number;
  /** Rótulo visível acima. Sem ele, use `aria-label`. */
  label?: ReactNode;
  helperText?: ReactNode;
  error?: string;
  /** Com `name`, envia os valores em `<input type="hidden">` (um por valor). */
  name?: string;
  required?: boolean;
}

const chip = [
  "inline-flex min-h-10 items-center gap-1.5 rounded-full border px-4 text-label font-medium",
  "transition-[background-color,border-color,color] duration-200 ease-gc",
  "aria-disabled:cursor-not-allowed aria-disabled:border-line-subtle aria-disabled:text-content-disabled",
].join(" ");

const chipOn = "border-brand bg-brand-soft text-content";
const chipOff = "border-line-subtle bg-base text-content hover:border-brand";

/**
 * Chips de seleção: categorias de casting, perfis (ator, modelo, locutor), idiomas, gênero.
 * Fonte: chips single/multi do wizard de casting no app.
 */
export function ChipSelector({
  ref,
  id,
  options,
  multiple = false,
  value,
  defaultValue = [],
  onValueChange,
  max,
  label,
  helperText,
  error,
  name,
  required,
  className,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedBy,
  ...rest
}: ChipSelectorProps) {
  const ids = useFieldIds(id, { helperText, error, describedBy: ariaDescribedBy });
  const labelId = useId();
  const [current, setCurrent] = useControllableState(value, defaultValue, onValueChange);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const enabled = (o: ChipOption) => !o.disabled;
  const atMax = multiple && max !== undefined && current.length >= max;

  const toggle = (option: ChipOption) => {
    if (!enabled(option)) return;
    const on = current.includes(option.value);
    if (!multiple) {
      setCurrent([option.value]);
      return;
    }
    if (on) setCurrent(current.filter((v) => v !== option.value));
    else if (!atMax) setCurrent([...current, option.value]);
  };

  /* Escolha única: tabindex móvel e setas (padrão ARIA radiogroup). */
  const selectedIndex = options.findIndex((o) => current.includes(o.value) && enabled(o));
  const tabStop = selectedIndex >= 0 ? selectedIndex : options.findIndex(enabled);
  const moveTo = (from: number, step: 1 | -1) => {
    const total = options.length;
    for (let i = 1; i <= total; i++) {
      const next = (from + step * i + total) % total;
      if (enabled(options[next])) return next;
    }
    return from;
  };
  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (multiple) return;
    let target: number | null = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") target = moveTo(index, 1);
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") target = moveTo(index, -1);
    if (target !== null) {
      event.preventDefault();
      itemRefs.current[target]?.focus();
      toggle(options[target]);
    }
  };

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <span id={labelId} className={cn(staticLabel, "mb-3")}>
          {label}
        </span>
      )}
      <div
        ref={ref}
        id={ids.controlId}
        role={multiple ? "group" : "radiogroup"}
        aria-labelledby={label ? labelId : undefined}
        aria-label={label ? undefined : ariaLabel}
        aria-describedby={ids.describedBy}
        aria-invalid={multiple ? undefined : ids.invalid}
        aria-required={multiple ? undefined : required || undefined}
        className="flex flex-row flex-wrap gap-2"
        {...rest}
      >
        {options.map((option, index) => {
          const on = current.includes(option.value);
          const blocked = !enabled(option) || (atMax && !on);
          return (
            <button
              key={option.value}
              ref={(node) => {
                itemRefs.current[index] = node;
              }}
              type="button"
              role={multiple ? undefined : "radio"}
              aria-checked={multiple ? undefined : on}
              aria-pressed={multiple ? on : undefined}
              aria-disabled={blocked || undefined}
              tabIndex={multiple ? undefined : index === tabStop ? 0 : -1}
              onClick={() => !blocked && toggle(option)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className={cn(chip, on ? chipOn : chipOff, focusRing)}
            >
              {multiple && on && <Icon name="check" size={16} />}
              {option.label ?? option.value}
            </button>
          );
        })}
      </div>
      <FieldMessage
        helperId={ids.helperId}
        errorId={ids.errorId}
        helperText={helperText}
        error={error}
        className="mt-2"
      />
      {name && current.map((v) => <input key={v} type="hidden" name={name} value={v} />)}
    </div>
  );
}
