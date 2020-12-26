import { promises as fs, createWriteStream } from 'fs';
import path from 'path';

import axios from 'axios';
import cheerio from 'cheerio';
import consola from 'consola';
import shell from 'shelljs';

const url = 'https://steamcommunity.com/sharedfiles/filedetails/?id=2234740799&searchtext=scroll';

const scrollClasses = [
  {
    class: 'Berserker',
    id: '3892934'
  },
  {
    class: 'Templar',
    id: '3892920'
  },
  {
    class: 'Warden',
    id: '3892935'
  },
  {
    class: 'Warlock',
    id: '3892936'
  }
];

const combine = (str) => str.split(' ').join('_');

(async () => {
  const { data: html } = await axios.get(url);
  const $ = cheerio.load(html);
  const tree = []

  scrollClasses.forEach(sc => {
    const node = {
      text: sc.class,
      nodes: []
    };

    $(`#${sc.id}`).find('.bb_table .bb_table_tr').slice(1).each(function() {
      const text = combine($(this).find('.bb_table_td:first-child').text());
      const scrollSrc = $(this).find('.bb_table_td:last-child img').attr('src');

      axios({
        url: scrollSrc,
        responseType: 'stream',
      }).then(res =>{
        shell.mkdir('-p', path.normalize(`./src/assets/images/scrolls/${sc.class}/`));

        new Promise((resolve, reject) => {
          res.data
            .pipe(createWriteStream(path.normalize(`./src/assets/images/scrolls/${sc.class}/${text}.png`)))
            .on('finish', () => {
              consola.log(text, 'download complete');
              resolve();
            })
            .on('error', (e) => reject(e));
        }).catch(consola.error);
      }).catch(consola.error);

      const imgURL = `/scrolls/${sc.class}/${text}.png`.replace(/\//g, '%2F').replace(/'/g, '%27');
      node.nodes.push({
        text,
        link: {
          type: 'route-link',
          key: 'name',
          value: 'Scroll',
          query: { image: imgURL },
        }
      });
    });

    tree.push(node)
  })

  consola.log(tree)
  fs.writeFile(path.normalize('./src/assets/data/scrolls_tree.json'), JSON.stringify(tree, null, 2));
})();
