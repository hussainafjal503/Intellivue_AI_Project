import React from 'react';
import {useNavigate} from 'react-router-dom'

function RoadMapHome() {

	const arr1=['Frontend','Backend','DevOps','FullStack','AI Engineer','Data Analyst','AI and Data Scientist','Android','ios','PostgreSQL','Blockchain','QA','Software Architect','Cyber Security','UX Design','Game Developer','Technical Writer','MLops','Product Manager','Engineering Manager','Developer Relations']

	const arr2=['Computer Science','React','Vue','Angular','JavaScript','Node.js','TypeScript','Python','SQL','SystemDesign','API Design','ASP NET Core','Java','C++','Flutter','Spring Boot','Go Roadmap','Rust','GraphQL','Design and Architecture','Design System','React Native','AWS','Code REview','Docker','Kubernetes','Linux','MongoDB','Prompt Enginerring','Terreform','Data Structure & Algorithms','Git and GitHub','Redis','PHP','Cloudflare','Create your own Roadmap']


	const navigateTo=useNavigate();
	const submitHandler =(data)=>{
		// console.log(data);
		navigateTo(`/roadMaps/${data}`);
	}
  return (
	<div className='py-18' style={{
		backgroundImage: `linear-gradient(to bottom, #05595b, #165e60, #226466, #2c696b, #356f71, #497c82, #5d8992, #7196a1, #97aebb, #bdc7d2, #dfe1e8, #fefefe)`,
	}}>

<div className='w-full text-white'>
       <div>
         <h1 className='font-bold text-3xl md:text-5xl text-center mt-20 text-[#FACC15]'>Developer Roadmaps</h1>
         <p className='mt-5 w-full px-4 text-sm md:w-7/12 mx-auto md:text-xl text-center'>roadmap.sh is a community effort to create roadmaps, guides and other educational content to help guide developers in picking up a path and guide their learnings.</p>
       </div>

       <div className='flex flex-row w-full items-center justify-center mx-auto mt-18'>
       <div className='border-b-2 w-3/12 md:w-5/12 '></div>
       <div className=' text-sm md:text-lg border rounded-lg px-2 py-1 w-fit'>Role-based Roadmaps</div>
       <div className='border-b-2 w-3/12 md:w-5/12 '></div>
       </div>


       <div className='mt-8 w-7/12 mx-auto px-auto   flex flex-row flex-wrap gap-2 justify-center '>
         {
          arr1.map((item,index)=>(
            <div key={index} className=' '>
               <button className='border  text-start pl-2 min-w-[250px] py-4 rounded-lg hover:bg-gray-300 transition-all duration-200 flex justify-between pr-2 cursor-pointer hover:scale-90'
			   	onClick={()=>submitHandler(item)}
			   ><span>{item}</span><i className="ri-reactjs-line"></i></button>
            </div>
          ))
         }
       </div>

       <div className='flex flex-row w-full items-center justify-center mx-auto mt-18'>
       <div className='border-b-2 w-3/12 md:w-5/12'></div>
       <div className='text-sm md:text-lg border rounded-lg px-2'>Skill-based Roadmaps</div>
       <div className='border-b-2 w-3/12 md:w-5/12 '></div>
       </div>

       <div className='mt-8 w-7/12 mx-auto px-auto   flex flex-row flex-wrap gap-2 justify-center text-rose-800  '>
        {
          arr2.map((item,index)=>(
            <div key={index}>
               <button className='border bg-gray-400 text-start pl-2 min-w-[250px] py-4 rounded-lg hover:bg-gray-300 transition-all duration-200 flex justify-between pr-2 cursor-pointer hover:scale-90'><span>{item}</span> <i className="ri-reactjs-line"></i></button>
            </div>
          ))
        }
      
       </div>
    </div>
	  
	</div>
  )
}

export default RoadMapHome
