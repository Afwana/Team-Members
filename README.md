# Team Members Dashboard

A modern, responsive **Team Members Management Dashboard** built with **React, TypeScript, and SCSS**.  
This project demonstrates real-world frontend patterns including filtering, sorting, pagination, multi-selection, and interactive popups.

---

## Features

### Team Members Table
- Display team members with avatar, name, username, role, email, teams, and status
- Supports **multiple statuses per user**
- Clean, Figma-inspired UI

### Selection
- Checkbox selection for each row
- Header checkbox to **select / deselect all**
- Indeterminate state when partially selected

### Search
- Search by:
  - Name
  - Username
  - Email
- Case-insensitive
- Works with filters and sorting

### Sorting
- Sort by:
  - Name
  - Role
  - Email
- Toggle ascending / descending order

### Filtering
- Filter by **Status** (multi-select)
- Filter by **Teams** (multi-select)
- Filters combine with search and sorting
- Fully client-side

### Status Management
- Each status badge opens a popup
- Popup auto-positions (top/bottom based on available space)
- Click outside or scroll to close
- Multiple statuses selectable per user
- Local state updates instantly

### Pagination
- Page-based pagination
- Auto-updates based on filtered results
- Previous / Next navigation

### Responsive Design
- Works across desktop, tablet, and mobile
- Flexible layout with SCSS media queries

---

## Tech Stack

- **React**
- **TypeScript**
- **SCSS**
- **React Icons**
- **Vite** (recommended)

---

## Project Structure

src/
├── components/
│ ├── Header/
│ │ ├── Header.tsx
│ │ └── Header.scss
│ ├── MemberTable/
│ │ ├── MemberTable.tsx
│ │ ├── MemberTable.scss
│ │ └── MemberData.ts
├── assets/
├── App.tsx
├── main.tsx
└── index.scss

Install dependencies : npm install

Start development server : npm run dev
