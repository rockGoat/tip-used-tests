// // tests/fixtures/logging.ts
// import { test as base, Page } from '@playwright/test';

// type LogEntry =
//   | { type: 'console-error'; text: string; location?: string }
//   | { type: 'console-warn'; text: string; location?: string }
//   | { type: 'page-error'; text: string }
//   | { type: 'request-failed'; url: string; errorText: string }
//   | { type: 'response-error'; url: string; status: number };

// type Fixtures = {
//   pageWithLogs: Page;
//   logs: LogEntry[];
// };

// export const test = base.extend<Fixtures>({
//   logs: async ({}, use) => {
//     const bucket: LogEntry[] = [];
//     await use(bucket);
//   },

//   pageWithLogs: async ({ browser, logs }, use) => {
//     const context = await browser.newContext();
//     const page = await context.newPage();

//     // всередині pageWithLogs
//     const CRITICAL_HOST = 'tip-used.com'; // підстав свій

//     function isOurHost(url: string): boolean {
//     try {
//         const u = new URL(url);
//         return u.hostname.endsWith(CRITICAL_HOST);
//     } catch {
//         return false;
//     }
//     }

//     // Критичні фейли реквестів
//     page.on('requestfailed', request => {
//     const url = request.url();
//     if (!isOurHost(url)) return; // ігноруємо сторонні домени

//     const failure = request.failure();
//     const errorText = failure ? failure.errorText : 'unknown';

//     // Можеш додатково відсікти деякі типи (наприклад, aborted by Playwright)
//     if (errorText.includes('net::ERR_ABORTED')) return;

//     logs.push({
//         type: 'request-failed',
//         url,
//         errorText,
//     });
//     });

//     // Критичні відповіді: тільки 5xx
//     page.on('response', response => {
//     const status = response.status();
//     if (status < 500) return; // 4xx вважаємо некритичними, наприклад 404 на іконку

//     const url = response.url();
//     if (!isOurHost(url)) return;

//     logs.push({
//         type: 'response-error',
//         url,
//         status,
//     });
//     });

//     // JS runtime errors
//     page.on('pageerror', err => {
//       logs.push({
//         type: 'page-error',
//         text: err.message,
//       });
//     });

//     // Network: requestfailed
//     page.on('requestfailed', request => {
//       const failure = request.failure();
//       logs.push({
//         type: 'request-failed',
//         url: request.url(),
//         errorText: failure ? failure.errorText : 'unknown',
//       });
//     });

//     // Network: responses with 4xx/5xx
//     page.on('response', response => {
//       const status = response.status();
//       if (status >= 400) {
//         logs.push({
//           type: 'response-error',
//           url: response.url(),
//           status,
//         });
//       }
//     });

//     await use(page);

//     await context.close();
//   },
// });

// test.afterEach(async ({ logs }, testInfo) => {
//   if (!logs.length) return;

//   const lines = logs.map((entry) => {
//     switch (entry.type) {
//       case 'console-error':
//         return `[console.error] ${entry.text}` +
//           (entry.location ? ` @ ${entry.location}` : '');
//       case 'console-warn':
//         return `[console.warn] ${entry.text}` +
//           (entry.location ? ` @ ${entry.location}` : '');
//       case 'page-error':
//         return `[pageerror] ${entry.text}`;
//       case 'request-failed':
//         return `[requestfailed] ${entry.url} – ${entry.errorText}`;
//       case 'response-error':
//         return `[response ${entry.status}] ${entry.url}`;
//     }
//   });

//   const content = lines.join('\n');

//   await testInfo.attach('console-and-network.log', {
//     body: content,
//     contentType: 'text/plain',
//   });
// });

// export const expect = test.expect;
