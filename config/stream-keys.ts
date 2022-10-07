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
  RESPONSE_CONNECT_APP: `@/${app}/respoonse-connect-app`,
  NETWORK_CHANGED: `@/${app}/network-just-changed`,
  LOCKED: `@/${app}/guard-just-lock`,
  TX_TO_SEND: `@/${app}/add-tx-to-send`,
  TX_TO_SEND_RESULT: `@/${app}/response-tx-result`
};
