---
title : "Tạo IAM Role"
date : "" 
weight : 3
chapter : false
pre : " <b> 2.3 </b> "
---


#### Truy cập dịch vụ **IAM** trên AWS
1. Chọn tùy chọn **Policies** trên thanh điều hướng bên trái của giao diện dịch vụ IAM
  + Nhấn nút **Create policy**

2. Trong hộp thoại **Create policy**.
  + Chọn tùy chọn **JSON** trong phần **Policy editor** và dán phần nội dung sau vào, lưu ý thay thế phần nội dung `"YourAccountID"` bằng ID tài khoản AWS của bạn

{{< copycode >}}
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "logs:CreateLogGroup",
                "logs:DescribeLogGroups"
            ],
            "Resource": "arn:aws:logs:ap-southeast-1:<YourAccountID>:*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "logs:CreateLogStream",
                "logs:PutLogEvents",
                "logs:DescribeLogStreams"
            ],
            "Resource": [
                "arn:aws:logs:ap-southeast-1:<YourAccoutnID>:log-group:/movie-search/analytics:*"
            ]
        }
    ]
}
{{< /copycode >}}

![IAMPolicy](/images/2.prerequisite/001-2.3-setuppolicy.png)

  + Chọn **Next** và đặt tên Policy tại phần Policy name bằng một cái tên tùy ý và cuộn xuống phía dưới, chọn **Create policy**
  + Chờ cho quá trình tạo Policy diễn ra thành công, trở về trang chủ tính năng Policies của dịch vụ IAM đảm bảo policy được tạo thành công.

![IAMPolicy](/images/2.prerequisite/002-2.3-createpolicysuccess.png)

#### Thiết lập Policy vừa tạo vào IAM Role
1. Chọn tùy chọn **Roles** trên thanh điều hướng bên trái của giao diện dịch vụ IAM
  + Nhấn nút **Create role**

2. Trong hộp thoại **Create role**.
  + Chọn Trusted entity type là **AWS Service** và chọn Use case là Lambda

![IAMPolicy](/images/2.prerequisite/003-2.3-createrolephase1.png)

  + Tại step Add permissions, tại tùy chọn **Filter by Type** chọn **Customer managed** và chọn policy mà ta vừa tạo ban nãy sau đó ấn **Next**

![IAMPolicy](/images/2.prerequisite/004-2.3-createrolephase2.png)

  + Xem lại các thiết lập mà bạn đã cấu hình cho role, điền tên Role tùy ý và chú ý cái tên này để sử dụng ở các bước tiếp theo, sau đó nhấn **Create Role**. Đảm bảo quá trình tạo Role thành công.

![IAMPolicy](/images/2.prerequisite/005-2.3-createrolesuccess.png)