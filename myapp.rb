require 'rubygems'
require 'sinatra'
require 'haml'

require 'open-uri'
require 'openssl'
OpenSSL::SSL::VERIFY_PEER = OpenSSL::SSL::VERIFY_NONE

get '/' do
  haml :index
end

get '/about/' do
  haml :about
end

get '/gitproxy/*' do
  open("https://api.github.com/#{params[:splat]}").read()
end
