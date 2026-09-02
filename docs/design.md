# Pitch — product system (scaffolding)

Pitch is the footballscore interface system. The **marketing brand** is footballscore; Pitch is how screens are built.

**Color and wordmark are not approved.** Do not treat values in `src/app/globals.css` as identity. After [brand-proposals.md](./brand-proposals.md) is signed, this file gets the real ramp, type scale names, and match-row anatomy.

Until then:

| Token (CSS) | Temporary role |
| --- | --- |
| `--bg` / `--surface` / `--ink` / `--muted` / `--line` | Readable Scores UI only |
| `--accent` / `--live` | Temporary emphasis (will be replaced) |
| `--danger` | Errors / red card (will be remapped) |

## Layout scaffolding

- Phone `<768px`, website `≥768px`, split desktop `≥1100px`.
- Scores home: `/matches`. Do not wrap the default product in a device bezel once Phase 3 restyle starts (`docs/brand-plan.md`).
- Match row: home left, away right. Final anatomy is original and chosen after color lock.

## Type scaffolding

Geist Sans. Body ~15–16px, meta 12–13px, scores `tabular-nums` and heavier. Display face TBD.

## Motion scaffolding

150–200ms opacity/transform. Live minute may update; crests do not bounce.
