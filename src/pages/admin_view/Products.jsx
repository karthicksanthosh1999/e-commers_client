import CommonForm from "@/components/common/Form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import React, { useState } from "react";

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

  const [openCreateProductInDialog, setOpenProductInDialog] = useState(false);
  const [formData, setFormData] = useState(initalState);

  const handleSubmit = () => {};
  return (
    <>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenProductInDialog(true)}>
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        <Sheet
          open={openCreateProductInDialog}
          onOpenChange={() => setOpenProductInDialog(false)}
        >
          <SheetContent side="right" className="overflow-auto">
            <SheetHeader>
              <SheetTitle>Add New Product</SheetTitle>
            </SheetHeader>
            <div className="py-6">
              <CommonForm
                formControls={addProductFormElements}
                buttonText="Add"
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleSubmit}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default AdminProducts;
