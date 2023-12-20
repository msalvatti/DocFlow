import { Certificate, Certificates, Status } from "../../services/ApiService";

type Props = {
    data: Certificate;
    onEdit: Function;
    onDelete: Function;
}

/**
 * props:
 *  - data
 *  - onEdit
 *  - onDelete
 */
function DashboardRow(props: Props) {

    function btnEditClick() {
        props.onEdit(props.data.id);
    }

    function btnDeleteClick() {
        if (window.confirm("Are you sure to delete this request certificate?"))
            props.onDelete(props.data.id);
    }

    function getDate() {
        if (!props.data.birthDate) return "";
        return (
            <p className="text-sm mb-0 ms-1 ">
                {new Date(props.data.birthDate).toDateString()}
            </p>
        )
    }

    function getStatus() {
        let text = "", className = "";
        switch (props.data.status) {
            case Status.issued: {
                text = "Issued";
                className = "badge bg-success py-1 ms-1";
                break;
            }
            case Status.denied: {
                text = "Denied";
                className = "badge bg-danger py-1 ms-1";
                break;
            }
            default: {
                text = "Pending";
                className = "badge bg-secondary py-1 ms-1";
                break;
            }
        }
        return <span className={className}>{text}</span>
    }

    function getCertificatesKind() {
        let text = "";
        switch (props.data.certificate) {
            case `${Certificates.MARRIAGE}`: {
                text = "Marriage";
                break;
            }
            case `${Certificates.BIRTH}`: {
                text = "Birth";
                break;
            }
            default: {
                text = "Immobile";
                break;
            }
        }
        return <span className="badge bg-warning py-1 ms-3">{text}</span>
    }

    return (
        <tr>
            <td>
                <div className="d-flex ms-1">
                    <div className="d-flex flex-column justify-content-center">
                        <p className="mb-0 text-sm">{props.data.name}</p>
                    </div>
                </div>
            </td>
            <td>
                <div className="d-flex ms-1">
                    <div className="d-flex flex-column justify-content-center">
                        <p className="mb-0 text-sm">{props.data.cpf}</p>
                    </div>
                </div>
            </td>
            <td>
                <div className="d-flex ms-1">
                    <div className="d-flex flex-column justify-content-center">
                        <p className="mb-0 text-sm">{props.data.phone}</p>
                    </div>
                </div>
            </td>
            <td>
                {getDate()}
            </td>
            <td>
                <div className="d-flex ms-1">
                    <div className="d-flex flex-column justify-content-center">
                        <p className="mb-0 text-sm">{props.data.address}</p>
                    </div>
                </div>
            </td>
            <td>
                {getCertificatesKind()}
            </td>
            <td>
                {getStatus()}
            </td>
            <td>
                <a href={"#" + props.data.id} className="btn btn-info btn-sm me-1 m-0 px-2 py-1" onClick={btnEditClick}>
                    <i className="material-icons text-sm">visibility</i>
                </a>

                <a href={"#" + props.data.id} className="btn btn-danger btn-sm me-1 m-0 px-2 py-1" onClick={btnDeleteClick}>
                    <i className="material-icons text-sm">delete</i>
                </a>
            </td>
        </tr>
    )
}

export default DashboardRow;