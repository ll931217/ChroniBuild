/* eslint-disable */
import { promises as fs, createWriteStream } from 'fs'
import path from 'path'

import axios from 'axios'
import cheerio from 'cheerio'
import shell from 'shelljs'

const main = async (download = false) => {
  const url = 'https://steamcommunity.com/sharedfiles/filedetails/?id=1911997938'
  const runeData = {}

  const { data } = await axios.get(url)
  const $ = cheerio.load(data)

  $('.guide.subSections .subSection.detailBox').each(function() {
    const title = $(this).find('.subSectionTitle').text().trim().split(' ')
    const type = title[1]
    const categories = []

    $(this).find('.subSectionDesc .bb_blockquote').each(function() {
      const items = []

      $(this).find('.bb_table_tr').each(function() {
        const itemName = $(this).find('.bb_table_td:first-child').text().trim()
        const itemSrc = $(this).find('img').attr('src')

        if (itemName !== '' && itemSrc) {
          if (download) {
            axios({
              url: itemSrc,
              responseType: 'stream'
            }).then(res => {
              shell.mkdir('-p', path.normalize(`./src/assets/images/${title[0]}/${type}/`))

              new Promise((resolve, reject) => {
                res.data
                .pipe(createWriteStream(path.normalize(`./src/assets/images/${title[0]}/${type}/${itemName}.png`)))
                  .on('finish', () => {
                    console.log(itemName, 'download complete')
                    resolve()
                  })
                  .on('error', e => reject(e))
              }).catch(console.log)
            }).catch(console.log)
          }

          items.push({ name: itemName, src: itemSrc })
        }
      })

      if (items.length > 0) {
        let category = $(this).find('> b > u').text().trim()
        if (category === '') {
          category = $(this).find('u b').text().trim()
        }
        categories.push({ category, items })
      }
    })

    if (categories.length > 0) {
      if (!runeData[title[0]] && typeof runeData[title[0]] !== Array) {
        runeData[title[0]] = []
      }
      runeData[title[0]].push({ type, categories })
    }
  })

  return runeData
}

const sortIntoTree = (data) => {
  const rootTexts = Object.keys(data)
  const tree = []

  rootTexts.forEach(text => {
    const root = { text, nodes: [] }

    data[text].forEach(child => {
      const firstTemp = { text: child.type, nodes: [] }

      child.categories.forEach(category => {
        const secondTemp = { text: category.category, nodes: [] }

        category.items.forEach(item => {
          const imgURL = `/runes/${text}/${child.type}/${item.name}.png`.replace(/\//g, '%2F').replace(/\'/g, '%27')
          secondTemp.nodes.push({ text: item.name, link: { type: 'router-link', key: 'name', value: 'Rune', query: { image: imgURL } } })
        })

        firstTemp.nodes.push(secondTemp)
      })

      root.nodes.push(firstTemp)
    })

    tree.push(root)
  })

  console.log(tree)
  return tree
}

// main(true).then(async images => await fs.writeFile('runes.json', JSON.stringify(images, null, 2)))
// main().then(async images => await fs.writeFile('runes.json', JSON.stringify(images, null, 2)))
// main().then(console.log)
// main().then(sortIntoTree)
main().then(async images => await fs.writeFile(path.normalize('./src/assets/runes_tree.json'), JSON.stringify(sortIntoTree(images), null, 2))).catch(console.log)
