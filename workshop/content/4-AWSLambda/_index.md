---
title : "Configure Backend with AWS Lambda"
date : "" 
weight : 4
chapter : false
pre : " <b> 4. </b> "
---

1. Create and Upload the Project to Lambda Function  
  + Log in to the AWS Console, go to the **Lambda** service, select **Functions**, then click **Create function**.

![Connect](/images/4.lambda/016-3.3-settinglambda.png)

  + In the function creation window, choose the **Author from scratch** option.

![Connect](/images/4.lambda/015-3.3-settinglambda.png)

  + Next, name your Lambda function and configure the settings as shown below. Leave any unspecified fields as default, then click **Create**.

![Connect](/images/4.lambda/001-3.3-settinglambda.png)

  + Wait for the Lambda function creation process to complete. You will see a confirmation message like this:

![Connect](/images/4.lambda/002-3.3-settinglambda.png)

  + Next, open your project folder and go to the **backend** directory. Select the files shown below and compress them into a **.zip** file.

![Connect](/images/4.lambda/003-3.3-settinglambda.png)

  + Go back to the Lambda function interface you just created, select the **Code** tab and choose **Upload from**. When the upload window appears, drag and drop the compressed **.zip** file to import the source code into the Lambda function.

![Connect](/images/4.lambda/004-3.3-settinglambda.png)

![Connect](/images/4.lambda/005-3.3-settinglambda.png)

2. Configure the Lambda Function  
  + In the Lambda function interface, scroll down to the **Runtime settings** section and click **Edit**.

![Connect](/images/4.lambda/006-3.3-settinglambda.png)

  + Here, modify the path so that Lambda knows where your project’s entry file is and how to execute it. Then click **Save**.

![Connect](/images/4.lambda/007-3.3-settinglambda.png)

  + Next, scroll back up to the **Code source** section to configure environment variables for the project.

![Connect](/images/4.lambda/008-3.3-settinglambda.png)

  + Here, configure the environment variables that were previously set in the **.env** file inside the **backend** folder of your project. After configuration, click **Save**.

![Connect](/images/4.lambda/009-3.3-settinglambda.png)

  + Once the environment variables are successfully configured, go to the **Configuration** tab and follow the instructions to create a function URL.

![Connect](/images/4.lambda/011-3.3-settinglambda.png)

  + Then configure the policy as shown to allow external services like CloudFront to access the Lambda function. Click **Save**.

![Connect](/images/4.lambda/012-3.3-settinglambda.png)

![Connect](/images/4.lambda/013-3.3-settinglambda.png)

  + After successful configuration, Lambda will generate a function URL that allows frontend applications to connect to the backend hosted in the Lambda function.

![Connect](/images/4.lambda/014-3.3-settinglambda.png)

  + Next, we will configure permissions so that the Lambda function can write logs to CloudWatch, including search keywords and request statuses from clients. These logs will help analyze user behavior and monitor server status.

![Connect](/images/5.cloudfronts3/023-3.4-settingdeploy.png)

  + In the **Role** selection for the Lambda function, use the **Role** created in step 2 [Prerequisites](2-Prerequiste/2.3-CreateIAMRole/)

![Connect](/images/5.cloudfronts3/024-3.4-settingdeploy.png)
