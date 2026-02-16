// Experiment Highlights Configuration
// ────────────────────────────────────────────────────────────────────
// To promote an experiment to the site:
//   1. Add an entry to the `highlights` array below
//   2. Deploy (or run `npm run build`)
//   That's it. Newest entries appear first.
// ────────────────────────────────────────────────────────────────────

export interface ExperimentHighlight {
  id: string;           // e.g. "D111"
  title: string;        // human-readable title
  date: string;         // ISO date or "2025-02" style
  thread: string;       // which research thread
  threadColor: string;  // tailwind color name: blue, green, purple, yellow
  summary: string;      // 1-3 sentence summary of what the experiment found
  keyResult?: string;   // optional one-line quantitative result
  status: 'confirmed' | 'promising' | 'negative' | 'in-progress';
  tags?: string[];
}

export const highlights: ExperimentHighlight[] = [
  // ── Most recent first ───────────────────────────────────────────────

  {
    id: 'D111',
    title: 'Multi-Mode Hinge Detection',
    date: '2025-02',
    thread: 'Spectral Protein Analysis',
    threadColor: 'green',
    summary: 'T4 lysozyme is a "hinge enzyme" — mode 1 looks allosteric, but modes 2–5 concentrate at the catalytic cleft. Higher-mode hinge ratio (hinge_R₂₋₅ > 1.0) distinguishes enzymes from allosteric proteins.',
    keyResult: 'Targeting 12/12 archetype classification (100%)',
    status: 'in-progress',
    tags: ['multi-mode', 'hinge', 'T4 lysozyme'],
  },
  {
    id: 'D110',
    title: 'Enzyme Lens — Asymmetric Entropy Detection',
    date: '2025-01',
    thread: 'Spectral Protein Analysis',
    threadColor: 'green',
    summary: 'Enzymes have localized active-site dynamics (high IPR in low modes), while allosteric proteins show delocalized propagation. An asymmetric entropy detector fixes DHFR classification.',
    keyResult: '92% archetype classification (11/12 proteins)',
    status: 'confirmed',
    tags: ['enzyme', 'entropy', 'IPR', 'DHFR'],
  },
  {
    id: 'D109',
    title: 'Thermodynamic Band — 7 Fano-Mapped Instruments',
    date: '2025-01',
    thread: 'Spectral Protein Analysis',
    threadColor: 'green',
    summary: 'Adding full thermodynamic observables (vibrational entropy, heat capacity, Helmholtz free energy, IPR mode localization) and expanding to 7 Fano-mapped instruments. The breakthrough experiment for archetype classification.',
    keyResult: '83% accuracy (10/12), up from 17%',
    status: 'confirmed',
    tags: ['thermodynamics', 'Fano mapping', 'vibrational entropy'],
  },
  {
    id: 'D106',
    title: 'Quantum Carver — 7D Hilbert Space Alignment',
    date: '2024-12',
    thread: 'Spectral Protein Analysis',
    threadColor: 'green',
    summary: 'Unifies spectral surgery with quantum-style alignment over a 7D Hilbert space mapped to Fano points. Includes shadow inspection (preview cuts before committing) and a diagnostic handbook.',
    keyResult: '58% blind archetype accuracy',
    status: 'confirmed',
    tags: ['quantum', 'Hilbert space', 'Fano carving'],
  },
  {
    id: 'D96',
    title: 'Allosteric Validation — Ground Truth',
    date: '2024-11',
    thread: 'Spectral Protein Analysis',
    threadColor: 'green',
    summary: 'Ground-truth validation of spectral surgery lock contacts against UniProt/PDB functional sites using Fisher\'s exact test. The algebra finds real biology.',
    keyResult: '4.49× allosteric site enrichment (p < 0.05)',
    status: 'confirmed',
    tags: ['allosteric', 'Fisher test', 'UniProt', 'PDB'],
  },
  {
    id: 'D94',
    title: 'Spectral Surgery — Lock Contact Discovery',
    date: '2024-11',
    thread: 'Spectral Protein Analysis',
    threadColor: 'green',
    summary: 'Systematically removes contacts from the protein graph and measures spectral gap response. Contacts whose removal maximally decreases the gap are "locks" — the bonds holding the protein rigid.',
    keyResult: 'Lock contacts predict allosteric and active sites',
    status: 'confirmed',
    tags: ['spectral surgery', 'lock contacts', 'spectral gap'],
  },
  {
    id: 'D82',
    title: 'Silhouette k-Selection for Domain Count',
    date: '2024-10',
    thread: 'Spectral Protein Analysis',
    threadColor: 'green',
    summary: 'Replaces the standard eigengap heuristic with silhouette-based k-selection on NJW-normalised spectral embeddings for automatic domain count determination.',
    keyResult: '78% k-accuracy on 36 proteins (7× eigengap, p = 2.85×10⁻⁶)',
    status: 'confirmed',
    tags: ['silhouette', 'k-selection', 'NJW', 'CATH benchmark'],
  },

  // ── Add older / other-thread highlights as needed ───────────────────
];
