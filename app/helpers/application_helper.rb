module ApplicationHelper
	def generate_random_code(letter, length, num)
		(0..(length-1)).each { |i| letter += rand(9).to_s }
		letter + num.to_s
	end

	def sweet_alert(data)
		case data[:alert]
		when 'simple'
			"swal.fire(
						'#{data[:title]}',
						'#{data[:text]}',
						'#{data[:icon]}'
					)"
		when 'reload'
			"swal.fire({
						title: '#{data[:title]}',
						text: '#{data[:text]}',
						icon: '#{data[:icon]}',
						confirmButtonText: 'Aceptar'
					}).then((result) => {
						if (result.isConfirmed) {
							location.reload()
						}
					})"
		when 'clear'
			"swal.fire({
						title: '#{data[:title]}',
						text: '#{data[:text]}',
						icon: '#{data[:icon]}',
						confirmButtonText: 'Aceptar'
					}).then((result) => {
						if (result.isConfirmed) {
							$('.AjaxForm')[0].reset()
						}
					})"
		end
	end
end
