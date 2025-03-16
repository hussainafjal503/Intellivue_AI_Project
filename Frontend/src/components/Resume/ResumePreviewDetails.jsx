import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { SketchPicker } from "react-color";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function ResumePreviewDetails() {
  const [color, setColor] = useState("rgba(52, 152, 219, 1)");
  const [isExpanded, setIsExpanded] = useState(false);
  const pickerRef = useRef(null);
  const { userData } = useSelector((state) => state.resume);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false); 
  const [resumeCount,setresumeCount]=useState(0);



  // Function to handle clicks outside the color picker
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setIsExpanded(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);



  const handleColorChange = (updatedColor) => {
    const { r, g, b, a } = updatedColor.rgb;

    const newColor =
      a === 1 ? `rgb(${r}, ${g}, ${b})` : `rgba(${r}, ${g}, ${b}, ${a})`;
    setColor(newColor);
  };

  //   download resume
  const targetRef = useRef(null);

  const generatePDF = async () => {
    if (!targetRef.current) {
      console.error("Target element not found!");
      return;
    }

    setIsGeneratingPDF(true); // Apply A4 styles before capture

    setTimeout(async () => {
      try {
        const pdf = new jsPDF("p", "mm", "a4"); // A4 Portrait
        const pdfWidth = 210; // mm
        const pdfHeight = 297; // mm

        // Capture a high-resolution screenshot
        const canvas = await html2canvas(targetRef.current, {
          scale: 3, // Increase quality
          useCORS: true, // Fix external image issues
          backgroundColor: "#ffffff",
          windowWidth: 1000, // Forces larger rendering
        });

        const imgData = canvas.toDataURL("image/png");
        const imgWidth = pdfWidth;
        const imgHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight, undefined, "FAST");
        pdf.save(`${userData.fullName}${resumeCount}`);
		
      } catch (error) {
        console.error("PDF Generation Error:", error);
      }

      setIsGeneratingPDF(false); // Restore responsive styles
    }, 300);


	setresumeCount(prev=>prev+1)
  };

  return (
    <div className="py-18 px-4 md:px-30 w-full">
      <div className="flex md:flex-row flex-col-reverse justify-between gap-6 flex-wrap items-center mb-2 w-full">
        <div
          ref={pickerRef}
          style={{ position: "relative", display: "inline-block" }}
        >
          {/* Small Preview Circle */}
          <div
            onClick={() => setIsExpanded(true)}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: color,
              cursor: "pointer",
              border: "2px solid #ccc",
            }}
          ></div>

          {/* Expanded Color Picker */}
          {isExpanded && (
            <div
              style={{
                position: "absolute",
                top: "50px",
                left: "0",
                zIndex: 10,
              }}
            >
              <SketchPicker
                color={color}
                onChange={(updatedColor) => handleColorChange(updatedColor)}
              />
            </div>
          )}
        </div>

        <div className="w-full px-4 md:w-4/12">
          <p>
            <span>Note:- </span>
            If you want bullet points in your project description and
            experiences, write inside description section with Comma (,) seprated..
          </p>
        </div>
      </div>

      <div className="w-full flex flex-col gap-2">

	
			
		<div

			className={`  max-w-full md:w-full w-fit h-full p-4 rounded-md shadow-md bg-white ${
				isGeneratingPDF ? "fixed top-0 left-0 w-[210mm] min-h-[297mm]" : "relative"
			  }`}
			  ref={targetRef}
			  id="resume"
			  style={{
				backgroundColor: "white",
				padding: "20px",
				fontFamily: "Arial, sans-serif",
				width: isGeneratingPDF ? "210mm" : "100%",
				minHeight: isGeneratingPDF ? "297mm" : "auto",
			  }}



          >
            <div className="p-0">
              <h2 className={`font-bold text-lg text-center capitalize `}>
                {userData.fullName}
              </h2>
              <p className="font bold text-sm text-center normal-case ">
                {userData.expertIn}
              </p>
              <div className="flex flex-row gap-2 justify-center text-sm">
                <p className="">{userData.email}</p>
                <p>{userData.phone}</p>
                <p>{userData.gitHub}</p>
                <p>{userData.linkedIn}</p>
              </div>
              <div
                className={`border-b w-full mt-2 `}
                style={{
                  borderColor: `${color}`,
                }}
              ></div>
              {/* Summary details */}
              <div className="mt-2">
                <p className="ml-4 text-sm text-center">{userData.summary}</p>
              </div>

              {/* professional experiences */}

              {
                userData?.experiences && <div className="mt-2">
                <p className="font-semibold text-sm">
                  Professional Experiences
                </p>
                <div
                  className="border-b w-full mt-1"
                  style={{
                    borderColor: `${color}`,
                  }}
                ></div>
                {userData.experiences.map((item, index) => (
                  <div key={index}>
                    <div className="mt-1 flex flex-col">
                      <div className="flex justify-between">
                        <p className="ml-4 capitalize font-semibold">
                          {item.companyName}
                        </p>

                        <p className="text-sm font-light">
                          <span>{item.startDate}-</span>
                          <span>{item.endDate}</span>
                        </p>
                      </div>

                      {item.description.split(",").map((desc, index) => (
                        <div
                          key={index}
                          className="flex flex-col gap-1 text-xs ml-6"
                        >
                          <li className="list-disc">{desc}</li>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              }
              

              {/* educational details */}

{
  userData?.education &&   <div className="mt-3">
  <p className="font-semibold text-sm">Education</p>
  <div
    className="border-b w-full mt-1"
    style={{
      borderColor: `${color}`,
    }}
  ></div>
  {userData.education.map((item, index) => (
    <div key={index}>
      <div className="mt-1 flex flex-col">
        <div className="flex justify-between">
          <div>
            <p className="ml-4 capitalize font-semibold">
              {item.degreeName}
            </p>
            <p className="ml-6 capitalize font-light text-sm leading-3">
              {item.collegeName}
            </p>
          </div>
          <div>
            <p className="capitalize font-semibold">
              {item.collegeLocation}
            </p>
            <p className="text-sm font-light leading-3">
              <span>{item.sessionStart}-</span>
              <span>{item.sessionEnd}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>
}
             

              {/* project details*/}


              {
                userData?.projects &&   <div className="mt-3">
                <p className="font-semibold text-sm">Projects</p>
                <div
                  className="border-b w-full mt-1"
                  style={{
                    borderColor: `${color}`,
                  }}
                ></div>
                {userData.projects.map((item, index) => (
                  <div key={index}>
                    <div className="mt-1 flex flex-col">
                      <div className="flex justify-between mb-2">
                        <div>
                          <p className="ml-4 capitalize font-semibold">
                            {item.projectName}
                          </p>
                          <p className="ml-6 capitalize font-light text-xs leading-1.5">
                            {" "}
                            <span className="font-semibold">Tech: </span>
                            {item.projectTech}
                          </p>
                        </div>
                        <div>
                          <p className="capitalize font-semibold">
                            {item.collegeLocation}
                          </p>
                          <p className="text-sm font-light leading-3">
                            <span>{item.projectStart}-</span>
                            <span>{item.projectEnd}</span>
                          </p>
                        </div>
                      </div>

                      {item.projectDescription.split(",").map((desc, index) => (
                        <div
                          key={index}
                          className="flex  flex-col gap-1 text-xs ml-8"
                        >
                          <li className="list-disc">{desc}</li>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              }

            

              {/* skill section */}

              {
                userData?.skills &&   <div className="mt-3">
                <p className="font-semibold text-sm">Skills</p>
                <div
                  className="border-b w-full mt-1 mb-2"
                  style={{
                    borderColor: `${color}`,
                  }}
                ></div>

                <div className="flex gap-6 flex-wrap ml-10 ">
                  {userData.skills.map((item, index) => (
                    <div key={index} className="-mb-2">
                      <li
                        className="  px-3 rounded-md  list-disc text-sm"
                       
                      >
                        {item}
                      </li>
                    </div>
                  ))}
                </div>
              </div>
              }

             

              {/* language section */}

              {
                userData?.languages && <div className="mt-3">
                <p className="font-semibold text-sm">Languages</p>
                <div
                  className="border-b w-full mt-1"
                  style={{
                    borderColor: `${color}`,
                  }}
                ></div>

                <div className="flex gap-6 flex-wrap ml-10 mt-2">
                  {userData.languages.map((item, index) => (
                    <div key={index}>
                      <span
                        className="  px-3 rounded-md py-1 text-sm"
                        style={{
                          backgroundColor: `${color}`,
                        }}
                      >
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              }

              

              {/* additional activity */}

              {
                userData?.additionalActivity &&  <div className="mt-3">
                <p className="font-semibold text-sm">AdditionalActivity</p>
                <div
                  className="border-b w-full mt-1"
                  style={{
                    borderColor: `${color}`,
                  }}
                ></div>

                <div className="fflex flex-col ml-4 mt-2 ">
                  {userData.additionalActivity.map((item, index) => (
                    <div key={index}>
                      <li className="list-disc leading-4 text-xs">{item}</li>
                    </div>
                  ))}
                </div>
              </div>
              }

             

              {/* achievements */}

              {
                userData?.achievement && <div className="mt-3">
                <p className="font-semibold">achievement</p>
                <div
                  className="border-b w-full mt-1"
                  style={{
                    borderColor: `${color}`,
                  }}
                ></div>

                <div className="flex flex-col ml-4 mt-2 ">
                  {userData.achievement.map((item, index) => (
                    <div key={index}>
                      <li className="list-disc leading-4 text-xs">{item}</li>
                    </div>
                  ))}
                </div>
              </div>
              }
              


            </div>
          </div>
		
		
         
     

        <button
          className="py-1 px-4 rounded-md cursor-pointer hover:scale-95 transiton-all duration-200 bg-amber-600 font-bold text-white"
		  onClick={generatePDF}
          style={{ marginTop: "20px", padding: "10px" }}
        >
          Download PDF
        </button>














      </div>
    </div>
  );
}

export default ResumePreviewDetails;
