// We import the CSS which is extracted to its own file by esbuild.

// If you want to use Phoenix channels, run `mix help phx.gen.channel`
// to get started and then uncomment the line below.
// import "./user_socket.js"

// You can include dependencies in two ways.
//
// The simplest option is to put them in assets/vendor and
// import them using relative paths:
//
//     import "./vendor/some-package.js"
//
// Alternatively, you can `npm install some-package` and import
// them using a path starting with the package name:
//
//     import "some-package"
//

// Include phoenix_html to handle method=PUT/DELETE in forms and buttons.
import "phoenix_html"
// Establish Phoenix Socket and LiveView configuration.
import { Socket } from "phoenix"
import { LiveSocket } from "phoenix_live_view"
import topbar from "../vendor/topbar"
import "./prefix"

let csrfToken = document.querySelector("meta[name='csrf-token']").getAttribute("content")


let Hooks = {};
Hooks.mainSkinCanvasHook = {
    mounted() {
        skinViewer = new skinview3d.SkinViewer({
            canvas: this.el,
            width: 230,
            height: 400,
            skin: this.el.getAttribute("skin_url"),
            cape: this.el.getAttribute("cloak_url")
        })
        let control = skinview3d.createOrbitControls(skinViewer);
        control.enableRotate = true;


        skinViewer.playerObject.rotation.y = 7;
        skinViewer.animations.add(skinview3d.WalkingAnimation);
        skinViewer.animations.speed = 1;
    }
}

Hooks.viewSettingsFrontSkin = {
    mounted() {
        skinViewer = new skinview3d.SkinViewer({
            canvas: this.el,
            width: 230,
            height: 400,
            skin: this.el.getAttribute("skin_url"),
            cape: this.el.getAttribute("cloak_url")
        })
    }
}

Hooks.viewSettingsBackSkin = {
    mounted() {
        skinViewer = new skinview3d.SkinViewer({
            canvas: this.el,
            width: 230,
            height: 400,
            skin: this.el.getAttribute("skin_url"),
            cape: this.el.getAttribute("cloak_url")
        })
        skinViewer.playerObject.rotation.y = 3.14;
    }
}

Hooks.prefix = {
    mounted() {
        var nick_color = {
            "Черный": "&0",
            "Темно-синий": "&1",
            "Темно-зеленый": "&2",
            "Биризовый": "&3",
            "Темно-красный": "&4",
            "Темно-фиолетовый": "&5",
            "Золотой": "&6",
            "Серый": "&7",
            "Темно-серый": "&8",
            "Синий": "&9",
            "Зеленый": "&a",
            "Сине-зеленый": "&b",
            "Красный": "&c",
            "Фиолетовый": "&d",
            "Желтый": "&e",
            "Белый": "&f"
        }

        var color = {
            '1': 'blue',
            '2': 'green',
            '3': 'darkaqua',
            '4': 'red',
            '5': 'purple',
            '6': 'orange',
            '7': 'gray',
            '8': 'darkgray',
            '9': 'lightblue',
            '0': 'black',
            'a': 'lime',
            'b': 'aqua',
            'c': 'lightred',
            'd': 'pink',
            'e': 'yellow',
            'f': 'white'
        };

        var input = $('#input');
        var output = $('#output');
        var select = document.getElementById("user_nick_color");

        select.addEventListener('change', function () {
            render(input.val());
        });

        var append;

        input.keyup(function () {
            render($(this).val());
        });

        function render(string) {
            append = '';
            output.html(replacers(string));
        }
        function replacers_input(string) {
            replaced = string
                .replace(/&k/gi, '')
                .replace(/&l/gi, '')
                .replace(/&m/gi, '')
                .replace(/&n/gi, '')
                .replace(/&o/gi, '')
                .replace(/&r/gi, '')
                .replace(/\\n/gi, '');
            return replaced;
        }

        function replacers(string) {
            string = '&7[&6L&7] ' + "&7[" + string + "&7] " + nick_color[select.value] + document.getElementById("output").getAttribute("nickname") + "&7:" + " Hello world"

            replaced = string
                .replace(/&([a-f0-9])/gi, setColor)
                .replace(/&k/gi, '')
                .replace(/&l/gi, '')
                .replace(/&m/gi, '')
                .replace(/&n/gi, '')
                .replace(/&o/gi, '')
                .replace(/&r/gi, '')
                .replace(/\\n/gi, '');
            return replaced;
        }

        function setColor(match) {
            var value = color[match.substr(1, match.length)];
            addClose;
            return '<span class="' + value + '">';
        }


        function addClose() {
            append = '</span>' + append;
        }
        render(input.val());
    }
}


let liveSocket = new LiveSocket("/live", Socket, { hooks: Hooks, params: { _csrf_token: csrfToken, _host: window.location.hostname } })

// Show progress bar on live navigation and form submits
topbar.config({ barColors: { 0: "#29d" }, shadowColor: "rgba(0, 0, 0, .3)" })

window.addEventListener("phx:page-loading-start", info => {
    topbar.show()
})
window.addEventListener("phx:page-loading-stop", info => topbar.hide())

// connect if there are any LiveViews on the page
liveSocket.connect()

// expose liveSocket on window for web console debug logs and latency simulation:
// >> liveSocket.enableDebug()
// >> liveSocket.enableLatencySim(1000)  // enabled for duration of browser session
// >> liveSocket.disableLatencySim()
window.liveSocket = liveSocket
