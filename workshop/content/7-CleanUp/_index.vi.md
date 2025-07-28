---
title : "Dọn dẹp tài nguyên"
date : "" 
weight : 7
chapter : false
pre : " <b> 7. </b> "
---

Chúng ta sẽ tiến hành các bước sau để xóa các tài nguyên chúng ta đã tạo trong bài thực hành này.

#### Xóa OpenSearch Domain

Truy cập [giao diện quản trị dịch vụ OpenSearch](https://ap-southeast-1.console.aws.amazon.com/aos/home)
  + Click **Domains**.
  + Click chọn domain mà bạn vừa tạo trong quá trình thực hiện bài lab. 
  + Click **Delete**.
  + Làm theo hướng dẫn của cửa sổ hiện ra, sau đó click **Delete** để xác nhận.

![Cleanup](/images/7.cleanup/001-3.5-cleanup.png)

#### Xóa Lambda function

Truy cập [giao diện quản trị dịch vụ Lambda](https://ap-southeast-1.console.aws.amazon.com/lambda/home)
  + Click **Functions**.
  + Click chọn lambda function mà bạn vừa tạo.
  + Click chọn **Actions**, chọn **Delete function** trong danh sách hiện ra và xác nhận xóa.
  
![Cleanup](/images/7.cleanup/002-3.5-cleanup.png)

#### Xóa CloudFront distribution

Truy cập [giao diện quản trị dịch vụ CloudFront](https://us-east-1.console.aws.amazon.com/cloudfront/v4/home)
  + Click **Distribution**.
  + Chọn distribution mà bạn đã tạo trong quá trình làm lab, chọn **Disable** để vô hiệu hóa domain trước khi xóa.

![Cleanup](/images/7.cleanup/003-3.5-cleanup.png)

  + Sau khi disable thành công domain, chọn **Delete** để xóa và xác nhận xóa domain.

![Cleanup](/images/7.cleanup/004-3.5-cleanup.png)

#### Xóa S3 bucket

1. Truy cập [giao diện quản trị dịch vụ System Manager - Session Manager](https://console.aws.amazon.com/systems-manager/session-manager).
  + Click tab **Preferences**.
  + Click **Edit**.
  + Kéo chuột xuống dưới.
  + Tại mục **S3 logging**.
  + Bỏ chọn **Enable** để tắt tính năng logging.
  + Kéo chuột xuống dưới.
  + Click **Save**.

2. Truy cập [giao diện quản trị dịch vụ S3](https://s3.console.aws.amazon.com/s3/home)
  + Click chọn S3 bucket chúng ta đã tạo cho bài thực hành.
  + Click **Empty**.
  + Điền **permanently delete**, sau đó click **Empty** để tiến hành xóa object trong bucket.
  + Click **Exit**.

3. Sau khi xóa hết object trong bucket, click **Delete**

![Cleanup](/images/7.cleanup/005-3.5-cleanup.png)

4. Điền tên S3 bucket, sau đó click **Delete bucket** để tiến hành xóa S3 bucket.

![Cleanup](/images/7.cleanup/006-3.5-cleanup.png)

#### Xóa IAM Role và policy

Truy cập [giao diện quản trị dịch vụ IAM](https://us-east-1.console.aws.amazon.com/iam/home)
  + Click tab **Policies**.
  + Click **Filter by Type** và chọn **Customer managed**.
  + Tìm kiếm policy bạn đã tạo ở bước 2 và chọn **Delete**, xác nhận để xóa policy.
  + Click tab **Roles**
  + Chọn role mà bạn tạo trong quá trình thực hiện lab, chẳng hạn: latestRule. Chọn **Delete**
  + Điền tên của role và xác nhận xóa.

![Cleanup](/images/7.cleanup/007-3.5-cleanup.png)