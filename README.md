# 📚 Virasat — India's Forgotten History

An immersive digital archive of India's forgotten stories, unsung heroes, and living heritage.

**Tagline:** *Our Heritage. Our Pride. Our Future.*

---

## 📌 Submission Links (Event Requirements)

### 🌐 Live Deployed Project
**Published Website:** https://virasat.vercel.app

### 🌐 GitHub Repository  
**Repository Link:** https://github.com/kalivinnu/Virasat

### 📊 Project Documentation
Complete documentation and source code available in GitHub repository (this file)

---

## 🎯 Project Overview

Virasat is a cutting-edge web application designed to preserve and celebrate India's rich cultural heritage. The platform provides:

- **Immersive User Experience:** Cinematic animations and transitions for engaging storytelling
- **Heritage Documentation:** Comprehensive archive of historical sites, monuments, and cultural landmarks
- **State-wise Heritage Information:** Detailed information about heritage sites across Indian states
- **Interactive Timeline:** Visual representation of historical events and their significance
- **Responsive Design:** Seamless experience across all devices (mobile, tablet, desktop)

---

## ✨ Features

### Core Features
✅ **Hero Section with Cinematic Intro** - Captivating landing page with animations  
✅ **State Heritage Pages** - Detailed information for each Indian state  
✅ **Interactive Timeline** - Historical events visualization  
✅ **Cultural Section** - Showcase of cultural traditions and practices  
✅ **Fighters & Heroes Section** - Tribute to historical figures  
✅ **Archive Section** - Comprehensive heritage database  
✅ **Verification Section** - Authentic information sources  
✅ **Navigation Menu** - Smooth site navigation  
✅ **Heritage Map** - Geographic visualization of heritage sites  
✅ **Responsive UI** - Mobile-friendly design using Tailwind CSS  

### Technical Features
✅ Server-Side Rendering (SSR) with TanStack Start  
✅ Type-Safe Development with TypeScript  
✅ Component-Based Architecture using React  
✅ Modern UI Components (Shadcn/ui + Radix UI)  
✅ SEO Optimized  
✅ Performance Optimized  
✅ Progressive Web App (PWA) Ready  

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI Library
- **TypeScript** - Type Safety
- **TanStack Start** - Modern Meta-Framework (Server + Client)
- **TanStack Router** - Routing
- **Tailwind CSS** - Styling
- **Shadcn/ui** - UI Component Library
- **Radix UI** - Accessible Component Primitives
- **React Query** - Data Fetching & Caching

### Development Tools
- **Vite** - Build Tool & Dev Server
- **Node.js** - Runtime Environment
- **npm** - Package Manager
- **ESLint** - Code Quality
- **Prettier** - Code Formatting

### Deployment
- **Vercel** - Cloud Hosting Platform
- **GitHub** - Version Control & Repository

### Browser Support
- Chrome (Latest)
- Firefox (Latest)
- Safari (Latest)
- Edge (Latest)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher)
- Git
- Code Editor (VS Code recommended)

### Local Installation

#### Step 1: Clone the Repository
```bash
git clone https://github.com/kalivinnu/Virasat.git
cd Virasat
```

#### Step 2: Install Dependencies
```bash
npm install
```

#### Step 3: Run Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:8081`

#### Step 4: Build for Production
```bash
npm run build
```

#### Step 5: Preview Production Build
```bash
npm run preview
```

---

## 📝 Git Commands Guide

### Initial Setup
```bash
# Clone repository
git clone https://github.com/kalivinnu/Virasat.git

# Navigate to project
cd Virasat

# Configure user (first time only)
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

### Daily Development Workflow
```bash
# Check status of changes
git status

# Add all changes to staging
git add .

# Add specific file
git add path/to/file

# Commit changes with message
git commit -m "Description of changes"

# Push to remote repository
git push origin main

# Pull latest changes from remote
git pull origin main
```

### Branching (for team collaboration)
```bash
# Create new branch
git checkout -b feature/your-feature-name

# Switch between branches
git checkout branch-name

# List all branches
git branch -a

# Push branch to remote
git push origin feature/your-feature-name

# Create Pull Request (on GitHub)
# Then merge after review
```

### Useful Commands
```bash
# View commit history
git log

# View recent commits (abbreviated)
git log --oneline

# Undo uncommitted changes
git checkout -- file.name

# Undo last commit (keep changes)
git reset --soft HEAD~1

# View differences
git diff

# Stash changes temporarily
git stash

