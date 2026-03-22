// utils/recaptcha.ts
import { useRecaptcha } from '../hooks/useRecaptcha';

// Common reCAPTCHA actions used throughout the app
export const RECAPTCHA_ACTIONS = {
  CONTACT_FORM: 'contact_form_submit',
  PAGE_VIEW: 'page_view',
  BUTTON_CLICK: 'button_click',
  FORM_INTERACTION: 'form_interaction',
  NAVIGATION: 'navigation',
  SEARCH: 'search',
} as const;

// Helper function to execute reCAPTCHA with consistent error handling
export const executeRecaptchaWithErrorHandling = async (
  executeRecaptchaAction: (action: string) => Promise<string | null>,
  action: string,
  onError?: (error: string) => void
): Promise<string | null> => {
  try {
    const token = await executeRecaptchaAction(action);
    if (!token) {
      const errorMsg = 'reCAPTCHA verification failed';
      onError?.(errorMsg);
      console.warn(errorMsg);
    }
    return token;
  } catch (error) {
    const errorMsg = `reCAPTCHA execution failed for action "${action}": ${error}`;
    onError?.(errorMsg);
    console.error(errorMsg);
    return null;
  }
};

// React hook for easy reCAPTCHA integration in any component
export const useRecaptchaAction = () => {
  const { executeRecaptchaAction, isRecaptchaReady } = useRecaptcha();

  const executeAction = (action: string, onError?: (error: string) => void) => {
    if (!isRecaptchaReady) {
      console.warn('reCAPTCHA not ready yet');
      return Promise.resolve(null);
    }
    return executeRecaptchaWithErrorHandling(executeRecaptchaAction, action, onError);
  };

  return { executeAction, isRecaptchaReady };
};

export default {
  RECAPTCHA_ACTIONS,
  executeRecaptchaWithErrorHandling,
  useRecaptchaAction,
};
