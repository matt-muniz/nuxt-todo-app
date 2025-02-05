// directives/v-double-tap.js
export default {
    mounted(el, binding) {
      let lastTap = 0;
      const delay = 300; // Maximum delay between taps in milliseconds
  
      el.addEventListener('touchend', (event) => {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;
  
        if (tapLength < delay && tapLength > 0) {
          binding.value(event);
        }
  
        lastTap = currentTime;
      });
    },
  };
  