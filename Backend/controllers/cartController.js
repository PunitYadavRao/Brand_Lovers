import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export const getCart = async (req, res) => {
    try {
        const userId = req.user.userId;

        let cart = await prisma.cart.findUnique({
            where: { userId },
            include: {
                items: {
                    include: {
                        product: {
                            select: {
                                id: true,
                                name: true,
                                price: true,
                                image: true,
                                category: true,
                                subCategory: true
                            }
                        }
                    }
                }
            }
        });
        if (!cart) {
            cart = await prisma.cart.create({
                data: { userId },
                include: {
                    items: {
                        include: {
                            product: {
                                select: {
                                    id: true,
                                    name: true,
                                    price: true,
                                    image: true,
                                    category: true,
                                    subCategory: true
                                }
                            }
                        }
                    }
                }
            });
        }

        res.json({
            success: true,
            data: cart
        });
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch cart'
        });
    }
};
export const addToCart = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { productId, size, quantity = 1 } = req.body;

        if (!productId || !size) {
            return res.status(400).json({
                success: false,
                message: 'Product ID and size are required'
            });
        }

        const product = await prisma.product.findUnique({
            where: { id: parseInt(productId) }
        });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        let cart = await prisma.cart.findUnique({
            where: { userId }
        });

        if (!cart) {
            cart = await prisma.cart.create({
                data: { userId }
            });
        }

        const existingItem = await prisma.cartItem.findFirst({
            where: {
                cartId: cart.id,
                productId: parseInt(productId),
                size
            }
        });

        let cartItem;
        if (existingItem) {
            cartItem = await prisma.cartItem.update({
                where: { id: existingItem.id },
                data: { quantity: existingItem.quantity + parseInt(quantity) },
                include: {
                    product: {
                        select: {
                            id: true,
                            name: true,
                            price: true,
                            image: true
                        }
                    }
                }
            });
        } else {
            cartItem = await prisma.cartItem.create({
                data: {
                    cartId: cart.id,
                    productId: parseInt(productId),
                    size,
                    quantity: parseInt(quantity)
                },
                include: {
                    product: {
                        select: {
                            id: true,
                            name: true,
                            price: true,
                            image: true
                        }
                    }
                }
            });
        }

        res.json({
            success: true,
            message: 'Item added to cart',
            data: cartItem
        });
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to add item to cart'
        });
    }
};

export const updateCartItem = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { itemId } = req.params;
        const { quantity, size } = req.body;

        const cartItem = await prisma.cartItem.findFirst({
            where: {
                id: parseInt(itemId),
                cart: { userId }
            }
        });

        if (!cartItem) {
            return res.status(404).json({
                success: false,
                message: 'Cart item not found'
            });
        }

        const updateData = {};
        if (quantity !== undefined) updateData.quantity = parseInt(quantity);
        if (size !== undefined) updateData.size = size;

        const updatedItem = await prisma.cartItem.update({
            where: { id: parseInt(itemId) },
            data: updateData,
            include: {
                product: {
                    select: {
                        id: true,
                        name: true,
                        price: true,
                        image: true
                    }
                }
            }
        });

        res.json({
            success: true,
            message: 'Cart item updated',
            data: updatedItem
        });
    } catch (error) {
        console.error('Error updating cart item:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update cart item'
        });
    }
};
export const removeFromCart = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { itemId } = req.params;

        const cartItem = await prisma.cartItem.findFirst({
            where: {
                id: parseInt(itemId),
                cart: { userId }
            }
        });

        if (!cartItem) {
            return res.status(404).json({
                success: false,
                message: 'Cart item not found'
            });
        }
        await prisma.cartItem.delete({
            where: { id: parseInt(itemId) }
        });

        res.json({
            success: true,
            message: 'Item removed from cart'
        });
    } catch (error) {
        console.error('Error removing from cart:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to remove item from cart'
        });
    }
};

export const clearCart = async (req, res) => {
    try {
        const userId = req.user.userId;

        const cart = await prisma.cart.findUnique({
            where: { userId }
        });

        if (!cart) {
            return res.json({
                success: true,
                message: 'Cart is already empty'
            });
        }

        await prisma.cartItem.deleteMany({
            where: { cartId: cart.id }
        });

        res.json({
            success: true,
            message: 'Cart cleared'
        });
    } catch (error) {
        console.error('Error clearing cart:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to clear cart'
        });
    }
};
