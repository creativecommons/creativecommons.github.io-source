import Vue from 'vue';
import {App} from './components'

$(document).ready(function () {
  window.app = new Vue(App)
})