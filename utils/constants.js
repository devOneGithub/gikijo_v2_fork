export const PAGES = {
  home: {
    key: 'home',
    name: 'Home',
    directory: '/',
    description: '',
  },
  login: {
    key: 'login',
    name: 'Login',
    directory: '/login',
    description: '',
  },
  signup: {
    key: 'signup',
    name: 'Sign up',
    directory: '/signup',
    description: '',
  },
  onboard: {
    key: 'onboard',
    name: 'Onboard',
    directory: '/onboard',
    description: '',
  },
  postJob: {
    key: 'postJob',
    name: 'Post Job',
    directory: '/postJob',
    description: '',
  },
  jobs: {
    key: 'job',
    name: 'Find Job',
    directory: '/jobs',
    description: 'Create and publish your job oppurtunities here.',
  },
  viewJob: {
    key: 'viewJob',
    name: 'View Job',
    directory: '/viewJob',
    description: '',
  },
  dashboard: {
    key: 'dashboard',
    name: 'Dashboard',
    directory: '/dashboard',
    description: `Welcome to your dashboard. Review your account details and activity here.`,
  },
  job_post: {
    key: 'job_post',
    name: 'Job Post',
    directory: '/jobPost',
    description: 'Create and publish your job oppurtunities here.',
  },
  applicants: {
    key: 'applicants',
    name: 'Applicants',
    directory: '/applicants',
    description: 'Create and publish your job oppurtunities here.',
  },
  application: {
    key: 'application',
    name: 'Application',
    directory: '/application',
    description: 'Create and publish your job oppurtunities here.',
  },
  resume: {
    key: 'resume',
    name: 'My Resume',
    directory: '/resume',
    description: 'Update your resume details here.',
  },
  company_profile: {
    key: 'company_profile',
    name: 'Company Profile',
    directory: '/companyProfile',
    description: 'Update your company details here.',
  },
  channel: {
    key: 'channel',
    name: 'Channel',
    directory: '/channel',
    description: 'Create and publish your job oppurtunities here.',
  },
  topic: {
    key: 'topic',
    name: 'Topic',
    directory: '/topic',
    description: 'Create and publish your job oppurtunities here.',
  },
  settings: {
    key: 'settings',
    name: 'Settings',
    directory: '/settings',
    description: 'Create and publish your job oppurtunities here.',
  },
  profile: {
    key: 'profile',
    name: 'Profile',
    directory: '/profile',
    description: 'Create and publish your job oppurtunities here.',
  },
  admin: {
    key: 'admin',
    name: 'Admin',
    directory: '/admin',
    description: 'Create and publish your job oppurtunities here.',
  },
};

export const IMAGES = {
  applicant_placeholder: {
    url: 'https://static.thenounproject.com/png/4771394-200.png',
  },
};

export const SALARY_TYPES = [
  { name: 'monthly', value: 'monthly' },
  { name: 'weekly', value: 'weekly' },
  { name: 'hourly', value: 'hourly' },
  { name: 'daily', value: 'daily' },
  { name: 'annually', value: 'annually' },
];

export const EMPLOYMENT_TYPES = [
  { name: 'Full-time', value: 'full_time' },
  { name: 'Part-time', value: 'part_time' },
  { name: 'Contract', value: 'contract' },
  { name: 'Freelance', value: 'freelance' },
  { name: 'Internship', value: 'internship' },
  { name: 'Entry-level', value: 'entry_level' },
  { name: 'Volunteer', value: 'volunteer' },
  { name: 'Others', value: 'others' },
];

export const INDUSTRIES = [
  { name: 'Accounting', value: 'accounting' },
  { name: 'Finance', value: 'finance' },
  { name: 'Advertising', value: 'advertising' },
  { name: 'Marketing', value: 'marketing' },
  { name: 'Aerospace', value: 'aerospace' },
  { name: 'Defense', value: 'defense' },
  { name: 'Agriculture', value: 'agriculture' },
  { name: 'Farming', value: 'farming' },
  { name: 'Automotive', value: 'automotive' },
  { name: 'Transportation', value: 'transportation' },
  { name: 'Banking', value: 'banking' },
  { name: 'Financial Services', value: 'financial_services' },
  { name: 'Biotechnology', value: 'biotechnology' },
  { name: 'Pharmaceuticals', value: 'pharmaceuticals' },
  { name: 'Business Services', value: 'business_services' },
  { name: 'Construction', value: 'construction' },
  { name: 'Building', value: 'building' },
  { name: 'Consumer Goods', value: 'consumer_goods' },
  { name: 'Services', value: 'services' },
  { name: 'Education', value: 'education' },
  { name: 'Training ', value: 'training' },
  { name: 'Energy ', value: 'energy' },
  { name: 'Utilities ', value: 'utilities' },
  { name: 'Food ', value: 'food' },
  { name: 'Beverage ', value: 'beverage' },
  { name: 'Government ', value: 'government' },
  { name: 'Public Administration ', value: 'public_administration' },
  { name: 'Healthcare ', value: 'healthcare' },
  { name: 'Medical ', value: 'medical' },
  { name: 'Hospitality ', value: 'hospitality' },
  { name: 'Tourism ', value: 'tourism' },
  { name: 'Human Resources ', value: 'human_resources' },
  { name: 'Staffing', value: 'staffing' },
  { name: 'Information Technology', value: 'information_technology' },
  { name: 'Insurance', value: 'insurance' },
  { name: 'Legal Services ', value: 'legal_services' },
  { name: 'Manufacturing ', value: 'manufacturing' },
  { name: 'Mining ', value: 'mining' },
  { name: 'Metals ', value: 'metals' },
  { name: 'Non-profit ', value: 'non_profit' },
  { name: 'Social Services ', value: 'social_services' },
  { name: 'Real Estate ', value: 'real_estate' },
  { name: 'Retail ', value: 'retail' },
  { name: 'Telecommunications ', value: 'telecommunications' },
  { name: 'Textiles ', value: 'textiles' },
  { name: 'Apparel ', value: 'apparel' },
];

