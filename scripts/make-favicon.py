#!/usr/bin/env python3
"""One 32x32 pixel catamaran, two brand palettes -> favicon.svg + png/ico.

ponytail: the grid below IS the source of art. Edit it, re-run, ship.
Usage: mkfav.py <eng|apex> --ascii | --svg | --png SIZE OUT | --ico OUT
"""
import sys

N = 32
grid = [['.'] * N for _ in range(N)]


def row(y, x0, x1, c):
    for x in range(x0, x1 + 1):
        grid[y][x] = c


# mainsail, staircase leech (W = sail)
for y, x0 in {3: 15, 4: 15, 5: 14, 6: 14, 7: 13, 8: 13, 9: 12, 10: 12, 11: 11,
              12: 11, 13: 10, 14: 10, 15: 9, 16: 9, 17: 8, 18: 8}.items():
    row(y, x0, 15, 'W')
# jib
for y, x1 in {9: 17, 10: 18, 11: 18, 12: 19, 13: 19, 14: 20, 15: 20, 16: 21,
              17: 21, 18: 22, 19: 22, 20: 23}.items():
    row(y, 17, x1, 'W')
# mast (R = rig) + boom (M = accent band)
for y in range(2, 21):
    grid[y][16] = 'R'
row(19, 8, 16, 'M')
# catamaran: bridgedeck over two hulls (H)
row(21, 6, 25, 'H')
row(22, 6, 11, 'H'); row(22, 20, 25, 'H')
row(23, 7, 11, 'H'); row(23, 20, 24, 'H')
row(24, 8, 11, 'H'); row(24, 20, 23, 'H')
# water (B) with waterline (D)
row(25, 3, 8, 'B'); row(25, 9, 23, 'D'); row(25, 24, 28, 'B')
row(27, 5, 26, 'B')
row(29, 10, 21, 'B')

THEMES = {
    # engineering.sailingnaturali.com — dark theme
    'eng': dict(bg='#18222D', W='#E9EEF2', R='#9CC87C', M='#9CC87C',
                H='#9CC87C', D='#006030', B='#184870', outline=None, border=None),
    # sailingnaturali.com — light theme, sails outlined so they read on paper
    'apex': dict(bg='#FCFCFC', W='#FCFCFC', R='#002448', M='#006030',
                 H='#002448', D='#006030', B='#5888A8',
                 outline='#002448', border='#002448'),
}


def render(t):
    """-> {(x,y): '#hex'}"""
    px = {}
    for y in range(N):
        for x in range(N):
            c = grid[y][x]
            if c != '.':
                px[(x, y)] = t[c]
    if t['outline']:  # ring the sails so white-on-white stays legible
        for (x, y), _ in list(px.items()):
            if grid[y][x] != 'W':
                continue
            for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                nx, ny = x + dx, y + dy
                n = grid[ny][nx] if 0 <= nx < N and 0 <= ny < N else '.'
                if n not in ('W', 'R', 'M'):
                    px[(x, y)] = t['outline']
                    break
    if t['border']:
        for i in range(N):
            for p in ((i, 0), (i, N - 1), (0, i), (N - 1, i)):
                px[p] = t['border']
    return px


def svg(t, px):
    out = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {N} {N}" '
           'shape-rendering="crispEdges">',
           f'  <rect width="{N}" height="{N}" fill="{t["bg"]}"/>']
    for y in range(N):  # merge horizontal runs of equal color
        x = 0
        while x < N:
            c = px.get((x, y))
            if c is None or c == t['bg']:
                x += 1
                continue
            w = 1
            while x + w < N and px.get((x + w, y)) == c:
                w += 1
            out.append(f'  <rect x="{x}" y="{y}" width="{w}" height="1" fill="{c}"/>')
            x += w
    return '\n'.join(out) + '\n</svg>\n'


def main():
    name, mode = sys.argv[1], sys.argv[2]
    t = THEMES[name]
    px = render(t)
    if mode == '--ascii':
        for y in range(N):
            print(''.join(grid[y][x] if (x, y) in px else '.' for x in range(N)))
        return
    if mode == '--svg':
        sys.stdout.write(svg(t, px))
        return
    from PIL import Image
    img = Image.new('RGB', (N, N), t['bg'])
    for (x, y), c in px.items():
        img.putpixel((x, y), tuple(int(c[i:i + 2], 16) for i in (1, 3, 5)))
    if mode == '--png':
        size, out = int(sys.argv[3]), sys.argv[4]
        img.resize((size, size), Image.NEAREST).save(out)
    elif mode == '--ico':
        img.save(sys.argv[3], sizes=[(16, 16), (32, 32), (48, 48)])


if __name__ == '__main__':
    main()
