# Angular 22 Migration and SSR Change Summary

## Comparison scope

This document compares the following versions of the `main` branch:

- Baseline: `a0e7e47` - **Code uploded**
- Current: `main`, including the dynamic same-origin API routing update
- Prepared on: 27 October 2026

The comparison includes these migration commits:

1. `00730db` - Angular application migrated to version 22.
2. `93de3f4` - asynchronous server-side rendering stabilized.
3. `78e8981` - browser interactions restored while retaining SSR.
4. Dynamic same-origin API routing was added for browser and SSR requests.

The migration changed 415 files. Most HTML and component changes were mechanical Angular migrations rather than business-feature redesigns.

## Executive summary

The application was upgraded from Angular 17 to Angular 22 and moved away from the retired Angular Universal packages. The current application uses Angular's supported SSR engine, renders API-backed page content on the server for SEO, and keeps existing browser functionality such as Swiper sliders, menus, forms, routing, and media navigation.

Client hydration is intentionally disabled. The server still returns complete rendered HTML, but the browser performs a clean application bootstrap. This avoids conflicts between Angular hydration and Swiper 8, which changes slider DOM structure during initialization.

## Module-level changes

| Module or area | What changed | Why it changed |
| --- | --- | --- |
| Runtime and dependencies | Angular Core, Router, Forms, Animations, Platform Browser and Platform Server were upgraded from 17 to 22. Angular CLI and build tooling were upgraded to 22.2.x, TypeScript to 6.0.x, Zone.js to 0.15.x, and Node typings to version 22. | To move the project to a supported Angular generation and align the compiler, CLI, TypeScript, and runtime dependencies. |
| Node runtime policy | Node engine requirements and `.nvmrc` were added for supported even-numbered Node releases. | To prevent unsupported odd-numbered Node versions from being used for builds or production SSR. |
| Angular Universal replacement | Legacy `@nguniversal/*` dependencies were removed and SSR was moved to `@angular/ssr` and its Node integration. | Angular Universal is retired; Angular 22 provides the supported SSR implementation directly. |
| Application bootstrap | Browser and server bootstraps were updated for Angular 22. HTTP is now provided through the current provider-based API with Fetch support and DI interceptors. | To use supported Angular APIs and ensure HTTP requests participate correctly in SSR. |
| Global server-side rendering | All regular application URLs continue through the Express server and Angular rendering engine. Explicit server-side zone change detection was added. | To ensure asynchronous API results update the final server HTML consistently instead of intermittently returning an incomplete application shell. |
| SSR host and deployment handling | Production and local hostnames were allowed by the SSR engine, including the Excellent Publicity application subdomains. The server output continues to use separate `browser` and `server` build directories. | To support the production proxy hostname safely and match the Angular 22 application-builder output structure. |
| API host routing | Browser API requests now use same-origin `/api/...` URLs. During SSR, those URLs are resolved from the incoming forwarded protocol, hostname, and port. Direct local SSR uses `https://www.excellentpublicity.com` as a recursion-safe fallback, and `NG_API_ORIGIN` can provide an explicit server-only override. | To ensure production browser and SSR traffic passes through the active hostname's Nginx `/api/` upstream instead of silently bypassing it through a hardcoded external API hostname. |
| Server response and status handling | The old Angular Universal request/response tokens were replaced by a local server response token. Redirect and HTTP status behavior was retained through the shared status service. | To preserve redirects, 404 responses, and server response control without depending on removed Universal packages. |
| Browser hydration strategy | Angular client hydration was removed while SSR remained enabled. | Swiper 8 and other existing DOM-manipulating UI code are not reliably hydration-safe. A clean client bootstrap restores sliders, menu navigation, and other interactive behavior while keeping rendered source HTML for SEO. |
| HTTP interceptor | User-service access was changed to lazy dependency resolution inside authentication error handling. | To remove an Angular dependency-injection cycle exposed by the newer framework/runtime. |
| Google Tag Manager | The external Angular GTM wrapper was replaced with a small internal browser-only GTM service. | To remove an outdated Angular dependency and prevent analytics code from accessing browser APIs during server rendering. |
| Shared browser services | Shared metadata, cookie, GTM, redirect, and response services were updated for Angular 22 and SSR-safe execution. | To keep browser-only behavior out of the Node rendering process while preserving the same application behavior in the browser. |
| Shared UI and layouts | Header, footer, call-to-action, login, search, loader, schedule, static header/footer, and layout components received Angular 22 compatibility migrations. | These shared components are used across most routes and needed consistent template and component metadata compatibility. |
| Content Builder | The content-builder shell and its description, FAQ, feature, card, inquiry, navigation, related-product, clientele, step, highlight, and call-to-action sections were migrated. | To keep CMS/API-driven content compatible with Angular 22 control-flow syntax and server rendering. |
| Media catalogue | List and detail modules for Radio, Cinema, Digital, Transit, Outdoor, Newspaper, Magazine, Television, Mall, Influencer, Inflight, BTL, Sports, Airport, AI Tools, Monitoring Tools, Activation, Digital PR, In-film, Events, Non-traditional, and Corporate Gifting were migrated. | To preserve the existing filters, media listings, detail pages, prices, descriptions, metadata, and SEO content across the entire media catalogue. |
| Home module | The home page and its API-backed trending-media content were migrated. Slider behavior was verified after the hydration strategy was corrected. | To render home-page content for SEO without breaking autoplay and navigation in the browser. |
| Company and editorial modules | Company pages, careers, contact, clientele, testimonials, services, sitemap, Blog, News, and Case Studies were migrated. | To maintain existing public content, forms, metadata, and editorial routes on Angular 22. |
| Marketing and information pages | Advertising pages, IPL, cricket, Garba, SEO services, media insights, industry insights, community, landing pages, sales deck, budget estimator, and calculator modules were migrated. | To retain the existing campaign pages, reports, tools, forms, and SEO content. |
| User and transaction modules | Profile, cart, campaign, billing, orders, payment, invoice-download, review, and confirmation components received compatibility migrations. | To keep authenticated and transaction-related workflows compiling and operating under Angular 22. |
| SSR browser-global protection | Browser-only behavior found in Contact, Cricket Advertising, and Non-traditional pages was restricted to browser execution. | To prevent `window`, `history`, or `document` access from failing inside the Node SSR process. |
| Templates and change detection | Existing templates were mechanically migrated to Angular's current control-flow and safe-navigation output. Component change-detection metadata was updated to Angular 22 terminology. | These were framework migration requirements; they were not intended to change business logic or page content. |

