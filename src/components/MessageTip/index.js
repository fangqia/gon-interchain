import Popup from './MessageTip.vue'

function init(Vue) {
    const PopupBox = Vue.extend(Popup);
    let instance = new PopupBox().$mount();
    document.body.appendChild(instance.$el);
    
    function show(opt) {
        Vue.nextTick(() => {
            instance.show(opt);
            // show 和弹窗组件里的show对应，用于控制显隐
        })
    }
    Vue.prototype.$mtip = show;
}

export default init;
