import * as THREE from "three";
import { Mesh } from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

// Setup

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor("#87CEEB");
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lights

var light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, 0, 0);
// scene.add(light);

var light2 = new THREE.AmbientLight(0xffffff, 2);
scene.add(light2);

var light3 = new THREE.PointLight(0xffffff, 1, 100);
light3.position.set(0, 60, 0);
scene.add(light3);

var light4 = new THREE.PointLight(0xffffff, 1, 100);
light4.position.set(0, -60, 0);
scene.add(light4);

var light5 = new THREE.PointLight(0xffffff, 3, 20);
light5.position.set(-33, -5, 0);
scene.add(light5);

var light6 = new THREE.PointLight(0xffffff, 3, 20);
light6.position.set(-36, -5, 0);
scene.add(light6);

var light7 = new THREE.PointLight(0xffffff, 3, 20);
light7.position.set(-39, -5, 0);
scene.add(light7);

// Camera

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.lookAt(new THREE.Vector3(0, 0, 0));

camera.position.z = 12;
camera.position.y = -60;
camera.position.x = -50;

camera.rotation.x = -Math.PI / 2;

// Stadium and environment

let floor_geometry = new THREE.PlaneGeometry(100, 100, 100, 100);
let floor_material = new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0,
    color: 0x000000,
});

let floor = new THREE.Mesh(floor_geometry, floor_material);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

const stadium = new GLTFLoader();
stadium.load("./../src/stadium.glb", function (gltf) {
    floor.add(gltf.scene);
});

const start = new THREE.Mesh();

const start_loader = new GLTFLoader();
start_loader.load("./../src/starting_arch.glb", function (gltf) {
    start.add(gltf.scene);
});

const start_line = new THREE.Mesh();
start_line.geometry = new THREE.BoxGeometry(14, 0.1, 1);
start_line.material = new THREE.MeshBasicMaterial({ color: 0xffffff });
start_line.position.x = -35;
start_line.position.y = 0;
start_line.position.z = 14;

start_line.rotation.x = -Math.PI / 2;

scene.add(start_line);

start.scale.set(0.055, 0.1, 0.1);
start.position.x = -35;
start.position.y = 0;
start.position.z = 14;

start.rotation.x = -Math.PI / 2;
start.rotation.y = Math.PI;

scene.add(start);

// Cars

var start_time = Date.now();
var Health_val = 100;
var Fuel_val = 100;
var Mileage_val = 0;

const Car = new THREE.Mesh();

const loader = new GLTFLoader();
loader.load("./../src/mcqueen.glb", function (gltf) {
    Car.add(gltf.scene);
});

Car.scale.set(0.4, 0.42, 0.4);

Car.position.x = -37;
Car.position.y = -10;
Car.position.z = 14;

Car.rotation.x = -Math.PI / 2;
Car.rotation.y = 0;
Car.rotation.z = 0;

scene.add(Car);

var botCars = [
    {
        health: 100,
        fuel: 100,
    },
    {
        health: 100,
        fuel: 100,
    },
    {
        health: 100,
        fuel: 100,
    },
];

let car1_Car = new THREE.Mesh();

let car1_loader = new GLTFLoader();
car1_loader.load("./../src/mater.glb", function (gltf) {
    car1_Car.add(gltf.scene);
});

car1_Car.scale.set(0.35, 0.35, 0.35);
car1_Car.position.set(-32, -5, 14);
car1_Car.rotation.x = -Math.PI / 2;

scene.add(car1_Car);

let car2_Car = new THREE.Mesh();

let car2_loader = new GLTFLoader();
car2_loader.load("./../src/king.glb", function (gltf) {
    car2_Car.add(gltf.scene);
});

car2_Car.scale.set(0.008, 0.008, 0.01);
car2_Car.position.set(-37, -5, 14);
car2_Car.rotation.x = -Math.PI / 2;

scene.add(car2_Car);

let car3_Car = new THREE.Mesh();

