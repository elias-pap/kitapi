import {assertIsVisibleByID, assertIsVisibleByText} from './utils';

describe('Initial Rendering', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should display tabs', async () => {
    await assertIsVisibleByID('score-tab-button');
    await expect(element(by.text('ΣΚΟΡ')).atIndex(0)).toBeVisible();
    await expect(element(by.text('ΣΚΟΡ')).atIndex(1)).toBeVisible();
    await assertIsVisibleByID('rounds-tab-button');
    await expect(element(by.text('ΓΥΡΟΙ')).atIndex(0)).toBeVisible();
    await expect(element(by.text('ΓΥΡΟΙ')).atIndex(1)).toBeVisible();
    await assertIsVisibleByID('game-tab-button');
    await expect(element(by.text('ΠΑΙΧΝΙΔΙ')).atIndex(0)).toBeVisible();
    await expect(element(by.text('ΠΑΙΧΝΙΔΙ')).atIndex(1)).toBeVisible();
  });

  it('should display score tab', async () => {
    await assertIsVisibleByText('Πρόοδος Παιχνιδιού: 0/300');
    await assertIsVisibleByID('game-progress-bar');
    await assertIsVisibleByText('Player 1');
    await assertIsVisibleByID('Player 1-score');
    await assertIsVisibleByID('Player 1-diff');
    await assertIsVisibleByText('Player 2');
    await assertIsVisibleByID('Player 2-score');
    await assertIsVisibleByID('Player 2-diff');
    await assertIsVisibleByText('Player 3');
    await assertIsVisibleByID('Player 3-score');
    await assertIsVisibleByID('Player 3-diff');
  });

  // it.only('should display rounds tab', async () => {
  //   await element(by.id('game-progress-bar')).swipe('left');
  //   await assertIsVisibleByText('#');
  // });
});
