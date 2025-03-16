import React from 'react'
import aboutImage2 from '../../assets/aboutImage2.jpg';
import aboutImage3 from '../../assets/aboutImage3.jpg';
import aboutImage5 from '../../assets/aboutImage5.jpg'


function AboutPage() {
  return (
	<div className='py-12 w-full bg-gray-200'>

		<div className='w-full relative'>
			<div className='w-full md:h-[450px] h-auto'>
				<img src={aboutImage5} alt="" className=' w-full h-auto md:h-[450px]'/>
			</div>

			<div className='absolute top-0 left-0 w-full h-full flex justify-center items-center' 	style={{
							background:`rgba(0,0,0,0.6)`
						}}>
						<div className='space-y-6 font-semibold text-white text-center '
					
						>
							<h2 className='font-bold md:text-6xl  text-2xl'>About Us</h2>
							<p className='md:w-7/12 w-10/12 mx-auto'>Our AI-driven platform is designed to empower aspiring developers and professionals by providing intelligent solutions.</p>
						</div>
			</div>
		</div>


		{/* another section */}

		<div className='md:px-16 px-8 pt-8  '>
						<p className='font-bold text-xl text-center md:w-6/12 mx-auto'>
						Preparing Students to Excel with AI-Powered Guidance.
						</p>


				<div className='mt-10 flex md:flex-row flex-col gap-6'>
							<div className='w-full md:w-6/12'>
						
								<div className='font-semibold space-y-4 '>
									<p className='text-green-500 tracking-[15px] '>Who we Are </p>
									<p className='font-bold text-6xl capitalize'>Who We Are</p>

								</div>

								<p className='mt-10 w-10/12'>We are an AI-powered career development platform dedicated to helping aspiring developers and professionals excel in coding, technical interviews, and career growth. Our mission is to bridge the gap between learning and job success by providing intelligent solutions for code reviews, interview preparation, resume building, and personalized roadmaps.</p>

								<img src={aboutImage2} alt=""  className='rounded-lg mt-16 w-10/12'/>
				
						</div>


						<div className='w-full md:w-6/12 md:mt-35'>
						
								<div className='font-semibold space-y-4 '>
									<p className='text-green-500 tracking-[15px] '> Why Us</p>
									<p className='font-bold text-6xl capitalize'> Why Us</p>

								</div>

								<p className='mt-10 w-10/12'>At Intellivue, we go beyond traditional learning by leveraging AI-powered solutions to make coding, interview preparation, and career building smarter and more efficient. We are committed to empowering learners with the right tools, guidance, and confidence to excel in their careers. Whether you're just starting out or aiming for the next big opportunity, we help you achieve success with AI-powered precision! </p>

								<img src={aboutImage3} alt=""  className='rounded-lg mt-16 w-10/12'/>
				
						</div>
				
				</div>			
						
		</div>
	  
	</div>
  )
}

export default AboutPage
