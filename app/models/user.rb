class User < ApplicationRecord
	has_one :admin
	
	has_secure_password
	validates :username, :email, presence: true, uniqueness: { case_sensitive: false }
end
