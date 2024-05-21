function JobAlertCard() {
  return (
    <div class="card bg-dark text-white">
      <div class="card-body">
        <h5 class="card-title mb-0" data-lang-key="job_list.get_alert_xxx">
          Get alert for new jobs
        </h5>
        <small class="card-text fw-lighter">
          Stay updated on the latest job postings at Gikijo.
        </small>
        <form id="addJobAlertForm" class="mt-3">
          <div class="mb-3">
            <label>
              <span data-lang-key="global.name">Name</span>
            </label>
            <input
              type="text"
              class="form-control"
              placeholder=""
              id="input-job-alert-name"
              required=""
            />
          </div>
          <div class="mb-3">
            <label>
              <span data-lang-key="global.email">Email</span>
            </label>
            <input
              type="email"
              class="form-control"
              placeholder=""
              id="input-job-alert-email"
              required=""
            />
          </div>
          <div>
            <button
              type="submit"
              class="btn btn-primary"
              id="submit-job-alert-btn"
            >
              <span data-lang-key="global.submit">Submit</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default JobAlertCard;
