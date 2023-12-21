import React, { useState, useRef, useEffect } from 'react';
import Loader from '../../components/Loader';
import { uploadFile, deleteFile } from '../../services/ApiService';

type Props = {
    filename: string | undefined;
    onFileChange: Function;
}

function RequestCertificateFiles(props: Props) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [filename, setFilename] = useState<string>("");
    const [newFile, setNewFile] = useState<File>();
    const [uploadMessage, setUploadMessage] = useState<string>("");

    const fileInputRef = useRef<HTMLInputElement>(null);

    function onFileChange(evt: React.ChangeEvent<HTMLInputElement>) {
        if (evt.target.files) {
            setNewFile(evt.target.files[0]);
        }
    }

    function getFileUrl() {
        return `${process.env.REACT_APP_API_URL}/api/certificate/upload/${filename}?token=${localStorage.getItem("token")}`;
    }

    function btnDeleteClick() {
        if (window.confirm("Are you sure to delete this file?")) {
            setIsLoading(true);
            deleteFile(filename)
                .then(() => {
                    setFilename("")
                    if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                    }
                    props.onFileChange(null);
                    setIsLoading(false);
                })
                .catch(err => {
                    setUploadMessage(err.response ? err.response.data : err.message);
                    setIsLoading(false);
                })
        }
    }

    function btnUploadClick() {
        if (!newFile) return;

        setIsLoading(true);
        setUploadMessage("Uploading the file...wait...");

        const filename = new Date().getTime().toString();
        const lastDotIndex = newFile.name.lastIndexOf('.');
        const fileExtension = lastDotIndex !== -1 ? newFile.name.slice(lastDotIndex + 1) : '';
        const filenameWithExtension = `${filename}.${fileExtension}`;
        setFilename(filenameWithExtension)
        props.onFileChange(filenameWithExtension);

        uploadFile(filename, newFile)
            .then(() => {
                setNewFile(undefined);
                setUploadMessage("");
                setIsLoading(false);
            })
            .catch(err => {
                setUploadMessage(err.response ? err.response.data : err.message);
                setIsLoading(false);
            })
    }

    useEffect(() => {
        if (props.filename)
            setFilename(props.filename);
    }, [props.filename])

    return (
        <div className="row">
            <div className="col-12">
                <div className="card my-4">
                    <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                        <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                            <h6 className="text-white text-capitalize ps-3">
                                <i className="material-icons opacity-10 me-2">cloud_upload</i>
                                File
                            </h6>
                        </div>
                    </div>
                    <div className="card-body px-0 pb-2">
                        {
                            isLoading
                                ? <Loader />
                                : <></>
                        }
                        <div className="table-responsive p-0">
                            <table className="table align-items-center mb-0">
                                <thead>
                                    <tr>
                                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">File name</th>
                                        <th className="text-secondary opacity-7"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filename ? (
                                        <tr>
                                            <td>
                                                <div className="d-flex px-3 py-1">
                                                    <div className="d-flex flex-column justify-content-center">
                                                        <h6 className="mb-0 text-sm">{filename}</h6>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <a href={getFileUrl()} target='_blank' rel="noreferrer" className="btn btn-info btn-sm me-1 m-0 px-2 py-1">
                                                    <i className="material-icons text-sm">visibility</i>
                                                </a>
                                                <button className="btn btn-danger btn-sm me-1 m-0 px-2 py-1" onClick={btnDeleteClick}>
                                                    <i className="material-icons text-sm">delete</i>
                                                </button>

                                            </td>
                                        </tr>
                                    ) : <></>
                                    }
                                </tbody>
                            </table>
                            <hr />
                        </div>
                        <div className="row mb-3 ms-3">
                            <div className="col-md-6 mb-3">
                                <div className="form-group">
                                    <h6>Upload a new file:</h6>
                                    <div className="input-group input-group-outline">
                                        <input className="form-control" type="file" ref={fileInputRef} id="newFile" disabled={!!filename} onChange={onFileChange}></input>
                                        <button className='btn bg-gradient-dark mb-0' disabled={!!filename} onClick={btnUploadClick}>
                                            <i className="material-icons opacity-10 me-2">cloud_upload</i>
                                            Upload
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 mt-5 text-danger">
                                {uploadMessage}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RequestCertificateFiles;