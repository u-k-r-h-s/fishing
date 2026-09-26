#!/usr/bin/env bash
# Generates short, silent, brand-colored placeholder video clips so the
# video storytelling and social-reel components work out of the box.
# Requires ffmpeg. Run with: bash scripts/generate-placeholder-videos.sh
#
# These are DEMO videos only — replace the files under public/videos/
# with real footage whenever you're ready; filenames can stay the same
# (or update the paths in src/data/videos.ts / src/data/social.ts).
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
VIDEOS_DIR="$ROOT/public/videos"
SOCIAL_DIR="$VIDEOS_DIR/social"

mkdir -p "$VIDEOS_DIR" "$SOCIAL_DIR"

make_clip() {
  local out="$1" w="$2" h="$3" c0="$4" c1="$5" type="$6"
  ffmpeg -y -loglevel error \
    -f lavfi -i "gradients=size=${w}x${h}:duration=6:speed=0.03:c0=${c0}:c1=${c1}:type=${type}:rate=24" \
    -c:v libx264 -pix_fmt yuv420p -movflags +faststart -an \
    "$out"
}

# Landscape (16:9) storytelling videos
make_clip "$VIDEOS_DIR/selection.mp4" 960 540 "#062A3A" "#0EA5C6" radial
make_clip "$VIDEOS_DIR/cleaning.mp4" 960 540 "#075985" "#CFFAF0" linear
make_clip "$VIDEOS_DIR/packaging.mp4" 960 540 "#0EA5C6" "#062A3A" circular

# Vertical (9:16) social reels
make_clip "$SOCIAL_DIR/reel-1.mp4" 540 960 "#062A3A" "#0EA5C6" spiral
make_clip "$SOCIAL_DIR/reel-2.mp4" 540 960 "#075985" "#0EA5C6" radial
make_clip "$SOCIAL_DIR/reel-3.mp4" 540 960 "#0EA5C6" "#CFFAF0" square

echo "Placeholder videos generated in public/videos/"
