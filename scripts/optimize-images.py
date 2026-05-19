#!/usr/bin/env python3
"""Export WebP into assets/watches/opt/ from source JPGs in assets/watches/."""
from pathlib import Path
from PIL import Image

SRC = Path(__file__).resolve().parents[1] / 'assets' / 'watches'
OUT = SRC / 'opt'
MAX_W = 720

def main():
    OUT.mkdir(exist_ok=True)
    sources = sorted(SRC.glob('*.jpg'))
    if not sources:
        print('No source JPGs in', SRC)
        return
    for p in sources:
        img = Image.open(p)
        if img.mode != 'RGB':
            img = img.convert('RGB')
        w, h = img.size
        if w > MAX_W:
            img = img.resize((MAX_W, int(h * MAX_W / w)), Image.Resampling.LANCZOS)
        out = OUT / f'{p.stem}.webp'
        img.save(out, 'WEBP', quality=82, method=6)
        print(out.name)

if __name__ == '__main__':
    main()
