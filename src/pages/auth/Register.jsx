import CommonForm from "@/components/common/Form";
import { registerFormControls } from "@/config";
import { registerUser } from "@/features/slices/auth_slices";
import { useToast } from "@/hooks/use-toast";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  userName: "",
  password: "",
  email: "",
};

const AuthRegister = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(registerUser(formData))
      .then((data) => {
        if (data?.payload?.success) {
          toast({
            title: data?.payload?.message,
          });
          navigate("/auth/login");
        }
        console.log(data);
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create new account
        </h1>
        <p className="mt-2">
          Already have an account
          <Link
            className="font-medium text-primary hover:underline ml-2"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>
      <CommonForm
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        formControls={registerFormControls}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default AuthRegister;
