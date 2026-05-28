# API Hunter Todo

🚀 Simple Todo app with a fake JSON Server backend.

This project is a beginner-friendly Todo application that uses:

- `json-server` for a fake REST API
- `http-server` to serve frontend files
- plain HTML, CSS, and JavaScript for the UI

---

## ✅ Features

- Add new tasks
- Mark tasks complete / incomplete
- Delete tasks
- Saves todos in `db.json`
- Runs locally with a fake backend

---

## ▶️ Run options

- Start both server and client together:

```bash
npm start
```

- Start json-server only:

```bash
npm run start:server
```

- Start frontend only:

```bash
npm run start:client
```

---

## 🌐 Open in browser

- Frontend: `http://localhost:8080`
- API: `http://localhost:3000/todos`

---

## 📁 Important files

- `db.json` — fake database
- `package.json` — npm scripts and dependencies
- `public/index.html` — app page
- `public/styles.css` — UI styling
- `public/app.js` — app logic

---

## 💡 Notes

- Keep `node_modules/` out of GitHub using `.gitignore`
- The database starts with:

```json
{
  "todos": []
}
```

- When you add a task, `json-server` updates `db.json`

---

## 🤝 Ready to use

This project is ready for GitHub upload once you add a remote and commit your files.

