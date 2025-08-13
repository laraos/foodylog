'use client';

// Inspired by react-hot-toast library
import * as React from 'react';

import { ToastAction, type ToastActionElement, type ToastProps } from '~/components/ui/toast';

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1000000;

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

const actionTypes = {
  ADD_TOAST: 'ADD_TOAST',
  UPDATE_TOAST: 'UPDATE_TOAST',
  DISMISS_TOAST: 'DISMISS_TOAST',
  REMOVE_TOAST: 'REMOVE_TOAST',
} as const;

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

type ActionType = typeof actionTypes

type Action =
  | {
      type: ActionType['ADD_TOAST']
      toast: ToasterToast
    }
  | {
      type: ActionType['UPDATE_TOAST']
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType['DISMISS_TOAST']
      toastId?: ToasterToast['id']
    }
  | {
      type: ActionType['REMOVE_TOAST']
      toastId?: ToasterToast['id']
    }

interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: 'REMOVE_TOAST',
      toastId: toastId,
    });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case 'UPDATE_TOAST':
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t,
        ),
      };

    case 'DISMISS_TOAST': {
      const { toastId } = action;

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id);
        });
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t,
        ),
      };
    }
    case 'REMOVE_TOAST':
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
  }
};

const listeners: Array<(_state: State) => void> = [];

let memoryState: State = { toasts: [] };

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}

type Toast = Omit<ToasterToast, 'id'>

function toast({ ...props }: Toast) {
  const id = genId();

  const update = (props: ToasterToast) =>
    dispatch({
      type: 'UPDATE_TOAST',
      toast: { ...props, id },
    });
  const dismiss = () => dispatch({ type: 'DISMISS_TOAST', toastId: id });

  dispatch({
    type: 'ADD_TOAST',
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) {dismiss();}
      },
    },
  });

  return {
    id: id,
    dismiss,
    update,
  };
}

function useToast() {
  const [_state, setState] = React.useState<State>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [setState]);

  return {
    ..._state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: 'DISMISS_TOAST', toastId }),
  };
}

/**
 * FoodyLog Toast Helper Functions
 * Convenient functions for common toast scenarios in the FoodyLog app
 */

/**
 * Show success toast for meal-related actions
 */
function showSuccessToast(title: string, description?: string) {
  return toast({
    variant: 'success',
    title,
    description,
  });
}

/**
 * Show error toast for meal-related actions
 */
function showErrorToast(title: string, description?: string) {
  return toast({
    variant: 'destructive',
    title,
    description,
  });
}

/**
 * Show warning toast for meal-related actions
 */
function showWarningToast(title: string, description?: string) {
  return toast({
    variant: 'warning',
    title,
    description,
  });
}

/**
 * Show info toast for meal-related actions
 */
function showInfoToast(title: string, description?: string) {
  return toast({
    variant: 'info',
    title,
    description,
  });
}

/**
 * Show meal saved toast with undo action
 */
function showMealSavedToast(mealTitle: string, onUndo?: () => void) {
  return toast({
    variant: 'success',
    title: 'Meal saved!',
    description: `"${mealTitle}" has been added to your food diary.`,
    action: onUndo ? React.createElement(ToastAction, {
      altText: 'Undo meal save',
      onClick: onUndo,
    }, 'Undo') as unknown as ToastActionElement : undefined,
  });
}

/**
 * Show photo upload progress toast
 */
function showPhotoUploadToast(progress: number) {
  const id = genId();
  
  const update = (newProgress: number) => {
    dispatch({
      type: 'UPDATE_TOAST',
      toast: {
        id,
        title: 'Uploading photo...',
        description: `${Math.round(newProgress)}% complete`,
        variant: 'info',
      },
    });
  };

  const complete = () => {
    dispatch({
      type: 'UPDATE_TOAST',
      toast: {
        id,
        title: 'Photo uploaded!',
        description: 'Your meal photo has been saved.',
        variant: 'success',
      },
    });
    
    // Auto-dismiss after 2 seconds
    setTimeout(() => {
      dispatch({ type: 'DISMISS_TOAST', toastId: id });
    }, 2000);
  };

  const error = (message?: string) => {
    dispatch({
      type: 'UPDATE_TOAST',
      toast: {
        id,
        title: 'Upload failed',
        description: message || 'Failed to upload photo. Please try again.',
        variant: 'destructive',
      },
    });
  };

  // Initial toast
  dispatch({
    type: 'ADD_TOAST',
    toast: {
      id,
      title: 'Uploading photo...',
      description: `${Math.round(progress)}% complete`,
      variant: 'info',
      open: true,
      onOpenChange: (open) => {
        if (!open) {dispatch({ type: 'DISMISS_TOAST', toastId: id });}
      },
    },
  });

  return { id, update, complete, error };
}

/**
 * Show offline sync toast
 */
function showOfflineSyncToast(pendingCount: number) {
  return toast({
    variant: 'info',
    title: 'Syncing meals...',
    description: `${pendingCount} meal${pendingCount > 1 ? 's' : ''} will sync when you're back online.`,
  });
}

/**
 * Show network error toast with retry action
 */
function showNetworkErrorToast(onRetry?: () => void) {
  return toast({
    variant: 'destructive',
    title: 'Connection error',
    description: 'Unable to connect to our servers. Please check your internet connection.',
    action: onRetry ? React.createElement(ToastAction, {
      altText: 'Retry connection',
      onClick: onRetry,
    }, 'Retry') as unknown as ToastActionElement : undefined,
  });
}

export { 
  useToast, 
  toast,
  showSuccessToast,
  showErrorToast,
  showWarningToast,
  showInfoToast,
  showMealSavedToast,
  showPhotoUploadToast,
  showOfflineSyncToast,
  showNetworkErrorToast,
};
