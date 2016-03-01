#!/usr/bin/env node

'use strict'

const path = require('path')
const checker = require('../')
const fs = require('fs')

let a = `
$ html5-promotion-checker ./Project
`

if (process.argv.length < 3) {
  console.log('缺少参数!')
  process.exit(1)
}

let projects_root = process.argv[2]


fs.readdirSync(projects_root).forEach(function (file) {
  let stats = fs.lstatSync(path.join(projects_root, file))
  if (stats.isDirectory() && !file.startsWith('.')) {
    work(projects_root, file)
  }
})

function work (projects_root, project_name) {
  let project_root = path.join(projects_root, project_name)
  let config = JSON.parse(fs.readFileSync(path.join(projects_root, project_name, '.html5/config.json'), {encoding: 'utf-8'}))
  let info = JSON.parse(fs.readFileSync(path.join(projects_root, project_name, '.html5/game_info.json'), {encoding: 'utf-8'}))

  checker.checkConfigJSON(project_root, project_name, config)

  checker.checkInfoJSON(project_root, project_name, info)
  
}

console.log('all is ok!')
