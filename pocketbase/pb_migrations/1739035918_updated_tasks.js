/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2602490748")

  // add field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "select645904403",
    "maxSelect": 1,
    "name": "frequency",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "once",
      "daily",
      "weekly",
      "monthly"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2602490748")

  // remove field
  collection.fields.removeById("select645904403")

  return app.save(collection)
})
