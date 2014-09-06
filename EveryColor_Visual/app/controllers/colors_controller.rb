class ColorsController < ApplicationController

  def gen_percent
    return rand(10000)/10000.to_f 
  end

  def generate
    holder, max_find = [], []
    $client.user_timeline("everycolorbot", :count => 200).each do |tweet|
      max_find << tweet.favorite_count + tweet.retweet_count 
      holder << [gen_percent, gen_percent, "#" + tweet.text.split(" ")[0][2..-1], 
                 tweet.favorite_count + tweet.retweet_count, tweet.created_at.to_s[0..9]] 
    end
    holder.map {|tweet| tweet[3] = (tweet[3].to_f / max_find.max.to_f) * 50}
    render json: {colors: holder, max: max_find.max}
  end

  def index
  end

end
