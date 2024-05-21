import LoadingSpinner from './LoadingSpinner';
import { useEffect, useState } from 'react';
import {
  COMPANY_SIZES,
  COUNTRIES,
  EMPLOYMENT_TYPES,
  INDUSTRIES,
  PAGES,
  SALARY_TYPES,
} from '../utils/constants';
import moment from 'moment';
import GlobalButton from './GlobalButton';
import toast from 'react-hot-toast';
import { useApiCall } from '../context/apiCall';
import EmptyData from './EmptyData';
import { findInArray, getDisplayValue } from '../utils/helper';
import ShareJobModal from './ShareJobModal';
import { useModal } from '../context/modal';
import Link from 'next/link';
import { useTempData } from '../context/tempData';

function JobDetails({ isLoading, showBtnExternalPage = true, item = null }) {
  const { toggleModal } = useModal();
  const { tempData, setValueTempData } = useTempData();
  const { apiData } = useApiCall();

  const [buttonConfig, setButtonConfig] = useState({
    apply: {
      isLoading: false,
    },
  });

  const selectedJob = item ? item : tempData.selectedItem.jobDetails;

  const jobData = {
    isApplied: apiData.application.data.some(
      (job) => job.job_post_id === selectedJob?.id
    ),
    employmentType: EMPLOYMENT_TYPES.find(
      (type) => type.value === selectedJob?.employment_type
    )?.name,
    createdAt: moment(selectedJob?.created_at).fromNow(),
    company: selectedJob?.company_profile?.company_name || '-',
    companyUid: selectedJob?.company_profile?.uid,
    salary: `RM ${selectedJob?.min_salary} -  ${selectedJob?.max_salary} ${
      SALARY_TYPES.find((type) => type.value === selectedJob?.salary_type)?.name
    }`,
    location: `${getDisplayValue(selectedJob?.company_profile, 'address_1')}${
      getDisplayValue(selectedJob?.company_profile, 'address_2')
        ? `, ${getDisplayValue(selectedJob?.company_profile, 'address_2')}`
        : ''
    }${
      getDisplayValue(selectedJob?.company_profile, 'city')
        ? `, ${getDisplayValue(selectedJob?.company_profile, 'city')}`
        : ''
    }${
      getDisplayValue(selectedJob?.company_profile, 'state')
        ? `, ${getDisplayValue(selectedJob?.company_profile, 'state')}`
        : ''
    }, ${getDisplayValue(
      findInArray(COUNTRIES, 'value', selectedJob?.company_profile?.country),
      'name',
      ''
    )}`,
    requirements: selectedJob?.requirements ? selectedJob?.requirements : [],
    benefits: selectedJob?.benefits ? selectedJob?.benefits : [],
    size: getDisplayValue(
      findInArray(COMPANY_SIZES, 'value', selectedJob?.company_profile?.size),
      'name',
      '-'
    ),
    registration_number:
      selectedJob?.company_profile?.registration_number || '-',
    industries:
      Array.isArray(
        getDisplayValue(selectedJob?.company_profile, 'industries')
      ) &&
      getDisplayValue(selectedJob?.company_profile, 'industries').map(
        (industry, index) =>
          INDUSTRIES.find((level) => level.value === industry)?.name ?? '-'
      ),
  };

  return (
    <>
      <ShareJobModal />
      <div>
        {isLoading && <LoadingSpinner />}
        {!selectedJob && (
          <div class="mt-5">
            <EmptyData
              icon={<i class="fs-1 bi bi-rocket-takeoff"></i>}
              title="Start Your Job Journey"
              description="Click on any job post to see more information!"
            />
          </div>
        )}
        {selectedJob && (
          <div>
            {selectedJob && (
              <div class="card-body">
                <div class="d-flex flex-wrap mb-2">
                  <div class="flex-grow-1 mb-1">
                    <h5 class="mb-0">
                      <strong class="card-title h3">{selectedJob.title}</strong>
                    </h5>
                    <div>
                      <small class="text-muted">{jobData.employmentType}</small>
                      <i class="bi bi-dot"></i>
                      <small class="text-muted">{jobData.createdAt}</small>
                    </div>
                  </div>
                  <div class="flex-shrink-0 mt-2 mt-md-0 text-md-right">
                    <GlobalButton
                      btnType="button"
                      btnClass={`btn ${
                        jobData.isApplied
                          ? 'btn-outline-success'
                          : 'btn-primary'
                      } me-1`}
                      btnLoading={buttonConfig.apply.isLoading}
                      btnOnClick={() => {
                        toggleModal('applyJob');
                        setValueTempData('selectedItem', {
                          ...tempData.selectedItem,
                          jobDetails: selectedJob,
                        });
                      }}
                    >
                      {jobData.isApplied ? (
                        <i class="bi bi-check-lg me-1"></i>
                      ) : (
                        ''
                      )}
                      {jobData.isApplied ? 'Applied' : 'Apply Now'}
                    </GlobalButton>
                    {showBtnExternalPage ? (
                      <GlobalButton
                        btnType="button"
                        btnClass="btn btn-secondary me-1"
                        btnLoading={false}
                        btnOnClick={() => {
                          window.open(
                            `${PAGES.viewJob.directory}?jobId=${selectedJob.uid}`,
                            '_blank'
                          );
                        }}
                      >
                        <i class="bi bi-arrows-fullscreen"></i>
                      </GlobalButton>
                    ) : (
                      ''
                    )}
                    <GlobalButton
                      btnType="button"
                      btnClass="btn btn-secondary"
                      btnLoading={false}
                      btnOnClick={() => {
                        toggleModal('shareJob');
                        setValueTempData('links', {
                          ...tempData.links,
                          shareJobUrl: `${process.env.NEXT_PUBLIC_DOMAIN_URL}${PAGES.viewJob.directory}?jobId=${item.uid}`,
                        });
                      }}
                    >
                      <i class="bi bi-share-fill"></i>
                    </GlobalButton>
                  </div>
                </div>

                <div class="text-muted small">
                  <ul class="list-unstyled bg-light rounded-2 p-2 mt-2">
                    <li class="mb-2">
                      <small class="text-muted">Salary</small>
                      <p class="fw-bold mb-0 text-truncate">{jobData.salary}</p>
                    </li>
                    <li class="mb-2">
                      <small class="text-muted">Requirements</small>
                      <p class="fw-bold mb-0 text-truncate">
                        {jobData.requirements.map((selectedJob, index) => {
                          return <li key={index}>{selectedJob}</li>;
                        })}
                      </p>
                    </li>
                    <li class="mb-2">
                      <small class="text-muted">Benefits</small>
                      <p class="fw-bold mb-0 text-truncate">
                        {jobData.benefits.map((selectedJob, index) => {
                          return <li key={index}>{selectedJob}</li>;
                        })}
                      </p>
                    </li>
                    <hr />
                    <li class="mb-2">
                      <small class="text-muted">Company</small>
                      <p class="fw-bold mb-0 text-truncate">
                        {jobData.company ? (
                          <Link
                            href={`${PAGES.profile.directory}?type=company&uid=${jobData.companyUid}`}
                            target="_blank"
                            class="nav-link"
                          >
                            {jobData.company}
                          </Link>
                        ) : (
                          ''
                        )}
                      </p>
                    </li>
                    <li class="mb-2">
                      <small class="text-muted">Registration Number</small>
                      <p class="fw-bold mb-0 text-truncate">
                        {jobData.registration_number}
                      </p>
                    </li>
                    <li class="mb-2">
                      <small class="text-muted">Company Size</small>
                      <p class="fw-bold mb-0 text-truncate">{jobData.size}</p>
                    </li>
                    <li class="mb-2">
                      <small class="text-muted">Industries</small>
                      <p class="fw-bold mb-0 text-truncate">
                        {jobData.industries.join(', ')}
                      </p>
                    </li>
                    <li class="mb-2">
                      <small class="text-muted">
                        <i class="bi bi-geo-alt"></i> Location
                      </small>
                      <p class="fw-bold mb-0 text-truncate">
                        {jobData.location}
                      </p>
                    </li>
                  </ul>
                </div>
                <Link
                  href={`${PAGES.profile.directory}?type=company&uid=${jobData.companyUid}`}
                  target="_blank"
                  class="nav-link"
                >
                  <h6
                    class="text-primary text-end"
                    data-lang-key="global.see_more"
                  >
                    More from {jobData.company}{' '}
                    <i class="bi bi-arrow-up-right-circle ms-1"></i>
                  </h6>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default JobDetails;
