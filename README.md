# Unlit

Unlit is a personal quit-smoking tracker that counts life after the last cigarette.

The page tracks elapsed time since June 11, 2018, then turns that into visible milestones: cigarettes not smoked, money saved, days of life reclaimed, and progress toward a Porsche 911. It is built as a small PHP-served static site with Tailwind CSS, DaisyUI, and bundled JavaScript.

## Stack

- PHP entry point in `public/index.php`
- Tailwind CSS 4 with DaisyUI and Typography
- esbuild for JavaScript bundling
- npm scripts for local watch and production builds
- Apache-compatible HTTPS redirect in `public/web.htaccess`

## Project Structure

```text
public/
  assets/          Static images and fonts
  css/             Generated CSS output
  js/
    src/           JavaScript source
    app-dist.js    Generated JavaScript bundle
  index.php        Site entry point
  web.htaccess     Apache rewrite rules
tailwind/
  input.css        Tailwind source stylesheet
package.json       Build scripts and dev dependencies
```

## Development

Install dependencies:

```powershell
npm install
```

Run the CSS and JavaScript watchers:

```powershell
npm run dev
```

Build production assets:

```powershell
npm run build
```

The build creates:

- `public/css/tailwind.css`
- `public/js/app-dist.js`

Those generated files are ignored by git and should be rebuilt during development or deployment.

## Running Locally

Point Apache, XAMPP, or another local PHP-capable web server at the `public/` directory.

For a typical XAMPP setup, this project can live under `htdocs`, with the site served from:

```text
http://localhost/unlit/public/
```

If you configure a virtual host, use `public/` as the document root.

## Configuration

The counter values are set in `public/js/src/app.js`:

- `startDate`
- `cigsPerDay`
- `costPerCig`
- `lifePerCigMinutes`
- `porscheCost`

After changing these values, run `npm run build` or keep `npm run dev` running.

## License

MIT. See [LICENSE](LICENSE).
