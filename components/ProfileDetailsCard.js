import { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';
import EmptyMessage from './EmptyMessage';
import {
  COMPANY_SIZES,
  COUNTRIES,
  CURRENT_JOB_STATUS,
  EMPLOYMENT_TYPES,
  INDUSTRIES,
  LANGUAGE_LEVELS,
  PAGES,
  SALARY_TYPES,
  SKILL_LEVELS,
} from '../utils/constants';
import moment from 'moment';
import GlobalButton from './GlobalButton';
import Offcanvas from 'react-bootstrap/Offcanvas';
import toast from 'react-hot-toast';
import { useApiCall } from '../context/apiCall';
import JobList from './JobList';
import JobDetails from './JobDetails';
import { useModal } from '../context/modal';

function ProfileDetailsCard({ isLoading, isEmpty, item, type }) {
  const { isModalOpen, toggleModal } = useModal();

  const [buttonConfig, setButtonConfig] = useState({
    apply: {
      isLoading: false,
    },
  });

  const findInArray = (array, property, value) => {
    return array.find((item) => item[property] === value);
  };

  const getDisplayValue = (item, property, defaultValue = '-') => {
    return item?.[property] ?? defaultValue;
  };

  const jobSeekerProfileConfig = {
    username: {
      title: 'Username',
      value: getDisplayValue(item?.profile, 'username'),
    },
    accountType: {
      title: 'Account Type',
      value: 'Job Seeker',
    },
    country: {
      title: 'Country',
      value: getDisplayValue(
        findInArray(COUNTRIES, 'value', item?.country),
        'name',
        ''
      ),
    },
  };

  const jobSeekerDetailsConfig = {
    currentJobStatus: {
      title: 'Current Job Status',
      value: getDisplayValue(
        findInArray(CURRENT_JOB_STATUS, 'value', item?.current_job_status),
        'name',
        ''
      ),
    },
    preferredJob: {
      title: 'Preferred Job',
      value: getDisplayValue(item, 'preferred_job'),
    },
    expectedSalary: {
      title: 'Expected Salary',
      value: `${getDisplayValue(item, 'expected_min_salary')}${
        getDisplayValue(item, 'expected_max_salary')
          ? ` - ${getDisplayValue(item, 'expected_max_salary')}`
          : ''
      } ${getDisplayValue(
        findInArray(SALARY_TYPES, 'value', item?.expected_salary_type),
        'name',
        ''
      )}`,
    },
    skills: {
      title: 'Skills',
      value: Array.isArray(getDisplayValue(item, 'skills')) ? (
        <ul>
          {getDisplayValue(item, 'skills').map((skills) => {
            if (skills?.name) {
              return (
                <li key={skills.name}>
                  {`${skills.name} - ${
                    SKILL_LEVELS.find((level) => level.value === skills.level)
                      ?.name ?? '-'
                  }`}
                </li>
              );
            }
            return '-';
          })}
        </ul>
      ) : (
        getDisplayValue(item, 'skills')
      ),
    },
  };

  const jobSeekerDetailsConfig2 = {
    aboutMe: {
      title: 'About Me',
      value: getDisplayValue(item, 'about_me'),
    },
    fullName: {
      title: 'Full Name',
      value: getDisplayValue(item, 'full_name'),
    },
    gender: {
      title: 'Gender',
      value: getDisplayValue(item, 'gender'),
    },
    dateOfBirth: {
      title: 'Date of Birth',
      value: getDisplayValue(item, 'date_of_birth'),
    },
    phoneNumber: {
      title: 'Phone Number',
      value: getDisplayValue(item, 'phone_number'),
    },
    address: {
      title: 'Address',
      value: `${getDisplayValue(item, 'address_1')}${
        getDisplayValue(item, 'address_2')
          ? `, ${getDisplayValue(item, 'address_2')}`
          : ''
      }${
        getDisplayValue(item, 'city')
          ? `, ${getDisplayValue(item, 'city')}`
          : ''
      }${
        getDisplayValue(item, 'state')
          ? `, ${getDisplayValue(item, 'state')}`
          : ''
      }, ${getDisplayValue(
        findInArray(COUNTRIES, 'value', item?.country),
        'name',
        ''
      )}`,
    },
    workExperiences: {
      title: 'Work Experiences',
      value: Array.isArray(getDisplayValue(item, 'work_experience')) ? (
        <ul>
          {getDisplayValue(item, 'work_experience').map((work) => {
            if (work?.job_title) {
              return (
                <li key={work.job_title}>
                  <strong>{work.job_title}</strong> at {work.company_name} (
                  {work.start_date} - {work.end_date})
                  <br />
                  Responsibilities: {work?.responsibilities ?? ''}
                </li>
              );
            }
            return '-';
          })}
        </ul>
      ) : (
        getDisplayValue(item, 'work_experience')
      ),
    },
    educationBackground: {
      title: 'Education Background',
      value: getDisplayValue(item, 'education_background'),
      value: Array.isArray(getDisplayValue(item, 'education_background')) ? (
        <ul>
          {getDisplayValue(item, 'education_background').map((edu) => {
            if (edu?.institution_name) {
              return (
                <li key={edu.institution_name}>
                  <strong>{edu.institution_name}</strong>
                  {edu.field_of_study && `, ${edu.field_of_study}`}
                  {edu.start_date && ` (${edu.start_date} - ${edu.end_date})`}
                </li>
              );
            }
            return '-';
          })}
        </ul>
      ) : (
        getDisplayValue(item, 'education_background')
      ),
    },
    languages: {
      title: 'Languages',
      value: Array.isArray(getDisplayValue(item, 'languages')) ? (
        <ul>
          {getDisplayValue(item, 'languages').map((language) => {
            if (language?.name) {
              return (
                <li key={language.name}>
                  {`${language.name} - ${
                    LANGUAGE_LEVELS.find(
                      (level) => level.value === language.level
                    )?.name ?? '-'
                  }`}
                </li>
              );
            }
            return '-';
          })}
        </ul>
      ) : (
        getDisplayValue(item, 'languages')
      ),
    },
  };

  const companyProfileConfig = {
    companyName: {
      title: 'Company Name',
      value: getDisplayValue(item, 'company_name'),
    },
    accountType: {
      title: 'Account Type',
      value: 'Company',
    },
    country: {
      title: 'Country',
      value: getDisplayValue(
        findInArray(COUNTRIES, 'value', item?.country),
        'name',
        ''
      ),
    },
  };

  const companyDetailsConfig = {
    companySize: {
      title: 'Company Size',
      value: getDisplayValue(
        findInArray(COMPANY_SIZES, 'value', item?.size),
        'name',
        ''
      ),
    },
    registrationNumber: {
      title: 'Registration Number',
      value: getDisplayValue(item, 'registration_number'),
    },
    skills: {
      title: 'Industries',
      value: Array.isArray(getDisplayValue(item, 'industries')) ? (
        <ul>
          {getDisplayValue(item, 'industries').map((industries, index) => {
            return (
              <li key={index}>
                {INDUSTRIES.find((level) => level.value === industries)?.name ??
                  '-'}
              </li>
            );
          })}
        </ul>
      ) : (
        ''
      ),
    },
  };

  const companyDetailsConfig2 = {
    aboutUs: {
      title: 'About Us',
      value: getDisplayValue(item, 'about_us'),
    },
    fullName: {
      title: 'Website',
      value: getDisplayValue(item, 'website'),
    },
    address: {
      title: 'Address',
      value: `${getDisplayValue(item, 'address_1')}${
        getDisplayValue(item, 'address_2')
          ? `, ${getDisplayValue(item, 'address_2')}`
          : ''
      }${
        getDisplayValue(item, 'city')
          ? `, ${getDisplayValue(item, 'city')}`
          : ''
      }${
        getDisplayValue(item, 'state')
          ? `, ${getDisplayValue(item, 'state')}`
          : ''
      }, ${getDisplayValue(
        findInArray(COUNTRIES, 'value', item?.country),
        'name',
        ''
      )}`,
    },
  };

  const companyJobsConfig = {
    jobs: item?.job_post ?? [],
  };

  const mapValue = (data) => {
    return Object.entries(data).map(([key, value]) => {
      return (
        <div class="mt-4">
          <strong>{value.title}</strong>
          <p>{value.value}</p>
        </div>
      );
    });
  };

  return (
    <div class="row">
      <div class="col-lg-4">
        <div class="card">
          <div class="card-body">
            <div class="text-center">
              <div>
                <div class="col-auto">
                  {type == 'resume' ? (
                    <i class="fs-1 bi-person-circle"></i>
                  ) : (
                    ''
                  )}
                  {type == 'company' ? <i class="fs-1 bi-building"></i> : ''}
                </div>
                <div class="col my-auto">
                  <h5 class="mb-0">
                    <strong class="card-title h3">
                      {type == 'resume'
                        ? jobSeekerProfileConfig.username.value
                        : ''}
                      {type == 'company'
                        ? companyProfileConfig.companyName.value
                        : ''}
                    </strong>
                  </h5>
                  <div>
                    <small class="text-muted">
                      {type == 'resume'
                        ? jobSeekerProfileConfig.accountType.value
                        : ''}
                      {type == 'company'
                        ? companyProfileConfig.accountType.value
                        : ''}
                    </small>
                    <i class="bi bi-dot"></i>
                    <small class="text-muted">
                      {type == 'resume'
                        ? jobSeekerProfileConfig.country.value
                        : ''}
                      {type == 'company'
                        ? companyProfileConfig.country.value
                        : ''}
                    </small>
                  </div>
                </div>
              </div>
              {/* <div class="mt-4">
                <GlobalButton
                  btnType="button"
                  btnClass="btn btn-primary me-1"
                  btnTitle="Follow"
                  btnLoading={buttonConfig.apply.isLoading}
                  btnOnClick={() => {}}
                />
                <GlobalButton
                  btnType="button"
                  btnClass="btn btn-primary me-1"
                  btnLoading={buttonConfig.apply.isLoading}
                  btnOnClick={() => {}}
                >
                  <i class="bi bi-chat-dots-fill"></i>
                </GlobalButton>
                <GlobalButton
                  btnType="button"
                  btnClass="btn btn-secondary me-1"
                  btnLoading={buttonConfig.apply.isLoading}
                  btnOnClick={() => {}}
                >
                  <i class="bi bi-share-fill"></i>
                </GlobalButton>
              </div> */}
            </div>
            <div class="text-break mt-4">
              {type == 'resume' ? mapValue(jobSeekerDetailsConfig) : ''}
              {type == 'company' ? mapValue(companyDetailsConfig) : ''}
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-8">
        <div class="mb-3 sticky-top sticky-top-padding">
          <div class="row">
            <div class="col">
              <div class="card vh-100 mt-lg-0 mt-3">
                {isLoading && <LoadingSpinner />}
                {isEmpty && <EmptyMessage />}
                {!isEmpty && (
                  <div>
                    {item && (
                      <div class="card-body">
                        <div>
                          <nav>
                            <div
                              class="nav nav-tabs"
                              id="nav-tab"
                              role="tablist"
                            >
                              <button
                                class="nav-link active"
                                id="nav-profile-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#nav-profile"
                                type="button"
                                role="tab"
                                aria-controls="nav-profile"
                                aria-selected="true"
                              >
                                {type == 'resume' ? 'My Profile' : 'Profile'}
                              </button>
                              {type == 'company' ? (
                                <button
                                  class="nav-link"
                                  id="nav-jobs-tab"
                                  data-bs-toggle="tab"
                                  data-bs-target="#nav-jobs"
                                  type="button"
                                  role="tab"
                                  aria-controls="nav-jobs"
                                  aria-selected="true"
                                >
                                  Jobs{' '}
                                  {companyJobsConfig.jobs.length > 0 ? (
                                    <span class="badge bg-primary">
                                      {companyJobsConfig.jobs.length}
                                    </span>
                                  ) : (
                                    ''
                                  )}
                                </button>
                              ) : (
                                ''
                              )}
                            </div>
                          </nav>
                          <div class="tab-content mt-4" id="nav-tabContent">
                            <div
                              class="tab-pane fade show active"
                              id="nav-profile"
                              role="tabpanel"
                              aria-labelledby="nav-profile-tab"
                            >
                              <div class="text-break">
                                {type == 'resume' ? (
                                  <div class="d-flex justify-content-end">
                                    <GlobalButton
                                      btnType="button"
                                      btnClass="btn btn-primary me-1"
                                      btnLoading={buttonConfig.apply.isLoading}
                                      btnOnClick={() => {}}
                                    >
                                      <i class="bi bi-download"></i> Download
                                      Resume
                                    </GlobalButton>
                                  </div>
                                ) : (
                                  ''
                                )}
                                {type == 'resume'
                                  ? mapValue(jobSeekerDetailsConfig2)
                                  : ''}
                                {type == 'company'
                                  ? mapValue(companyDetailsConfig2)
                                  : ''}
                              </div>
                            </div>
                            {type == 'company' ? (
                              <div
                                class="tab-pane fade"
                                id="nav-jobs"
                                role="tabpanel"
                                aria-labelledby="nav-jobs-tab"
                              >
                                <div>
                                  <JobList />
                                  <Offcanvas
                                    show={isModalOpen.jobDetails}
                                    onHide={() => {
                                      toggleModal('jobDetails');
                                    }}
                                    placement="end"
                                  >
                                    <Offcanvas.Header
                                      closeButton
                                    ></Offcanvas.Header>
                                    <Offcanvas.Body>
                                      <JobDetails />
                                    </Offcanvas.Body>
                                  </Offcanvas>
                                </div>
                              </div>
                            ) : (
                              ''
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileDetailsCard;
