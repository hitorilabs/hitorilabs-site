design goal from original repo:

```
"almost plaintext"

Built to look like those IETF RFCs, but with some simple
CSS styles to make it easier to read. The goal was to add
enough css to make it responsive for mobile reading
```

_note: got lazy w/ styling, so now we just use tailwind_

links:

- https://docs.astro.build/en/guides/rss/
- https://docs.astro.build/en/guides/integrations-guide/sitemap/
- https://docs.astro.build/en/guides/markdown-content/

canonical urls in case people use params

---

- https://discourse.gohugo.io/t/lastmod-from-gitinfo-shows-correctly-with-hugo-serve-locally-but-is-overwritten-on-cloudflare-pages-deploy/46009/2
- https://www.brycewray.com/posts/2022/06/get-good-git-info-hugo/

build process needs to be:

```
git fetch --unshallow && npm run build
```
