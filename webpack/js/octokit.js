import {Octokit} from '@octokit/rest';

const AUTH_TOKEN = '';

export const octokit = new Octokit({
  auth: AUTH_TOKEN
});