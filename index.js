const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();

const KoaBody = require('koa-body');
app.use(KoaBody());

app.use(async (context, next) => {
    let start = Date.now();
    await next();
    let ms = Date.now() - start;
    context.set("X-Response-Time", `${ms}ms`);
    console.log(`${context.method} ${context.url} - ${ms}ms.`);
});

const chain = new Router({ prefix: '/chain' });
const mine = new Router({ prefix: '/mine' });
const transaction = new Router({ prefix: '/transaction' });
const nodes = new Router({ prefix: '/nodes' });

chain.get('/', require('./controllers/chain').get);
mine.get('/', require('./controllers/mine').get);
transaction.post('/new', require('./controllers/transaction').post['new']);
nodes.post('/register', require('./controllers/nodes').post['register']);
nodes.get('/resolve', require('./controllers/nodes').get['resolve']);

app.use(chain.routes());
app.use(mine.routes());
app.use(transaction.routes());
app.use(nodes.routes());
// app.use(router.routes()).use(router.allowedMethods());

// app.use('/chain', require('./controllers/chain'));
// app.use('/mine', require('./controllers/mine'));
// app.use('/transaction', require('./controllers/transaction'));

app.listen(3000, () => {
    console.log('Blockchain is running at port 3000...');
});