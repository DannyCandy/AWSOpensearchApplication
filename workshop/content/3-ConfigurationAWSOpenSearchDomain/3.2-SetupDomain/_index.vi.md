---
title : "Thiết lập Domain OpenSearch"
date : "" 
weight : 2
chapter : false
pre : " <b> 3.2. </b> "
---

1. Truy cập vào bảng điều khiển AWS (AWS Console) [giao diện bảng điều khiển AWS](https://ap-southeast-1.console.aws.amazon.com/console/home) và chọn dịch vụ Amazon OpenSearch Service

2. Tại trang chủ dịch vụ Amazon OpenSearch Service
  + Ta chọn **Managed clusters** tại mục **Get started** và nhấn nút **Create domain**

![Connect](/images/3.connect/017-3.2-settingupops.png)

  + Tại cửa sổ khởi tạo opensearch domain, ta điền các trường thông tin theo hướng dẫn bên dưới
  + Trước hết, ta điền tên của domain

![Connect](/images/3.connect/001-3.2-settingupops.png)

  + Tiếp đến ta chọn tùy chọn **Standard create** và template **Dev/test**

![Connect](/images/3.connect/002-3.2-settingupops.png)

  + Sau đó ta chọn tùy chọn **Domain without standby** và chọn **1-Az** để tiết kiệm chi phí trong quá trình tìm hiểu.

![Connect](/images/3.connect/003-3.2-settingupops.png)

  + Ta sẽ thực hiện tiếp các bước tiếp theo dựa trên hướng dẫn sau, với các trường không được lưu ý trong hướng dẫn, ta sẽ giữ thiết lập mặc định

![Connect](/images/3.connect/004-3.2-settingupops.png)

  + Tại mục **Number of data nodes** ta chọn giá trị **1** vì trước đó ta đã thiết lập sử dụng **1-Az**

![Connect](/images/3.connect/005-3.2-settingupops.png)

  + Ở mục thiết lập **Network** ta chọn cấu hình **Public access**

![Connect](/images/3.connect/006-3.2-settingupops.png)

  + Ta sẽ thực hiện tiếp các bước tiếp theo dựa trên hướng dẫn sau, với các trường không được lưu ý trong hướng dẫn, ta sẽ giữ thiết lập mặc định và cuối cùng là nhấn **Create**. Lưu ý tại bước thiết lập **Master username** và **Master password**, bạn hãy chú ý và ghi nhớ các trường này để ta cấu hình biến môi trường cho dự án ở các bước sau

![Connect](/images/3.connect/007-3.2-settingupops.png)

![Connect](/images/3.connect/008-3.2-settingupops.png)

  + Sau cùng, ta sẽ đợi quá trình khởi tạo Domain hoàn tất, quá trình này sẽ mất khoảng 10-15 phút. Sau khi quá trình này kết thúc, domain được khởi tạo thành công sẽ trông như sau. Lúc này ta sẽ có một URL để truy cập OpenSearch dashboard, đây là nơi ta có thể kiểm soát, trực quan hóa và theo dõi các dữ liệu, index được tạo trong Domain OpenSearch này.

![Connect](/images/3.connect/009-3.2-settingupops.png)


