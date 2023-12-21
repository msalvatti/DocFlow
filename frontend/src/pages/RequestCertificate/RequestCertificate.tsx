import { useState, useEffect } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useLocation } from "react-router-dom";
import InputMask from 'react-input-mask';
import Sidebar from "../../components/Sidebar";
import Alert from "../../components/Alert";
import Loader from "../../components/Loader";
import RequestCertificateFile from "./RequestCertificateFile";
import { AddRequestCertificate, getRequestCertificateById, updateRequestCertificatebyId } from "../../services/ApiService";
import { Certificate } from "../../services/ApiService";

function RequestCertificate() {

    const [message, setMessage] = useState<string>("");
    const [request, setRequest] = useState<Certificate>();
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [reset, setReset] = useState<boolean>(false);

    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }
    const query = useQuery();
    const id = query.get("id");

    const formik = useFormik({
        initialValues: {
            name: '',
            cpf: '',
            phone: '',
            birthDate: '',
            address: '',
            certificate: '',
            status: '',
            filename: ''
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().nullable().required('Name is required'),
            cpf: Yup.string().nullable().required('CPF is required'),
            phone: Yup.string().nullable().required('Phone is required'),
            birthDate: Yup.date().nullable().required('Birth Date is required'),
            address: Yup.string().nullable().required('Address is required'),
            certificate: Yup.string().nullable().required('Certificate is required'),
        }),
        onSubmit: (values, { setSubmitting, resetForm, setErrors }) => {
            setIsLoading(true);
            setMessage("Saving...");

            if (!id) {
                AddRequestCertificate(values)
                    .then(result => {
                        setMessage("Data has been saved successfully!");
                        setReset(true);
                    })
                    .catch(err => {
                        setMessage("");
                        setError(err.message);
                    })
                    .finally(() => {
                        resetForm();
                        setSubmitting(false);
                    });
            } else {
                updateRequestCertificatebyId(values, id)
                    .then(result => {
                        setMessage("Data has been updated successfully!");
                    })
                    .catch(err => {
                        setMessage("");
                        if (err.message.includes("403")) {
                            setError("You do not have permission to update the request certificate");
                        }
                        else
                            setError(err.message);
                    })
                    .finally(() => {
                        setSubmitting(false);
                    });
            }
            setIsLoading(false);
        },
    });

    const { handleSubmit, handleChange, setFieldValue, values, errors, touched, isSubmitting } = formik;

    function onFileChange(name: string) {
        setFieldValue("filename", name);
        setReset(false);
    }

    useEffect(() => {
        if (id) {
            getRequestCertificateById(id)
                .then(result => {
                    setRequest(result.data);
                })
                .catch(err => {
                    console.error(err.message);
                })
        }
    }, [id])

    useEffect(() => {
        if (request) {
            setFieldValue("name", request.name);
            setFieldValue("cpf", request.cpf);
            setFieldValue("phone", request.phone);
            setFieldValue("birthDate", request.birthDate);
            setFieldValue("address", request.address);
            setFieldValue("certificate", request.certificate);
            setFieldValue("status", request.status);
            if (request.filename) setFieldValue("filename", request.filename);
        }
    }, [request, setFieldValue])

    return (
        <>
            <Sidebar />
            <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
                <div className="container-fluid py-4">
                    <div className="row">
                        <div className="col-12">
                            <div className="card my-4">
                                <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                    <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                                        <h6 className="text-white text-capitalize ps-3">
                                            <i className="material-icons opacity-10 me-2">library_add</i>
                                            Request Certificate
                                        </h6>
                                    </div>
                                </div>
                                <div className="card-body px-0 pb-2">
                                    {
                                        message
                                            ? <Alert alertClass="alert-success" materialIcon="thumb_up_off_alt" title="Success!" text={message} />
                                            : <></>
                                    }
                                    {
                                        error
                                            ? <Alert alertClass="alert-danger" materialIcon="error" title="Error!" text={error} />
                                            : <></>
                                    }
                                    {
                                        isLoading
                                            ? <Loader />
                                            : <></>
                                    }
                                    <div className="d-flex justify-content-center align-item-center w-100">
                                        <form className="text-start w-40" onSubmit={handleSubmit}>
                                            <label htmlFor="name" className="form-label">Name</label>
                                            <div className="input-group input-group-outline mb-3">
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    className={`form-control ${!!errors.name && touched.name ? 'is-invalid' : ''}`}
                                                    onChange={handleChange}
                                                    value={values.name}
                                                    disabled={!!id}
                                                />
                                                <div className="invalid-feedback" hidden={!!id}>{errors.name}</div>
                                            </div>

                                            <label htmlFor="cpf" className="form-label">CPF</label>
                                            <div className="input-group input-group-outline mb-3">
                                                <InputMask
                                                    mask="999.999.999-99"
                                                    type="text"
                                                    id="cpf"
                                                    name="cpf"
                                                    className={`form-control ${!!errors.cpf && touched.cpf ? 'is-invalid' : ''}`}
                                                    onChange={handleChange}
                                                    value={values.cpf}
                                                    disabled={!!id}
                                                />
                                                <div className="invalid-feedback" hidden={!!id}>{errors.cpf}</div>
                                            </div>

                                            <label htmlFor="phone" className="form-label">Phone</label>
                                            <div className="input-group input-group-outline mb-3">
                                                <InputMask
                                                    mask="(99) 99999-9999"
                                                    type="text"
                                                    id="phone"
                                                    name="phone"
                                                    className={`form-control ${!!errors.phone && touched.phone ? 'is-invalid' : ''}`}
                                                    onChange={handleChange}
                                                    value={values.phone}
                                                    disabled={!!id}
                                                />
                                                <div className="invalid-feedback" hidden={!!id}>{errors.phone}</div>
                                            </div>

                                            <label htmlFor="birthDate" className="form-label">Birth Date</label>
                                            <div className="input-group input-group-outline mb-3">
                                                <InputMask
                                                    mask="99/99/9999"
                                                    type="text"
                                                    id="birthDate"
                                                    name="birthDate"
                                                    className={`form-control ${!!errors.birthDate && touched.birthDate ? 'is-invalid' : ''}`}
                                                    onChange={handleChange}
                                                    value={values.birthDate}
                                                    disabled={!!id}
                                                />
                                                <div className="invalid-feedback" hidden={!!id}>{errors.birthDate}</div>
                                            </div>

                                            <label htmlFor="address" className="form-label">Address</label>
                                            <div className="input-group input-group-outline mb-3">
                                                <input
                                                    type="text"
                                                    id="address"
                                                    name="address"
                                                    className={`form-control ${!!errors.address && touched.address ? 'is-invalid' : ''}`}
                                                    onChange={handleChange}
                                                    value={values.address}
                                                    disabled={!!id}
                                                />
                                                <div className="invalid-feedback" hidden={!!id}>{errors.address}</div>
                                            </div>

                                            <label htmlFor="certificate" className="form-label">Certificate</label>
                                            <div className="input-group input-group-outline mb-3">
                                                <select
                                                    id="certificate"
                                                    name="certificate"
                                                    className={`form-control ${!!errors.certificate && touched.certificate ? 'is-invalid' : ''}`}
                                                    onChange={handleChange}
                                                    value={values.certificate}
                                                    disabled={!!id}
                                                >
                                                    <option value="" disabled>Select a certificate</option>
                                                    <option value="1">Marriage</option>
                                                    <option value="2">Birth</option>
                                                    <option value="3">Immobile</option>
                                                </select>
                                                <div className="invalid-feedback" hidden={!!id}>{errors.certificate}</div>
                                            </div>

                                            {id ? (
                                                <>
                                                    <label htmlFor="status" className="form-label">Status</label>
                                                    <div className="input-group input-group-outline mb-3">
                                                        <select
                                                            id="status"
                                                            name="status"
                                                            className={`form-control ${errors.status ? 'is-invalid' : ''}`}
                                                            onChange={handleChange}
                                                            value={values.status}
                                                        >
                                                            <option value="" disabled>Select the status</option>
                                                            <option value="PENDING">Pending</option>
                                                            <option value="ISSUED">Issued</option>
                                                            <option value="DENIED">Denied</option>
                                                        </select>
                                                        <div className="invalid-feedback">{errors.certificate}</div>
                                                    </div>
                                                </>
                                            ) : <></>}

                                            <div className="text-center">
                                                <button type="submit" className="btn bg-gradient-primary w-100 my-4 mb-4" disabled={isSubmitting}>
                                                    {isSubmitting && <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>}
                                                    Save
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <RequestCertificateFile filename={request?.filename || ""} resetFile={reset} onFileChange={(n: string) => onFileChange(n)} />
                </div>
            </main>
        </>
    )
}

export default RequestCertificate;