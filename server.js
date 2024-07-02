// const jsonServer = require('json-server');
// const server = jsonServer.create();
// const router = jsonServer.router('db.json');
// const middlewares = jsonServer.defaults();

// server.use(middlewares);

// // To handle POST, PUT, and PATCH, you need to use a body-parser
// server.use(jsonServer.bodyParser);

// // Add custom routes before JSON Server router
// server.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     if (req.method === 'OPTIONS') {
//         return res.sendStatus(200);
//     }
//     next();
// });

// server.use('/api', router);
// server.listen(5000, () => {
//     console.log('JSON Server is running on http://localhost:5000');
// });

const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const port = 5000;

server.use(middlewares);

// Middleware to check for duplicate users
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === 'POST' && req.path === '/users') {
    const { email } = req.body;
    const db = router.db; // lowdb instance
    const existingUser = db.get('users').find({ email }).value();

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
  }
  next();
});

server.use(router);

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
