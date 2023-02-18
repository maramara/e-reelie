// Tab control
$(function () {

    // Tabs

    var active = $('.active-tab').index(),
        content = $('.tabs-content section'),
        tab = $('.tabs button'),
        background = $(".vaporwave"),
        tune = document.createElement("audio");

    tune.src = "sound/vap-tune.opus";
    content.eq(active).show();

    $('.tabs').on('click', 'button', function (e) {
        var current = $(e.currentTarget),
            index = current.index();

        background.hide();
        tune.pause();
        tab.removeClass('active-tab');
        current.addClass('active-tab');
        content.hide().eq(index).show();

        if (current.hasClass('lasers')) {
            background.show();
            tune.play();
        }
    });


    // Cube manipulation

    $("#faceSize").on("input change",function(){
        var size = 0;
        size = $(this).val();

        $('.cube-face').css({
            'width' : size + 'px',
            'height' : size + 'px'
        });
    });

    $("#cubeSize").on("input change",function(){
        var size = 0;
        size = $(this).val();

        $('.cube-face-front').css({
            'transform' : 'translateZ(' + size + 'px)'
        });
        $('.cube-face-left').css({
            'transform' : 'rotateY(90deg) translateZ(' + size + 'px)'
        });
        $('.cube-face-back').css({
            'transform' : 'translateZ(-' + size + 'px)'
        });
        $('.cube-face-right').css({
            'transform' : 'rotateY(90deg) translateZ(-' + size + 'px)'
        });
        $('.cube-face-top').css({
            'transform' : 'rotateX(90deg) translateZ(-' + size + 'px)'
        });
        $('.cube-face-bottom').css({
            'transform' : 'rotateX(90deg) translateZ(' + size + 'px)'
        });
    });

    $("#animation").on("input change",function(){
        var size = 0;
        size = $(this).val();

        var cssAnimation = document.createElement('style');
        cssAnimation.type = 'text/css';
        var rules = document.createTextNode('@keyframes rotationMainContainer {' +
            '0% { transform: rotateX(0deg) rotateY(' + size + 'deg) rotateZ(0deg); }' +
            '100% { transform: rotateX(' + size*2 + 'deg) rotateY(-360deg) rotateZ(' + size*3 + 'deg) }' +
            '}');

        cssAnimation.appendChild(rules);
        document.getElementsByTagName("head")[0].appendChild(cssAnimation);
    });

    $("#opacity").on("input change",function(){
        var size = 0;
        size = $(this).val();

        $('.cube-face').css({
            'opacity' : size/100
        });
    });


    // Lasers color filter

    setInterval(function() {
        var number = Math.floor(Math.random() * 180);
        $('.with-filter').css({
            'filter' : 'hue-rotate(' + number + 'deg)'
        });
    },500);

    // Eye tracking

    $("#moveArea").mousemove(function (event) {
        var eye = $(".googly-eye");
        var x = (eye.offset().left) + (eye.width() / 2);
        var y = (eye.offset().top) + (eye.height() / 2);
        var rad = Math.atan2(event.pageX - x, event.pageY - y);
        var rot = (rad * (180 / Math.PI) * -1) + 180;
        eye.css({
            '-webkit-transform': 'rotate(' + rot + 'deg)',
            '-moz-transform': 'rotate(' + rot + 'deg)',
            '-ms-transform': 'rotate(' + rot + 'deg)',
            'transform': 'rotate(' + rot + 'deg)'
        });
    });


    // Googly eyes press

    var area = $('#googlyEyes'),
        eye = $(".googly-eye");
        body = $('body');

    area.mousedown(function (event) {
        eye.addClass('eye-squint');
        body.css({
            'background' : '#BF2222'
        });
    });
    area.mouseup(function (event) {
        eye.removeClass('eye-squint');
        body.css({
            'background' : '#2A333A'
        });
    });

    // Unfocused window
    $(window).blur(function() {
        document.title = "E-reelie?";
    });
    $(window).focus(function() {
        document.title = "CSS exercises";
    });
});


// Sphere rotation

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000);
var mesh;

var renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(500, 250);
document.getElementById("sphere").appendChild(renderer.domElement);

var geometry = new THREE.SphereGeometry(24, 32, 32);
THREE.ImageUtils.crossOrigin = true;
var textureLoader = new THREE.TextureLoader();
textureLoader.crossOrigin = true;
textureLoader.load('img/ereelie.jpg', function (texture) {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 1);
    var material = new THREE.MeshLambertMaterial({map: texture});
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    render();
});


camera.position.z = 100;

var light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 1, 0);
scene.add(light);

var light = new THREE.DirectionalLight(0xffffff, 0.5);
light.position.set(0, -1, 0);
scene.add(light);

var light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 0, 0);
scene.add(light);

var light = new THREE.DirectionalLight(0xffffff, 0.5);
light.position.set(0, 0, 1);
scene.add(light);

var light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 0, -1);
scene.add(light);

var light = new THREE.DirectionalLight(0xffffff, 0.5);
light.position.set(-1, 0, 0);
scene.add(light);


var render = function () {
    requestAnimationFrame(render);
    mesh.rotation.y += 0.01;
    renderer.render(scene, camera);
};