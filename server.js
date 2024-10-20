const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev:false });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;
    if (pathname === '/feedback.aspx') {
      const { OutletID } = query;
      if (OutletID) {
        res.writeHead(301, { Location: `https://feedback.broadwaypizza.com.pk/feedbackorder.html?OutletID=${OutletID}` });
        res.end();
        return;
      }
    }

    handle(req, res, parsedUrl);
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});