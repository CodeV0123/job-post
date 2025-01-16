export interface Job {
  headline: string;
  introduction: string;
  introductionOfJob: string;
  personalAddress: string;
  tasks?: { items?: string[] } | string[];
  qualifications?: { items?: string[] } | string[];
  benefits?: { items?: string[] } | string[];
  jobTitle: string;
  voiceScript: string;
  voiceLocation: string;
  taglines: string[];
  contactDetails: {
    email: string;
    phone: string;
    contact_person: string;
    address: string;
    website: string;
  };
  closingDate: string;
  website: string;
}
