require("dotenv").config();
const puppeteer = require("puppeteer");
(async () => {
  const browser = await puppeteer.launch({
    args: ['--disable-web-security', '--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  console.log("\n\n STARTED \n");
  await page.goto("https://rms.comax.co.il/login");

  // Set screen size
  await page.setViewport({ width: 1080, height: 1024 });

  // Type into login field
  await page.type("#email", process.env.COMAX_BINA_USERNAME);
  await page.type(
    'input[name="password_unhash"]',
    process.env.COMAX_BINA_PASSWORD
  );

  await page.click('button[type="submit"]');
  await page.waitForSelector(".charts-filters");

  console.log("Connected! fetching data");
  await page.evaluate(() => {

    fetch(
      "https://rms.comax.co.il/sales/customers/list/?order=0&active=all&start=0&length=1000000&addLog=true",
      {
        headers: {
          accept: "*/*",
          "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
          "sec-ch-ua":
            '"Google Chrome";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Linux"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-requested-with": "XMLHttpRequest",
        },
        referrer: "https://rms.comax.co.il/",
        referrerPolicy: "strict-origin-when-cross-origin",
        body: null,
        method: "GET",
        mode: "cors",
        credentials: "include",
      }
    ).then((res) => {
      res.json().then((data) => {
        fetch("process.env.ALL_CUSTOMERS_HOOK", {
          body: JSON.stringify(data),
          method: "POST",
        });
      });
    });

    return fetch(
      "https://rms.comax.co.il/sales/invoices/list/?type=invoice_receipt&order=1&sorting=datedoc&location=371&start=0&length=1000000&addLog=true",
      {
        headers: {
          accept: "*/*",
          "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
          "sec-ch-ua":
            '"Google Chrome";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Linux"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-requested-with": "XMLHttpRequest",
        },
        referrer: "https://rms.comax.co.il/",
        referrerPolicy: "strict-origin-when-cross-origin",
        body: null,
        method: "GET",
        mode: "cors",
        credentials: "include",
      }
    ).then((res) => {
      res.json().then((data) => {
        fetch("process.env.ALL_INVOICES_HOOK", {
          body: JSON.stringify(data),
          method: "POST",
        });
      });
    });
  });

  console.log("DONE");
  await page.waitForNetworkIdle();
  await browser.close();
})();
