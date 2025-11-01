const bcrypt = require('bcryptjs');

const pin = '7653';
const hash = bcrypt.hashSync(pin, 12);

console.log('Admin PIN Hash for .env.local:');
console.log(`ADMIN_PIN_HASH=${hash}`);
console.log('\nCopy this line to your .env.local file');