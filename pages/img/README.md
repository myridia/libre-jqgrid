identify -format "%wx%h"  screenshot.png
identify -format "%wx%h"  service .png
identify -format "%wx%h"  service.png
identify -format "%wx%h"  spelltrainer_icon.png
convert source.png -resize 320x320 screenshot.png
convert source.png -resize 192x192 icon.png
convert source.png -resize 104x104 logo.png
convert source.png -resize 519x519 landing.png
convert source.png -resize 64x64 ../favicon.ico
convert source.png -resize 384x384 ../favicon.png
