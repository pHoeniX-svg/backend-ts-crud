import fs from 'fs';
import path from 'path';

const rs = fs.createReadStream(path.join(__dirname, 'files', 'lorem.txt'), {
  encoding: 'utf-8',
});

const ws = fs.createWriteStream(path.join(__dirname, 'files', 'new-lorem.txt'));

// rs.on('data', (dataChunk) => {
//   ws.write(dataChunk);
// });
rs.pipe(ws);
