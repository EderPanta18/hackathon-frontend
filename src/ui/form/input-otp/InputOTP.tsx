// src/ui/form/input-otp/InputOTP.tsx

/* // ui/form/input-otp/InputOTP.tsx

Este componente se encuentra deshabilitado temporalmente debido a dependencias externas no instaladas. Antes de reactivarlo, asegúrese de instalar el paquete correspondiente y verificar su integración en el módulo.

"use client";

import { useContext } from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { MinusIcon } from "lucide-react";
import { cn } from "@/lib/styling";
import { INPUT_OTP_DEFAULTS } from "./input-otp.constants";
import type {
  InputOTPGroupProps,
  InputOTPProps,
  InputOTPSeparatorProps,
  InputOTPSlotProps,
} from "./input-otp.types";

const InputOTP = ({
  spellCheck = INPUT_OTP_DEFAULTS.spellCheck,
  containerClassName,
  className,
  ...props
}: InputOTPProps) => (
  <OTPInput
    data-slot="input-otp"
    spellCheck={spellCheck}
    containerClassName={cn(
      "cn-input-otp flex items-center has-disabled:opacity-50",
      containerClassName,
    )}
    className={cn("disabled:cursor-not-allowed", className)}
    {...props}
  />
);

const InputOTPGroup = ({ className, ...props }: InputOTPGroupProps) => (
  <div
    data-slot="input-otp-group"
    className={cn(
      "flex items-center rounded-lg",
      "has-aria-invalid:border-destructive",
      "has-aria-invalid:ring-3 has-aria-invalid:ring-destructive/20",
      "dark:has-aria-invalid:ring-destructive/40",
      className,
    )}
    {...props}
  />
);

const InputOTPSlot = ({ index, className, ...props }: InputOTPSlotProps) => {
  const context = useContext(OTPInputContext);

  const { char, hasFakeCaret, isActive } = context?.slots[index] ?? {};

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        "relative flex size-8 items-center justify-center text-sm",
        "border-y border-r border-input transition-all outline-none",
        "first:rounded-l-lg first:border-l last:rounded-r-lg",
        "aria-invalid:border-destructive",
        "dark:bg-input/30",
        "data-[active=true]:z-10",
        "data-[active=true]:border-ring",
        "data-[active=true]:ring-3 data-[active=true]:ring-ring/50",
        "data-[active=true]:aria-invalid:border-destructive",
        "data-[active=true]:aria-invalid:ring-destructive/20",
        "dark:data-[active=true]:aria-invalid:ring-destructive/40",
        className,
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
        </div>
      )}
    </div>
  );
};

const InputOTPSeparator = ({ ...props }: InputOTPSeparatorProps) => (
  <div
    data-slot="input-otp-separator"
    role="separator"
    className="flex items-center [&_svg:not([class*='size-'])]:size-4"
    {...props}
  >
    <MinusIcon />
  </div>
);

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
 */
