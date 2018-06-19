class UserController < ApplicationController
  protect_from_forgery except: :create
  
  def index
    @users = User.all
    # render html: index template
    render json: @users
  end

  def create
    @user = User.new(user_params)
    @user.save
    render json: @user
  end

  private

  def User_params
    params.require(:user).permit(:username)
  end
end
