import CommonForm from "@/components/common/Form";
import { loginFormControls } from "@/config";
import React, { useState } from "react";
import { data, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "@/features/slices/auth_slices";
import { useToast } from "@/hooks/use-toast";

const initialState = {
  userName: "",
  email: "",
};

const AuthLogin = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(loginUser(formData))
      .then((res) => {
        if (res?.payload?.success) {
          toast({
            title: res?.payload?.message,
          });
        } else {
          toast({
            title: res?.payload?.message,
            variant: "destructive",
          });
        }
      })
      .catch((err) => console.log(err));
    console.log("Form Submited");
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Login
        </h1>
        <p className="mt-2">
          You don't have an account
          <Link
            className="font-medium text-primary hover:underline ml-2"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>
      <CommonForm
        buttonText={"Log In"}
        formData={formData}
        setFormData={setFormData}
        formControls={loginFormControls}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default AuthLogin;