let car3_loader = new GLTFLoader();
car3_loader.load("./../src/chick.glb", function (gltf) {
    car3_Car.add(gltf.scene);
});

car3_Car.scale.set(1.5, 1.5, 1.5);
car3_Car.position.set(-32, -10, 14);
car3_Car.rotation.x = -Math.PI / 2;

scene.add(car3_Car);

// key presses for controls

var carPosKey = [0, 0];
var camera_toggle = false;

document.onkeydown = function (e) {
    switch (e.keyCode) {
        case 38:
            carPosKey[1] = 1;
            break;
        case 40:
            carPosKey[1] = -0.2;
            break;
        case 37:
            carPosKey[0] = 1;
            break;
        case 39:
            carPosKey[0] = -1;
            break;
    }
};

document.onkeyup = function (e) {
    switch (e.keyCode) {
        case 38:
            carPosKey[1] = 0;
            break;
        case 40:
            carPosKey[1] = 0;
            break;
        case 37:
            carPosKey[0] = 0;
            break;
        case 39:
            carPosKey[0] = 0;
            break;
    }
};

document.addEventListener("keypress", function (e) {
    if (e.keyCode == 116) {
        camera_toggle = !camera_toggle;
    }
    if (e.keyCode == 114) {
        console.log(
            "car1: " +
                car1_Car.position.x +
                ", " +
                car1_Car.position.y +
                ", " +
                car1_Car.position.z
        );
        console.log(
            "car2: " +
                car2_Car.position.x +
                ", " +
                car2_Car.position.y +
                ", " +
                car2_Car.position.z
        );
        console.log(
            "car3: " +
                car3_Car.position.x +
                ", " +
                car3_Car.position.y +
                ", " +
                car3_Car.position.z
        );
    }
});

// Car movements

let friction = 0.97;

var car_velocity = [0, 0];
let dir1 = 0;
let dir2 = 1;
let car_collision_points = [
    [Car.position.x + 0, Car.position.y + 0.5, 14],
    [Car.position.x + 0, Car.position.y + 0, 14],
    [Car.position.x + 0, Car.position.y - 0.5, 14],
];

let car_dir_change = [0, 20, 40];
let car_dir = [0, 1, -1];

let bot_cars = [car1_Car, car2_Car, car3_Car];
let bot_cars_dir = [
    { dir1: 0, dir2: 1 },
    { dir1: 0, dir2: 1 },
    { dir1: 0, dir2: 1 },
];
let bot_cars_velocities = [
    [0, 0],
    [0, 0],
    [0, 0],
];
let bot_cars_collision_points = [
    [
        [bot_cars[0].position.x + 0, bot_cars[0].position.y + 0.5, 14],
        [bot_cars[0].position.x + 0, bot_cars[0].position.y + 0, 14],
        [bot_cars[0].position.x + 0, bot_cars[0].position.y - 0.5, 14],
    ],
    [
        [bot_cars[1].position.x + 0, bot_cars[1].position.y + 0.5, 14],
        [bot_cars[1].position.x + 0, bot_cars[1].position.y + 0, 14],
        [bot_cars[1].position.x + 0, bot_cars[1].position.y - 0.5, 14],
    ],
    [
        [bot_cars[2].position.x + 0, bot_cars[2].position.y + 0.5, 14],
        [bot_cars[2].position.x + 0, bot_cars[2].position.y + 0, 14],
        [bot_cars[2].position.x + 0, bot_cars[2].position.y - 0.5, 14],
    ],
];

