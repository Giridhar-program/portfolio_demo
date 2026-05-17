# 🚀 Giridhar Girish — Portfolio Website

A bold, creative personal portfolio built with **React**, **Three.js**, and **Framer Motion**.

---

## 📋 Prerequisites

Before you start, make sure you have these installed on your computer:

### 1. Node.js (v18 or higher)

Node.js is the engine that runs JavaScript outside the browser.

- **Download:** Go to [https://nodejs.org](https://nodejs.org) and download the **LTS** version.
- **Install:** Run the installer and follow the prompts (just click "Next" through everything)
- **Verify:** Open a terminal and type:
  ```
  node --version
  ```
  You should see something like `v18.x.x` or higher. ✅

### 2. npm (comes with Node.js)

npm is the package manager that installs libraries your project needs. It installs automatically with Node.js.

- **Verify:** In your terminal, type:
  ```
  npm --version
  ```
  You should see a version number. ✅

### 3. A Code Editor (recommended)

- [VS Code](https://code.visualstudio.com/) is free and great for beginners

### 4. A Terminal

- **Windows:** Use PowerShell (press `Win + X` → "Terminal") or the built-in VS Code terminal (`Ctrl + ~`)
- **Mac:** Use Terminal app or VS Code terminal
- **Linux:** Any terminal emulator

---

## 🏁 Getting Started (Step by Step)

### Step 1: Open the project folder in your terminal

```bash
cd C:\Users\guppy\OneDrive\Documents\Projects\Antigravity\portfolio_demo
```

> 💡 **Tip:** If you're using VS Code, just open the `portfolio_demo` folder in VS Code, then press `` Ctrl + ` `` to open the built-in terminal. It will already be in the right folder!

### Step 2: Install dependencies

This downloads all the libraries the project needs. You only need to do this **once** (or after pulling new changes).

```bash
npm install
```

⏳ This may take 30-60 seconds. You'll see a progress bar. When it's done, you'll see a message like:

```
added 200 packages in 30s
```

> 📁 This creates a `node_modules` folder — don't worry about it, and **never edit files inside it**.

### Step 3: Start the development server

```bash
npm run dev
```

You'll see output like:

```
VITE v8.x.x  ready in 500 ms

  ➜  Local:   http://localhost:5173/
```

### Step 4: Open in your browser

Open your web browser (Chrome, Edge, Firefox, etc.) and go to:

```
http://localhost:5173/
```

🎉 **You should see your portfolio!** A preloader animation plays first, then the full site appears.

### Step 5: Stop the server

When you're done, go back to the terminal and press:

```
Ctrl + C
```

This stops the dev server.

---

## 🔄 Everyday Workflow

Once everything is installed, you only need **two steps** each time:

```bash
npm run dev        # Start the server
# Open http://localhost:5173/ in your browser
# Press Ctrl + C when done
```

Any changes you make to the code will **automatically show up** in the browser — no need to refresh!

---

## 📁 Project Structure (What's What)

```
First_Project/
├── public/               # Static files (images go here)
│   └── images/           # Put project screenshots here
│
├── src/                  # 👈 This is where all the code lives
│   ├── components/       # Reusable UI pieces
│   │   ├── layout/       # DynamicIsland nav, Preloader
│   │   ├── three/        # 3D scenes (HeroScene, SkillsConstellation)
│   │   ├── ui/           # Custom cursor
│   │   ├── Hero.jsx      # Hero section (top of the page)
│   │   ├── About.jsx     # About Me section
│   │   ├── Skills.jsx    # Skills / tech stack section
│   │   ├── Projects.jsx  # Project cards section
│   │   └── Contact.jsx   # Contact section (bottom)
│   │
│   ├── data/
│   │   └── projects.js   # ⭐ Your projects, skills, and personal info
│   │
│   ├── pages/
│   │   ├── Home.jsx      # Main page (all sections combined)
│   │   └── ProjectDetail.jsx  # Individual project page
│   │
│   ├── styles/
│   │   └── index.css     # Colors, fonts, and global styles
│   │
│   ├── App.jsx           # App setup (routing, smooth scroll)
│   └── main.jsx          # Entry point
│
├── index.html            # The HTML shell
├── package.json          # Project config and dependencies
└── vite.config.js        # Build tool config
```

---

## ✏️ How to Customize

### Change your personal info

Edit `src/data/projects.js`:

```js
export const personalInfo = {
  name: "Your Name",
  tagline: "Your Tagline",
  email: "your@email.com",
  // ...
};
```

### Add a new project

In `src/data/projects.js`, add a new object to the `projects` array:

```js
{
  id: "my-new-project",          // URL-friendly ID (no spaces)
  title: "My New Project",       // Display name
  description: "A short summary of what it does.",
  tags: ["React", "Python"],     // Tech tags shown on the card
  thumbnail: null,               // Or "/images/my-project.webp"
  color: "#00BFFF",              // Accent color for the card
  github: "https://github.com/you/repo",
  live: "https://your-demo.com", // Or null if no live demo
  details: {
    problem: "What problem does it solve?",
    approach: "How did you build it?",
    result: "What was the outcome?"
  }
}
```

### Change colors

Edit the CSS variables in `src/styles/index.css`:

```css
:root {
  --color-blue: #00BFFF;      /* Primary accent */
  --color-magenta: #FF006E;   /* Secondary accent */
  --color-bg: #0A0A0F;        /* Background */
}
```

---

## 📦 Build for Production

When you're ready to share your site:

```bash
npm run build
```

This creates a `dist/` folder with optimized files ready for hosting.

---

## 🌐 Deploy to GitHub Pages

### Option 1: Manual

1. Run `npm run build`
2. Push the `dist/` folder to a `gh-pages` branch
3. Enable GitHub Pages in your repo settings → set source to `gh-pages` branch

### Option 2: Using gh-pages package

1. Install the deployment tool:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Add these to `package.json` under `"scripts"`:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```

3. Deploy:
   ```bash
   npm run deploy
   ```

4. Your site will be live at: `https://yourusername.github.io/repo-name/`

> ⚠️ **Important:** Before deploying, update `vite.config.js` to set the `base` path to your repo name:
> ```js
> export default defineConfig({
>   plugins: [react()],
>   base: '/your-repo-name/',
> })
> ```

---

## ❓ Troubleshooting

| Problem | Solution |
|---------|----------|
| `npm: command not found` | Install Node.js from [nodejs.org](https://nodejs.org) |
| `npm install` fails | Delete `node_modules` folder and `package-lock.json`, then run `npm install` again |
| Page is blank | Check the browser console (`F12` → Console tab) for error messages |
| 3D scene doesn't load | Try a different browser (Chrome works best). Check if your GPU drivers are updated |
| Changes aren't showing | The dev server should auto-refresh. If not, try `Ctrl + Shift + R` (hard refresh) |
| Port 5173 already in use | Stop other dev servers, or run `npm run dev -- --port 3000` to use a different port |

---

## 🛠️ Tech Stack

| What | Why |
|------|-----|
| [React](https://react.dev) | Component-based UI library |
| [Vite](https://vite.dev) | Super fast build tool |
| [Three.js](https://threejs.org) / React Three Fiber | 3D graphics in the browser |
| [Framer Motion](https://motion.dev) | Smooth animations |
| [Lenis](https://github.com/darkroomengineering/lenis) | Buttery smooth scrolling |
| [React Router](https://reactrouter.com) | Page navigation |

---

Made with ❤️ by Giridhar Girish
