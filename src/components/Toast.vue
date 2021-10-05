<template>
    <div class="dtoast-dub"
        :style="$props._style != null ? $props._style : adaptedStyle">
        <div class="dt-struct">

            <div class="dt-icon">
                <i 
                    :style="{ color: $props.color}"
                    :class="$props.icon"></i>
               
            </div>

            <div class="dt-body">
                <span class="dt-body-heading">{{$props.heading}}</span>
                <span class="dt-body-content">{{$props.content}}</span>
            </div>

            <div class="dt-action">
                x
            </div>
        </div>

        <div class="dt-progress">
        </div>
    </div>
</template>

<script>
export default {
    name: "Toast",

    props: {

        //positioning
        //offsets depends on position
        containerVerticalOffset: { //top/bottom offset of the container
            type: String,
            default: '35px',
        },

        containerSideOffset: { //left/right offset of the container
            type: String,
            default: '5px',
        },

        toastVerticalOffset: { //top/bottom offset of toasts
            type: String,
            default: '5px',
        },

        position: {
            type: String,
            default: 'top-right',
        },

        width: {
            type: String,
            default: '300px',
        },

        height: {
            type: String,
            default: '70px',
        },

        name: {
            type: String,
        },

        heading: {
            type: String,
        },

        content: {
            type: String,
        },

        icon: {
            type: String,
        },

        timeout: {
            type: String,
            default: "1000"
        },

        background: {
            type: String,
        },

        color: {
            type: String,
        },

        _style: {
            type: Object,
            default: null,
        },

        show_progress_timeout: {
            type: String,
            default: "true"
        },
    },

    mounted() {
        console.log(this.$props._style)
    },

    beforeMount() {
        let container = document.querySelector(`.dtoast-ctn.dtoast-${this.position}`)
        if (!container) {
            container = document.createElement('div')
            
            container.classList.add('dtoast-ctn')
            container.classList.add(`dtoast-${this.position}`)

            if(this.$props.position.includes('top'))
                container.style.marginTop = this.$props.containerOffset
            else
                container.style.marginBottom = this.$props.containerOffset

            document.body.appendChild(container)
        }
        container.appendChild(this.$el)
    },

    beforeDestroy() {
        this.$emit("hidden")
    },


    created() {
        console.log(this.$props)
    },

    computed: {
        adaptedStyle() {
            var sObj = {
                background: this.$props.background,
                color: this.$props.color,
                width: this.$props.width,
                'min-height': this.$props.height,
           }

           sObj[this.$props.position.includes('top') ? "margin-bottom" : "margin-top"] = this.$props.toastOffset
            
        return sObj
        }
    },


    methods : {
        hide() {
            this.$destroy();
        }
    },

    data() {
        return {
           
        }
    }
}

</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto');


.dtoast-dub {
    display:flex;
    flex-direction: column;
    font-family: 'Roboto', sans-serif;

    .dt-struct {
        display:flex;
        flex-direction: row;
        flex-grow:1;
        justify-content: space-between;
        align-items: center;
        height:100%;
        margin: 0 13px;
        

        .dt-icon {
            height:100%;
            display:flex;
            align-items:center;
            justify-content: center;
            margin-right:13px;
        }

        .dt-body {
            flex-grow: 0.5;
            display: flex;
            flex-direction: column;

            .dt-body-heading {
                font-size: 13px;
                font-weight: 600;
            }

            .dt-body-content {
                font-weight: 400;
                font-size: 13px;
                margin-top: 4px;
            }
        }
    }

    .dt-progress {
        width:100%;
        height:3px;
    }
}




.dtoast-ctn {
    position: absolute;
    width: 400px;

    display:flex;
    flex-direction: column;
}

.dtoast-ctn.dtoast-top-right {
    top:0;
    right:0;
    align-items:flex-end;
}


.dtoast-ctn.dtoast-top-left {
    top:0;
    left:0;
    align-items:flex-end;
}

.dtoast-ctn.dtoast-bottom-right {
    flex-direction: column-reverse;
    bottom:0;
    right:0;
    align-items:flex-start;
}

.dtoast-ctn.dtoast-bottom-left {
    flex-direction: column-reverse;
    align-items:flex-start;
    bottom: 0;
    left: 0;
}
</style>
