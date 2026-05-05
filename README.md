# ☁️ AZ-104 Lab Tracker

A self-built React study tool for the **Microsoft Azure Administrator (AZ-104)** certification exam. Built to guide hands-on lab work in the Azure Portal with step-by-step instructions, exam concept reinforcement, cost tracking, and personal notes — all in one place.

Live demo: *coming soon*

---

## Features

- **22 guided labs across 5 domains** — full AZ-104 exam coverage from beginner to advanced
- **Detailed step-by-step instructions** — exact portal paths, resource names, and what to expect at each step
- **Lab descriptions** — explains the purpose and real-world relevance of every lab before you start
- **Gotchas tab** — common mistakes, Azure quirks, and free trial restrictions called out per lab
- **Exam concepts tab** — key takeaways and exam-ready knowledge mapped to each lab
- **Costs tab** — itemized cost breakdown per lab with warnings on expensive resources
- **Free trial warnings** — labs with known Azure free trial restrictions are flagged upfront
- **Policy dependency flags** — labs that may be affected by earlier policy configurations are explicitly noted
- **Personal notes** — per-lab notes field that persists across sessions via localStorage
- **Progress tracking** — checkmark each lab complete, domain progress bars update in real time
- **Persistent state** — completed labs and notes survive browser restarts via localStorage

---

## AZ-104 Domains Covered

| Domain | Exam Weight | Labs |
|--------|-------------|------|
| Manage Azure Identities & Governance | 20–25% | 5 |
| Implement & Manage Storage | 15–20% | 4 |
| Deploy & Manage Azure Compute | 20–25% | 5 |
| Configure & Manage Virtual Networking | 25–30% | 6 |
| Monitor & Maintain Azure Resources | 10–15% | 3 |

---

## Lab Overview

### 🪪 Domain 1 — Manage Azure Identities & Governance
- **1.1** Create & Manage Entra ID Users
- **1.2** Manage Groups & Dynamic Membership
- **1.3** Configure RBAC Role Assignments
- **1.4** Azure Policy & Initiatives
- **1.5** Manage Subscriptions, Resource Groups & Locks

### 💾 Domain 2 — Implement & Manage Storage
- **2.1** Create & Configure Storage Accounts
- **2.2** Manage Azure Blob Storage
- **2.3** Azure Files & File Sync
- **2.4** Storage Security & Access Control

### ⚙️ Domain 3 — Deploy & Manage Azure Compute
- **3.1** Create & Configure Virtual Machines
- **3.2** VM Availability & Scale Sets
- **3.3** App Service & Web Apps
- **3.4** Azure Container Instances & AKS Basics
- **3.5** Azure Backup & Site Recovery

### 🌐 Domain 4 — Configure & Manage Virtual Networking
- **4.1** Create & Configure Virtual Networks
- **4.2** Network Security Groups (NSGs)
- **4.3** Azure DNS (Public & Private Zones)
- **4.4** VNet Peering & Service Endpoints
- **4.5** Load Balancer & Application Gateway
- **4.6** VPN Gateway & ExpressRoute Concepts

### 📊 Domain 5 — Monitor & Maintain Azure Resources
- **5.1** Azure Monitor & Alerts
- **5.2** Log Analytics & KQL Queries
- **5.3** Network Watcher & Diagnostics

---

## Tech Stack

- React 18
- Vite
- IBM Plex Mono / Space Grotesk (Google Fonts)
- No external UI libraries — pure CSS-in-JS
- localStorage for persistent state

---

## Running Locally

```bash
npm install
npm run dev
```

Open **http://localhost:5173** in your browser.

---

## Project Structure

```
az104-lab-tracker/
├── src/
│   └── App.jsx        # All lab data and UI in one file
├── public/
├── package.json
└── README.md
```

---

## Why I Built This

I'm an IT professional and U.S. Air Force veteran currently working toward the AZ-104 certification while working full time as a Systems Administrator supporting Raytheon and Pratt & Whitney. Rather than relying solely on third-party study tools, I built my own — both to reinforce the material and to practice the React skills I'm developing alongside my cloud engineering path.

The lab tracker was born out of frustration with generic study guides that tell you *what* to do without explaining *why*. Every lab here includes real-world context, honest cost warnings, and the specific gotchas I discovered the hard way during hands-on portal work.

This is a living project — labs and notes grow as my studies progress.

---

## Free Trial Notes

This tracker was built and tested on an **Azure free trial account ($200 credit)**. Several labs include specific callouts for:

- VM size quota restrictions (B1s often unavailable on free trial)
- Marketplace image restrictions (use official Canonical/Microsoft images)
- Expensive resources that must be deleted immediately (AKS, Bastion, VPN Gateway, Application Gateway)
- Policy dependencies that can block later labs if not managed carefully

Estimated total lab cost with proper resource cleanup: **~$3–5**

---

## Related

- [AZ-104 Exam Prep](https://github.com/8BitJustin/az104-exam-prep) — companion app with randomized practice questions, domain tracking, and immediate answer feedback

---

*Built by [Justin Olson](https://www.linkedin.com/in/justinolson34) · Melissa, TX*