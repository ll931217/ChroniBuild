export const capitalize = (word) => {
  const letters = word.split('');
  letters[0] = letters[0].toUpperCase();
  return letters.join('');
};

export const convert = (level, classColor, data, text) => {
  let desc = text;

  if (/(DAMAGE%)/.test(desc)) {
    desc = desc.replace(/(DAMAGE%)/, data.damage[level - 1]);
  }

  if (/(EFFECT)/.test(desc)) {
    desc = desc.replace(/(EFFECT)/, data.effect[level - 1]);
  }

  if (/(PROC)/.test(desc)) {
    desc = desc.replace(/(PROC)/, data.proc[level - 1]);
  }

  if (/(DURATION)/.test(desc)) {
    desc = desc.replace(/(DURATION)/, data.duration[level - 1]);
  }

  if (/(VALUE)/.test(desc)) {
    desc = desc.replace(/(VALUE)/, data.value[level - 1]);
  }

  if (/(REQUIRED)/.test(desc)) {
    desc = desc.replace(/(REQUIRED)/, data.required[level - 1]);
  }

  if (/(RANGE)/.test(desc)) {
    desc = desc.replace(/(RANGE)/, data.range[level - 1]);
  }

  if (/(XDAM)/.test(desc)) {
    desc = desc.replace(/(\sXDAM)/, '');
  }

  if (/(\|\w+(\s\|*\w+)*¥)/.test(desc)) {
    desc = desc.replaceAll(/(\|\w+(\s\|\w+)*¥)/g, (matched) => `<span class="class ${classColor.toLowerCase()}">${matched.replaceAll('|', '').replaceAll('¥', '')}</span>`);
  }

  if (/(_E\w{2}_\w+¥)/.test(desc)) {
    const damageElements = ['physical', 'lightning', 'fire', 'holy', 'ethereal', 'poison', 'shadow', 'frost'];
    damageElements.forEach((de) => {
      const regex = new RegExp(`_E${de.slice(0, 2).toUpperCase()}_${capitalize(de)}¥`);
      if (regex.test(desc)) {
        desc = desc.replace(regex, `<span class="damage ${de}">${capitalize(de)}</span>`);
      }
    });
  }

  return desc;
};
