import Modal from 'react-bootstrap/Modal';
import GlobalButton from './GlobalButton';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import {
  findInArray,
  generateUniqueID,
  getDisplayValue,
} from '../utils/helper';
import DynamicSingleForm from './DynamicSingleForm';
import {
  COMPANY_SIZES,
  COUNTRIES,
  EMPLOYMENT_TYPES,
  INDUSTRIES,
  SALARY_TYPES,
} from '../utils/constants';
import { useApiCall } from '../context/apiCall';
import { useTempData } from '../context/tempData';
import { useModal } from '../context/modal';

const JobPostModal = () => {
  const { apiData, addJobPostApi, editJobPostApi, deleteJobPostApi } =
    useApiCall();

  const { isModalOpen, toggleModal } = useModal();
  const { tempData, setValueTempData } = useTempData();
  const jobData = tempData.selectedItem.editJobDetails;
  const companyProfileData = apiData.companyProfile.data;

  const [buttonConfig, setButtonConfig] = useState({
    submit: {
      isLoading: false,
    },
    delete: {
      isLoading: false,
    },
  });

  const [arrayElements, setArrayElements] = useState({
    requirements: [''],
    benefits: [''],
  });

  const handleClose = () => {
    toggleModal('jobPost');
    setValueTempData('selectedItem', {
      ...tempData.selectedItem,
      editJobDetails: null,
    });
  };

  const formConfig = () => {
    const forms = {
      job_post: {
        title: document.getElementById('input-job-title'),
        employment_type: document.getElementById('select-job-type'),
        min_salary: document.getElementById('input-min-salary'),
        max_salary: document.getElementById('input-max-salary'),
        salary_type: document.getElementById('select-salary-type'),
        company_profile_id: document.getElementById(
          'select-company-profile-id'
        ),
        // requirements
        // benefits
        agree_to_term: document.getElementById('input-agree-to-term'),
      },
    };

    return forms;
  };

  useEffect(() => {
    if (jobData && isModalOpen.jobPost) {
      for (const key in jobData) {
        if (formConfig().job_post.hasOwnProperty(key)) {
          const element = formConfig().job_post[key];
          if (element.type === 'checkbox') {
            if (jobData[key]) {
              element.checked = true;
            } else {
              element.checked = false;
            }
          } else {
            element.value = jobData[key];
          }
        }
      }
    }

    setArrayElements((prevState) => ({
      ...prevState,
      requirements: jobData?.requirements || [],
      benefits: jobData?.benefits || [],
    }));
  }, [jobData, isModalOpen.jobPost]);

  const getKeyValue = () => {
    const keyValue = {};
    for (const key in formConfig().job_post) {
      const element = formConfig().job_post[key];
      if (element?.type === 'checkbox') {
        keyValue[key] = element.checked;
      } else {
        keyValue[key] = element.value;
      }
    }

    return keyValue;
  };

  const onDeleteJobPost = async (event) => {
    event.preventDefault();

    const confirmDelete = window.confirm(
      'Are you sure you want to delete this record?'
    );

    if (confirmDelete) {
      setButtonConfig({
        ...buttonConfig,
        delete: {
          ...buttonConfig.delete,
          isLoading: true,
        },
      });

      const result = await deleteJobPostApi({
        id: jobData.id,
      });

      if (result) {
        handleClose();
      }

      setButtonConfig({
        ...buttonConfig,
        delete: {
          ...buttonConfig.delete,
          isLoading: false,
        },
      });
    }
  };

  const getJobSummary = (item) => {
    const companyData = companyProfileData.find(
      (company) => company.id.toString() === item?.company_profile_id.toString()
    );

    const jobData = {
      jobTitle: item?.title,
      employmentType: EMPLOYMENT_TYPES.find(
        (type) => type.value === item?.employment_type
      )?.name,
      salary: `RM ${item?.min_salary} - ${item?.max_salary} ${
        SALARY_TYPES.find((type) => type.value === item?.salary_type)?.name
      }`,
      requirements: item?.requirements ? item?.requirements : [],
      benefits: item?.benefits ? item?.benefits : [],
      location: `${getDisplayValue(companyData, 'address_1')}${
        getDisplayValue(companyData, 'address_2')
          ? `, ${getDisplayValue(companyData, 'address_2')}`
          : ''
      }${
        getDisplayValue(companyData, 'city')
          ? `, ${getDisplayValue(companyData, 'city')}`
          : ''
      }${
        getDisplayValue(companyData, 'state')
          ? `, ${getDisplayValue(companyData, 'state')}`
          : ''
      }, ${getDisplayValue(
        findInArray(COUNTRIES, 'value', companyData?.country),
        'name',
        ''
      )}`,
      company: companyData?.company_name || '-',
      size: getDisplayValue(
        findInArray(COMPANY_SIZES, 'value', companyData?.size),
        'name',
        '-'
      ),
      registration_number: companyData?.registration_number || '-',
      industries:
        Array.isArray(getDisplayValue(companyData, 'industries')) &&
        getDisplayValue(companyData, 'industries').map(
          (industry, index) =>
            INDUSTRIES.find((level) => level.value === industry)?.name ?? '-'
        ),
    };

    const summary = `
    Job Title: ${jobData.jobTitle},
    Employment Type: ${jobData.employmentType},
    Requirements: ${jobData.requirements.join(', ') || 'None specified'},
    Benefits: ${jobData.benefits.join(', ') || 'None specified'},
    Location: ${jobData.location},
    Salary: ${jobData.salary},
    Company: ${jobData.company},
    Size: ${jobData.size},
    Industries: ${jobData.industries.join(', ')},
    Registration Number: ${jobData.registration_number}
    `;

    return summary;
  };

  const onSubmitJobPost = async (event) => {
    event.preventDefault();

    setButtonConfig({
      ...buttonConfig,
      submit: {
        ...buttonConfig.submit,
        isLoading: true,
      },
    });

    const addData = getKeyValue();
    addData.requirements = arrayElements.requirements;
    addData.benefits = arrayElements.benefits;

    const createSummary = getJobSummary(addData);
    addData.summary = createSummary;

    var success = false;

    if (jobData?.id) {
      const result = await editJobPostApi({
        postData: addData,
        id: jobData.id,
      });
      if (result) {
        success = true;
      }
    } else {
      const result = await addJobPostApi({
        uid: generateUniqueID(),
        ...addData,
      });
      if (result) {
        success = true;
      }
    }

    setButtonConfig({
      ...buttonConfig,
      submit: {
        ...buttonConfig.submit,
        isLoading: false,
      },
    });

    if (success) {
      toast.success('Saved!');
      handleClose();
    }
  };

  const addElement = (type) => {
    setArrayElements((prevState) => ({
      ...prevState,
      [type]: [...prevState[type], ''],
    }));
  };

  const removeElement = (type, index) => {
    setArrayElements((prevState) => ({
      ...prevState,
      [type]: prevState[type].filter((_, i) => i !== index),
    }));
  };

  const handleChange = (type, index, value) => {
    const updatedElements = [...arrayElements[type]];
    updatedElements[index] = value;
    setArrayElements((prevState) => ({
      ...prevState,
      [type]: updatedElements,
    }));
  };

  return (
    <>
      <Modal show={isModalOpen.jobPost} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Job Post</Modal.Title>
        </Modal.Header>
        <form onSubmit={onSubmitJobPost}>
          <Modal.Body>
            <div class="mb-3">
              <label htmlFor="select-company-profile-id" class="form-label">
                Company
              </label>

              <div class="input-group mb-1">
                <select
                  class="form-select"
                  id="select-company-profile-id"
                  required
                >
                  {companyProfileData?.map((item, index) => {
                    return (
                      <option value={item.id} key={index}>
                        {item.company_name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <small class="text-muted">
                Company not found?{' '}
                <span
                  class="text-primary clickable"
                  onClick={() => {
                    toggleModal('companyProfile');
                  }}
                >
                  <i class="bi bi-plus-square-dotted ms-1"></i> Add Company
                </span>
              </small>
            </div>

            <div class="mb-3">
              <label htmlFor="input-job-title" class="form-label">
                Job Title
              </label>
              <input
                type="text"
                class="form-control"
                id="input-job-title"
                required
              />
            </div>
            <div class="mb-3">
              <label htmlFor="select-job-type" class="form-label">
                Type
              </label>
              <select class="form-select" id="select-job-type" required>
                {EMPLOYMENT_TYPES.map((item, index) => {
                  return (
                    <option value={item.value} key={index}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div class="mb-3">
              <label htmlFor="input-min-salary" class="form-label">
                Salary
              </label>
              <div class="row g-2">
                <div class="col-md">
                  <div class="input-group">
                    <span class="input-group-text">RM</span>
                    <input
                      type="number"
                      class="form-control"
                      id="input-min-salary"
                      placeholder="min"
                    />
                  </div>
                </div>
                <div class="col-md">
                  <div class="input-group">
                    <span class="input-group-text">RM</span>
                    <input
                      type="number"
                      class="form-control"
                      id="input-max-salary"
                      placeholder="max"
                    />
                  </div>
                </div>
                <div class="col-md">
                  <select class="form-select" id="select-salary-type">
                    {SALARY_TYPES.map((item, index) => {
                      return (
                        <option value={item.value} key={index}>
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>
            <DynamicSingleForm
              elements={arrayElements.requirements}
              setElements={(elements) =>
                setArrayElements({ ...arrayElements, requirements: elements })
              }
              addElement={() => addElement('requirements')}
              removeElement={(index) => removeElement('requirements', index)}
              handleChange={(index, value) =>
                handleChange('requirements', index, value)
              }
              label="Requirements"
            />
            <DynamicSingleForm
              elements={arrayElements.benefits}
              setElements={(elements) =>
                setArrayElements({ ...arrayElements, benefits: elements })
              }
              addElement={() => addElement('benefits')}
              removeElement={(index) => removeElement('benefits', index)}
              handleChange={(index, value) =>
                handleChange('benefits', index, value)
              }
              label="Benefits"
            />
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                id="input-agree-to-term"
                required
              />
              <label
                class="form-check-label text-muted"
                htmlFor="input-agree-to-term"
              >
                <small>
                  I confirm that I have read and agreed to the terms and
                  conditions.
                </small>
              </label>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <GlobalButton
              btnType="button"
              btnClass="btn btn-danger btn-lg"
              btnTitle="Delete"
              btnLoading={buttonConfig.delete.isLoading}
              btnOnClick={onDeleteJobPost}
            />
            <GlobalButton
              btnType="submit"
              btnClass="btn btn-primary btn-lg"
              btnTitle="Save"
              btnLoading={buttonConfig.submit.isLoading}
            />
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default JobPostModal;
