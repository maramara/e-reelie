
// Tab control
$(function () {

    var activeIndex = $('.active-tab').index(),
        $contentlis = $('.tabs-content section'),
        $tabslis = $('.tabs li'),
        background = $(".vaporwave"),
        obj = document.createElement("audio");

    // Load tune
    obj.src = "../assets/sound/vap-tune.opus";

    // Show content of active tab on loads
    $contentlis.eq(activeIndex).show();

    $('.tabs').on('click', 'li', function (e) {
        var $current = $(e.currentTarget),
            index = $current.index();

        background.hide();
        obj.pause();
        $tabslis.removeClass('active-tab');
        $current.addClass('active-tab');
        $contentlis.hide().eq(index).show();
        if ($current.hasClass('lasers')) {
            background.show();
            obj.play();
        }
    });
});


// Eye tracking
$("#moveArea").mousemove(function(event) {
    var eye = $(".eye");
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


// Sphere rotation

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 30, window.innerWidth/window.innerHeight, 0.1, 1000 );
var mesh;

var renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize( 500, 250 );
document.getElementById("sphere").appendChild(renderer.domElement);

// add icosahedron
var geometry = new THREE.SphereGeometry(24, 32, 32 );
THREE.ImageUtils.crossOrigin = true;
var textureLoader = new THREE.TextureLoader();
textureLoader.crossOrigin = true;
textureLoader.load('../assets/img/ereeelie.jpg', function(texture) {
    texture.wrapS = texture.wrapT =   THREE.RepeatWrapping;
    texture.repeat.set( 1, 1 );
    var material = new THREE.MeshLambertMaterial( {map: texture} );
    mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    render();
});


camera.position.z = 100;

// so many lights
var light = new THREE.DirectionalLight( 0xffffff, 1 );
light.position.set( 0, 1, 0 );
scene.add( light );

var light = new THREE.DirectionalLight( 0xffffff, 0.5 );
light.position.set( 0, -1, 0 );
scene.add( light );

var light = new THREE.DirectionalLight( 0xffffff, 1 );
light.position.set( 1, 0, 0 );
scene.add( light );

var light = new THREE.DirectionalLight( 0xffffff, 0.5 );
light.position.set( 0, 0, 1 );
scene.add( light );

var light = new THREE.DirectionalLight( 0xffffff, 1 );
light.position.set( 0, 0, -1 );
scene.add( light );

var light = new THREE.DirectionalLight( 0xffffff, 0.5 );
light.position.set( -1, 0, 0 );
scene.add( light );


var render = function () {
    requestAnimationFrame( render );
    mesh.rotation.y += 0.01;
    renderer.render(scene, camera);
};

