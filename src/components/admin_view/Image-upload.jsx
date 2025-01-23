import React, { useRef } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";

const ProductImageUpload = ({
  imageFile,
  setImageFile,
  uploadedImageUrl,
  setUploadedImageUrl,
}) => {
  const inputRef = useRef(null);
  const handleInputImageChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) setImageFile(selectedFile);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="w-full max-w-md mx-auto mt-4">
      <Label className="text-lg font-semibold mb-2 block">
        <div
          onDragOver={handleDragOver}
          onDrag={handleDrop}
          className="border-2 border-dashed rounded-lg p-4"
        >
          <Input
            type="file"
            className="hidden"
            id="image-upload"
            ref={inputRef}
            onChange={handleInputImageChange}
          />
          {!imageFile ? (
            <Label
              htmlFor="image-upload"
              className="flex flex-col justify-center items-center h-32 cursor-pointer"
            >
              <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
              <span>Drag & Drop or click to upload image</span>
            </Label>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FileIcon className="w-8 text-primary mr-2 h-8" />
              </div>
              <p className="text-sm font-medium">{imageFile.name}</p>
              <Button
                varient="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground"
                onClick={handleRemoveImage}
              >
                <XIcon className="w-4 h-4" />
                <span className="sr-only">Remove File</span>
              </Button>
            </div>
          )}
        </div>
      </Label>
    </div>
  );
};

export default ProductImageUpload;
