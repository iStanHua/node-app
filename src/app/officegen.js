// app/officegen.js

import officegen from 'officegen'
import fs from 'fs'

export default {
  run() {
    this.saveWord()
    this.savePpt()
    // this.saveExcel()
  },

  saveWord() {
    // Create an empty Word object:
    let docx = officegen('docx')

    // Officegen calling this function after finishing to generate the docx document:
    docx.on('finalize', function (written) {
      console.log(
        'Finish to create a Microsoft Word document.'
      )
    })

    // Officegen calling this function to report errors:
    docx.on('error', function (err) {
      console.log(err)
    })

    // Create a new paragraph:
    let pObj = docx.createP()

    pObj.addText('Simple')
    pObj.addText(' with color', { color: '000088' })
    pObj.addText(' and back color.', { color: '00ffff', back: '000088' })

    pObj = docx.createP()

    pObj.addText('Since ')
    pObj.addText('officegen 0.2.12', {
      back: '00ffff',
      shdType: 'pct12',
      shdColor: 'ff0000'
    }) // Use pattern in the background.
    pObj.addText(' you can do ')
    pObj.addText('more cool ', { highlight: true }) // Highlight!
    pObj.addText('stuff!', { highlight: 'darkGreen' }) // Different highlight color.

    pObj = docx.createP()

    pObj.addText('Even add ')
    pObj.addText('external link', { link: 'https://github.com' })
    pObj.addText('!')

    pObj = docx.createP()

    pObj.addText('Bold + underline', { bold: true, underline: true })

    pObj = docx.createP({ align: 'center' })

    pObj.addText('Center this text', {
      border: 'dotted',
      borderSize: 12,
      borderColor: '88CCFF'
    })

    pObj = docx.createP()
    pObj.options.align = 'right'

    pObj.addText('Align this text to the right.')

    pObj = docx.createP()

    pObj.addText('Those two lines are in the same paragraph,')
    pObj.addLineBreak()
    pObj.addText('but they are separated by a line break.')

    docx.putPageBreak()

    pObj = docx.createP()

    pObj.addText('Fonts face only.', { font_face: 'Arial' })
    pObj.addText(' Fonts face and size.', { font_face: 'Arial', font_size: 40 })

    docx.putPageBreak()

    pObj = docx.createP()

    // We can even add images:
    pObj.addImage('./src/sources/logo.png')

    let table = [
      [
        {
          val: 'No.',
          opts: {
            cellColWidth: 4261,
            b: true,
            sz: '48',
            shd: {
              fill: '7F7F7F',
              themeFill: 'text1',
              themeFillTint: '80'
            },
            fontFamily: 'Avenir Book'
          }
        },
        {
          val: 'Title1',
          opts: {
            b: true,
            color: 'A00000',
            align: 'right',
            shd: {
              fill: '92CDDC',
              themeFill: 'text1',
              themeFillTint: '80'
            }
          }
        },
        {
          val: 'Title2',
          opts: {
            align: 'center',
            cellColWidth: 42,
            b: true,
            sz: '48',
            shd: {
              fill: '92CDDC',
              themeFill: 'text1',
              themeFillTint: '80'
            }
          }
        }
      ],
      [1, 'All grown-ups were once children', ''],
      [2, 'there is no harm in putting off a piece of work until another day.', ''],
      [
        3,
        'But when it is a matter of baobabs, that always means a catastrophe.',
        ''
      ],
      [4, 'watch out for the baobabs!', 'END']
    ]

    var tableStyle = {
      tableColWidth: 4261,
      tableSize: 24,
      tableColor: 'ada',
      tableAlign: 'left',
      tableFontFamily: 'Comic Sans MS'
    }

    pObj = docx.createTable(table, tableStyle)

    // Let's generate the Word document into a file:

    let out = fs.createWriteStream('./src/sources/example.docx')

    out.on('error', function (err) {
      console.log(err)
    })

    // Async call to generate the output file:
    docx.generate(out)
  },
  savePpt() {
    // Create an empty PowerPoint object:
    let pptx = officegen('pptx')

    // Officegen calling this function after finishing to generate the pptx document:
    pptx.on('finalize', function (written) {
      console.log(
        'Finish to create a Microsoft PowerPoint document.'
      )
    })

    // Officegen calling this function to report errors:
    pptx.on('error', function (err) {
      console.log(err)
    })

    // Let's add a title slide:

    let slide = pptx.makeTitleSlide('Officegen', 'Example to a PowerPoint document')

    // Pie chart slide example:

    slide = pptx.makeNewSlide()
    slide.name = 'Pie Chart slide'
    slide.back = 'ffff00'
    slide.addChart(
      {
        title: 'My production',
        renderType: 'pie',
        data:
          [
            {
              name: 'Oil',
              labels: ['Czech Republic', 'Ireland', 'Germany', 'Australia', 'Austria', 'UK', 'Belgium'],
              values: [301, 201, 165, 139, 128, 99, 60],
              colors: ['ff0000', '00ff00', '0000ff', 'ffff00', 'ff00ff', '00ffff', '000000']
            }
          ]
      }
    )

    // Let's generate the PowerPoint document into a file:

    let out = fs.createWriteStream('./src/sources/example.pptx')

    out.on('error', function (err) {
      console.log(err)
    })

    // Async call to generate the output file:
    pptx.generate(out)
  },
  saveExcel() {
    // Create an empty Excel object:
    let xlsx = officegen('xlsx')

    // Officegen calling this function after finishing to generate the xlsx document:
    xlsx.on('finalize', function (written) {
      console.log(
        'Finish to create a Microsoft Excel document.'
      )
    })

    // Officegen calling this function to report errors:
    xlsx.on('error', function (err) {
      console.log(err)
    })

    let sheet = xlsx.makeNewSheet()
    sheet.name = 'Officegen Excel'

    // Add data using setCell:

    sheet.setCell('E7', 42)
    sheet.setCell('I1', -3)
    sheet.setCell('I2', 3.141592653589)
    sheet.setCell('G102', 'Hello World!')

    // The direct option - two-dimensional array:

    sheet.data[0] = []
    sheet.data[0][0] = 1
    sheet.data[1] = []
    sheet.data[1][3] = 'some'
    sheet.data[1][4] = 'data'
    sheet.data[1][5] = 'goes'
    sheet.data[1][6] = 'here'
    sheet.data[2] = []
    sheet.data[2][5] = 'more text'
    sheet.data[2][6] = 900
    sheet.data[6] = []
    sheet.data[6][2] = 1972

    // Let's generate the Excel document into a file:

    let out = fs.createWriteStream('./src/sources/example.xlsx')

    out.on('error', function (err) {
      console.log(err)
    })

    // Async call to generate the output file:
    xlsx.generate(out)
  }
}