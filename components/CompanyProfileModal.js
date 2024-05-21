import Modal from 'react-bootstrap/Modal';
import GlobalButton from './GlobalButton';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { generateUniqueID } from '../utils/helper';
import DynamicForm from './DynamicSingleForm';
import Select from 'react-select';
import { COMPANY_SIZES, COUNTRIES, INDUSTRIES } from '../utils/constants';
import { useApiCall } from '../context/apiCall';
import { useModal } from '../context/modal';
import { useTempData } from '../context/tempData';

const CompanyProfileModal = () => {
  const {
    apiData,
    addCompanyProfileApi,
    editCompanyProfileApi,
    deleteCompanyProfileApi,
    getJobPostApi,
  } = useApiCall();
  const { tempData, setValueTempData } = useTempData();
  const { isModalOpen, toggleModal } = useModal();
  const selectedCompanyProfile = tempData.selectedItem.editCompanyProfile;

  const [buttonConfig, setButtonConfig] = useState({
    submit: {
      isLoading: false,
    },
    delete: {
      isLoading: false,
    },
  });

  const [arrayElements, setArrayElements] = useState({
    industries: [],
  });

  const handleClose = () => {
    toggleModal('companyProfile');
    setValueTempData('selectedItem', {
      ...tempData.selectedItem,
      editCompanyProfile: null,
    });
  };

  const formConfig = () => {
    const forms = {
      job_post: {
        company_name: document.getElementById('input-company-name'),
        registration_number: document.getElementById(
          'input-company-registration-number'
        ),
        about_us: document.getElementById('input-company-about-us'),
        // industries
        size: document.getElementById('select-company-size'),
        website: document.getElementById('input-company-website'),
        agree_to_term: document.getElementById('input-agree-to-term'),
        address_1: document.getElementById('input-company-address-1'),
        address_2: document.getElementById('input-company-address-2'),
        city: document.getElementById('input-company-city'),
        postcode: document.getElementById('input-company-postcode'),
        state: document.getElementById('input-company-state'),
        country: document.getElementById('select-company-country'),
      },
    };

    return forms;
  };

  useEffect(() => {
    if (selectedCompanyProfile) {
      for (const key in selectedCompanyProfile) {
        if (formConfig().job_post.hasOwnProperty(key)) {
          const element = formConfig().job_post[key];
          if (element.type === 'checkbox') {
            if (selectedCompanyProfile[key]) {
              element.checked = true;
            } else {
              element.checked = false;
            }
          } else {
            element.value = selectedCompanyProfile[key];
          }
        }
      }

      var myIndustries = [];
      selectedCompanyProfile.industries.forEach((item) => {
        const result = INDUSTRIES.find((industry) => industry.value === item);
        if (result) {
          myIndustries.push({ label: result.name, value: result.value });
        }
      });

      setArrayElements((prevState) => ({
        ...prevState,
        industries: myIndustries,
      }));
    }
  }, [selectedCompanyProfile, isModalOpen.companyProfile]);

  const getKeyValue = () => {
    const keyValue = {};
    for (const key in formConfig().job_post) {
      const element = formConfig().job_post[key];
      if (element.type === 'checkbox') {
        keyValue[key] = element.checked;
      } else {
        keyValue[key] = element.value;
      }
    }

    return keyValue;
  };

  const onDeleteCompanyProfile = async (event) => {
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

      const result = await deleteCompanyProfileApi({
        id: selectedCompanyProfile.id,
      });

      if (result) {
        handleClose();
        getJobPostApi();
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

  const onSubmitCompanyProfile = async (event) => {
    event.preventDefault();

    setButtonConfig({
      ...buttonConfig,
      submit: {
        ...buttonConfig.submit,
        isLoading: true,
      },
    });

    const addData = getKeyValue();
    addData.industries = arrayElements.industries.map((item) => item.value);

    var success = false;

    if (selectedCompanyProfile?.id) {
      const result = await editCompanyProfileApi({
        postData: addData,
        id: selectedCompanyProfile.id,
      });

      if (result) {
        success = true;
      }
    } else {
      const result = await addCompanyProfileApi({
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

  return (
    <>
      <Modal show={isModalOpen.companyProfile} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Company Information</Modal.Title>
        </Modal.Header>
        <form onSubmit={onSubmitCompanyProfile}>
          <Modal.Body>
            <div class="mb-3">
              <label htmlFor="input-company-name" class="form-label">
                Company Name
              </label>
              <input
                type="text"
                class="form-control"
                id="input-company-name"
                required
              />
            </div>
            <div class="mb-3">
              <label
                htmlFor="input-company-registration-number"
                class="form-label"
              >
                Registration Number
              </label>
              <input
                type="text"
                class="form-control"
                id="input-company-registration-number"
                required
              />
            </div>
            <div class="mb-3">
              <label htmlFor="input-company-about-us" class="form-label">
                About Us
              </label>
              <textarea
                type="text"
                class="form-control"
                id="input-company-about-us"
                rows="3"
                required
              />
            </div>
            <div class="mb-3">
              <label class="form-label">Industries</label>
              <Select
                isMulti
                required
                defaultValue={arrayElements.industries}
                options={INDUSTRIES.map((industry) => ({
                  label: industry.name,
                  value: industry.value,
                }))}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={(newValues) => {
                  setArrayElements((prevState) => ({
                    ...prevState,
                    industries: newValues,
                  }));
                }}
              />
            </div>
            <div class="mb-3">
              <label htmlFor="select-company-size" class="form-label">
                Company Size
              </label>
              <select class="form-select" id="select-company-size" required>
                {COMPANY_SIZES.map((item, index) => {
                  return (
                    <option value={item.value} key={index}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div class="mb-3">
              <label htmlFor="input-company-website" class="form-label">
                Company Website
              </label>
              <input
                type="text"
                class="form-control"
                id="input-company-website"
                required
              />
            </div>
            <div class="mb-3 row g-1">
              <label htmlFor="input-company-address-1" class="form-label">
                Company Address
              </label>
              <input
                type="text"
                class="form-control"
                id="input-company-address-1"
                required
                placeholder="Address 1"
              />
              <input
                type="text"
                class="form-control"
                id="input-company-address-2"
                placeholder="Address 2"
              />
              <div class="col-md-4 ps-0">
                <input
                  type="text"
                  class="form-control"
                  id="input-company-city"
                  placeholder="City"
                />
              </div>
              <div class="col-md-4">
                <input
                  type="text"
                  class="form-control col-md-4"
                  id="input-company-postcode"
                  placeholder="Postcode"
                />
              </div>
              <div class="col-md pe-0">
                <input
                  type="text"
                  class="form-control"
                  id="input-company-state"
                  placeholder="State"
                />
              </div>
              <select class="form-select" id="select-company-country" required>
                {COUNTRIES.map((item, index) => {
                  return (
                    <option value={item.value} key={index}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
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
              btnOnClick={onDeleteCompanyProfile}
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

export default CompanyProfileModal;
