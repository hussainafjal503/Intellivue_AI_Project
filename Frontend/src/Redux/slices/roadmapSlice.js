import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios'

const chart=sessionStorage.getItem("chart") ? JSON.parse(sessionStorage.getItem("chart")) :null

const roadmapSlice =createSlice({
	name:"roadmaps",
	initialState:{
		loading:false,
		chart:chart,
		message:null,
		error:null,
		roadmapResponse:null,
		Airesponse:null,
		allResponse:null,
		singleRoadMapDetails:null

	},
	reducers:{
		getRoadmapRequest:(state,action)=>{
			state.loading=true;
			state.message=null;
			state.error=null;
		},
		getRoadmapSuccess:(state,action)=>{
			state.loading=false;
			state.message=action.payload.message;
			state.chart=action.payload?.data?.chartValue[0]?.chart;
			state.roadmapResponse=action.payload?.data?.response

			sessionStorage.setItem("chart",JSON.stringify(action.payload?.data?.chartValue[0]?.chart));
		},
		getRoadmapFailed:(state,action)=>{
			state.loading=false;
			state.message=null;
			state.error=action.payload;
		},


		aiResponseRequest(state,action){
			state.loading=true;
			state.error=null;
			state.message=null;
		},
		aiResponseSuccess(state,action){
			state.loading=false;
			state.Airesponse=action.payload;
		},
		aiResponseFailed(state,action){
			state.loading=false;
			state.error=action.payload;
		},

		allResponseSuccess:(state,action)=>{
			state.error=null;
			state.message=null;
			state.allResponse=action.payload;
		},
		allResponseFailed:(state,action)=>{
				state.message=null
				state.error=action.payload;
		},


		singleDetailRequest:(state,action)=>{
			state.loading=true;
			state.message=null;
			state.error=null;
		},
		singleDetailSuccess:(state,action)=>{
			state.loading=false;
			state.message=null;
			state.error=null;
			state.singleRoadMapDetails=action.payload
		},
		singleDetailFailed:(state,action)=>{
			state.loading=false;
			state.error=action.payload;
		},


		deleteRequest(state,action){
				state.error=null;
				state.message=null;
		},
		deleteSuccess(state,action){
			state.message=action.payload.message;
			state.allResponse=action.payload?.data?.roadMaps

		},
		deleteFailed(state,action){
			state.message=null;
			state.error=action.payload
		},


		clearRoadmapAllErrorRequest(state,action){
			state.error=null;
			state.chart=state.chart;
			state.loading=false;
		}
	}
});



export const getRoadMapHandler=(goal)=>async(dispatch)=>{
	dispatch(roadmapSlice.actions.getRoadmapRequest());
	try{
		const response=await axios.post('http://localhost:3000/api/v1/roadmap/create-goal',{goal},{
			withCredentials:true,
			headers:{
				"Content-Type":"application/json"
			}
		});

		// console.log(response);
		dispatch(roadmapSlice.actions.getRoadmapSuccess(response?.data));
		dispatch(roadmapSlice.actions.clearRoadmapAllErrorRequest());

	}catch(err){
		console.log(`Error Occured in get roadmap request : ${err}`);
		dispatch(roadmapSlice.actions.getRoadmapFailed(err?.response?.data?.message));
	}
}


 export const getResponseByAi=()=>async(dispatch,getState)=>{
	dispatch(roadmapSlice.actions.aiResponseRequest());
	const data=getState().roadmap.roadmapResponse;
	// console.log(data)
	const {_id}=data;
	// console.log(_id)
	try{
		const response=await axios.get(`http://localhost:3000/api/v1/roadmap/get-roadmap/${_id}`,{
			withCredentials:true
		});
		// console.log(response);
		dispatch(roadmapSlice.actions.aiResponseSuccess(response?.data?.data));
		dispatch(roadmapSlice.actions.clearRoadmapAllErrorRequest());

	}catch(err){
		console.log(`Error occured in geting road map resources response: ${err}`);
		dispatch(roadmapSlice.actions.aiResponseFailed(err?.response?.data?.message));
	}
}


export const getAllResponses=()=>async(dispatch)=>{
	try{
		const response=await axios.get('http://localhost:3000/api/v1/roadmap/get-all-response',{
			withCredentials:true
		});
		// console.log(response);
		dispatch(roadmapSlice.actions.allResponseSuccess(response?.data?.data?.roadMaps));
		dispatch(roadmapSlice.actions.clearRoadmapAllErrorRequest());

	}catch(err){
		console.log(`Error Occured while getting all data`);
		dispatch(roadmapSlice.actions.allResponseFailed(err?.response?.data?.message));
	}
}


export const singleDetails=(id)=>async(dispatch)=>{
	// console.log(id)
	dispatch(roadmapSlice.actions.singleDetailRequest());
	try{
		const response=await axios.get(`http://localhost:3000/api/v1/roadmap/get-detailById/${id}`,{
			withCredentials:true
		});
		// console.log(response)

		dispatch(roadmapSlice.actions.singleDetailSuccess(response?.data?.data));
		dispatch(roadmapSlice.actions.clearRoadmapAllErrorRequest());
		
	}catch(err){
		console.log(`Error occured while getting single details with id : ${err}`);
		dispatch(roadmapSlice.actions.singleDetailFailed(err?.response?.data?.message));
	}
}



export const deleteRoadmap=(id)=>async(dispatch)=>{
	dispatch(roadmapSlice.actions.deleteRequest());
	try{
		const response=await axios.delete(`http://localhost:3000/api/v1/roadmap/delete-roadmap/${id}`,{
			withCredentials:true
		});
		// console.log(response);
		dispatch(roadmapSlice.actions.deleteSuccess(response?.data));
		dispatch(roadmapSlice.actions.clearRoadmapAllErrorRequest());

	}catch(err){
		console.log(`Error occured while deleting roadmap : ${err}`);
		dispatch(roadmapSlice.actions.deleteFailed(err?.response?.data?.message));
	}
}

export const clearAllRoadMapError=()=>async(dispatch)=>{
	dispatch(roadmapSlice.actions.clearRoadmapAllErrorRequest());
}


export default roadmapSlice.reducer;