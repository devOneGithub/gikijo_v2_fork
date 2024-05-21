import { useEffect, useState } from 'react';
import Select from 'react-select';
import {
  COMPANY_SIZES,
  COUNTRIES,
  CURRENT_JOB_STATUS,
  GENDERS,
  INDUSTRIES,
  SALARY_TYPES,
} from '../utils/constants';
import DynamicWorkExperienceForm from './DynamicWorkExperienceForm';
import DynamicEducationBackgroundForm from './DynamicEducationBackgroundForm';
import GlobalButton from './GlobalButton';
import toast from 'react-hot-toast';
import { useApiCall } from '../context/apiCall';
import DynamicSkillsForm from './DynamicSkillsForm';
import DynamicLanguagesForm from './DynamicLanguagesForm';

const ResumeForm = () => {
  const { apiData, addResumeApi } = useApiCall();

  const [arrayElements, setArrayElements] = useState({
    workExperience: [],
    educationBackground: [],
    skills: [],
    languages: [],
  });

  const [buttonConfig, setButtonConfig] = useState({
    profile: {
      keyName: 'profile',
      submit: {
        isLoading: false,
      },
    },
    job: {
      keyName: 'job',
      submit: {
        isLoading: false,
      },
    },
    workExperience: {
      keyName: 'workExperience',
      submit: {
        isLoading: false,
      },
    },
    educationHistory: {
      keyName: 'educationHistory',
      submit: {
        isLoading: false,
      },
    },
    skills: {
      keyName: 'skills',
      submit: {
        isLoading: false,
      },
    },
    languages: {
      keyName: 'languages',
      submit: {
        isLoading: false,
      },
    },
  });

  useEffect(() => {
    if (apiData.resume.data?.length !== 0) {
      const resumeData = apiData.resume.data;
      for (const key in resumeData) {
        if (formConfig().resume.hasOwnProperty(key)) {
          const element = formConfig().resume[key];
          if (element?.type === 'checkbox') {
            if (resumeData[key]) {
              element.checked = true;
            } else {
              element.checked = false;
            }
          } else {
            element.value = resumeData[key];
          }
        }
      }

      setArrayElements((prevState) => ({
        ...prevState,
        workExperience: resumeData?.work_experience || [],
        educationBackground: resumeData?.education_background || [],
        skills: resumeData?.skills || [],
        languages: resumeData?.languages || [],
      }));
    }
  }, [apiData.resume?.data]);

  const formConfig = () => {
    const forms = {
      resume: {
        full_name: document.getElementById('input-full-name'),
        email: document.getElementById('input-email'),
        gender: document.getElementById('select-gender'),
        date_of_birth: document.getElementById('input-date-of-birth'),
        phone_number: document.getElementById('input-phone-number'),
        address_1: document.getElementById('input-address-1'),
        address_2: document.getElementById('input-address-2'),
        city: document.getElementById('input-city'),
        postcode: document.getElementById('input-postcode'),
        state: document.getElementById('input-state'),
        country: document.getElementById('select-country'),
        current_job_status: document.getElementById(
          'select-current-job-status'
        ),
        preferred_job: document.getElementById('input-preferred-job'),
        expected_min_salary: document.getElementById(
          'input-expected-min-salary'
        ),
        expected_max_salary: document.getElementById(
          'input-expected-max-salary'
        ),
        expected_salary_type: document.getElementById(
          'select-expected-salary-type'
        ),
      },
    };

    return forms;
  };

  const getKeyValue = () => {
    const keyValue = {};
    for (const key in formConfig().resume) {
      const element = formConfig().resume[key];
      if (element?.type === 'checkbox') {
        keyValue[key] = element.checked;
      } else if (element?.type === 'number') {
        if (element.value == '') {
          keyValue[key] = 0;
        } else {
          keyValue[key] = element.value;
        }
      } else {
        keyValue[key] = element.value;
      }
    }

    return keyValue;
  };

  const onSubmitResume = async (event, keyName) => {
    event.preventDefault();

    setButtonConfig((prevState) => ({
      ...prevState,
      [keyName]: {
        ...prevState[keyName],
        submit: {
          ...prevState[keyName].submit,
          isLoading: true,
        },
      },
    }));

    const addData = getKeyValue();
    addData.work_experience = arrayElements.workExperience;
    addData.education_background = arrayElements.educationBackground;
    addData.skills = arrayElements.skills;
    addData.languages = arrayElements.languages;
    addData.uid = apiData.resume.data?.uid ?? null;

    var success = false;

    const result = await addResumeApi({
      postData: addData,
    });

    if (result) {
      success = true;
    }

    setButtonConfig((prevState) => ({
      ...prevState,
      [keyName]: {
        ...prevState[keyName],
        submit: {
          ...prevState[keyName].submit,
          isLoading: false,
        },
      },
    }));

    if (success) {
      toast.success('Saved!');
    }
  };

  return (
    <div class="accordion" id="accordionPanelsStayOpenExample">
      <div class="accordion-item">
        <h2 class="accordion-header" id="panelsStayOpen-headingOne">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#panelsStayOpen-collapseOne"
            aria-expanded="true"
            aria-controls="panelsStayOpen-collapseOne"
          >
            <strong>Personal Details</strong>
          </button>
        </h2>
        <div
          id="panelsStayOpen-collapseOne"
          class="accordion-collapse collapse"
          aria-labelledby="panelsStayOpen-headingOne"
        >
          <div class="accordion-body">
            <form
              onSubmit={(event) =>
                onSubmitResume(event, buttonConfig.profile.keyName)
              }
            >
              <div class="col mb-3">
                <label htmlFor="input-full-name" class="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="input-full-name"
                  required
                />
              </div>

              <div class="row mb-3 g-2">
                <div class="col-md">
                  <label htmlFor="input-email" class="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    class="form-control"
                    id="input-email"
                    required
                  />
                </div>
                <div class="col-md-4">
                  <label htmlFor="select-gender" class="form-label">
                    Gender
                  </label>
                  <select class="form-select" id="select-gender" required>
                    {GENDERS.map((item, index) => {
                      return (
                        <option value={item.value} key={index}>
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div class="row mb-3 g-2">
                <div class="col-md-4">
                  <label htmlFor="input-date-of-birth" class="form-label">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    class="form-control"
                    id="input-date-of-birth"
                    required
                  />
                </div>
                <div class="col-md">
                  <label htmlFor="input-phone-number" class="form-label">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="input-phone-number"
                    required
                  />
                </div>
              </div>
              <div class="mb-3 row g-2">
                <label htmlFor="input-address-1" class="form-label">
                  Address
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="input-address-1"
                  required
                  placeholder="Address 1"
                />
                <input
                  type="text"
                  class="form-control"
                  id="input-address-2"
                  placeholder="Address 2"
                />
                <div class="col-md-4">
                  <input
                    type="text"
                    class="form-control"
                    id="input-city"
                    placeholder="City"
                  />
                </div>
                <div class="col-md-4">
                  <input
                    type="text"
                    class="form-control col-md-4"
                    id="input-postcode"
                    placeholder="Postcode"
                  />
                </div>
                <div class="col-md">
                  <input
                    type="text"
                    class="form-control"
                    id="input-state"
                    placeholder="State"
                  />
                </div>
                <select class="form-select" id="select-country" required>
                  {COUNTRIES.map((item, index) => {
                    return (
                      <option value={item.value} key={index}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div class="d-flex justify-content-end">
                <GlobalButton
                  btnType="submit"
                  btnClass="btn btn-primary btn-lg"
                  btnTitle="Save Personal Details"
                  btnLoading={buttonConfig.profile.submit.isLoading}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#panelsStayOpen-collapseTwo"
            aria-expanded="false"
            aria-controls="panelsStayOpen-collapseTwo"
          >
            <strong>Job Details</strong>
          </button>
        </h2>
        <div
          id="panelsStayOpen-collapseTwo"
          class="accordion-collapse collapse"
          aria-labelledby="panelsStayOpen-headingTwo"
        >
          <div class="accordion-body">
            <form
              onSubmit={(event) =>
                onSubmitResume(event, buttonConfig.job.keyName)
              }
            >
              <div class="col mb-3">
                <label htmlFor="select-current-job-status" class="form-label">
                  Current Job Status
                </label>
                <select
                  class="form-select"
                  id="select-current-job-status"
                  required
                >
                  {CURRENT_JOB_STATUS.map((item, index) => {
                    return (
                      <option value={item.value} key={index}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div class="col mb-3">
                <label htmlFor="input-preferred-job" class="form-label">
                  Preferred Job
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="input-preferred-job"
                  required
                />
              </div>
              <div class="mb-3">
                <label htmlFor="input-expected-min-salary" class="form-label">
                  Expected Salary
                </label>
                <div class="row g-2">
                  <div class="col-md">
                    <div class="input-group">
                      <span class="input-group-text">RM</span>
                      <input
                        type="number"
                        class="form-control"
                        id="input-expected-min-salary"
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
                        id="input-expected-max-salary"
                        placeholder="max"
                      />
                    </div>
                  </div>
                  <div class="col-md">
                    <select
                      class="form-select"
                      id="select-expected-salary-type"
                    >
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
              <div class="d-flex justify-content-end">
                <GlobalButton
                  btnType="submit"
                  btnClass="btn btn-primary btn-lg"
                  btnTitle="Save Job Details"
                  btnLoading={buttonConfig.job.submit.isLoading}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="panelsStayOpen-headingThree">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#panelsStayOpen-collapseThree"
            aria-expanded="false"
            aria-controls="panelsStayOpen-collapseThree"
          >
            <strong>Work Experience</strong>
          </button>
        </h2>
        <div
          id="panelsStayOpen-collapseThree"
          class="accordion-collapse collapse"
          aria-labelledby="panelsStayOpen-headingThree"
        >
          <div class="accordion-body">
            <form
              onSubmit={(event) =>
                onSubmitResume(event, buttonConfig.workExperience.keyName)
              }
            >
              <DynamicWorkExperienceForm
                arrayElements={arrayElements}
                setArrayElements={setArrayElements}
              />
              <div class="d-flex justify-content-end">
                <GlobalButton
                  btnType="submit"
                  btnClass="btn btn-primary btn-lg"
                  btnTitle="Save Work Experience"
                  btnLoading={buttonConfig.workExperience.submit.isLoading}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="panelsStayOpen-headingFour">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#panelsStayOpen-collapseFour"
            aria-expanded="false"
            aria-controls="panelsStayOpen-collapseFour"
          >
            <strong>Education History</strong>
          </button>
        </h2>
        <div
          id="panelsStayOpen-collapseFour"
          class="accordion-collapse collapse"
          aria-labelledby="panelsStayOpen-headingFour"
        >
          <div class="accordion-body">
            <form
              onSubmit={(event) =>
                onSubmitResume(event, buttonConfig.educationHistory.keyName)
              }
            >
              <DynamicEducationBackgroundForm
                arrayElements={arrayElements}
                setArrayElements={setArrayElements}
              />
              <div class="d-flex justify-content-end">
                <GlobalButton
                  btnType="submit"
                  btnClass="btn btn-primary btn-lg"
                  btnTitle="Save Education History"
                  btnLoading={buttonConfig.educationHistory.submit.isLoading}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="panelsStayOpen-headingFive">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#panelsStayOpen-collapseFive"
            aria-expanded="false"
            aria-controls="panelsStayOpen-collapseFive"
          >
            <strong>Skills</strong>
          </button>
        </h2>
        <div
          id="panelsStayOpen-collapseFive"
          class="accordion-collapse collapse"
          aria-labelledby="panelsStayOpen-headingFive"
        >
          <div class="accordion-body">
            <form
              onSubmit={(event) =>
                onSubmitResume(event, buttonConfig.skills.keyName)
              }
            >
              <DynamicSkillsForm
                arrayElements={arrayElements}
                setArrayElements={setArrayElements}
              />
              <div class="d-flex justify-content-end">
                <GlobalButton
                  btnType="submit"
                  btnClass="btn btn-primary btn-lg"
                  btnTitle="Save Skills"
                  btnLoading={buttonConfig.skills.submit.isLoading}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="panelsStayOpen-headingSix">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#panelsStayOpen-collapseSix"
            aria-expanded="false"
            aria-controls="panelsStayOpen-collapseSix"
          >
            <strong>Languages</strong>
          </button>
        </h2>
        <div
          id="panelsStayOpen-collapseSix"
          class="accordion-collapse collapse"
          aria-labelledby="panelsStayOpen-headingSix"
        >
          <div class="accordion-body">
            <form
              onSubmit={(event) =>
                onSubmitResume(event, buttonConfig.languages.keyName)
              }
            >
              <DynamicLanguagesForm
                arrayElements={arrayElements}
                setArrayElements={setArrayElements}
              />
              <div class="d-flex justify-content-end">
                <GlobalButton
                  btnType="submit"
                  btnClass="btn btn-primary btn-lg"
                  btnTitle="Save Languages"
                  btnLoading={buttonConfig.languages.submit.isLoading}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeForm;
