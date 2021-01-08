class ErrorsController < ApplicationController
  layout 'errors'

	def show
		render code.to_s, status: code
	end

	private

	def code
		params[:code]
	end
end
