---
title : "Cấu hình frontend"
date : "" 
weight : 5
chapter : false
pre : " <b> 5. </b> "
---

1. Cấu hình và upload dự án lên AWS S3
  + Mở folder **frontend** của dự án, tạo file môi trường **.env.production** và thêm biến môi trường với giá trị chính là function URL của lambda function mà ta đã tạo trước đó
  + Sau đó ta thực hiện build frontend dự án bằng lệnh **npm run build**. Khi build thành công, folder **dist** sẽ được tạo ra

![Connect](/images/5.cloudfronts3/001-3.4-settingdeploy.png)

  + Đăng nhập vào bảng điều khiển AWS và chọn dịch vụ **S3**, chọn **Create bucket**

![Connect](/images/5.cloudfronts3/002-3.4-settingdeploy.png)

  + Trong cửa sổ tạo s3 bucket hiện ra, ta hãy thực hiện theo các lưu ý trong hướng dẫn sau, những trường không được lưu ý sẽ giữ thiết lập mặc định

![Connect](/images/5.cloudfronts3/004-3.4-settingdeploy.png)

![Connect](/images/5.cloudfronts3/018-3.4-settingdeploy.png)

![Connect](/images/5.cloudfronts3/005-3.4-settingdeploy.png)

  + Một khi bucket được khởi tạo thành công, ta truy cập bucket vừa tạo và chọn **Upload**, lúc này ta sẽ mở folder **dist** của dự án mà ta đã build ra ở bước trước đó và upload các file trong folder này vào bucket.

![Connect](/images/5.cloudfronts3/006-3.4-settingdeploy.png)

![Connect](/images/5.cloudfronts3/007-3.4-settingdeploy.png)

  + Sau khi upload thành công, ta kiểm tra lại các file vừa upload và xác nhận upload

![Connect](/images/5.cloudfronts3/008-3.4-settingdeploy.png)

![Connect](/images/5.cloudfronts3/009-3.4-settingdeploy.png)

  + Sau đó, tại giao diện chính của bucket vừa tạo, chọn tab **Permissions**, chọn **Edit**. Trong cửa sổ **Edit bucket policy** hiện ra, ta sẽ chỉnh sửa policy như sau để cho phép CloudFront truy cập các tài nguyên frontend của website mà ta vừa upload lên S3 bucket, lưu ý thay thế **YourBucketName** thành tên bucket hiện tại của bạn.

{{< copycode >}}
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AllowCloudFrontAccess",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::<YourBucketName>/*"
        }
    ]
}
{{< /copycode >}}

![Connect](/images/5.cloudfronts3/019-3.4-settingdeploy.png)

2. Cấu hình Cloudfront phân phối nội dung trang web

  + Đăng nhập vào bảng điều khiển AWS và chọn dịch vụ **CloudFront**, chọn **Create distribution**

![Connect](/images/5.cloudfronts3/010-3.4-settingdeploy.png)

  + Trong cửa sổ khởi tạo distribution hiện ra, ta sẽ cấu hình các trường được lưu ý trong hướng dẫn sau, các trường không được lưu ý sẽ giữ cấu hình mặc định

![Connect](/images/5.cloudfronts3/011-3.4-settingdeploy.png)

  + Tại bước cấu hình Origin, ta chọn bucket trong **S3** mà ta đã tạo ở bước trước đó

![Connect](/images/5.cloudfronts3/012-3.4-settingdeploy.png)

![Connect](/images/5.cloudfronts3/013-3.4-settingdeploy.png)

![Connect](/images/5.cloudfronts3/014-3.4-settingdeploy.png)

  + Phần còn lại của việc cấu hình distribution, ta thực hiện như sau

![Connect](/images/5.cloudfronts3/015-3.4-settingdeploy.png)

![Connect](/images/5.cloudfronts3/016-3.4-settingdeploy.png)

  + Sau khi xác nhận cấu hình, cloudfront sẽ tạo ra một **Distribution domain name** cho phép chúng ta truy cập domain từ internet. Tuy nhiên cần chờ cho quá trình triển khai trở nên hoàn tất.

![Connect](/images/5.cloudfronts3/017-3.4-settingdeploy.png)

  + Tiếp theo, ta sẽ cấu hình cloudfront để truy cập các tài nguyên website trong **S3** và entry point của website. Trong mục **Setting**, chọn **Edit**, tại cửa sổ chỉnh sửa cấu hình hiện ra, ta sẽ chỉ định file entry của website tại mục **Default root object**

![Connect](/images/5.cloudfronts3/022-3.4-settingdeploy.png)

![Connect](/images/5.cloudfronts3/021-3.4-settingdeploy.png)

  + Vậy là chúng ta đã hoàn tất toàn bộ cấu hình để triển khai dự án trên các dịch vụ AWS. Giờ chúng ta sẽ chờ cho quá trình triển khai domain của CloudFront hoàn tất, ta sẽ trải nghiệm website thành quả.

  + Khi quá trình triển khai hoàn tất, sử dụng **Distribution domain name** để truy cập thông qua internet, ta sẽ truy cập được giao diện website của dự án, tại đây hãy thử tìm kiếm các bộ phim theo từ khóa. Chúng ta sẽ thấy được cách ứng dụng mạnh mẽ full-text search engine của OpenSearch trong việc tìm kiếm và trả về kết quả một cách nhanh chóng và hiệu quả trên một khối lượng dữ liệu lớn. Ngoài ra full-text search còn hỗ trợ chúng ta tìm kiếm từ khóa gần đúng, các kết quả gần khớp với từ khóa sẽ được highlight màu vàng.

![Connect](/images/5.cloudfronts3/017-3.4-settingdeploy.png)

![Connect](/images/5.cloudfronts3/025-3.4-settingdeploy.png)




