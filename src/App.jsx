import { useState, useEffect } from "react";

const labs = [
  {
    domain: "Manage Azure Identities & Governance",
    weight: "20–25%",
    color: "#00B4D8",
    icon: "🪪",
    labs: [
      {
        id: "1.1",
        title: "Create & Manage Entra ID Users",
        duration: "30 min",
        cost: "Free",
        difficulty: "Beginner",
        freeTrial: false,
        description: "Microsoft Entra ID is the identity backbone of Azure. Every person or service needing access to Azure requires an identity here. This lab covers creating users, assigning licenses, resetting passwords, and the delete/restore cycle — the core day-one admin tasks every Azure administrator performs.",
        objectives: [
          { task: "Navigate to Microsoft Entra ID", detail: "In the Azure Portal search bar type 'Microsoft Entra ID' and click the result. This is your identity hub — all users, groups, licenses, and authentication settings live here." },
          { task: "Create two test user accounts", detail: "Go to Users → + New User → Create new user. Set username: testuser1@yourdomain.onmicrosoft.com and Display name: Test User 1. IMPORTANT: On the Properties tab scroll ALL the way to the bottom — set Usage Location to United States before hitting Create. Repeat for testuser2. You will reuse these users across Labs 1.2 and 1.3." },
          { task: "Assign a usage location and license", detail: "Usage location MUST be set before assigning a license. Click testuser1 → Properties → Settings section → Usage Location: United States → Save. Then Licenses → + Assignments. If no licenses show (free tier) that is expected — the key lesson is the order: location first, then license." },
          { task: "Reset a user password", detail: "Click testuser1 → Reset Password in the top toolbar → Reset Password to confirm. Azure generates a temporary password the user must change on first login. This is admin-initiated reset — different from SSPR where users reset their own passwords without admin involvement." },
          { task: "Delete and restore a deleted user", detail: "From testuser1 → Delete in the top toolbar → confirm. Go to Users → Deleted users in the left menu → find testuser1 → click it → Restore → confirm. Go back to All Users to verify restoration. Deleted users are only recoverable for 30 days — after that permanently gone." },
        ],
        gotchas: [
          "Usage Location is at the very bottom of the Properties tab — scroll past all fields or you will miss it",
          "Usage Location MUST be set BEFORE assigning a license or Azure blocks the license assignment entirely",
          "Deleted users are only recoverable for exactly 30 days — after that permanently deleted with no recovery option",
          "Admin password reset and SSPR (Self-Service Password Reset) are two separate features — know both for the exam",
        ],
        examConcepts: [
          "Usage location is a prerequisite for license assignment — common exam troubleshooting scenario",
          "Deleted users: 30-day recovery window, recoverable from the Deleted users blade in Entra ID",
          "SSPR configured separately under Password Reset blade — users self-serve via registered auth methods",
          "Admin-initiated reset generates a temp password; SSPR lets users reset via email/phone without admin",
        ],
        costs: [
          { item: "Entra ID user accounts", amount: "Free", note: "Creating and managing users on the free tier costs nothing" },
          { item: "Entra ID P1/P2 licenses", amount: "$6–$9/user/month", note: "Not needed for this lab — only required for dynamic groups in Lab 1.2" },
        ],
        portal: "Search 'Microsoft Entra ID' → Users → + New User",
        tips: "Create testuser1 and testuser2 now — you will reuse them in Labs 1.2 and 1.3. Before doing anything else, go to Cost Management and set a $5 budget alert with email notifications at 50%, 80%, and 100%.",
      },
      {
        id: "1.2",
        title: "Manage Groups & Dynamic Membership",
        duration: "30 min",
        cost: "Free (P1 for dynamic)",
        difficulty: "Beginner",
        freeTrial: false,
        description: "Groups let Azure manage access at scale. Instead of assigning permissions to every individual, you assign to a group. Security groups control resource access. Microsoft 365 groups add collaboration tools. Dynamic groups automatically add/remove members based on user attributes — no manual management needed. This lab covers all three types and their key limitations.",
        objectives: [
          { task: "Create a Security group", detail: "Entra ID → Groups → + New Group. Group type: Security. Group name: sg-az104-test. Membership type: Assigned. Click Create. Security groups control access to Azure resources and support group nesting." },
          { task: "Create a Microsoft 365 group", detail: "Groups → + New Group. Group type: Microsoft 365. Group name: m365-az104-test. Membership type: Assigned. Click Create. Microsoft 365 groups automatically include a shared mailbox, Teams workspace, and SharePoint site." },
          { task: "Add members manually to both groups", detail: "Click sg-az104-test → Members → + Add members → search testuser1 → Select. Click m365-az104-test → Members → + Add members → search testuser2 → Select. Assigned membership means you manually control who is in the group." },
          { task: "Create a dynamic membership group (requires Entra ID P1)", detail: "To activate the P1/P2 trial: go to Entra ID → Roles and administrators → look for the banner at the top: 'Your organization needs Microsoft Entra ID Premium P1 or P2. Start a free trial.' Click it → activate Microsoft Entra ID P2 (includes all P1 features). Once active: Groups → + New Group → Security → name: sg-dynamic-test → Membership type: Dynamic User → Add dynamic query → rule: user.department -eq 'IT' → Save → Create. To test: edit testuser1 Properties → Department: IT → save → wait 2-3 min → check sg-dynamic-test members." },
          { task: "Assign a group owner", detail: "Click sg-az104-test → Owners → + Add owners → search testuser1 → Select. Group owners can manage group membership without being a Global Admin — useful for delegating group management to team leads." },
          { task: "Nest a Security group inside another Security group", detail: "Create a second Security group named sg-az104-nested. Then: sg-az104-test → Members → + Add members → search sg-az104-nested → Select. Security groups can nest inside other Security groups. Security groups CANNOT nest inside Microsoft 365 groups. Microsoft 365 groups cannot have ANY groups nested inside them — users only." },
        ],
        gotchas: [
          "Membership type CANNOT be changed after group creation — must delete and recreate with the correct type",
          "Dynamic User option is greyed out without an active Entra ID P1 or P2 license",
          "Microsoft 365 groups cannot contain nested groups of any type — members must be individual users only",
          "Security groups can nest other Security groups but CANNOT nest Microsoft 365 groups",
          "Find the P1/P2 trial via Entra ID → Roles and administrators → banner at top of page (not the Licenses blade)",
          "admin.microsoft.com requires a work/school account — use admin@yourtenant.onmicrosoft.com not your Gmail",
          "⚠️ CANCEL Entra P2 trial before May 29 via admin.microsoft.com → Billing → Your products to avoid charges",
        ],
        examConcepts: [
          "Security groups: resource access control, support nesting (Security into Security only)",
          "Microsoft 365 groups: collaboration features (Teams/SharePoint/mailbox), no nested groups allowed",
          "Dynamic membership requires Entra ID P1 — auto-adds/removes based on user attribute rules",
          "Membership type locked at creation — Assigned vs Dynamic cannot be changed afterward",
        ],
        costs: [
          { item: "Security and M365 groups", amount: "Free", note: "Group creation and management is free on the Entra ID free tier" },
          { item: "Entra ID P2 trial", amount: "Free for 30 days, then $9/user/month", note: "⚠️ CANCEL before May 29 via admin.microsoft.com → Billing → Your products" },
        ],
        portal: "Entra ID → Groups → + New Group",
        tips: "The P1/P2 trial is found via Entra ID → Roles and administrators — look for the banner at the top of the page. Do NOT buy the license. Once activated, the Dynamic User membership type becomes available in group creation.",
      },
      {
        id: "1.3",
        title: "Configure RBAC Role Assignments",
        duration: "45 min",
        cost: "Free",
        difficulty: "Beginner",
        freeTrial: false,
        description: "Role-Based Access Control (RBAC) is how Azure controls who can do what to which resources. A role defines allowed actions. A scope defines where those actions apply. Permissions inherit downward through the hierarchy — assign once at the top, it covers everything below. This lab builds the core skill every Azure admin uses daily.",
        objectives: [
          { task: "Assign the Reader role at Subscription scope", detail: "Search 'Subscriptions' → click your subscription → Access Control (IAM) → + Add → Add role assignment → Privileged administrator roles tab → Reader → Next → + Select members → search testuser1 → Select → Review + Assign. Reader = see everything, change nothing. At subscription scope, testuser1 can read ALL resource groups and resources beneath it." },
          { task: "Assign the Contributor role at Resource Group scope", detail: "Search 'Resource Groups' → click rg-az104-lab → Access Control (IAM) → + Add → Add role assignment → Privileged administrator roles tab → Contributor → Next → + Select members → search testuser2 → Select → Review + Assign. Contributor = create and manage resources, cannot change permissions. Scoped to this resource group only." },
          { task: "Create a custom RBAC role", detail: "Subscriptions → Access Control (IAM) → + Add → Add custom role → Name: Custom-VM-Reader → Start from scratch → Next → Permissions → + Add permissions → search 'Microsoft.Compute/virtualMachines' → check all Read actions → Next → Assignable scopes: your subscription → Next → Review + Create." },
          { task: "Verify access using Check Access", detail: "Subscription → Access Control (IAM) → Check access tab → search testuser1 → click their name. You will see their Reader assignment and scope. This is your go-to troubleshooting tool when a user cannot access something." },
          { task: "Remove a role assignment", detail: "Access Control (IAM) → Role assignments tab → find testuser2 Contributor assignment → check the box → Remove → Yes. Role removal takes effect within a few minutes." },
        ],
        gotchas: [
          "Owner, Contributor, and Reader are under the Privileged administrator roles tab — NOT the Job function roles tab",
          "Always hit the final Review + Assign button — easy to think you are done one step early",
          "Check Access shows assignments at the current scope only — go to Subscription IAM to see all assignments",
          "Permissions inherit DOWNWARD — Reader at subscription automatically covers all resource groups beneath it",
          "Role assignment changes can take 1-5 minutes to fully propagate",
        ],
        examConcepts: [
          "Scope hierarchy: Management Group → Subscription → Resource Group → Resource (permissions flow downward)",
          "Owner = full control including permissions. Contributor = create/manage, no permission changes. Reader = read only",
          "Least privilege: assign only the minimum permissions needed for the task",
          "Custom roles: define exactly which actions are allowed, scoped to specific subscriptions",
        ],
        costs: [{ item: "RBAC role assignments and custom roles", amount: "Free", note: "All RBAC operations including custom roles are completely free" }],
        portal: "Search 'Subscriptions' → your subscription → Access Control (IAM)",
        tips: "The exam loves scope hierarchy questions. Memorize: assign at Subscription = covers everything. Assign at Resource Group = covers only that RG. Assign at Resource = covers only that resource.",
      },
      {
        id: "1.4",
        title: "Azure Policy & Initiatives",
        duration: "45 min",
        cost: "Free",
        difficulty: "Intermediate",
        freeTrial: false,
        description: "Azure Policy enforces rules automatically across your environment. Audit effects log violations. Deny effects block non-compliant resource creation. Initiatives group multiple policies for bulk assignment. This lab builds the governance foundation that enterprises rely on for compliance at scale.",
        objectives: [
          { task: "Assign the Allowed Locations policy", detail: "Search 'Policy' → Assignments → + Assign Policy → click scope button (...) → select your subscription → click Policy definition field → search 'Allowed locations' → select it → Next → Parameters: select East US only → confirm Effect is Deny → Review + Create. Note: policy enforcement takes 5-30 minutes to propagate after assignment." },
          { task: "Test the Deny effect", detail: "Wait 5-10 minutes after assignment. Try creating a Storage Account or Virtual Network in West Europe or any non-East US region. You should get a policy violation error. NOTE: The Allowed Locations policy does NOT apply to Resource Groups — only to resources inside them. Test with a Storage Account or VNet, not a Resource Group." },
          { task: "Create a custom policy definition", detail: "Policy → Definitions → + Policy definition → Definition location: your subscription → Name: Require-Tag-Environment → Category: create new 'Lab Policies' → paste this JSON in the policy rule box: {\"if\":{\"field\":\"tags['environment']\",\"exists\":\"false\"},\"then\":{\"effect\":\"deny\"}} → Save. This blocks any resource missing an 'environment' tag." },
          { task: "View compliance state", detail: "Policy → Compliance. Find your Allowed Locations assignment. View compliant vs non-compliant resources. Note: compliance scans run every 24 hours and take up to 30 minutes to update. Existing non-compliant resources are NOT deleted — policy only blocks future violations." },
          { task: "Create a policy initiative", detail: "Policy → Definitions → + Initiative definition → Definition location: your subscription → Name: Lab-Governance-Initiative → + Add policy definitions → add Allowed locations AND your custom Require-Tag-Environment policy → Save. An initiative is a bundle of policies assigned together as one unit." },
        ],
        gotchas: [
          "Policy enforcement takes 5-30 minutes to propagate — do not assume it is broken if it does not block immediately",
          "Allowed Locations policy does NOT apply to Resource Groups — use 'Allowed locations for resource groups' for RGs",
          "Existing non-compliant resources are NOT deleted when a Deny policy is assigned — only future creation is blocked",
          "⚠️ FUTURE LAB DEPENDENCY: This policy restricts resources to East US. In later labs if you cannot create resources in other regions, come back here and temporarily delete this policy assignment",
          "Compliance scan results can take up to 30 minutes to reflect after assignment changes",
        ],
        examConcepts: [
          "Policy effects: Audit (logs only), Deny (blocks), DeployIfNotExists (auto-remediate), Append (adds fields)",
          "Initiatives = collections of policies assigned together as one group",
          "Existing non-compliant resources are NOT removed by new Deny policies — only future creation is blocked",
          "Allowed Locations applies to resources inside RGs, not to RGs themselves — separate policy for RGs",
        ],
        costs: [
          { item: "Azure Policy assignments and definitions", amount: "Free", note: "Policy is completely free regardless of number of assignments" },
        ],
        portal: "Search 'Policy' → Assignments → + Assign Policy",
        tips: "⚠️ IMPORTANT: The Allowed Locations policy you create here will impact ALL future labs. If you hit a policy violation error in a later lab creating resources in a different region, come back to Policy → Assignments and temporarily delete this assignment.",
      },
      {
        id: "1.5",
        title: "Manage Subscriptions, Resource Groups & Locks",
        duration: "30 min",
        cost: "Free",
        difficulty: "Beginner",
        freeTrial: false,
        description: "Resource groups are logical containers for related Azure resources. Tags categorize resources for cost tracking and automation. Locks prevent accidental deletion or modification. Cost Management gives visibility into spending. Together these form the organizational and protective foundation of any well-managed Azure environment.",
        objectives: [
          { task: "Create multiple resource groups", detail: "Search 'Resource Groups' → + Create → Resource group: rg-az104-dev → Region: East US → Review + Create. Repeat for rg-az104-prod (West US) and rg-az104-test (East US). NOTE: If the Allowed Locations policy from Lab 1.4 restricts to East US, rg-az104-prod in West US may be blocked. Resource group regions are just metadata storage locations." },
          { task: "Apply tags to resource groups", detail: "Click rg-az104-dev → Tags (left menu) → Name: environment, Value: dev → Name: owner, Value: yourname → Apply. Repeat for other RGs with appropriate values (prod/test). Tags are key-value pairs for cost tracking and organization. They do NOT automatically inherit to child resources." },
          { task: "Move a resource between resource groups", detail: "Go to rg-az104-lab → find storage account stjolson104lab01 → check the box next to it → Move (top toolbar) → Move to another resource group → Destination: rg-az104-dev → Next → Azure validates the move → Move. Verify the storage account now appears in rg-az104-dev." },
          { task: "Set resource group locks", detail: "Click rg-az104-prod → Locks (left menu under Settings) → + Add → Lock name: prod-delete-lock → Lock type: CanNotDelete → OK. Add second lock: prod-readonly-lock → ReadOnly → OK. Test: try creating a resource inside rg-az104-prod (ReadOnly blocks it). Try deleting rg-az104-prod (CanNotDelete blocks it)." },
          { task: "Set a budget alert in Cost Management", detail: "Search 'Cost Management + Billing' → Cost Management → Budgets → + Add → Scope: your subscription → Name: AZ104-Lab-Budget → Amount: $5 → Next → Alert conditions: Actual cost at 50%, 80%, 100% → Forecasted cost at 80%, 100% → Alert recipients: your email → Create." },
        ],
        gotchas: [
          "⚠️ Lab 1.4 dependency: Allowed Locations policy restricting East US will block rg-az104-prod creation in West US — temporarily disable the policy if needed",
          "CanNotDelete = can read AND modify, just cannot delete. ReadOnly = read only, no modifications or deletions at all",
          "Locks apply to ALL users including Global Admins and Owners — cannot be overridden without removing the lock first",
          "Tags do NOT inherit from resource group to child resources — need Azure Policy to enforce tag inheritance",
          "Not all resource types support being moved between resource groups — Azure validates before allowing the move",
        ],
        examConcepts: [
          "CanNotDelete lock: modify OK, delete blocked. ReadOnly lock: read only, all changes blocked",
          "Locks override all RBAC roles — even Owners cannot delete a locked resource without removing the lock",
          "Tags are NOT inherited by child resources — must be applied manually or via policy",
          "Budget alerts: Actual (money spent) vs Forecasted (projected spend based on current burn rate)",
        ],
        costs: [
          { item: "Resource groups, tags, and locks", amount: "Free", note: "All organizational and governance features are completely free" },
          { item: "Cost Management and budget alerts", amount: "Free", note: "Budget alerts and cost analysis have no additional cost" },
        ],
        portal: "Search 'Resource Groups' → + Create",
        tips: "Set the $5 budget alert FIRST before creating any VMs. This protects you from accidentally leaving expensive resources running.",
      },
    ],
  },
  {
    domain: "Implement & Manage Storage",
    weight: "15–20%",
    color: "#06D6A0",
    icon: "💾",
    labs: [
      {
        id: "2.1",
        title: "Create & Configure Storage Accounts",
        duration: "30 min",
        cost: "~$0.01",
        difficulty: "Beginner",
        freeTrial: false,
        description: "Storage accounts are Azure's storage foundation — they hold blobs, file shares, queues, and tables. Redundancy controls how many copies Azure keeps and where. Access tiers control the cost/performance tradeoff. This lab is mostly conceptual — toggling settings rather than complex workflows — because the exam tests whether you know the options and when to use them.",
        objectives: [
          { task: "Create a Storage Account with LRS redundancy", detail: "Search 'Storage Accounts' → + Create → Resource group: rg-az104-lab → Storage account name: stjolson104lab01 (globally unique, 3-24 chars, lowercase letters and numbers only, no hyphens) → Region: East US → Performance: Standard → Redundancy: Locally-redundant storage (LRS) → Review + Create. LRS = 3 copies within a single datacenter." },
          { task: "Create a second Storage Account with GRS", detail: "Repeat creation → name: stjolson104lab02 → Region: East US → Redundancy: Geo-redundant storage (GRS) → Review + Create. GRS = LRS locally + async replication to a secondary region. Compare both accounts to understand the redundancy difference." },
          { task: "Configure public blob access", detail: "Click INTO stjolson104lab01 (click the account name, not just the list) → left menu → Configuration → find 'Allow Blob anonymous access' → toggle Disabled → Save. When disabled, no container in this account can be made publicly accessible regardless of container-level settings. Account-level is a master override." },
          { task: "Configure access tiers", detail: "Still in stjolson104lab01 → Configuration → Access tier. Hot = frequent access, higher storage cost, lower access cost. Cool = infrequent (30+ days), lower storage cost, retrieval fee applies. Archive tier is set per-blob not at account level — lowest cost but hours to retrieve." },
          { task: "Enable soft delete for blobs and containers", detail: "stjolson104lab01 → Data protection (left menu) → enable 'Enable soft delete for blobs' → retention: 7 days → enable 'Enable soft delete for containers' → retention: 7 days → Save. Soft delete keeps deleted blobs recoverable for the retention period." },
        ],
        gotchas: [
          "Navigate INTO the specific storage account first — 'Storage Accounts' in the nav takes you to the hub/list, not an individual account",
          "Storage account names must be globally unique across ALL of Azure — add your initials and numbers",
          "Names: 3-24 characters, lowercase letters and numbers ONLY — no hyphens, underscores, or uppercase letters",
          "RA-GRS and GRS are different: RA-GRS provides READ access to the secondary region, GRS does not",
          "Archive tier is set at the blob level, not the account level",
        ],
        examConcepts: [
          "LRS: 3 copies, single datacenter. ZRS: 3 copies across availability zones. GRS: LRS + secondary region. RA-GRS: GRS + readable secondary",
          "Hot: frequent access. Cool: infrequent (30+ days). Archive: rarely accessed, hours to rehydrate",
          "Account-level anonymous access overrides all container-level public access settings",
          "Soft delete: recoverable deletion with configurable retention window (1-365 days)",
        ],
        costs: [
          { item: "LRS Storage Account (Standard)", amount: "~$0.018/GB/month", note: "Fractions of a cent for small test files" },
          { item: "GRS Storage Account (Standard)", amount: "~$0.036/GB/month", note: "Double LRS cost due to secondary region replication" },
        ],
        portal: "Search 'Storage Accounts' → + Create, then click INTO a specific account for settings",
        tips: "Always click into the specific storage account to access settings. The 'Storage Accounts' menu item shows the list/hub — one more click into the account itself gives you configuration options.",
      },
      {
        id: "2.2",
        title: "Manage Azure Blob Storage",
        duration: "30 min",
        cost: "~$0.01",
        difficulty: "Beginner",
        freeTrial: false,
        description: "Blob storage holds any unstructured data: files, images, videos, logs, backups. SAS tokens provide time-limited access without sharing credentials. Lifecycle management automates tier transitions to optimize cost. Immutability (WORM) locks data for compliance requirements.",
        objectives: [
          { task: "Create a blob container with Private access", detail: "Click INTO stjolson104lab01 → Containers (left menu under Data storage) → + Container → Name: test-container → Public access level: Private → Create. If public access options are greyed out, that is because you disabled anonymous access at the account level in Lab 2.1 — this is correct and expected." },
          { task: "Upload blobs and understand blob types", detail: "Click into test-container → Upload → select any small file → expand Advanced section → note Blob type options: Block blob (files/media, most common), Append blob (log files, can only add to end), Page blob (VM disk VHDs). Leave as Block blob → Upload." },
          { task: "Generate a SAS token", detail: "Click on the uploaded blob → Generate SAS (top toolbar) → Signing method: Account key → Permissions: Read only → Expiry: 1 hour from now → Generate SAS token and URL → copy the Blob SAS URL. Paste in a browser to access the file without credentials. Then change one character in the URL — you get an auth error. Two types: Account SAS (whole account) vs Service SAS (specific blob/container)." },
          { task: "Configure blob lifecycle management", detail: "Go to stjolson104lab01 → Lifecycle management (left menu under Data management) → + Add a rule → Name: move-to-cool → Apply to all blobs → Next → Last modified more than 30 days → Move to cool storage. Add second condition: more than 90 days → Move to archive storage → Add. Automates cost optimization." },
          { task: "Set an immutability policy (WORM)", detail: "Click into test-container → Access policy (left menu) → under Immutable blob storage → + Add policy → Policy type: Time-based retention → Retention period: 1 day (for testing) → Save. WORM = Write Once Read Many. Nobody — including admins — can modify or delete blobs during the retention period." },
        ],
        gotchas: [
          "Public access options grayed out at container level = anonymous access disabled at account level (Lab 2.1) — this is correct behavior",
          "Account SAS: covers whole storage account. Service SAS: scoped to specific blob or container",
          "Page blobs are for VM disk VHDs only — not for general file storage",
          "Lifecycle management rules can take up to 24 hours to execute — they do not apply immediately",
          "Immutability retention period is absolute — even Global Admins cannot delete blobs during it",
        ],
        examConcepts: [
          "Block blob: files/media. Append blob: logs, append-only. Page blob: VM disks/VHDs",
          "SAS tokens: time-limited, permission-scoped. Account SAS = whole account. Service SAS = specific resource",
          "Lifecycle management: automates Hot → Cool → Archive transitions based on last-modified age",
          "WORM immutability: time-based retention locks blobs from modification/deletion",
        ],
        costs: [
          { item: "Blob storage (Hot tier)", amount: "~$0.018/GB/month", note: "Minimal for small test files" },
          { item: "Lifecycle management", amount: "Free", note: "Policies are free — you save money as blobs move to cheaper tiers" },
        ],
        portal: "Click INTO storage account → Containers (left menu under Data storage)",
        tips: "SAS tokens are heavily tested on the exam. Know the difference between Account SAS (Shared access signature in the left menu) and Service SAS (generated from within a specific blob or container).",
      },
      {
        id: "2.3",
        title: "Azure Files & File Sync",
        duration: "45 min",
        cost: "~$0.05",
        difficulty: "Intermediate",
        freeTrial: false,
        description: "Azure Files provides managed SMB file shares mountable on Windows, Linux, and Mac. Azure File Sync extends this to hybrid environments — on-premises Windows Servers sync with Azure, enabling cloud backup, multi-site access, and cloud tiering. A very common real-world hybrid scenario tested on the exam.",
        objectives: [
          { task: "Create an Azure File Share", detail: "Click INTO stjolson104lab01 → File shares (left menu under Data storage) → + File share → Name: lab-fileshare → Tier: Transaction optimized → Create." },
          { task: "Attempt to mount the file share locally", detail: "Click into lab-fileshare → Connect (top toolbar) → Windows tab → copy the PowerShell script. Open PowerShell as Administrator on your local machine → paste and run the script. The script first tests if port 445 is open. Run: Test-NetConnection -ComputerName stjolson104lab01.file.core.windows.net -Port 445 to verify. If TcpTestSucceeded: False, your ISP is blocking port 445 — very common on residential networks." },
          { task: "Understand the port 445 workaround", detail: "If port 445 is blocked, workarounds are: (1) Point-to-Site VPN — connect your machine through an Azure VPN tunnel, covered in Lab 4.6. Once connected via P2S VPN you can mount the file share through the tunnel. (2) Site-to-Site VPN — connects your whole network. (3) ExpressRoute — dedicated private circuit. For now understand the concept and return after Lab 4.6." },
          { task: "Configure Azure File Sync (Storage Sync Service)", detail: "Search 'Azure File Sync' → + Create → Resource group: rg-az104-lab → Storage Sync Service name: svc-az104-filesync → Region: East US → Review + Create. Then: go to the service → Sync groups → + Sync group → Name: sg-lab-sync → Storage account: stjolson104lab01 → Azure file share: lab-fileshare → Create." },
          { task: "Understand server endpoint registration", detail: "A server endpoint requires the Azure File Sync agent installed on a Windows Server (2012 R2 or higher — NOT Windows 10/11). After installing the agent on the server, you register it to the Storage Sync Service, then add a server endpoint pointing to a local folder path. If you deploy a Windows Server VM in Lab 3.1, you can return and complete this step." },
        ],
        gotchas: [
          "Port 445 (SMB) is frequently blocked by residential ISPs — Test-NetConnection will confirm this definitively",
          "Azure File Sync agent requires Windows Server 2012 R2 or higher — NOT Windows 10/11 desktop",
          "Cloud tiering files appear local but are in Azure — opening them triggers a download from Azure",
          "The Storage Sync Service must be in the SAME region as your storage account",
          "P2S VPN from Lab 4.6 is the workaround for ISP port 445 blocking — return after that lab",
        ],
        examConcepts: [
          "Azure File Sync: Storage Sync Service → Sync Group → Cloud Endpoint (Azure share) + Server Endpoint (on-prem server)",
          "Cloud tiering: infrequently accessed files moved to Azure, local stub remains, file downloads on access",
          "Port 445 required for SMB — ISP blocking workaround: P2S VPN, S2S VPN, or ExpressRoute",
          "Standard tier: soft quota. Premium tier: hard quota enforced",
        ],
        costs: [
          { item: "Azure File Share (Transaction optimized)", amount: "~$0.06/GB/month", note: "Minimal for a small test share" },
          { item: "Azure File Sync service", amount: "Free for first server", note: "First registered server is free" },
        ],
        portal: "Click INTO storage account → File shares (left menu under Data storage)",
        tips: "If port 445 is blocked by your ISP, note the workarounds (P2S VPN, S2S VPN, ExpressRoute) and move on. You can revisit after Lab 4.6 VPN Gateway to actually mount the file share through the VPN tunnel.",
      },
      {
        id: "2.4",
        title: "Storage Security & Access Control",
        duration: "30 min",
        cost: "Free",
        difficulty: "Intermediate",
        freeTrial: false,
        description: "Storage accounts are prime attack targets. Defense in depth means multiple security layers: firewalls restrict network access, private endpoints route traffic off the public internet, SAS tokens limit credential exposure, key rotation contains breaches, and Defender monitors for threats. This lab covers all five layers.",
        objectives: [
          { task: "Configure the storage account firewall", detail: "⚠️ Lab 2.1 dependency: You disabled public blob access in Lab 2.1 — the firewall section only shows when public access is set to 'Enabled from selected virtual networks and IP addresses'. Click INTO stjolson104lab01 → Networking (left menu under Security + networking) → Public access tab → click Manage → change to 'Enabled from selected virtual networks and IP addresses' → Save → then under Firewall: check 'Add your client IP address' → Save." },
          { task: "Review Private Endpoint configuration", detail: "Networking → Private endpoint connections tab → + Private endpoint → Name: pe-storage-lab → Next: Resource → Target sub-resource: blob → Next: Virtual Network → select your VNet and subnet. NOTE: ⚠️ Lab 4.1 dependency: requires a VNet to exist. Complete Lab 4.1 first if you want to fully test this. Private endpoints give storage a private IP inside your VNet — all traffic stays on the Azure backbone." },
          { task: "Download and use Azure Storage Explorer", detail: "Download Azure Storage Explorer (free) from azure.microsoft.com/features/storage-explorer. Install and open. Connect: 'Storage account or service' → 'Account name and key' → get key from: Storage Account → Access keys → copy storage account name and key1 → paste into Storage Explorer. Browse containers. Then disconnect and reconnect using a SAS token: Storage Account → Shared access signature → set permissions/expiry → Generate → paste SAS URL into Storage Explorer. Note the difference in accessible scope." },
          { task: "Rotate storage account access keys", detail: "Storage Account → Access keys (left menu under Security + networking) → click 'Rotate key' next to key1 → confirm. Safe rotation process: (1) Apps use key2, (2) Rotate key1 (key2 still works), (3) Update apps to new key1, (4) Rotate key2, (5) Update apps to key2. Always one valid key during rotation — no downtime." },
          { task: "Enable Microsoft Defender for Storage", detail: "Storage Account → Microsoft Defender for Cloud (left menu) → Enable Microsoft Defender for Storage. Or at subscription level: search 'Microsoft Defender for Cloud' → Environment settings → your subscription → find Storage → toggle On. Defender monitors for malware uploads, unusual access patterns, suspicious auth, and data exfiltration." },
        ],
        gotchas: [
          "⚠️ Lab 2.1 dependency: Public blob access was disabled — you must change it to 'Selected networks' to see the firewall rules section",
          "⚠️ Lab 4.1 dependency: Private endpoints require a VNet to already exist — come back after Lab 4.1",
          "'Selected networks' with NO IP rules added = nobody can access the storage account at all",
          "Rotating an active key immediately breaks any application currently using that key — use staggered rotation",
          "Access keys give full account access. SAS tokens are scoped and time-limited — prefer SAS for external sharing",
        ],
        examConcepts: [
          "Storage firewall: 'Selected networks' with no rules = complete lockdown even for admins accessing via portal",
          "Private endpoint: private IP inside your VNet, all traffic on Azure backbone — required for compliance",
          "Access keys = full account access, no expiry. SAS = scoped permissions, time-limited, preferred for delegation",
          "Key rotation: stagger keys so one is always valid. Never rotate the key apps are currently using",
          "Defender for Storage: monitors malware, anomalous access, suspicious activity — alerts in Defender for Cloud",
        ],
        costs: [
          { item: "Storage firewall and SAS tokens", amount: "Free", note: "Network rules and SAS token generation are free" },
          { item: "Private endpoint", amount: "~$7.30/month + $0.01/GB", note: "⚠️ Delete after lab if cost is a concern" },
          { item: "Microsoft Defender for Storage", amount: "Free 30-day trial, then ~$10/TB/month", note: "Disable after lab to avoid ongoing charges" },
        ],
        portal: "Click INTO storage account → Security + networking section in left menu",
        tips: "Defender for Storage alerts appear in Microsoft Defender for Cloud (the central dashboard) — not on the individual storage account's monitoring blade. Remember this for exam troubleshooting scenarios.",
      },
    ],
  },
  {
    domain: "Deploy & Manage Azure Compute",
    weight: "20–25%",
    color: "#FFB703",
    icon: "⚙️",
    labs: [
      {
        id: "3.1",
        title: "Create & Configure Virtual Machines",
        duration: "60 min",
        cost: "~$0.10–$0.50",
        difficulty: "Beginner",
        freeTrial: true,
        description: "Virtual Machines are the foundation of Azure compute — provision a cloud server, choose OS, CPU, RAM, and disk, pay only for what you use. This lab covers deploying Linux via SSH, resizing VMs, adding and initializing data disks, and configuring boot diagnostics. These are core VM administration skills tested heavily on the exam.",
        objectives: [
          { task: "Deploy an Ubuntu Linux VM", detail: "⚠️ See Free Trial tab before starting. Search 'Virtual Machines' → + Create → Azure virtual machine → Resource group: create new rg-az104-vms → VM name: vm-linux-lab01 → Region: East US → Availability options: No infrastructure redundancy → Image: Ubuntu Server 24.04 LTS (published by Canonical — NOT third-party marketplace images which are blocked on free trial) → Size: B1s or cheapest available → Authentication type: SSH public key → Username: azureuser → SSH public key source: Generate new key pair → Key pair name: vm-linux-lab01-key → Networking: Public inbound ports: SSH (22) → Management: Boot diagnostics: On with managed storage account → Review + Create → Create → DOWNLOAD PRIVATE KEY when prompted — this is your only chance." },
          { task: "Connect via SSH from Windows", detail: "After deployment: vm-linux-lab01 → Connect → SSH → copy the SSH command shown. Open PowerShell on your local machine → navigate to key file location: cd C:\\Users\\YourName\\Downloads → run the SSH command replacing <private key path> with your actual file path and removing the angle brackets: ssh -i C:\\Users\\Justin\\Downloads\\vm-linux-lab01-key.pem azureuser@YOUR-PUBLIC-IP → type 'yes' for fingerprint → you are now in the Linux shell at the azureuser@vm-linux-lab01:~$ prompt." },
          { task: "Resize the VM (requires deallocation)", detail: "In the portal → vm-linux-lab01 → Stop at the top → wait for status 'Stopped (deallocated)' — NOT just 'Stopped'. Only deallocated status stops compute charges. Then: left menu under Availability + scale → Size → select different size → Resize → then Start to power back on. You MUST deallocate before resizing — cannot resize a running VM." },
          { task: "Add and attach a data disk", detail: "vm-linux-lab01 → Disks (left menu under Settings) → in the Data disks section click + Create and attach a new disk → Disk name: datadisk01 → Storage type: Standard HDD → Size (GiB): change to 32 → OK → Save (top toolbar). The disk is now attached to this VM but not yet usable — must be initialized inside the OS." },
          { task: "Initialize the data disk inside Linux", detail: "SSH back into the VM → run: lsblk (identifies your new disk — look for the 32G disk without partitions, likely sda or sdc) → sudo fdisk /dev/sda (replace sda with your disk name) → inside fdisk press: n (new partition), p (primary), 1 (number), Enter (default start), Enter (default end), w (write and exit) → sudo mkfs.ext4 /dev/sda1 → sudo mkdir /datadrive → sudo mount /dev/sda1 /datadrive → echo '/dev/sda1 /datadrive ext4 defaults 0 0' | sudo tee -a /etc/fstab → df -h to verify." },
          { task: "Verify Boot Diagnostics", detail: "vm-linux-lab01 → Boot diagnostics (left menu under Help) → should show Enabled → click Serial log to see boot messages → click Screenshot to see the VM console. Use these when SSH is not working and you cannot connect to the VM to troubleshoot." },
          { task: "Deallocate when done", detail: "CRITICAL: vm-linux-lab01 → Stop → confirm → wait for status 'Stopped (deallocated)'. Only this status stops compute billing. Closing your browser or SSH session does NOT stop the VM." },
        ],
        gotchas: [
          "⚠️ FREE TRIAL: B1s often shows 'Request quota' on free trial subscriptions — try Ubuntu 24.04 with cheapest available size. Third-party Ubuntu marketplace images are blocked — use the official Canonical Ubuntu Server 24.04 LTS image",
          "⚠️ Lab 1.4 dependency: Allowed Locations policy (East US only) may block VM creation in other regions if you try to work around quota issues. Temporarily disable the policy if needed",
          "Stopped ≠ Deallocated — 'Stopped' still bills for compute. Only 'Stopped (deallocated)' stops compute charges",
          "Download the SSH private key when prompted during creation — this is the ONLY time Azure offers to download it",
          "Azure may renumber disk identifiers (sda, sdb, sdc) after attaching new disks — always use lsblk to identify disks by size",
          "Data disk appears in lsblk after attachment but has no partitions — must be partitioned and formatted before use",
        ],
        examConcepts: [
          "Stopped vs Deallocated: only Stopped (deallocated) stops compute charges — most tested VM billing concept",
          "VM resize requires deallocation first — cannot resize a running VM",
          "Data disks must be initialized (partitioned, formatted, mounted) inside the OS after Azure attaches them",
          "Boot diagnostics: serial log + screenshot — use when VM is unresponsive and SSH/RDP fails",
        ],
        costs: [
          { item: "B1s VM (if available)", amount: "~$0.0104/hour", note: "2-hour lab session = ~$0.02. Deallocate after each session" },
          { item: "Next cheapest VM size", amount: "~$0.04–$0.14/hour", note: "Still cheap per hour — deallocate immediately after lab" },
          { item: "OS disk (Standard SSD 30GB)", amount: "~$2.40/month", note: "⚠️ Disk bills even when VM is deallocated — delete VM entirely when done with all VM labs" },
          { item: "Data disk (Standard HDD 32GB)", amount: "~$1.30/month", note: "Also bills when deallocated — delete when done with all VM labs" },
          { item: "Public IP address", amount: "~$3.65/month if static", note: "Dynamic public IPs are free when deallocated" },
        ],
        portal: "Search 'Virtual Machines' → + Create → Azure virtual machine",
        tips: "⚠️ ALWAYS deallocate VMs after each lab session via the Azure Portal Stop button. Closing your browser or SSH session does NOT stop the VM. Check the VM status in the portal before ending your study session each day.",
      },
      {
        id: "3.2",
        title: "VM Availability & Scale Sets",
        duration: "45 min",
        cost: "~$0.20",
        difficulty: "Intermediate",
        freeTrial: true,
        description: "Single VMs fail. Availability Sets protect against hardware failures by spreading VMs across different physical racks. Availability Zones protect against datacenter failures. VM Scale Sets auto-manage identical VMs and scale based on demand. Bastion provides secure browser-based access without exposing RDP/SSH ports.",
        objectives: [
          { task: "Create an Availability Set", detail: "Search 'Availability Sets' → + Create → Resource group: rg-az104-vms → Name: avset-lab → Region: East US → Fault domains: 2 → Update domains: 5 → Review + Create. Fault domains = different physical racks with separate power and network. Update domains = logical groups for rolling updates so not all VMs reboot at once." },
          { task: "Deploy 2 VMs into the Availability Set", detail: "Create VM: vm-avset-01 → Basics tab → Availability options: Availability set → select avset-lab → Size: cheapest available → same settings as Lab 3.1 but Windows or Linux. Repeat for vm-avset-02 in the same availability set. Both VMs now spread across different fault domains — rack failure cannot take down both." },
          { task: "Create a VM Scale Set", detail: "Search 'Virtual Machine Scale Sets' → + Create → Resource group: rg-az104-vms → Scale set name: vmss-lab → Region: East US → Orchestration: Uniform → Image: Ubuntu Server 24.04 LTS → Size: cheapest available → Authentication: SSH public key → Scaling section: Initial instance count: 2 → Scaling policy: Autoscale → Networking: use existing VNet or create new → Load balancing: Azure load balancer → Review + Create." },
          { task: "Configure scale-out rule", detail: "vmss-lab → Scaling (left menu under Availability + scale) → Custom autoscale → + Add a rule → Metric: Percentage CPU → Operator: Greater than → Threshold: 70 → Duration: 5 minutes → Operation: Increase count by 1 → Cool down: 5 minutes → Save. When CPU stays above 70% for 5 minutes, one VM instance is added automatically." },
          { task: "Configure scale-in rule", detail: "Add another rule → Metric: Percentage CPU → Operator: Less than → Threshold: 30 → Duration: 5 minutes → Operation: Decrease count by 1 → Save. Always pair scale-out with scale-in. Without scale-in, the set only grows and never shrinks — leading to unnecessary ongoing costs." },
          { task: "Azure Bastion (optional — expensive)", detail: "⚠️ See Costs tab before proceeding. Search 'Bastion' → + Create → Resource group: rg-az104-vms → Name: bastion-lab → Region: East US → Virtual network: your VNet → Subnet: AzureBastionSubnet (must be named EXACTLY this, at least /27) → Public IP: create new → Review + Create (5-10 minutes). After deployment: VM → Connect → Bastion → enter credentials → connects via browser, no RDP client or open ports needed. DELETE BASTION IMMEDIATELY after testing." },
        ],
        gotchas: [
          "⚠️ FREE TRIAL: Same B1s quota issues from Lab 3.1 apply here — use the same size workaround",
          "Availability Sets = same datacenter, different racks. Availability Zones = different datacenters. This is the most classic exam trap",
          "Azure Bastion subnet must be named EXACTLY 'AzureBastionSubnet' — any other name is rejected",
          "Bastion subnet must be at least /27 — smaller subnets are rejected",
          "Scale sets need BOTH scale-out AND scale-in rules — missing scale-in means the set only ever grows",
        ],
        examConcepts: [
          "Availability Set: same datacenter, different racks. Protects against hardware failure only",
          "Availability Zone: different datacenters in the same region. Protects against datacenter failure",
          "Scale Sets: identical VMs managed as a group, supports autoscale, best for stateless web apps",
          "Bastion: browser-based RDP/SSH, no public IP on VM, no open RDP/SSH ports required",
        ],
        costs: [
          { item: "2 VMs in Availability Set", amount: "~$0.02/hour combined", note: "Deallocate both VMs after lab" },
          { item: "VM Scale Set (2 instances)", amount: "~$0.02/hour combined", note: "Delete scale set after lab — it runs instances continuously" },
          { item: "Azure Bastion (Basic SKU)", amount: "~$0.19/hour (~$140/month)", note: "⚠️ VERY EXPENSIVE — delete immediately after testing. Bills by the hour even when not in active use" },
        ],
        portal: "Search 'Virtual Machine Scale Sets' → + Create",
        tips: "Availability Set vs Availability Zone is the #1 exam trap in this domain. Memorize: Availability Set = same building, different racks. Availability Zone = different buildings. They are completely different levels of protection.",
      },
      {
        id: "3.3",
        title: "App Service & Web Apps",
        duration: "45 min",
        cost: "Free (F1 tier)",
        difficulty: "Beginner",
        freeTrial: false,
        description: "App Service is Azure's PaaS platform for hosting web apps — deploy code, Azure handles infrastructure. No VMs to patch or manage. Deployment slots enable zero-downtime deployments by swapping staging and production environments. The Free F1 tier has no compute cost, making this lab ideal for learning without spending.",
        objectives: [
          { task: "Create an App Service Plan (Free F1)", detail: "Search 'App Service Plans' → + Create → Resource group: rg-az104-vms → Name: asp-lab → Operating System: Windows → Region: East US → Pricing tier: click 'Explore pricing tiers' → Dev/Test tab → F1 (Free) → Select → Review + Create. The App Service Plan is the underlying compute. One plan can host multiple web apps." },
          { task: "Deploy a Web App", detail: "Search 'App Services' → + Create → Web App → Resource group: same → Name: webapp-lab-yourname (globally unique — becomes yourname.azurewebsites.net) → Publish: Code → Runtime stack: Node.js 20 LTS → OS: Windows → Region: East US → App Service Plan: asp-lab → Review + Create. After deployment, click the URL to see the placeholder page." },
          { task: "Deploy sample code", detail: "Web app → Deployment Center (left menu under Deployment) → Source: External Git → Repository: https://github.com/Azure-Samples/nodejs-docs-hello-world → Branch: master → Save. After 1-2 minutes, refresh your app URL — you should see 'Hello World!' Replace the placeholder page." },
          { task: "Create a deployment slot", detail: "Web app → Deployment slots (left menu under Deployment) → + Add Slot → Name: staging → Clone settings from: your production app → Add. You now have staging and production slots. Deploy risky changes to staging, test them, then swap to production with zero downtime." },
          { task: "Perform a slot swap", detail: "Deployment slots → Swap → Source: staging → Target: production → Swap. All traffic in staging instantly becomes production and vice versa. Slot-specific settings (marked as 'Deployment slot setting') STAY with the slot on swap. Non-slot-specific settings swap with the content." },
          { task: "Review App Service Logs", detail: "Web app → App Service logs (left menu under Monitoring) → enable Application logging (Filesystem): Information level → enable Web server logging: File System → Save. Then: Log stream (left menu) → refresh your app URL in a browser → watch HTTP requests appear in real time." },
        ],
        gotchas: [
          "F1 free tier: NO custom domains, NO SSL certificates, NO deployment slots, NO autoscale, only 60 min/day compute",
          "Deployment slots require Standard tier or higher — may be limited on F1",
          "App name must be globally unique — add your name/initials to ensure it is available",
          "Slot-specific settings stay with the slot on swap. Non-slot settings travel with the code content",
          "Autoscale requires Standard tier (S1+) — not available on Free or Shared tiers",
        ],
        examConcepts: [
          "App Service Plan = compute resource. Web App = application running on it. Multiple apps can share one plan",
          "Deployment slots: staging → production swap, zero downtime",
          "Slot-specific settings stay with the slot; non-slot-specific settings swap with the app",
          "App Service handles patching, load balancing, scaling — you manage only the application code",
        ],
        costs: [
          { item: "App Service Plan F1 (Free)", amount: "Free", note: "F1 is completely free — 60 min/day compute, 1 GB storage" },
          { item: "Standard S1 (if you upgrade to test autoscale)", amount: "~$73/month", note: "⚠️ Do NOT upgrade unless intentional — downgrade back to F1 or delete after testing" },
        ],
        portal: "Search 'App Services' → + Create → Web App",
        tips: "Deployment slots are one of the most tested App Service features. Focus on understanding slot-specific settings — if marked slot-specific, the setting travels with the slot on swap. If not marked, it travels with the code.",
      },
      {
        id: "3.4",
        title: "Azure Container Instances & AKS Basics",
        duration: "30 min",
        cost: "~$0.05",
        difficulty: "Intermediate",
        freeTrial: true,
        description: "Azure Container Instances (ACI) runs a single container in seconds with zero infrastructure management. Azure Kubernetes Service (AKS) orchestrates clusters of containers for production-scale apps. This lab shows when to use each. AKS is expensive — deploy, verify, delete immediately.",
        objectives: [
          { task: "Deploy a container using ACI", detail: "Search 'Container Instances' → + Create → Resource group: rg-az104-vms → Container name: aci-nginx-lab → Region: East US → Image source: Docker Hub or other registry → Image type: Public → Image: nginx:latest → OS: Linux → Size: 1 vcpu, 1.5 GiB memory → Networking tab: DNS name label: aci-nginx-yourname (globally unique) → Ports: 80 TCP → Review + Create. Deploys in ~30 seconds." },
          { task: "Test access and review logs", detail: "aci-nginx-lab → Overview → find the FQDN → open in a browser → you should see the nginx welcome page. Then: Containers (left menu) → select the container → Logs tab (nginx access logs) → Events tab (image pull, started, healthy). If container fails to start, Events tab shows why." },
          { task: "Deploy an AKS cluster (WARNING — EXPENSIVE)", detail: "⚠️ See Costs tab FIRST. Search 'Kubernetes services' → + Create → Kubernetes cluster → Resource group: rg-az104-vms → Cluster name: aks-lab → Region: East US → Node pool: Node size: B2s → Node count: 1 → Integrations tab: disable Container Insights (saves cost) → Review + Create. Takes 5-10 minutes." },
          { task: "Connect and run kubectl", detail: "After AKS deploys → Connect tab → copy the az aks get-credentials command → open Cloud Shell (>_ icon in portal top bar) → Bash → paste and run: az aks get-credentials --resource-group rg-az104-vms --name aks-lab → then run: kubectl get nodes → you should see 1 node in Ready status." },
          { task: "DELETE AKS immediately", detail: "CRITICAL: aks-lab → Delete → type cluster name → Delete. Also delete the auto-created resource group named MC_rg-az104-vms_aks-lab_eastus which contains the node VMs. AKS costs ~$60-70/month per node even when idle. Do NOT leave it running." },
        ],
        gotchas: [
          "⚠️ FREE TRIAL: AKS may have quota restrictions — if deployment fails, read through concepts for the exam",
          "⚠️ AKS creates a SECOND resource group automatically (named MC_*) — delete BOTH when cleaning up",
          "ACI containers bill by the second — delete after testing",
          "kubectl requires credentials — always run az aks get-credentials before any kubectl commands",
          "AKS control plane is FREE — you only pay for the worker node VMs",
        ],
        examConcepts: [
          "ACI: single containers, no cluster, pay-per-second — best for simple, short-lived, or batch workloads",
          "AKS: managed Kubernetes for many containers — best for complex microservices and production apps",
          "AKS control plane is managed by Azure (free) — you pay for worker nodes only",
          "kubectl: Kubernetes CLI. az aks get-credentials: downloads cluster credentials to configure kubectl",
        ],
        costs: [
          { item: "Azure Container Instances", amount: "~$0.0012/hour", note: "Delete after testing — costs pennies" },
          { item: "AKS cluster (1x B2s node)", amount: "~$0.0832/hour (~$60/month)", note: "⚠️ DELETE IMMEDIATELY — the node VM runs and bills continuously even when idle" },
          { item: "AKS auto-created load balancer", amount: "~$18/month", note: "Deleted automatically when you delete the cluster" },
        ],
        portal: "Search 'Container Instances' for ACI, 'Kubernetes services' for AKS",
        tips: "If the free trial blocks AKS, that is okay — read through the concepts. The exam tests knowledge not hands-on completion. Focus time on ACI which deploys easily and is still heavily tested.",
      },
      {
        id: "3.5",
        title: "Azure Backup & Site Recovery",
        duration: "45 min",
        cost: "~$0.10",
        difficulty: "Intermediate",
        freeTrial: false,
        description: "Azure Backup protects against data loss — accidental deletion, ransomware, corruption — via point-in-time recovery. Azure Site Recovery (ASR) protects against region outages — it replicates VMs to a secondary region for failover. File Recovery lets you restore individual files without restoring the whole VM. Two different tools for two different disaster scenarios.",
        objectives: [
          { task: "Create a Recovery Services Vault", detail: "Search 'Recovery Services Vaults' → + Create → Resource group: rg-az104-vms → Name: rsv-az104-lab → Region: East US (MUST match the region of VMs being protected — cross-region backup is not supported) → Review + Create." },
          { task: "Configure VM backup", detail: "rsv-az104-lab → Backup (left menu under Getting started) → Where is your workload running: Azure → What do you want to back up: Virtual machine → Backup → Backup policy: DefaultPolicy (daily at 2:30 AM UTC, 30-day retention) → Select Virtual Machines: select vm-linux-lab01 → Enable Backup." },
          { task: "Trigger an on-demand backup", detail: "rsv-az104-lab → Backup items (left menu under Protected items) → Azure Virtual Machine → click vm-linux-lab01 → Backup Now → Retain backup until: 1 day from now → OK. Go to Backup jobs to monitor. First backup is a FULL backup (15-30 minutes). Subsequent backups are incremental." },
          { task: "Restore individual files (File Recovery)", detail: "After backup completes → Backup items → vm-linux-lab01 → File Recovery → Select recovery point: choose your backup → Download Script → run the script on your local machine or inside the VM via SSH. The script mounts the backup as a drive. Browse it, copy needed files → click Unmount Disks when done. Restore one file without restoring the whole VM." },
          { task: "Configure Azure Site Recovery", detail: "rsv-az104-lab → Site Recovery (left menu) → Azure virtual machines → Enable replication → Source: East US → Resource group: rg-az104-vms → select vm-linux-lab01 → Target region: West US → leave defaults → Enable replication. ASR begins replicating to West US. After testing: Replicated items → select VM → Disable replication to stop ASR charges." },
        ],
        gotchas: [
          "Recovery Services Vault MUST be in the SAME region as the VMs it protects for Azure Backup",
          "First backup is always a full backup — takes significantly longer than subsequent incremental backups",
          "ASR has ongoing replication costs — disable replication after testing",
          "Azure Backup and ASR are completely separate features serving different purposes",
          "File Recovery script expires after 12 hours — the mounted backup becomes inaccessible after that",
          "ASR creates a new resource group in the target region — delete it when done",
        ],
        examConcepts: [
          "Azure Backup: data protection, point-in-time restore, same region vault required",
          "Azure Site Recovery: disaster recovery, replicates VMs to secondary region for failover",
          "Recovery Services Vault: same region for Backup, cross-region for ASR replication",
          "File Recovery: mount backup as drive, restore individual files — no full VM restore needed",
          "First backup = full. Subsequent = incremental (faster, less storage used)",
        ],
        costs: [
          { item: "Recovery Services Vault", amount: "Free", note: "The vault itself has no cost" },
          { item: "Azure Backup (VM)", amount: "~$5/month per VM", note: "Delete the vault when done with labs to stop backup storage charges" },
          { item: "Azure Site Recovery", amount: "~$25/month per VM", note: "⚠️ Disable replication immediately after testing to stop this charge" },
        ],
        portal: "Search 'Recovery Services Vaults' → + Create",
        tips: "Exam shortcut for scenario questions: 'accidental deletion / ransomware / restore files' = Azure Backup. 'Region outage / disaster recovery / failover' = Azure Site Recovery. These two tools have completely different purposes.",
      },
    ],
  },
  {
    domain: "Configure & Manage Virtual Networking",
    weight: "25–30%",
    color: "#E040FB",
    icon: "🌐",
    labs: [
      {
        id: "4.1",
        title: "Create & Configure Virtual Networks",
        duration: "30 min",
        cost: "Free",
        difficulty: "Beginner",
        freeTrial: false,
        description: "Virtual Networks are the private networking backbone of Azure. Every VM, database, and service needs a VNet to communicate privately. VNets are divided into subnets for organizing resources. Service endpoints route Azure service traffic over the private backbone. This is the foundational networking lab — all subsequent networking labs build on the VNet you create here.",
        objectives: [
          { task: "Create a VNet with subnets", detail: "Search 'Virtual Networks' → + Create → Resource group: rg-az104-lab → Name: vnet-az104-lab → Region: East US → IP Addresses tab: Address space: 10.0.0.0/16 → + Add subnet: Name: snet-vms, Starting address: 10.0.1.0, Size: /24 → + Add subnet: Name: snet-appgw, Starting address: 10.0.2.0, Size: /24 → + Add subnet: Name: AzureBastionSubnet, Starting address: 10.0.3.0, Size: /26 → Review + Create. The /16 gives 65,536 addresses for all labs." },
          { task: "Configure static private IP on a VM", detail: "vm-linux-lab01 → Networking (left menu) → click the network interface name (e.g., vm-linux-lab01_z1) → IP configurations → click the ipconfig1 entry → Assignment: change from Dynamic to Static → IP address: 10.0.1.10 → Save. Static IPs persist through VM restarts. Dynamic IPs may change on restart." },
          { task: "Configure custom DNS for the VNet", detail: "vnet-az104-lab → DNS servers (left menu under Settings) → Custom → add 8.8.8.8 as a test entry → Save. Azure-provided DNS (168.63.129.16) automatically resolves Azure resource names. Custom DNS is used for resolving on-premises domain names in hybrid environments." },
          { task: "Enable service endpoints on a subnet", detail: "vnet-az104-lab → Subnets → click snet-vms → Service endpoints section → + Add service: Microsoft.Storage → Save. Then: storage account stjolson104lab01 → Networking → Selected networks → Virtual networks → + Add existing virtual network → select vnet-az104-lab → snet-vms → Add → Save. Storage traffic from VMs in snet-vms now routes over the Azure backbone." },
        ],
        gotchas: [
          "Subnets within a VNet CANNOT have overlapping address ranges — plan IP space before creating subnets",
          "Azure reserves 5 IPs in every subnet: .0 (network), .1 (gateway), .2 and .3 (DNS), .255 (broadcast)",
          "AzureBastionSubnet must be named EXACTLY 'AzureBastionSubnet' — case sensitive, no variations",
          "VNets are region-specific — resources in different regions cannot communicate without peering or VPN",
          "Service endpoints optimize routing path — they do NOT give a private IP (that requires private endpoints)",
        ],
        examConcepts: [
          "Azure reserves 5 IP addresses per subnet — reduces available host addresses",
          "Static vs dynamic private IP: static persists through restarts, dynamic may change on restart",
          "Service endpoints: private routing to Azure PaaS services, traffic stays on Azure backbone",
          "Default Azure DNS: 168.63.129.16. Custom DNS needed for on-premises domain resolution",
        ],
        costs: [
          { item: "Virtual Network and subnets", amount: "Free", note: "VNets have no cost" },
          { item: "Outbound data transfer", amount: "~$0.087/GB (first 10TB)", note: "Minimal for lab testing" },
        ],
        portal: "Search 'Virtual Networks' → + Create",
        tips: "Build this VNet carefully — you will reuse vnet-az104-lab in Labs 4.2 through 4.6. The subnets need to match future lab requirements: AzureBastionSubnet for Bastion, snet-appgw for Application Gateway, snet-vms for lab VMs.",
      },
      {
        id: "4.2",
        title: "Network Security Groups (NSGs)",
        duration: "45 min",
        cost: "Free",
        difficulty: "Intermediate",
        freeTrial: false,
        description: "NSGs are Azure's built-in firewall — rules with priority numbers control traffic into and out of subnets and VM network interfaces. Lower priority numbers are evaluated first. Azure includes default rules at 65000, 65001, and 65500 that cannot be deleted but can be overridden. NSG Flow Logs capture all connection records for security auditing.",
        objectives: [
          { task: "Create an NSG and associate with a subnet", detail: "Search 'Network Security Groups' → + Create → Resource group: rg-az104-lab → Name: nsg-snet-vms → Region: East US → Create. After creation: Subnets (left menu under Settings) → + Associate → Virtual network: vnet-az104-lab → Subnet: snet-vms → OK." },
          { task: "Create inbound rule: allow SSH from your IP only", detail: "nsg-snet-vms → Inbound security rules → + Add → Source: My IP address (portal auto-fills your current IP) → Source port: * → Destination: Any → Destination port: 22 → Protocol: TCP → Action: Allow → Priority: 100 → Name: Allow-SSH-MyIP → Add." },
          { task: "Create inbound rule: allow HTTP from anywhere", detail: "Inbound security rules → + Add → Source: Any → Source port: * → Destination: Any → Destination port: 80 → Protocol: TCP → Action: Allow → Priority: 110 → Name: Allow-HTTP-Any → Add." },
          { task: "Create outbound rule: deny internet traffic", detail: "Outbound security rules → + Add → Source: Any → Destination: Internet → Destination port: * → Protocol: Any → Action: Deny → Priority: 100 → Name: Deny-Internet-Out → Add. Test via SSH into VM: run curl https://google.com (should fail with connection timeout)." },
          { task: "Enable NSG Flow Logs", detail: "nsg-snet-vms → NSG flow logs (left menu under Monitoring) → + Create → select nsg-snet-vms → Storage account: stjolson104lab01 → Retention: 7 days → Save. After generating traffic, check the storage account for log files in insights-logs-networksecuritygroupflowevent container." },
        ],
        gotchas: [
          "Lower priority NUMBER = higher precedence. Priority 100 is evaluated BEFORE priority 200",
          "Default rules at 65000, 65001, 65500 CANNOT be deleted — only overridden by lower priority numbers",
          "NSGs on subnets AND NICs are both evaluated if both exist — both must allow traffic for it to pass",
          "Deny-Internet-Out rule will also break apt-get package updates inside Linux VMs",
          "⚠️ Restrict SSH source IP carefully — if too restrictive you may lock yourself out of the VM",
        ],
        examConcepts: [
          "Rule evaluation: lowest priority number first until a match is found",
          "Default rules: 65000 (AllowVnetInBound), 65001 (AllowAzureLoadBalancerInBound), 65500 (DenyAllInBound)",
          "Subnet NSG filters all subnet traffic. NIC NSG filters individual VM traffic. Both evaluated if both exist",
          "Flow logs: record all allowed and denied flows for security auditing and compliance",
        ],
        costs: [
          { item: "NSG creation and rules", amount: "Free", note: "NSGs are completely free" },
          { item: "NSG Flow Logs storage", amount: "~$0.02/GB", note: "Log data stored in your storage account — minimal for lab use" },
        ],
        portal: "Search 'Network Security Groups' → + Create",
        tips: "Know the three default NSG rules cold: 65000 (AllowVnetInBound), 65001 (AllowAzureLoadBalancerInBound), 65500 (DenyAllInBound). These appear in exam questions. You cannot delete them — only override with lower priority numbers.",
      },
      {
        id: "4.3",
        title: "Azure DNS (Public & Private Zones)",
        duration: "30 min",
        cost: "~$0.01",
        difficulty: "Beginner",
        freeTrial: false,
        description: "Azure DNS hosts domain DNS records in Azure. Public DNS zones are internet-facing. Private DNS zones resolve only within linked VNets. Auto-registration automatically creates VM DNS records when deployed, enabling VMs to find each other by hostname without manual configuration.",
        objectives: [
          { task: "Create a Public DNS Zone", detail: "Search 'DNS Zones' → + Create → Resource group: rg-az104-lab → Name: az104lab.com (test name — you do not need to own it for lab purposes) → Review + Create. After creation, note the 4 name servers listed — these are what you configure at your domain registrar to delegate DNS to Azure." },
          { task: "Add DNS records", detail: "Click into az104lab.com → + Record set → Name: www → Type: A → TTL: 300 → IP address: public IP of vm-linux-lab01 → OK. Add CNAME: Name: portal → Type: CNAME → Alias: azure.microsoft.com → OK. Add MX: Name: @ → Type: MX → Preference: 10 → Mail exchange: mail.az104lab.com → OK." },
          { task: "Create a Private DNS Zone", detail: "Search 'Private DNS Zones' → + Create → Resource group: rg-az104-lab → Name: internal.contoso.local → Review + Create. Private zones are only resolvable from within linked VNets — not from the internet." },
          { task: "Link the private zone to your VNet with auto-registration", detail: "Click into internal.contoso.local → Virtual network links (left menu) → + Add → Link name: link-vnet-az104 → Virtual network: vnet-az104-lab → check Enable auto registration → OK. With auto-registration enabled, any VM deployed in vnet-az104-lab automatically gets a DNS record created in this private zone." },
          { task: "Test name resolution from within a VM", detail: "Start vm-linux-lab01 → SSH in → run: nslookup vm-linux-lab01.internal.contoso.local → should resolve to the VM's private IP (10.0.1.10) → run: nslookup az104lab.com (should fail — public zone needs real delegation). Exit and deallocate VM when done." },
        ],
        gotchas: [
          "Public DNS zones require domain ownership for real resolution — test names work for lab purposes but nothing will resolve publicly",
          "Private DNS zones resolve ONLY from linked VNets — completely invisible from the internet",
          "Auto-registration only applies to VMs in linked VNets — manually added resources need manual records",
          "One private zone can link to multiple VNets — useful for shared internal DNS across environments",
          "VM must be running to test DNS resolution",
        ],
        examConcepts: [
          "Public DNS: internet-facing, requires domain ownership for actual resolution",
          "Private DNS: VNet-internal only, not resolvable from internet",
          "Auto-registration: VMs in linked VNets automatically get A records on deployment",
          "Common record types: A (IPv4), AAAA (IPv6), CNAME (alias), MX (mail), TXT (verification)",
        ],
        costs: [
          { item: "Public DNS Zone", amount: "$0.50/zone/month + $0.40/million queries", note: "Minimal for lab use" },
          { item: "Private DNS Zone", amount: "$0.10/zone/month + $0.40/million queries", note: "Very cheap" },
        ],
        portal: "Search 'DNS Zones' for public, 'Private DNS Zones' for private",
        tips: "Auto-registration is a key exam concept. When enabled on a VNet link, Azure automatically creates and removes DNS A records as VMs are deployed and deleted — no manual DNS management needed for internal resolution.",
      },
      {
        id: "4.4",
        title: "VNet Peering & Service Endpoints",
        duration: "45 min",
        cost: "~$0.01",
        difficulty: "Intermediate",
        freeTrial: false,
        description: "VNet peering connects VNets so resources can communicate via private IPs. The critical limitation: peering is NOT transitive. If A peers with B, and B peers with C, A cannot talk to C through B. Each connection must be explicitly configured. This is the most tested networking concept on the AZ-104 exam.",
        objectives: [
          { task: "Create a second VNet in a different region", detail: "⚠️ Lab 1.4 dependency: Temporarily disable the Allowed Locations policy before this step — you need to create a VNet in West US. Search 'Virtual Networks' → + Create → Resource group: rg-az104-lab → Name: vnet-az104-b → Region: West US → Address space: 10.1.0.0/16 (MUST be different from 10.0.0.0/16 — overlapping ranges prevent peering) → Add subnet: snet-b-vms, 10.1.1.0/24 → Review + Create." },
          { task: "Configure bidirectional VNet peering", detail: "vnet-az104-lab → Peerings (left menu under Settings) → + Add → Peering link name (this VNet to remote): peer-lab-to-b → Remote virtual network: vnet-az104-b → Peering link name (remote to this VNet): peer-b-to-lab → check Allow traffic to remote virtual network on both sides → Add. Peering must be configured in BOTH directions." },
          { task: "Verify connectivity between VNets", detail: "Deploy a small VM in vnet-az104-b (name: vm-linux-b01). SSH into vm-linux-lab01 → try: ping 10.1.1.x (private IP of vm-linux-b01). If NSG rules allow ICMP, you should get a response. If ping fails, check that NSGs on both subnets allow traffic from the other VNet's address space." },
          { task: "Demonstrate non-transitive peering (conceptual)", detail: "Understand this scenario for the exam: VNet A (10.0.0.0/16) peers with VNet B (10.1.0.0/16). VNet B peers with VNet C (10.2.0.0/16). A VM in VNet A CANNOT reach VNet C through VNet B. Peering is NOT transitive. To connect A to C you must create a DIRECT A↔C peering. This is tested on almost every exam." },
          { task: "Verify service endpoint from Lab 4.1", detail: "vnet-az104-lab → Subnets → snet-vms → confirm Microsoft.Storage is listed under Service endpoints. Storage account stjolson104lab01 → Networking → Selected networks → confirm snet-vms is listed as an allowed subnet. Storage traffic from snet-vms VMs routes over the Azure backbone." },
        ],
        gotchas: [
          "⚠️ Lab 1.4 dependency: Allowed Locations policy WILL block VNet creation in West US — temporarily disable it before this lab",
          "VNet address spaces CANNOT overlap — peering fails immediately if ranges overlap",
          "Peering is NOT transitive — A↔B and B↔C does NOT give A↔C. The most tested networking concept",
          "Both directions required — one-directional peering leaves the connection incomplete",
          "After peering, NSG rules still apply — peering enables routing but NSGs control filtering",
        ],
        examConcepts: [
          "VNet peering: private IP communication over Azure backbone, low latency",
          "Non-transitive: A↔B and B↔C does NOT equal A↔C — must create explicit A↔C peering",
          "Both directions required: peering must be configured from both VNets",
          "Global VNet peering = cross-region (higher cost). Regional peering = same region",
        ],
        costs: [
          { item: "VNet peering (same region)", amount: "~$0.01/GB transferred", note: "Minimal for lab testing" },
          { item: "VNet peering (cross-region)", amount: "~$0.035/GB transferred", note: "More expensive but still minimal for lab" },
          { item: "VM in second VNet (vm-linux-b01)", amount: "~$0.01/hour", note: "Deallocate immediately after testing connectivity" },
        ],
        portal: "VNet → Peerings (left menu under Settings) → + Add",
        tips: "⚠️ BEFORE STARTING: Go to Policy → Assignments and temporarily delete or disable the Allowed Locations policy from Lab 1.4. You need to create a VNet in West US. Re-enable after Lab 4.4 if desired.",
      },
      {
        id: "4.5",
        title: "Load Balancer & Application Gateway",
        duration: "60 min",
        cost: "~$0.30",
        difficulty: "Advanced",
        freeTrial: false,
        description: "Load Balancer (Layer 4) distributes TCP/UDP traffic across VMs based on IP and port — no HTTP awareness. Application Gateway (Layer 7) routes HTTP/HTTPS based on URL paths, handles SSL termination, and provides WAF protection. Knowing which to use in which scenario is critical for the exam.",
        objectives: [
          { task: "Create an Azure Load Balancer", detail: "Search 'Load Balancers' → + Create → Resource group: rg-az104-vms → Name: lb-az104-lab → Region: East US → SKU: Standard → Type: Public → Tier: Regional → + Add a public IP: Name: pip-lb-lab → SKU: Standard → Review + Create." },
          { task: "Configure backend pool with VMs", detail: "lb-az104-lab → Backend pools → + Add → Name: bp-vms → Virtual network: vnet-az104-lab → + Add → select vm-linux-lab01 → Save. First install nginx on the VM via SSH: sudo apt-get install -y nginx → sudo systemctl start nginx. The VM must respond on port 80 for health probes to pass." },
          { task: "Configure health probe", detail: "Load Balancer → Health probes → + Add → Name: hp-http → Protocol: HTTP → Port: 80 → Path: / → Interval: 15 seconds → Unhealthy threshold: 2 → Add. The load balancer probes each VM every 15 seconds — 2 consecutive failures removes the VM from rotation." },
          { task: "Configure load balancing rule", detail: "Load Balancer → Load balancing rules → + Add → Name: lbr-http → Frontend IP: LoadBalancerFrontEnd → Protocol: TCP → Port: 80 → Backend port: 80 → Backend pool: bp-vms → Health probe: hp-http → Session persistence: None → Save. Browse to the load balancer's public IP — you should see the nginx page." },
          { task: "Create an Application Gateway", detail: "⚠️ See Costs tab first. Search 'Application Gateways' → + Create → Resource group: rg-az104-vms → Name: agw-az104-lab → Region: East US → Tier: Standard V2 → Minimum instance count: 1 → Virtual network: vnet-az104-lab → Subnet: snet-appgw (dedicated subnet — do not share with VMs) → Frontend: Public → + Add new public IP: pip-agw-lab → configure backend pool and routing rules → Review + Create." },
        ],
        gotchas: [
          "Standard Load Balancer requires Standard SKU public IPs — Basic SKU IPs are incompatible with Standard LB",
          "Application Gateway requires its OWN dedicated subnet — cannot share with VMs or other resources",
          "All backend VMs must have a web server running — health probe failures remove them from rotation",
          "If ALL backend VMs fail probes, the load balancer drops all traffic — no fallback",
          "Load Balancer is Layer 4 (TCP/UDP). Application Gateway is Layer 7 (HTTP/HTTPS with content awareness)",
        ],
        examConcepts: [
          "Load Balancer Layer 4: TCP/UDP distribution, no HTTP awareness, no SSL termination",
          "Application Gateway Layer 7: URL path routing, SSL termination, WAF, cookie-based session affinity",
          "Health probes: failed VMs automatically removed from rotation until they recover",
          "WAF: Web Application Firewall feature of Application Gateway — protects against OWASP top 10",
        ],
        costs: [
          { item: "Standard Load Balancer", amount: "~$18/month + $0.005/GB", note: "⚠️ Delete after lab — bills even with empty backend pool" },
          { item: "Application Gateway (Standard V2)", amount: "~$0.246/hour (~$180/month)", note: "⚠️ VERY EXPENSIVE — delete immediately after testing. Minimum 1 instance runs continuously" },
          { item: "Public IPs (x2)", amount: "~$3.65/month each", note: "Delete public IPs when deleting LB and App Gateway" },
        ],
        portal: "Search 'Load Balancers' for LB, 'Application Gateways' for App Gateway",
        tips: "Layer 4 vs Layer 7 rule: if the exam question mentions URLs, paths, SSL, WAF, or HTTP headers → Application Gateway. If it just says distribute TCP traffic → Load Balancer. App Gateway can also do LB's job, but costs much more.",
      },
      {
        id: "4.6",
        title: "VPN Gateway & ExpressRoute Concepts",
        duration: "60 min",
        cost: "~$1.00 — delete immediately!",
        difficulty: "Advanced",
        freeTrial: false,
        description: "VPN Gateway creates an encrypted tunnel over the public internet for hybrid connectivity. ExpressRoute provides a dedicated private circuit through a telecom provider — no public internet, higher bandwidth, required for strict compliance. This lab deploys a VPN Gateway and configures Point-to-Site VPN. VPN Gateway takes 30-45 minutes to deploy — start it first.",
        objectives: [
          { task: "Create a VPN Gateway (start this FIRST)", detail: "⚠️ Start immediately — takes 30-45 minutes to deploy. Search 'Virtual Network Gateways' → + Create → Resource group: rg-az104-lab → Name: vpngw-az104-lab → Region: East US → Gateway type: VPN → VPN type: Route-based → SKU: Basic (cheapest at ~$27/month — delete same session!) → Generation: Generation1 → Virtual network: vnet-az104-lab → Subnet: Azure creates GatewaySubnet automatically — must be named exactly 'GatewaySubnet' → Public IP: create new, Name: pip-vpngw-lab → Review + Create. READ DOCUMENTATION WHILE WAITING." },
          { task: "Configure Point-to-Site VPN", detail: "After gateway deploys → vpngw-az104-lab → Point-to-site configuration → Configure now → Address pool: 172.16.0.0/24 (VPN clients get IPs from this range) → Tunnel type: OpenVPN (SSL) → Authentication type: Azure certificate → generate a root certificate in PowerShell: $cert = New-SelfSignedCertificate -Type Custom -KeySpec Signature -Subject 'CN=P2SRootCert' -KeyExportPolicy Exportable -HashAlgorithm sha256 -KeyLength 2048 -CertStoreLocation 'Cert:\\CurrentUser\\My' -KeyUsageProperty Sign -KeyUsage CertSign → export and upload the public key → Save → Download VPN client and install → connect → your machine gets a 172.16.0.x IP and can reach Azure VMs." },
          { task: "Understand Site-to-Site VPN", detail: "Site-to-Site connects your ENTIRE on-premises network to Azure (not just one device). Requires: (1) VPN Gateway in Azure, (2) Local Network Gateway representing your on-premises router, (3) Connection resource linking them. Your on-premises VPN device must support IKEv2 or IKEv1. Traffic encrypted with IPsec/IKE. Bandwidth: Basic = 100 Mbps, VpnGw5 = 10 Gbps." },
          { task: "Understand ExpressRoute vs VPN Gateway", detail: "ExpressRoute: dedicated private circuit through a connectivity provider (AT&T, Equinix, etc.) → traffic NEVER touches public internet → up to 100 Gbps → NO encryption by default (you add it yourself) → used for compliance/high bandwidth. VPN Gateway: encrypted IPsec tunnel over public internet → up to 10 Gbps → suitable for most businesses. Key exam trap: ExpressRoute does NOT encrypt by default." },
          { task: "DELETE the VPN Gateway immediately", detail: "CRITICAL: vpngw-az104-lab → Delete → confirm. Also delete public IP pip-vpngw-lab separately (it is a standalone resource). VPN Gateways cost ~$27/month (Basic SKU) even with no active connections. Delete the same session you created it." },
        ],
        gotchas: [
          "VPN Gateway takes 30-45 minutes to deploy — start it FIRST then read documentation while waiting",
          "GatewaySubnet must be named EXACTLY 'GatewaySubnet' — Azure creates it automatically, name is fixed",
          "VPN Gateways cost ~$27/month for Basic SKU even with no active connections — DELETE after lab",
          "ExpressRoute does NOT encrypt traffic by default — classic exam trap vs VPN Gateway which always encrypts",
          "Basic SKU does NOT support availability zones, active-active, or BGP routing",
          "P2S VPN is also the solution to the ISP port 445 blocking problem from Lab 2.3",
        ],
        examConcepts: [
          "VPN Gateway: encrypted IPsec tunnel over public internet, up to 10 Gbps",
          "ExpressRoute: private dedicated circuit, up to 100 Gbps, NO default encryption",
          "P2S (Point-to-Site): single device to Azure VNet. S2S (Site-to-Site): entire network to Azure VNet",
          "ExpressRoute does NOT encrypt by default — must add MACSec or IPsec over ExpressRoute for encryption",
          "Virtual WAN: managed hub-and-spoke for large-scale multi-VNet hybrid connectivity",
        ],
        costs: [
          { item: "VPN Gateway (Basic SKU)", amount: "~$0.038/hour (~$27/month)", note: "⚠️ DELETE SAME SESSION — bills from deployment completion even with no active connections" },
          { item: "P2S VPN connections", amount: "~$0.01/hour per connection", note: "Only bills when a client is actively connected" },
          { item: "Public IP for gateway", amount: "~$3.65/month", note: "Delete this public IP separately when deleting the gateway" },
        ],
        portal: "Search 'Virtual Network Gateways' → + Create",
        tips: "P2S VPN solves the port 445 problem from Lab 2.3. Once your P2S VPN is configured and you connect from your machine, you can mount Azure File Shares through the VPN tunnel — ISP port blocking is bypassed completely.",
      },
    ],
  },
  {
    domain: "Monitor & Maintain Azure Resources",
    weight: "10–15%",
    color: "#FF6B6B",
    icon: "📊",
    labs: [
      {
        id: "5.1",
        title: "Azure Monitor & Alerts",
        duration: "30 min",
        cost: "Free",
        difficulty: "Beginner",
        freeTrial: false,
        description: "Azure Monitor is the umbrella service collecting metrics, logs, and diagnostics from every Azure resource. Metrics are numerical time-series data. Alerts notify you before users report problems. Action groups define what happens when alerts fire. Log Analytics is the central log repository enabling complex queries across all resources.",
        objectives: [
          { task: "Create an alert rule for VM CPU", detail: "Search 'Monitor' → Alerts → + Create → Alert rule → Scope: click + Select scope → select vm-linux-lab01 → Apply → Condition tab: + Add condition → signal: Percentage CPU → Alert logic: Operator: Greater than → Threshold: 80 → Aggregation granularity: 5 minutes → Frequency of evaluation: 1 minute → Done → Actions tab: + Create action group → Resource group: rg-az104-lab → Action group name: ag-lab-alerts → Display name: LabAlerts → Actions: Action name: EmailMe → Action type: Email/SMS/Push/Voice → enter your email → OK → Review + Create." },
          { task: "View VM metrics in Azure Monitor", detail: "Monitor → Metrics (left menu) → + Select a scope → select vm-linux-lab01 → Apply → Metric: Percentage CPU → Aggregation: Average → time range: Last 24 hours. Click + Add metric → Network In Total → both metrics overlaid on one chart. Click Pin to dashboard to save." },
          { task: "Create a custom dashboard", detail: "Search 'Dashboard' → + New dashboard → Blank dashboard → Edit → + Add tile → Metrics chart → configure for vm-linux-lab01 CPU → Add. Add Markdown tile: type ## AZ-104 Lab Monitor → Add. Save. Dashboards are personal by default but can be shared." },
          { task: "Create a Log Analytics Workspace", detail: "Search 'Log Analytics Workspaces' → + Create → Resource group: rg-az104-lab → Name: law-az104-lab → Region: East US → Review + Create. This workspace is the central log hub. Multiple resources from multiple regions can all send logs to one workspace." },
          { task: "Connect a VM to Log Analytics", detail: "law-az104-lab → Agents (left menu under Settings) → Azure Virtual Machines tab → click vm-linux-lab01 → Connect. Azure installs the agent and begins sending logs. Wait 10-15 minutes for data to appear. Then go to Logs and run: Heartbeat | take 10 to see first entries." },
        ],
        gotchas: [
          "Log Analytics data takes 10-15 minutes to appear after connecting a VM — do not panic if queries return empty",
          "Alert rules fire based on evaluation frequency AND aggregation window — read both settings carefully",
          "Action groups are reusable — create one good group and attach it to multiple alert rules",
          "Metrics stored for 93 days. Log Analytics retention is separately configurable (default 30 days free)",
        ],
        examConcepts: [
          "Azure Monitor umbrella: Metrics + Log Analytics + Alerts + Action Groups + Dashboards + Insights",
          "Metrics: numerical time-series, near real-time, 93-day retention. Logs: detailed events, query-based",
          "Alert rule = Scope (what) + Condition (when) + Action Group (response)",
          "Action groups: reusable — email, SMS, webhook, Azure Function, Logic App, ITSM",
        ],
        costs: [
          { item: "Azure Monitor metrics and alerting", amount: "Free for first 1,000 metrics", note: "Basic alerting is free for lab use" },
          { item: "Log Analytics Workspace", amount: "Free for first 5GB/month", note: "Lab use will be well under 5GB" },
          { item: "Log retention beyond 31 days", amount: "~$0.10/GB/month", note: "Default 30 days is free — do not extend for labs" },
        ],
        portal: "Search 'Monitor' → Alerts → + Create → Alert rule",
        tips: "Connect all your lab VMs to ONE Log Analytics workspace. This creates a central query hub where one KQL query can show data from all resources — exactly how real Azure environments are managed.",
      },
      {
        id: "5.2",
        title: "Log Analytics & KQL Queries",
        duration: "45 min",
        cost: "Free (first 5GB/month)",
        difficulty: "Intermediate",
        freeTrial: false,
        description: "Log Analytics stores all Azure resource logs and KQL (Kusto Query Language) extracts meaning from them. The exam includes KQL drag-and-drop questions requiring you to arrange operators correctly. This lab covers the four most important KQL operators and the common log tables you will encounter on the exam.",
        objectives: [
          { task: "Write a Heartbeat query", detail: "law-az104-lab → Logs (left menu) → dismiss query explorer if it opens → in the query box type: Heartbeat | where TimeGenerated > ago(1h) | summarize count() by Computer → Run. Shows how many heartbeat pings each connected VM sent in the last hour. If VM is connected you should see vm-linux-lab01 with ~60 pings (one per minute)." },
          { task: "Query CPU performance data", detail: "In Logs query box: Perf | where ObjectName == 'Processor' | where CounterName == '% Processor Time' | summarize avg(CounterValue) by Computer, bin(TimeGenerated, 5m) | order by TimeGenerated desc → Run. Shows average CPU per VM in 5-minute buckets, newest first." },
          { task: "Write a filtered event query", detail: "Event | where EventLevelName == 'Error' | where TimeGenerated > ago(24h) | project TimeGenerated, Computer, EventID, RenderedDescription | order by TimeGenerated desc → Run. The project operator selects only specific columns — like SELECT in SQL. Shows Windows error events from last 24 hours." },
          { task: "Create a saved search", detail: "Write any useful query → Save → Save as query → Name: VM Heartbeat Check → Category: Lab Queries → Save. Saved queries appear in the query explorer under My Queries — useful for frequently run operational queries." },
          { task: "Build a workbook", detail: "Monitor → Workbooks (left menu) → + New → + Add → Add query → paste your CPU query → Run Query → Visualization: Time chart → Add. + Add → Add text → ## VM Performance Dashboard → Add. Save → Title: Lab Performance Workbook → Resource group: rg-az104-lab → Save. Workbooks combine queries, charts, and text into interactive reports." },
        ],
        gotchas: [
          "KQL is case-sensitive for table names — 'Heartbeat' not 'heartbeat', 'Perf' not 'perf'",
          "Data takes 10-15 minutes to appear after connecting a VM — queries return empty if run too soon",
          "ago() function: ago(1h) = last 1 hour, ago(1d) = last 24 hours, ago(7d) = last 7 days",
          "The pipe | operator chains commands — each step transforms data from the previous step",
          "Free 5GB/month is per workspace — multiple workspaces each get their own 5GB allocation",
        ],
        examConcepts: [
          "KQL operators: | where (filter rows), | summarize (aggregate/group), | project (select columns), | order by (sort)",
          "Tables: Heartbeat (VM connectivity), Perf (performance counters), Event (Windows events), Syslog (Linux logs)",
          "bin() function: rounds TimeGenerated to time buckets for time-series charts",
          "ago() function: relative time filter — ago(1h), ago(1d), ago(7d)",
        ],
        costs: [
          { item: "Log Analytics queries", amount: "Free", note: "Running queries has no cost" },
          { item: "Workbooks", amount: "Free", note: "Azure Monitor Workbooks are free" },
        ],
        portal: "Search 'Log Analytics Workspaces' → click law-az104-lab → Logs",
        tips: "Memorize these four KQL operators for the exam: | where (filter), | summarize (aggregate), | project (select columns), | order by (sort). Drag-and-drop KQL questions just test whether you can arrange these in the correct order to produce the described output.",
      },
      {
        id: "5.3",
        title: "Network Watcher & Diagnostics",
        duration: "30 min",
        cost: "Free",
        difficulty: "Intermediate",
        freeTrial: false,
        description: "Network Watcher is Azure's network diagnostic toolkit. IP Flow Verify checks if NSG rules are blocking traffic. Next Hop traces the routing path. Packet Capture records raw network traffic. Connection Troubleshoot tests end-to-end connectivity. These tools replace hours of guessing with minutes of diagnosis.",
        objectives: [
          { task: "Enable Network Watcher", detail: "Search 'Network Watcher' → Overview → if East US not listed: + Add → select your subscription and East US region → Add. Network Watcher is regional — enable in every region where you have networking resources. It may already be auto-enabled." },
          { task: "Run IP Flow Verify", detail: "Network Watcher → IP flow verify (left menu under Network diagnostic tools) → Virtual machine: vm-linux-lab01 → Network interface: auto-populated → Protocol: TCP → Direction: Inbound → Local port: 22 → Remote IP: your public IP → Remote port: 12345 → Check. Result shows Allowed or Denied AND which NSG rule made the decision." },
          { task: "Run Next Hop", detail: "Network Watcher → Next hop (left menu) → Virtual machine: vm-linux-lab01 → Network interface: auto-populated → Source IP: 10.0.1.10 → Destination IP: 8.8.8.8 → Next hop. Result shows: Internet (routes to internet), VirtualNetworkGateway (routes to VPN), VirtualAppliance, or None (traffic dropped — no route). Use for routing problems." },
          { task: "Capture network packets", detail: "Network Watcher → Packet capture → + Add → Target: vm-linux-lab01 → Storage account: stjolson104lab01 → Time limit: 60 seconds → Filters: Protocol TCP → Start. While capturing, SSH into the VM and run: curl https://azure.microsoft.com to generate traffic. After 60 seconds, download the .cap file from storage and open in Wireshark." },
          { task: "Use Connection Troubleshoot", detail: "Network Watcher → Connection troubleshoot → Source VM: vm-linux-lab01 → Destination: enter IP 8.8.8.8 (or another VM's private IP) → Protocol: TCP → Port: 80 → Check. Shows Reachable or Unreachable, each hop's latency, and any blocking rules. Most comprehensive connectivity test available." },
        ],
        gotchas: [
          "Network Watcher must be enabled PER REGION — enable separately in each region you use",
          "IP Flow Verify checks NSG rules ONLY — will not detect routing issues. Use Next Hop for routing problems",
          "Next Hop shows routing decisions ONLY — does not check NSG rules. Use IP Flow Verify for NSG issues",
          "Packet capture requires the Network Watcher VM extension — Azure installs it automatically on first capture",
          "Connection Troubleshoot and IP Flow Verify are complementary tools — use both for complete diagnosis",
        ],
        examConcepts: [
          "IP Flow Verify: is this NSG blocking this specific traffic? Shows which rule allows or denies",
          "Next Hop: where does traffic route next? Diagnoses routing problems and black holes",
          "Packet capture: raw traffic recording — use when you need to see actual packet content",
          "Connection Troubleshoot: end-to-end connectivity test across multiple hops — most comprehensive",
          "NSG Flow Logs: historical record of allowed and denied flows for security auditing",
        ],
        costs: [
          { item: "Network Watcher", amount: "Free for first region", note: "First instance per subscription per region is free" },
          { item: "IP Flow Verify / Next Hop / Connection Troubleshoot", amount: "Free", note: "All diagnostic tools are free" },
          { item: "Packet capture", amount: "~$0.10/GB captured", note: "Minimal for short lab captures" },
        ],
        portal: "Search 'Network Watcher' → select tool from left menu under Network diagnostic tools",
        tips: "Use IP Flow Verify FIRST when troubleshooting connectivity — it immediately tells you if NSG is the problem and which rule. If IP Flow Verify says Allowed but traffic still fails, use Next Hop to check routing, then Connection Troubleshoot for end-to-end testing.",
      },
    ],
  },
];

