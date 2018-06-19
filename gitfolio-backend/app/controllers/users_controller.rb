class UsersController < ApplicationController
  # protect_from_forgery except: [:create]

  def index
    @users = User.all
    # render html: index template
    render json: @users
  end

  def create
    @user = User.find_or_create_by(user_params)
    if @user.repositories.length == 0
      git_repos = @user.find_repos
      @user.assign_repos(git_repos)
    end
    render json: @user.repositories
  end

  private

  def user_params
    params.require(:user).permit(:username)
  end
end
