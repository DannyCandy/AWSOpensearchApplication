---
title : "Cấu hình backend AWS Lambda"
date : "" 
weight : 4
chapter : false
pre : " <b> 4. </b> "
---

1. Tạo và upload dự án lên Lambda Function
  + Đăng nhập vào bảng điều khiển AWS và chọn dịch vụ **Lambda**, chọn **Functions** và chọn **Create funtion**

![Connect](/images/4.lambda/016-3.3-settinglambda.png)

  + Trong cửa sổ tạo lambda function hiện ra, chọn tùy chọn **Author from scratch**

![Connect](/images/4.lambda/015-3.3-settinglambda.png)

  + Tiếp đến, đặt tên cho lambda function và thiết lập cấu hình như hướng dẫn bên dưới, các trường không được đề cập sẽ giữ thiết lập mặc định, sau đó chọn **Create**

![Connect](/images/4.lambda/001-3.3-settinglambda.png)

  + Chờ cho đến khi quá trình khởi tạo lambda function hoàn tất, ta sẽ nhận được thông báo như sau

![Connect](/images/4.lambda/002-3.3-settinglambda.png)

  + Tiếp theo, ta mở folder dự án, truy cập vào folder **backend**, lưu ý chọn những file sau và tiến hành nén các file đó thành định dạng **.zip**

![Connect](/images/4.lambda/003-3.3-settinglambda.png)

  + Trở lại giao diện lambda function mà ta vừa tạo, chọn tab **Code** và chọn **Upload from**, sau khi thấy cửa sổ upload file hiện ra, ta kéo thả file **.zip** vừa nén vào cửa sổ này để import source code vào lambda function.

![Connect](/images/4.lambda/004-3.3-settinglambda.png)

![Connect](/images/4.lambda/005-3.3-settinglambda.png)

2. Cấu hình lambda function
  + Tại giao diện lambda function, ta cuộn trang xuống phần **Runtime settings** và chọn **Edit**

![Connect](/images/4.lambda/006-3.3-settinglambda.png)

  + Tại đây ta chỉnh sửa đường dẫn để lambda biết được file entry của dự án nằm ở đâu và thực thi chúng và chọn **Save**

![Connect](/images/4.lambda/007-3.3-settinglambda.png)

  + Tiếp theo ta cuộn trang lên phần **Code source** và cấu hình biến môi trường cho dự án

![Connect](/images/4.lambda/008-3.3-settinglambda.png)

  + Tại đây, ta sẽ cấu hình các biến môi trường mà trước đây ta đã cấu hình ở file **.env** trong folder **backend** của dự án. Sau khi cấu hình xong, chọn **Save**

![Connect](/images/4.lambda/009-3.3-settinglambda.png)

  + Khi đã cấu hình thành công biến môi trường, chọn tab **Configuration** và thực hiện theo hướng dẫn để tạo function URL.

![Connect](/images/4.lambda/011-3.3-settinglambda.png)

  + Sau đó ta cấu hình Policy như sau để cho phép truy cập từ bên ngoài như dịch vụ CloudFront truy cập vào lambda function. Chọn **Save**

![Connect](/images/4.lambda/012-3.3-settinglambda.png)

![Connect](/images/4.lambda/013-3.3-settinglambda.png)

  + Sau khi cấu hình đúng theo hướng dẫn, lambda sẽ khởi tạo một URL function cho phép các ứng dụng frontend có thể truy cập vào backend trong lambda function

![Connect](/images/4.lambda/014-3.3-settinglambda.png)

  + Tiếp theo chúng ta sẽ cấu hình quyền cho lambda function có thể ghi log vào Cloudwatch những từ khóa tìm kiếm, trạng thái request tìm kiếm mà client thực hiện. Qua đó chúng ta có thể dựa trên những log này để tiến hành phân tích đánh giá hành vi người dùng cũng như nhận biết trạng thái của server.

![Connect](/images/5.cloudfronts3/023-3.4-settingdeploy.png)

  + Tại mục chọn **Role** cho lambda function, ta sẽ sử dụng **Role** đã tạo ở bước 2 [Các bước chuẩn bị](2-Prerequiste/2.3-CreateIAMRole/)

![Connect](/images/5.cloudfronts3/024-3.4-settingdeploy.png)


