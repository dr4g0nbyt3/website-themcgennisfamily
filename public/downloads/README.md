# Lead Magnet Downloads

This folder hosts the lead magnet that gets sent to newsletter subscribers.

## How to publish (one-time, ~60 seconds)

A branded HTML version of the starter pack already lives here:

- **Source:** `from-scratch-fridays-starter-pack.html`

Convert it to a PDF via your browser:

1. Open `from-scratch-fridays-starter-pack.html` in Chrome (Chrome's print engine produces the cleanest PDF — Safari/Firefox also work, results vary).
2. Click the **Save as PDF** button in the top-right (or press ⌘P / Ctrl+P).
3. In the print dialog:
   - **Destination:** Save as PDF
   - **Paper size:** Letter
   - **Margins:** None (the file has its own internal margins)
   - **Background graphics:** ON (most important toggle — without it the colored pages save as white)
4. Save to this folder as `from-scratch-fridays-starter-pack.pdf`.

That filename matches `LEAD_MAGNET.fileUrl` in `src/data/leadMagnet.ts`, so the download button on `/newsletter-success` will Just Work.

## What's in the pack today

14-page branded family cookbook, structured as:

1. Cover
2. A note from Stephanie
3. The Friday Habit — four rules that make it stick
4. Recipe 1 · Sunday Chicken Pot Pie
5. Recipe 2 · Sunday-Night Beef Stew
6. Recipe 3 · No-Knead Family Bread
7. Recipe 4 · Three-Bean Family Chili
8. Recipe 5 · Brown-Butter Apple Crisp
9. Interlude — "A meal isn't just a meal"
10. Weekly meal plan (printable, fridge-pinnable)
11. Pantry checklist
12. The Family Table — bonus guide
13. Where to go next / CTA back to the site
14. Back cover

## Things to verify / customize before publishing

The recipes are well-known classics written from scratch with proper measurements. They work as-is, but for authenticity Stephanie should:

- **Swap one or two recipes** for actual McGennis-family go-to dishes if they exist (heritage recipes from grandmothers, family-favorite versions). The current set is "safe classic American" — fine, but won't have the personal hook of "this is the one Aunt Mary used to make."
- **Read the note on page 2 ("A note from Stephanie")** and rewrite it in her own voice. Right now it's plausible but generic — the most-personal page is the most-shared page.
- **Verify the "Friday Round" tradition** — that's stated as already-existing in the McGennis household. If it's not, either start it or rephrase that paragraph.

The recipe instructions and pantry list are food-science-correct and don't need verification.

## Editing tips

- **Brand colors** at the top of `<style>`: gold (#B89968), maroon (#800020), navy (#1B2845), forest (#2F4538). Match the site exactly.
- **Page breaks** are forced by every `<section class="page">`. Add a recipe, copy a section, swap content — no other plumbing.
- **The print preview in Chrome shows you exactly what the PDF will look like** — open the file, hit ⌘P, and proof there before saving.
- Recipe pages share a CSS structure — to add a 6th recipe, copy any of the recipe `<section>` blocks and edit the content.

## Why this matters

Lead magnet conversion bumps newsletter signup from ~2–3% to 10–15%. A weak or fabricated PDF burns trust and increases unsubscribes. The personal voice (page 2, page 9 interlude, the kid-task notes) is what differentiates this from a generic recipe roundup — keep those bits real.

## Future delivery upgrade

Right now, a successful Netlify Forms submission redirects to `/newsletter-success` and the user clicks "Download the PDF" there. That works but skips email confirmation. When/if you graduate to a real email provider (Beehiiv, ConvertKit, MailerLite), set up a welcome automation that emails the link — that filters out fake addresses and forces opens.
