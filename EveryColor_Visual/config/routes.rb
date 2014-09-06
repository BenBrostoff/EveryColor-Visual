Rails.application.routes.draw do
  root 'colors#index'
  get '/generate', to: 'colors#generate'
end
