---
title: "Configure Frontend with S3 and CloudFront"
date: ""
weight: 5
chapter: false
pre: " <b> 5. </b> "
---

1. Configure and upload the project to AWS S3
  + Open the project's **frontend** folder, create an environment file named **.env.production**, and add an environment variable with the value being the function URL of the Lambda function we created earlier.
  + Then build the frontend project using the command **npm run build**. Once the build completes successfully, a **dist** folder will be generated.

![Connect](/images/5.cloudfronts3/001-3.4-settingdeploy.png)

  + Log in to the AWS Management Console, go to the **S3** service, and click **Create bucket**.

![Connect](/images/5.cloudfronts3/002-3.4-settingdeploy.png)

  + In the bucket creation window, follow the highlighted instructions. Leave all unspecified fields with their default settings.

![Connect](/images/5.cloudfronts3/004-3.4-settingdeploy.png)

![Connect](/images/5.cloudfronts3/018-3.4-settingdeploy.png)

![Connect](/images/5.cloudfronts3/005-3.4-settingdeploy.png)

  + Once the bucket is successfully created, open it and select **Upload**. At this step, navigate to the previously built **dist** folder and upload all its contents to the bucket.

![Connect](/images/5.cloudfronts3/006-3.4-settingdeploy.png)

![Connect](/images/5.cloudfronts3/007-3.4-settingdeploy.png)

  + After a successful upload, verify the uploaded files and confirm the upload.

![Connect](/images/5.cloudfronts3/008-3.4-settingdeploy.png)

![Connect](/images/5.cloudfronts3/009-3.4-settingdeploy.png)

  + Next, from the main interface of the newly created bucket, go to the **Permissions** tab and click **Edit**. In the **Edit bucket policy** window, modify the policy as shown below to allow CloudFront to access the frontend assets uploaded to the S3 bucket. Be sure to replace **YourBucketName** with the actual name of your bucket.

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

2. Configure CloudFront to deliver website content

  + Log in to the AWS Management Console and select the **CloudFront** service, then choose **Create distribution**.

![Connect](/images/5.cloudfronts3/010-3.4-settingdeploy.png)

  + In the Create Distribution window, fill in the fields as instructed. Leave unspecified fields with their default configurations.

![Connect](/images/5.cloudfronts3/011-3.4-settingdeploy.png)

  + For the Origin configuration step, select the **S3** bucket you created earlier.

![Connect](/images/5.cloudfronts3/012-3.4-settingdeploy.png)

![Connect](/images/5.cloudfronts3/013-3.4-settingdeploy.png)

![Connect](/images/5.cloudfronts3/014-3.4-settingdeploy.png)

  + For the remaining settings of the distribution, proceed as shown:

![Connect](/images/5.cloudfronts3/015-3.4-settingdeploy.png)

![Connect](/images/5.cloudfronts3/016-3.4-settingdeploy.png)

  + Once the configuration is confirmed, CloudFront will generate a **Distribution domain name** that allows access to your domain over the internet. You must wait for the deployment process to complete.

![Connect](/images/5.cloudfronts3/017-3.4-settingdeploy.png)

  + Next, configure CloudFront to access the website resources in **S3** and define the website's entry point. In the **Settings** section, click **Edit**. In the configuration edit window, specify the entry file of your website under **Default root object**.

![Connect](/images/5.cloudfronts3/022-3.4-settingdeploy.png)

![Connect](/images/5.cloudfronts3/021-3.4-settingdeploy.png)

  + That completes the configuration process to deploy your project on AWS services. Now, wait for the CloudFront domain deployment to finish, and then you can experience your website.

  + Once the deployment is complete, use the **Distribution domain name** to access the website via the internet. You should be able to see your project’s frontend interface. Try searching for movies using keywords. You'll see how powerful OpenSearch's full-text search engine is at returning fast and relevant results even over large datasets. Additionally, full-text search supports fuzzy matching and highlights approximate matches in yellow.

![Connect](/images/5.cloudfronts3/017-3.4-settingdeploy.png)

![Connect](/images/5.cloudfronts3/025-3.4-settingdeploy.png)
