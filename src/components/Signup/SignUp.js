import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useAuth, useAuthActions } from "../../providers/AuthProvider";
import { useQuery } from "../../hooks/useQuery";
import Input from "../../common/Input";
import signupUser from "../../services/signupService";

import "./signup.css";

const initialValues = {
  user: "",
  email: "",
  phoneNumber: "",
  password: "",
  rePassword: "",
};

const validationSchema = Yup.object({
  user: Yup.string().required("User is Required"),
  email: Yup.string()
    .email("Invalid Email Format")
    .required("Email is Required"),
  phoneNumber: Yup.string()
    .required("Phone is Required"),
    // .matches(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/, "Invalid Phone Number"),
  password: Yup.string().required("Password is Required"),
    // .min(8, "Password is too short - should be 8 chars minimum.")
    // .matches(/[0-9]/, "Password requires a number")
    // .matches(/[a-z]/, "Password requires a lowercase letter")
    // .matches(/[A-Z]/, "Password requires an uppercase letter")
    // .matches(/[^\w]/, "Password requires a symbol"),
  rePassword: Yup.string()
    .required("Password Confirmation is Required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});


const SignUpForm = () => {
  let navigate = useNavigate();
  const location = useLocation();
    // console.log("signup",location);


  const query = useQuery();
  const redirect = query.get("redirect") || "/";
  // console.log(redirect);

  const setAuth = useAuthActions();
  const auth = useAuth();

  const [error, setError] = useState(null);

  useEffect(() => {
    if (redirect==="checkout" && auth) navigate("/checkout")
  }, [navigate,auth,redirect])

  const onSubmit = (values) => {
    const { user, email, phoneNumber, password } = values;
    const userData = {
      user,
      email,
      phoneNumber,
      password,
    };
    try {
      const { data } = await signupUser(userData);
      setAuth(data);
      // localStorage.setItem("authState", JSON.stringify(data));
      setError(null);
      toast.success(`${data.user} successfully submitted!`);
      // navigate(redirect);
      (location.search === "" ? navigate("/") : navigate("/checkout"));
    } catch (error) {
      if (error.response && error.response.data.message)
        setError(error.response.data.message)
    }
    //   axios
    //     .post("http://localhost:3001/users", values)
    //     .then((res) => console.log(res.data))
    //     .catch((err) => console.log(err));
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
  });
  return (
    <div className="formContainer">
      <form onSubmit={formik.handleSubmit}>
        <Input formik={formik} name="user" label="User" />
        <Input formik={formik} name="email" label="Email" type="email" />
        <Input formik={formik} name="phoneNumber" label="phoneNumber" type="tel" />
        <Input
          formik={formik}
          name="password"
          label="Password"
          type="password"
        />
        <Input
          formik={formik}
          name="rePassword"
          label="Repeat Password"
          type="password"
        />
        <button
          style={{ width: "100%" }}
          className="btn primary"
          type="submit"
          disabled={!formik.isValid}
        >
          Sign Up
        </button>
        {error && <p style={{"color" : "red", "fontSize" : "16px"}}>error: {error}</p>}
        <p className="underForm">Already have an account?<Link to={`/login${location.search}`}><button><b>Sign in</b></button> </Link></p>
      </form>
    </div>
  );
};

export default SignUpForm;
