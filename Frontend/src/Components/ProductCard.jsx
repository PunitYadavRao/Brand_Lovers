import React from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '@/hooks/useShop';
import { formatCurrency } from '@/utils/utils';
import { cn } from '@/utils/utils';


const ProductCard = ({ product, className = '' }) => {
    const { currency } = useShop();

    return (
        <Link
            to={`/product/${product.id}`}
            className={cn(
                'group block bg-white rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg',
                className
            )}
        >

            <div className="relative aspect-square overflow-hidden bg-gray-100">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                />


                {product.bestseller && (
                    <div className="absolute top-3 left-3 bg-[var(--color-accent)] text-gray-900 px-3 py-1 rounded-full text-xs font-semibold">
                        Bestseller
                    </div>
                )}


            </div>


            <div className="p-4">
                <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1 group-hover:text-[var(--color-accent)] transition-colors">
                    {product.name}
                </h3>

                <p className="text-xs text-gray-500 mb-2">
                    {product.category} • {product.subCategory}
                </p>

                <p className="text-lg font-semibold text-gray-900">
                    {formatCurrency(product.price, currency)}
                </p>
            </div>
        </Link>
    );
};

export default ProductCard;
