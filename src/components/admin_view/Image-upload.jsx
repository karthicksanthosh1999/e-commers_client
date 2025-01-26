import React, { useEffect, useRef, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { BASE_URL } from "@/App";
import { Skeleton } from "../ui/skeleton";

const ProductImageUpload = ({
  imageFile,
  setImageFile,
  uploadedImageUrl,
  setUploadedImageUrl,
  setImageLoadingState,
  imageLoadingState,
}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const inputRef = useRef(null);
  const handleInputImageChange = (event) => {
    const selectedFile = event.target.files[0];
    setSelectedImage(URL.createObjectURL(event.target.files[0]));
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

  const uploadImageToCloudinary = async () => {
    setImageLoadingState(true);
    const data = new FormData();
    data.append("my_file", imageFile);
    const response = await axios.post(
      `${BASE_URL}/admin/products/upload-image`,
      data,
      { withCredentials: true }
    );
    if (response?.data?.data?.url) {
      setUploadedImageUrl(response.data);
      setImageLoadingState(false);
    }
  };
  console.log(imageFile);

  useEffect(() => {
    if (imageFile !== null) uploadImageToCloudinary();
  }, [imageFile]);

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
          ) : imageLoadingState ? (
            <Skeleton className="h-10 bg-gray-100" />
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {/* <FileIcon className="w-8 text-primary mr-2 h-8" /> */}
                <img src={selectedImage} height="30px" width="50px" />
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
