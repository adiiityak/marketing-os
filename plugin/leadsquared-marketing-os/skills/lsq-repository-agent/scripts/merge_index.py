"""Tag Content Repository listings into the index format used by the Asset Library.

Input: JSONL rows {path, name, kind: file|folder, size, uri}. Output: index JSON.
Usage: python3 -I merge_index.py out.json in1.jsonl [in2.jsonl ...]
"""
import json, sys, datetime, urllib.parse

BASE = "https://myleadsquared-my.sharepoint.com/personal/shivanshi_dash_leadsquared_com/Documents/Content%20Repository"
DRIVE = "b!TQlnGWpH20Cq3U-lE-j98Ht4VqnhXhBBgVcoJ1QR1g2qBrdtCXPXSJTNPbIuftyd"
IND = {"Education": "Education", "Healthcare": "Healthcare", "ELEVATE": "Events (ELEVATE)",
       "Financial Services": "Fintech / BFSI", "EV": "EV"}
KIND = [("Doc", {"pdf", "docx", "doc", "txt", "md", "msg"}), ("Deck", {"pptx", "ppt", "key"}),
        ("Sheet", {"xlsx", "xls", "csv"}), ("Image", {"png", "jpg", "jpeg", "webp", "svg", "gif"}),
        ("Design source", {"ai", "eps", "psd", "xd", "fig", "indd"}), ("Video", {"mp4", "mov", "webm"}),
        ("Audio", {"mp3", "m4a", "wav"}), ("Transcript", {"vtt", "srt"}), ("Link", {"url", "lnk"}),
        ("Font", {"ttf", "otf", "woff", "woff2"})]


def kind_of(ext):
    for k, s in KIND:
        if ext in s:
            return k
    return "Other"


def six(region, top, rest, raw):
    """Map to the dashboard's six filters; '' means All industries only."""
    lower = "/".join(rest).lower()
    if top in ("ELEVATE", "Events", "Event") or raw.startswith("Events"):
        return "Events India" if region == "India" else "Events US"
    if raw == "Education":
        return "Education"
    if raw == "Healthcare" or (top == "EV" and rest[:1] == ["Healthcare"]):
        return "Healthcare"
    if raw == "Fintech / BFSI":
        return "Fintech / BFSI"
    if "manufactur" in lower or "automotive" in lower:
        return "Manufacturing"
    return ""


def tag(p, r):
    seg = p.split("/")
    s = seg + [""] * 5
    if s[0] == "Products":
        industry, product, cat = "", s[1], (s[2] if len(seg) > 3 else "")
    else:
        industry, product, cat = IND.get(s[1], s[1]), "", (s[2] if len(seg) > 3 else "")
        if s[0] == "India" and s[1] == "Financial Services" and len(seg) > 4:
            cat = s[2] + " / " + s[3]
        industry = six(s[0], s[1], seg[2:], industry)
    name = r.get("name") or seg[-1]
    is_file = r.get("kind") == "file"
    ext = name.rsplit(".", 1)[-1].lower() if is_file and "." in name else ""
    try:
        size = max(int(r.get("size") or 0), 0)
    except (TypeError, ValueError):
        size = 0
    return {"p": p, "n": name, "k": "f" if is_file else "d", "s": size, "x": ext,
            "t": kind_of(ext) if is_file else "Folder", "r": s[0], "i": industry, "pr": product, "c": cat,
            "id": (r.get("uri") or "").rsplit("/", 1)[-1], "w": BASE + "/" + urllib.parse.quote(p)}


def main(out, *inputs):
    seen = {}
    for f in inputs:
        for line in open(f, encoding="utf-8"):
            line = line.strip()
            if not line:
                continue
            r = json.loads(line)
            p = (r.get("path") or "").strip().strip("/")
            if r.get("kind") == "error" or not p or p == "Content Repository":
                continue
            seen[p] = r
    items = [tag(p, r) for p, r in sorted(seen.items())]
    idx = {"generated": datetime.date.today().isoformat(), "drive": DRIVE, "root": "01XWPYNAL7CW3VKI7MKZHJEHRSRSVH6RY2",
           "base": BASE, "count": {"files": sum(i["k"] == "f" for i in items), "folders": sum(i["k"] == "d" for i in items)},
           "items": items}
    json.dump(idx, open(out, "w", encoding="utf-8"), separators=(",", ":"), ensure_ascii=False)
    print(idx["count"])


if __name__ == "__main__":
    main(*sys.argv[1:])