# Apply stashed changes
git stash pop
```

---

## 💻 How to Use the Website

### 1. **Home Page / Landing**
- Explore the cinematic hero section
- View the navigation menu at the top
- Read the tagline: "Our Heritage. Our Pride. Our Future."

### 2. **Navigation Menu**
Click on different sections in the navigation bar:
- **Home** - Return to landing page
- **States** - Browse heritage by Indian state
- **Timeline** - Explore historical timeline
- **Culture** - Learn about cultural traditions
- **Fighters** - Discover historical heroes
- **Archive** - Access the heritage database

### 3. **State Heritage Pages**
- Click on any state from the states section
- View detailed heritage information about that state
- See images and descriptions of landmarks
- Explore historical significance

### 4. **Interactive Timeline**
- Scroll through historical events
- View dates and descriptions
- Understand chronological progression of events

### 5. **Heritage Search & Filters**
- Use search functionality to find specific heritage sites
- Filter by state, category, or time period
- Click on any item for detailed information

### 6. **Responsive Design**
- Access from any device:
  - **Desktop:** Full feature experience
  - **Tablet:** Optimized layout
  - **Mobile:** Touch-friendly interface

### 7. **Dark/Light Theme (if available)**
- Toggle theme switcher (if present)
- Automatic theme detection based on device settings

### 8. **Sharing**
- Share heritage sites on social media
- Copy links to specific pages
- Save favorites (if logged in)

---

## 🏗️ Project Structure

```
Virasat/
├── src/
│   ├── routes/
│   │   ├── __root.tsx          # Root layout & meta tags
│   │   ├── index.tsx           # Home page
│   │   ├── state.$stateId.tsx  # State detail pages
│   │   ├── auth.tsx            # Authentication (if needed)
│   │   └── dashboard.tsx       # Dashboard (if needed)
│   ├── components/
│   │   ├── ui/                 # Shadcn/Radix UI components
│   │   └── virasat/            # Custom Virasat components
│   │       ├── Hero.tsx
│   │       ├── CinematicIntro.tsx
│   │       ├── StateHeritagePage.tsx
│   │       ├── TimelineSection.tsx
│   │       ├── CultureSection.tsx
│   │       ├── FightersSection.tsx
│   │       ├── ArchiveSection.tsx
│   │       └── [other components]
│   ├── lib/                    # Utilities & helpers
│   │   ├── utils.ts
│   │   └── error-*.ts
│   ├── hooks/                  # React hooks
│   ├── styles.css              # Global styles
│   ├── server.ts               # Server-side code
│   └── start.ts                # Entry point
├── public/
│   ├── favicon.ico             # Favicon (Virasat logo)
│   └── robots.txt              # SEO robots file
├── package.json                # Dependencies
├── tsconfig.json               # TypeScript config
├── vite.config.ts              # Vite configuration
└── README.md                   # This file
```

---

## 🗄️ Database & External Services

### Current Architecture
- **No external database** - Project uses static data (JSON files)
- **Client-side rendering** with server-side support
- **Data stored in:** `src/components/virasat/data.ts`

### Future Scalability
If you need to add a database:

**Recommended Options:**
- **MongoDB** - For flexible document storage
- **PostgreSQL** - For relational data
- **Firebase** - For quick backend setup
- **Supabase** - Open-source Firebase alternative

### API Integration
Currently using:
- ✅ TanStack Query for data fetching
- ✅ Server-side rendering for SEO
- ✅ Built-in error handling

---

## 📦 Available Scripts

```bash
# Start development server on http://localhost:8081
npm run dev

# Build for production
npm run build

# Build for development (with sourcemaps)
npm run build:dev

# Preview production build locally
npm run preview

# Run ESLint to check code quality
npm run lint

# Format code with Prettier
npm run format
```

---

## 🚀 Deployment on Vercel

### Automatic Deployment (Recommended)
1. Push code to GitHub
2. Go to https://vercel.com
3. Click "Import Project"
4. Select your GitHub repository
5. Vercel automatically deploys on every push

### Manual Deployment
```bash
npm run build
vercel deploy --prod
```

### Environment Variables
Currently no environment variables needed for basic setup.

For production, add to Vercel:
```
VITE_API_URL=your-api-url (if using external API)
VITE_ENV=production
```

---

## 🐛 Troubleshooting

### Issue: Favicon not showing (Lovable symbol appears)
**Solution:**
1. Hard refresh: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
2. Clear browser cache: Settings → Clear Browsing Data
3. Wait for Vercel deployment to complete
4. Force Vercel cache clear from dashboard

### Issue: Port 8080/8081 already in use
**Solution:**
```bash
# Kill process on port 8081
# Windows:
netstat -ano | findstr :8081
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti :8081 | xargs kill -9
```

### Issue: Dependencies not installing
**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Issue: TypeScript errors
**Solution:**
```bash
# Rebuild TypeScript
npx tsc --noEmit

# Check for missing types
npm install --save-dev @types/node
```

---

## 🔒 Security & Best Practices

✅ **Code Quality**
- ESLint configuration for consistent code style
- TypeScript for type safety
- Environment variables for sensitive data

✅ **Performance**
- Optimized for Core Web Vitals
- Server-side rendering for faster load times
- Image optimization
- Code splitting

✅ **Accessibility**
- WCAG 2.1 compliant components (Radix UI)
- Semantic HTML
- ARIA labels where needed

---

## 📖 Additional Resources

- **TanStack Documentation:** https://tanstack.com/
- **React Documentation:** https://react.dev/
- **Tailwind CSS:** https://tailwindcss.com/
- **TypeScript Handbook:** https://www.typescriptlang.org/
- **Vite Guide:** https://vitejs.dev/guide/

---

## 🤝 Contributing

### To contribute:
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

This project is provided as-is for educational and demonstration purposes.

---

## 👥 Project Information

**Project Name:** Virasat — India's Forgotten History  
**Creator:** Kalvin (kalivinnu)  
**Repository:** https://github.com/kalivinnu/Virasat  
**Live URL:** https://virasat.vercel.app  
**Status:** ✅ Live & Functional  

---

## ✅ Event Submission Checklist

- ✅ Project is functional and accessible
- ✅ GitHub repository contains complete source code
- ✅ README documentation provided
- ✅ Live deployment link (Vercel)
- ✅ Git commands documented
- ✅ Usage instructions included
- ✅ Tech stack clearly mentioned
- ✅ Installation & setup guide provided
- ✅ Troubleshooting section included
- ✅ Project structure explained

---

## 📞 Support & Questions

For issues or questions:
1. Check the Troubleshooting section above
2. Review GitHub Issues: https://github.com/kalivinnu/Virasat/issues
3. Check TanStack/React documentation
4. Refer to Vercel deployment docs

---

**Built with ❤️ for preserving India's heritage**
