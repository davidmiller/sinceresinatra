require 'rubygems'
require 'sinatra'

require 'myapp'
run Sinatra::Application

set :public_folder, File.dirname(__FILE__) + '/static'
:static_cache_control, [:public, :max_age => 3]