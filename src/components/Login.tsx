import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setAuth } from "../features/userSlice";
import type { AppDispatch } from "../store";
import { loginAPI } from "../services/Userservice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

type LoginForm = { email: string; password: string };

const Login = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginForm>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [apiError, setApiError] = useState<string | null>(null);

  const onSubmit = async (form: LoginForm) => {
    try {
      setApiError(null);
      const { token, user } = await loginAPI(form);
      dispatch(setAuth({ token, user }));
      navigate("/profile");
    } catch (e: any) {
      setApiError(e?.response?.data?.message || "Login failed");
    }
  };

  return (
    <section className="w-full h-full flex flex-col justify-center items-center gap-5">
      <form className="flex flex-col gap-5 w-80" onSubmit={handleSubmit(onSubmit)}>
        <TextField label="Email" {...register("email", { required: "Email required" })} error={!!errors.email} helperText={errors.email?.message}/>
        <TextField label="Password" type="password" {...register("password", { required: "Password required" })} error={!!errors.password} helperText={errors.password?.message}/>
        {apiError && <div className="text-red-600 text-sm">{apiError}</div>}
        <Button disabled={isSubmitting} type="submit" variant="outlined">{isSubmitting ? "Logging in..." : "Login"}</Button>
      </form>
    </section>
  );
};

export default Login;
