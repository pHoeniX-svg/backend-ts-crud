import { promises } from 'fs';
import path from 'path';

const fileOps = async () => {
  try {
    const data = await promises.readFile(
      path.join(__dirname, 'files', 'starter.txt'),
      'utf-8'
    );
    console.log(data);
    await promises.unlink(path.join(__dirname, 'files', 'starter.txt'));

    await promises.writeFile(
      path.join(__dirname, 'files', 'promiseWrite.txt'),
      data
    );
    await promises.appendFile(
      path.join(__dirname, 'files', 'promiseWrite.txt'),
      '\n\nNice to meet you.'
    );
    await promises.rename(
      path.join(__dirname, 'files', 'promiseWrite.txt'),
      path.join(__dirname, 'files', 'promiseComplete.txt')
    );

    const newData = await promises.readFile(
      path.join(__dirname, 'files', 'promiseComplete.txt'),
      'utf-8'
    );
    console.log(newData);
  } catch (error) {
    console.error(error);
  }
};

fileOps();

// fs.readFile(
//   path.join(__dirname, 'files', 'starter.txt'),
//   'utf-8',
//   (err, data) => {
//     if (err) throw err;
//     console.log(data);
//   }
// );

// fs.writeFile(
//   path.join(__dirname, 'files', 'reply.txt'),
//   'Nice to meet you',
//   (err) => {
//     if (err) throw err;
//     console.log('Write Complete');

//     fs.appendFile(
//       path.join(__dirname, 'files', 'reply.txt'),
//       '\n\nYes, it is.',
//       (err) => {
//         if (err) throw err;
//         console.log('Write then...Append Complete');

//         fs.rename(
//           path.join(__dirname, 'files', 'reply.txt'),
//           path.join(__dirname, 'files', 'new.txt'),
//           (err) => {
//             if (err) throw err;
//             console.log('Rename Complete');
//           }
//         );
//       }
//     );
//   }
// );

//exit on uncaught errors
process.on('uncaughtException', (err) => {
  console.error(`There was an uncaught error: ${err}`);
  process.exit(1);
});
