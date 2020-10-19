import { promises as fs, createWriteStream } from 'fs';
import path from 'path';

import axios from 'axios';
import cheerio from 'cheerio';
import consola from 'consola';
import shell from 'shelljs';

const urls = [
  {
    text: 'True Legendary Items',
    url: 'https://chronicon.fandom.com/wiki/True_Legendary_Items',
  },
  {
    text: 'Legendary Items',
    url: 'https://chronicon.fandom.com/wiki/Legendary_Items',
  },
];

const combine = (str) => str.split(' ').join('_');

const getImages = async (itemClass, itemType, name, url) => {
  const { data: html } = await axios.get(url);
  const $ = cheerio.load(html);

  const imageUrl = $('#WikiaArticle #mw-content-text figure.article-thumb img.thumbimage').attr('src');

  if (imageUrl) {
    const { data: imgData } = await axios({ url: imageUrl, responseType: 'stream' });

    shell.mkdir('-p', path.normalize(`./src/assets/images/items/${combine(itemClass)}/${combine(itemType)}`));

    new Promise((resolve, reject) => {
      imgData
        .pipe(createWriteStream(path.normalize(`./src/assets/images/items/${combine(itemClass)}/${combine(itemType)}/${name}.png`)))
        .on('finish', () => {
          console.log(name, 'download complete');
          resolve();
        })
        .on('error', (e) => reject(e));
    }).catch(console.log);
  }

  return {
    itemClass,
    itemType,
    name,
    imageUrl,
  };
};

const getItems = async (url) => {
  const { data: html } = await axios.get(url.url);
  const $ = cheerio.load(html);

  const children = $('section#WikiaPage .WikiaPageContentWrapper article#WikiaMainContent #WikiaMainContentContainer #WikiaArticle #mw-content-text.mw-content-ltr.mw-content-text').children();
  const tree = [];

  let index = 0;
  children.not('figure,noscript,#incontent_player.gpt-ad,p,nav').each(function itemContents() {
    if ($(this).is('h2')) {
      if (tree.length > index) {
        index++;
      }
      tree.push({ text: $(this).find('span.mw-headline').text().trim(), nodes: [] });
    } else if ($(this).is('h3')) {
      tree[index].nodes.push({
        text: ($(this).find('span.mw-headline').text().trim())
          .replace('-', ''),
        nodes: [],
      });
    } else {
      $(this).find('li').each(async function listItems() {
        if ($(this).text() !== '' || $(this).find('a').text() !== '') {
          const text = $(this).text() !== '' ? $(this).text().trim() : $(this).find('a').text().trim();
          const value = $(this).find('a').attr('href') ? `https://chronicon.fandom.com${$(this).find('a').attr('href')}` : '';

          console.log(await getImages(
            url.text,
            tree[index].nodes[tree[index].nodes.length - 1].text,
            text,
            value,
          ));

          if (tree[index].nodes.length > 0 && Object.prototype.hasOwnProperty.call(tree[index].nodes[0], 'nodes')) {
            tree[index].nodes[tree[index].nodes.length - 1].nodes.push({ text, value });
          } else {
            tree[index].nodes.push({ text, value });
          }
        }
      });
    }
  });

  return { text: url.text, nodes: tree };
};

(() => {
  Promise.all(urls.map(getItems)).then((tree) => fs.writeFile(path.normalize('./items.json'), JSON.stringify(tree, null, 2)));
  consola.success({ message: 'Items.json file updated', badge: true });
})();
