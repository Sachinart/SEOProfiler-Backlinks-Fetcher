const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fakeUa = require('fake-useragent');

const searchSite = async (w) => {
    const browser = await puppeteer.launch();

    const page = await browser.newPage();

	// set user agent (override the default headless User Agent)
    await page.setUserAgent(fakeUa());

    await page.goto('https://www.seoprofiler.com/lp/links?pid=2f37be78d350cc37&q='+ w + '&num=100');

	// get the User Agent on the context of Puppeteer
	//const userAgent = await page.evaluate(() => navigator.userAgent );

	// If everything correct then no 'HeadlessChrome' sub string on userAgent
	//console.log(userAgent);
	
    //Finds input elements to enter username and password
    await page.type('input[name="username"]', 'xurihyb@inboxbear.com');
    await page.type('input[name="password"]', 'Sachin@8720');
	
    //Finds an button to submit the form, after so it executes .click() DOM Method
    await page.$eval('button[name="button"]', button => button.click());
	
	// take the screenshot to check if correct page is loaded
	await page.screenshot({path: 'example.png'});

	// if the selector holding the data exists on load
	if ((await page.$('div[id="lpt4"]')) !== null) {
		
		//Wait for one of the div classes to load fully
		await page.waitForSelector('div[id="lpt4"]');
		
		let data = [];
		let result = [];
		
		// put all contents of webpage to a variable
		const content = page.content();
		const searchResults = await content
			.then((success) => {
				
				// convert to cheerio object to traverse and get the data easily
				const $ = cheerio.load(success);
				
				$(".dataTable tbody tr").each( (index,element) => {
					const LIS = $(element).children('td').eq(0).children('p').text();
					const pageTitle = $(element).children('td').eq(2).children('b').text();
					const pageLink = $(element).children('td').eq(2).children('a').text();
					const type = $(element).children('td').eq(2).children('span').text();
					const anchorTitle = $(element).children('td').eq(3).children('a').text();
					const anchorLink = $(element).children('td').eq(3).children('a').attr('href');
					data.push({LIS,pageTitle, pageLink, type, anchorTitle, anchorLink});
				});
				result.push({"msg":"success","data":data});
				return result;
			});
		
		//console.log(searchResults);
		await browser.close();
		
		// return the data back
		return searchResults;
		
	// // if the selector holding the data does not exists on load
	} else {
		
		let result = [];
		
		const msg = "<p>The website "+ w +" is a special case domain. It is one of the most linked domains on the Internet. A very high percentage of all websites on the Internet link to linkedin.com</p><ul><li>The website linkedin.com is not a typical website with a typical link structure.</li><li>For that reason, it does not make sense to analyze the links that point to linkedin.com.</li><li>Analyzing the links of linkedin.com can easily lead to the wrong conclusions because there are all types of links that point to that website.</li><li>The very high number of links that point to linkedin.com and the popularity of linkedin.com is the reason why that website has good rankings.</li></ul><p>Analyzing the links of a special case website like this is a waste of your time. Focus on your direct competitors to improve the links that point to your own site.</p>";
		
		result.push({"msg":msg,"data":""});
		// return the data back
		return result;
	}

};

module.exports = searchSite;