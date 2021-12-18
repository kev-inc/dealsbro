import "./Sidebar.css";

const Sidebar = ({
  deals,
  selectedLocation,
  toggleDealVisibility,
  setSelectedLocation,
  selectAll,
  deselectAll,
}) => {
  return (
    <div className="sidebar">
      <div className="is-flex is-align-items-center is-justify-content-center mb-3">
        <strong className="is-size-5">Active Deals</strong>
        <span className="tag is-primary ml-2">{deals.length}</span>
      </div>

      <div>
        {selectedLocation ? (
          <div>
            <div className="buttons are-small">
              <button
                className="button is-light"
                onClick={() => setSelectedLocation(null)}
              >
                Back
              </button>
            </div>
            {selectedLocation.deals.map((deal, index) => (
              <div className="box" key={index}>
                <img src={deal.imgSrc} alt="thumbnail" />
                <small className="has-text-weight-medium">
                  {selectedLocation.outlet.name}
                </small>
                <h3 className="has-text-weight-semibold">{deal.title}</h3>
                <p>{deal.description}</p>
                <small className="is-italic">
                  {deal.startDT} - {deal.endDT}
                </small>
                <br />
                <small>
                  <a href={deal.link}>More Info</a>
                </small>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <div className="buttons are-small">
              <button className="button is-primary" onClick={selectAll}>
                Select All
              </button>
              <button className="button is-light" onClick={deselectAll}>
                Unselect All
              </button>
            </div>
            {deals.map((deal, index) => (
              <div
                key={index}
                className={`box is-clickable ${!deal.checked && "hide"}`}
                onClick={() => toggleDealVisibility(index)}
              >
                <strong>{deal.title}</strong>
                <p>{deal.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