function updateCar() {
    let cars = [Car, ...bot_cars];

    // collision points, directions and velocities of cars

    for (let i = 0; i < 3; i++) {
        if (car_dir_change[i] == 0) {
            car_dir_change[i] = Math.floor(Math.random() * 60) + 30;
            bot_cars[i].rotation.y -= 0.02 * car_dir[i];
            car_dir[i] = Math.floor(Math.random() * 2.99) - 1;
            bot_cars[i].rotation.y += 0.02 * car_dir[i];
            bot_cars_dir[i].dir1 = Math.sin(cars[i].rotation.y);
            bot_cars_dir[i].dir2 = Math.cos(cars[i].rotation.y);
        } else {
            car_dir_change[i]--;
        }

        bot_cars_collision_points[i] = [
            [
                bot_cars[i].position.x + 0.5 * Math.sin(bot_cars[i].rotation.y),
                bot_cars[i].position.y + 0.5 * Math.cos(bot_cars[i].rotation.y),
                14,
            ],
            [bot_cars[i].position.x, bot_cars[i].position.y + 0, 14],
            [
                bot_cars[i].position.x - 0.5 * Math.sin(bot_cars[i].rotation.y),
                bot_cars[i].position.y - 0.5 * Math.cos(bot_cars[i].rotation.y),
                14,
            ],
        ];

        let speed = Math.random() * 0.002 + 0.014;
        if (bot_cars[i].position.y > -60 && bot_cars[i].position.y < 60) {
            bot_cars_velocities[i][0] += speed * bot_cars_dir[i].dir1;
            bot_cars_velocities[i][1] += speed * bot_cars_dir[i].dir2;

            bot_cars_velocities[i][0] *= friction;
            bot_cars_velocities[i][1] *= friction;
            if (
                bot_cars[i].position.x < -29.3 &&
                bot_cars[i].position.x > -40
            ) {
                if (bot_cars_velocities[i][1] < 0) {
                    bot_cars_velocities[i][1] *= -1;
                }
                if (
                    bot_cars[i].position.x + bot_cars_velocities[i][0] <
                        -29.3 &&
                    bot_cars[i].position.x + bot_cars_velocities[i][0] > -40
                ) {
                    bot_cars[i].position.x += bot_cars_velocities[i][0];
                } else {
                    bot_cars_velocities[i][0] = 0;
                }
                bot_cars[i].position.y += bot_cars_velocities[i][1];
            } else if (
                bot_cars[i].position.x < 42 &&
                bot_cars[i].position.x > 31.4
            ) {
                if (bot_cars_velocities[i][1] > 0) {
                    bot_cars_velocities[i][1] *= -1;
                }
                if (
                    bot_cars[i].position.x + bot_cars_velocities[i][0] < 42 &&
                    bot_cars[i].position.x + bot_cars_velocities[i][0] > 31.4
                ) {
                    bot_cars[i].position.x += bot_cars_velocities[i][0];
                } else {
                    bot_cars_velocities[i][0] = 0;
                }
                bot_cars[i].position.y += bot_cars_velocities[i][1];
            } else if (bot_cars[i].position.x < 0) {
                bot_cars[i].position.x += 0.1;
                bot_cars_velocities[i][0] = 0;
                bot_cars_velocities[i][1] = 0;
            } else {
                bot_cars[i].position.x -= 0.1;
                bot_cars_velocities[i][0] = 0;
                bot_cars_velocities[i][1] = 0;
            }
        } else {
            if (bot_cars[i].position.y > 60) {
                let dis_vec = {
                    x: bot_cars[i].position.x - 1.05,
                    y: bot_cars[i].position.y - 63,
                    z: 14,
                };
                let len = Math.sqrt(
                    dis_vec.x * dis_vec.x + dis_vec.y * dis_vec.y
                );
                dis_vec = { x: dis_vec.x / len, y: dis_vec.y / len, z: 14 };
                let per_vec = { x: dis_vec.y, y: -dis_vec.x, z: 14 };
                per_vec = {
                    x: per_vec.x * speed * 29,
                    y: per_vec.y * speed * 29,
                    z: 14,
                };

                bot_cars[i].position.x += per_vec.x;
                bot_cars[i].position.y += per_vec.y;

                let angle = Math.atan2(per_vec.x, per_vec.y);
                bot_cars[i].rotation.y = angle;
            } else {
                let dis_vec = {
                    x: bot_cars[i].position.x - 1.05,
                    y: bot_cars[i].position.y + 55,
                    z: 14,
                };
                let len = Math.sqrt(
                    dis_vec.x * dis_vec.x + dis_vec.y * dis_vec.y
                );
                dis_vec = { x: dis_vec.x / len, y: dis_vec.y / len, z: 14 };
                let per_vec = { x: dis_vec.y, y: -dis_vec.x, z: 14 };
                per_vec = {
                    x: per_vec.x * speed * 29,
                    y: per_vec.y * speed * 29,
                    z: 14,
                };

                bot_cars[i].position.x += per_vec.x;
                bot_cars[i].position.y += per_vec.y;

                let angle = Math.atan2(per_vec.x, per_vec.y);
                bot_cars[i].rotation.y = angle;
            }
        }
    }

    if (carPosKey[0] != 0) {
        Car.rotation.y += carPosKey[0] * 0.02;
        dir1 = Math.sin(Car.rotation.y);
        dir2 = Math.cos(Car.rotation.y);
        car_collision_points = [
            [
                Car.position.x + 0.5 * Math.sin(Car.rotation.y),
                Car.position.y + 0.5 * Math.cos(Car.rotation.y),
                14,
            ],
            [Car.position.x, Car.position.y + 0, 14],
            [
                Car.position.x - 0.5 * Math.sin(Car.rotation.y),
                Car.position.y - 0.5 * Math.cos(Car.rotation.y),
                14,
            ],
        ];
    }

    car_velocity[0] += carPosKey[1] * 0.015 * dir1;
    car_velocity[1] += carPosKey[1] * 0.015 * dir2;

    car_velocity[0] *= friction;
    car_velocity[1] *= friction;

    if (Car.position.y > -60 && Car.position.y < 60) {
        if (Car.position.x < -29.3 && Car.position.x > -40.7) {
            if (
                Car.position.x + car_velocity[0] < -29.3 &&
                Car.position.x + car_velocity[0] > -40.7
            ) {
                Car.position.x += car_velocity[0];
            } else {
                car_velocity[0] = 0;
            }

            Car.position.y += car_velocity[1];
        } else if (Car.position.x < 42.6 && Car.position.x > 31.4) {
            if (
                Car.position.x + car_velocity[0] < 42.6 &&
                Car.position.x + car_velocity[0] > 31.4
            ) {
                Car.position.x += car_velocity[0];
            } else {
                car_velocity[0] = 0;
            }

            Car.position.y += car_velocity[1];
        } else {
            Car.position.x += car_velocity[0];
            Car.position.y += car_velocity[1];
        }
    } else {
        if (Car.position.y > 60) {
            var length = Math.sqrt(
                Math.pow(Math.abs(Car.position.x + car_velocity[0] - 1.05), 2) +
                    Math.pow(Math.abs(Car.position.y + car_velocity[1] - 63), 2)
            );

            if (length > 30.35 && length < 42.2) {
                Car.position.x += car_velocity[0];
                Car.position.y += car_velocity[1];
            } else {
                car_velocity[0] = 0;
                car_velocity[1] = 0;
            }
        } else {
            var length = Math.sqrt(
                Math.pow(Math.abs(Car.position.x + car_velocity[0] - 1.05), 2) +
                    Math.pow(Math.abs(Car.position.y + car_velocity[1] + 55), 2)
            );

            if (length > 30.35 && length < 42.2) {
                Car.position.x += car_velocity[0];
                Car.position.y += car_velocity[1];
            } else {
                car_velocity[0] = 0;
                car_velocity[1] = 0;
            }
        }
    }

    // for (let i = 0; i < 3; i++) {
    //     bot_cars[i].position.x += bot_cars_velocities[i][0];
    //     bot_cars[i].position.y += bot_cars_velocities[i][1];
    // }

    // Car.position.x += car_velocity[0];
    // Car.position.y += car_velocity[1];

    if (camera_toggle) {
        camera.position.z = 13;
        camera.rotation.y = Car.rotation.y + Math.PI;
        camera.position.x = Car.position.x;
        camera.position.y = Car.position.y;
        Car.scale.set(0.4, 0.4, 0.4);
    } else {
        camera.position.z = 12;
        camera.rotation.y = Car.rotation.y + Math.PI;
        camera.position.x = Car.position.x - 4 * Math.sin(Car.rotation.y);
        camera.position.y = Car.position.y - 4 * Math.cos(Car.rotation.y);
        Car.scale.set(0.4, 0.42, 0.4);
    }

    map_camera.position.z = 12;
    map_camera.position.x = Car.position.x;
    map_camera.position.y = Car.position.y;
    map_camera.lookAt(Car.position);

    map_camera.rotation.z = Car.rotation.y + Math.PI;
}

