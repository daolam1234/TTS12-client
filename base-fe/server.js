// server.js
import jsonServer from 'json-server';
import cors from 'cors';

const app = jsonServer.create();
const router = jsonServer.router('db.json');

app.use(cors());
app.use(jsonServer.bodyParser);
app.use(auth); // Tạm thời bỏ
app.use(router);

app.listen(3000, () => {
  console.log('JSON Server is running on port 3000');
});
