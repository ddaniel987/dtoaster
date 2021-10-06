<template>
 <transition
    :name="'dtoast-' + adaptedTransition"
    @after-enter="afterTransitionEnter"
    @after-leave="afterTransitionLeave"
    appear
  >
        <div v-if="visible" class="dtoast-dub"
            :style="$props._style != null ? $props._style : adaptedStyle">
            <div class="dt-struct">

                <div class="dt-icon">
                    <i 
                        :style="{ color: $props.color, 'font-size': $props.icon_size}"
                        :class="$props.icon"></i>
                
                </div>

                <div class="dt-body">
                    <span class="dt-body-heading">{{$props.heading}}</span>
                    <span class="dt-body-content">{{$props.content}}</span>
                </div>

                <div class="dt-action">
                    <svg 
                    @click="hide" :style="{fill: $props.color}"
                    width="15px" height="15px" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="close"><rect width="24" height="24" transform="rotate(180 12 12)" opacity="0"/><path d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z"/></g></g></svg>
                </div>
            </div>

            <div 
                v-if="show_progress_timeout"
                class="dt-progress"
                :style="{background: $props.progress_background}"
                >
                <div class="dt-thumb"
                    :style="
                    {   background: $props.progress_thumb_bg,
                        width: ($props.position.includes('left') ? (100 - (elapsed_ms / $props.duration * 100)) : (elapsed_ms / $props.duration * 100)) + '%'}">
                    </div>
            </div>
        </div>
    </transition>
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
            default: '75px',
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

        icon_size: {
            type: String,
            default: "23px",
        },

        transition: {
            type: String,
            default: "slide",
        },

        duration: {
            type: String,
            default: "1000"
        },

        background: {
            type: String,
            default: "black",
        },

        progress_background: {
            type: String,
            default: "tomato",
        },

        progress_thumb_bg: {
            type:String,
            default: "red",
        },

        color: {
            type: String,
            default: "white",
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

    beforeMount() {
        let container = document.querySelector(`.dtoast-ctn.dtoast-${this.position}`)
        if (!container) {
            container = document.createElement('div')
            
            container.classList.add('dtoast-ctn')
            container.classList.add(`dtoast-${this.position}`)

            container.style.overflow = 'hidden'

            if(this.$props.position.includes('top'))
                container.style.marginTop = this.$props.containerVerticalOffset
            else
                container.style.marginBottom = this.$props.containerVerticalOffset
            
            console.log(this.$props.position.includes('left'))
            if(this.$props.position.includes('left'))
                container.style.marginLeft = this.$props.containerSideOffset
            else
                container.style.marginRight = this.$props.containerSideOffset

            document.body.appendChild(container)
        }
        container.appendChild(this.$el)
    },

    beforeDestroy() {
        this.$el.remove();
    },


    mounted() {
        this.visible = true
    },

    computed: {
        adaptedStyle() {
            var sObj = {
                background: this.$props.background,
                color: this.$props.color,
                width: this.$props.width,
                'min-height': this.$props.height,
           }

           sObj[this.$props.position.includes('top') ? "margin-bottom" : "margin-top"] = this.$props.toastVerticalOffset
            
        return sObj
        },


        adaptedTransition() {
            var trans = this.$props.transition

            if(this.$props.position.includes("left"))
                trans += '-left'
            else
                trans += '-right'
            
            return trans
        }
    },


    methods : {
        afterTransitionEnter() {
            const elapsed = setInterval(() => {
                if(this.elapsed_ms >= this.$props.duration) { 
                    clearInterval(elapsed)
                    return
                }

                this.elapsed_ms += 4.1
            }, 1)

            setTimeout(() => {
               this.hide();
            }, this.$props.duration)
        },

        afterTransitionLeave() {
            this.$emit("hidden")
        },

        hide() {
            this.visible = false;
        }
    },

    data() {
        return {
           visible: false,
           elapsed_ms: 0,
        }
    }
}

</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500&display=swap');


.dtoast-ctn {
    overflow:hidden;
}

.dtoast-slide-right-leave-active,
.dtoast-slide-right-enter-active {
  transition: .4s ease
}

.dtoast-slide-right-enter {
  transform: translateX(110%);
}

.dtoast-slide-right-leave-active {
    animation: dtoast-slide-right-out .5s
}

@keyframes dtoast-slide-right-out {
  0% {
      transform: translateX(0%)
  }
  
  50% {
    transform: translateX(-10%)
  }

  100% {
    transform: translateX(110%)
  }
}

.dtoast-slide-left-leave-active,
.dtoast-slide-left-enter-active {
  transition: .4s ease
}

.dtoast-slide-left-enter {
  transform: translateX(-110%);
}

.dtoast-slide-left-leave-active {
    animation: dtoast-slide-left-out .5s
}

@keyframes dtoast-slide-left-out {
  0% {
      transform: translateX(0%)
  }
  
  50% {
    transform: translateX(10%)
  }

  100% {
    transform: translateX(-110%)
  }
}

.dtoast-dub {
    display:flex;
    flex-direction: column;
    font-family: 'Roboto', sans-serif;
    border-radius:3px;

    .dt-struct {
        display:flex;
        flex-direction: row;
        flex-grow:1;
        justify-content: space-between;
        align-items: center;
        height:100%;
        

        .dt-icon {
            height:100%;
            display:flex;
            align-items:center;
            justify-content: center;
            margin: 0 10px;
        }

        .dt-body {
            flex-grow: 0.5;
            display: flex;
            flex-direction: column;

            .dt-body-heading {
                font-size: 12px;
                font-weight: 600;
            }

            .dt-body-content {
                font-weight: 400;
                font-size: 12px;
                margin-top: 4px;
            }

        }

        .dt-action {
            align-self: flex-start;
            margin-top: 5px;
            font-size:14px;
            margin-right: 3px;
            cursor:pointer;
        }
    }

    .dt-progress {
        width:100%;
        height:3px;
        background:rgb(120, 134, 255);

        .dt-thumb {
            width:100%;
            height:100%;
            background: rgb(54, 74, 255);
        }
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
    align-items:flex-start;
}

.dtoast-ctn.dtoast-bottom-right {
    flex-direction: column-reverse;
    bottom:0;
    right:0;
    align-items:flex-end;
}

.dtoast-ctn.dtoast-bottom-left {
    flex-direction: column-reverse;
    align-items:flex-start;
    bottom: 0;
    left: 0;
}
</style>
