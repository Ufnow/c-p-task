import { test, expect } from '@playwright/test';

test.describe('Game Dashboard E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200');
  });

  test('should load the game dashboard', async ({ page }) => {
    await expect(page.locator('.game-dashboard')).toBeVisible();
  });

  test('should switch game type to Starships', async ({ page }) => {
    await page.click('button:has-text("Starships")');
    await expect(page.locator('button:has-text("Starships")')).toHaveClass(
      /mat-focus-indicator/
    );
  });

  test('should play the game and show results', async ({ page }) => {
    await page.click('button:has-text("Play")');
    await expect(page.locator('.game-result')).toBeVisible();
  });

  test('should reset the game', async ({ page }) => {
    await page.click('button:has-text("Reset Game")');
    await expect(page.locator('.game-result')).toHaveText(
      "Click button 'Play' to draw the cards!"
    );
  });

  test('should handle scoring scenarios correctly', async ({ page }) => {
    await page.click('button:has-text("Play")');

    // Wait for cards to be fetched and displayed
    await expect(page.locator('.game-dashboard__cards__card')).toHaveCount(2);

    // Verify scores
    const initialFirstPlayerScoreText = await page
      .locator(
        '.game-dashboard__cards__card >> nth=0 >> text=Player one score:'
      )
      .textContent();
    const initialSecondPlayerScoreText = await page
      .locator(
        '.game-dashboard__cards__card >> nth=1 >> text=Player two score:'
      )
      .textContent();

    const initialFirstPlayerScore = initialFirstPlayerScoreText
      ? parseInt(
          initialFirstPlayerScoreText.replace('Player one score: ', ''),
          10
        )
      : 0;
    const initialSecondPlayerScore = initialSecondPlayerScoreText
      ? parseInt(
          initialSecondPlayerScoreText.replace('Player two score: ', ''),
          10
        )
      : 0;

    await page.click('button:has-text("Play")');

    const updatedFirstPlayerScoreText = await page
      .locator(
        '.game-dashboard__cards__card >> nth=0 >> text=Player one score:'
      )
      .textContent();
    const updatedSecondPlayerScoreText = await page
      .locator(
        '.game-dashboard__cards__card >> nth=1 >> text=Player two score:'
      )
      .textContent();

    const updatedFirstPlayerScore = updatedFirstPlayerScoreText
      ? parseInt(
          updatedFirstPlayerScoreText.replace('Player one score: ', ''),
          10
        )
      : initialFirstPlayerScore;
    const updatedSecondPlayerScore = updatedSecondPlayerScoreText
      ? parseInt(
          updatedSecondPlayerScoreText.replace('Player two score: ', ''),
          10
        )
      : initialSecondPlayerScore;

    // Check if one of the scores has increased
    const firstPlayerScoreIncreased =
      updatedFirstPlayerScore === initialFirstPlayerScore + 1;
    const secondPlayerScoreIncreased =
      updatedSecondPlayerScore === initialSecondPlayerScore + 1;

    // Ensure only one score has increased or neither (in case of a draw)
    if (firstPlayerScoreIncreased) {
      expect(updatedSecondPlayerScore).toBe(initialSecondPlayerScore);
    } else if (secondPlayerScoreIncreased) {
      expect(updatedFirstPlayerScore).toBe(initialFirstPlayerScore);
    } else {
      expect(updatedFirstPlayerScore).toBe(initialFirstPlayerScore);
      expect(updatedSecondPlayerScore).toBe(initialSecondPlayerScore);
    }
  });
});
