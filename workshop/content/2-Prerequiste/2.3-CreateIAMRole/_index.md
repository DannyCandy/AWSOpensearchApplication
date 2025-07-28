---
title: "Create IAM Role"
date: "" 
weight: 3
chapter: false
pre: " <b> 2.3 </b> "
---

#### Access the **IAM** Service on AWS

1. From the IAM service console, select **Policies** from the left-hand navigation menu  
   + Click the **Create policy** button

2. In the **Create policy** dialog:  
   + Choose the **JSON** tab in the **Policy editor** section and paste the following content. Make sure to replace `"YourAccountID"` with your actual AWS account ID.

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
                "arn:aws:logs:ap-southeast-1:<YourAccountID>:log-group:/movie-search/analytics:*"
            ]
        }
    ]
}
{{< /copycode >}}

![IAMPolicy](/images/2.prerequisite/001-2.3-setuppolicy.png)

+ Click **Next**, enter a name of your choice for the policy under **Policy name**, scroll down and click **Create policy**  
+ Wait for the policy to be created successfully. Return to the IAM Policies main page to verify that your new policy appears in the list.

![IAMPolicy](/images/2.prerequisite/002-2.3-createpolicysuccess.png)

---

#### Attach the Created Policy to an IAM Role

1. From the IAM service console, select **Roles** from the left-hand navigation menu  
   + Click the **Create role** button

2. In the **Create role** dialog:  
   + Choose **AWS Service** as the trusted entity type, and select **Lambda** as the use case

![IAMPolicy](/images/2.prerequisite/003-2.3-createrolephase1.png)

+ In the **Add permissions** step, under **Filter by Type**, select **Customer managed**, choose the policy you just created, and click **Next**

![IAMPolicy](/images/2.prerequisite/004-2.3-createrolephase2.png)

+ Review your role settings, enter a name of your choice for the role (you will need this name later), and click **Create role**. Make sure the role is created successfully.

![IAMPolicy](/images/2.prerequisite/005-2.3-createrolesuccess.png)
