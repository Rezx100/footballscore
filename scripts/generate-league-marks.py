#!/usr/bin/env python3
"""Generate 28 first-class Medal league marks — shield family, not official crests."""

from pathlib import Path

SHIELD = "M32 8L50 16v18c0 12-10 19.5-18 23-8-3.5-18-11-18-23V16Z"
OUT = Path("public/icons/leagues")

# slug, mid, accent, motif svg (inside 64 viewBox)
MARKS = [
    (
        "eng.1",
        "#5B2C8A",
        "#ECECEF",
        '<path d="M32 22c-3 0-5 2.2-5 5.1 0 4.2 5 8.9 5 8.9s5-4.7 5-8.9c0-2.9-2-5.1-5-5.1Z" fill="{accent}"/>'
        '<path d="M27 21.5h10l-1.2 2.6H28.2Z" fill="{accent}"/>',
    ),
    (
        "esp.1",
        "#E85D04",
        "#F5F5F7",
        '<path d="M20 24h24v4H20Zm0 7h24v6H20Z" fill="{accent}"/>',
    ),
    (
        "ger.1",
        "#D20515",
        "#ECECEF",
        '<path d="M32 21l4.2 3.2-1.4 5.2H29.2L27.8 24.2 32 21Zm-7 9.5 7 2.2 7-2.2v6.8c-4.4 1.8-9.6 1.8-14 0Z" fill="{accent}"/>',
    ),
    (
        "ita.1",
        "#024994",
        "#ECECEF",
        '<path d="M22 22h6v20h-6Zm7 0h6v20h-6Zm7 0h6v20h-6Z" fill="{accent}" fill-opacity=".95"/>'
        '<path d="M29 22h6v20h-6Z" fill="#C17A3A" fill-opacity=".55"/>',
    ),
    (
        "fra.1",
        "#122B5C",
        "#DAE025",
        '<path d="M32 20l10 6v12l-10 6-10-6V26Z" fill="none" stroke="{accent}" stroke-width="2.2"/>'
        '<path d="M24 32h16" stroke="{accent}" stroke-width="2.2"/>',
    ),
    (
        "uefa.champions",
        "#0B2A6B",
        "#4C8DFF",
        '<path d="M32 20l2.2 6.6H41l-5.4 4 2.1 6.5L32 33.4l-5.7 3.7 2.1-6.5-5.4-4h6.8Z" fill="{accent}"/>',
    ),
    (
        "uefa.europa",
        "#F68E27",
        "#2A1810",
        '<path d="M22 26c4-6 16-6 20 0-3 1.5-5.5 1.5-10 1.5S25 27.5 22 26Zm2 6c3 7 13 7 16 0" fill="none" stroke="{accent}" stroke-width="2.4" stroke-linecap="round"/>',
    ),
    (
        "uefa.europa.conf",
        "#1B8A4A",
        "#ECECEF",
        '<path d="M32 22c6 4 10 10 10 14s-4 8-10 8-10-4-10-8 4-10 10-14Z" fill="{accent}"/>'
        '<path d="M32 26v14" stroke="#1B8A4A" stroke-width="2"/>',
    ),
    (
        "uefa.super_cup",
        "#1A4A8C",
        "#ECECEF",
        '<path d="M24 22h16v8c0 6-4 10-8 12-4-2-8-6-8-12Z" fill="{accent}"/>'
        '<path d="M28 44h8" stroke="{accent}" stroke-width="2.2" stroke-linecap="round"/>',
    ),
    (
        "fifa.world",
        "#326295",
        "#ECECEF",
        '<circle cx="32" cy="32" r="12" fill="none" stroke="{accent}" stroke-width="2.2"/>'
        '<path d="M20 32h24M32 20c4 4 6 8 6 12s-2 8-6 12c-4-4-6-8-6-12s2-8 6-12Z" fill="none" stroke="{accent}" stroke-width="1.8"/>',
    ),
    (
        "fifa.cwc",
        "#8B6914",
        "#E0B84A",
        '<path d="M24 24h16v7c0 5-3.4 8.4-8 10-4.6-1.6-8-5-8-10Z" fill="{accent}"/>'
        '<circle cx="32" cy="22" r="3.2" fill="{accent}"/>',
    ),
    (
        "uefa.nations",
        "#0E3D6E",
        "#4EA1FF",
        '<path d="M32 20l4 4-4 4-4-4Zm8 8 4 4-4 4-4-4Zm-16 0 4 4-4 4-4-4Zm8 8 4 4-4 4-4-4Z" fill="{accent}"/>',
    ),
    (
        "eng.2",
        "#1D4E89",
        "#ECECEF",
        '<path d="M32 22c-3.2 0-5.2 2.4-5.2 5.4 0 4.4 5.2 9.4 5.2 9.4s5.2-5 5.2-9.4c0-3-2-5.4-5.2-5.4Z" fill="{accent}"/>',
    ),
    (
        "eng.fa",
        "#C8102E",
        "#ECECEF",
        '<path d="M32 22c2 3 6 4 6 8s-2.6 8-6 10c-3.4-2-6-6-6-10s4-5 6-8Z" fill="{accent}"/>',
    ),
    (
        "usa.1",
        "#C8102E",
        "#F5F5F7",
        '<path d="M22 24h20v3H22Zm0 6h20v3H22Zm0 6h20v3H22Z" fill="{accent}"/>'
        '<path d="M32 21.5l1.6 3.2 3.5.4-2.6 2.4.7 3.4L32 29.2l-3.2 1.7.7-3.4-2.6-2.4 3.5-.4Z" fill="#1A6BB5"/>',
    ),
    (
        "mex.1",
        "#006847",
        "#ECECEF",
        '<path d="M32 21 42 36H22Z" fill="{accent}"/>'
        '<circle cx="32" cy="33" r="4" fill="#CE1126"/>',
    ),
    (
        "conmebol.libertadores",
        "#0B3D2E",
        "#C9A227",
        '<path d="M32 20l3 8h8l-6.5 5 2.5 8L32 36l-7 5 2.5-8L21 28h8Z" fill="{accent}"/>',
    ),
    (
        "bra.1",
        "#009B3A",
        "#FEDD00",
        '<path d="M32 20 46 32 32 44 18 32Z" fill="{accent}"/>'
        '<circle cx="32" cy="32" r="4.5" fill="#122B5C"/>',
    ),
    (
        "arg.1",
        "#74ACDF",
        "#F6B40E",
        '<circle cx="32" cy="32" r="6" fill="{accent}"/>'
        '<path d="M32 20v6M32 38v6M20 32h6M38 32h6M23 23l4 4M37 37l4 4M41 23l-4 4M27 37l-4 4" stroke="{accent}" stroke-width="2" stroke-linecap="round"/>',
    ),
    (
        "concacaf.leagues.cup",
        "#00A0E3",
        "#ECECEF",
        '<path d="M21 24h10v8c0 4-2 6.5-5 8-3-1.5-5-4-5-8Zm12 0h10v8c0 4-2 6.5-5 8-3-1.5-5-4-5-8Z" fill="{accent}"/>',
    ),
    (
        "ned.1",
        "#F36C21",
        "#2A1810",
        '<path d="M32 21c-3 0-5 2-5 5 0 5 5 10 5 10s5-5 5-10c0-3-2-5-5-5Zm-7 8c2 1 4 1 7 1s5 0 7-1c-1 5-5 10-7 13-2-3-6-8-7-13Z" fill="{accent}"/>',
    ),
    (
        "por.1",
        "#006600",
        "#FF0000",
        '<circle cx="32" cy="32" r="10" fill="{accent}"/>'
        '<circle cx="32" cy="27" r="1.6" fill="#ECECEF"/>'
        '<circle cx="27.5" cy="31" r="1.6" fill="#ECECEF"/>'
        '<circle cx="36.5" cy="31" r="1.6" fill="#ECECEF"/>'
        '<circle cx="29" cy="36.5" r="1.6" fill="#ECECEF"/>'
        '<circle cx="35" cy="36.5" r="1.6" fill="#ECECEF"/>',
    ),
    (
        "sco.1",
        "#1B4F72",
        "#ECECEF",
        '<path d="M22 22 42 42M42 22 22 42" stroke="{accent}" stroke-width="3.4" stroke-linecap="round"/>',
    ),
    (
        "ksa.1",
        "#006C35",
        "#C4A35A",
        '<path d="M22 34h20M24 30l8-6 8 6M26 38h12" stroke="{accent}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>',
    ),
    (
        "jpn.1",
        "#E60012",
        "#ECECEF",
        '<circle cx="32" cy="32" r="7" fill="{accent}"/>'
        '<path d="M32 20v5M32 39v5M20 32h5M39 32h5" stroke="{accent}" stroke-width="2" stroke-linecap="round"/>',
    ),
    (
        "aus.1",
        "#F36C00",
        "#ECECEF",
        '<circle cx="32" cy="24" r="2" fill="{accent}"/>'
        '<circle cx="26" cy="34" r="2" fill="{accent}"/>'
        '<circle cx="38" cy="34" r="2" fill="{accent}"/>'
        '<circle cx="32" cy="40" r="1.5" fill="{accent}"/>'
        '<circle cx="34.5" cy="31" r="1.2" fill="{accent}"/>',
    ),
    (
        "usa.nwsl",
        "#E31C79",
        "#ECECEF",
        '<path d="M22 28h20v4H22Z" fill="{accent}"/>'
        '<path d="M32 20l2 4.2h4.4l-3.5 2.7 1.3 4.3L32 28.6 27.8 31.2l1.3-4.3-3.5-2.7H30Z" fill="{accent}"/>',
    ),
    (
        "concacaf.champions",
        "#0033A0",
        "#4D7FFF",
        '<path d="M32 20l2.4 7H42l-6 4.6 2.2 7L32 34.4 25.8 38.6l2.2-7-6-4.6h7.6Z" fill="{accent}"/>',
    ),
]


def svg(mid: str, accent: str, motif: str) -> str:
    body = motif.format(accent=accent)
    return (
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">'
        f'<path d="{SHIELD}" fill="{mid}"/>'
        f"{body}"
        "</svg>\n"
    )


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for slug, mid, accent, motif in MARKS:
        path = OUT / f"{slug}.svg"
        path.write_text(svg(mid, accent, motif), encoding="utf-8")
        print(path)


if __name__ == "__main__":
    main()
