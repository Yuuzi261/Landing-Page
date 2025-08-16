import { getAssetsFile } from './getAssetsFile'

export function getEffectsImageUrl(name) {
  if (!name) return ''
  return getAssetsFile(`effects/${name}.webp`)
}