# Automation Practice Webpage

A dedicated practice environment designed for **Automation Testing training** (Selenium, Playwright, Cypress, etc.). This project simulates common and advanced UI interactions found in real-world applications, packaged in a lightweight, backend-free structure.

## 🎯 Purpose

- Practice **Locator Strategies** with diverse element types.
- Master **Synchronization** (Explicit Waits) with dynamic loading elements.
- Handle **Complex Interactions** like Drag & Drop, Hover, and Custom Dropdowns.
- Automate **Form Flows** including validation and data entry.

## 🚀 Features

### 📝 Page 1: Registration Form
A comprehensive form to practice data entry and validation:
- **Input Types**: Text, Email, Password, Number, Date.
- **Selection Controls**: 
  - Standard Dropdown (Select).
  - **Searchable Multi-Select**: Custom component with tag selection and filtering.
  - Radio Buttons & Checkboxes.
- **File Upload**: Native file input handling.
- **Form Actions**: Submit (Mock API) and Reset functionality.

### ⚡ Page 2: Interaction & Alerts
A playground for UI challenges:
- **Dynamic Content**: 
  - **Dynamic Dropdown**: Simulates network delay (3s) on focus/click. Resets on blur to enforce repetitive wait testing.
  - **Loading Data**: Elements that appear asynchronously.
- **Popups**:
  - Native Browser Alerts (`alert`, `confirm`, `prompt`).
  - Custom HTML Modals with overlays.
- **Mouse Actions**: 
  - HTML5 **Drag & Drop** API.
  - Hover-triggered tooltips and menus.
- **State Management**: Enable/Disable input toggling.

## 🛠️ Tech Stack

- **Core**: HTML5, Vanilla CSS3 (Modern Variables & Flexbox/Grid), Vanilla JavaScript (ES Modules).
- **Tooling**: [Vite](https://vitejs.dev/) for lightning-fast development.
- **Style**: Premium, responsive UI without heavy frameworks (No Bootstrap/Tailwind dependency).

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js installed.
- **pnpm** (Recommended) or npm.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ToanBuiQ/auto_practice_page.git
   cd auto_practice_page
   ```

2. **Install Dependencies**:
   ```bash
   pnpm install
   ```

3. **Run Local Server**:
   ```bash
   pnpm dev
   ```
   > The app will run at `http://localhost:5173`.

## 🧪 Testing Tips
- **Dynamic Dropdown**: Use `Explicit Wait` (e.g., `WebDriverWait` or `page.waitForSelector`) effectively. It loads *only* when focused!
- **Modals**: Handle switching context or waiting for overlay visibility.
- **Multi-Select**: Practice interacting with non-standard inputs (Input text to search -> Click div to select).

---
*Built for educational purposes.*
