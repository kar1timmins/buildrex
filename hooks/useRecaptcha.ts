// hooks/useRecaptcha.ts
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useCallback } from 'react';

export const useRecaptcha = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const executeRecaptchaAction = useCallback(
    async (action: string) => {
      if (!executeRecaptcha) {
        console.warn('reCAPTCHA not available');
        return null;
      }

      try {
        const token = await executeRecaptcha(action);
        return token;
      } catch (error) {
        console.error('reCAPTCHA execution failed:', error);
        return null;
      }
    },
    [executeRecaptcha]
  );

  return { executeRecaptchaAction, isRecaptchaReady: !!executeRecaptcha };
};

export default useRecaptcha;
