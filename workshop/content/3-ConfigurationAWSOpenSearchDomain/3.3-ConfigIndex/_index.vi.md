---
title : "Cấu hình Index"
date : "" 
weight : 3
chapter : false
pre : " <b> 3.3. </b> "
---

1. Mở folder dự án mà ta đã tải xuống từ github trong VScode, di chuyển đến folder **backend**
  + Ta sẽ sử dụng đường dẫn kết nối tới OpenSearch Domain vừa tạo để cấu hình index, dữ liệu đầu vào cho OpenSearch engine khi khởi chạy dự án

![Connect](/images/3.connect/010-3.2-settingupops.png)

  + Trở lại dự án, ta mở file **.env** mà trước đó ta đã tạo trong folder **backend** và thêm các hằng số môi trường như **OPSURLCLIENT**, **PWDOPS** và **USERNAMOPS** với các giá trị lần lượt là URL ở bước ngay phía trên, tài khoản và mật khẩu mà bạn đã cấu hình khi tạo Domain OpenSearch.

![Connect](/images/3.connect/018-3.2-settingupops.png)

  + Tiếp đến, ta mở Terminal trong VScode và lần lượt thực thi lệnh **npm run dev**, sau khi thực hiện các lệnh, quá trình thực thi thu thập và truyền tải dữ liệu từ MongoDB sang OpenSearch Domain mà ta đã tạo trước đó sẽ diễn ra.

![Connect](/images/3.connect/011-3.2-settingupops.png)

  + Khi thực hiện thành công, giao diện sẽ trông như sau

![Connect](/images/3.connect/012-3.2-settingupops.png)

2. Kiểm tra index vừa được tạo trên OpenSearch Dashboard
  + Truy cập vào dịch vụ OpenSearch trên bảng điều khiển AWS và truy cập tới URL sau.

![Connect](/images/3.connect/009-3.2-settingupops.png)

  + Sau khi truy cập URL này, giao diện quản lý Domain OpenSearch sẽ hiện ra, lúc này ta nhấn chọn **OpenSearch Dashboard**

![Connect](/images/3.connect/013-3.2-settingupops.png)

  + Tiếp theo ta chọn **Add your data**

![Connect](/images/3.connect/014-3.2-settingupops.png)

  + Tiếp theo ta chọn **Create index pattern**

![Connect](/images/3.connect/015-3.2-settingupops.png)

  + Tại đây ta sẽ thấy tồn tại một index có tên **movies-optimized**, đây là tên index đã được cấu hình tạo ra trong Domain này từ source code trong dự án. Khi khởi tạo thành công, chắc chắn bạn sẽ nhìn thấy tên index này

![Connect](/images/3.connect/016-3.2-settingupops.png)

3. Chuẩn bị triển khai backend trên Lambda
  + Sau khi đã tạo index thành công trên OpenSearch Domain, ta sẽ quay lại dự án và xóa bỏ hoặc comment 2 dòng code mà trước đó ta đã thêm vào file dự án vì việc triển khai trên môi trường serverless như Lambda sẽ không cấu hình sử dụng biến môi trường như thế này.

![Connect](/images/3.connect/010-3.1-addcode.png)


