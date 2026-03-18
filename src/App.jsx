git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

---

**Your GitHub repo should look like this before deploying:**
```
your-repo/
├── package.json        ← Render needs this at root
├── index.html
├── vite.config.js
├── src/
│   ├── App.jsx
│   └── main.jsx
└── public/
