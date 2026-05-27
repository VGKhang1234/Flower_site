const jsonServer = require('json-server');
const path = require('path');  // Thêm để xử lý đường dẫn tuyệt đối
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'hoa.json'));  // Đường dẫn tuyệt đối đến hoa.json
const middlewares = jsonServer.defaults();
const cors = require('cors');
const bodyParser = require('body-parser');

// ... code khác giữ nguyên ...

server.use(bodyParser.json());  // Parse JSON body
server.use(cors());

// ... middlewares và router giữ nguyên

// Log trạng thái DB để debug (sẽ in ra terminal khi chạy server)
console.log('Trạng thái DB đã load:', router.db.getState());

// Kích hoạt CORS cho mọi origin
server.use(cors());

// Sử dụng middlewares mặc định
server.use(middlewares);

// Sử dụng router
server.use(router);

// Khởi động server trên port 3000
server.listen(3000, '0.0.0.0', () => {
  console.log('JSON Server đang chạy với CORS enabled tại http://localhost:3000 và http://127.0.0.1:3000');
});