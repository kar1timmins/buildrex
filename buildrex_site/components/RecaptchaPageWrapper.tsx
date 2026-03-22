// components/RecaptchaPageWrapper.tsx
"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useRecaptchaAction, RECAPTCHA_ACTIONS } from '../utils/recaptcha';

interface RecaptchaPageWrapperProps {
  children: React.ReactNode;
  pageAction?: string;
  trackPageView?: boolean;
}

export default function RecaptchaPageWrapper({ 
  children, 
  pageAction,
  trackPageView = true 
}: RecaptchaPageWrapperProps) {
  const router = useRouter();
  const { executeAction, isRecaptchaReady } = useRecaptchaAction();

  useEffect(() => {
    if (trackPageView && isRecaptchaReady) {
      const action = pageAction || `${RECAPTCHA_ACTIONS.PAGE_VIEW}_${router.pathname.replace('/', '') || 'home'}`;
      executeAction(action);
    }
  }, [router.pathname, isRecaptchaReady, trackPageView, pageAction, executeAction]);

  return <>{children}</>;
}
