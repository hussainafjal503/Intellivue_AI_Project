import React, { useEffect } from "react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import a from "../../assets/a.png";
import b from "../../assets/b.png";
import c from "../../assets/c.png";
import d from "../../assets/d.png";
import Module from "../Home/Module";
import { TypeAnimation } from "react-type-animation";
import coding from "../../assets/coding.png";
import module1 from "../../assets/module1.jpg";
import roadmap from "../../assets/roadmaps.jpg";
import resume from "../../assets/resume.jpg";
import interview from "../../assets/interview.avif";
import ContactBtn from "../Home/ContactBtn";



function Home() {
 

  return (
    <div className="mt-14 -z-10  scroll-smooth snap-y snap-mandatory">
      {/* hero section */}

      <div
        className="px-6 w-full flex flex-col md:flex-row gap-2 pt-12 bg-[var(--bg-color)] md:pb-18 pb-10"
        style={{
          backgroundImage: `linear-gradient(to bottom, #05595b, #165e60, #226466, #2c696b, #356f71, #497c82, #5d8992, #7196a1, #97aebb, #bdc7d2, #dfe1e8, #fefefe)`,
        }}
      >
        <div className="font-bold text-white w-full md:w-6/12 md:p-4 px-1">
          <h2 className=" text-3xl md:text-5xl text-yellow-500">
            Unlock Your Potential with Smart Learning
          </h2>
          <p className="text-wrap flex flex-col gap-1 mt-4 md:mt-10 text-justify">
            <span className="text-[var(--btn-color1)] font-bold text-2xl">
              Learn Smarter, Achieve More
            </span>
            Explore personalized learning paths, interactive lessons, and
            real-time progress tracking. Whether you're mastering new skills or
            revising old ones, our platform adapts to your pace and style.
          </p>
          <div className=" mt-6 ">
            <Swiper
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
              }}
              modules={[Autoplay, Pagination, Navigation]}
              className="mySwiper "
            >
              <SwiperSlide>
                <div className="flex flex-col">
                  <span className="text-[var(--btn-color1)]">
                    📚 Tailored Learning Experience:
                  </span>
                  <span className="pl-6">
                    Our advanced algorithms personalize your learning journey by
                    recommending courses that match your interests, skills, and
                    goals. No more one-size-fits-all education!
                  </span>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="flex flex-col">
                  <span className="text-[var(--btn-color1)]">
                    🎯 Goal-Oriented Approach:
                  </span>
                  <span className="pl-6">
                    Set your learning objectives and track your progress with
                    our intuitive dashboard. Celebrate milestones and stay
                    motivated with daily challenges and achievement badges.
                  </span>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="flex flex-col">
                  <span className="text-[var(--btn-color1)]">
                    🕒 Learn at Your Own Pace:
                  </span>
                  <span className="pl-6">
                    No rigid schedules. Access your courses anytime, anywhere,
                    on any device. Learn at your convenience and revisit the
                    lessons as often as you need.
                  </span>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="flex flex-col">
                  <span className="text-[var(--btn-color1)]">
                    🎓 Interactive & Fun Learning:
                  </span>
                  <span className="pl-6">
                    Engage with multimedia-rich content, including videos,
                    quizzes, and gamified challenges. Participate in live
                    sessions, group discussions, and peer-to-peer learning to
                    make education social and enjoyable.
                  </span>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>

          <p className="mt-4 text-justify hidden md:block text-amber-900">
            Welcome to the future of education! Our platform is designed to
            empower learners of all ages and backgrounds. Whether you're a
            student, professional, or lifelong learner, we provide the tools and
            resources to help you grow and excel.
          </p>
        </div>
        <div className=" w-full md:w-6/12 h-6/12">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            <SwiperSlide>
              <img src={a} alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={b} alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={c} alt="" className="md:h-[520px] h-auto" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={d} alt="" className="md:h-[520px] h-auto" />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>

      {/* supercharge  section */}

      <div className="px-6 md:py-2 -mt-15 md:mt-0" style={{}}>
        <h4 className="font-bold md:text-8xl text-4xl md:px-6">
          Supercharge your learning with{" "}
          <span className="text-green-500">AI Intelligence.</span>
        </h4>
        <div className="flex flex-row gap-2 w-full font-bold text-lg p-4 rounded-md ">
          <div className="flex md:flex-row flex-col justify-center w-full md:mt-6">
            <div className="w-full flex justify-center items-center">
              <img src={coding} alt="" className="W-[350PX] h-[450px]" />
            </div>

            <div className="md:flex flex-row gap-2 w-full justify-center mt-6 hidden">
              <div className="flex flex-col">
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
                <span>7</span>
                <span>8</span>
                <span>9</span>
                <span>10</span>
                <span>11</span>
                <span>12</span>
                <span>13</span>
                <span>14</span>
              </div>

              <div className="">
                <TypeAnimation
                  style={{
                    whiteSpace: "pre-line",
                    height: "195px",
                    display: "block",
                    color: "#966112",
                  }}
                  sequence={[
                    `<html lang="en">
<head>
    <title>Learning Management System</title>
</head>
<body>
    <div class="container">
        <h1>Welcome to Our Learning Plateform</h1>
        <p>Start your learning journey today with our feature-rich.
		 and explore the endless possibilities of digital education!</p>
    </div>
</body>
</html>
`,
                    1000,
                    "",
                  ]}
                  repeat={Infinity}
                />
              </div>
            </div>

            <div className="flex flex-row gap-2 w-full justify-center mt-6 md:hidden px-0">
              <div className="flex flex-col">
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
                <span>7</span>
                <span>8</span>
                <span>9</span>
                <span>10</span>
                <span>11</span>
                <span>12</span>
                <span>13</span>
                <span>14</span>
              </div>

              <div className="">
                <TypeAnimation
                  style={{
                    whiteSpace: "pre-line",
                    height: "195px",
                    display: "block",
                    color: "#966112",
                  }}
                  sequence={[
                    `<html lang="en">
<body>
    <div class="container">
        <h1>Welcome to Our Learning Plateform</h1>
        <p>Start your learning journey today with our feature-rich.
		 and explore the endless possibilities of digital education!</p>
    </div>
</body>
</html>
`,
                    1000,
                    "",
                  ]}
                  repeat={Infinity}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* module section */}

      <div
        className="flex flex-col mt-22  pb-12 "
        style={{
          backgroundImage: `linear-gradient(to bottom, #ffffff, #fcfdfe, #f9fbfc, #f6f9fb, #f2f7f9, #f0f6f7, #eff5f6, #edf4f4, #edf3f3, #edf2f2, #ecf1f1, #ecf0f0)`,
        }}
      >
        <div className="md:px-44 px-18 flex md:flex-row flex-col justify-around  gap-4 flex-wrap">
          <Module
            image={module1}
            href="/coding-practice"
            text={
              "Ready to level up your coding skills? 🚀 Solve this challenge and sharpen your logic!"
            }
            data={"Coding Practice"}
          />
          <Module
            image={roadmap}
            href="/roadmaps"
            text={
              "Ready to level up your coding skills? 🚀 Solve this challenge and sharpen your logic!"
            }
            data={"Get Your Roadmaps"}
          />
          <Module
            image={resume}
            href="/resume"
            text={
              "Ready to level up your coding skills? 🚀 Solve this challenge and sharpen your logic!"
            }
            data={"Build Your Resume"}
          />
          <Module
            image={interview}
            href="/interview-practice"
            text={
              "Ready to level up your coding skills? 🚀 Solve this challenge and sharpen your logic!"
            }
            data={"Interview Practice"}
          />
        </div>

        {/* Contact-btn */}
        <ContactBtn />
      </div>
    </div>
  );
}

export default Home;
