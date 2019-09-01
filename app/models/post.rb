class Post < ApplicationRecord
  acts_as_votable
  
  belongs_to :user
  has_many :comments, dependent: :destroy

  has_attached_file :image, styles: { medium: "600x500#", small: "350x250>" }, default_url: "/images/:style/missing.png"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\z/
end