// Fuel cans

let fuel_cans = [];
let fuel_positions = [];

for (let i = 0; i < 10; i++) {
    let fuel_can = new THREE.Mesh();

    let fuel_loader = new GLTFLoader();
    fuel_loader.load("./../src/fuel_tank.glb", function (gltf) {
        fuel_can.add(gltf.scene);
    });

    fuel_can.scale.set(1.5, 1.5, 1.5);

    fuel_can.rotation.z = Math.PI;

    let y = Math.random() * 199 - 95;
    if (y < 60 && y > -60) {
        let x = Math.random() * 17 - 8;
        if (x < 0) {
            x -= 31;
        } else {
            x += 32;
        }
        fuel_can.position.set(x, y, 14);
    } else if (y < -60) {
        let min_x = 1.05 + Math.sqrt(Math.pow(31, 2) - Math.pow(y + 55, 2));
        let max_x = 1.05 + Math.sqrt(Math.pow(41, 2) - Math.pow(y + 55, 2));
        let x = Math.random() * (max_x - min_x) + min_x;
        if (Math.random() > 0.5) {
            x *= -1;
        }
        fuel_can.position.set(x, y, 14);
    } else {
        let min_x = 1.05 + Math.sqrt(Math.pow(31, 2) - Math.pow(y - 63, 2));
        let max_x = 1.05 + Math.sqrt(Math.pow(41, 2) - Math.pow(y - 63, 2));
        let x = Math.random() * (max_x - min_x) + min_x;
        if (Math.random() > 0.5) {
            x *= -1;
        }
        fuel_can.position.set(x, y, 14);
    }

    fuel_can.rotation.x = 1.57;
    fuel_cans.push(fuel_can);
    fuel_positions.push(fuel_can.position);
    scene.add(fuel_can);
}

