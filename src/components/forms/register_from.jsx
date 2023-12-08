import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { userInfoStore } from "../../suztand/Store";
import { registerSchema } from "./schemas";
import FormInput from "./form_input";
import ReactLoading from "react-loading";

export default function RegisterForm() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const [loading, setLoading] = useState(false);
  const { userSignIn, userInfo } = userInfoStore();

  const { values, errors, handleSubmit, handleChange, touched } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const res = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
        }),
      });
      const data = await res.json();
      if (res.status === 201) {
        userSignIn(data);
        toast.success("Logged in");
        setLoading(false);
      } else {
        setLoading(false);
        toast.error(toast.error(data.message));
      }
    },
  });

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex absolute top-0 w-full h-[72px] items-center justify-center shadow">
        <Link to="/">
          <p className="text-2xl md:text-3xl font-bold Robot">V2S</p>
        </Link>
      </div>
      <div className="flex flex-col items-center lg:w-[378px] lg:max-w-[378px] px-4 lg:mx-auto">
        <p className="text-[#0e001a] mb-4 text-[1.3rem] font-semibold leading-[1.8rem] ">
          Let's get started!
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col w-full gap-5">
          <div className="flex gap-5">
            <FormInput
              placeHolder="First Name"
              name="firstName"
              type="text"
              onChange={handleChange}
              value={values.firstName}
              error={errors.firstName}
              touched={touched.firstName}
            />
            <FormInput
              placeHolder="Last Name"
              name="lastName"
              type="text"
              onChange={handleChange}
              value={values.lastName}
              error={errors.lastName}
              touched={touched.lastName}
            />
          </div>
          <FormInput
            placeHolder="Email"
            name="email"
            type="email"
            onChange={handleChange}
            value={values.email}
            error={errors.email}
            touched={touched.email}
          />
          <FormInput
            placeHolder="Password"
            name="password"
            type="password"
            onChange={handleChange}
            value={values.password}
            error={errors.password}
            touched={touched.password}
          />
          <FormInput
            placeHolder="Confirm Password"
            name="confirmPassword"
            type="password"
            onChange={handleChange}
            value={values.confirmPassword}
            error={errors.confirmPassword}
            touched={touched.confirmPassword}
          />
          {loading ? (
            <button
              disabled
              className="rounded cursor-not-allowed flex items-center justify-center bg-primary px-8 py-2 text-white transition h-10"
            >
              <ReactLoading
                type="bubbles"
                color="#ffffff"
                height={25}
                width={25}
              />
            </button>
          ) : (
            <button
              type="submit"
              className="rounded bg-primary px-8 py-2 text-white transition lg:hover:bg-primary/80 h-10"
            >
              Register
            </button>
          )}
        </form>
        <div className="flex mt-3 text-sm font-normal leading-4 tracking-[0] self-start">
          Already have an account?
          <Link
            className="text-sky-500 ml-2"
            to={`/login?redirect=${redirect}`}
          >
            Sign in.
          </Link>
        </div>
        <p className="text-xs font-normal leading-4 tracking-[0] text-center w-[300px] text-[#7f8286] mt-6">
          By continuing, you agree to our Privacy Policy and Terms of Use.
        </p>
      </div>
    </div>
  );
}
