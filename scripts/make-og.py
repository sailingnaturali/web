#!/usr/bin/env python3
"""Generate public/og-image.png — the 1200x630 social share card.

Reproduces the site's "water ramp" gradient (styles.css .sn-hero) + leaf-green
accent + the NI badge + wordmark. Fonts: Georgia (the declared Fraunces
fallback in --font-display) and Helvetica Neue (the Geist sans fallback).

Requires Pillow:  python3 -m pip install pillow
Run from anywhere:  python3 scripts/make-og.py
"""
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os

HERE = os.path.dirname(os.path.abspath(__file__))
PUBLIC = os.path.join(HERE, '..', 'public')
OUT = os.path.join(PUBLIC, 'og-image.png')
LOGO = os.path.join(PUBLIC, 'logo512.png')

W, H = 1200, 630

# Brand palette (from src/styles.css :root)
SKY       = (0xc0, 0xd8, 0xe4)
STEEL     = (0x58, 0x88, 0xa8)
HARBOR    = (0x18, 0x48, 0x70)
DEEP      = (0x08, 0x30, 0x58)
NAVY_DEEP = (0x00, 0x18, 0x3c)
LEAF      = (0x88, 0xb8, 0x68)
PAPER     = (0xfc, 0xfc, 0xfc)
MIST      = (0xd8, 0xe4, 0xe4)

def lerp(a, b, t):
    return tuple(round(a[i] + (b[i] - a[i]) * t) for i in range(3))

# ── 1. Water-ramp vertical gradient (sky→steel→harbor→deep→navy) ──
stops = [(0.0, SKY), (0.32, STEEL), (0.60, HARBOR), (0.82, DEEP), (1.0, NAVY_DEEP)]
img = Image.new('RGB', (W, H))
px = img.load()
for y in range(H):
    t = y / (H - 1)
    for i in range(len(stops) - 1):
        t0, c0 = stops[i]; t1, c1 = stops[i + 1]
        if t0 <= t <= t1:
            col = lerp(c0, c1, (t - t0) / (t1 - t0)); break
    else:
        col = stops[-1][1]
    for x in range(W):
        px[x, y] = col

# ── 2. Soft leaf-green glow, top-right (matches the .sn-hero radial) ──
glow = Image.new('L', (W, H), 0)
ImageDraw.Draw(glow).ellipse(
    [int(W * 0.80) - 520, int(H * 0.10) - 520, int(W * 0.80) + 520, int(H * 0.10) + 520],
    fill=70)
glow = glow.filter(ImageFilter.GaussianBlur(160))
img = Image.composite(Image.new('RGB', (W, H), LEAF), img, glow)

# ── 3. Badge: knock out the paper-white field, keep the circular mark ──
logo = Image.open(LOGO).convert('RGBA')
for corner in [(1, 1), (logo.width - 2, 1), (1, logo.height - 2), (logo.width - 2, logo.height - 2)]:
    ImageDraw.floodfill(logo, corner, (0, 0, 0, 0), thresh=40)
BS = 380
badge = logo.resize((BS, BS), Image.LANCZOS)
bx, by = W - BS - 88, (H - BS) // 2

# soft drop shadow behind the badge
shadow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
shimg = Image.new('RGBA', (BS, BS), (0, 0, 0, 0))
shimg.paste((0, 12, 28, 140), (0, 0), badge.getchannel('A'))
shadow.alpha_composite(shimg, (bx + 8, by + 14))
shadow = shadow.filter(ImageFilter.GaussianBlur(24))
img = img.convert('RGBA')
img.alpha_composite(shadow)
img.alpha_composite(badge, (bx, by))

# ── 4. Text ──
draw = ImageDraw.Draw(img)
wordmark_f = ImageFont.truetype('/System/Library/Fonts/Supplemental/Georgia Bold.ttf', 104)
sub_f = ImageFont.truetype('/System/Library/Fonts/HelveticaNeue.ttc', 38)
MX, ry = 90, 168
draw.rectangle([MX, ry, MX + 96, ry + 6], fill=LEAF)  # brand hairline rule
draw.text((MX, ry + 34), 'Sailing', font=wordmark_f, fill=PAPER)
draw.text((MX, ry + 152), 'Naturali', font=wordmark_f, fill=PAPER)
draw.text((MX, ry + 302), 'All-electric sailing charter · Pacific Northwest',
          font=sub_f, fill=MIST)

img.convert('RGB').save(OUT, 'PNG', optimize=True)
print('wrote', OUT, img.size, f'{os.path.getsize(OUT) // 1024} KB')
