# MealMate
Your Personal Food and Nutrition Tracker

[MealMate.io](https://mealmate.io)

# Documentation

## Authentication
### [POST] /api/auth/login
	- `username` - The username of the user
	- `password` - The password of the user
### [POST] /api/auth/register
	- `username` - The username of the user
	- `password` - The password of the user
	- `confirmPassword` - The password of the user
### [POST] /api/auth/logout

## User
### [GET] /api/user
### [POST] /api/user/change-username
	- `username` - The new username of the user
### [POST] /api/user/change-password
	- `password` - The new password of the user
	- `confirmPassword` - The new password of the user