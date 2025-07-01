import { test, expect } from '@playwright/test';
import path from 'path';
import { pathToFileURL } from 'url';

test('should play video @smoke', async ({ page, browserName }) => {
  // Our test server doesn't support range requests required to play on Mac,
  // so we load the page using a file url.
  const fileName = browserName === 'webkit' ? 'video_mp4.html' : 'video.html';
  await page.goto(pathToFileURL(path.join(__dirname, '../public', fileName)).href);
  await page.$eval('video', v => v.play());
  await page.$eval('video', v => v.pause());
});


test('should play audio @smoke', async ({ page }) => {
  await page.goto('/audio.html');
  await page.setContent(`<audio src="/example.mp3"></audio>`);
  await page.$eval('audio', e => e.play());
  await page.waitForTimeout(1000);
  await page.$eval('audio', e => e.pause());
  expect(await page.$eval('audio', e => e.currentTime)).toBeGreaterThan(0.2);
});