'use client';

import { Icon } from '@iconify/react';
import { cn } from '@/lib/utils';

interface SocialLoginButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  providerName: string;
  iconName: string;
  isLoading?: boolean;
}

export default function SocialLoginButton({ providerName, iconName, isLoading, className, ...props }: SocialLoginButtonProps) {
  return (
    <button
      {...props}
      disabled={isLoading || props.disabled}
      className={cn(
        "flex w-full items-center justify-center gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-4 py-3 text-sm font-semibold text-[var(--color-text-primary)] transition-all hover:bg-[var(--color-bg-elevated)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
    >
      {isLoading ? (
        <Icon icon="mdi:loading" className="h-5 w-5 animate-spin" />
      ) : (
        <Icon icon={iconName} className="h-5 w-5" />
      )}
      Lanjutkan dengan {providerName}
    </button>
  );
}
