import {createSlice} from '@reduxjs/toolkit'
import axios from 'axios'


const storeGenerated=sessionStorage.getItem('isGenerated') ? Number(sessionStorage.getItem("isGenerated")) : 0;
const question=sessionStorage.getItem("question") ? JSON.parse( sessionStorage.getItem('question')) :"No Question Generated Yet.."
// console.log(question)

const codingSlice=createSlice({
	name:"coding",
	initialState:{
		loading:false,
		error:null,
		message:null,
		allQuestion:null,
		question:question,
		isGenerated:storeGenerated,
		feedback:null,
		singleData:null
	},
	reducers:{
           genrateQuestionRequest:(state,action)=>{
			state.loading=true;

		   },
		   genrateQuestionSuccess:(state,action)=>{
			state.loading=false;
			state.message=action.payload.message;
			state.question=action.payload.data.codeQuestion
			state.isGenerated=1;

			sessionStorage.setItem('isGenerated',"1");
			sessionStorage.setItem('question',JSON.stringify(action.payload.data.codeQuestion));

		   },
		   generateQuestionFailed:(state,action)=>{
			state.loading=false;
			state.error=action.payload.message
			state.question=null;
			state.message=null;
			state.success=action.payload.success;

		   },



		// submiting the answer
		   submitRequest:(state,action)=>{
				state.loading=true;
				state.message=null;
				state.error=null;
				
		   },
		   submitSuccess:(state,action)=>{
			state.loading=false;
			state.message=action.payload
			state.isGenerated=2;
			sessionStorage.setItem("isGenerated","2");

		   },
		   submitFailed:(state,action)=>{
			state.loading=false;
			state.error=action.payload;
			state.message=null;
		   },


		   //feedback the answer
		   feedbackRequest:(state,action)=>{
			state.loading=true;
			state.error=null;
			state.message=null;
			
		   },
		   feedbackSuccess:(state,action)=>{
			state.loading=false;
			state.message=action.payload.message;
			state.error=null;
			state.feedback=action.payload?.data?.reviewFeedback;
			state.isGenerated=0
			sessionStorage.setItem('isGenerated',"0")
		   },
		   feedbackFailed:(state,action)=>{
			state.loading=false;
			state.message=null;
			state.error=action.payload;
			state.feedback=null;
		   },


		   //get all question //
		   getAllQuestionRequest:(state,action)=>{
				state.loading=true;
				state.error=null;
				state.message=null;
				
		   },
		   getAllQuestionSuccess:(state,action)=>{
			state.loading=false;
			state.allQuestion=action.payload;
			
		   },
		   getAllQuestionFailed:(state,action)=>{
			state.loading=false;
			state.error=action.payload;
		   },



		   //single question data fetching
		   getSingleQuestionRequest:(state,action)=>{
			state.loading=true;
			state.error=null;
			state.message=null;
		   },
		   getSingleQuestionSuccess:(state,action)=>{
			state.loading=false;
			state.singleData=action.payload;

		   },
		   getSingQuestionFailed:(state,action)=>{
			state.loading=false;
			state.error=action.payload;
		   },


		   //deleting the single question
		   deleteRequest:(state,action)=>{
			state.loading=true;
			state.error=null;
			state.message=false;

		   },
		   deleteSuccess:(state,action)=>{
			state.loading=false;
			state.error=null;
			state.message=action.payload;
		   },
		   deleteFailed:(state,action)=>{
			state.loading=false;
			state.message=null;
			state.error=action.payload;
		   },


		clearAllErrorRequest:(state,action)=>{
			state.error=null;
			state.question=state.question;
			state.allQuestion=state.allQuestion;
		}
	}
});


export const generateQuestion=()=>async(dispatch)=>{
	try{
		dispatch(codingSlice.actions.genrateQuestionRequest());
		const response=await axios.get('http://localhost:3000/api/v1/code/create-code',{
			withCredentials:true
		})
			// console.log(response);

			dispatch(codingSlice.actions.genrateQuestionSuccess(response?.data));
			dispatch(codingSlice.actions.clearAllErrorRequest());
	}catch(err){
		console.log(`Error occured while getting question : ${err}`);
		dispatch(codingSlice.actions.generateQuestionFailed(err?.response?.data));

	}

}


export const submitAnswer=(answer)=>async(dispatch)=>{
	dispatch(codingSlice.actions.submitRequest());

	try{
		const response=await axios.post('http://localhost:3000/api/v1/code/submit-code',{answer},{
			withCredentials:true,
			headers:{
				"Content-Type":"application/json"
			}
		})

		//  console.log(response);
		 dispatch(codingSlice.actions.submitSuccess(response.data?.message));

		dispatch(codingSlice.actions.clearAllErrorRequest());
	}catch(err){
		console.log(`Error Occured while submitting the answer : ${err}`);
		dispatch(codingSlice.actions.submitFailed(err?.response?.data?.message));
	}
}


export const getFeedback=()=>async(dispatch,getState)=>{
	dispatch(codingSlice.actions.feedbackRequest());
	try{
		const response=await axios.get('http://localhost:3000/api/v1/code/get-codeReview',{
			withCredentials:true
		});
		dispatch(codingSlice.actions.feedbackSuccess(response?.data))
	}catch(err){
		console.log(`Error Occured while getting feedabck : ${err} `);
		dispatch(codingSlice.actions.feedbackFailed(err?.response?.data?.message));

	}
}


export const getAllQuestion=()=>async(dispatch)=>{
	dispatch(codingSlice.actions.getAllQuestionRequest());
	try{
		const response=await axios.get('http://localhost:3000/api/v1/code/getAll-review',{
			withCredentials:true
		});
		// console.log(response);
		dispatch(codingSlice.actions.getAllQuestionSuccess(response?.data?.data?.codingQuestions));
		dispatch(codingSlice.actions.clearAllErrorRequest());

	}catch(err){
		console.log(`Error Occured while fetching all coding question:`);
		dispatch(codingSlice.actions.feedbackFailed(err?.response?.data?.message));
	}
}

export const getSingleQuestion=(data)=>async(dispatch)=>{
	dispatch(codingSlice.actions.getSingleQuestionRequest());
	try{
		const response=await axios.get(`http://localhost:3000/api/v1/code/get-codebyId/${data}`,{
			withCredentials:true
		});
		// console.log(response);
		dispatch(codingSlice.actions.getSingleQuestionSuccess(response?.data?.data));
		dispatch(codingSlice.actions.clearAllErrorRequest());

	}catch(err){
		console.log(`Error occured while geting single question data : ${err}`);
		dispatch(codingSlice.actions.getSingQuestionFailed(err?.response?.data?.message));
	}
}



export const deleteQuestion=(data)=>async(dispatch)=>{
	dispatch(codingSlice.actions.deleteRequest());
	try{
		const response=await axios.delete(`http://localhost:3000/api/v1/code/delete-review/${data}`,{
			withCredentials:true
		});
		console.log(response);
		dispatch(codingSlice.actions.deleteSuccess(response?.data?.message));
		dispatch(codingSlice.actions.clearAllErrorRequest());

	}catch(err){
		console.log(`Error occured while deleting code : ${err}`);
		dispatch(codingSlice.actions.deleteFailed(err?.response?.data?.message));
	}

}


export const clearAllCodingError=()=>(dispatch)=>{
	dispatch(codingSlice.actions.clearAllErrorRequest());
}




export default codingSlice.reducer;