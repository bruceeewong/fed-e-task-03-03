const express = require('express')
const fs = require('fs')
const template = require('art-template')

const app = express()
const PORT = 3000

app.get('/', (req, res) => {
  // 1. 获取页面模板
  const templateStr = fs.readFileSync('./index.html', 'utf-8')
  
  // 2. 获取数据
  const jsonData = JSON.parse(fs.readFileSync('./data.json', 'utf-8'))

  // 3. 渲染: 数据+模板=结果
  const html = template.render(templateStr, jsonData)
  // 4. 返回渲染结果给客户端
  res.send(html)
})

app.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`)
})