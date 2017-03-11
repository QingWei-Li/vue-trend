export function injectStyle (css) {
  // http://stackoverflow.com/questions/524696/how-to-create-a-style-tag-with-javascript
  const tag = document.createElement('style')
  const head = document.head || document.getElementsByTagName('head')[0]

  tag.type = 'text/css'
  head.appendChild(tag)
  tag.appendChild(document.createTextNode(css))

  return tag
}
