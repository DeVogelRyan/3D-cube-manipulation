const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({
    color: 0xb96d5d
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);


camera.position.z = 10;
let xValue = 0.02;
let yValue = 0.02;

function ChangePos(e) {
    let key = e.which;
    switch (key) {
        case 38: //up arrow
            camera.position.y -= 1;
            break;
        case 40: //down arrow
            camera.position.y += 1;
            break;
        case 37: //left arrow
            camera.position.x += 1;
            break;
        case 39: //right arrow
            camera.position.x -= 1;
            break;
        case 65: //A
            xValue += 0.02;
            yValue += 0.02;
            break;
        case 90: //A
            if (xValue >= 0 && yValue >= 0) {
                xValue -= 0.02;
                yValue -= 0.02;
            }
            break;
        case 72:
            toggleMenu()
            break;
        default:
            break;
    }
}

function toggleMenu(){
    let div = document.getElementById("info");
    if (div.classList.contains("hide")) {
        div.classList.remove("hide");
    } else {
        div.classList.add("hide");
    }
}

function changeColor() {
    let color = document.getElementById('color');
    colorCode = color.value;
    finalColor = colorCode.replace("#", "0x");
    cube.material.color.set(Number(finalColor))
}

function addEventListener() {
    document.addEventListener('keydown', ChangePos);
    document.getElementById("color").addEventListener('input', changeColor)
    document.addEventListener("contextmenu", function (e) { //disable right click
        e.preventDefault();
    }, false);

}

function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += xValue;
    cube.rotation.y += yValue;
    renderer.render(scene, camera);
}

addEventListener();
animate();
