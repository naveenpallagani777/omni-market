const authService = require("../services/auth");
const { catchAsync } = require("../services/utils");

exports.signup = catchAsync(async (req, res) => {
	const user = await authService.signupUser(req.body);
	res.status(201).json({
		status: true,
		message: "User registered successfully",
		data: user
	});
});

exports.login = catchAsync(async (req, res) => {
	const user = await authService.loginUser(req.body);
	res.json({
		status: true,
		message: "Login successful",
		data: user
	});
});

exports.changePassword = catchAsync(async (req, res) => {
	const result = await authService.changePassword(req.user.id, req.body);
	res.json({ success: true, message: result.message });
});


exports.profile = catchAsync(async (req, res) => {
	const user = await authService.profile(req.user.id);
	res.json({ success: true, data: user });
});
