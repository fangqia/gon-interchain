import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    breakpoint: {
        thresholds: {
            sm: 640,
            //  lg: 1220,
            lg:901,
          },
        mobileBreakpoint: 901,
       // mobileBreakpoint: 900,

      },
});