let cars = [Car, ...bot_cars];

function fuelCollision() {
    cars.forEach((c) => {
        for (let i = 0; i < fuel_cans.length; i++) {
            if (fuel_cans[i].position.distanceTo(c.position) < 1) {
                Fuel_val += 10;
                if (Fuel_val > 100) {
                    Fuel_val = 100;
                }
                scene.remove(fuel_cans[i]);
                fuel_cans.splice(i, 1);
                fuel_positions.splice(i, 1);

                let fuel_can = new THREE.Mesh();

                let fuel_loader = new GLTFLoader();
                fuel_loader.load("./../src/fuel_tank.glb", function (gltf) {
                    fuel_can.add(gltf.scene);
                });

                fuel_can.scale.set(1.5, 1.5, 1.5);

                fuel_can.rotation.z = Math.PI;

                let y = Math.random() * 199 - 95;
                if (y < 60 && y > -60) {
                    let x = Math.random() * 17 - 8;
                    if (x < 0) {
                        x -= 31;
                    } else {
                        x += 32;
                    }
                    fuel_can.position.set(x, y, 14);
                } else if (y < -60) {
                    let min_x =
                        1.05 + Math.sqrt(Math.pow(31, 2) - Math.pow(y + 55, 2));
                    let max_x =
                        1.05 + Math.sqrt(Math.pow(41, 2) - Math.pow(y + 55, 2));
                    let x = Math.random() * (max_x - min_x) + min_x;
                    if (Math.random() > 0.5) {
                        x *= -1;
                    }
                    fuel_can.position.set(x, y, 14);
                } else {
                    let min_x =
                        1.05 + Math.sqrt(Math.pow(31, 2) - Math.pow(y - 63, 2));
                    let max_x =
                        1.05 + Math.sqrt(Math.pow(41, 2) - Math.pow(y - 63, 2));
                    let x = Math.random() * (max_x - min_x) + min_x;
                    if (Math.random() > 0.5) {
                        x *= -1;
                    }
                    fuel_can.position.set(x, y, 14);
                }

                fuel_can.rotation.x = 1.57;
                fuel_cans.push(fuel_can);
                fuel_positions.push(fuel_can.position);
                scene.add(fuel_can);

                break;
            }
        }
    });
}

