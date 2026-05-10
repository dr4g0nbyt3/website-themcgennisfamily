// ============================================================================
// LEAD MAGNET — the freebie offered in exchange for an email signup.
// ============================================================================
// A generic newsletter signup converts at ~2–3%. A specific freebie pushes that
// to 10–15%. Set `enabled: false` to revert all signup forms to generic copy.
//
// To swap the offer: edit the fields below, drop the new PDF in
// /public/downloads/, and update `fileUrl` to match.

export const LEAD_MAGNET = {
  enabled: true,
  title: 'The From Scratch Fridays Starter Pack',
  // The hook line shown under the title.
  hook: 'Free download: 5 of our family\'s favorite recipes plus a printable weekly meal plan to get you cooking from scratch.',
  // Bullet list of what the subscriber gets. Keep tight (3–5 items).
  bullets: [
    '5 family-tested recipes (Stephanie\'s most-requested)',
    'Printable weekly meal plan template',
    'Pantry staples checklist for cooking from scratch',
    'Bonus: a one-page guide to building a Friday family-meal habit',
  ],
  // Path inside /public/. Drop the actual PDF here once written.
  fileUrl: '/downloads/from-scratch-fridays-starter-pack.pdf',
  // Used as the filename when the user downloads.
  fileName: 'from-scratch-fridays-starter-pack.pdf',
  // CTA button text shown on signup forms.
  ctaText: 'Send Me the Pack',
} as const;
