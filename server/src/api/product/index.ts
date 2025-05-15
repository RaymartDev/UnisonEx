import express from 'express';
const router = express.Router();
import prisma from "../../database";

// Create new product
/**
 * Name - Required
 * Price - Required
 * Genre - Not Required
 */
router.post('/', async (req, res) => {
    const { name, category = "General", price } = req.body;
    
    if (!name || !price) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    
    try {
        const findProduct = await prisma.product.findFirst({
            where: {
                AND: [
                    { name: { equals: name } },
                    { category: { equals: category || 'General' } }
                ]
            },
        })

        if (findProduct) {
            return res.status(400).json({ error: 'Product already exists' })
        }

        const product = await prisma.product.create({
            data: { name, category, price: parseFloat(price) }
        });
        return res.status(201).json({
            product,
            message: 'Product created'
        })
    } catch (err) {
        res.status(500).json({ error: 'Something Went Wrong' })
    }
})

// Get all
router.get('/', async (req, res) => {
    try {
        const products = await prisma.product.findMany();
        return res.status(200).json({
            products,
            message: 'Product list found',
        })
    } catch (err) {
        res.status(500).json({ error: 'Something Went Wrong' })
    }
})

// Get one
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const product = await prisma.product.findUnique({
            where: { id: parseInt(id) }
        })
        if (!product) return res.status(404).json({ message: 'Product not found' })
        res.json(product)
    } catch (err) {
        res.status(500).json({ error: 'Something Went Wrong' })
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, category = "General", price } = req.body;

    try {
        const updated = await prisma.product.update({
            where: { id: parseInt(id) },
            data: { name, category, price: parseFloat(price) }
        })

        if (!updated) return res.status(404).json({ message: 'Product not found' })

        return res.status(201).json({ product: updated, message: 'Product updated' })
    } catch (err) {
        res.status(500).json({ error: 'Something Went Wrong' })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await prisma.product.delete({
            where: { id: parseInt(id) }
        })

        if (!deleted) return res.status(404).json({ message: 'Product not found' })

        return res.status(204).json({ product: deleted, message: 'Product deleted' })
    } catch (err) {
        res.status(500).json({ error: 'Something Went Wrong' })
    }
})

export default router;