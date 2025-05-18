import { Product } from '@/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  isManageable?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isManageable = false }) => {
  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
      <CardHeader className="p-0">
        <div className="overflow-hidden">
          <AspectRatio ratio={16 / 9}>
            {product.images && product.images.length > 0 ? (
              <img
                src={product.images[0]}
                alt={product.name}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-muted">
                No image available
              </div>
            )}
          </AspectRatio>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-semibold">{product.name}</h3>
          <Badge variant="outline">${product.price.toFixed(2)}</Badge>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
      </CardContent>
      <CardFooter className="flex gap-2 p-4 pt-0">
        {isManageable ? (
          <>
            <Button asChild variant="outline" size="sm" className="flex-1">
              <Link to={`/dashboard/product/${product.id}`}>
                <Eye className="mr-2 h-4 w-4" />
                View
              </Link>
            </Button>
            <Button asChild size="sm" className="flex-1">
              <Link to={`/dashboard/product/${product.id}/edit`}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </Button>
          </>
        ) : (
          <Button asChild className="w-full">
            <Link to={`/store/${product.storeId}/product/${product.id}`}>
              View Product
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;