import React, { useState } from "react";
import BtnButton from "../reuseCMP/BtnButton";
import { useNavigate } from "react-router-dom";
import {
  setUserTempData,
  getResponseRedux,
} from "../../Redux/slices/ResumeSlice";
import { useDispatch, useSelector } from "react-redux";

function ResumeForm() {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const obj = {
    fullName: "",
    expertIn: "",
    email: "",
    phone: "",
    gitHub: "",
    linkedIn: "",
    summary: "",
    experiences: [
      {
        companyName: "",
        role: "",
        description: "",
        startDate: "",
        endDate: "",
      },
    ],
    education: [
      {
        degreeName: "",
        collegeName: "",
        collegeLocation: "",
        sessionStart: "",
        sessionEnd: "",
      },
    ],
    projects: [
      {
        projectName: "",
        projectTech: "",
        projectDescription: "",
        projectStart: "",
        projectEnd: "",
      },
    ],
    skills: [],
    languages: [],
    additionalDetails: [],
    achievement: [],
  };

  const [formData, setFormData] = useState(obj);
  const { aiResponse } = useSelector((state) => state.resume);

  const [experiences, setExperiences] = useState([{ id: 1 }]);
  const [educations, setEducations] = useState([{ id: 1 }]);
  const [skills, setSkills] = useState([{ id: 1 }]);
  const [language, setLanguage] = useState([{ id: 1 }]);
  const [project, setProject] = useState([{ id: 1 }]);
  const [additionalDetail, setAdditionalDetails] = useState([{ id: 1 }]);
  const [achievementcount, setachievementCount] = useState([{ id: 1 }]);
  const [prompt, setPrompt] = useState("");
  // handling data of the user //

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //handlign experiences
  const handleAddExperience = () => {
    setExperiences([...experiences, { id: experiences.length + 1 }]);
    // setFormData({
    //   ...formData,
    //   experiences: [
    //     ...formData.experiences,
    //     {
    //       companyName: "",
    //       role: "",
    //       description: "",
    //       startDate: "",
    //       endDate: "",
    //     },
    //   ],
    // });
  };

  const handleExperienceChange = (index, e) => {
    const { name, value } = e.target;
    const updatedExperiences = [...formData.experiences];

    if (!updatedExperiences[index]) {
      updatedExperiences[index] = {
        companyName: "",
        role: "",
        description: "",
        startDate: "",
        endDate: "",
      };
    }
    updatedExperiences[index][name] = value;
    setFormData({ ...formData, experiences: updatedExperiences });
  };

  //handling education

  const handleEducation = () => {
    setEducations([...educations, { id: educations.length + 1 }]);

    // setFormData({
    //   ...formData,
    //   education: [
    //     ...formData.education,
    //     {
    //       degreeName: "",
    //       collegeName: "",
    //       location: "",
    //       sessionStart: "",
    //       sessionEnd: "",
    //     },
    //   ],
    // });
  };

  const handleEducationChange = (index, e) => {
    const { name, value } = e.target;
    const updatedEducation = [...formData.education];
    if (!updatedEducation[index]) {
      updatedEducation[index] = {
        degreeName: "",
        collegeName: "",
        collegeLocation: "",
        sessionStart: "",
        sessionEnd: "",
      };
    }

    updatedEducation[index][name] = value;
    setFormData({ ...formData, education: updatedEducation });
  };

  //handling project
  const handleProject = () => {
    setProject([...project, { id: project.length + 1 }]);
    // setFormData({
    //   ...formData,
    //   projects: [
    //     ...formData.projects,
    //     {
    //       projectName: "",
    //       projectTech: "",
    //       projectDescription: "",
    //       projectStart: "",
    //       projectEnd: "",
    //     },
    //   ],
    // });
  };
  const handleProjectChange = (index, e) => {
    const { name, value } = e.target;
    const updatedProjects = [...formData.projects];

    if (!updatedProjects[index]) {
      updatedEducation[index] = {
        projectName: "",
        projectTech: "",
        projectDescription: "",
        projectStart: "",
        projectEnd: "",
      };
    }

    updatedProjects[index][name] = value;
    setFormData({ ...formData, projects: updatedProjects });
  };

  //skilled handling
  const handleSkill = () => {
    setSkills([...skills, { id: skills.length + 1 }]);
    // setFormData({ ...formData, skills: [...formData.skills, ""] });
  };

  const handleSkillChange = (index, e) => {
    const updatedSkills = [...formData.skills];
    updatedSkills[index] = e.target.value;
    setFormData({ ...formData, skills: updatedSkills });
  };

  //language handler
  const handleLanguage = () => {
    setLanguage([...language, { id: language.length + 1 }]);
    // setFormData({ ...formData, languages: [...formData.languages, ""] });
  };

  const handleLanguageChange = (index, e) => {
    const updatedLanguages = [...formData.languages];
    updatedLanguages[index] = e.target.value;
    setFormData({ ...formData, languages: updatedLanguages });
  };

  //addtional activity
  const handleAdditionalDetails = () => {
    setAdditionalDetails([...additionalDetail, { id: language.length + 1 }]);
  };

  const handleAdditionalChanges = (index, e) => {
    const updatedAdditionalDetail = [...formData.additionalDetails];
    updatedAdditionalDetail[index] = e.target.value;
    setFormData({ ...formData, additionalDetails: updatedAdditionalDetail });
  };

  //achievement details
  const handleAchievement = () => {
    setachievementCount([...achievementcount, { id: language.length + 1 }]);
  };

  const handleAchievementChanges = (index, e) => {
    const updateAchievement = [...formData.additionalDetails];
    updateAchievement[index] = e.target.value;
    setFormData({ ...formData, achievement: updateAchievement });
  };

  const submitFormHandler = (e) => {
    e.preventDefault();
    console.log("Collected Data:", formData);
    dispatch(setUserTempData(formData));
    navigateTo("/resume-preview");
  };

  const promptHandler = () => {
    console.log(formData)
    dispatch(getResponseRedux(prompt));
  };

  return (
    <div className="px-4 md:px-12 py-18 bg-gray-100 flex flex-col gap-4 w-full">
      <div className="flex flex-col md:flex-row gap-2 ">
        {/* left section */}
        <div className="w-full md:w-7/12 p-4 border rounded-md">
          <form
            action=""
            className="flex flex-col gap-4 w-full "
            onSubmit={submitFormHandler}
          >
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="" className="">
                FullName
              </label>
              <input
                type="text"
                name="fullName"
                placeholder="Your Full Name"
                onChange={handleInputChange}
                // value={formValue.fullName}
                className="outline-none border border-gray-400 rounded-md py-2 px-4"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="" className="">
                Expert In
              </label>
              <input
                type="text"
                name="expertIn"
                onChange={handleInputChange}
                // value={formValue.expertIn}
                placeholder="You are Expert In"
                className="outline-none border border-gray-400 rounded-md py-2 px-4"
              />
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="" className="">
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  placeholder="Your Email"
                  onChange={handleInputChange}
                  className="outline-none border border-gray-400 rounded-md py-2 px-4 "
                />
              </div>

              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="" className="">
                  phone
                </label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Your Phone"
                  onChange={handleInputChange}
                  className="outline-none border border-gray-400 rounded-md py-2 px-4 "
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="" className="">
                  GitHub
                </label>
                <input
                  type="text"
                  name="gitHub"
                  placeholder="Your GitHub"
                  onChange={handleInputChange}
                  className="outline-none border border-gray-400 rounded-md py-2 px-4"
                />
              </div>

              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="" className="">
                  LinkedIn
                </label>
                <input
                  type="text"
                  name="linkedIn"
                  placeholder="Your LinkedIn"
                  onChange={handleInputChange}
                  className="outline-none border border-gray-400 rounded-md py-2 px-4"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="" className="">
                Summary
              </label>
              <input
                type="text"
                name="summary"
                placeholder="Your Summary"
                onChange={handleInputChange}
                className="outline-none border border-gray-400 rounded-md py-2 px-4"
              />
            </div>

            <div className="flex flex-col gap-1 w-full">
              <div className="flex flex-row justify-around">
                <label htmlFor="" className="font-semibold">
                  Professional Experience
                </label>
                <div className="flex justify-center items-center text-white">
                  <button
                    type="button"
                    onClick={handleAddExperience}
                    className=" cursor-pointer font-bold text-2xl pb-1 px-2 rounded-md bg-blue-500"
                  >
                    +
                  </button>
                </div>
              </div>

              {experiences?.map((exp, index) => (
                <div
                  key={index}
                  className="space-y-2 flex flex-col md:flex-row gap-2 flex-wrap mb-6"
                >
                  <input
                    type="text"
                    name="companyName"
                    placeholder="Company Name"
                    onChange={(e) => handleExperienceChange(index, e)}
                    className="outline-none border border-gray-400 rounded-md py-2 px-4"
                  />

                  <input
                    type="text"
                    name="role"
                    placeholder="Your Role"
                    onChange={(e) => handleExperienceChange(index, e)}
                    className="outline-none border border-gray-400 rounded-md py-2 px-4"
                  />

                  <input
                    type="text"
                    name="description"
                    placeholder="description about Your Role"
                    onChange={(e) => handleExperienceChange(index, e)}
                    className="outline-none border border-gray-400 rounded-md py-2 px-4"
                  />

                  <input
                    type="date"
                    name="startDate"
                    placeholder="starting Date"
                    onChange={(e) => handleExperienceChange(index, e)}
                    className="outline-none border border-gray-400 rounded-md py-2 px-4"
                  />

                  <input
                    type="date"
                    name="endDate"
                    placeholder="Ending Date"
                    onChange={(e) => handleExperienceChange(index, e)}
                    className="outline-none border border-gray-400 py-2 rounded-md  px-4"
                  />
                  <hr />
                </div>
              ))}
            </div>

            {/* education and qualifications */}

            <div className="flex flex-col gap-1 w-full">
              <div className="flex flex-row justify-around">
                <label htmlFor="" className="font-semibold">
                  Education Details
                </label>
                <div className="flex justify-center items-center text-white">
                  <button
                    type="button"
                    onClick={handleEducation}
                    className=" cursor-pointer font-bold text-2xl pb-1 px-2 rounded-md bg-blue-500"
                  >
                    +
                  </button>
                </div>
              </div>

              {educations?.map((exp, index) => (
                <div
                  key={index}
                  className="space-y-2 flex flex-col md:flex-row gap-2 flex-wrap mb-6"
                >
                  <input
                    type="text"
                    name="degreeName"
                    placeholder="Degree Name"
                    onChange={(e) => handleEducationChange(index, e)}
                    className="outline-none border border-gray-400 rounded-md py-2 px-4"
                  />

                  <input
                    type="text"
                    name="collegeName"
                    placeholder="college Name or University Name"
                    onChange={(e) => handleEducationChange(index, e)}
                    className="outline-none border border-gray-400 rounded-md py-2 px-4"
                  />

                  <input
                    type="text"
                    name="collegeLocation"
                    placeholder="college Location"
                    onChange={(e) => handleEducationChange(index, e)}
                    className="outline-none border border-gray-400 rounded-md py-2 px-4"
                  />

                  <input
                    type="date"
                    name="sessionStart"
                    placeholder="starting Date"
                    onChange={(e) => handleEducationChange(index, e)}
                    className="outline-none border border-gray-400 rounded-md py-2 px-4"
                  />

                  <input
                    type="date"
                    name="sessionEnd"
                    placeholder="Ending Date"
                    onChange={(e) => handleEducationChange(index, e)}
                    className="outline-none border border-gray-400 py-2 rounded-md  px-4"
                  />
                  <hr />
                </div>
              ))}
            </div>

            {/* projects and its details */}

            <div className="flex flex-col gap-1 w-full">
              <div className="flex flex-row justify-around">
                <label htmlFor="" className="font-semibold">
                  Project Details
                </label>
                <div className="flex justify-center items-center text-white">
                  <button
                    type="button"
                    onClick={handleProject}
                    className=" cursor-pointer font-bold text-2xl pb-1 px-2 rounded-md bg-blue-500"
                  >
                    +
                  </button>
                </div>
              </div>

              {project?.map((exp, index) => (
                <div
                  key={index}
                  className="space-y-2 flex flex-col md:flex-row gap-2 flex-wrap mb-6"
                >
                  <input
                    type="text"
                    name="projectName"
                    placeholder="Project Name"
                    onChange={(e) => handleProjectChange(index, e)}
                    className="outline-none border border-gray-400 rounded-md py-2 px-4"
                  />

                  <input
                    type="text"
                    name="projectTech"
                    placeholder="Project Technology"
                    onChange={(e) => handleProjectChange(index, e)}
                    className="outline-none border border-gray-400 rounded-md py-2 px-4"
                  />

                  <input
                    type="text"
                    name="projectDescription"
                    placeholder="project Description"
                    onChange={(e) => handleProjectChange(index, e)}
                    className="outline-none border border-gray-400 rounded-md py-2 px-4"
                  />

                  <input
                    type="date"
                    name="projectStart"
                    onChange={(e) => handleProjectChange(index, e)}
                    className="outline-none border border-gray-400 rounded-md py-2 px-4"
                  />

                  <input
                    type="date"
                    name="projectEnd"
                    placeholder="Ending Date"
                    onChange={(e) => handleProjectChange(index, e)}
                    className="outline-none border border-gray-400 py-2 rounded-md  px-4"
                  />
                  <hr />
                </div>
              ))}
            </div>

            {/* skills */}

            <div className="flex flex-col gap-1 w-full">
              <div className="flex flex-row justify-around">
                <label htmlFor="" className="font-semibold">
                  Skills
                </label>
                <div className="flex justify-center items-center text-white">
                  <button
                    type="button"
                    onClick={handleSkill}
                    className=" cursor-pointer font-bold text-2xl pb-1 px-2 rounded-md bg-blue-500"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col flex-wrap md:flex-row gap-2 ">
                {skills?.map((exp, index) => (
                  <div key={index} className="space-y-2 flex  flex-wrap ">
                    <input
                      type="text"
                      name={`$skill${index}`}
                      onChange={(e) => handleSkillChange(index, e)}
                      placeholder={`Skills Name ${index + 1}`}
                      className="outline-none border border-gray-400 rounded-md py-2 px-4"
                    />

                    <hr />
                  </div>
                ))}
              </div>
            </div>

            {/* language details */}

            <div className="flex flex-col gap-1 w-full">
              <div className="flex flex-row justify-around">
                <label htmlFor="" className="font-semibold">
                  Language Details
                </label>
                <div className="flex justify-center items-center text-white">
                  <button
                    type="button"
                    onClick={handleLanguage}
                    className=" cursor-pointer font-bold text-2xl pb-1 px-2 rounded-md bg-blue-500"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col flex-wrap md:flex-row gap-2 ">
                {language?.map((exp, index) => (
                  <div key={index} className="space-y-2 flex  flex-wrap ">
                    <input
                      type="text"
                      name={`$lanuage${index}`}
                      placeholder={`language ${index + 1}`}
                      onChange={(e) => handleLanguageChange(index, e)}
                      className="outline-none border border-gray-400 rounded-md py-2 px-4"
                    />

                    <hr />
                  </div>
                ))}
              </div>
            </div>

            {/* additinal Activity */}
            <div className="flex flex-col gap-1 w-full">
              <div className="flex flex-row justify-around">
                <label htmlFor="" className="font-semibold">
                  Additional Activity
                </label>
                <div className="flex justify-center items-center text-white">
                  <button
                    type="button"
                    onClick={handleAdditionalDetails}
                    className=" cursor-pointer font-bold text-2xl pb-1 px-2 rounded-md bg-blue-500"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col flex-wrap md:flex-row gap-2 ">
                {additionalDetail?.map((exp, index) => (
                  <div key={index} className="space-y-2 flex  flex-wrap ">
                    <input
                      type="text"
                      name={`$additionalActivity${index}`}
                      placeholder={`Activity ${index + 1}`}
                      onChange={(e) => handleAdditionalChanges(index, e)}
                      className="outline-none border border-gray-400 rounded-md py-2 px-4"
                    />

                    <hr />
                  </div>
                ))}
              </div>
            </div>

            {/* achievement */}

            <div className="flex flex-col gap-1 w-full">
              <div className="flex flex-row justify-around">
                <label htmlFor="" className="font-semibold">
                  Achievement
                </label>
                <div className="flex justify-center items-center text-white">
                  <button
                    type="button"
                    onClick={handleAchievement}
                    className=" cursor-pointer font-bold text-2xl pb-1 px-2 rounded-md bg-blue-500"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col flex-wrap md:flex-row gap-2 ">
                {achievementcount?.map((exp, index) => (
                  <div key={index} className="space-y-2 flex  flex-wrap ">
                    <input
                      type="text"
                      name={`$achievement${index}`}
                      placeholder={`achievement ${index + 1}`}
                      onChange={(e) => handleAchievementChanges(index, e)}
                      className="outline-none border border-gray-400 rounded-md py-2 px-4"
                    />

                    <hr />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <button className="font-bold text-white rounded-md bg-yellow-600 transition-all duration-200 hover:bg-yellow-500 hover:scale-95 cursor-pointer py-2 px-4">
                Submit
              </button>
            </div>
          </form>
        </div>

        {/* right section */}
        <div className="w-full md:w-5/12">
          {/* ai section */}

          <div className="w-full">
            <div>
              <textarea
                name=""
                id=""
                placeholder="Enter your prompt to get Ai response"
                rows={4}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="rounded-md py-2 px-4 w-full resize-none outline-none border border-gray-300"
              ></textarea>
              <BtnButton
                bgcolor={"--yellow"}
                hovercolor={"--secondary-color"}
                textcolor={"white"}
                loading={false}
                handler={promptHandler}
              >
                Get Response
              </BtnButton>
            </div>
          </div>

          {/* response */}
          {aiResponse && (
            <div className="shadow-md p-4 mt-6 rounded-md">{aiResponse}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResumeForm;
