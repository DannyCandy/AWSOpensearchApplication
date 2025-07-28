---
title: "Download Resources"
date: "" 
weight: 1 
chapter: false
pre: " <b> 3.1. </b> "
---

1. Navigate to the location where you want to download the project resources, then open Git Bash or Command Line at that location and run the following command:

{{< copycode >}}
git clone https://github.com/DannyCandy/AWSOpensearchApplication.git
{{< /copycode >}}

![Connect](/images/3.connect/001-3.1-downloadsrc.png)

2. Use MongoDB Atlas sample data.  
  + In this step, we will use the sample data from MongoDB Atlas to populate data into the OpenSearch Domain. This sample contains over 20,000 records and will help demonstrate the power and efficiency of applying OpenSearch to search tools, such as the project we just downloaded.  
  + Visit the MongoDB Atlas homepage and create an account: [MongoDB Atlas login page](https://account.mongodb.com/account/login).  
  + Once your account is created and you're logged in, create a new Cluster.  
  + The newly created cluster will include a sample database called **sample_mflix** from MongoDB Atlas, which comes with 6 collections.

![Connect](/images/3.connect/002-3.1-databasesample.png)

  + Select the "movies" collection, which contains 21,349 records, to configure indexing and input data for OpenSearch.

![Connect](/images/3.connect/003-3.1-collectionmovies.png)

3. Get the connection string from MongoDB Atlas  
  + In MongoDB Atlas, go to the **Database Access** tab in the left-hand navigation menu.

![Connect](/images/3.connect/005-3.1-getpassword.png)

  + Click the **Edit** button. In the Edit User dialog, select **Edit Password**, update the user's password, scroll down, and click **Update User**. Remember this password for use in later steps.

![Connect](/images/3.connect/006-3.1-editpassword.png)

  + Back on the MongoDB Atlas homepage, go to the **Overview** tab and click **Connect**.  
  + In the "Connect to Cluster" dialog, choose the **Driver** option under **Connect to your application**.  
  + Then, copy the connection string under the **Add your connection string into your application code** section, and replace the `<password>` placeholder with the password you just set. This gives you a complete connection string.

![Connect](/images/3.connect/004-3.1-getcnstr.png)

4. After obtaining the connection string, open the project in VSCode.

![Connect](/images/3.connect/007-3.1-openvscode.png)

  + Open the `backend` folder of the project and create a new `.env` file in that folder. Define the constants **MONGO_CONNECT_URL** and **PORT**, where **PORT** is set to `5000`, and **MONGO_CONNECT_URL** is the connection string you copied.

![Connect](/images/3.connect/008-3.1-importenv.png)

  + Once the constants are configured, open the terminal in VSCode.  
  + Navigate to the `backend` folder using the command: `cd .\backend\`  
  + Run `npm i` and `npm install dotenv`. After successful installation, your terminal should look like this:

![Connect](/images/3.connect/009-3.1-npmi.png)

  + Next, open the `index.js` file inside the `backend` folder and add the following lines right after the import section:

{{< copycode >}}
import dotenv from 'dotenv';

dotenv.config();
{{< /copycode >}}

![Connect](/images/3.connect/010-3.1-addcode.png)
