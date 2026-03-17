import * as dotenv from 'dotenv';

dotenv.config();

const asBool = (value: string | undefined) => value?.toLowerCase() === 'true';

export const env = {
  uiBaseUrl: process.env.UI_BASE_URL ?? 'https://www.saucedemo.com',
  apiBaseUrl: process.env.API_BASE_URL ?? 'https://petstore.swagger.io/v2',
  crossBrowser: asBool(process.env.CROSS_BROWSER),
  headed: asBool(process.env.HEADED)
};
