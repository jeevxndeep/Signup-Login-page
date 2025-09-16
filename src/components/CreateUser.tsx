import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store";
import { setAuth } from "../features/userSlice";
import { useState } from "react";
import { signupAPI } from "../services/Userservice";


type SignUp = { firstName: string; lastName: string; email: string; password: string };

const CreateUser = () => {
    const {register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignUp>();

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const [apiError, setApiError] = useState<string | null>(null);

    const onSubmit = async (form: SignUp) => {
        try {
            setApiError(null);
            const { token, user } = await signupAPI(form);
            dispatch(setAuth({ token, user }));
            navigate("/profile");
        } catch (err: any) {
            setApiError(err?.response?.data?.message || "Signup failed");
        }
    };
    
    return (
        <>
        <section className="w-full h-full flex justify-center items-center gap-5 flex-col">
            <span>CreateUser Form</span>
            <form className="flex flex-col gap-5 w-80" onSubmit={handleSubmit(onSubmit)}>
                <TextField label='FirstName' variant='outlined' {...register("firstName", { required: "First name requried" })} error={!!errors.firstName} helperText={errors.firstName?.message}/>
                <TextField label='LastName' variant='outlined'{...register("lastName", { required: "Last name requried" })} error={!!errors.lastName} helperText={errors.lastName?.message}/>
                <TextField label='Email' variant='outlined'{...register("email", { required: "Email requried" })} error={!!errors.email} helperText={errors.email?.message}/>
                <TextField label='Password' variant='outlined' type="password" {...register("password", { required: "Password required", minLength: { value: 6, message: "Min 6 chars" }})} error={!!errors.password} helperText={errors.password?.message}/>
                {apiError && <div className="text-red-600 text-sm">{apiError}</div>}
                <Button disabled={isSubmitting} type="submit" variant="outlined">{isSubmitting ? "Creating..." : "Sign Up"}</Button>
            </form>
        </section>
        </>
    );
};


export default CreateUser;