const data = require('./EarthPorn-top-processed.json')
const fs = require('fs')
const si = require('../../')
const path = require('path')

si({
  name: path.join(__dirname, '/earthporn'),
  stopwords: ['that', 'the']
})
  .then(db => db.INDEX.STORE.clear().then(() => db))
  .then(db => db.PUT(data, {
    doNotIndexField: ['thumbnail', 'url_overridden_by_dest']
  }).then(
    () => db
  )).then(
    db => db.EXPORT()
  ).then(idx => fs.writeFileSync(
    path.join(__dirname, '/EarthPorn-top-search-index.json'),
    JSON.stringify(idx, null, 2)
  ))
