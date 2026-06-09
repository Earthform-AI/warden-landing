# Warden CLI — System Guardian Design Doc

## Brand Connection

The Warden brand protects people in dangerous environments:
- **Underground**: AI drones monitoring miners (the landing page)
- **Digital**: Fano-7 guardian monitoring terminals (this tool)

Same mission, different medium. The system guardian is the Warden's "first landing" — a real, shippable product that demonstrates the protection philosophy before hardware ships.

## Product Summary

**Earthform Warden** is a local-first, open-source Linux terminal guardian. It classifies commands using a Fano-7 algebraic risk model, warns before dangerous operations, and suggests fixes after failures.

Key properties:
- **Passive** — never acts, only labels/warns/educates
- **Local** — runs entirely on the user's machine, no cloud required
- **Fast** — <5ms per classification via Unix socket daemon
- **Algebraic** — uses PG(2,2) geometry, not a blocklist
- **Community** — improved by anonymous beacon telemetry (opt-in)
- **Open** — MIT license, community contributions welcome

## Beacon Network Integration

Warden is the first *consumer* of the Earthform Beacon network for non-FPGA purposes. This validates the beacon as a general-purpose community improvement network.

### What Warden emits (opt-in)
- Risk vectors: 7 floating-point numbers per flagged event
- Label: "WARN", "BLOCK", "CAUTION"
- Compound patterns triggered (which Fano lines activated)
- **NO** command text, paths, filenames, hostnames, or user data

### What Warden pulls
- Community-voted fix patterns (which fixes actually worked)
- Updated risk weights (calibrated from real-world usage)
- New compound risk detections
- Trust scores for packages (future: which pip/npm packages are safe)

### Beacon API requirements (informs beacon development)
- `POST /api/beacons/emit` — already exists, warden uses `channel: "warden-guardian"`
- `GET /api/beacons/pull` — **NEW**: endpoint for pulling community patterns by channel
- `GET /api/beacons/stats` — **NEW**: per-device contribution stats (for soft accounts)
- The "soft account" model (random device_id, no auth) needs beacon to support anonymous contributors

### Beacon development informed by warden needs

| Feature needed | Current state | Priority |
|---|---|---|
| Channel-based routing | Exists (routing_beacons.channel) | ✓ Done |
| Pull endpoint (patterns by channel) | Not implemented | High |
| Soft accounts (device_id tracking) | Not implemented | High |
| Contribution stats per device | Not implemented | Medium |
| Pattern voting (community ranks fixes) | Not implemented | Phase 2 |
| Trust scores (package safety) | Not implemented | Phase 3 |

## Distribution Plan

### Phase 1: pip (current prototype)
```bash
pip install earthform-warden
warden init
```
- Python, works anywhere Python 3.10+ runs
- ~100KB installed (numpy is the only real dep)

### Phase 2: Single binary (Rust)
```bash
curl -sSf https://earthform.ai/install-warden.sh | sh
# (Yes, the irony of curl|sh for a tool that warns about curl|sh)
# Alternative: cargo install earthform-warden
```
- No runtime dependency
- <1ms classification
- Ships with embedded model weights

### Phase 3: System package
```bash
sudo apt install earthform-warden  # PPA
brew install earthform/tap/warden  # macOS
```

## Community Model

### Contributing patterns
Users can submit fix patterns via PR or (future) through the beacon network:
1. Command fails → warden suggests nothing useful
2. User finds the fix themselves
3. Warden offers: "Want to teach me this fix? (y/N)"
4. Pattern submitted to beacon → community votes → becomes official

### Trust model
- Patterns start with low confidence
- Beacon telemetry shows which patterns get used (implicit vote)
- Patterns that consistently help get promoted to "official"
- Maintainers can curate, but community signal drives priority

## Technical Roadmap

| Version | Milestone | Classifier |
|---------|-----------|-----------|
| 0.1 | Pattern-based, bash/zsh hooks, daemon | Regex rules → 7-axis vector |
| 0.2 | Beacon integration live, community patterns | Rules + community weight updates |
| 0.3 | VS Code extension (terminal hook) | Same classifier, different frontend |
| 0.4 | Rust rewrite, single binary | ONNX model with Fano-7 output layer |
| 0.5 | Context-aware (reads .git, package.json, etc.) | Contextual embeddings → 7-axis |
| 1.0 | Self-improving from beacon data | Continuously updated from telemetry |

## Open Questions

1. **How aggressive should default mode be?** Current: warn-only (never blocks by default). Should we ship with `block` mode for obviously catastrophic commands (fork bomb, `rm -rf /`)?

2. **Package trust scoring**: Should warden maintain a local trust database of packages? Beacon could aggregate "this package was installed by N users without incident" signals.

3. **VS Code integration**: The VS Code terminal extension API can intercept commands before execution. This would give warden a GUI home without requiring shell hook setup. Priority?

4. **macOS / WSL support**: The shell hooks work on any POSIX system. macOS is trivial. WSL is high-value (Windows devs learning Linux). Priority?

5. **Education mode**: A `warden explain "iptables -A INPUT -p tcp --dport 22 -j ACCEPT"` command that breaks down what a command does, even if it's not risky? This aligns with the "educate" mission but expands scope.
