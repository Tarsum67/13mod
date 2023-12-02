const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// Get all categories with associated products
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: {modle:Product}
    });
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get one category by id with associated products
router.get('/:id', async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findByPk(req.params.id,{
      include: [{ model: Product }]
    });
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new category
router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a category by id
router.put('/:id', async (req, res) => {
	// update a category by its `id` value
	try {
        const categoryData = await Category.update(req.body, {
            where: {
                id: req.params.id,
            },
        });

        if (!categoryData) {
            res.status(404).json({ message: `No Category found by ID: ${req.params.id}.` });
            return;
        }

        res.status(200).json(categoryData);
    } catch (err) {
        res.status(500).json(err);
    };
});


// Delete a category by id
router.delete('/:id', async (req, res) => {
  try {
    const categoryId = req.params.id;
    const deletedRowCount = await Category.destroy({
      where: {  id: req.params.id, },
    });
    if (deletedRowCount === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
