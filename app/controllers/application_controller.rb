class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def favorite_text
    return @favorite_exists ? "UnFavorite" : "Favorite"
  end

  helper_method :favorite_text

end
