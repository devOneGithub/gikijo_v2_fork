import { COUNTRIES, EMPLOYMENT_TYPES, SALARY_TYPES } from '../utils/constants';
import moment from 'moment';

const JobCard = ({
  selected = null,
  item,
  displayOnly = false,
  isPublished = null,
}) => {
  const statusConfig = {
    publish: {
      status: 'Published',
      theme: {
        badge: 'badge-status-success',
        icon: <i class="bi bi-check-circle"></i>,
      },
    },
    unpublish: {
      status: 'unpublish',
      theme: {
        badge: 'badge-status-error',
        icon: <i class="bi bi-exclamation-circle"></i>,
      },
    },
  };

  const jobData = {
    title: item.title,
    employmentType: EMPLOYMENT_TYPES.find(
      (type) => type.value === item?.employment_type
    )?.name,
    createdAt: moment(item?.created_at).fromNow(),
    salary: `RM ${item?.min_salary} -  ${item?.max_salary} ${
      SALARY_TYPES.find((type) => type.value === item?.salary_type)?.name
    }`,
    companyName: item.company_profile?.company_name,
    location: `${
      item.company_profile?.state ? `${item.company_profile.state}, ` : ''
    }${
      COUNTRIES.find((type) => type.value === item.company_profile?.country)
        ?.name
    }`,
    requirements: item?.requirements ? item?.requirements : [],
    benefits: item?.benefits ? item?.benefits : [],
  };

  return (
    <div
      class={`card card-size ${
        displayOnly ? 'text-muted card-no-border' : 'card-move hover-border'
      } ${selected ? 'selected-border' : ''}`}
    >
      <div class="card-body">
        <div class="row">
          <div class="col-8">
            <h6 class="mb-0">{jobData.title}</h6>
          </div>
          {displayOnly ? (
            <div class="col-auto ms-auto">
              <span
                class={`badge rounded-pill ${statusConfig[isPublished]?.theme.badge}`}
              >
                {statusConfig[isPublished]?.theme.icon}{' '}
                {statusConfig[isPublished]?.status}
              </span>
            </div>
          ) : (
            ''
          )}
        </div>
        <div>
          <small class="text-muted">{jobData.employmentType}</small>
          <i class="bi bi-dot"></i>
          <small class="text-muted">{jobData.createdAt}</small>
        </div>
        <ul class="list-unstyled mt-3">
          <li>
            <i class="bi bi-building"></i> {jobData.companyName}
          </li>
          <li>
            <i class="bi bi-cash"></i> {jobData.salary}
          </li>
          <li class="mb-2">
            <i class="bi bi-geo-alt"></i> {jobData.location}
          </li>
          {jobData.benefits.slice(0, 3).map((item, index) => {
            return (
              <li key={index} class="text-truncate">
                <span style={{ marginRight: '0.5rem' }}>&#8226;</span> {item}
              </li>
            );
          })}
        </ul>
      </div>
      {displayOnly ? <span class="transparent-gradient"></span> : ''}
    </div>
  );
};

export default JobCard;
