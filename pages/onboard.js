import { useState, useEffect, useRef } from 'react';
import { useApiCall } from '../context/apiCall';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import ResumeForm from '../components/ResumeForm';
import JobDeckCard from '../components/JobDeckCard';
import Offcanvas from 'react-bootstrap/Offcanvas';
import JobDetails from '../components/JobDetails';
import GlobalButton from '../components/GlobalButton';
import { PAGES, STAGGER_CHILD_VARIANTS } from '../utils/constants';
import { useModal } from '../context/modal';
import JobPostTable from '../components/JobPostTable';
import CompanyProfileTable from '../components/CompanyProfileTable';

const main = () => {
  const { apiData, updateAccountTypeApi } = useApiCall();
  const { isModalOpen, toggleModal } = useModal();
  const router = useRouter();
  const [currentSection, setCurrentSection] = useState('getStarted');
  const [isPageReady, setIsPageReady] = useState(false);

  const mainAccessConfig = {
    employer: {
      title: 'I want to find a job',
      onClick: async () => {
        const result = await updateAccountTypeApi({
          postData: {
            accountType: 'job_seeker',
          },
        });

        if (result) {
          setCurrentSection('createResume');
        }
      },
      icon: <i class="bi bi-search-heart h1 text-primary"></i>,
    },
    jobSeeker: {
      title: 'I want to post a job',
      onClick: async () => {
        const result = await updateAccountTypeApi({
          postData: {
            accountType: 'employer',
          },
        });

        if (result) {
          setCurrentSection('createCompanyProfile');
        }
      },
      icon: <i class="bi bi-megaphone h1 text-primary"></i>,
    },
  };

  const navigationSection = (prevPage, nextPage) => {
    return (
      <div class="mt-5">
        {prevPage ? (
          <i
            class="bi bi-arrow-left me-3 clickable"
            onClick={() => setCurrentSection(prevPage)}
          ></i>
        ) : (
          <i class="bi bi-arrow-left me-3 opacity-25"></i>
        )}
        {nextPage ? (
          <i
            class="bi bi-arrow-right ms-3 clickable"
            onClick={() => setCurrentSection(nextPage)}
          ></i>
        ) : (
          <i class="bi bi-arrow-right ms-3 opacity-25"></i>
        )}
      </div>
    );
  };

  const viewConfig = {
    getStarted: {
      view: (
        <>
          <motion.h6
            variants={STAGGER_CHILD_VARIANTS}
            class="mb-0 text-primary"
          >
            WELCOME!
          </motion.h6>
          <motion.h1 variants={STAGGER_CHILD_VARIANTS} class="mt-2 mb-0">
            Let's Get Started
          </motion.h1>
          <motion.p variants={STAGGER_CHILD_VARIANTS} class="lead text-muted">
            What would you like to do?
          </motion.p>
          <motion.div variants={STAGGER_CHILD_VARIANTS} class="mt-4">
            <div class="row row-cols-1 row-cols-md-2 g-4">
              {Object.values(mainAccessConfig).map((config, index) => (
                <div class="col" onClick={config.onClick} key={index}>
                  <div class="card card-move hover-click">
                    <div class="card-body row">
                      <div class="col text-center">{config.icon}</div>
                      <h5 class="card-title font-weight-bold mt-3">
                        {config.title}
                      </h5>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      ),
    },
    createCompanyProfile: {
      view: (
        <div>
          <motion.h1 variants={STAGGER_CHILD_VARIANTS} class="mt-2 mb-0">
            Set Up Your Company Profile
          </motion.h1>
          <motion.p variants={STAGGER_CHILD_VARIANTS} class="lead text-muted">
            Create Your Company's Identity
          </motion.p>
          <motion.p
            variants={STAGGER_CHILD_VARIANTS}
            class="text-primary clickable"
          >
            <GlobalButton
              btnType="button"
              btnClass="btn btn-primary btn-lg"
              btnOnClick={() => {
                toggleModal('companyProfile');
              }}
            >
              <i class="bi bi-plus-lg"></i> Add Company
            </GlobalButton>
          </motion.p>
          <motion.div
            variants={STAGGER_CHILD_VARIANTS}
            class="lead text-muted text-start"
          >
            <CompanyProfileTable />
          </motion.div>
          <motion.div variants={STAGGER_CHILD_VARIANTS} class="mt-4">
            <GlobalButton
              btnType="button"
              btnClass="btn btn-outline-primary btn-lg"
              btnOnClick={() => {
                setCurrentSection('createJobPost');
              }}
            >
              Continue <i class="bi bi-arrow-right-short"></i>
            </GlobalButton>
          </motion.div>
          <motion.h1 variants={STAGGER_CHILD_VARIANTS}>
            {navigationSection('getStarted', 'createJobPost')}
          </motion.h1>
        </div>
      ),
    },
    createJobPost: {
      view: (
        <div>
          <motion.h1 variants={STAGGER_CHILD_VARIANTS} class="mt-2 mb-0">
            Create Your Job Post
          </motion.h1>
          <motion.p variants={STAGGER_CHILD_VARIANTS} class="lead text-muted">
            Let's Design Your Job Opportunity
          </motion.p>
          <motion.p
            variants={STAGGER_CHILD_VARIANTS}
            class="text-primary clickable"
          >
            <GlobalButton
              btnType="button"
              btnClass="btn btn-primary btn-lg"
              btnOnClick={() => {
                toggleModal('jobPost');
              }}
            >
              <i class="bi bi-plus-lg"></i> Add Job Post
            </GlobalButton>
          </motion.p>
          <motion.div
            variants={STAGGER_CHILD_VARIANTS}
            class="lead text-muted text-start"
          >
            <JobPostTable />
          </motion.div>
          <motion.div variants={STAGGER_CHILD_VARIANTS} class="mt-4">
            <GlobalButton
              btnType="button"
              btnClass="btn btn-outline-primary btn-lg"
              btnOnClick={() => {
                setCurrentSection('completedEmployer');
              }}
            >
              Continue <i class="bi bi-arrow-right-short"></i>
            </GlobalButton>
          </motion.div>
          <motion.h1 variants={STAGGER_CHILD_VARIANTS}>
            {navigationSection('createCompanyProfile', 'completedEmployer')}
          </motion.h1>
        </div>
      ),
    },
    createResume: {
      view: (
        <div>
          <motion.h1 variants={STAGGER_CHILD_VARIANTS} class="mt-2 mb-0">
            Build Your Resume
          </motion.h1>
          <motion.p variants={STAGGER_CHILD_VARIANTS} class="lead text-muted">
            Let's Build Your Standout Resume
          </motion.p>
          <motion.div
            variants={STAGGER_CHILD_VARIANTS}
            class="lead text-muted text-start"
          >
            <ResumeForm />
          </motion.div>
          <motion.div variants={STAGGER_CHILD_VARIANTS} class="mt-4">
            <GlobalButton
              btnType="button"
              btnClass="btn btn-outline-primary btn-lg"
              btnOnClick={() => {
                setCurrentSection('applyJob');
              }}
            >
              Continue <i class="bi bi-arrow-right-short"></i>
            </GlobalButton>
          </motion.div>
          <motion.h1 variants={STAGGER_CHILD_VARIANTS}>
            {navigationSection('getStarted', 'applyJob')}
          </motion.h1>
        </div>
      ),
    },
    applyJob: {
      view: (
        <div>
          <motion.h1 variants={STAGGER_CHILD_VARIANTS} class="mt-2 mb-0">
            Get Going!
          </motion.h1>
          <motion.p variants={STAGGER_CHILD_VARIANTS} class="lead text-muted">
            Start Applying or Check Your Dashboard
          </motion.p>
          <motion.div
            variants={STAGGER_CHILD_VARIANTS}
            class="lead text-muted text-start"
          >
            <JobDeckCard />
          </motion.div>
          <motion.div variants={STAGGER_CHILD_VARIANTS} class="mt-4">
            <GlobalButton
              btnType="button"
              btnClass="btn btn-outline-primary btn-lg"
              btnOnClick={() => {
                setCurrentSection('completedJobSeeker');
              }}
            >
              Continue <i class="bi bi-arrow-right-short"></i>
            </GlobalButton>
          </motion.div>
          <motion.h1 variants={STAGGER_CHILD_VARIANTS}>
            {navigationSection('createResume', 'completedJobSeeker')}
          </motion.h1>
        </div>
      ),
    },
    completedEmployer: {
      view: (
        <div>
          <motion.h1 variants={STAGGER_CHILD_VARIANTS} class="mt-2 mb-0">
            Well done!
          </motion.h1>
          <motion.p variants={STAGGER_CHILD_VARIANTS} class="lead text-muted">
            You've finished setting up your account.
          </motion.p>
          <motion.h1 variants={STAGGER_CHILD_VARIANTS} class="mt-4">
            🎉
          </motion.h1>
          <motion.div variants={STAGGER_CHILD_VARIANTS} class="mt-4">
            <GlobalButton
              btnType="button"
              btnClass="btn btn-outline-primary btn-lg"
              btnOnClick={() => {
                router.push(PAGES.dashboard.directory);
              }}
            >
              Go to Dashboard <i class="bi bi-arrow-right-short"></i>
            </GlobalButton>
          </motion.div>
          <motion.h1 variants={STAGGER_CHILD_VARIANTS}>
            {navigationSection('createJobPost')}
          </motion.h1>
        </div>
      ),
    },
    completedJobSeeker: {
      view: (
        <div>
          <motion.h1 variants={STAGGER_CHILD_VARIANTS} class="mt-2 mb-0">
            Well done!
          </motion.h1>
          <motion.p variants={STAGGER_CHILD_VARIANTS} class="lead text-muted">
            You've finished setting up your account.
          </motion.p>
          <motion.h1 variants={STAGGER_CHILD_VARIANTS} class="mt-4">
            🎉
          </motion.h1>
          <motion.div variants={STAGGER_CHILD_VARIANTS} class="mt-4">
            <GlobalButton
              btnType="button"
              btnClass="btn btn-outline-primary btn-lg"
              btnOnClick={() => {
                router.push(PAGES.dashboard.directory);
              }}
            >
              Go to Dashboard <i class="bi bi-arrow-right-short"></i>
            </GlobalButton>
          </motion.div>
          <motion.h1 variants={STAGGER_CHILD_VARIANTS}>
            {navigationSection('applyJob')}
          </motion.h1>
        </div>
      ),
    },
  };

  useEffect(() => {
    if (apiData.profile.isLoading == false) {
      if (apiData.profile.data.account_type) {
        router.push(PAGES.dashboard.directory);
      } else {
        setIsPageReady(true);
      }
    }
  }, [apiData.profile.isLoading]);

  if (!isPageReady) {
    return (
      <div className="body">
        <section class="container text-center"></section>
      </div>
    );
  }

  return (
    <div className="body">
      <section class="container text-center">
        <motion.div
          className="z-10"
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3, type: 'spring' }}
          key={currentSection}
        >
          <motion.div
            variants={{
              show: {
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
            initial="hidden"
            animate="show"
          >
            {viewConfig[currentSection]?.view}
          </motion.div>
        </motion.div>
        <Offcanvas
          show={isModalOpen.jobDetails}
          onHide={() => {
            toggleModal('jobDetails');
          }}
          placement="end"
        >
          <Offcanvas.Header closeButton></Offcanvas.Header>
          <Offcanvas.Body>
            <JobDetails />
          </Offcanvas.Body>
        </Offcanvas>
      </section>
    </div>
  );
};

export default main;
