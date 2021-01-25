$(document).on('turbolinks:load', function () {
	$(document).ready(function(){
		$('.btn-sideBar-SubMenu').on('click', function(e){
			e.preventDefault();
			var SubMenu=$(this).next('ul');
			var iconBtn=$(this).children('.zmdi-caret-down');
			if(SubMenu.hasClass('show-sideBar-SubMenu')){
				iconBtn.removeClass('zmdi-hc-rotate-180');
				SubMenu.removeClass('show-sideBar-SubMenu');
			}else{
				iconBtn.addClass('zmdi-hc-rotate-180');
				SubMenu.addClass('show-sideBar-SubMenu');
			}
		});
		$('.btn-exit-system').on('click', function(e){
			e.preventDefault();
			swal.fire({
					title: 'Are you sure?',
					text: "The current session will be closed",
					icon: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#03A9F4',
					cancelButtonColor: '#F44336',
					confirmButtonText: '<i class="zmdi zmdi-run"></i> Yes, Exit!',
					cancelButtonText: '<i class="zmdi zmdi-close-circle"></i> No, Cancel!'
			}).then(function (result) {
				if (result.isConfirmed)
					window.location.href = "/";
			});
		});
		$('.btn-menu-dashboard').on('click', function(e){
			e.preventDefault();
			var body=$('.dashboard-contentPage');
			var sidebar=$('.dashboard-sideBar');
			if(sidebar.css('pointer-events')=='none'){
				body.removeClass('no-paddin-left');
				sidebar.removeClass('hide-sidebar').addClass('show-sidebar');
			}else{
				body.addClass('no-paddin-left');
				sidebar.addClass('hide-sidebar').removeClass('show-sidebar');
			}
		});

		$('.FormularioAjax').on('submit', e => {
			e.preventDefault();
	
			const form = document.querySelector('.FormularioAjax');
	
			const type = form.getAttribute('data-form');
			const action = form.getAttribute('action');
			const method = form.getAttribute('method');
			const resp = document.querySelector('#RespuestaAjax');
	
			const msjError = 'swal.fire("Ocurrió un error inesperado", "Por favor, recargue la página", "error")';
			const formdata = new FormData(form);
	
			let alertText = getAlertText(type)
	
			swal.fire({
				title: '¿Estás seguro?',
				text: alertText,
				icon: 'question',
				showCancelButton: true,
				confirmButtonText: 'Aceptar',
				cancelButtonText: 'Cancelar'
			}).then(result => {
				if (result.isConfirmed) {
					$.ajax({
						type: method,
						url: action,
						data: formdata ? formdata : form.serialize(),
						cache: false,
						contentType: false,
						processData: false,
						xhr: () => {
							const xhr = new window.XMLHttpRequest()
							xhr.upload.addEventListener('progress', evt => {
								if (evt.lengthComputable) {
									let percentComplete = evt.loaded / evt.total
									percentComplete = parseInt(percentComplete * 100)
									if (percentComplete < 100) {
										resp.innerHTML = '<p class="text-center">Procesando... ('+percentComplete+'%)</p><div class="progress progress-striped active"><div class="progress-bar progress-bar-info" style="width: '+percentComplete+'%;"></div></div>'
									} else {
										resp.innerHTML = '<p class="text-center"></p>'
									}
								}
							}, false)
							return xhr
						},
						success: data => resp.innerHTML = `<script>${data}</script>`,
						error: () => eval(msjError)
					})
				}
			})
		})
	});


	(function($){
			$(window).on("turbolinks:load",function(){
					$(".dashboard-sideBar-ct").mCustomScrollbar({
						theme:"light-thin",
						scrollbarPosition: "inside",
						autoHideScrollbar: true,
						scrollButtons: {enable: true}
					});
					$(".dashboard-contentPage, .Notifications-body").mCustomScrollbar({
						theme:"dark-thin",
						scrollbarPosition: "inside",
						autoHideScrollbar: true,
						scrollButtons: {enable: true}
					});
			});
	})(jQuery);
})

// Aux functions
function getAlertText(type) {
	switch (type) {
		case 'save':
			return 'Los datos que enviarás quedarán almacenados en el sistema'
		case 'delete':
			return 'Los datos serán eliminados completamente del sistema'
		case 'update':
			return 'Los datos del sistema serán actualizados'
		default:
			return '¿Quieres realizar la operación solicitada?'
	}
}