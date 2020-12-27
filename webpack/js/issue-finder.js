import Vue from 'vue';
import {App} from './components'

$(document).ready(function () {
  if (window.location.pathname == '/contributing-code/issue-finder/')
    window.app = new Vue(App)
})
