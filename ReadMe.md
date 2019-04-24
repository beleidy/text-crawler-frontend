# Text crawler (frontend)

Text Crawler is an app that returns the text of any site you give it. It is intended as an aid for natural language processing practioners who can programatically collect data from the web. With this in mind, more features will be developed.

## App structure
![text-crawler-architecture](https://gitlab.com/text-crawler/text-crawler-backend/uploads/6578d22b9b6163c8950c0974c7a982d3/Screenshot_from_2019-04-16_15-46-00.png)

The app has 5 parts. 

1. The Crawlers: These are NodeJS processes that will collect the text. You can scale their deployment as your needs be, to speed up crawling. In order not to crawl the same pages, crawlers use:
2. Redis: Redis is an in memory data structure store. Crawlers place their pages to be scraped in a priority queue and retrieve their next page to be crawled from there
3. Elastic Search: A distributed search engine, with, among other features, full-text search capabilities. 
4. The Backend: Serves as the main backend server, receiving site addresses from the front end and adding them to the crawling queue if they're not already available in the database (Elastic Search).
5. **This repo** The Front-end: Provides an interface for connecting with the crawler

## Installing
### Prerequistes
* NodeJS
* A running [text-crawler backend](https://gitlab.com/-/ide/project/text-crawler/text-crawler-backend)
* A running [text-crawler crawler](https://gitlab.com/text-crawler/text-crawler-crawler) 

### Download
```
git clone https://gitlab.com/text-crawler/text-crawler-frontend.git
cd text-crawler-frontend
npm install
```
### Run
```
REACT_APP_BACKEND_ADDRESS='localhost:8000' npm start
```
Replace `localhost:8000` with the address of the running backend. 

### Browse
Point your browser at `localhost:3000` and you should see the app there.
