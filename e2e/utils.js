export const assertIsVisibleByText = async text => {
  return await expect(element(by.text(text))).toBeVisible();
};

export const assertIsVisibleByID = async id => {
  return await expect(element(by.id(id))).toBeVisible();
};

export const sleep = ms => new Promise(r => setTimeout(r, ms));
