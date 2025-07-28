---
title: "Install Node.js"
date: "" 
weight: 1 
chapter: false
pre: " <b> 2.1.1 </b> "
---

#### Access the official **Node.js** download page

1. Visit the [Node.js download page](https://nodejs.org/en/download)  
   + Choose the Windows environment setup  
   + Download the `.msi` installer for Windows

![Nodejs](/images/2.prerequisite/001-2.1.1-InstallNodejs.png)

2. Install Node.js and NPM  
   + Launch the downloaded installer by double-clicking the file  
   + The Node.js Setup Wizard will display the welcome screen  
   + Click **Next**, accept the license agreement, and click **Next**

![Nodejs](/images/2.prerequisite/002-2.1.1-nodejs-setup-wizard-welcome-screen.jpg)

![Nodejs](/images/2.prerequisite/003-2.1.1-nodejs-setup-wizard-end-user-license-agreement.jpg)

   + Choose the installation directory for Node.js and keep clicking **Next** to proceed

![Nodejs](/images/2.prerequisite/004-2.1.1-nodejs-setup-wizard-install-location.jpg)

   + Click **Next**, and the installation process will run automatically. Once completed, you will see the following screen:

![Nodejs](/images/2.prerequisite/005-2.1.1-nodejs-setup-install-finished.jpg)

   + To verify that Node.js was installed successfully, run the following command:

{{< copycode >}}
node -v
{{< /copycode >}}

This command will display the installed Node.js version on your machine. Use the following command to check the NPM version:

{{< copycode >}}
npm -v
{{< /copycode >}}

![Nodejs](/images/2.prerequisite/006-2.1.1-node-v-and-npm-v-cmd-output.jpg)
