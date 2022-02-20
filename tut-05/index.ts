import EventEmitter from 'events';
import fs, { promises } from 'fs';
import http from 'http';
import path from 'path';
import { logEvents } from './logEvents';

class Emmitter extends EventEmitter {}

const myEmmiter = new Emmitter();
myEmmiter.on('log', (msg: string, fileName) => logEvents(msg, fileName));

const PORT = process.env.PORT || 3500;

const serveFile = async (
  filePath: string,
  contentType: string,
  response: http.ServerResponse
) => {
  try {
    const rawData = await promises.readFile(
      filePath,
      !contentType.includes('image') ? 'utf8' : null
    );

    const data =
      contentType === 'application/json'
        ? JSON.parse(rawData as string)
        : rawData;

    response.writeHead(filePath.includes('404.html') ? 404 : 200, {
      'Content-Type': contentType,
    });

    response.end(
      contentType === 'application/json' ? JSON.stringify(data) : data
    );
  } catch (error) {
    let err = error as Error;
    console.error(error);
    myEmmiter.emit('log', `${err.name}\t${err.message}`, 'error-log.txt');

    response.statusCode = 500;
    response.end();
  }
};

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  const requestedUrl = req.url as string;
  const requestMethod = req.method as string;
  myEmmiter.emit('log', `${requestedUrl}\t${requestMethod}`, 'request-log.txt');

  const extension = path.extname(requestedUrl);

  let contentType: string;

  switch (extension) {
    case '.css':
      contentType = 'text/css';
      break;
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.jpg':
      contentType = 'image/jpeg';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.ts':
      contentType = 'text/javascript';
      break;
    case '.txt':
      contentType = 'text/plain';
      break;
    default:
      contentType = 'text/html';
  }

  let filePath =
    contentType === 'text/html' && requestedUrl === '/'
      ? path.join(__dirname, 'views', 'index.html')
      : contentType === 'text/html' && requestedUrl.slice(-1) === '/'
      ? path.join(__dirname, 'views', requestedUrl, 'index.html')
      : contentType === 'text/html'
      ? path.join(__dirname, 'views', requestedUrl)
      : path.join(__dirname, requestedUrl);

  // makes the .html extension not required in the browser
  if (!extension && requestedUrl.slice(-1) !== '/') {
    filePath += '.html';
  }

  const fileExists = fs.existsSync(filePath);

  if (fileExists) {
    serveFile(filePath, contentType, res);
  } else {
    switch (path.parse(filePath).base) {
      case 'old-page.html':
        res.writeHead(301, { Location: '/new-page.html' });
        res.end();
        break;
      case 'www-page.html':
        res.writeHead(301, { Location: '/' });
        res.end();
        break;
      default:
        serveFile(path.join(__dirname, 'views', '404.html'), 'text/html', res);
    }
  }
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