const allLabsFlat = labs.flatMap((d) => d.labs.map((l) => ({ ...l, domain: d.domain })));
const DIFF_COLOR = { Beginner: "#06D6A0", Intermediate: "#FFB703", Advanced: "#FF6B6B" };

export default function AZ104Lab() {
  const [completed, setCompleted] = useState(() => {
    try { return JSON.parse(localStorage.getItem("az104-completed") || "{}"); } catch { return {}; }
  });
  const [notes, setNotes] = useState(() => {
    try { return JSON.parse(localStorage.getItem("az104-notes") || "{}"); } catch { return {}; }
  });
  const [activeDomain, setActiveDomain] = useState(0);
  const [activeLab, setActiveLab] = useState(null);
  const [view, setView] = useState("overview");
  const [activeTab, setActiveTab] = useState("objectives");

  useEffect(() => { localStorage.setItem("az104-completed", JSON.stringify(completed)); }, [completed]);
  useEffect(() => { localStorage.setItem("az104-notes", JSON.stringify(notes)); }, [notes]);

  const totalLabs = allLabsFlat.length;
  const completedCount = Object.values(completed).filter(Boolean).length;
  const progress = Math.round((completedCount / totalLabs) * 100);
  const toggleComplete = (id) => setCompleted((p) => ({ ...p, [id]: !p[id] }));
  const openLab = (lab) => { setActiveLab(lab); setView("lab"); setActiveTab("objectives"); };
  const closeLab = () => { setActiveLab(null); setView("overview"); };
  const domainProgress = (domain) => {
    const ids = domain.labs.map((l) => l.id);
    const done = ids.filter((id) => completed[id]).length;
    return Math.round((done / ids.length) * 100);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0a0e1a", color: "#e8eaf0", fontFamily: "'IBM Plex Mono', 'Courier New', monospace" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;600&family=Space+Grotesk:wght@400;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #0a0e1a; } ::-webkit-scrollbar-thumb { background: #2a3050; border-radius: 4px; }
        .domain-btn:hover { opacity: 0.85; transform: translateX(2px); }
        .lab-card:hover { background: #1a2040 !important; border-color: #3a4060 !important; }
        .lab-card { cursor: pointer; transition: all 0.15s ease; }
        .tab-btn { background: transparent; border: none; border-bottom: 2px solid transparent; cursor: pointer; padding: 8px 12px; font-family: inherit; font-size: 11px; color: #6b7a99; transition: all 0.15s; }
        .tab-btn.active { border-bottom-color: #00B4D8; color: #00B4D8; }
        .tab-btn:hover { color: #e8eaf0; }
        .notes-area { width: 100%; background: #0a1020; border: 1px solid #1e2d4a; border-radius: 6px; color: #c8d0e0; font-family: inherit; font-size: 12px; padding: 10px; resize: vertical; line-height: 1.6; outline: none; }
        .notes-area:focus { border-color: #00B4D8; }
      `}</style>

      <div style={{ background: "linear-gradient(135deg, #0d1428 0%, #111827 50%, #0a1628 100%)", borderBottom: "1px solid #1e2d4a", padding: "24px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
            <span style={{ fontSize: 28 }}>☁️</span>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 700, color: "#fff", letterSpacing: "-0.5px" }}>AZ-104 Lab Builder</span>
            <span style={{ background: "#00B4D8", color: "#000", fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 3, letterSpacing: 1 }}>v3</span>
          </div>
          <div style={{ color: "#6b7a99", fontSize: 12 }}>Microsoft Azure Administrator · Complete Beginner Guide</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ color: "#6b7a99", fontSize: 11, marginBottom: 6 }}>{completedCount} / {totalLabs} labs complete</div>
          <div style={{ width: 200, height: 6, background: "#1a2040", borderRadius: 3, overflow: "hidden" }}>
            <div style={{ width: `${progress}%`, height: "100%", background: "linear-gradient(90deg, #00B4D8, #06D6A0)", borderRadius: 3, transition: "width 0.4s ease" }} />
          </div>
          <div style={{ color: "#00B4D8", fontSize: 12, marginTop: 4, fontWeight: 600 }}>{progress}% complete</div>
        </div>
      </div>

      <div style={{ display: "flex", minHeight: "calc(100vh - 90px)" }}>
        <div style={{ width: 240, background: "#0d1120", borderRight: "1px solid #1a2040", padding: "20px 0", flexShrink: 0 }}>
          <div style={{ padding: "0 16px 12px", color: "#4a5580", fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>Exam Domains</div>
          {labs.map((domain, i) => {
            const dp = domainProgress(domain);
            return (
              <button key={i} className="domain-btn" onClick={() => { setActiveDomain(i); closeLab(); }}
                style={{ width: "100%", background: activeDomain === i ? "#141c35" : "transparent", border: "none", borderLeft: activeDomain === i ? `3px solid ${domain.color}` : "3px solid transparent", padding: "12px 16px", cursor: "pointer", textAlign: "left", transition: "all 0.15s" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: 14 }}>{domain.icon}</span>
                  <span style={{ color: activeDomain === i ? "#e8eaf0" : "#8899bb", fontSize: 11, fontWeight: 600, lineHeight: 1.3 }}>{domain.domain}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, paddingLeft: 22 }}>
                  <div style={{ flex: 1, height: 3, background: "#1a2040", borderRadius: 2 }}>
                    <div style={{ width: `${dp}%`, height: "100%", background: domain.color, borderRadius: 2, transition: "width 0.3s" }} />
                  </div>
                  <span style={{ color: "#4a5580", fontSize: 10 }}>{dp}%</span>
                </div>
                <div style={{ paddingLeft: 22, marginTop: 2 }}>
                  <span style={{ color: domain.color, fontSize: 10 }}>{domain.weight}</span>
                </div>
              </button>
            );
          })}
          <div style={{ margin: "20px 16px 0", padding: "12px", background: "#0a1020", borderRadius: 6, border: "1px solid #1a2040" }}>
            <div style={{ color: "#FFB703", fontSize: 10, marginBottom: 8, letterSpacing: 1, textTransform: "uppercase" }}>⚠️ Key Dates</div>
            <div style={{ color: "#6b7a99", fontSize: 11, lineHeight: 1.9 }}>
              📅 May 23 — Cancel Entra P2<br />
              📅 May 23 — Delete all resources<br />
              📅 May 24 — Cancel Azure trial<br />
              💡 Est. total cost: ~$3–5
            </div>
          </div>
        </div>

        <div style={{ flex: 1, padding: 32, overflowY: "auto" }}>
          {view === "overview" && (
            <>
              <div style={{ marginBottom: 24 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
                  <span style={{ fontSize: 24 }}>{labs[activeDomain].icon}</span>
                  <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 700, color: "#fff" }}>{labs[activeDomain].domain}</h2>
                  <span style={{ color: labs[activeDomain].color, fontSize: 13 }}>{labs[activeDomain].weight}</span>
                </div>
                <div style={{ color: "#4a5580", fontSize: 12 }}>{labs[activeDomain].labs.length} labs in this domain</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {labs[activeDomain].labs.map((lab) => {
                  const done = completed[lab.id];
                  return (
                    <div key={lab.id} className="lab-card" onClick={() => openLab(lab)}
                      style={{ background: done ? "#0d1a0d" : "#111827", border: `1px solid ${done ? "#1a3a1a" : lab.freeTrial ? "#3a2a08" : "#1e2d4a"}`, borderRadius: 8, padding: "16px 20px", display: "flex", alignItems: "center", gap: 16 }}>
                      <button onClick={(e) => { e.stopPropagation(); toggleComplete(lab.id); }}
                        style={{ width: 28, height: 28, borderRadius: 6, border: `2px solid ${done ? "#06D6A0" : "#2a3a5a"}`, background: done ? "#06D6A0" : "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 14, color: done ? "#000" : "transparent" }}>
                        {done ? "✓" : ""}
                      </button>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 4 }}>
                          <span style={{ color: "#4a5580", fontSize: 11 }}>Lab {lab.id}</span>
                          <span style={{ fontFamily: "'Space Grotesk', sans-serif", color: done ? "#4a7a4a" : "#e8eaf0", fontWeight: 600, fontSize: 15 }}>{lab.title}</span>
                          <span style={{ fontSize: 10, padding: "1px 6px", borderRadius: 3, background: "#0a1020", color: DIFF_COLOR[lab.difficulty], border: `1px solid ${DIFF_COLOR[lab.difficulty]}33` }}>{lab.difficulty}</span>
                          {lab.freeTrial && <span style={{ fontSize: 10, padding: "1px 6px", borderRadius: 3, background: "#1a1208", color: "#FFB703", border: "1px solid #FFB70333" }}>⚠️ Trial Limits</span>}
                        </div>
                        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                          <span style={{ color: "#4a5580", fontSize: 11 }}>⏱ {lab.duration}</span>
                          <span style={{ color: "#4a5580", fontSize: 11 }}>💰 {lab.cost}</span>
                          <span style={{ color: "#4a5580", fontSize: 11 }}>📍 {lab.objectives.length} steps</span>
                          {notes[lab.id] && <span style={{ color: "#4a5580", fontSize: 11 }}>📝 notes</span>}
                        </div>
                      </div>
                      <span style={{ color: "#2a3a5a", fontSize: 18 }}>›</span>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {view === "lab" && activeLab && (
            <>
              <button onClick={closeLab} style={{ background: "transparent", border: "1px solid #1e2d4a", color: "#6b7a99", padding: "6px 14px", borderRadius: 5, cursor: "pointer", fontSize: 12, marginBottom: 24, fontFamily: "inherit" }}>
                ← Back to {labs[activeDomain].domain}
              </button>
              <div style={{ background: "#111827", border: "1px solid #1e2d4a", borderRadius: 10, padding: 28 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
                      <span style={{ color: "#4a5580", fontSize: 11 }}>Lab {activeLab.id}</span>
                      <span style={{ fontSize: 10, padding: "1px 6px", borderRadius: 3, background: "#0a1020", color: DIFF_COLOR[activeLab.difficulty], border: `1px solid ${DIFF_COLOR[activeLab.difficulty]}33` }}>{activeLab.difficulty}</span>
                      {activeLab.freeTrial && <span style={{ fontSize: 10, padding: "1px 6px", borderRadius: 3, background: "#1a1208", color: "#FFB703", border: "1px solid #FFB70333" }}>⚠️ Free Trial Limits — see Costs tab</span>}
                    </div>
                    <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 700, color: "#fff" }}>{activeLab.title}</h2>
                  </div>
                  <button onClick={() => toggleComplete(activeLab.id)}
                    style={{ background: completed[activeLab.id] ? "#06D6A0" : "transparent", border: `2px solid ${completed[activeLab.id] ? "#06D6A0" : "#2a3a5a"}`, color: completed[activeLab.id] ? "#000" : "#6b7a99", padding: "8px 16px", borderRadius: 6, cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: "inherit", flexShrink: 0, marginLeft: 12 }}>
                    {completed[activeLab.id] ? "✓ Complete" : "Mark Complete"}
                  </button>
                </div>

                <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
                  {[`⏱ ${activeLab.duration}`, `💰 ${activeLab.cost}`].map(t => (
                    <span key={t} style={{ background: "#0a1020", border: "1px solid #1e2d4a", borderRadius: 4, padding: "4px 10px", fontSize: 11, color: "#8899bb" }}>{t}</span>
                  ))}
                </div>

                <div style={{ background: "#0a1020", border: "1px solid #1e2d4a", borderRadius: 6, padding: "14px 16px", marginBottom: 20 }}>
                  <div style={{ color: "#e8eaf0", fontSize: 13, lineHeight: 1.8 }}>{activeLab.description}</div>
                </div>

                <div style={{ borderBottom: "1px solid #1e2d4a", marginBottom: 20, display: "flex", gap: 2, flexWrap: "wrap" }}>
                  {["objectives", "gotchas", "exam", "costs", "notes"].map(tab => (
                    <button key={tab} className={`tab-btn${activeTab === tab ? " active" : ""}`} onClick={() => setActiveTab(tab)}>
                      {tab === "objectives" ? "📋 Steps" : tab === "gotchas" ? "⚠️ Gotchas" : tab === "exam" ? "🎯 Exam" : tab === "costs" ? "💰 Costs" : "📝 Notes"}
                    </button>
                  ))}
                </div>

                {activeTab === "objectives" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                    {activeLab.objectives.map((obj, i) => (
                      <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                        <div style={{ width: 26, height: 26, borderRadius: "50%", background: "#0a1828", border: "1px solid #1a3050", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#00B4D8", fontSize: 11, fontWeight: 600, marginTop: 1 }}>{i + 1}</div>
                        <div>
                          <div style={{ color: "#e8eaf0", fontSize: 13, fontWeight: 600, marginBottom: 5 }}>{obj.task}</div>
                          <div style={{ color: "#8899bb", fontSize: 12, lineHeight: 1.8 }}>{obj.detail}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "gotchas" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {activeLab.gotchas.map((g, i) => (
                      <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", background: "#1a1208", border: "1px solid #3a2a08", borderRadius: 6, padding: "10px 14px" }}>
                        <span style={{ color: "#FFB703", fontSize: 14, flexShrink: 0 }}>⚠</span>
                        <span style={{ color: "#c8b080", fontSize: 13, lineHeight: 1.7 }}>{g}</span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "exam" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {activeLab.examConcepts.map((c, i) => (
                      <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", background: "#0a1828", border: "1px solid #1a3050", borderRadius: 6, padding: "10px 14px" }}>
                        <span style={{ color: "#00B4D8", fontSize: 14, flexShrink: 0 }}>🎯</span>
                        <span style={{ color: "#8899bb", fontSize: 13, lineHeight: 1.7 }}>{c}</span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "costs" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {activeLab.freeTrial && (
                      <div style={{ background: "#1a1208", border: "2px solid #FFB703", borderRadius: 6, padding: "12px 16px", marginBottom: 4 }}>
                        <div style={{ color: "#FFB703", fontSize: 11, fontWeight: 600, marginBottom: 6, letterSpacing: 1, textTransform: "uppercase" }}>⚠️ Free Trial Restrictions Apply to This Lab</div>
                        <div style={{ color: "#c8b080", fontSize: 12, lineHeight: 1.7 }}>This lab has known limitations on Azure free trial subscriptions. Some VM sizes (B1s) may show 'Request quota'. Some third-party marketplace images are blocked. If a step cannot be completed due to free trial restrictions, read through it to understand the concept — the exam tests knowledge not necessarily hands-on completion of every step.</div>
                      </div>
                    )}
                    {activeLab.costs.map((c, i) => (
                      <div key={i} style={{ background: "#0a1020", border: "1px solid #1e2d4a", borderRadius: 6, padding: "12px 14px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                          <span style={{ color: "#e8eaf0", fontSize: 13, fontWeight: 600 }}>{c.item}</span>
                          <span style={{ color: c.amount === "Free" ? "#06D6A0" : c.amount.startsWith("~$0") ? "#FFB703" : "#FF6B6B", fontSize: 12, fontWeight: 600, marginLeft: 12, flexShrink: 0 }}>{c.amount}</span>
                        </div>
                        <div style={{ color: "#6b7a99", fontSize: 12, lineHeight: 1.6 }}>{c.note}</div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "notes" && (
                  <div>
                    <div style={{ color: "#4a5580", fontSize: 11, marginBottom: 10 }}>Your personal notes — discoveries, gotchas found, things to remember for the exam.</div>
                    <textarea className="notes-area" rows={8} placeholder="Type your notes here..."
                      value={notes[activeLab.id] || ""}
                      onChange={(e) => setNotes(p => ({ ...p, [activeLab.id]: e.target.value }))} />
                  </div>
                )}

                <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ background: "#0a1828", border: "1px solid #1a3050", borderRadius: 6, padding: "12px 16px" }}>
                    <div style={{ color: "#00B4D8", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>💡 Pro Tip</div>
                    <div style={{ color: "#8899bb", fontSize: 13, lineHeight: 1.6 }}>{activeLab.tips}</div>
                  </div>
                  <div style={{ background: "#0f1a0a", border: "1px solid #1a3a10", borderRadius: 6, padding: "12px 16px" }}>
                    <div style={{ color: "#06D6A0", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>🗺️ Where to Start</div>
                    <div style={{ color: "#8899bb", fontSize: 13, fontFamily: "'IBM Plex Mono', monospace", lineHeight: 1.6 }}>{activeLab.portal}</div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}