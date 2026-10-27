import { InjectionToken } from '@angular/core';
import type { Request } from 'express';

/** The active Express request while Angular is rendering on the server. */
export const SERVER_REQUEST = new InjectionToken<Request>('SERVER_REQUEST');

/** Optional trusted origin used to override the incoming SSR request host. */
export const SERVER_API_ORIGIN = new InjectionToken<string | null>('SERVER_API_ORIGIN');
