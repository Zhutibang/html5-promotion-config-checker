'use strict'
const path = require('path')

var checker = require('./')

var projects_root = path.join(__dirname, './Project')

var project_name = 'yimiao'
var project_root = path.join(projects_root, project_name)

var config = require(path.join(projects_root, project_name,'.html5/config.json'))
var info = require(path.join(projects_root, project_name,'.html5/game_info.json'))
var plugin = require(path.join(projects_root, project_name,'.html5/plugin.json'))


// checker.checkConfigJSON(project_root, project_name, config)

// checker.checkInfoJSON(project_root, project_name,info)


checker.checkPluginJSON(project_root, project_name, plugin)
// console.log(config)

