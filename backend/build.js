#!/usr/bin/env node
const { build } = require("estrella")
build({
  entry: "src/main.js",
  outfile: "sub-store.min.js",
  bundle: true,
  minify: true,
  platform: 'node'
})