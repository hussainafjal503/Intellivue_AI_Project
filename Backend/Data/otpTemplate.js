
const otpTemplate=(validotp)=>`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f9;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            background-color: #fff;
            margin: 50px auto;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        .logo {
            margin-bottom: 20px;
        }
        .logo img {
            max-width: 150px;
        }
        h1 {
            color: #333;
        }
        p {
            color: #555;
            line-height: 1.6;
        }
        .otp {
            font-size: 32px;
            letter-spacing: 4px;
            color: #2c3e50;
            margin: 20px 0;
            font-weight: bold;
        }
        .verify-btn {
            display: inline-block;
            padding: 10px 20px;
            background-color: #3498db;
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        .verify-btn:hover {
            background-color: #2980b9;
        }
        .footer {
            margin-top: 30px;
            font-size: 12px;
            color: #999;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo"><h2 style="color: #3498db; font-weight: bold;">SkillVibe</h2></div>
        <h1>Verify Your Account</h1>
        <p>Use the OTP below to verify your email address. This code is valid for 5 minutes.</p>
        <div class="otp">${validotp}</div>
        <a href="#" class="verify-btn">Verify OTP</a>
        <div class="footer">
            <p>If you didn't request this, please ignore this email.</p>
        </div>
    </div>
</body>
</html>
`


module.exports=otpTemplate;