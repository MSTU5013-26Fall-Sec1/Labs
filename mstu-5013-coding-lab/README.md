# MSTU 5013 Coding Lab Website

A responsive, one-page website introducing the MSTU 5013 lab session at Teachers College, Columbia University. The page presents coding as a creative learning practice, introduces GitHub and Codex, offers practical learning strategies, and includes an instructor profile for Daoquan Li.

## Project contents

```text
.
├── index.html          # Page structure, styles, and interactions
├── daoquan-li.png      # Instructor portrait from the official TC profile
└── README.md           # Project documentation
```

The project is intentionally dependency-free. All HTML, CSS, and JavaScript are contained in `index.html`, so no package installation or build step is required.

## View the website locally

Open `index.html` directly in a modern browser.

Alternatively, run a local web server from this directory:

```bash
python3 -m http.server 8000
```

Then visit [http://localhost:8000](http://localhost:8000).

## Page sections

1. **Hero** — Introduces the lab’s “learn by making” theme.
2. **Instructor** — Presents Daoquan Li’s verified Teachers College role, affiliation, expertise, and portrait.
3. **Coding** — Explains coding through expression, instruction, and iteration.
4. **Toolkit** — Introduces GitHub and Codex as complementary learning tools.
5. **Practice** — Provides six practical habits for learning to code.

## Stylesheet

The site uses a deliberately simplified stylesheet embedded near the beginning of `index.html`. For example, the main page rule introduces background color, text color, type, spacing, and line height:

```css
body {
  margin: 0;
  background: #121212;
  color: #eeeeee;
  font-family: Arial, sans-serif;
  line-height: 1.6;
}
```

The stylesheet favors familiar element and class selectors, direct color values, and short declarations so beginners can follow each rule without first learning a design system.

### Teaching the CSS

The embedded stylesheet is organized by visible page feature. A useful classroom sequence is:

1. Change `body` colors to demonstrate how CSS changes appearance.
2. Change `h1` to demonstrate typography and scale.
3. Change `.button` to demonstrate padding, borders, and rounded corners.
4. Use `.hero` to introduce a two-column CSS Grid.
5. Compare the desktop grids with the single-column media query.

## Customization

### Update page content

Edit the text inside the corresponding semantic `<section>` in `index.html`. Each major section has a stable anchor:

- `#instructor`
- `#coding`
- `#tools`
- `#tips`

If a section is added or renamed, update the navigation links near the top of the `<body>` as well.

### Change colors

Edit the color values in the `body`, `.primary`, `.terminal`, and `article` rules.

### Replace the instructor portrait

Replace `daoquan-li.png` with another image using the same filename, or update the `<img src>` value in the instructor section. For best results, use a clear image with a landscape aspect ratio close to 4:3.

## Accessibility and responsive behavior

- Semantic headings, sections, articles, navigation, and figure elements organize the content.
- Images include alternative text.
- Navigation and buttons use standard keyboard-accessible links.
- Layouts collapse to a single column below 820 pixels.
- Motion is disabled when the browser reports a `prefers-reduced-motion` preference.
- Native dark color controls are enabled through `color-scheme: dark`.

## Publishing with GitHub Pages

1. Create a GitHub repository and add these project files.
2. Commit and push the files to the repository’s default branch.
3. Open **Settings → Pages** in the GitHub repository.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the default branch and the `/ (root)` folder, then save.

GitHub will provide a public URL after the first deployment finishes.

## Attribution

Instructor details and portrait are sourced from the official [Daoquan Li faculty profile](https://www.tc.columbia.edu/faculty/dl2331/) at Teachers College, Columbia University.

## Technical notes

- The scroll-reveal effect uses the browser’s `IntersectionObserver` API.
- Smooth anchor navigation is implemented with CSS.
- The page requires no framework, package manager, or compilation step.
- Current evergreen versions of Chrome, Edge, Firefox, and Safari are recommended.
