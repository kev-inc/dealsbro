import { schema } from "./Admin";

const AddEditDialog = ({ props, closeBtn }) => {
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
  };
  const formOrg = (
    <form onSubmit={onSubmit}>
      <label class="label">Name</label>
      <div class="control mb-3">
        <input
          class="input"
          type="text"
          placeholder="McDonald's"
          value={props.data && props.data.name}
        />
      </div>
      <div class="field is-grouped">
        <div class="control">
          <input type="submit" class="button is-link" />
        </div>
        <div class="control">
          <button class="button is-link is-light" onClick={closeBtn}>
            Cancel
          </button>
        </div>
      </div>
    </form>
  );

  const formOutlet = (
    <form onSubmit={onSubmit}>
      <label class="label">Name</label>
      <div class="control mb-3">
        <input
          class="input"
          type="text"
          placeholder="McDonald's Tampines Mall"
          value={props.data && props.data.name}
        />
      </div>

      <label class="label">Address</label>
      <div class="control mb-3">
        <input
          class="input"
          type="text"
          placeholder="4 Tampines Central 5 #01-33 Tampines Mall Singapore 529510"
          value={props.data && props.data.address}
        />
      </div>
      <label class="label">Postal Code</label>
      <div class="control mb-3">
        <input
          class="input"
          type="text"
          placeholder="412345"
          value={props.data && props.data.postalCode}
        />
      </div>
      <label class="label">Company</label>
      <div class="select mb-3">
        <select value={props.data && props.data.companyId}>
          {props.orgs &&
            props.orgs.map((org) => <option value={org.id}>{org.name}</option>)}
        </select>
      </div>
      <div class="field is-grouped">
        <div class="control">
          <input type="submit" class="button is-link" />
        </div>
        <div class="control">
          <button class="button is-link is-light" onClick={closeBtn}>
            Cancel
          </button>
        </div>
      </div>
    </form>
  );

  const formDeal = (
    <form onSubmit={onSubmit}>
      <label class="label">Title</label>
      <div class="control mb-3">
        <input
          class="input"
          type="text"
          placeholder="1-for-1"
          value={props.data && props.data.title}
        />
      </div>

      <label class="label">Description</label>
      <div class="control mb-3">
        <input
          class="input"
          type="text"
          placeholder=""
          value={props.data && props.data.description}
        />
      </div>

      <label class="label">Start Date</label>
      <div class="control mb-3">
        <input
          class="input"
          type="text"
          placeholder="1 Jan 2021"
          value={props.data && props.data.startDT}
        />
      </div>
      <label class="label">End Date</label>
      <div class="control mb-3">
        <input
          class="input"
          type="text"
          placeholder="1 Jan 2022"
          value={props.data && props.data.endDT}
        />
      </div>
      <label class="label">Image Src</label>
      <div class="control mb-3">
        <input
          class="input"
          type="text"
          placeholder=""
          value={props.data && props.data.imgSrc}
        />
      </div>
      <label class="label">More Info Link</label>
      <div class="control mb-3">
        <input
          class="input"
          type="text"
          placeholder=""
          value={props.data && props.data.link}
        />
      </div>
      <label class="label">Company</label>
      <div class="select mb-3">
        <select value={props.data && props.data.companyId}>
          {props.orgs &&
            props.orgs.map((org) => <option value={org.id}>{org.name}</option>)}
        </select>
      </div>
      <div class="field is-grouped">
        <div class="control">
          <input type="submit" class="button is-link" />
        </div>
        <div class="control">
          <button class="button is-link is-light" onClick={closeBtn}>
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
  const formRenderer = (type) => {
    switch (type) {
      case schema.ORG:
        return formOrg;
      case schema.OUTLET:
        return formOutlet;
      case schema.DEAL:
        return formDeal;
    }
  };

  return (
    <div className={`modal ${props.visible && "is-active"}`}>
      <div className="modal-background"></div>
      <div className="modal-content box">
        <h5 className="is-size-5">
          {props.title} {props.type} {props.data && props.data.id}
        </h5>

        <div className="block">{formRenderer(props.type)}</div>
      </div>
      <button className="modal-close is-large" onClick={closeBtn}></button>
    </div>
  );
};

export default AddEditDialog;
