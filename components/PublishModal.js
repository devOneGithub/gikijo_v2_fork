import Modal from 'react-bootstrap/Modal';
import GlobalButton from './GlobalButton';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { PAGES } from '../utils/constants';
import { useApiCall } from '../context/apiCall';
import Link from 'next/link';
import { useModal } from '../context/modal';
import { useTempData } from '../context/tempData';

const PublishModal = () => {
  const {
    apiData,
    addNotificationApi,
    publishJobPostApi,
    addChannelPostApi,
    deleteChannelPostApi,
  } = useApiCall();
  const { isModalOpen, toggleModal } = useModal();
  const { tempData, setValueTempData } = useTempData();
  const jobData = tempData.selectedItem.editJobDetails;

  const [buttonConfig, setButtonConfig] = useState({
    submit: {
      isLoading: false,
    },
  });

  const [selectedItems, setSelectedItems] = useState([]);
  const [isPublished, setIsPublished] = useState(false);

  const handleClose = () => {
    toggleModal('publishJob');
  };

  useEffect(() => {
    if (jobData && isModalOpen.publishJob) {
      const { job_post_validity, job_post_channel_post } = jobData;

      setSelectedItems(
        job_post_channel_post?.length > 0 ? job_post_channel_post : []
      );

      setIsPublished(
        job_post_validity !== null
          ? job_post_validity?.is_published
            ? true
            : false
          : true
      );
    }
  }, [jobData, isModalOpen.publishJob]);

  const onSubmitJobPost = async (event) => {
    event.preventDefault();

    setButtonConfig({
      ...buttonConfig,
      submit: {
        ...buttonConfig.submit,
        isLoading: true,
      },
    });

    const result = await publishJobPostApi({
      job_post_id: jobData.id,
      is_published: isPublished,
    });

    if (result?.data?.is_published == true) {
      await addNotificationApi({
        message: 'Your job post is Live!',
        message_detail:
          'Your job post is now live and visible to potential candidates. Good luck with your recruitment process!',
        action_url: `${PAGES.viewJob.directory}?jobId=${jobData.uid}`,
        action_title: 'View Live',
      });
    }

    var oldData = jobData?.job_post_channel_post;
    var newData = selectedItems;

    const dataToAdd = [];
    const dataToDelete = [];

    newData.forEach((newItem) => {
      const isExist = oldData.some(
        (oldItem) => oldItem.channel_id === newItem.channel_id
      );

      if (!isExist) {
        dataToAdd.push(newItem);
      }
    });

    oldData.forEach((oldItem) => {
      const isExist = newData.some(
        (newItem) => newItem.channel_id === oldItem.channel_id
      );

      if (!isExist) {
        dataToDelete.push(oldItem);
      }
    });

    if (dataToAdd.length > 0) {
      await addChannelPostApi({
        channel_post: dataToAdd,
      });
    }

    if (dataToDelete.length > 0) {
      await deleteChannelPostApi({
        channel_post: dataToDelete,
      });
    }

    toast.success(`Successfully!`);

    setButtonConfig({
      ...buttonConfig,
      submit: {
        ...buttonConfig.submit,
        isLoading: false,
      },
    });

    handleClose();
  };

  return (
    <>
      <Modal show={isModalOpen.publishJob} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Publish & share</Modal.Title>
        </Modal.Header>
        <form onSubmit={onSubmitJobPost}>
          <Modal.Body>
            <div>
              <ul class="list-group list-group-flush">
                <label class="mb-3">Publish my job post on:</label>
                {apiData.allChannel.data?.map((item, index) => {
                  var channelData =
                    jobData?.job_post_validity?.published_channel?.filter(
                      (channel) => channel.id == item.id
                    );

                  var curChannelData = {};
                  if (channelData?.length >= 0) {
                    curChannelData = channelData[0];
                  }

                  if (item.required == true)
                    return (
                      <li key={index} class="list-group-item">
                        <div class="row">
                          <div class="col-auto text-center">
                            <img
                              src={`data:image/svg+xml, ${encodeURIComponent(
                                item?.icon
                              )}`}
                              height={40}
                              width={40}
                              alt={item?.platform}
                            />
                          </div>
                          <div class="col">
                            <h5 class="card-title">{item.title}</h5>
                            <p
                              class="card-text text-truncate text-muted"
                              style={{ maxWidth: '250px' }}
                            >
                              {item.description}{' '}
                            </p>
                            {jobData?.job_post_validity?.is_published ? (
                              <Link
                                class="text-primary clickable"
                                href={`${PAGES.viewJob.directory}?jobId=${jobData.uid}`}
                                target="_blank"
                              >
                                View your post{' '}
                                <i class="bi bi-arrow-up-right-circle"></i>
                              </Link>
                            ) : (
                              ''
                            )}
                          </div>
                          <div class="col-auto">
                            <div class="form-check form-switch form-switch-md">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                id={`input-switch-${item.id}`}
                                checked={isPublished}
                                onChange={() => {
                                  setIsPublished(!isPublished);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                })}
              </ul>
              {isPublished ? (
                <ul class="list-group list-group-flush">
                  <label class="mb-3 mt-2">Share it on:</label>
                  {apiData.allChannel.data?.map((item, index) => {
                    const channelPost = jobData?.job_post_channel_post.find(
                      (channelPostItem) =>
                        channelPostItem.channel_id === item.id
                    );

                    if (!item.required)
                      return (
                        <li key={index} class="list-group-item">
                          <div class="row">
                            <div class="col-auto text-center">
                              <img
                                src={`data:image/svg+xml, ${encodeURIComponent(
                                  item?.icon
                                )}`}
                                height={40}
                                width={40}
                                alt={item?.platform}
                              />
                            </div>
                            <div class="col">
                              <h5 class="card-title">{item.title}</h5>
                              <p
                                class="card-text text-truncate text-muted"
                                style={{ maxWidth: '250px' }}
                              >
                                {item.description}{' '}
                                {item.required ? '(required)' : ''}
                              </p>
                              {channelPost?.message_id ? (
                                <small class="text-primary clickable">
                                  View your post{' '}
                                  <i class="bi bi-arrow-up-right-circle"></i>
                                </small>
                              ) : (
                                ''
                              )}
                            </div>
                            <div class="col-auto">
                              <div class="form-check form-switch form-switch-md">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  role="switch"
                                  id={`input-switch-${item.id}`}
                                  checked={selectedItems.some(
                                    (selected) =>
                                      selected.channel_id === item.id
                                  )}
                                  onChange={() => {
                                    const isSelected = selectedItems.some(
                                      (selected) =>
                                        selected.channel_id === item.id
                                    );

                                    setSelectedItems((prevSelected) => {
                                      if (isSelected) {
                                        return prevSelected.filter(
                                          (selected) =>
                                            selected.channel_id !== item.id
                                        );
                                      } else {
                                        return [
                                          ...prevSelected,
                                          {
                                            channel_id: item.id,
                                            job_post_id: jobData.id,
                                            platform: item.platform,
                                            user_uuid: apiData.user.data?.id,
                                          },
                                        ];
                                      }
                                    });
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </li>
                      );
                  })}
                </ul>
              ) : (
                ''
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <GlobalButton
              btnType="submit"
              btnClass={`btn btn-${isPublished ? 'primary' : 'danger'} btn-lg`}
              btnTitle="Submit"
              btnLoading={buttonConfig.submit.isLoading}
            />
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default PublishModal;
