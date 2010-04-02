require 'rubygems'
require 'sinatra'
require 'haml'

get '/' do
  require 'rss/1.0'
  require 'rss/2.0'
  tsrc = "http://twitter.com/statuses/user_timeline/14376262.rss"
  dsrc = "http://www.diigo.com/rss/user/davidmiller"
  tcontent = ""
  dcontent = ""
  open(tsrc) do |s| tcontent = s.read end
  open(dsrc) do |s| dcontent = s.read end
  twit = RSS::Parser.parse(tcontent, false)
  del = RSS::Parser.parse(dcontent, false)
  haml :index, :locals =>{ :twit => twit.items.first(12), :del => del.items.first(12) }
end

get '/about/' do
  haml :about
end
