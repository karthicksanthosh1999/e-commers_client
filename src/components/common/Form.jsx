import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const CommonForm = ({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
}) => {
  const renderInputByComponentType = (getControlledItem) => {
    let element = null;
    const value = formData[getControlledItem.name] || "";

    switch (getControlledItem.componentType) {
      case "input":
        element = (
          <Input
            name={getControlledItem.name}
            placeholder={getControlledItem.placeholder}
            id={getControlledItem.name}
            type={getControlledItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlledItem.name]: event.target.value,
              })
            }
          />
        );
        break;
      case "select":
        element = (
          <Select
            value={value}
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [getControlledItem.name]: value,
              })
            }
          >
            <SelectTrigger className="w-full ">
              <SelectValue placeholder={getControlledItem.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {getControlledItem.options && getControlledItem.options.length > 0
                ? getControlledItem.options.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.lable}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;
      case "textarea":
        element = (
          <Textarea
            placeholder={getControlledItem.placeholder}
            id={getControlledItem.name}
            name={getControlledItem.name}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlledItem.name]: event.target.value,
              })
            }
          />
        );
        break;
      default:
        element = (
          <Input
            value={value}
            placeholder={getControlledItem.placeholder}
            id={getControlledItem.name}
            name={getControlledItem.name}
            type={getControlledItem.type}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlledItem.name]: event.target.value,
              })
            }
          />
        );
        break;
    }
    return element;
  };
  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControls.map((controlItem) => (
          <div className="grid w-full gap-1.5" key={controlItem.name}>
            <Label className="mb-1 text-start">{controlItem.label}</Label>
            {renderInputByComponentType(controlItem)}
          </div>
        ))}
      </div>
      <Button type="submit" className="w-full mt-2">
        {buttonText || "Submit"}
      </Button>
    </form>
  );
};

export default CommonForm;
