// plugins/double-tap.js
import DoubleTapDirective from '../directives/double-tap.js';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('double-tap', DoubleTapDirective);
});