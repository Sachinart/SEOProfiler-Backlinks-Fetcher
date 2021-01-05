# SEOProfiler Backlinks Fetcher

This tool serve the purpose to fetch backlinks from SEOProfiler website. It use Puppeteer library of Node JS to login to your SEOProfiler account and scrap top 100 backlinks from the first page.

## How to run?

- Create an account in SEOProfiler
- Go to Backlinks from the left sidebar menu under Analyze Links
- Copy the pid from the URL and paste in line 13 in file searchSite.js
- Change username and password in line 22 and 23 in file searchSite.js
- Run the app in port 3003. You can change port in line 5 in file server.js
