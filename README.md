# Shi Luode Personal Website

A single-page academic personal website for Shi Luode, built as static HTML/CSS/JS for easy GitHub Pages deployment.

## Local Preview

Open `index.html` directly in a browser, or run:

```bash
python3 -m http.server 8080
```

Then visit:

```text
http://localhost:8080
```

## Structure

```text
index.html
styles.css
script.js
assets/
  docs/
    Shi_Luode_CV.pdf
  img/
    ariadne-exploration-map.png
    favicon.svg
```

## Deploy with Vercel

Fastest path:

1. Open `https://vercel.com/drop`.
2. Drag the whole `shi-luode-personal-website` folder, or upload `shi-luode-personal-website.zip`.
3. Choose a project name, for example `shi-luode`.
4. Click `Deploy`.
5. Vercel will give you a public URL such as:

```text
https://shi-luode.vercel.app
```

Recommended path for future edits:

1. Create a GitHub repository.
2. Put all files in this folder at the repository root.
3. Import that repository in Vercel.
4. After that, each GitHub push updates the website automatically.

This project is a static site, so no build command is required. The homepage is `index.html`.

## Deploy with GitHub Pages

For GitHub Pages:

1. Create a repository such as `shi-luode-personal-website`.
2. Upload these files to the repository root.
3. In GitHub, open `Settings -> Pages`.
4. Set `Source` to the main branch root.
5. Wait for GitHub Pages to publish the site.

## Notes

- The site uses an initials avatar (`SL`) because no Shi Luode profile photo was available in this folder.
- Private source files such as the profile knowledge base and LaTeX source are intentionally excluded from the public website package.
