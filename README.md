# Phaser+Typescript+Webpack game template

## What's included

* Set of classes for building an adaptive games
* Convenient asset management: preload only essential assets and then lazy-load everything else
* ...

## How to start

1) Copy this repo
2) Use `gulp build` to build example game (which comes with this repo)


## Gulp tasks

* `build [--release]` — build game
* `serve` — start dev server (using browser-sync)
* `clean` — clean up project folder
* `manifest` — generate manifest.json (describes all assets)

# API

...

## Project Structure

* *assets/* — folder with assets (surprise!). 
* *src/* — game source code
* *tools/* — scripts for compiling/managing assets/other tasks
* *web/* — all static resources
* *build/* — folder with built game. Includes all files from assets and web folder


## TODO
* Add TSLint check to webpack (tslint-loader)
* Add assets autocomplete
* Add compile-time spritesheet building
* Finish this readme
