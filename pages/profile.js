import { useState, useEffect } from 'react';
import JobFilter from '../components/JobFilter';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import ProfileDetailsCard from '../components/ProfileDetailsCard';
import { useApiCall } from '../context/apiCall';
import Breadcrumb from '../components/BreadCrumb';
import { PAGES } from '../utils/constants';

const main = () => {
  const router = useRouter();
  const { getResumeDetailsApi, getSingleCompanyProfileApi } = useApiCall();
  const [mainData, setMainData] = useState({
    profileDetails: { data: null, isLoading: false },
  });

  const getResumeDetails = async (uid) => {
    try {
      const data = await getResumeDetailsApi({
        uid: uid,
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

  const getCompanyDetails = async (uid) => {
    try {
      const data = await getSingleCompanyProfileApi({
        uid: uid,
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
        getResumeDetails(router.query.uid);
      }
      if (router.query.type == 'company') {
        getCompanyDetails(router.query.uid);
      }
    }
  }, [router]);

  return (
    <div className="body">
      <section class="container">
        <Breadcrumb page={PAGES.profile} />
        <ProfileDetailsCard
          item={mainData.profileDetails.data}
          showBtnExternalPage={false}
          type={router.query.type}
        />
      </section>
    </div>
  );
};

export default main;
