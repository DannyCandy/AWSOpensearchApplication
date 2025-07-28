---
title: "Clean up Resources"
date: "" 
weight: 7
chapter: false
pre: " <b> 7. </b> "
---

We will follow the steps below to delete the resources created during this lab.

#### Delete OpenSearch Domain

Go to the [OpenSearch service management console](https://ap-southeast-1.console.aws.amazon.com/aos/home)  
  + Click **Domains**.  
  + Click on the domain you created during the lab.  
  + Click **Delete**.  
  + Follow the instructions in the popup window and then click **Delete** to confirm.

![Cleanup](/images/7.cleanup/001-3.5-cleanup.png)

#### Delete Lambda Function

Go to the [Lambda service management console](https://ap-southeast-1.console.aws.amazon.com/lambda/home)  
  + Click **Functions**.  
  + Select the Lambda function you created.  
  + Click **Actions**, choose **Delete function** from the dropdown list, and confirm the deletion.

![Cleanup](/images/7.cleanup/002-3.5-cleanup.png)

#### Delete CloudFront Distribution

Go to the [CloudFront service management console](https://us-east-1.console.aws.amazon.com/cloudfront/v4/home)  
  + Click **Distribution**.  
  + Select the distribution you created during the lab, and click **Disable** to disable the domain before deletion.

![Cleanup](/images/7.cleanup/003-3.5-cleanup.png)

  + Once the domain is successfully disabled, click **Delete** to remove it and confirm deletion.

![Cleanup](/images/7.cleanup/004-3.5-cleanup.png)

#### Delete S3 Bucket

1. Go to the [System Manager - Session Manager console](https://console.aws.amazon.com/systems-manager/session-manager).  
  + Click the **Preferences** tab.  
  + Click **Edit**.  
  + Scroll down.  
  + Under **S3 logging**,  
  + Uncheck **Enable** to disable logging.  
  + Scroll down again.  
  + Click **Save**.

2. Go to the [S3 service console](https://s3.console.aws.amazon.com/s3/home)  
  + Select the S3 bucket you created during the lab.  
  + Click **Empty**.  
  + Type **permanently delete**, then click **Empty** to delete objects in the bucket.  
  + Click **Exit**.

3. After deleting all objects in the bucket, click **Delete**.

![Cleanup](/images/7.cleanup/005-3.5-cleanup.png)

4. Enter the name of the S3 bucket, then click **Delete bucket** to complete the deletion.

![Cleanup](/images/7.cleanup/006-3.5-cleanup.png)

#### Delete IAM Role and Policy

Go to the [IAM service management console](https://us-east-1.console.aws.amazon.com/iam/home)  
  + Click the **Policies** tab.  
  + Click **Filter by Type** and select **Customer managed**.  
  + Search for the policy you created in Step 2 and click **Delete**, then confirm the deletion.  
  + Click the **Roles** tab.  
  + Select the role you created during the lab, for example: `latestRule`. Click **Delete**.  
  + Enter the role name and confirm deletion.

![Cleanup](/images/7.cleanup/007-3.5-cleanup.png)
