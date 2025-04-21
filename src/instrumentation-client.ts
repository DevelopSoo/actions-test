// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

if (process.env.NODE_ENV !== 'development') {
  // if (true) {
  Sentry.init({
    dsn: 'https://ee8454b2430001c4b74533dd4f1ff516@o4509173918007296.ingest.us.sentry.io/4509173922004992',

    // Add optional integrations for additional features
    integrations: [Sentry.replayIntegration()],

    // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
    tracesSampleRate: 1,

    // Define how likely Replay events are sampled.
    // This sets the sample rate to be 10%. You may want this to be 100% while
    // in development and sample at a lower rate in production
    replaysSessionSampleRate: 0.1,

    // Define how likely Replay events are sampled when an error occurs.
    replaysOnErrorSampleRate: 1.0,

    // Setting this option to true will print useful information to the console while you're setting up Sentry.
    debug: false,
    beforeSend: (event, hint) => {
      const error = hint.originalException;
      if (
        error instanceof Error &&
        error.message.includes('이메일 형식이 올바르지 않습니다.')
      ) {
        console.log('에러 호출 멈춤');
        return null;
      }
      return event;
    },
  });
}
// }

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
