const BulkDialog = ({ props, closeBtn }) => {
  return (
    <div className={`modal ${props.visible && "is-active"}`}>
      <div className="modal-background"></div>
      <div className="modal-content box">
        <h5 className="is-size-5">Bulk Add Outlets</h5>

        <div className="block">
          <form>
            <label class="label">Payload</label>
            <div className="control mb-3">
              <textarea class="textarea" placeholder="{}"></textarea>
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
        </div>
      </div>
      <button className="modal-close is-large" onClick={closeBtn}></button>
    </div>
  );
};

export default BulkDialog;
