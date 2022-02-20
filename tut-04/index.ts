import EventEmitter from 'events';
import { logEvents } from '../src/logEvents';

class MyEmmitter extends EventEmitter {}

const myEmmiter = new MyEmmitter();

myEmmiter.on('log', (msg: string) => logEvents(msg));

setTimeout(() => {
  myEmmiter.emit('log', 'Log event emitted!');
}, 2000);
