Rails.application.routes.draw do
  
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  devise_for :users
  get 'favorites/update'

  root to: 'posts#index'
  get '/posts/favorites', to: 'posts#favorites', as: 'favorites'

  resources :posts do
    member do
      put "like" => "posts#vote"
    end
    # post 'comments', to: 'comments#create'
    resources :comments, only: [:create, :destroy]
  end
  
end
