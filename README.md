## This project is currently abandoned with NO active development on it. New and much better version of this is comming in the future and will be linked here after its release.

## DToaster 
**- Basic and viable toasts with progressbar and high customizabillity**


## DEMO
![Alt Text](https://s9.gifyu.com/images/ezgif-3-ced81cf05fd7.gif)
![Alt Text](https://im3.ezgif.com/tmp/ezgif-3-7a6c986db88f.gif)

## Requisites
VueJS >= 2.x

## Install
```bash
$ npm i dtoaster
```

## Usage
You can import and use the module everywhere in your app using:

**app.js**:

```javascript
import 'dtoaster/dist/dtoaster.css'
import DToaster from 'dtoaster'
import ToasterPresets from './json/toast_presets.json' //Your predefined toasts presets (optionally)

Vue.use(DToaster, {
  presets: ToasterPresets,
  position: 'top-right', //toasts container position on the screen
  containerOffset: '45px', //toasts container offset from top/bottom of the screen
})
```

**anycomponent.vue**:

```javascript
this.$dtoast.pop({
  preset: "your_preset",
  heading: `Custom Heading`,
  content:  `Custom content`,
  {...}
})
```


## Predefined toasts (presets)
You can create a json file with array of objects which are predefined toasts with all your options you want.
Every preset must be associated with a name, which is used in loading the particular preset in a toast

**Example of a json file**:
```json
[
    {
        "name" : "success",
        "icon" : "mdi mdi-checkbox-multiple-marked-circle-outline",
        "icon_size" : "32px",
        "duration" : "2500",
        "background" : "rgba(32,105,156,.9)",
        "height" : "75px",
        "color" : "#FFFFFF",
        "show_progress_timeout" : "true",
        "progress_background" : "#5a9fdc",
        "progress_thumb_bg" : "rgba(32,105,156,.9)"
    },

    {
        "name" : "error",
        "icon" : "mdi mdi-close-circle-outline",
        "icon_size" : "32px",
        "duration" : "2500",
        "background" : "#ff1e1e",
        "height" : "75px",
        "color" : "#FFFFFF",
        "show_progress_timeout" : "true",
        "progress_background" : "rgb(255 175 175)",
        "progress_thumb_bg" : "#ff1e1e"
    }
]
```

**You can then use a specific preset by providing its name when 'popping' a toast**:
```javascript
  this.$dtoast.pop({
    preset: "success",
    {...}
  })
```
This will create a toast with the options from your desired preset, which eliminate the need of re-typing every option every time you pop the same toast

**You can override specific preset option for a toast, leaving others unchanged**

```javascript
  this.$dtoast.pop({
    preset: "success",
    color: "red",
    heading: "Toast with a different heading",
    content: "Toast with a different content",
    {...}
  })
```

## Toast Options
| Option | Type | Function | Default | Available |
| :---         |     :---:      |          :--- |          :--- |    :---:   |         
| toastVerticalOffset  | String | Vertical offset of each toast | 5px | null, -- |
| position  | String | Position of the toast container | top-right | top-right, top-left, bottom-right, bottom-left |
| width  | String | Toast's width | 300px | -- |
| height  | String | Toast's height | 75px | -- |
| name  | String | Used preset name | -- | null, -- |
| heading  | String | Toast's heading | -- | -- |
| content  | String | Toast's content | -- | -- |
| icon  | String | Toast's icon class | -- | -- |
| icon_size  | String | Toast's icon font-size | 23px | -- |
| transition  | String | Toast's transitioning | slide | slide, *more to come* |
| duration  | String | Toast's duration | 1000 | milliseconds |
| background  | String | Toast's background color | black | -- |
| color  | String | Toast's font color | white | -- |
| show_progress_timeout  | String | Show the progressbar | true | -- |
| progress_background  | String | Progressbar's background color | tomato | -- |
| progress_thumb_bg  | String | Progressbar's thumb color | red | -- |
| \_style  | String | Any style to override on the toast | -- | {prop: value, ...} |

## Container Options
| Option | Type | Function | Default | Available |
| :---         |     :---:      |          :--- |          :--- |    :---:   |         
| containerVerticalOffset  | String | Vertical offset of the container | 35px | null, -- |
| containerSideOffset  | String | Side offset of the container | 5px | null, -- |


## If you feel the need to thank me
BEP20 - 0x360d4a6d81eb5034d3917a155a0703851b1c5311
BTC - 16sQhFgcY5wrL8cmLp5DSpxRL7hmUwtgEK
DOGE - DKHa9DvqFBp9azDiAPwZdNqdhAgzyrkfG9
ETH - 0x360d4a6d81eb5034d3917a155a0703851b1c5311
