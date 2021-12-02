export type RedirectRule = {
  path: string;
  redirectIfAuthorized: boolean
};

export type RedirectRules = {
  [key: string]: RedirectRule
}
