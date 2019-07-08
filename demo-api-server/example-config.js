// this example-config exists so you know what to put in your config.js
// we gitignored ours 

// process.env.MONGODB_URL = "https://www.badgerbadgerbadger.com";
process.env.PORT = 3000;

console.log(`
configging -->
  MONGODB_URL: ${process.env.MONGODB_URL}
  PORT: ${process.env.PORT}
`);

// you'll need to make a new file next to this one called "config.js"
// paste in these lines and replace them with whatever you need