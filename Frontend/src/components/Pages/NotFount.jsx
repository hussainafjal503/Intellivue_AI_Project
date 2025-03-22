import React from 'react';
import notFound from '../../assets/notFound.gif'
import{Link,useNavigate,useLocation} from 'react-router-dom'

function NotFount() {


  return (
	<div className='w-screen h-screen overflow-hidden flex justify-center items-center z-50 fixed top-0 bg-white pt-10 flex-col'>
		
			<p className='font-bold text-8xl text-green-700'>! 404 !</p>
		
		
			<img src={notFound} alt="" className='h-[350px] '/>
		

		<div className='text-center flex flex-col gap-2 '>
			<p className='font-bold text-3xl'>Look like you'r lost!!</p>
			<p className='font-semibold text-lg '>The page you'r looking for not Available</p>

			<div className='flex flex-row gap-6 justify-center text-white font-bold'>
				
				<Link 
				to={"/"}
				className='bg-yellow-600 rounded-md py-1 px-4 w-full transition-all duration-200 hover:scale-95 hover:bg-yellow-700'>Home</Link>
			</div>
		</div>
	  
	</div>
  )
}

export default NotFount
