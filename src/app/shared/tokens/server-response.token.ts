import { InjectionToken } from '@angular/core';
import type { Response } from 'express';

/**
 * Makes the active Express response available during SSR without depending on
 * the retired Angular Universal token package.
 */
export const SERVER_RESPONSE = new InjectionToken<Response>('SERVER_RESPONSE');
