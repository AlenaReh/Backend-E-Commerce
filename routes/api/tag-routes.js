const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }]
    });
    res.json(tagData);
}
  catch (err) {
    res.status(500).json(err);
}
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
        include: [{ model: Product }]
    });
    res.json(tagData);
}
catch (err) {
    res.status(500).json(err);
}
});

router.post('/', async (req, res) => {
  // create a new tag
  console.log("tags", req.body)
  const newTag = {
    tag_name: req.body.tag_name
};
try {
    const tagData = await Tag.create(newTag);
    res.json(tagData);
}
catch (err) {
    console.log(err);
    res.status(500).json({ error: 'error with submission' });
}
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!tagData[0]) {
      res.status(404).json({ message: 'No tag with this id found!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  const tagUpdatedID = req.params.id;
    try {
      const tagData = await Tag.destroy({
        where: {
          id: tagUpdatedID
        }
      });
        res.json(tagData);
        }
        catch (err) {
          res.status(500).json(err);
        }
});

module.exports = router;
