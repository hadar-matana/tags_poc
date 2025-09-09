import { useState } from 'react';
import type { TableEntity } from '@zohan/api/types/tree-api-types';
import { Button } from '@zohan/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@zohan/ui/card';
import { Alert, AlertDescription } from '@zohan/ui/alert';
import { ImageIcon, AlertCircle } from 'lucide-react';

interface EntityImageProps {
  entity: TableEntity;
  className?: string;
}

export const EntityImage = ({ entity, className }: EntityImageProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Create the image endpoint URL directly
  const imageUrl = `http://localhost:3000/api/image/${entity.exclusive_id.tableId}/${entity.exclusive_id.dataStore}`;

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(false);
  };

  const handleRetry = () => {
    setImageError(false);
    setImageLoaded(false);
    // Force image reload by adding a timestamp
    const timestamp = Date.now();
    const reloadUrl = `${imageUrl}&_t=${timestamp}`;
    const img = document.querySelector(`img[src="${imageUrl}"]`) as HTMLImageElement;
    if (img) {
      img.src = reloadUrl;
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImageIcon className="h-4 w-4" />
          Entity Image
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {!imageLoaded && !imageError && (
            <div className="h-48 w-full animate-pulse bg-gray-200 rounded-md" />
          )}
          <img
            src={imageUrl}
            alt={`Image for entity ${entity.exclusive_id.tableId}`}
            className={`h-48 w-full rounded-md object-cover ${
              imageLoaded ? 'block' : 'hidden'
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
          {imageError && (
            <div className="flex h-48 w-full items-center justify-center rounded-md border-2 border-dashed border-gray-300">
              <div className="text-center">
                <AlertCircle className="mx-auto h-8 w-8 text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">Failed to load image</p>
                <Button onClick={handleRetry} size="sm" className="mt-2">
                  Retry
                </Button>
              </div>
            </div>
          )}
        </div>
        <div className="mt-2 text-xs text-gray-500">
          Entity ID: {entity.exclusive_id.tableId}
        </div>
      </CardContent>
    </Card>
  );
};
