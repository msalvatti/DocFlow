import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { doLogin } from '../services/ApiService';


function Login() {
  const navigate = useNavigate();
  const [message, setMessage] = useState<string>("");

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: (values, { setSubmitting, setErrors }) => {
      setMessage("Logging in...");
      doLogin(values.username, values.password)
        .then(result => {
          localStorage.setItem("token", result);
          navigate("/dashboard")
        })
        .catch(err => {
          setMessage(err.message);
        })
        .finally(() => setSubmitting(false));
    },
  });

  const { handleSubmit, handleChange, values, errors, isSubmitting } = formik;

  return (
    <main className="main-content mt-0">
      <div className="page-header align-items-start min-vh-100">
        <span className="mask bg-gradient-dark opacity-6"></span>
        <div className="container my-auto">
          <div className="row">
            <div className="col-lg-4 col-md-8 col-12 mx-auto">
              <div className="card z-index-0 fadeIn3 fadeInBottom">
                <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                  <div className="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">
                    <h4 className="text-white font-weight-bolder text-center mt-2 mb-0">Sign In with your account</h4>
                  </div>
                </div>
                <div className="card-body">
                  <form className="text-start" onSubmit={handleSubmit}>
                    <div className="text-center">
                      <img src="/logo192.png" width={100} height={100} alt="logo" />
                    </div>
                    <label htmlFor="username" className="form-label">Username</label>
                    <div className="input-group input-group-outline mb-3">
                      <input
                        type="text"
                        id="username"
                        name="username"
                        className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                        onChange={handleChange}
                        value={values.username}
                      />
                      <div className="invalid-feedback">{errors.username}</div>
                    </div>
                    <label htmlFor="password" className="form-label">Password</label>
                    <div className="input-group input-group-outline mb-3">
                      <input
                        type="password"
                        id="password"
                        name="password"
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        onChange={handleChange}
                        value={values.password}
                      />
                      <div className="invalid-feedback">{errors.password}</div>
                    </div>
                    <div className="text-center">
                      <button type="submit" className="btn bg-gradient-primary w-100 my-4 mb-2" disabled={isSubmitting}>
                        {isSubmitting && <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>}
                        Sign in
                      </button>
                    </div>
                    <p className="mt-4 text-sm text-center text-danger">
                      {message}
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;
