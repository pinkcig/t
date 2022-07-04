# ✏️ console

Utilities for the console, logger included

# 📚 example

```ts
import { figures, colours, Logger } from '@pinkcig/console';

console.log(figures.tick); // ✔️
console.log(colours.debug, 'Hello, World!', colours.reset); // (green) Hello, World!

const logger = new Logger({
	depth: 2, // default: 0
	pretty: true, // default: true
	joinBy: '\n', // default: ' '
	name: 'my.logger', // default: 'server'
	debug: true, // default: false
});

logger.info('Hello, World!');
logger.debug('Hello, World!');
logger.error('Hello, World!');
logger.warn('Hello, World!');

logger.setName('other.logger');
logger.info('Hello, World!');
```
