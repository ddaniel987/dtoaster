import Toast from './components/Toast.vue'

const DToaster = {
    install: function (Vue, options) {
        let shownToasts = []

        if (!options) {
            options = {}
        }

        function showToast(props) {
            return new Promise(function(resolve, reject) {
                const ToastrComponent = Vue.extend(Toast)
                var propsData = options
                console.log("PROPS", props);

                
                if(options.presets != undefined && 
                    options.presets.length > 0) {
                        if(props.preset != undefined) {
                            var idx = options.presets.findIndex(e => e.name == props.preset)
                            if(idx != -1)
                                propsData = Object.assign(propsData, options.presets[idx])
                            else {
                                reject({error: true, what: "Unknown preset"})
                                return
                            }
                        }
                }

                propsData = Object.assign(propsData, props)
                console.log("PROPSDATA", propsData);

                var component = new ToastrComponent({
                    el: document.createElement('div'),
                    propsData,
                })
                

                component.$on("hidden", () => {
                    component.$destroy();
                })

                //shownToasts.push(component)

                resolve({error: false, what: "Success", reward: component})
            })
		}

        Vue.prototype.$dtoast = {
          pop(props) {
                return showToast(props)
          }
        }
    }
}

export default DToaster
