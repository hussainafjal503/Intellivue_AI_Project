import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios'
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const adminSlice=createSlice({
	name:"admin",
	initialState:{
		loading:false,
		whetherData:null,
		reduxError:null,
		allMessage:null,
		allData:null,
		allDeleteRequest:null
	},
	reducers:{
		whethearRequest(state,action){
			state.loading=true;
			state.reduxError=null;
		},
		whethearSuccess(state,action){
			state.loading=false;
			state.whetherData=action.payload
		},
		whethearFailes(state,action){
			state.loading=false;
			state.reduxError=action.payload;
		},


		getAllDataRequest(state,action){
			state.loading=false;
			state.reduxError=null;
			
		},

		getAllDataSuccess(state,action){
			state.loading=false;
			state.allData=action.payload;
		},
		getAllDataFailed(state,action){
			state.loading=false;
			state.reduxError=action.payload;
		},


		getMessageRequest(state,action){
			state.loading=true;
			state.reduxError=null;
		},

		getMessageSuccess(state,action){
			state.loading=false;
			state.allMessage=action.payload;

		},
		getMessageFailed(state,action){
			state.loading=false;
			state.reduxError=action.payload;
		},


		getDeleteRequest(state,action){
			state.loading=true;
			state.reduxError=null;
		
		},
		getDeleteSuccess(state,action){
			state.loading=false;
			state.allDeleteRequest=action.payload;
		},
		getDeleteFailed(state,action){
			state.loading=false;
			state.reduxError=action.payload;
		},


		sendMessageRequest(state,action){
			state.loading=true;
			state.reduxError=null;
		},
		sendMessageSuccess(state,action){
			state.loading=false;
			
		},
		sendMessageFailed(state,action){
			state.loading=false;
			state.reduxError=action.payload
		},
		

		deleteMessageRequest(state,action){
			state.loading=true;
			state.reduxError=null;
		},
		deleteMessageSuccess(state,action){
			state.loading=false;
			state.allMessage=action.payload;
		},
		deleteMessageFailed(state,action){
			state.loading=false;
			state.reduxError=action.payload;
		},



		approveRequest(state,action){
			state.loading=true;
			state.reduxError=null;
		},
		approveSuccess(state,action){
			state.loading=false;
			
		},
		approveFailed(state,action){
			state.loading=false;
			state.reduxError=action.payload;
		},



		clearAllAdminError(state,action){
			state.reduxError=null;
			state.loading=false;
		}
	}
});





export const fetchWhethear=(data)=>async(dispatch)=>{
	dispatch(adminSlice.actions.whethearRequest());
	try{
		const{latitude,longitude}=data
		const response=await axios.get(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${latitude},${longitude}`);
		// console.log(response);
		dispatch(adminSlice.actions.whethearSuccess(response?.data));
		dispatch(adminSlice.actions.clearAllAdminError());

	}catch(err){
		console.log(`Error occured while fetching the whether data : ${err}`);
		dispatch(adminSlice.actions.whethearFailes(err?.response?.data?.message));
	}
}


export const getAllAdminData=()=>async(dispatch)=>{
	dispatch(adminSlice.actions.getAllDataRequest());
	try{
		const response=await axios.get('http://localhost:3000/api/v1/admin/getData-admin',{
			withCredentials:true
		});
		// console.log(response);
		dispatch(adminSlice.actions.getAllDataSuccess(response?.data));
		dispatch(adminSlice.actions.clearAllAdminError());


	}catch(err){
		console.log(`Error Occured while getting all admin data : ${err}`);
		dispatch(adminSlice.actions.getAllDataFailed(err?.response?.data?.message));
	}
}


export const getAllMessageHandler=()=>async(dispatch)=>{
	dispatch(adminSlice.actions.getMessageRequest());
	try{
		const response=await axios.get('http://localhost:3000/api/v1/admin/getMessage-admin',{
			withCredentials:true
		});
		// console.log(response);
		dispatch(adminSlice.actions.getMessageSuccess(response?.data?.data));
		dispatch(adminSlice.actions.clearAllAdminError());

	}catch(err){
		console.log(`Error occured while getting all message : ${err}`);
		dispatch(adminSlice.actions.getMessageFailed(err?.response?.data?.message));
	}
}


export const getDeleteDataHandler=()=>async(dispatch)=>{
		dispatch(adminSlice.actions.getDeleteRequest());
	try{
		const response=await axios.get('http://localhost:3000/api/v1/admin/getDeleteRequest-admin',{
			withCredentials:true
		});
		// console.log(response);
		dispatch(adminSlice.actions.getDeleteSuccess(response?.data?.data));
		dispatch(adminSlice.actions.clearAllAdminError());

	}catch(err){
		console.log(`Error Occured in getDelete Data Handler : ${err}`);
		dispatch(adminSlice.actions.getDeleteFailed(err?.response?.data?.message));
	}
}


export const sendMessgeHandler=(data)=>async(dispatch)=>{
	dispatch(adminSlice.actions.sendMessageRequest());

	try{
		const response=await axios.post('http://localhost:3000/api/v1/admin/send-message',data,{
			withCredentials:true,
			headers:{
				"Content-Type":"application/json"
			}
		});
		if(response){

			dispatch(adminSlice.actions.sendMessageSuccess());
		}
		dispatch(adminSlice.actions.clearAllAdminError());
		
	}catch(err){
		console.log(`Error Occured while sending the message : ${err}`);
		dispatch(adminSlice.actions.sendMessageFailed(err?.response?.data?.message));

	}
}


export  const deleteMessageRedux=(id)=>async(dispatch)=>{
	dispatch(adminSlice.actions.deleteMessageRequest());
	try{
		const response=await axios.delete(`http://localhost:3000/api/v1/admin/delete-message/${id}`,{
			withCredentials:true
		});
		console.log(response);
		dispatch(adminSlice.actions.deleteMessageSuccess(response?.data?.data));
		dispatch(adminSlice.actions.clearAllAdminError());

	}catch(err){
		console.log(`Error occured while deleting user Message : ${err}`);
		dispatch(adminSlice.actions.deleteMessageFailed(err?.response?.data?.message));
	}
}




export const approveDeleteRequest=(id)=>async(dispatch)=>{

	dispatch(adminSlice.actions.approveRequest());
	
	try{
		const response=await axios.put(`http://localhost:3000/api/v1/admin/approve-request/${id}`,{},{
			withCredentials:true,
			headers:{
				"Content-Type":"application/json"
			}
		});

		console.log(response);

		dispatch(adminSlice.actions.approveSuccess());
		dispatch(adminSlice.actions.clearAllAdminError());

	}catch(err){
		console.log(`Error occured while approve delete request : ${err}`);
		dispatch(adminSlice.actions.approveFailed(err?.response?.data?.message));
	}

}




export const clearAllAdminError=()=>async(dispatch)=>{
	dispatch(adminSlice.actions.clearAllAdminError());
}






export default adminSlice.reducer;