## Functional behavior preserved

The migration was intended to preserve:

- Existing public URLs and lazy-loaded route organization.
- API contracts, filtering, pricing, authentication, forms, and transaction workflows.
- Page titles, meta descriptions, canonical URLs, structured data, and content-builder output.
- Header media navigation, home-page sliders, Swiper controls, Bootstrap behavior, and normal client-side routing.
- Existing Express redirects and application HTTP status handling.

## SSR and SEO result

SSR is configured at application level, not for one media page. Nginx sends application routes to the Node server, Express sends regular routes to Angular's SSR engine, and Angular renders the matched route and its asynchronous API content.

The Radio Mirchi detail page was used as a repeatable regression check because it contains a clear API-provided phrase. It was a test route only; the SSR change is shared by the whole application.

Disabling hydration does **not** disable SSR. Search engines and `view-source` still receive rendered HTML. The browser then starts the Angular application cleanly so older interactive libraries can initialize without reusing server-mutated DOM.

## Validation completed

- Angular 22 production browser and server build completed successfully.
- SSR was tested with supported Node 22 and the deployment Node 24 runtime.
- Repeated SSR requests consistently contained API-backed detail content.
- Same-origin browser API URLs and forwarded-host SSR API routing were verified. Stopping the configured hostname's API upstream now produces an upstream failure instead of silently loading data from the legacy hardcoded host.
- Home trending-media autoplay and slider initialization were verified in a real browser.
- Header slider navigation was verified.
- Radio, Cinema, Digital, Transit, and Outdoor navigation was verified independently.
- SSR safety checks were performed across the public sitemap routes.
- The Karma command completed successfully with four API-routing regression tests.

Existing bundle-size warnings remain. They do not stop the build, but bundle optimization should be handled separately from the migration.

## Deployment requirements

Deploy the complete `dist/excellent-publicity` output, including both:

- `browser/` — browser JavaScript, CSS, assets, and client index output.
- `server/` — Angular SSR bundles and the Node server entry point.

After replacing the build, restart the SSR container. Updating only `server.mjs` or only the `server/` directory is insufficient because the browser compatibility correction is part of the browser bundle.

Nginx must proxy `/api/` on every application hostname to the intended Laravel upstream and must forward `Host`, `X-Forwarded-Host`, `X-Forwarded-Proto`, and `X-Forwarded-Port` to SSR. `proxy.conf.json` remains limited to local `ng serve` development. If HTTP Basic Authentication is enabled at the Nginx server level, disable its inheritance inside `location /api/` (`auth_basic off;`) so server-side API requests are not challenged.

Normally no API hostname environment variable is required. `NG_API_ORIGIN` is available only when SSR must deliberately use a trusted API origin different from the incoming application hostname.

Use a supported Node LTS release defined by the project engine policy. The tested production-compatible runtime is Node 24.22.1.

## Follow-up observations

These items were identified during the migration audit and should be tracked separately:

- The legacy `/corporategifting` media route can be delayed by a backend API dependency; the separate `/corporate-gifting` public page renders normally.
- `/gtm-outreach`, `/gtm-outreach-calendar`, and `/insights` are listed in the sitemap but currently resolve through the application's 404 handling.
- Automated unit-test coverage should be expanded beyond the API-routing regression tests added with this change.

These observations do not change the global SSR architecture, but resolving them will improve whole-site reliability and release confidence.
