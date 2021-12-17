import * as skinview3d from "skinview3d"

function monitoringChangeSkin(canvas_skin, skin_viewer) {
    skin_viewer.loadSkin(canvas_skin.getAttribute("skin_url"));
    skin_viewer.loadCape(canvas_skin.getAttribute("cloak_url"));
}

let skin_canvas = document.getElementById("skin_container")

if (skin_canvas) {
    let skinViewer = new skinview3d.SkinViewer({
        canvas: skin_canvas,
        width: 300,
        height: 400,
        skin: skin_canvas.getAttribute("skin_url"),
        cape: skin_canvas.getAttribute("cloak_url"),
    });

    let control = skinview3d.createOrbitControls(skinViewer);
    control.enableRotate = true;
    control.enableZoom = false;
    control.enablePan = false;

    // Add an animation
    let walk = skinViewer.animations.add(skinview3d.WalkingAnimation);
    // Add another animation
    let rotate = skinViewer.animations.add(skinview3d.RotatingAnimation);
    // Remove an animation, stop walking dude
    walk.remove();
    // Remove the rotating animation, and make the player face forward
    rotate.resetAndRemove();
    // And run for now!
    let run = skinViewer.animations.add(skinview3d.RotatingAnimation);

    // Set the speed of an animation
    run.speed = 1;
}


let skin_canvas1 = document.getElementById("skin_container1")

if (skin_canvas1) {
    let skinViewer1 = new skinview3d.SkinViewer({
        canvas: skin_canvas1,
        width: 300,
        height: 400,
        skin: skin_canvas1.getAttribute("skin_url"),
        cape: skin_canvas1.getAttribute("cloak_url"),
    });
    setInterval(() => {
        skinViewer1.loadSkin(skin_canvas1.getAttribute("skin_url"))
        skinViewer1.loadCape(skin_canvas1.getAttribute("cloak_url"))}, 1000)
}

let skin_canvas2 = document.getElementById("skin_container2")

if (skin_canvas2) {
    let skinViewer2 = new skinview3d.SkinViewer({
        canvas: skin_canvas2,
        width: 300,
        height: 400,
        skin: skin_canvas2.getAttribute("skin_url"),
        cape: skin_canvas2.getAttribute("cloak_url"),
    });

    skinViewer2.playerObject.rotation.y = 3.12;
    setInterval(() => {
        skinViewer2.loadSkin(skin_canvas2.getAttribute("skin_url"))
        skinViewer2.loadCape(skin_canvas2.getAttribute("cloak_url"))}, 1000)
}

// // Change viewer size
// skinViewer.width = 600;
// skinViewer.height = 800;

// // Load another skin
// skinViewer.loadSkin("img/skin2.png");

// // Load a cape
// skinViewer.loadCape("img/cape.png");

// // Load an elytra (from a cape texture)
// skinViewer.loadCape("img/cape.png", { backEquipment: "elytra" });

// // Unload(hide) the cape / elytra
// skinViewer.loadCape(null);

// // Set the background color
// skinViewer.background = 0x5a76f3;

// // Set the background to a panoramic image!
// skinViewer.loadPanorama("img/panorama1.png");

// // Change camera FOV
// skinViewer.fov = 70;

// // Control objects with your mouse!