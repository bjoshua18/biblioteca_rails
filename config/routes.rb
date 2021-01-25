Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  controller :sessions do
    get '/' => :new, :as => :login
    post '/' => :create
    delete 'logout' => :destroy
  end

  get '/home', to: 'home#index'

  resources :admins, only: [:index, :new, :create]

  # Error paths
  get '/*path', to: 'errors#show', code: 404, as: :not_found
end
