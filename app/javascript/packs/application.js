// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")

require('jquery')
require('popper.js')
require('bootstrap/dist/js/bootstrap.min')

const Swal = require('sweetalert2/dist/sweetalert2.min.js')
require('sweetalert2/dist/sweetalert2.min.css')
window.swal = Swal

require('./template/material.min')
require('./template/ripples.min')
require('./template/jquery.mCustomScrollbar.concat.min')
require('./template/main')
$.material.init()
