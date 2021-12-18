import { useEffect, useState } from "react";
import { getDeals, getOrgs, getOutlets } from "../api/Api";
import AddEditDialog from "./AddEditDialog";
import BulkDialog from "./BulkDialog";

export const schema = {
  ORG: "Organisation",
  OUTLET: "Outlet",
  DEAL: "Deal",
};

const Admin = () => {
  const [orgs, setOrgs] = useState([]);
  const [outlets, setOutlets] = useState([]);
  const [deals, setDeals] = useState([]);
  const [dialogProps, setDialogProps] = useState({
    title: "",
    type: "",
    visible: false,
  });
  const [bulkDialogProps, setBulkDialogProps] = useState({
    visible: false,
  });

  useEffect(() => {
    getOrgs().then((allOrgs) =>
      setOrgs(Object.entries(allOrgs).map((org) => ({ id: org[0], ...org[1] })))
    );
    getOutlets().then((allOutlets) =>
      setOutlets(
        Object.entries(allOutlets).map((out) => ({ id: out[0], ...out[1] }))
      )
    );
    getDeals().then((allDeals) =>
      setDeals(
        Object.entries(allDeals).map((deal) => ({ id: deal[0], ...deal[1] }))
      )
    );
  }, []);

  const openAddDialog = (type) => {
    const props = {
      title: "Add",
      type,
      visible: true,
    };
    if (type === schema.OUTLET || type === schema.DEAL) {
      props["orgs"] = orgs;
    }
    if (type === schema.DEAL) {
      props["outlets"] = outlets;
    }
    setDialogProps(props);
  };

  const openEditDialog = (type, data) => {
    const props = {
      title: "Edit",
      type,
      visible: true,
      data,
    };
    if (type === schema.OUTLET || type === schema.DEAL) {
      props["orgs"] = orgs;
    }
    if (type === schema.DEAL) {
      props["outlets"] = outlets;
    }
    setDialogProps(props);
  };

  const openBulkDialog = () => {
    setBulkDialogProps({ visible: true });
  };

  const closeDialog = () => {
    setDialogProps({ ...dialogProps, visible: false });
  };

  const closeBulkDialog = () => {
    setBulkDialogProps({ visible: false });
  };
  return (
    <div>
      <AddEditDialog props={dialogProps} closeBtn={closeDialog} />
      <BulkDialog props={bulkDialogProps} closeBtn={closeBulkDialog} />
      <section className="section">
        <h5 className="is-size-5">Deals</h5>
        <div className="buttons are-small is-right">
          <button
            className="button is-primary"
            onClick={() => openAddDialog(schema.DEAL)}
          >
            Add
          </button>
        </div>
        <table className="table is-fullwidth is-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Start</th>
              <th>End</th>
              <th>Company</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {deals.map((deal, i) => (
              <tr key={i}>
                <td style={{ whiteSpace: "nowrap" }}>{deal.id}</td>
                <td>{deal.title}</td>
                <td>{deal.description}</td>
                <td>{deal.startDT}</td>
                <td>{deal.endDT}</td>
                <td>{deal.company.name}</td>
                <td>
                  <div className="buttons are-small is-right">
                    <button
                      className="button is-warning"
                      onClick={() => openEditDialog(schema.DEAL, deal)}
                    >
                      Edit
                    </button>
                    <button className="button is-danger">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section className="section">
        <h5 className="is-size-5">Organisations</h5>
        <div className="buttons are-small is-right">
          <button
            className="button is-primary"
            onClick={() => openAddDialog(schema.ORG)}
          >
            Add
          </button>
        </div>
        <table className="table is-fullwidth is-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orgs.map((org, i) => (
              <tr key={i}>
                <td style={{ whiteSpace: "nowrap" }}>{org.id}</td>
                <td>{org.name}</td>
                <td>
                  <div className="buttons are-small is-right">
                    <button
                      className="button is-warning"
                      onClick={() => openEditDialog(schema.ORG, org)}
                    >
                      Edit
                    </button>
                    <button className="button is-danger">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section className="section">
        <h5 className="is-size-5">Outlets</h5>
        <div className="buttons are-small is-right">
          <button
            className="button is-primary"
            onClick={() => openAddDialog(schema.OUTLET)}
          >
            Add
          </button>
          <button className="button is-info" onClick={() => openBulkDialog()}>
            Add Bulk
          </button>
        </div>
        <table className="table is-fullwidth is-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Address</th>
              <th>Postal Code</th>
              <th>Longitude</th>
              <th>Latitude</th>
              <th>Company</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {outlets.map((outlet, i) => (
              <tr key={i}>
                <td style={{ whiteSpace: "nowrap" }}>{outlet.id}</td>
                <td>{outlet.name}</td>
                <td>{outlet.address}</td>
                <td>{outlet.postalCode}</td>
                <td>{outlet.longitude}</td>
                <td>{outlet.latitude}</td>
                <td>{outlet.company.name}</td>
                <td>
                  <div className="buttons are-small is-right">
                    <button
                      className="button is-warning"
                      onClick={() => openEditDialog(schema.OUTLET, outlet)}
                    >
                      Edit
                    </button>
                    <button className="button is-danger">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Admin;
