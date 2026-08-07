# BPA PRO: Enterprise Operating System 🚀

BPA PRO is a next-generation, highly-performant, Offline-First Enterprise Operating System built using the **Astro.js Islands Architecture**. It serves as a unified workspace connecting CRM, Project Management, Human Resources, Document Management, and API Integrations seamlessly in one location.

## ✨ Key Features
- **Offline-First Synchronization:** Powered by a customized IndexedDB `DataService`, all modules (Tasks, Documents, CRM Leads, Candidates, Integrations) instantly save and persist data directly inside the browser—no backend required.
- **Role-Based Access Control (RBAC):** Dynamic sidebar navigation strictly enforces security policies. An HR Admin only sees the Operations Hub, while the CEO receives full visibility across the platform.
- **Islands Architecture:** Utilizes Astro.js to render zero-JavaScript static HTML by default, selectively hydrating interactive React components only when necessary.
- **Glassmorphic UI/UX:** Stunning, modern interface built with Tailwind CSS and Framer Motion, delivering micro-animations, dynamic shadowing, and localized currency (₹).

## 🛠 Tech Stack
- **Framework:** Astro.js
- **UI Components:** React
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **State Management:** Nano Stores
- **Database / Persistence:** IndexedDB
- **Icons:** Lucide React

## 🏗 System Architecture & Working

The platform relies on a decentralized, frontend-first architecture. User interactions update the Nano Store for immediate UI repaints, while the `DataService` simultaneously commits the payloads to the local IndexedDB.

```mermaid
graph TD
    %% Styling
    classDef primary fill:#7c3aed,stroke:#5b21b6,stroke-width:2px,color:#fff,font-weight:bold;
    classDef secondary fill:#f8fafc,stroke:#e2e8f0,stroke-width:2px,color:#0f172a;
    classDef database fill:#10b981,stroke:#047857,stroke-width:2px,color:#fff,font-weight:bold;

    subgraph CoreSystem [Astro + React Islands]
        Auth[Security: Auth Store & RBAC]:::primary
        UI[Interactive UI Components]:::secondary
        Store[State Management: Nano Stores]:::secondary
    end

    subgraph AppHubs [Application Hubs]
        Hubs[CRM, HR, Projects, Docs, Integrations]:::secondary
    end

    subgraph PersistenceLayer [Offline-First Sync]
        DataService[Data Abstraction Service]:::primary
        IndexedDB[(Browser IndexedDB v3)]:::database
    end

    %% Data Flow
    Auth --> |Enforces Roles| UI
    UI --> |Renders| Hubs
    Hubs <--> |Subscribes / Updates| Store
    Hubs --> |CRUD Operations| DataService
    DataService <--> |Persists Data| IndexedDB
```

## 🚀 Getting Started

### Prerequisites
- Node.js >= 20.0.0

### Installation
1. Clone the repository.
2. Install the dependencies:
   ```bash
   npm install
   ```

### Development
Run the local development server:
```bash
npm run dev
```
Navigate to `http://localhost:4321` to view the application.

### Building for Production
To build the static application:
```bash
npm run build
```
Preview the production build locally:
```bash
npm run preview
```

## 🔐 Authentication & Roles
On load, the application provides an **Identity Selection** screen. You can log in as different mock users to test the RBAC capabilities:
- **Harish (CEO):** Full Access
- **Sathya (HR Admin):** Operations Hub, Tasks
- **Praneeth (Lead Engineer):** Workspace, Integrations
- **Priya (Sales Director):** CRM, Analytics
