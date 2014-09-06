class ColorsController < ApplicationController

  def generate
    holder, max_find = [], []
    $client.user_timeline("everycolorbot", :count => 200).each do |tweet|
      max_find << tweet.favorite_count + tweet.retweet_count 
      holder << [rand(100), rand(100), tweet.text.split(" ")[0], tweet.favorite_count + tweet.retweet_count] 
    end
    print holder[0]
    holder.map {|tweet| tweet[3] = (tweet[3].to_f / max_find.max.to_f) * 6}
    print holder[0]
    render json: {colors: holder}
  end

  def index
  end

end
