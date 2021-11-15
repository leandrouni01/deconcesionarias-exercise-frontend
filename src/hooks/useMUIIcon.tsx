import * as icons from '@mui/icons-material'
import { SvgIcon } from '@mui/material'
import stringSimilarity from 'string-similarity'

function useMUIIcon(iconName:string):typeof SvgIcon {
  const iconsNames = Object.keys(icons)
  var matches = stringSimilarity.findBestMatch(iconName, iconsNames)
  const bestMathch = matches.bestMatch.target
  const icon = (icons as any)[bestMathch]
  return icon
}
export default useMUIIcon