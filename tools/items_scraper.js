import fsModule from 'fs';
import path from 'path';
import util from 'util';

import axios from 'axios';
import cheerio from 'cheerio';

const fs = fsModule.promises;
const url = 'https://chronicon.fandom.com/wiki/True_Legendary_Items';

(async () => {
  const { data: html } = await axios.get(url);
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
      $(this).find('li').each(function listItems() {
        if ($(this).text() !== '' || $(this).find('a').text() !== '') {
          const text = $(this).text() !== '' ? $(this).text().trim() : $(this).find('a').text().trim();
          const value = $(this).find('a').attr('href') ? `https://chronicon.fandom.com${$(this).find('a').attr('href')}` : '';

          if (tree[index].nodes.length > 0 && Object.prototype.hasOwnProperty.call(tree[index].nodes[0], 'nodes')) {
            tree[index].nodes[tree[index].nodes.length - 1].nodes.push({ text, value });
          } else {
            tree[index].nodes.push({ text, value });
          }
        }
      });
    }
  });

  await fs.writeFile(path.normalize('./items.json'), JSON.stringify(tree, null, 2));
  console.log(util.inspect(tree, { color: true, depth: 6 }));
})();
