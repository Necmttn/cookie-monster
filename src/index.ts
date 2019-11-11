import puppeteer from 'puppeteer';

const HASHTAG = 'streak';
(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    ignoreHTTPSErrors: true,
  });

  const page = await browser.newPage();

  await page.setRequestInterception(true);
  page.on('request', interceptedRequest => {
    if (
      interceptedRequest
        .url()
        .startsWith(`https://hashtagify.me/data/tags/${HASHTAG}`)
    ) {
      // console.log(interceptedRequest.url());
      // console.log(interceptedRequest.headers());
    }
    interceptedRequest.continue();
  });
  await page.goto(`https://hashtagify.me/hashtag/${HASHTAG}`);
  const cookies = await page.cookies();
  console.log(
    cookies.filter(c => c.name === '_hashtagify-pro_session').map(a => a.value)[0],
  );

  browser.close();
})();
