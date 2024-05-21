import { useState, useEffect } from 'react';
import SideBar from '../components/SideBar.js';
import JobPostModal from '../components/JobPostModal.js';
import PageHeader from '../components/PageHeader.js';
import {
  COMPANY_SIZES,
  COUNTRIES,
  EMPLOYMENT_TYPES,
  INDUSTRIES,
  PAGES,
} from '../utils/constants.js';
import Breadcrumb from '../components/BreadCrumb.js';
import { useApiCall } from '../context/apiCall.js';
import LoadingSpinner from '../components/LoadingSpinner.js';
import moment from 'moment';
import CompanyProfileModal from '../components/CompanyProfileModal.js';
import EmptyData from '../components/EmptyData.js';
import CompanyProfileTable from '../components/companyProfileTable.js';
import { useModal } from '../context/modal.js';

const main = () => {
  const { isModalOpen, toggleModal } = useModal();

  const createCompanyButton = () => {
    return (
      <div class="col d-grid gap-2 d-md-flex justify-content-md-end">
        <button
          class="btn btn-primary btn-lg"
          type="button"
          onClick={() => {
            toggleModal('companyProfile');
          }}
        >
          <i class="bi bi-plus-lg"></i> Add Company
        </button>
      </div>
    );
  };

  return (
    <SideBar>
      <div class="container ps-0">
        <Breadcrumb page={PAGES.company_profile} />
        <PageHeader
          title={PAGES.company_profile.name}
          description={PAGES.company_profile.description}
          rightContent={createCompanyButton()}
        />
        <CompanyProfileTable />
      </div>
    </SideBar>
  );
};

export default main;
