'use strict'

const fs = require('fs')
const path = require('path')

/**
 * 检测config.json
 * @param {string} project_root 该项目的根目录    
 */
function checkConfigJSON (project_root, project_name, config) {
  let files = []
  config.edit_page.forEach(function (page) {
    files.push(page.page)
  })
  files.forEach(function (file) {
    if (!fs.existsSync(path.join(project_root, file))) {
      // console.log(path.join(project_root, file))
      console.log('Project:%s [config.json] 没找到: %s', project_name, file)
      process.exit(1)
    }
  })
}
/**
 * 检测game_info.json
 */
function checkInfoJSON (project_root, project_name, config) {
  for (let page_config_index in config) { // 遍历每一页
    let page_config = config[page_config_index]
    // 检测images
    if (page_config.images) {
      page_config.images.forEach(function (image_config) {
        let need_file = path.join(project_root, image_config.path, image_config.file_name + '.' + image_config.file_ext)
        if (!fs.existsSync(need_file)) {
          console.log('Project:%s [game_info.json] Image 缺少:%s %s', project_name, image_config.info, image_config.file_name + '.' + image_config.file_ext)
          process.exit(1)
        }
      })
    }
    // 检测texts
    if (page_config.texts) {
      page_config.texts.forEach(function (text_config) {
        text_config.files.forEach(function (file, index) {
          let need_file = path.join(project_root, file)
          if (!fs.existsSync(need_file)) {
            console.log('Project:%s [game_info.json] Text 缺少: %s %s', project_name, text_config.name, file)
            process.exit(1)
          }
        })
      })
    }
  }
}
/**
 * 检测plugin.json
 */
function checkPluginJSON (project_root, project_name, config) {
  config = config.config
  for (let plugin_config_name in config) {
    let plugin_config = config[plugin_config_name]
    plugin_config.files.forEach(function (file) {
      let need_file = path.join(project_root, file)
      if (!fs.existsSync(need_file)) {
        console.log('Project:%s [plugin.json] Plugin 缺少: %s %s', project_name, plugin_config.description, file)
        process.exit(1)
      }
    })
  }
}

module.exports = {
  checkConfigJSON: checkConfigJSON,
  checkInfoJSON: checkInfoJSON,
  checkPluginJSON: checkPluginJSON
}
