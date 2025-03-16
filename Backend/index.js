const express=require('express');
const { dbConnect } = require('./utils/dbConnection');
const errorHandler=require('./middlewares/Error-middlewares.js');
const userRouter=require('./routes/user.routes.js');
const resumeRouter=require('./routes/resume.routes.js');
const interviewRouter=require('./routes/interview.routes.js');
const roadmapRouter=require('./routes/roadmap.routes.js');
const codeRouter=require('./routes/codingReview.routes.js');
const adminRouter=require('./routes/adminPanel.routes.js');
const cors=require('cors')


const cookieParser=require('cookie-parser');

require('dotenv').config();
const app=express();

const PORT=process.env.PORT || 4000


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use(cors({
	origin:process.env.FRONT_END_URL,
	credentials:true,
	methods:['GET','PUT','POST','DELETE','PATCH']
}));




app.use('/api/v1/user',userRouter);
app.use('/api/v1/resume',resumeRouter);
app.use('/api/v1/interview',interviewRouter);
app.use('/api/v1/roadmap',roadmapRouter);
app.use('/api/v1/code',codeRouter);
app.use('/api/v1/admin',adminRouter);



// app.get("/",(req,res)=>{
// 	res.send("hello")
// })

dbConnect();

app.use(errorHandler);



app.listen(PORT,()=>{
	console.log(`server is running on port ${PORT}`);
})

