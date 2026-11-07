import { InjectionToken } from '@angular/core';
import type { Request, Response } from 'express';

// Local replacements for the REQUEST/RESPONSE tokens previously imported from
// '@nguniversal/express-engine/tokens'. Provided by server.ts during SSR only.
export const REQUEST = new InjectionToken<Request>('REQUEST');
export const RESPONSE = new InjectionToken<Response>('RESPONSE');
