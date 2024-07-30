import React from "react";

const DeleteSite = () => {
  return (
    <div>
      <div class="modal fade" id="deleteModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Confirm Deletion</h4>
              <button type="button" class="close" data-dismiss="modal">
                &times;
              </button>
            </div>

            <div class="modal-body">
              Are you sure you want to delete this site? <br/>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-danger" id="confirmDelete">
                Yes
              </button>
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteSite;
