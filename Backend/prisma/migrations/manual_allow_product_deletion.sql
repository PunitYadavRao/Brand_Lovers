-- Migration: Allow Product Deletion with Order History Preservation
-- This migration allows products to be deleted even if they exist in orders
-- by making productId nullable and storing product snapshot data

-- Step 1: Add new columns with default values for existing data
ALTER TABLE order_items 
ADD COLUMN IF NOT EXISTS "productName" TEXT DEFAULT 'Unknown Product',
ADD COLUMN IF NOT EXISTS "productImage" TEXT DEFAULT '';

-- Step 2: Update existing order_items with actual product data
UPDATE order_items oi
SET 
  "productName" = p.name,
  "productImage" = p.image
FROM products p
WHERE oi."productId" = p.id;

-- Step 3: Make productId nullable
ALTER TABLE order_items 
ALTER COLUMN "productId" DROP NOT NULL;

-- Step 4: Drop existing foreign key constraint
ALTER TABLE order_items 
DROP CONSTRAINT IF EXISTS "order_items_productId_fkey";

-- Step 5: Add new foreign key constraint with ON DELETE SET NULL
ALTER TABLE order_items
ADD CONSTRAINT "order_items_productId_fkey" 
FOREIGN KEY ("productId") 
REFERENCES products(id) 
ON DELETE SET NULL;

-- Verify the changes
SELECT 
  column_name, 
  data_type, 
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name = 'order_items'
ORDER BY ordinal_position;
