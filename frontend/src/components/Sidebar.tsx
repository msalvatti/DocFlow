import { useNavigate } from 'react-router-dom';
import { doLogout } from '../services/ApiService';

function Sidebar() {

    const navigate = useNavigate();

    function getActiveClass(item: string): string {
        if (window.location.pathname.indexOf(item) !== -1)
            return "nav-link text-white active bg-gradient-primary";
        return "nav-link text-white";
    }

    function btnLogoutClick() {
        doLogout();
        navigate("/");
    }

    return (
        <aside className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3   bg-gradient-dark" id="sidenav-main">
            <div className="sidenav-header">
                <i className="fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
                <a className="navbar-brand m-0" href=" https://demos.creative-tim.com/material-dashboard/pages/dashboard " target="_blank">
                    <img src="/logo192.png" className="navbar-brand-img h-100" alt="main_logo" />
                    <span className="ms-1 font-weight-bold text-white"> Certificate Manager</span>
                </a>
            </div>
            <hr className="horizontal light mt-0 mb-2" />
            <div className="collapse navbar-collapse w-auto" id="sidenav-collapse-main">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className={getActiveClass("dashboard")} href="/dashboard">
                            <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                <i className="material-icons opacity-10">interests</i>
                            </div>
                            <span className="nav-link-text ms-1">Dashboard</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className={getActiveClass("request")} href="/request">
                            <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                <i className="material-icons opacity-10">library_add</i>
                            </div>
                            <span className="nav-link-text ms-1">Request Certificate</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="sidenav-footer position-absolute w-100 bottom-0 ">
                <div className="mx-3">
                    <a className="btn bg-gradient-primary mt-4 w-100" href="#" type="button" onClick={btnLogoutClick}>Logout</a>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar;