# Day by Day: Codex Mini-App Lab

This is a small, dependency-free web application for a classroom lab on using Codex as a programming assistant. Users can create, read, edit, complete, and delete checklist items for any selected date. Data is saved in the browser with `localStorage`.

## Run the app

The simplest option is to double-click `index.html` and open it in a browser.

For a local development server, open a terminal in this folder and run:

```bash
python3 -m http.server 8000
```

Then visit <http://localhost:8000>.

## Files

- `index.html` contains the page structure and accessible labels.
- `styles.css` controls the visual design and responsive layout.
- `script.js` contains the checklist data and CRUD behavior.

No packages, accounts, API keys, or build tools are required.

## Suggested 60-minute lab

1. **Explore (10 minutes):** Run the app, test each feature, and identify where HTML, CSS, and JavaScript appear.
2. **Prompt (5 minutes):** In breakout rooms, choose one improvement and describe it in plain language.
3. **Build with Codex (25 minutes):** Ask Codex to locate the relevant code, propose a change, implement it, and explain the result.
4. **Test and revise (10 minutes):** Try expected behavior, edge cases, keyboard use, and a narrow mobile window.
5. **Share (10 minutes):** Demonstrate the change and share one useful prompt and one lesson learned.

## Breakout-room challenges

Choose one or combine several:

- Add task priorities (low, medium, high) and use color carefully.
- Add categories or tags and a filter control.
- Replace the edit prompt with an inline text field.
- Let users reorder tasks.
- Add a progress bar for the selected day.
- Add a dark mode with a saved preference.
- Add a notes field or optional due time.
- Add an “all dates” overview.
- Export and import checklist data as JSON.
- Improve accessibility and explain each improvement.

## Prompt starters

Students can adapt these rather than copying them blindly:

> Explain how this project works. Point me to the HTML, CSS, and JavaScript responsible for adding a task.

> Add a priority to every task. Before editing, tell me which files you will change and how the saved data will change.

> Review this checklist for accessibility. Give me the three most important improvements, then implement the first one.

> Help me test the feature we just added. Include normal cases, edge cases, and a keyboard-only test.

## Discussion questions

- What did Codex understand correctly from your first prompt?
- What information did you need to add or clarify?
- Which parts of the generated code can your group explain confidently?
- How did you verify that the change works?
- What are the privacy limitations of saving data in `localStorage`?

## Important limitation

The checklist is stored only in the current browser and device. Clearing site data removes it. This makes the project easy to run for a lab, but it is not a multi-user or cloud-synced application.