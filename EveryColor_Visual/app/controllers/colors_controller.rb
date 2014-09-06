class ColorsController < ApplicationController

  def generate
    holder = []
    $client.user_timeline("everycolorbot", :count => 200).each do |tweet|
      holder << [tweet.text.split(" ")[0], tweet.favorite_count + tweet.retweet_count] 
    end
    return holder
  end

  def index
    @test = generate.sort_by{|tweet| tweet[1]}.reverse
  end

end
