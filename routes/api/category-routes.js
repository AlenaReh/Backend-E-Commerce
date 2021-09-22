const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const productData = await Category.findAll({
      include: [{ model: Category }]
    });
    res.json(productData);
}
  catch (err) {
    res.status(500).json(err);
}
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const productData = await Store.findByPk(req.params.id, {
        include: [{ model: Product }]
    });
    res.json(productData);
}
catch (err) {
    res.status(500).json(err);
}
});

router.post('/', (req, res) => {
  // create a new category
  const newCategory = {
    // name: req.body.,
    // description: req.body.
};

try {
    const productData = await Category.create(newCategory);
    res.json(productData);
}
catch (err) {
    console.log(err);
    res.status(500).json({ error: 'error with submission' });
}
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try {
    const ProductData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!productData[0]) {
      res.status(404).json({ message: 'No product with this id!' });
      return;
    }
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  const productUpdatedID = req.body.id;
    try {
      const productData = await Category.destroy({
        where: {
          id: productUpdatedID
        }
      });
        res.json(productData);
        }
        catch (err) {
          res.status(500).json(err);
        }
});

module.exports = router;
