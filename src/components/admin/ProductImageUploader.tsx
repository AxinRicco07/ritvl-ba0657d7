
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, X, Plus, FileImage, Link as LinkIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProductImage {
  id: string;
  url: string;
  file?: File;
  isPrimary?: boolean;
}

interface ProductImageUploaderProps {
  images: ProductImage[];
  onChange: (images: ProductImage[]) => void;
}

const ProductImageUploader: React.FC<ProductImageUploaderProps> = ({ images, onChange }) => {
  const [activeTab, setActiveTab] = useState<string>("upload");
  const [imageUrl, setImageUrl] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newImages = [...images];
      
      Array.from(files).forEach(file => {
        const imageUrl = URL.createObjectURL(file);
        newImages.push({
          id: crypto.randomUUID(),
          url: imageUrl,
          file: file,
          isPrimary: newImages.length === 0, // First image is main by default
        });
      });
      
      onChange(newImages);
      
      // Reset the input to allow selecting the same file again
      e.target.value = '';
    }
  };

  const handleUrlAdd = () => {
    if (imageUrl && imageUrl.trim() !== "") {
      const newImage = {
        id: crypto.randomUUID(),
        url: imageUrl,
        isPrimary: images.length === 0, // First image is main by default
      };
      
      onChange([...images, newImage]);
      setImageUrl("");
    }
  };

  const handleRemoveImage = (id: string) => {
    const updatedImages = images.filter(img => img.id !== id);
    
    // If we removed the main image, set the first remaining image as main
    if (images.find(img => img.id === id)?.isPrimary && updatedImages.length > 0) {
      updatedImages[0].isPrimary = true;
    }
    
    onChange(updatedImages);
  };

  const handleSetMainImage = (id: string) => {
    const updatedImages = images.map(img => ({
      ...img,
      isPrimary: img.id === id
    }));
    
    onChange(updatedImages);
  };

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="upload" className="flex items-center gap-2">
            <Upload className="h-4 w-4" /> Upload Files
          </TabsTrigger>
          <TabsTrigger value="url" className="flex items-center gap-2">
            <LinkIcon className="h-4 w-4" /> Add URL
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="upload" className="mt-0">
          <div className="border-2 border-dashed border-blue-200 rounded-lg p-6 text-center hover:bg-blue-50/50 transition-colors">
            <Input
              type="file"
              id="image-upload"
              onChange={handleFileChange}
              accept="image/*"
              multiple
              className="hidden"
            />
            <Label htmlFor="image-upload" className="flex flex-col items-center cursor-pointer">
              <FileImage className="h-12 w-12 text-blue-500 mb-2" />
              <span className="text-lg font-medium mb-1">Drag & drop or click to upload</span>
              <span className="text-sm text-muted-foreground">
                Support: JPG, PNG, WebP (Max: 5MB)
              </span>
            </Label>
          </div>
        </TabsContent>
        
        <TabsContent value="url" className="mt-0">
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                type="url" 
                placeholder="https://example.com/image.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="focus-visible:ring-blue-500"
              />
            </div>
            <Button 
              onClick={handleUrlAdd} 
              className="bg-blue-600 hover:bg-blue-500"
              disabled={!imageUrl.trim()}
            >
              <Plus className="h-4 w-4 mr-1" /> Add
            </Button>
          </div>
        </TabsContent>
      </Tabs>
      
      {images.length > 0 && (
        <div className="mt-6">
          <Label className="mb-3 block">Product Images</Label>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
            {images.map((image) => (
              <Card key={image.id} className={`relative overflow-hidden  group ${image.isPrimary ? 'ring-2 ring-blue-500' : ''}`}>
                <CardContent className="p-0">
                  <div className="aspect-square relative">
                    <img 
                      src={image.url} 
                      alt="Product" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      {!image.isPrimary && (
                        <Button 
                          variant="secondary" 
                          size="sm"
                          className="h-8 text-xs"
                          onClick={() => handleSetMainImage(image.id)}
                        >
                          Set as Main
                        </Button>
                      )}
                      <Button 
                        variant="destructive" 
                        size="icon" 
                        className="h-8 w-8" 
                        onClick={() => handleRemoveImage(image.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    {image.isPrimary && (
                      <span className="absolute top-1 right-1 bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded">
                        Main
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductImageUploader;
