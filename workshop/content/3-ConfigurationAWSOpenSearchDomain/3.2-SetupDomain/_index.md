---
title : "Set Up OpenSearch Domain"
date : "" 
weight : 2
chapter : false
pre : " <b> 3.2. </b> "
---

1. Go to the AWS Console [AWS Console Interface](https://ap-southeast-1.console.aws.amazon.com/console/home) and select the **Amazon OpenSearch Service**.

2. On the Amazon OpenSearch Service homepage:
   + Select **Managed clusters** under the **Get started** section and click the **Create domain** button.

![Connect](/images/3.connect/017-3.2-settingupops.png)

   + In the domain creation window, fill in the fields as guided below.
   + First, enter the domain name.

![Connect](/images/3.connect/001-3.2-settingupops.png)

   + Next, choose the **Standard create** option and the **Dev/test** template.

![Connect](/images/3.connect/002-3.2-settingupops.png)

   + Then select the **Domain without standby** option and choose **1-AZ** to reduce cost during the learning phase.

![Connect](/images/3.connect/003-3.2-settingupops.png)

   + Continue with the next steps as shown in the following guide. For fields not specifically mentioned, keep the default settings.

![Connect](/images/3.connect/004-3.2-settingupops.png)

   + Under **Number of data nodes**, select **1**, since we've chosen to use **1-AZ** earlier.

![Connect](/images/3.connect/005-3.2-settingupops.png)

   + In the **Network** configuration section, choose **Public access**.

![Connect](/images/3.connect/006-3.2-settingupops.png)

   + Continue with the next steps according to the following guide. For unspecified fields, keep the default settings. Finally, click **Create**.  
     > **Note**: During the configuration of **Master username** and **Master password**, make sure to remember these values. You'll need them later to set environment variables for the project.

![Connect](/images/3.connect/007-3.2-settingupops.png)

![Connect](/images/3.connect/008-3.2-settingupops.png)

   + Finally, wait for the domain creation process to complete. This may take around 10–15 minutes. Once completed, a successfully created domain will appear as shown below. At this point, you’ll have a URL to access the OpenSearch Dashboard – a place where you can manage, visualize, and monitor data and indexes created within this OpenSearch domain.

![Connect](/images/3.connect/009-3.2-settingupops.png)
