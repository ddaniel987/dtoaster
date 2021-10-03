import Toast from './components/Toast.vue'

const DToaster = {
    install: function (Vue, options) {
        if (!options) {
            options = {}
        }
        let shownToasts = []

        function showToast(obj, type) {
            const ToastrComponent = Vue.extend(Toast)

            var propsData = Object.assign(options, obj, {
                type: type
            })

            let component = new ToastrComponent({
                el: document.createElement('div'),
                propsData
            })

            shownToasts.push(component)

            return component
		}

        Vue.prototype.$dtoast = {
          pop(obj) {
                //
          }
        }
    }
}

export default DToaster
