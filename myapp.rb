require 'open-uri'
require 'openssl'
require 'socket'

require 'rubygems'
require 'sinatra'
require 'haml'

OpenSSL::SSL::VERIFY_PEER = OpenSSL::SSL::VERIFY_NONE

get '/' do
  scripts = :minscripts
  analyze = true
  if %w[bosch rasputin].member? Socket.gethostname
    scripts = :devscripts
    analyze = false
  end
  haml :index, :locals => {:scripts => scripts, :analyze => analyze}
end

get '/about/' do
  haml :about
end

get '/gitproxy/*' do
  open("https://api.github.com/#{params[:splat]}").read()
end
