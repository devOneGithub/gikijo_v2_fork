import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { useApiCall } from '../context/apiCall';
import Breadcrumb from '../components/BreadCrumb';
import { PAGES } from '../utils/constants';
import ProfileJobSeeker from '../components/ProfileJobSeeker';
import ProfileEmployer from '../components/ProfileEmployer';

const main = () => {
  const router = useRouter();
  const { getResumeDetailsApi, getSingleCompanyProfileApi } = useApiCall();
  const [mainData, setMainData] = useState({
    profileDetails: { data: null, isLoading: false },
  });

  const getResumeDetails = async () => {
    try {
      const data = await getResumeDetailsApi({
        uid: router.query.uid,
      });

      setMainData((prevData) => ({
        ...prevData,
        profileDetails: {
          data: data,
          isLoading: false,
        },
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const getCompanyDetails = async () => {
    try {
      const data = await getSingleCompanyProfileApi({
        uid: router.query.uid,
      });

      setMainData((prevData) => ({
        ...prevData,
        profileDetails: {
          data: data,
          isLoading: false,
        },
      }));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (router.query?.uid && router.query?.type) {
      if (router.query.type == 'resume') {
        getResumeDetails();
      }
      if (router.query.type == 'company') {
        getCompanyDetails();
      }
    }
  }, [router]);

  return (
    <div className="body">
      <section class="container">
        <Breadcrumb page={PAGES.profile} />
        {router?.query?.type == 'company' ? (
          <ProfileEmployer
            item={mainData.profileDetails.data}
            showBtnExternalPage={false}
            onSuccessFunction={getCompanyDetails}
          />
        ) : (
          ''
        )}
        {router?.query?.type == 'resume' ? (
          <ProfileJobSeeker
            item={mainData.profileDetails.data}
            showBtnExternalPage={false}
            onSuccessFunction={getResumeDetails}
          />
        ) : (
          ''
        )}
      </section>
    </div>
  );
};

export default main;
