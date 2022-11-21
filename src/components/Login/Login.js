import Input from "../../common/Input";
import { useFormik } from "formik";
import * as Yup from "yup";

import "./login.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import loginUser from "../../services/loginService";
import { useAuthActions } from "../../providers/AuthProvider";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid Email Format")
    .required("Email is Required"),
  password: Yup.string().required("password is Required"),
});

const LoginForm = () => {
  let navigate = useNavigate();
  const location = useLocation();
    // console.log(location.search);

    // const query = useQuery();
    // const redirect = query.get("redirect") || "/";
    // // console.log(redirect); 

  const setAuth = useAuthActions();

  const[err, setErr] = useState(null);
  

  const onSubmit =  (values) => {
    try {
      const { data } = await loginUser(values);
      setAuth(data);
      // localStorage.setItem("authState", JSON.stringify(data));
      setErr(null);
      (location.search === "" ? navigate("/") : navigate("/checkout"));
      // navigate(`/${redirect}`);
    } catch (error) {
      if (error.response && error.response.data.message)
      setErr(error.response.data.message)
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
        <Input formik={formik} name="email" label="Email" type="email" />
        <Input
          formik={formik}
          name="password"
          label="Password"
          type="password"
        />
        <button
          style={{ width: "100%" }}
          className="btn primary"
          type="submit"
          disabled={!formik.isValid}
        >
          Login
        </button>
        {err && <p style={{"color" : "red", "fontSize" : "16px"}}>error: {err}</p>}
          <p className="underForm">No account? <Link to={`/signup${location.search}`}><button><b>Create one</b></button> </Link></p>
      </form>
      
    </div>
  );
};

export default LoginForm;
