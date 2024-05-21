import { COUNTRIES, EMPLOYMENT_TYPES, SALARY_TYPES } from '../utils/constants';
import moment from 'moment';

const JobCard = ({ selected = null, item }) => {
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
      class={`card card-move card-size hover-border ${
        selected ? 'selected-border' : ''
      }`}
    >
      <div class="card-body text-truncate">
        <h6 class="card-title mb-0">{jobData.title}</h6>
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
    </div>
  );
};

export default JobCard;
