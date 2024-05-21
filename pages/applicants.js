import { useState, useEffect, useRef } from 'react';
import SideBar from '../components/SideBar.js';
import JobPostModal from '../components/JobPostModal.js';
import PageHeader from '../components/PageHeader.js';
import { APPLICATION_STATUS, IMAGES, PAGES } from '../utils/constants.js';
import Breadcrumb from '../components/BreadCrumb.js';
import { useApiCall } from '../context/apiCall.js';
import moment from 'moment';
import ApplicationModal from '../components/ApplicationModal.js';
import LoadingSpinner from '../components/LoadingSpinner.js';
import EmptyData from '../components/EmptyData.js';

const main = () => {
  const { apiData } = useApiCall();
  const [toggleModal, setToggleModal] = useState({
    application: false,
  });

  const [selectedApplication, setSelectedApplication] = useState(null);

  const Applicant = ({ applicant, jobTitle }) => {
    return (
      <tr className="align-middle">
        <th scope="row">
          <div className="row">
            <div className="col-auto">
              <img
                className="rounded-circle border justify-content-center align-items-center avatar"
                src={IMAGES.applicant_placeholder.url}
                alt="Applicant Avatar"
              />
            </div>
            <div className="col">
              <div className="row">
                <div className="col">{applicant.fullName}</div>
              </div>
              <div className="row">
                <small>
                  <div className="col fw-light text-muted">
                    <small>
                      {applicant.createdAt}
                      <i className="bi bi-dot"></i>
                      {applicant.state}
                    </small>
                    <div className="row mt-2">
                      <div>
                        <i className="bi bi-envelope"></i> {applicant.email}
                      </div>
                      <div>
                        <i className="bi bi-telephone"></i>{' '}
                        {applicant.phoneNumber}
                      </div>
                    </div>
                  </div>
                </small>
              </div>
            </div>
          </div>
        </th>
        <td>
          <small className="fw-light">Applied for</small>
          <br />
          {jobTitle}
        </td>
        <td>
          {applicant.application_action_status == 'withdraw' ? (
            <span class="text-muted">Application Withdrawn</span>
          ) : (
            <strong
              className="text-primary fw-bold clickable"
              onClick={() => {
                setToggleModal({
                  ...toggleModal,
                  application: true,
                });
                setSelectedApplication(applicant);
              }}
            >
              {applicant.applicationStatusName}{' '}
              <i className="bi bi-pencil clickable text-primary"></i>
            </strong>
          )}
        </td>
      </tr>
    );
  };

  return (
    <SideBar>
      <div class="container ps-0">
        <Breadcrumb page={PAGES.applicants} />
        <PageHeader
          title={PAGES.applicants.name}
          description={PAGES.applicants.description}
        />
        <ApplicationModal
          toggleModal={toggleModal}
          setToggleModal={setToggleModal}
          applicationData={selectedApplication}
        />
        <LoadingSpinner isLoading={apiData.jobPost.isLoading} />
        {!apiData.jobPost.isLoading && apiData.jobPost.data.length == 0 ? (
          <EmptyData
            icon={<i class="fs-5 bi-people"></i>}
            title="No applicant yet"
            description="Share your job listing on various social media sites to make it more visible."
          />
        ) : (
          <table class="table table-responsive">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {apiData.jobPost.data?.map((jobPost, index) =>
                jobPost.application.map((application, index2) => {
                  const applicant = {
                    id: application.id,
                    createdAt: moment(application.created_at).fromNow(),
                    fullName: application.resume.full_name,
                    email: application.resume.email,
                    phoneNumber: application.resume.phone_number,
                    state: application.resume.state,
                    application_status: application.application_status,
                    applicationStatusName:
                      (
                        APPLICATION_STATUS.find(
                          (status) =>
                            status.value === application.application_status
                        ) || {}
                      ).name || 'Status not found',
                    application_action_status:
                      application.application_action_status,
                  };

                  return (
                    <Applicant
                      key={`${index}-${index2}`} // Assign a unique key using index values
                      applicant={applicant}
                      jobTitle={jobPost.title}
                    />
                  );
                })
              )}
            </tbody>
          </table>
        )}
      </div>
    </SideBar>
  );
};

export default main;
