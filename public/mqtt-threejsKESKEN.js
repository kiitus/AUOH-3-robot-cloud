let three_view = document.getElementById('three_view');

let renderer = new THREE.WebGLRenderer();
let scene = new THREE.Scene();

let width = window.innerWidth;
let height = window.innerHeight;
let view_angle = 45;
let near = 0.1;
let far = 1000;

let camera = new THREE.PerspectiveCamera(view_angle,width/height,near,far)
camera.position.x = 5;
camera.position.y = 5;
camera.position.z = 5;
camera.up = new THREE.Vector3(0,0,1);
camera.lookAt(scene.position);

renderer.setSize(width,height);
three_view.appendChild(renderer.domElement);

//Plane
{
    let geometry = new THREE.PlaneBufferGeometry(40,40);
    let material = new THREE.MeshPhongMaterial({
        color: 0xAAAAAA,
        specular:0x101010
    });
    let mesh = new THREE.Mesh(geometry,material);
    mesh.position.z =-1;
    scene.add(mesh);
}
//TEST CUBE¨
{
let geometry = new THREE.BoxGeometry(1,1,1);
let material = new THREE.MeshLambertMaterial({
    color: 0xff0000
});
let mesh = new THREE.Mesh(geometry,material)

scene.add(mesh);
}
let light = new THREE.DirectionalLight(0xAAAAAA,1.5);
light.position.x = 10;
light.position.y = 10;
light.position.z = 10;

light.lookAt(scene.position);      //new THREE.Vector3(0,0,0));
scene.add(light);

scene.add(new THREE.MemisphereLight(0x443333,0x111122));

scene.background = new THREE.COlor(0xffffff);

const stl_loader = new THREE.stl_loader();
const load_stl = (url)=>
{
    return new Promise(()=>{
        stl_loader.load(url,resolve)
    }
    );
}

let dark = new THREE.MeshLamberMaterial({
    color:0x111111
});

let joints = [];

const load_geometries = async()=>
{{
    let geometry = await load_stl('/FANUC_R2000iA165F-STL/BAGE.stl')
    joints.push(new THREE.Mesh(geometry,dark));
    mesh.geometry.scale(0.001,0.0001,0.001);
    scene.add(mesh);
}
}



const animate = ()=>{
    requestAnimationFrame(animate);
    renderer.render(scene,camera);
};

animate();


const resize = () =>
 {
    width = window.innerWidth;
    height = window.innerHeight;
    camera.aspect = width/height;
    camera.updateProjectionMatrix();
    renderer.setSize(width,height);

 };

 window.onresize = resize;


//camera setup


