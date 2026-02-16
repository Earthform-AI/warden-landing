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
    abstract: 'We show that a single spectral decomposition of the protein Cα contact network simultaneously yields (i) domain boundaries, (ii) mechanical hinge locations, and (iii) per-residue structural role scores — without training data, sequence information, or evolutionary profiles. The method constructs a graph Laplacian from the contact map at 8 Å cutoff and extracts its low-lying eigenvectors. The Fiedler (second-smallest) eigenvector partitions the chain into structural domains; its gradient localises mechanical hinges. Multi-perspective elastic network model (ENM) spring constants, derived from stabiliser profiles over the spectral embedding, produce B-factor predictions with a median Spearman ρ = 0.666 across 110 proteins. For automatic determination of domain count, we introduce silhouette-based k-selection on Ng–Jordan–Weiss (NJW) normalised spectral embeddings, replacing the standard eigengap heuristic. On an expanded benchmark of 36 multi-domain proteins with CATH ground truth, silhouette k-selection achieves 78% accuracy in identifying the correct number of domains (vs. 11% for the eigengap heuristic; p = 2.85 × 10⁻⁶, Wilcoxon signed-rank test). When the correct k is selected, the resulting domain assignments match the oracle (CATH-informed) partition exactly (mean ARI = 0.641). The full pipeline is parameter-light, requiring only the contact cutoff and a silhouette acceptance threshold.',
    pdf: '/papers/ibp_enm_spectral_protein.pdf',
    status: 'preprint',
    thread: 'Spectral Protein Analysis',
    threadLink: '/research/protein-analysis',
    tags: ['IBP-ENM', 'Graph Laplacian', 'Fiedler Vector', 'CATH', 'Domain Detection', 'Spectral Clustering'],
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
