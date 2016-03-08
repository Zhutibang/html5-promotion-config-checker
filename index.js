'use strict'

const fs = require('fs')
const path = require('path')

/**
 * 检测config.json
 * @param {string} project_root 该项目的根目录    
 */
function checkConfigJSON(project_root, project_name, config) {
  let files = []
  config.edit_page.forEach(page => files.push(page.page))
  files.push(config.preview_file)
  files.forEach(file => {
    if (!fs.existsSync(path.join(project_root, file))) {
      console.log('Project:%s [config.json] 没找到: %s', project_name, file)
      process.exit(1)
    }
  })
}
/**
 * 检测game_info.json
 */
function checkInfoJSON(project_root, project_name, config) {
  //检测替换文件是否正确填写
  for (let page_config_index in config) { // 遍历每一页
    let page_config = config[page_config_index]
    // 检测images
    if (page_config.images) {
      page_config.images.forEach(image_config => {
        let need_file = path.join(project_root, image_config.path, image_config.file_name + '.' + image_config.file_ext)
        if (!fs.existsSync(need_file)) {
          console.log('Project:%s [game_info.json] Image 缺少:%s %s', project_name, image_config.info, image_config.file_name + '.' + image_config.file_ext)
          process.exit(1)
        }
      })
    }
    // 检测texts
    if (page_config.texts) {
      page_config.texts.forEach(text_config => {
        text_config.files.forEach((file, index) => {
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
 * @param {string} project_root description
 * @param {string} project_name description
 * @param {ojbect} config object of plugin.json
 */
function checkPluginJSON(project_root, project_name, config) {
  let plugin_config_names = config.plugins
  for (let index in plugin_config_names) {
    let plugin_config = config.config[plugin_config_names[index]]
    plugin_config.files.forEach(file => {
      let need_file = path.join(project_root, file)
      if (!fs.existsSync(need_file)) {
        console.log('Project:%s [plugin.json] Plugin 缺少: %s %s', project_name, plugin_config.description, file)
        process.exit(1)
      }
      //检测所在的模板是否有标签（仅作提示 ，不作为错误处理）
      let content = fs.readFileSync(need_file, { encoding: 'utf-8' })
      if (content.indexOf(plugin_config['regex']) === -1) {
        console.log('Project:%s [plugin.json] Plugin 缺少标签: %s %s', project_name, plugin_config.regex, file)
      }
    })

  }

}

/**
 * config.json/game_info.json 联合检测 #5 
 * see: https://github.com/Zhutibang/html5-promotion-config-checker/issues/5
 */
function checkConfigAndInfo(project_root, project_name, config, info) {
  if (config.edit_page) {
    config.edit_page.forEach(page => {
      if (!info[page.id]) {
        console.log('Project:%s [config.json+game_info.json] 缺少edit_page: id=%s', project_name, page.id)
        process.exit(1)
      }
    })
  }
}

module.exports = {
  checkConfigJSON: checkConfigJSON,
  checkInfoJSON: checkInfoJSON,
  checkPluginJSON: checkPluginJSON,
  checkConfigAndInfo: checkConfigAndInfo
}
