// to do
// 1）	玉米三维模型文件的加载：需要至少支持obj、ply等格式的加载；
// 2）	玉米三维模型文件的实时可视化以及用户操作：旋转、平移、缩放等；
// 3）	设计交互测量方法，对三维玉米果穗模型中的玉米果穗直径、玉米籽粒面积、体积等进行测量；

(() => {
	var mtlURL = 'clipped1.mtl';
	var a = "three";

	var divT = document.getElementById(a);
	var divP = document.createElement('div');
	var divPid = divP.setAttribute('id', 'percent');

	var divTP = document.createElement('div');
	var divTPid = divTP.setAttribute('id', 'tupian');

	var img = document.createElement('img');
	var imgid = img.setAttribute('id', 'photo');
	var src = img.setAttribute('src', 'img/amplification.png');

	var divB = document.createElement('div');
	var divBclass = divB.setAttribute('class', 'btn');

	var p1 = document.createElement('p');
	var p1id = p1.setAttribute('id', 'add');
	var p1class = p1.setAttribute('class', 'btn1');
	var p1text = document.createTextNode('Add Coordinate');
	p1.appendChild(p1text);

	var p2 = document.createElement('p');
	var p2id = p2.setAttribute('id', 'del');
	var p2class = p2.setAttribute('class', 'btn1');
	var p2text = document.createTextNode('Del Coordinate');
	var p2Style = p2.setAttribute('style', 'display: none;')
	p2.appendChild(p2text);

	var p3 = document.createElement('p');
	var p3id = p3.setAttribute('id', 'stoprotating');
	var p3class = p3.setAttribute('class', 'btn1');
	var p3text = document.createTextNode('Stop Rotation');
	p3.appendChild(p3text);

	var p4 = document.createElement('p');
	var p4id = p4.setAttribute('id', 'rotating');
	var p4class = p4.setAttribute('class', 'btn1');
	var p4text = document.createTextNode('Start Rotation');
	var p4Style = p4.setAttribute('style', 'display: none;')
	p4.appendChild(p4text);

	var p5 = document.createElement('p');
	var p5id = p5.setAttribute('id', 'reverse');
	var p5class = p5.setAttribute('class', 'btn1');
	var p5text = document.createTextNode('Back');
	p5.appendChild(p5text);

	var p6 = document.createElement('p');
	var p6id = p6.setAttribute('id', 'positive');
	var p6class = p6.setAttribute('class', 'btn1');
	var p6text = document.createTextNode('Front');
	var p6Style = p6.setAttribute('style', 'display: none;')
	p6.appendChild(p6text);

	var p7 = document.createElement('p');
	var p7id = p7.setAttribute('id', 'left');
	var p7class = p7.setAttribute('class', 'btn1');
	var p7text = document.createTextNode('Left');
	p7.appendChild(p7text);

	var p8 = document.createElement('p');
	var p8id = p8.setAttribute('id', 'right');
	var p8class = p8.setAttribute('class', 'btn1');
	var p8text = document.createTextNode('Right');
	var p8Style = p8.setAttribute('style', 'display: none;')
	p8.appendChild(p8text);

	var p9 = document.createElement('p');
	var p9id = p9.setAttribute('id', 'up');
	var p9class = p9.setAttribute('class', 'btn1');
	var p9text = document.createTextNode('Top');
	p9.appendChild(p9text);

	var p10 = document.createElement('p');
	var p10id = p10.setAttribute('id', 'down');
	var p10class = p10.setAttribute('class', 'btn1');
	var p10text = document.createTextNode('Right');
	var p10Style = p10.setAttribute('style', 'display: none;')
	p10.appendChild(p10text);

	var p0 = document.createElement('p');
	var p0id = p0.setAttribute('id', 'back');
	var p0class = p0.setAttribute('class', 'btn1');
	var p0text = document.createTextNode('Reset');
	p0.appendChild(p0text);

	var slect = document.createElement('select');
	slect.setAttribute('id', 'AreaId');

	var op2 = document.createElement('option');
	op2.setAttribute('value', '2');
	var op2Text = document.createTextNode('Dark mode');
	op2.appendChild(op2Text);

	var op1 = document.createElement('option');
	op1.setAttribute('value', '1');
	var op1Text = document.createTextNode('Light mode');
	op1.appendChild(op1Text);

	divB.appendChild(p1);
	divB.appendChild(p2);
	divB.appendChild(p3);
	divB.appendChild(p4);
	divB.appendChild(p5);
	divB.appendChild(p6);
	divB.appendChild(p7);
	divB.appendChild(p8);
	divB.appendChild(p9);
	divB.appendChild(p10);
	divB.appendChild(p0);

	divT.appendChild(slect);
	slect.appendChild(op2);
	slect.appendChild(op1);

	divT.appendChild(divB);
	divTP.appendChild(img);
	divT.appendChild(divTP);
	divT.appendChild(divP);

	var three = document.getElementById(a);
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera();
	var renderer = new THREE.WebGLRenderer({ antialias: true, precision: "mediump", premultipliedAlpha: true, maxLights: 2 });
	renderer.setSize(three.clientWidth, three.clientHeight);
	renderer.shadowMapEnabled = true;

	var axes = new THREE.AxisHelper(10);
	var controls = new THREE.OrbitControls(camera, renderer.domElement);
	var ambientLight = new THREE.AmbientLight(0xcccccc, 2);
	var pointLight = new THREE.PointLight(0xffffff, 0.3);
	var planeMaterial = new THREE.MeshNormalMaterial({ color: 0xffffff });

	var geo;
	var mesh = new THREE.Mesh(geo, planeMaterial);
	scene.add(ambientLight);
	camera.add(pointLight);
	scene.add(camera);
	scene.add(mesh);

	var x, y, z;
	var whole_distance;
	$("#AreaId").change(function () {
		var c = document.getElementById("AreaId").value;
		if (c == 1) {
			renderer.setClearColor(0xffffff);
		}
		else {
			renderer.setClearColor(0x000000);
		}
	})

	$("#back").click(function () {
		camera.position.x = x;
		camera.position.y = y;
		camera.position.z = z;
	})

	$("#reverse").click(function () {
		$('#reverse').hide();
		$('#positive').show();
		camera.position.x = x;
		camera.position.y = y;
		camera.position.z = z;
		camera.position.z = - camera.position.z;
		camera.position.x = 0;
	})

	$("#positive").click(function () {
		$('#positive').hide();
		$('#reverse').show();
		camera.position.x = x;
		camera.position.y = y;
		camera.position.z = z;
		camera.position.x = 0;
	})

	$("#left").click(function () {
		$('#left').hide();
		$('#right').show();
		camera.position.x = x;
		camera.position.y = y;
		camera.position.z = z;
		camera.position.x = -(x + whole_distance * 0.8);
		camera.position.z = 0;
		camera.position.y = 0;
	})

	$("#right").click(function () {
		$('#right').hide();
		$('#left').show();
		camera.position.x = x;
		camera.position.y = y;
		camera.position.z = z;
		camera.position.x = x + whole_distance * 0.8;
		camera.position.z = 0;
		camera.position.y = 0;
	})

	$("#up").click(function () {
		$('#up').hide();
		$('#down').show();
		camera.position.x = x;
		camera.position.y = y;
		camera.position.z = z;
		camera.position.y = y + whole_distance * 0.8;
		camera.position.x = 0;
		camera.position.z = 0;
	})

	$("#down").click(function () {
		$('#down').hide();
		$('#up').show();
		camera.position.x = x;
		camera.position.y = y;
		camera.position.z = z;
		camera.position.y = -(y + whole_distance * 0.8);
		camera.position.x = 0;
		camera.position.z = 0;
	})

	var num = 1;
	$("#photo").click(function () {
		if (num == 1) {
			this.src = "img/narrow.png";
			var docElm = document.getElementById(a);
			if (docElm.requestFullscreen) {
				docElm.requestFullscreen();
			}
			else if (docElm.mozRequestFullScreen) {
				docElm.mozRequestFullScreen();
			}
			else if (docElm.webkitRequestFullScreen) {
				docElm.webkitRequestFullScreen();
			}
			else if (docElm.msRequestFullscreen) {
				docElm.msRequestFullscreen();
			}
			num = 0;
		}
		else {
			this.src = "img/amplification.png";
			if (document.exitFullscreen) {
				document.exitFullscreen();
			}
			else if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			}
			else if (document.webkitCancelFullScreen) {
				document.webkitCancelFullScreen();
			}
			else if (document.msExitFullscreen) {
				document.msExitFullscreen();
			}
			num = 1;
		}
	})

	$("#add").click(function () {
		$('#add').hide();
		$('#del').show();
		scene.add(axes);
	})

	$("#del").click(function () {
		$('#add').show();
		$('#del').hide();
		scene.remove(axes);
	})

	$("#stoprotating").click(function () {
		$('#stoprotating').hide();
		$('#rotating').show();
		renderScene1();
	})

	$("#rotating").click(function () {
		$('#rotating').hide();
		$('#stoprotating').show();
		renderScene();
	})

	var onProgress = function (h) {
		if (h.lengthComputable) {
			var percentComplete = h.loaded / h.total * 100;
			var percent = document.getElementById("percent");
			percent.innerText = 'Loading' + Math.round(percentComplete, 2) + '%';
		}
	};

	var onError = function (h) { };
	function cameraArea(boxSize, boxCenter) {
		var sizeToFitOnScreen = boxSize * 1.2;
		var halfSizeToFitOnScreen = sizeToFitOnScreen * 0.5;
		var halfFovY = THREE.Math.degToRad(camera.fov * 0.5);
		whole_distance = (halfSizeToFitOnScreen / Math.tan(halfFovY)) + 15;
		var directon = (new THREE.Vector3().subVectors((camera.position), boxCenter).normalize());
		camera.position.copy(directon.multiplyScalar(whole_distance).add(boxCenter));
		if (camera.position.x < 0) {
			camera.position.x = -camera.position.x;
		}
		if (camera.position.y < 0) {
			camera.position.y = -camera.position.y;
		}
		if (camera.position.z < 0) {
			camera.position.z = -camera.position.z;
		}
		camera.near = boxSize / 100;
		camera.far = boxSize * 100;
		camera.updateProjectionMatrix();
		camera.lookAt(boxCenter.x, boxCenter.y, boxCenter.z);

		x = camera.position.x;
		y = camera.position.y;
		z = camera.position.z;
	}
	three.append(renderer.domElement)

	renderScene();

	var objURL = mtlURL.replace(/mtl/, "obj");
	var mtlLoader = new THREE.MTLLoader();
	mtlLoader.load(mtlURL, function (materials) {
		var objLoader = new THREE.OBJLoader();
		objLoader.setMaterials(materials);
		objLoader.load(objURL, function (object) {
			object.castShadow = true;
			var box = new THREE.BoxHelper(object);
			box.geometry.computeBoundingBox();
			var a = (box.geometry.boundingBox.max.x - box.geometry.boundingBox.min.x);
			var b = (box.geometry.boundingBox.max.y - box.geometry.boundingBox.min.y);
			var c = (box.geometry.boundingBox.max.z - box.geometry.boundingBox.min.z);
			percent.innerHTML = '长:' + (a * 20).toFixed(2) + 'mm' + "<br/>" + '宽:' + (b * 20).toFixed(2) + 'mm' + "<br/>" + '高:' + (c * 20).toFixed(2) + 'mm';
			var box1 = new THREE.Box3().setFromObject(object);
			var boxSize = box1.getSize(new THREE.Vector3()).length() * 1.2;
			var boxCenter = box1.getCenter(new THREE.Vector3());
			cameraArea(boxSize, boxCenter);
			mesh.add(object);
		}, onProgress, onError);
	});

	function renderScene() {
		var clock = new THREE.Clock();
		var delta = clock.getDelta();
		controls.update(delta);
		mesh.rotation.y += 0.02;
		renderer.setSize(three.clientWidth, three.clientHeight);
		requestAnimationFrame(renderScene);
		renderer.render(scene, camera);
	};

	function renderScene1() {
		var clock = new THREE.Clock();
		var delta = clock.getDelta();
		controls.update(delta);
		mesh.rotation.y -= 0.02;
		renderer.setSize(three.clientWidth, three.clientHeight);
		requestAnimationFrame(renderScene1);
		renderer.render(scene, camera);
	};

})();
