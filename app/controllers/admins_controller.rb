class AdminsController < ApplicationController
	before_action :set_admin, only: [:show, :edit, :update, :destroy]

	def index
		@admins = Admin.all
	end

	def new
		@admin = Admin.new
	end

	def create
		# Creamos la cuenta de usuario
		user = User.new(user_params)
		user.photo = user.gender == 'Masculino' ? 'Male3Avatar.png' : 'Female3Avatar.png'
		user.state = 'Active'
		user.type = 'Admin'
		if user.save
			# Creamos el admin
			@admin = Admin.new(admin_params)
			@admin.user_id = user.id
			# Enviamos respuesta
			respond_to do |format|
				if @admin.save
					format.js { render js: helpers.sweet_alert({alert: 'clear', title: 'Administrador registrado', text: 'El admininstrador se registró con éxito', icon: 'success'}), status: 201 }
				else
					user.destroy
					format.js { render js: helpers.sweet_alert({alert: 'simple', title: 'Ocurrió un error inesperado', text: 'No se han podido guardar los datos del admin.', icon: 'error'}) }
				end
			end
		else
			respond_to do |format|
				format.js { render js: helpers.sweet_alert({alert: 'simple', title: 'Ocurrió un error inesperado', text: 'No se han podido crear la cuenta, comprueba los datos.', icon: 'error'}) }
			end
		end
	end

	private
		def set_admin
			@admin = Admin.find(params[:id])
		end

		def admin_params
			params.require(:admin).permit(:dni, :name, :lastname, :phone, :address)
		end

		def user_params
			params.require(:user).permit(:username, :password, :password_confirmation, :email, :gender, :privilege)
		end
end
