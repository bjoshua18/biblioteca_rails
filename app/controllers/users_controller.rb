class UsersController < ApplicationController
	def create
		@user = User.new(user_params)

		if @user.save
			@user
		end
	end

	private
		def set_user
			@user = User.find(params[:id])
		end

		def user_params
			params.require(:user).permit(:username, :password, :password_confirmation, :email, :gender, :privilege)
		end
