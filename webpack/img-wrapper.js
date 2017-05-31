/**
 * Wraps a MD link in <figure>, proividing a <figcaption>
 * Add <!-- no-fig --> to line to disable
 * @param  {[type]} text [description]
 * @return {[type]}      [description]
 */
function itFigures(text) {
  let match = text.match(/!\[([^\]]+)\]\(([^\s)]+?)(?: "([^)]+)")?\)/);
  if (match) {
    if (text.match(/<!--\s?no-fig\s?->/)) {
      return text;
    }

    let caption = match[3] || match[1];
    return `<figure>\n\n![${match[1]}](${match[2]} "${caption}")\n\n<figcaption>${caption}</figcaption>\n</figure>`;
  }
  // If it doesn't match, return the original string just in case
  return text;
}

function figurePlugin({result}) {
  let lines = result.body.split(/\r?\n/);
  let res = lines.map(itFigures);

  return {
    ...result,
    body: res.join('\n')
  };
}

module.exports = figurePlugin;
