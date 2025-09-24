"use client";

import * as React from "react";
import { useState, ChangeEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { fetchPrefix } from "@/utils/fetch";

// Define types based on your schema
type CampaignImage = {
  file: File;
  preview: string;
  link: string;
};

// Mock API call — replace with your actual endpoint
const createCampaign = async (formData: FormData) => {
  const res = await fetch(`${fetchPrefix}/api/campaigns`, {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to create campaign");
  }

  return res.json();
};

export default function AddNewCampaignPage() {
  const [images, setImages] = useState<CampaignImage[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [campaignName, setCampaignName] = useState("");
  const [isCampaignLive, setIsCampaignLive] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // TanStack Mutation for creating campaign
  const { mutate: createCampaignMutation, isPending } = useMutation({
    mutationFn: createCampaign,
    onSuccess: (data) => {
      toast({
        title: "Campaign created!",
        description: "Your campaign has been successfully saved.",
      });
      queryClient.invalidateQueries({ queryKey: ["campaigns"] }); // optional: refetch campaigns list
      setImages([]); // reset form
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    },
  });

  // Handle image upload
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);

    // Limit total banners to 5
    if (images.length + files.length > 5) {
      toast({
        title: "Limit exceeded",
        description: "You can upload a maximum of 5 banners.",
        variant: "destructive",
      });
      return;
    }

    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      link: "",
    }));

    setImages((prev) => [...prev, ...newImages]);

    e.target.value = "";
    e.target.files = null;
  };

  // Handle link change
  const handleLinkChange = (index: number, value: string) => {
    const updated = [...images];
    updated[index].link = value;
    setImages(updated);
  };

  // Remove an image
  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Submit form — builds FormData and sends via TanStack
  const handleSubmit = () => {
    // Validate: all images must have a valid URL
    const invalidLinks = images.filter((img) => !img.link.trim());
    if (invalidLinks.length > 0) {
      toast({
        title: "Validation Error",
        description: "Please add a valid link for all images.",
        variant: "destructive",
      });
      return;
    }

    // Validate URLs using zod (optional, client-side)
    const urlSchema = z.string().url();
    const invalidUrls = images.filter((img) => {
      try {
        urlSchema.parse(img.link);
        return false;
      } catch {
        return true;
      }
    });

    if (invalidUrls.length > 0) {
      toast({
        title: "Invalid URL",
        description: "One or more links are not valid URLs.",
        variant: "destructive",
      });
      return;
    }

    // Build FormData
    const formData = new FormData();

    // Append each banner object (file + redirectUrl + imageOrder)
    images.forEach((img, index) => {
      formData.append(`images[${index}]`, img.file);
      formData.append(`redirectUrls[${index}]`, img.link);
      formData.append(`imageOrders[${index}]`, index.toString());
    });

    formData.append("isActive", isCampaignLive ? "true" : "false"); // default to false; can be toggled later
    formData.append("name", campaignName);
    // Trigger mutation
    createCampaignMutation(formData);
  };

  // Make live action (mock for now)
  const handleMakeLive = () => {
    setIsDialogOpen(false);
    toast({
      title: "Campaign is now live!",
      description: "Your campaign is active and visible to users.",
    });

    setIsCampaignLive(true);
    // TODO: Call API to make campaign live
  };

  return (
    <div className="p-6 space-y-8 max-w-5xl mx-auto max-h-full overflow-y-auto">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Add New Campaign</h1>
        <p className="text-gray-500 mt-2">
          Upload up to 5 images and associate valid links with them.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="images" className="text-sm font-medium text-gray-700">
          Campaign Name
        </Label>
        <Input
          id="name"
          type="text"
          onChange={(e) => {
            setCampaignName(e.target.value);
            
          }}
          className="border-gray-300 focus:border-blue-500"
        />
      </div>

      {/* Upload input */}
      <div className="space-y-2">
        <Label htmlFor="images" className="text-sm font-medium text-gray-700">
          Upload Images (Max 5)
        </Label>
        <Input
          id="images"
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageUpload}
          className="border-gray-300 focus:border-blue-500"
        />
      </div>

      {/* Preview list */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {images.map((img, index) => (
          <Card
            key={index}
            className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <CardHeader className="flex justify-between items-center pb-2">
              <CardTitle className="text-sm font-medium text-gray-800">
                Banner #{index + 1}
              </CardTitle>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => removeImage(index)}
                className="text-xs"
              >
                Remove
              </Button>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              {/* Image preview */}
              <div className="w-full h-48 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center">
                <img
                  src={img.preview}
                  alt={`Preview ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Link input */}
              <div className="space-y-1">
                <Label
                  htmlFor={`link-${index}`}
                  className="text-xs text-gray-600"
                >
                  Redirect URL
                </Label>
                <Input
                  id={`link-${index}`}
                  placeholder="https://example.com"
                  value={img.link}
                  onChange={(e) => handleLinkChange(index, e.target.value)}
                  className="text-sm border-gray-300"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <Button
          onClick={handleSubmit}
          disabled={images.length === 0 || isPending}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 text-sm font-medium"
        >
          {isPending ? "Saving..." : "Save Campaign"}
        </Button>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              disabled={images.length === 0}
              className="border-gray-300 text-gray-700 hover:bg-gray-100 px-6 py-2 text-sm font-medium"
            >
              Make Live
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Make Campaign Live?</DialogTitle>
              <DialogDescription>
                This will publish your campaign and make it visible to all
                users. Are you sure?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleMakeLive}
                className="bg-green-600 hover:bg-green-700"
              >
                Confirm
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
