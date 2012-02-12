require 'rubygems'
require 'sinatra'
require 'haml'

get '/' do
  haml :index
end

get '/about/' do
  haml :about
end
