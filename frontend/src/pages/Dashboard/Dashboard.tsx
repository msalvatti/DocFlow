import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Alert from "../../components/Alert";
import Loader from "../../components/Loader";
import { getRequestCertificates } from "../../services/ApiService";
import { Certificate } from "../../services/ApiService";
import DashboardRow from "./DashboardRow";

function Dashboard() {

    const navigate = useNavigate();

    const [message, setMessage] = useState<string>("");
    const [requests, setRequests] = useState<Certificate[]>([]);
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

    const query = useQuery();

    useEffect(() => {
        setIsLoading(true);
        getRequestCertificates()
            .then(result => {
                setRequests(result.data)
                setIsLoading(false);
            })
            .catch(err => {
                setMessage(err.message);
                setIsLoading(false);
            });
    }, [])

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
                                            <i className="material-icons opacity-10 me-2">interests</i>
                                            Dashboard
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
                                    <div className="table-responsive p-0">
                                        <table className="table align-items-center mb-0">
                                            <thead>
                                                <tr>
                                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Name</th>
                                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">CPF</th>
                                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Phone</th>
                                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Birth Date</th>
                                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Address</th>
                                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Certificate</th>
                                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Status</th>
                                                    <th className="text-secondary opacity-7"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    requests && requests.length
                                                        ? requests.map(request => <DashboardRow key={request.id} data={request} onDelete={() => console.log("delete")} onEdit={() => console.log("edit")} />)
                                                        : <></>
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="row ms-2">
                                        <div className="col-md-12 mb-3 mt-3">
                                            <a className="btn bg-gradient-dark me-2" href="/topics/new">
                                                <i className="material-icons opacity-10 me-2">add</i>
                                                Request Certificate
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Dashboard;