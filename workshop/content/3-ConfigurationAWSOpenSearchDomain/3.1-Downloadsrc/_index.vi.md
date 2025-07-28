---
title : "Tải tài nguyên"
date : "" 
weight : 1 
chapter : false
pre : " <b> 3.1. </b> "
---

1. Di chuyển vào vị trí bạn muốn tải xuống tài nguyên dự án, sau đó mở Gitbash hoặc Command Line tại vị trí hiện tại và thực thi câu lệnh sau
{{< copycode >}}
git clone https://github.com/DannyCandy/AWSOpensearchApplication.git
{{< /copycode >}}

![Connect](/images/3.connect/001-3.1-downloadsrc.png)

2. Sử dụng dữ liệu mặc định của MongoDB Atlas.
  + Ở bước này ta sẽ sử dụng dữ liệu sample của MongoDB Atlas để thêm dữ liệu vào OpenSearch Domain, dữ liệu này có hơn 20000 bản ghi sẽ giúp ta hiểu rõ hơn sức mạnh và sự hiệu quả của việc ứng dụng OpenSearch vào các công cụ tìm kiếm, chẳng hạn như dự án ta vừa tải xuống.
  + Truy cập vào trang chủ MongoDB Atlas và tạo tài khoản [giao diện đăng nhập MongoDB Atlas](https://account.mongodb.com/account/login).
  + Sau khi tạo tài khoản thành công và đăng nhập trang chủ MongoDB Atlas ta sẽ tạo mới một Clusters
  + Với cluster vừa tạo, ta đã có một Databases có tên **sample_mflix** sẵn có của MongoDB Atlas với 6 collections.

![Connect](/images/3.connect/002-3.1-databasesample.png)

  + Ta chọn collection movies với 21349 bản ghi để cấu hình index và dữ liệu đầu vào cho OpenSearch

![Connect](/images/3.connect/003-3.1-collectionmovies.png)

3. Lấy chuỗi kết nối tới cơ sở dữ liệu từ MongoDB Atlas
  + Tại trang chủ MongoDB Atlas, ta chọn tab **Database Access** ở thanh điều hướng bên trái 

![Connect](/images/3.connect/005-3.1-getpassword.png)

  + Chọn nút **Edit**, trong hộp thoại Edit User vừa hiện ra, ta chọn **Edit Password**, sau đó ta cập nhật mật khẩu người dùng và cuộn xuống bên dưới, chọn **Update User**. Hãy lưu ý ghi nhớ mật khẩu này để dùng cho các bước sau

![Connect](/images/3.connect/006-3.1-editpassword.png)

  + Tại trang chủ MongoDB Atlas mà ta vừa truy cập, ta chọn tab **Overview** rồi chọn **Connect**
  + Hộp thoại Connect to Cluster hiện ra, ta chọn vào tùy chọn **Driver** trong mục **Connect to your application**.
  + Sau đó ta sao chép nội dung connection string tại mục **Add your connection string into your application code** và thay thế nội dung password đó bằng mật khẩu mà ta đã tạo trước đó, ta sẽ được một connection string hoàn chỉnh.

![Connect](/images/3.connect/004-3.1-getcnstr.png)


4. Sau khi đã có connection string ta mở dự án bằng VScode.

![Connect](/images/3.connect/007-3.1-openvscode.png)

  + Ta mở folder backend của dự án vào tạo mới 1 file .env trong folder này với các hằng số **MONGO_CONNECT_URL** và **PORT**, với **PORT** mang giá trị 5000 và **MONGO_CONNECT_URL** là connection string mà ta vừa lấy được.

![Connect](/images/3.connect/008-3.1-importenv.png)

  + Sau khi cấu hình hoàn tất các hằng số trên, ta mở terminal trong VScode lên.
  + Di chuyển vào folder backend bằng lệnh: cd .\backend\
  + Thực hiện lệnh npm i và npm install dotenv, sau khi thực hiện thành công, giao diện sẽ như sau

![Connect](/images/3.connect/009-3.1-npmi.png)

  + Sau đó ta mở file index.js trong folder backend và thêm các dòng code sau ngay phía dưới phần import

{{< copycode >}}
import dotenv from 'dotenv';

dotenv.config();
{{< /copycode >}}

![Connect](/images/3.connect/010-3.1-addcode.png)

