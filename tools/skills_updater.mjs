import { promises as fs } from 'fs';
import path from 'path';

import axios from 'axios'

const engineDataRoot = 'https://raw.githubusercontent.com/gabriel-dehan/chronicondb-client/main/src/engine/data/'

const { data: versions } = await axios.get(engineDataRoot + 'patches.json')
const latestVersion = versions[versions.length - 1]
console.log('Versions:', versions)
console.log('Latest Version:', latestVersion)

try {
  const { data: skills } = await axios.get(engineDataRoot + latestVersion + '/extracts/skillsByClass.json')
  console.log('Skills:', skills)
  const obj = {
    version: latestVersion,
    tree: skills
  }

  await fs.writeFile(path.normalize('../src/assets/data/skilldata.json'), JSON.stringify(obj, null, 2))
} catch (err) {
  console.log('Error:', err)
  if (err.response && err.response.data) {
    console.log('Error Data:', err.response.data)
  }
}