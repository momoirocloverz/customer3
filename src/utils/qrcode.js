import qrcode from 'qrcode'

export default {
    install: function(Vue) {
        Object.defineProperty(Vue.prototype, 'QRCode' , { value: qrcode });
    }
};
