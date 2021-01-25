class Admin < ApplicationRecord
  belongs_to :user
  validates :dni, presence: true, uniqueness: { case_sensitive: false }
  validates :name, :lastname, :phone, :address, presence: true
end
