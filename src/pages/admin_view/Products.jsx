import ProductImageUpload from "@/components/admin_view/Image-upload";
import AdminProductTile from "@/components/admin_view/Product-tile";
import CommonForm from "@/components/common/Form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import {
  addNewProduct,
  editProduct,
  fetchAllProducts,
  deleteProduct,
} from "@/features/slices/admin";
import { useToast } from "@/hooks/use-toast";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AdminProducts = () => {
  const initalState = {
    image: null,
    title: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    salePrice: "",
    totalStock: "",
  };
  const { productList } = useSelector((state) => state.adminProducts);
  const [openCreateProductInDialog, setOpenProductInDialog] = useState(false);
  const [formData, setFormData] = useState(initalState);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const dispatch = useDispatch();
  const { toast } = useToast();

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const isValidForm = () => {
    return Object.keys(formData)
      .map((item) => formData[item] !== "")
      .every((item) => item);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    selectedProductId !== null
      ? dispatch(editProduct({ id: selectedProductId, formData }))
          .then((data) => {
            if (data.payload) {
              console.log(data.payload);
              dispatch(fetchAllProducts());
              setFormData(initalState);
              setOpenProductInDialog(false);
              setSelectedProductId(null);
              toast({
                title: "Product updated successfully",
              });
            }
          })
          .catch((err) => console.log(err))
      : dispatch(
          addNewProduct({ ...formData, image: uploadedImageUrl?.data?.url })
        )
          .then((data) => {
            if (data.payload?.success) {
              setImageFile(null);
              setFormData(initalState);
              setOpenProductInDialog(false);
              dispatch(fetchAllProducts());
              toast({
                title: "Product added successfully",
              });
            }
          })
          .catch((err) => console.log(err));
  };

  const handleProductDelete = (getCurrentProductId) => {
    dispatch(deleteProduct(getCurrentProductId))
      .then((data) => {
        console.log(data, "Deleted Data");
        if (data.payload) {
          dispatch(fetchAllProducts());
          toast({
            title: "Product deleted successfully",
          });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenProductInDialog(true)}>
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((product, idx) => (
              <AdminProductTile
                product={product}
                key={idx}
                setSelectedProductId={setSelectedProductId}
                setFormData={setFormData}
                setOpenProductInDialog={setOpenProductInDialog}
                handleProductDelete={handleProductDelete}
              />
            ))
          : null}
      </div>
      <Sheet
        open={openCreateProductInDialog}
        onOpenChange={() => {
          setOpenProductInDialog(false);
          setSelectedProductId(null);
          setFormData(initalState);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {selectedProductId !== null
                ? "Edit the Product"
                : "Add New Product"}
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            imageLoadingState={imageLoadingState}
            setImageLoadingState={setImageLoadingState}
            isEditMode={selectedProductId !== null}
          />
          <div className="py-6">
            <CommonForm
              formControls={addProductFormElements}
              buttonText={selectedProductId !== null ? "Edit" : "Add"}
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
              isBtnDisable={!isValidForm()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default AdminProducts;