export const COMPANY_SIZES = [
  { name: '1-10 Employees', value: '1_10_employees' },
  { name: '11-50 Employees', value: '11_50_employees' },
  { name: '51-200 Employees', value: '51_200_employees' },
  { name: '201-500 Employees', value: '201_500_employees' },
  { name: '501-1000 Employees', value: '501_1000_employees' },
  { name: '1001+ Employees', value: 'more_1001_employees' },
];

export const JOB_POST_STATUS = [
  { name: 'Published', value: 'published' },
  { name: 'Unpublished', value: 'unpublished' },
];

export const GENDERS = [
  { name: 'Male', value: 'male' },
  { name: 'Femal', value: 'female' },
];

export const COUNTRIES = [{ name: 'Malaysia', value: 'malaysia' }];

export const CURRENT_JOB_STATUS = [
  {
    name: 'Looking for work',
    value: 'looking_for_work',
  },
  {
    name: 'Open to new opportunities',
    value: 'open_to_new_opportunities',
  },
  {
    name: 'Not currently looking',
    value: 'not_currently_looking',
  },
  {
    name: 'Employed and open to opportunities',
    value: 'employed_and_open_to_opportunities',
  },
  {
    name: 'Not employed - seeking work',
    value: 'not_employed_seeking_work',
  },
  {
    name: 'Not employed - not seeking work',
    value: 'not_employed_not_seeking_work',
  },
];

export const APPLICATION_STATUS = [
  { name: 'Pending', value: 'pending' },
  { name: 'Selected for interview', value: 'selected_for_interview' },
  { name: 'Offered', value: 'offered' },
  { name: 'Not selected', value: 'not_selected' },
];

export const APPLICATION_ACTION_STATUS = [
  { name: 'Applied', value: 'applied' },
  { name: 'Withdraw', value: 'withdraw' },
];

export const SKILL_LEVELS = [
  {
    name: 'Beginner',
    value: 'beginner',
    description:
      'Basic understanding or introduction to the skill, limited practical experience.',
  },
  {
    name: 'Intermediate',
    value: 'intermediate',
    description:
      'Competent in the skill with some experience, able to work independently in most situations.',
  },
  {
    name: 'Advanced',
    value: 'advanced',
    description:
      'Highly skilled in the skill, extensive experience, capable of handling complex tasks proficiently.',
  },
  {
    name: 'Expert',
    value: 'expert',
    description:
      'Mastery of the skill, considered an authority, able to innovate and solve intricate problems.',
  },
];

export const LANGUAGE_LEVELS = [
  {
    name: 'Elementary',
    value: 'elementary',
    description:
      'Basic understanding of the language, limited vocabulary and simple phrases.',
  },
  {
    name: 'Intermediate',
    value: 'intermediate',
    description:
      'Able to hold conversations and understand more complex language structures.',
  },
  {
    name: 'Advanced',
    value: 'advanced',
    description:
      'Proficient in the language, can communicate fluently in various contexts.',
  },
  {
    name: 'Fluent',
    value: 'fluent',
    description:
      'Native or near-native proficiency, able to express ideas clearly and accurately.',
  },
];

export const MIN_SALARY = [
  { name: '0', value: 0 },
  { name: '1k', value: 1000 },
  { name: '2k', value: 2000 },
  { name: '3k', value: 3000 },
  { name: '4k', value: 4000 },
  { name: '5k', value: 5000 },
  { name: '6k', value: 6000 },
  { name: '7k', value: 7000 },
  { name: '8k', value: 8000 },
  { name: '9k', value: 9000 },
  { name: '10k', value: 10000 },
  { name: '11k', value: 11000 },
  { name: '12k', value: 12000 },
  { name: '13k', value: 13000 },
  { name: '14k', value: 14000 },
  { name: '15k', value: 15000 },
  { name: '20k', value: 20000 },
  { name: '30k', value: 30000 },
  { name: '40k', value: 40000 },
  { name: '50k', value: 50000 },
];

export const MAX_SALARY = [
  { name: '0', value: 0 },
  { name: '1k', value: 1000 },
  { name: '2k', value: 2000 },
  { name: '3k', value: 3000 },
  { name: '4k', value: 4000 },
  { name: '5k', value: 5000 },
  { name: '6k', value: 6000 },
  { name: '7k', value: 7000 },
  { name: '8k', value: 8000 },
  { name: '9k', value: 9000 },
  { name: '10k', value: 10000 },
  { name: '11k', value: 11000 },
  { name: '12k', value: 12000 },
  { name: '13k', value: 13000 },
  { name: '14k', value: 14000 },
  { name: '15k', value: 15000 },
  { name: '20k', value: 20000 },
  { name: '30k', value: 30000 },
  { name: '40k', value: 40000 },
  { name: '50k', value: 50000 },
];

export const STAGGER_CHILD_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, type: 'spring' } },
};

export const ACCOUNT_TYPES = [
  { name: 'Job Seeker', value: 'job_seeker' },
  { name: 'Employer', value: 'employer' },
];
