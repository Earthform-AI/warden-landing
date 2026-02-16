// Papers Configuration for Earthform Research Lab
// Add new papers here — they'll appear on /papers automatically.

export interface Paper {
  id: string;
  title: string;
  authors: string[];
  date: string;
  abstract: string;
  pdf: string;  // path relative to /public
  status: 'preprint' | 'submitted' | 'published';
  journal?: string;
  thread: string;  // which research thread this belongs to
  threadLink: string;
  tags: string[];
}

export const papers: Paper[] = [
  {
    id: 'ibp-enm-2025',
    title: 'Spectral Decomposition of Protein Contact Networks for Unsupervised Domain, Hinge, and Structural Role Analysis',
    authors: ['Joshua Byrom'],
    date: '2025',
    abstract: 'We show that a single spectral decomposition of the protein Cα contact network simultaneously yields (i) domain boundaries, (ii) mechanical hinge locations, (iii) per-residue structural role scores, and (iv) functional archetype classification — without training data, sequence information, or evolutionary profiles. The method constructs a graph Laplacian from the contact map at 8 Å cutoff and extracts its low-lying eigenvectors. The Fiedler (second-smallest) eigenvector partitions the chain into structural domains; its gradient localises mechanical hinges. Multi-perspective elastic network model (ENM) spring constants, derived from stabiliser profiles over the spectral embedding, produce B-factor predictions with a median Spearman ρ = 0.666 across 110 proteins. For automatic determination of domain count, we introduce silhouette-based k-selection on Ng–Jordan–Weiss (NJW) normalised spectral embeddings, replacing the standard eigengap heuristic. On an expanded benchmark of 36 multi-domain proteins with CATH ground truth, silhouette k-selection achieves 78% accuracy in identifying the correct number of domains (vs. 11% for the eigengap heuristic; p = 2.85 × 10⁻⁶, Wilcoxon signed-rank test). We further introduce a thermodynamic band of seven spectral perturbation instruments that probe the contact network\'s response to targeted disruptions, achieving 83% archetype classification accuracy (10/12 proteins). Two post-hoc lenses — an enzyme lens based on IPR asymmetry and a multi-mode hinge lens based on the hinge occupation ratio R_hinge — raise classification to 100% (12/12) with zero false positives.',
    pdf: '/papers/ibp_enm_spectral_protein.pdf',
    status: 'preprint',
    thread: 'Spectral Protein Analysis',
    threadLink: '/research/protein-analysis',
    tags: ['IBP-ENM', 'Graph Laplacian', 'Fiedler Vector', 'CATH', 'Domain Detection', 'Spectral Clustering', 'Thermodynamic Band', 'Archetype Classification'],
  },
  {
    id: 'thermo-band-archetypes-2026',
    title: 'Thermodynamic Band Classification of Protein Structural Archetypes',
    authors: ['Joshua Byrom'],
    date: '2026',
    abstract: 'We introduce the thermodynamic band, an unsupervised classifier that assigns protein structural archetypes from the eigenvalue spectrum of the Cα contact-network Laplacian. Seven independent spectral instruments — Algebraic, Musical, Fick, Thermal, Cooperative, Propagative, and Fragile — each remove contacts that maximally perturb a different thermodynamic observable and produce archetype-specific response signatures. The MetaFickBalancer consensus fuses instrument votes via a diffusion-inspired weighting, achieving 83% accuracy (10/12) on a benchmark of 12 proteins spanning 5 archetypes. Two post-hoc lenses correct the remaining failures: an enzyme lens based on IPR asymmetry (+1 protein, 92%) and a novel multi-mode hinge lens based on the hinge occupation ratio R_hinge (+1 protein, 100%). The hinge lens exploits the observation that in hinge enzymes, higher normal modes (2–5) still concentrate amplitude at the domain boundary, while in allosteric proteins mode 1 exhausts the hinge contribution. The full pipeline achieves 100% accuracy with zero false positives, zero regressions, and no training data.',
    pdf: '/papers/thermo_band_archetypes.pdf',
    status: 'preprint',
    thread: 'Spectral Protein Analysis',
    threadLink: '/research/protein-analysis',
    tags: ['Thermodynamic Band', 'Archetype Classification', 'Hinge Occupation Ratio', 'MetaFickBalancer', 'Enzyme Lens', 'Hinge Lens', 'IBP-ENM'],
  },
  {
    id: 'qps-222-2025',
    title: 'The (2,2,2) Origin of the QPS Algebra: Deriving Particle Characterization from Combinatorial Selection',
    authors: ['Joshua Byrom'],
    date: '2025',
    abstract: 'Caulton (2024) argues that particles should be characterized by the QPS algebra (Position-Momentum-Spin) rather than irreducible representations of the Poincaré group, achieving both dynamical and geometrical innocence. However, the question of why the QPS algebra takes its specific form — nine generators in a 3×3 arrangement with particular commutation relations — remains open. We answer this question by proving that the QPS algebra is the unique maximal Lie algebra compatible with the partition (2,2,2) of 6 and ℤ₂ × ℤ₃ symmetry structure. This partition arises naturally from the octonion/Fano plane structure through the symmetric group S₃, whose order is |S₃| = 6. Our derivation establishes that three spatial dimensions, Heisenberg commutation relations, spin algebra structure, and the orthogonality of sectors all follow necessarily from combinatorial first principles. This provides the missing specification that many physical frameworks leave implicit: not just what structures exist, but why they are the admissible ones.',
    pdf: '/papers/qps_222_origin_v2.pdf',
    status: 'preprint',
    thread: 'Composable Algebra',
    threadLink: '/research/composable-algebra',
    tags: ['QPS Algebra', 'Fano Plane', 'Octonions', 'Particle Physics', 'Lie Algebra', 'Combinatorics'],
  },
];
