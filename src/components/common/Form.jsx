import React from "react";

const CommonForm = ({ formControls }) => {
  return (
    <form>
      <div className="flex flex-col gap-3">
        {formControls.map((controlItem) => (
          <div className="grid w-full gap-1.5" key={controlItem.name}>
            <Label className="mb-1">{controlItem.Label}</Label>
          </div>
        ))}
      </div>
    </form>
  );
};

export default CommonForm;
