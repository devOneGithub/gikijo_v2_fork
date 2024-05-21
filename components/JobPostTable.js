import { useState, useEffect } from 'react';
import SideBar from '../components/SideBar.js';
import JobPostModal from '../components/JobPostModal.js';
import PageHeader from '../components/PageHeader.js';
import { EMPLOYMENT_TYPES, PAGES } from '../utils/constants.js';
import Breadcrumb from '../components/BreadCrumb.js';
import { useApiCall } from '../context/apiCall.js';
import LoadingSpinner from '../components/LoadingSpinner.js';
import moment from 'moment';
import CompanyProfileModal from '../components/CompanyProfileModal.js';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import toast from 'react-hot-toast';
import EmptyData from '../components/EmptyData.js';
import PublishModal from '../components/PublishModal.js';
import { useTempData } from '../context/tempData.js';
import { useModal } from '../context/modal.js';

const JobPostTable = () => {
  const { apiData, getJobPostApi } = useApiCall();
  const { tempData, setValueTempData } = useTempData();
  const { isModalOpen, toggleModal } = useModal();

  return (
    <>
      <CompanyProfileModal />
      <JobPostModal />
      <PublishModal />
      <div>
        <LoadingSpinner isLoading={apiData.jobPost.isLoading} />
        {!apiData.jobPost.isLoading && apiData.jobPost.data.length == 0 ? (
          <EmptyData
            icon={<i class="fs-5 bi bi-megaphone"></i>}
            title="No post yet"
            description="Create your first job post today!"
          />
        ) : (
          <table class="table table-responsive">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {apiData.jobPost.data?.map((item, index) => {
                const { job_post_validity } = item;

                const isPublished = item?.job_post_validity?.is_published
                  ? true
                  : false;
                const publishedCount =
                  item?.job_post_validity?.published_channel?.length;

                const data = {
                  title: item.title,
                  employmentType: EMPLOYMENT_TYPES.find(
                    (type) => type.value === item.employment_type
                  )?.name,
                  createdAt: job_post_validity?.created_at
                    ? `activated ${moment(
                        job_post_validity.created_at
                      ).fromNow()}`
                    : '',
                  expiredAt: job_post_validity?.expired_at
                    ? `expired ${moment(
                        job_post_validity.expired_at
                      ).fromNow()}`
                    : '',
                  viewCount: job_post_validity?.view_count,
                  shareCount: job_post_validity?.share_count,
                  applicationCount: item.application?.length,
                  actionBtn: {
                    click: async () => {
                      toggleModal('publishJob');
                      setValueTempData('selectedItem', {
                        ...tempData.selectedItem,
                        editJobDetails: item,
                      });

                      // const result = await publishJobPostApi({
                      //   job_post_id: item.id,
                      //   status,
                      // });

                      // const newStatus = JOB_POST_STATUS.find(
                      //   (status) => status.value === result.data.job_post_status
                      // );

                      // toast.success(`${newStatus.value}!`);

                      // const newJobData = apiData.jobPost.data?.map((job) => {
                      //   if (job.id === result.data.job_post_id) {
                      //     return { ...job, job_post_validity: result.data };
                      //   }
                      //   return job;
                      // });

                      // setMainData((prevData) => ({
                      //   ...prevData,
                      //   jobPost: {
                      //     ...prevData.jobPost,
                      //     data: newJobData,
                      //   },
                      // }));
                    },
                    icon: isPublished ? (
                      <i class="bi bi-arrow-counterclockwise"></i>
                    ) : (
                      <i class="bi bi-send"></i>
                    ),
                    title: isPublished ? 'Manage Publication' : 'Publish',
                    theme: {
                      // color: isPublished ? 'text-secondary' : 'text-primary',
                      color: 'text-primary',
                    },
                  },
                  theme: {
                    badge: isPublished
                      ? 'badge-status-success'
                      : 'badge-status-error',
                    icon: isPublished ? (
                      <i class="bi bi-check-circle"></i>
                    ) : (
                      <i class="bi bi-exclamation-circle"></i>
                    ),
                  },
                  // status: isPublished
                  // ? `${publishedCount > 10 ? '10+' : publishedCount} ${
                  //     publishedCount > 1 ? 'Channels' : 'Channel'
                  //   }`
                  // : 'unpublish',
                  status: isPublished ? 'Published' : 'unpublish',
                };

                return (
                  <tr class="align-middle" key={index}>
                    <th scope="row">
                      {data.title}{' '}
                      <small
                        class="mx-2"
                        onClick={() => {
                          toggleModal('jobPost');
                          setValueTempData('selectedItem', {
                            ...tempData.selectedItem,
                            editJobDetails: item,
                          });
                        }}
                      >
                        <i class="bi bi-pencil-square clickable text-primary"></i>
                      </small>
                      <p class="card-text fw-light">
                        <small class="text-muted">
                          {data.employmentType}{' '}
                          {data.expiredAt && (
                            <>
                              <i class="bi bi-dot"></i> {data.expiredAt}
                            </>
                          )}
                        </small>
                      </p>
                    </th>
                    <td>
                      <OverlayTrigger
                        overlay={
                          <Tooltip>
                            How many times your post was shared on social media
                            platforms
                          </Tooltip>
                        }
                      >
                        <span class="text-muted">
                          <i class="bi bi-share"></i> {data.shareCount ?? 0}
                        </span>
                      </OverlayTrigger>
                    </td>
                    <td>
                      <OverlayTrigger
                        overlay={
                          <Tooltip>
                            How many times your post has been viewed
                          </Tooltip>
                        }
                      >
                        <span class="text-muted">
                          <i class="bi bi-eye"></i> {data.viewCount ?? 0}
                        </span>
                      </OverlayTrigger>
                    </td>
                    <td>
                      <OverlayTrigger
                        overlay={
                          <Tooltip>
                            The total number of applications received
                          </Tooltip>
                        }
                      >
                        <span class="text-muted">
                          <i class="bi bi-people"></i>{' '}
                          {data.applicationCount ?? 0}
                        </span>
                      </OverlayTrigger>
                    </td>
                    <td>
                      <small class="text-muted">
                        <span class={`badge rounded-pill ${data.theme.badge}`}>
                          {data.theme.icon} {data.status}
                        </span>
                      </small>
                    </td>
                    <td>
                      <strong
                        class={`${data.actionBtn.theme.color} fw-bold clickable`}
                        onClick={data.actionBtn.click}
                      >
                        {data.actionBtn.icon} {data.actionBtn.title}
                      </strong>
                    </td>
                    <td>
                      <strong
                        class={`${data.actionBtn.theme.color} fw-bold clickable`}
                        onClick={data.actionBtn.click}
                      >
                        View Live
                      </strong>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default JobPostTable;
