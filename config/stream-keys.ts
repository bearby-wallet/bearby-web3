// This string need that sould did't have problem with conflicts.
const app = 'BearBy';


export const MTypeTabContent = {
  CONTENT: `@/${app}/content-script`,
  INJECTED: `@/${app}/injected-script`
};

export const MTypeTab = {
  GET_DATA: `@/${app}/get-wallet-data`,
  NEW_SLOT: `@/${app}/new-slot-emited`,
  CONNECTION_CHANGED: `@/${app}/connection-account-changed`,
  ACCOUNT_CHANGED: `@/${app}/accounts-just-changed`,
  CONTENT_PROXY_MEHTOD: `@/${app}/proxy-method`,
  CONTENT_PROXY_RESULT: `@/${app}/response-from-content`,
  CONNECT_APP: `@/${app}/connect-app`,
  RESPONSE_CONNECT_APP: `@/${app}/respoonse-connect-app`,
  NETWORK_CHANGED: `@/${app}/network-just-changed`,
  DISCONNECT_APP: `@/${app}/disconnect_app`,
  DISCONNECT_APP_RESULT: `@/${app}/disconnect_app_result`,
  LOCKED: `@/${app}/guard-just-lock`,
  TX_TO_SEND: `@/${app}/add-tx-to-send`,
  TX_TO_SEND_RESULT: `@/${app}/response-tx-result`,
  CHECK_MASSA_ADDRESS: `@/${app}/check-massa-address`,
  CHECK_MASSA_ADDRESS_RES: `@/${app}/check-massa-address-response`,
  SIGN_MESSAGE: `@/${app}/sign-message-call`,
  SING_MESSAGE_RESULT: `@/${app}/sign-message-response`,
  RESPONSE_PUB_KEY: `@/${app}/response-pub-key`,
  REQUEST_PUB_KEY: `@/${app}/request-pub-key`,
  REQUEST_PING: `@/${app}/req-content-ping`,
  PING_RESPONSE: `@/${app}/res-content-ping`,
};
