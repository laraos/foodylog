/**
 * FoodyLog Toaster Component
 * 
 * Enhanced toaster that displays toast notifications with FoodyLog branding.
 * Automatically includes appropriate icons and handles different variants.
 * Positioned for optimal mobile and desktop experience.
 */

import { useToast } from '~/hooks/use-toast';
import {
  ToastWithIcon,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '~/components/ui/toast';

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <ToastWithIcon key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
          </ToastWithIcon>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
