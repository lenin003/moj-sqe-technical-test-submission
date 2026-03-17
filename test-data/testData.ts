export const testData = {
  ui: {
    // SauceDemo default public credentials, can be overridden by env vars
    username: process.env.UI_USERNAME ?? 'standard_user',
    password: process.env.UI_PASSWORD ?? 'secret_sauce'
  }
};
