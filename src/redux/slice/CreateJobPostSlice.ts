import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://image-job.assemblr.ai/create-job-post/";

export const createJobPost = createAsyncThunk(
  "createJobPost/create",
  async (formData: FormData) => {
    // Accept FormData
    try {
      const response = await axios.post(API_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return error.response?.data || "Something went wrong";
      }
      return "Something went wrong";
    }
  }
);

interface JobField {
  header?: string;
  items: string[];
}

interface Job {
  jobTitle: string;
  headline: string;
  description: string;
  introduction: string;
  introductionOfJob: string;
  tasks: JobField | string[];
  qualifications: JobField | string[];
  benefits: JobField | string[];
  callToAction: string;
  personalAddress: string;
  voiceScript: string;
  voiceTone: string;
  voiceCTA: string;
  voiceLocation: string;
  voiceBenefits: string;
  contactDetails: {
    email: string;
    phone: string;
    address: string;
    website: string;
    contact_person: string;
  };
  imageKeyword: string;
  taglines: string[];
  bodyCopy: string[];
  website: string;
  closingDate: string;
}

const createJobPostSlice = createSlice({
  name: "createJobPost",
  initialState: {
    job: null as Job | null,
    status: "idle" as "idle" | "loading" | "succeeded" | "failed",
    error: null as string | null,
  },
  reducers: {
    resetState: (state) => {
      state.job = null;
      state.status = "idle";
      state.error = null;
    },
    updateJobFields: (state, action) => {
      console.log("Before update:", state.job);
      if (action.payload && typeof action.payload === "object") {
        state.job = { ...state.job, ...action.payload }; // Merge new fields into the existing job
        console.log("Updated job state:", state.job);
      } else {
        console.error("Invalid payload for updateJobFields:", action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createJobPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createJobPost.fulfilled, (state, action) => {
        state.status = "succeeded";

        const jobPost = action.payload?.job_post || {};
        const voice = action.payload?.voice || {};
        const image = action.payload?.image || {};

        const parseField = (field: JobField | string[] | string): string[] => {
          if (Array.isArray(field)) {
            return field;
          } else if (typeof field === "object" && field?.items) {
            return field.items;
          } else if (typeof field === "string") {
            return field
              .split(/(?:\\n▶|\n▶|▶)/)
              .map((item: string) => item.trim())
              .filter(Boolean);
          }
          return [];
        };

        const getMultilingualField = (
          fieldMap: Record<string, string | undefined>,
          defaultValue: string
        ) => {
          for (const key of Object.keys(fieldMap)) {
            if (jobPost[key]) {
              return jobPost[key];
            }
          }
          return defaultValue;
        };

        state.job = {
          headline: image.Headline || "No headline available",
          description: jobPost.Description || "No description available",
          jobTitle: getMultilingualField(
            {
              "Job Title": jobPost["Job Title"],
              Berufsbezeichnung: jobPost["Berufsbezeichnung"],
              Stellenbezeichnung: jobPost["Stellenbezeichnung"],
              Jobbezeichnung: jobPost["Jobbezeichnung"],
              Jobtitel: jobPost["Jobtitel"],
              "Job Titel": jobPost["Job Titel"],
            },
            "No job title available"
          ),
          introduction: getMultilingualField(
            {
              Introduction: jobPost.Introduction,
              Einführung: jobPost["Einführung"],
              Einleitung: jobPost["Einleitung"],
            },
            "No introduction available"
          ),
          introductionOfJob: getMultilingualField(
            {
              "Introduction of the job": jobPost["Introduction of the job"],
              Introduction_of_the_job: jobPost["Introduction_of_the_job"],
              Introduction_of_the_Job: jobPost["Introduction_of_the_Job"],
              "Job Introduction": jobPost["Job Introduction"],
              Job_Introduction: jobPost["Job_Introduction"],
              "Einführung des Jobs": jobPost["Einführung des Jobs"],
              "Einleitung zur Stelle": jobPost["Einleitung zur Stelle"],
              "Einführung des Berufs": jobPost["Einführung des Berufs"],
              "Introduction to the Position":
                jobPost["Introduction to the Position"],
              Stelleneinführung: jobPost["Stelleneinführung"],
              Jobeinführung: jobPost["Jobeinführung"],
              "Job Einführung": jobPost["Job Einführung"],
              introductionOfJob: jobPost["introductionOfJob"],
              "Job-Einführung": jobPost["Job-Einführung"],
              "Job Einleitung": jobPost["Job Einleitung"],
            },
            "No job introduction available"
          ),
          personalAddress: getMultilingualField(
            {
              "Personal Address": jobPost["Personal Address"],
              Personal_Address: jobPost["Personal_Address"],
              PersonalAddress: jobPost["PersonalAddress"],
              "Persönliche Ansprache": jobPost["Persönliche Ansprache"],
              "Persönliche Adresse": jobPost["Persönliche Adresse"],
              Persönliche_Adresse: jobPost["Persönliche_Adresse"],
              personalAddress: jobPost["personalAddress"],
            },
            "No personal address provided"
          ),

          tasks: parseField(
            getMultilingualField(
              {
                Tasks: jobPost.Tasks,
                Aufgaben: jobPost["Aufgaben"],
              },
              "No tasks available"
            )
          ),
          qualifications: parseField(
            getMultilingualField(
              {
                Qualifications: jobPost.Qualifications,
                Qualifikationen: jobPost["Qualifikationen"],
              },
              "No qualifications available"
            )
          ),
          benefits: parseField(
            getMultilingualField(
              {
                Benefits: jobPost.Benefits,
                Vorteile: jobPost["Vorteile"],
                Leistungen: jobPost["Leistungen"],
              },
              "No benefits available"
            )
          ),

          callToAction:
            jobPost["Call to Action"] || "No call to action provided",
          voiceScript: voice.script || "No voice script provided",
          voiceTone: voice.tone || "No tone specified",
          voiceCTA: voice.cta || "No Call to Action specified",
          voiceLocation: voice.location || "No location specified",
          voiceBenefits: voice.benefits || "No benefits specified",
          contactDetails: voice.contact_details || {
            email: "No email provided",
            phone: "No phone provided",
            address: "No address provided",
            website: "No website provided",
            contact_person: "No contact person provided",
          },
          imageKeyword: image.image_keyword || "No image keyword provided",
          taglines: image.taglines || [],
          bodyCopy: image.body_copy || [],
          website: image.website || "No website provided",
          closingDate: image.Closing_Date || "No closing date provided",
        };
        console.log("Job post:", state.job);
      })

      .addCase(createJobPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});
export const { resetState, updateJobFields } = createJobPostSlice.actions;

export default createJobPostSlice.reducer;
