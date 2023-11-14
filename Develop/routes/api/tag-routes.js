const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// Get all tags with associated Product data
router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: Product,
    });
    res.status(200).json(tags);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get one tag by id with associated Product data
router.get('/:id', async (req, res) => {
  try {
    const tagId = req.params.id;
    const tag = await Tag.findByPk(tagId, {
      include: Product,
    });
    if (!tag) {
      return res.status(404).json({ error: 'Tag not found' });
    }
    res.status(200).json(tag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new tag
router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(201).json(newTag);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Bad Request' });
  }
});

// Update a tag's name by id
router.put('/:id', async (req, res) => {
  try {
    const tagId = req.params.id;
    const [updatedRowsCount] = await Tag.update(req.body, {
      where: { id: tagId },
    });
    if (updatedRowsCount === 0) {
      return res.status(404).json({ error: 'Tag not found' });
    }
    res.status(200).json({ message: 'Tag updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Bad Request' });
  }
});

// Delete a tag by id
router.delete('/:id', async (req, res) => {
  try {
    const tagId = req.params.id;
    const deletedRowCount = await Tag.destroy({
      where: { id: tagId },
    });
    if (deletedRowCount === 0) {
      return res.status(404).json({ error: 'Tag not found' });
    }
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
