// This string need that sould did't have problem with conflicts.
const app = 'BearBy';


export const MTypeTabContent = {
  CONTENT: `@/${app}/content-script`,
  INJECTED: `@/${app}/injected-script`
};

export const MTypeTab = {
  GET_DATA: `@/${app}/get-wallet-data`,
  ACCOUNT_CHANGED: `@/${app}/accounts-just-changed`,
  CONTENT_PROXY_MEHTOD: `@/${app}/proxy-method`,
  CONTENT_PROXY_RESULT: `@/${app}/response-from-content`,
  CONNECT_APP: `@/${app}/connect-app`,
  DISCONNECT_APP: `@/${app}/disconnect-app`
};