// Data maintanance and heads up display

var Time = document.createElement("div");
Time.style.position = "absolute";
Time.style.width = 100;
Time.style.height = 100;
Time.style.color = "white";
Time.style.top = 20 + "px";
Time.style.left = 20 + "px";
Time.style.fontSize = 30 + "px";
Time.innerHTML = "Time : 0";
document.body.appendChild(Time);

var Health = document.createElement("div");
Health.style.position = "absolute";
Health.style.width = 100;
Health.style.height = 100;
Health.style.color = "white";
Health.style.top = 50 + "px";
Health.style.left = 20 + "px";
Health.style.fontSize = 30 + "px";
Health.innerHTML = "Health : 100";
document.body.appendChild(Health);

var Fuel = document.createElement("div");
Fuel.style.position = "absolute";
Fuel.style.width = 100;
Fuel.style.height = 100;
Fuel.style.color = "white";
Fuel.style.top = 80 + "px";
Fuel.style.left = 20 + "px";
Fuel.style.fontSize = 30 + "px";
Fuel.innerHTML = "Fuel : 100";
document.body.appendChild(Fuel);

var Mileage = document.createElement("div");
Mileage.style.position = "absolute";
Mileage.style.width = 100;
Mileage.style.height = 100;
Mileage.style.color = "white";
Mileage.style.top = 110 + "px";
Mileage.style.left = 20 + "px";
Mileage.style.fontSize = 30 + "px";
Mileage.innerHTML = "Mileage : 0";
document.body.appendChild(Mileage);

var map_renderer = new THREE.WebGLRenderer({ antialias: true });
map_renderer.setSize(window.innerWidth / 4, window.innerHeight / 4);
map_renderer.setClearColor(0x000000);
map_renderer.domElement.style.position = "absolute";
map_renderer.domElement.style.top = 20 + "px";
map_renderer.domElement.style.right = 20 + "px";
document.body.appendChild(map_renderer.domElement);

var map_camera = new THREE.OrthographicCamera(
    window.innerWidth / -40,
    window.innerWidth / 40,
    window.innerHeight / 40,
    window.innerHeight / -40,
    1,
    1000
);
map_camera.position.set(Car.position.x, Car.position.y, Car.position.z + 10);
map_camera.lookAt(Car.position);
map_camera.rotation.z = 1.57;

// coordinates of the front end, back end and center of the car

function animate() {
    requestAnimationFrame(animate);

    updateCar();

    fuelCollision();

    let time_diff = Date.now() - start_time;

    Time.innerHTML = "Time : " + Math.floor(time_diff / 1000);
    Health.innerHTML = "Health : " + Health_val;
    Fuel.innerHTML = "Fuel : " + Fuel_val;
    Mileage.innerHTML = "Mileage : " + Mileage_val;
    renderer.render(scene, camera);
    map_renderer.render(scene, map_camera);
}

function start_sequence() {
    return;
}

function end_sequence() {
    return;
}

function game() {
    start_sequence();

    animate();

    end_sequence();
}

game();
