const inquirer = require('inquirer')
const path = require('path')
const fs = require('fs')
const { Transform } = require('stream')
const ejs = require('ejs')

inquirer
  .prompt([
    {
      type: 'input',
      name: 'name',
      message: 'file name?',
    },
    {
      type: 'input',
      name: 'title',
      message: 'document title?',
    },
  ])
  .then((answers) => {
    const fileName = answers.name
    const title = answers.title
    const tempPath = path.join(__dirname, 'template.html')
    const filePath = path.join(__dirname, `${fileName}.html`)
    const read = fs.createReadStream(tempPath)
    const write = fs.createWriteStream(filePath)

    const transformStream = new Transform({
      transform(chunk, encoding, callback) {
        const input = chunk.toString()
        const output = ejs.render(input, {
          title,
        })
        callback(null, output)
      },
    })

    read.pipe(transformStream).pipe(write)
  })
