---
title : "Cài đặt Nodejs"
date : "" 
weight : 1 
chapter : false
pre : " <b> 2.1.1 </b> "
---


#### Truy cập trang chủ tải xuống của **Nodejs**
1. Truy cập [giao diện tải xuống của nodejs](https://nodejs.org/en/download)
  + Chọn thiết lập môi trường Windows
  + Chọn tải xuống file cài đặt .msi cho môi trường Windows

![Nodejs](/images/2.prerequisite/001-2.1.1-InstallNodejs.png)

2. Cài đặt Node.js và NPM.
  + Khởi chạy trình cài đặt vừa tải xuống bằng cách double-click vào file đó.
  + Node.js Setup Wizard sẽ hiện ra hộp thoại welcome.
  + Click **Next**. Chấp thuận điều khoản và click **Next**

![Nodejs](/images/2.prerequisite/002-2.1.1-nodejs-setup-wizard-welcome-screen.jpg)

![Nodejs](/images/2.prerequisite/003-2.1.1-nodejs-setup-wizard-end-user-license-agreement.jpg)

  + Chọn vị trí lưu các tài nguyên cài đặt của Node.js và ấn **Next** liên tục.

![Nodejs](/images/2.prerequisite/004-2.1.1-nodejs-setup-wizard-install-location.jpg)

  + Chọn **Next** và quá trình cài đặt sẽ diễn ra tự động và khi hoàn thành sẽ hiện ra cửa sổ sau

![Nodejs](/images/2.prerequisite/005-2.1.1-nodejs-setup-install-finished.jpg)

  + Để kiểm tra Node.js đã cài đặt thành công chưa, thực thi câu lệnh sau:

{{< copycode >}}
node -v
{{< /copycode >}}

Câu lệnh sẽ hiển thị phiên bản của node.js trên máy của bạn. Dùng lệnh sau để kiểm tra phiên bản npm:

{{< copycode >}}
npm -v
{{< /copycode >}}

![Nodejs](/images/2.prerequisite/006-2.1.1-node-v-and-npm-v-cmd-output.jpg)