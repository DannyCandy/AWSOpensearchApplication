---
title: "Index Configuration"
date: "" 
weight: 3
chapter: false
pre: " <b> 3.3. </b> "
---

1. Open the project folder that was previously cloned from GitHub in VSCode, then navigate to the **backend** folder.  
   + We will use the connection URL to the newly created OpenSearch Domain to configure the index and input data for the OpenSearch engine when launching the project.

![Connect](/images/3.connect/010-3.2-settingupops.png)

   + Back in the project, open the **.env** file (created earlier) inside the **backend** folder and add the environment variables such as **OPSURLCLIENT**, **PWDOPS**, and **USERNAMOPS** with corresponding values: the URL from the step above, the username, and the password configured when creating the OpenSearch Domain.

![Connect](/images/3.connect/018-3.2-settingupops.png)

   + Next, open the Terminal in VSCode and run the command **npm run dev**. Once executed, the process of collecting and transferring data from MongoDB to the OpenSearch Domain you created earlier will begin.

![Connect](/images/3.connect/011-3.2-settingupops.png)

   + Upon success, the interface will appear as follows:

![Connect](/images/3.connect/012-3.2-settingupops.png)

2. Verify the index just created on the OpenSearch Dashboard  
   + Go to the OpenSearch service on the AWS Management Console and access the following URL:

![Connect](/images/3.connect/009-3.2-settingupops.png)

   + After accessing this URL, the OpenSearch Domain management interface will appear. Click on **OpenSearch Dashboard**.

![Connect](/images/3.connect/013-3.2-settingupops.png)

   + Next, select **Add your data**.

![Connect](/images/3.connect/014-3.2-settingupops.png)

   + Then select **Create index pattern**.

![Connect](/images/3.connect/015-3.2-settingupops.png)

   + Here you will see an index named **movies-optimized**. This is the index configured and created in this Domain from the project's source code. If the setup was successful, you will definitely see this index name.

![Connect](/images/3.connect/016-3.2-settingupops.png)

3. Prepare to deploy the backend on Lambda  
   + After successfully creating the index in the OpenSearch Domain, return to the project and delete or comment out the two lines of code previously added to the project file. This is because serverless environments like Lambda do not configure and use environment variables in this way.

![Connect](/images/3.connect/010-3.1-addcode.png)
