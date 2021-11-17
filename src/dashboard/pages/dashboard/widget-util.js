/**
 * Given the list of widgets with display properties, find the next open slot in the grid.
 * This probably isn't exact as it is not taking into account the width and height of the cards,
 * but probably close enough for practical purposes -- plus the grid seems to have some amount of correction
 * for overlapping cards.
 * @param widgets - list of widgets
 * @param cols - the number of columns in the grid -- default 3
 * @returns {{x: number, y: number}}
 */
export const findDisplayPlacement = (widgets, cols=3) => {
  if(widgets === undefined || widgets === null || widgets.length === 0) {
    return { x: 0, y: 0 }
  }

  const displayValues = widgets.map(w => w.display);
  const maxY = Math.max(...displayValues.map(o => o.y), 0);

  for(let x = 0; x < cols; x++) {
    for(let y = 0; y <= maxY; y++) {
      // find first open spot
      if(!displayValues.find(v => v.x === x && v.y === y)) {
        return {x, y};
      }
    }
  }

  // reached the end of the line, start a new row
  return {x: 0, y: maxY + 1}
}