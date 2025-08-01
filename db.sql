-- Tạo bảng Users
CREATE TABLE users (
  id BIGINT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  role VARCHAR(50)
);

-- Thêm dữ liệu Users
INSERT INTO users (id, name, email, password, role) VALUES
(1753877575325, 'Admin', 'admin@gmail.com', '$2b$08$tM0t1mFCtBe1kPoPjBsAvO10mdgCW8tJC9FIPEXBwG3Gt3uwNlfaW', 'admin'),
(1753877745550, 'Phát', 'phat0@gmail.com', '$2b$08$NGMZzMhDT1JxzyxuaEILC.QhKrFPXGogwmnyIzzXgpDfxWiNJiib6', 'user'),
(1753879460127, 'user1', 'user1@gmail.com', '$2b$08$d2RJVdA21mXToc32mIlli.cFYoPLX0IAd4QwEJ5nqJHHaJ3PqmqIO', 'user');


-- Tạo bảng Blogs
CREATE TABLE blogs (
  id BIGINT PRIMARY KEY,
  userId BIGINT,
  title VARCHAR(255),
  content TEXT,
  createdAt BIGINT,
  fileUrl VARCHAR(255),
  FOREIGN KEY (userId) REFERENCES users(id)
);

-- Thêm dữ liệu Blogs
INSERT INTO blogs (id, userId, title, content, createdAt, fileUrl) VALUES
(1753877631603, 1753877575325, 'Tiêu đề mới ok done', 'Nội dung mới được cập nhật yes', 1753877631603, NULL),
(1753880468557, 1753877575325, 'blog2', 'VOV.VN - Dàn máy bay vận tải của Lữ đoàn Không quân 918 (Quân chủng Phòng không - Không quân) tập luyện bay xếp đội hình tại sân bay Gia Lâm, Hà Nội nhằm chuẩn bị thực hiện nhiệm vụ tại Lễ kỷ niệm 80 năm Cách mạng tháng Tám và Quốc khánh 2/9.\n', 1753880468557, NULL),
(1753880477631, 1753877575325, 'blog 3', 'VOV.VN - Dàn máy bay vận tải của Lữ đoàn Không quân 918 (Quân chủng Phòng không - Không quân) tập luyện bay xếp đội hình tại sân bay Gia Lâm, Hà Nội nhằm chuẩn bị thực hiện nhiệm vụ tại Lễ kỷ niệm 80 năm Cách mạng tháng Tám và Quốc khánh 2/9.', 1753880477631, NULL),
(1753952550353, 1753877575325, 'ok hello', 'ncadvadvanbdvasdbvasnbdbasvdbs', 1753952550353, NULL),
(1753954027871, 1753877575325, ' Blog 12', '@HoaHongDaiMusicVN\r\n1 năm trước\r\nCHÚC MỌI NGƯỜI CÓ NHỮNG PHÚT GIÂY NGHE NHẠC VUI VẺ. ĐỪNG QUÊN BẤM LIKE, BÌNH LUẬN VÀ ĐĂNG KÝ KÊNH HOA HỒNG DẠI MUSIC NHA\r\n♫ XIN MỜI CHỌN DANH SÁCH PHÁT BÊN DƯỚI', 1753954027871, '/uploads/1753957711105.png'),
(1753957422482, 1753877575325, 'blog 32', 'Top 50 Remix Nghe Nhiều ♫ Chắc Em Đã Quên Rồi, Bên Trên Tầng Lầu, Vương Vấn, Vui Lắm Nha Remix 2023', 1753957422482, '/uploads/1753957669142.png');
