import { createAction, createAsyncAction } from 'typesafe-actions';
import { KeySecret, User }                 from '~/interfaces/api';


export const FETCH_TOKEN = createAsyncAction(
  'session/FETCH_TOKEN_R',
  'session/FETCH_TOKEN_S',
  'session/FETCH_TOKEN_F',
)<void, KeySecret, Error>();


export const VERIFY_TOKEN = createAsyncAction(
  'session/VERIFY_TOKEN_R',
  'session/VERIFY_TOKEN_S',
  'session/VERIFY_TOKEN_F',
)<{ key: string, verifier: string }, { token: KeySecret, user: User }, Error>();


export const LOGOUT = createAction('session/LOGOUT')<void>();

export const AUTH_ERROR = createAction('session/AUTH_ERROR')<void>();
