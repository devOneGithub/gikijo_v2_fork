import { useState, useEffect, useRef } from 'react';
import JobFilter from '../components/JobFilter';
import JobList from '../components/JobList';
import JobDetails from '../components/JobDetails';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useApiCall } from '../context/apiCall';
import { useTempData } from '../context/tempData';
import { PAGES } from '../utils/constants';
import Breadcrumb from '../components/BreadCrumb';
import { useModal } from '../context/modal';

const main = () => {
  const initialized = useRef(false);
  const { apiData } = useApiCall();
  const { tempData, setValueTempData } = useTempData();
  const [selectedJob, setSelectedJob] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const { isModalOpen, toggleModal } = useModal();

  const checkScreenSize = () => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 1000);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  };

  useEffect(() => {
    checkScreenSize();
  }, []);

  return (
    <div className="body">
      <section class="container">
        <Breadcrumb page={PAGES.jobs} />
        <JobFilter showTitle={false} />
        <div class="row">
          {tempData?.jobFilter?.keyword ? (
            <div class="text-muted mb-1">
              <span>Showing {apiData.allJobPost.data.length} results of: </span>
              {tempData.jobFilter.keyword}
            </div>
          ) : (
            ''
          )}
          <div class="col-lg-4">
            <JobList showModalOnClick={isSmallScreen} />
          </div>
          <div class="col-lg-8 d-none d-lg-block">
            <div
              class="mb-3 sticky-top sticky-top-padding"
              style={{ zIndex: 1 }}
            >
              <div class="row">
                <div class="col">
                  <div class="card vh-100">
                    <JobDetails item={selectedJob} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Offcanvas
          show={isModalOpen.jobDetails}
          onHide={() => {
            toggleModal('jobDetails');
          }}
          placement="end"
        >
          <Offcanvas.Header closeButton></Offcanvas.Header>
          <Offcanvas.Body>
            <JobDetails item={selectedJob} />
          </Offcanvas.Body>
        </Offcanvas>
      </section>
    </div>
  );
};

export default main;
