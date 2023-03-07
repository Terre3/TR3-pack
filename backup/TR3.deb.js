'use strict';
/*Object API*/
var TR3 = new Object();
var THREE = new Object();
TR3.version = "rev:2.121.10";
TR3.imgOri = false;
TR3.imgDesty = false;
TR3.lock3d = false;
TR3.config = new Object();

if (typeof IIIkel !== 'undefined') {
	TR3.config = IIIkel.config.TR3;
} else {
	TR3.config = {
		unic: true,
		src: false,
		flag3d: true,
		rotate: false,
		lookAt: false,
		magni: 'auto',
		spritesDskMvl: 1,
		zoomMapDskMvl: 0
	};
}


TR3.setLoader = function (src, TR3three) {

	if (typeof (src) == 'undefined') { src = '' };

	TR3.config.src = src;

	//if (typeof (TR3three) != 'undefined') { TR3cfg = TR3three };

	THREE = TR3three.THREE || THREE;
	TR3.OrbitControls = TR3three.OrbitControls || OrbitControls || THREE.OrbitControls;
	TR3.TransformControls = TR3three.TransformControls || TransformControls || THREE.TransformControls;
	TR3.SkeletonUtilsClone = TR3three.SkeletonUtilsClone || SkeletonUtilsClone || THREE.SkeletonUtilsClone;
	TR3.GLTFExporter = TR3three.GLTFExporter || GLTFExporter || THREE.GLTFExporter;
	TR3.GLTFLoader = TR3three.GLTFLoader || GLTFLoader || THREE.GLTFLoader;
	TR3.IFCLoader = TR3three.IFCLoader || IFCLoader || THREE.IFCLoader;
	TR3.FontLoader = TR3three.FontLoader || FontLoader || THREE.FontLoader;
	TR3.TextGeometry = TR3three.TextGeometry || TextGeometry || THREE.TextGeometry;
	TR3.Sky = TR3three.Sky || Sky || THREE.Sky;

	//document.write(`<link rel=stylesheet type=text/css href=${TR3.config.src}TR3.css>`);

}



/*PANEL*/
TR3.setPanel = function () {

	var panel = '\
				<div id="3doptions" style="border: solid;margin: 5px; padding: 5px; display: none;float:left">\
					<label id="lblSroOpt" style="font-weight: bold;margin-bottom: 5px;border: solid 2px royalblue;text-align: center;color: royalblue;cursor: pointer">▲ Herramientas 3D ▲</label>\
					<div id="sroOpt" style="display:none">\
						<div id="magnificationSliderValue">Exagerar x</div>\
						<input type="button" class="magniStep" style="float:left" value="&nbsp;-&nbsp;"><div id="magnificationSlider" style="float:left;width:95px;margin:4px"></div><input type="button" class="magniStep" style="float:left" value="+">\
						<label style="width:150px;float:left"><input class="changeOpt" id="cursorCheck" type="checkbox"><span id="cursorCheck_spm">▲ 3D Cursor ▲</span></label><br>\
						<div id="cursorCheck_div" style="display:none;border: 1px dashed gray;padding: 1px;float: left;width: 100%">\
							<input id="newLine" style="float:left;" type="button" value=" Línea " class="">\
							<input id="newPolig" style="float:left;" type="button" value=" Polígono " class="">\
							<div><input id="metrics" type="checkbox" style="margin:3px 0 3px 3px">Medir</div>\
							<input id="calcMetrics" type="button" value="Calcular Métricas"><br>\
							<input id="PickDrawStereo" type="text" style="width: 75px;height: 29px"; value="#ff6161">\
							<input id="del_vGeom" type="button" value="Borrar Todo" class="">\
							<!--<span>Valor de Z: </span><input id="setZ" type="text" style="width: 50px;" value=""><span id="helpSetZ" style="color:royalblue;text-decoration:underline;cursor:pointer">Ayuda</span>-->\
						</div>\
						<label style="width:150px;float:left"><input class="changeOpt" id="anaglyphCheck" type="checkbox"><span id="anaglyphCheck_spm">▲ Stereo 3D ▲</span></label>\
						<div id="anaglyphType" style="display:none;border: 1px dashed gray;padding: 1px;float: left;width: 100%">\
							<span>&nbsp;-&nbsp;Modo: </span><select id="anaglyph-type" onchange="TR3.changeAnaglyphType()">\
								<option value="optimiced">Optimizado</option>\
								<option value="normal">Normal</option>\
								<option value="half">Intermedio</option>\
								<option value="gray">Gris</option>\
								<option value="interlaced">Entrelazado</option>\
							</select>\
							<a target="_blank" href="'+ TR3.config.src + 'docStereo.pdf">Gafas 3d</a>\
						</div>\
						<label style="width:150px;float:left"><input class="" id="geomCheck" type="checkbox"><span id="geomCheck_spm">▲ Gemoetrías ▲</span></label>\
						<div id="geomCheck_div" style="display:none;border: 1px dashed gray;padding: 1px;float: left;width: 100%">\
							<span>&nbsp;-&nbsp;Geometry: </span><select id="geometry-type" onchange="TR3.geometryBySelect()">\
								<option value="Width,Height,Depth">Box</option>\
								<option value="RadiusUnique,Segments,ThetaStart,ThetaLength">Circle</option>\
								<option value="RadiusUnique,Height,Segments,ThetaStart,ThetaLength,OpenEnded">Cone</option>\
								<option value="RadiusTop,RadiusBottom,Height,Segments,ThetaStart,ThetaLength,OpenEnded">Cylinder</option>\
								<option value="Width,Height">Plane</option>\
								<option value="RadiusUnique,Wsegments,Hsegments,ThetaStart,ThetaLength,PhiStart,PhiLength">Sphere</option>\
								<option value="RadiusUnique,Wsegments,Hsegments">SemiSphere</option>\
							</select>\
							<div id="geoOpts_div">\
								<div id="geomDepth_div" style="display: block;">\
									<label>Width: </label>\
									<input id="geomDepth_value" type="text" style="width: 65px;">\
								</div>\
								<div id="geomHeight_div" style="display: block;">\
									<label>Height: </label>\
									<input id="geomHeight_value" type="text" style="width: 65px;">\
								</div>\
								<div id="geomWidth_div" style="display: block;">\
									<label>Depth: </label>\
									<input id="geomWidth_value" type="text" style="width: 65px;">\
								</div>\
								<div id="geomRadiusUnique_div" style="display: none;">\
									<label>Radius: </label>\
									<input id="geomRadiusUnique_value" type="text" style="width: 65px;">\
								</div>\
								<div id="geomRadiusTop_div" style="display: none;">\
									<label>RadiusTop: </label>\
									<input id="geomRadiusTop_value" type="text" style="width: 65px;">\
								</div>\
								<div id="geomRadiusBottom_div" style="display: none;">\
									<label>RadiusBottom: </label>\
									<input id="geomRadiusBottom_value" type="text" style="width: 65px;">\
								</div>\
								<div id="geomSegments_div" style="display: none;">\
									<div id="geomSegments_value">Segments: 32</div>\
									<div id="geomSegments_slider" style="margin:4px"></div>\
								</div>\
								<div id="geomWsegments_div" style="display: none;">\
									<div id="geomWsegments_value">WidthSegments: 32</div>\
									<div id="geomWsegments_slider" style="margin:4px"></div>\
								</div>\
								<div id="geomHsegments_div" style="display: none;">\
									<div id="geomHsegments_value">HeightSegments: 32</div>\
									<div id="geomHsegments_slider" style="margin:4px"></div>\
								</div>\
								<div id="geomPhiStart_div" style="display: none;">\
									<div id="geomPhiStart_value">PhiStart: 0</div>\
									<div id="geomPhiStart_slider" style="margin:4px"></div>\
								</div>\
								<div id="geomPhiLength_div" style="display: none;">\
									<div id="geomPhiLength_value">PhiLength: 6.283</div>\
									<div id="geomPhiLength_slider" style="margin:4px"></div>\
								</div>\
								<div id="geomThetaStart_div" style="display: none;">\
									<div id="geomThetaStart_value">ThetaStart: 0</div>\
									<div id="geomThetaStart_slider" style="margin:4px"></div>\
								</div>\
								<div id="geomThetaLength_div" style="display: none;">\
									<div id="geomThetaLength_value">ThetaLength: 6.283</div>\
									<div id="geomThetaLength_slider" style="margin:4px"></div>\
								</div>\
								<div id="geomOpenEnded_div" style="display: none;">\
									<label>OpenEnded: </label>\
									<input id="geomOpenEnded_value" type="checkbox">\
								</div>\
							</div>\
							<input id="newGeom" type="button" value=" Insertar Geometría " style="margin:0px 0px 5px 10px" class=""></br>\
						</div>\
						<label style="width:150px;float:left"><input class="" id="physicsCheck" type="checkbox"><span id="physics_spm">▲ Físicas ▲</span></label>\
						<div id="physicsDiv" style="display:none;border: 1px dashed gray;padding: 1px;float: left;width: 100%;height:150px;overflow:auto;">\
							<hr><p style="margin:5px"><b>▼ Dispersión ▼</b></p><hr>\
							<span>Cobertura: </span><input id="coverZone" type="text" style="width: 65px;" value="5">\
							<span>Tamaño: </span><input id="sizePtlZone" type="text" style="width: 65px;" value="1">\
							<span>Masa: </span><input id="massPtlZone" type="text" style="width: 65px;" value="150">\
							<span>Dirección: </span><input id="dirPtlZone" type="text" style="width: 65px;" value="0,0,0">\
							<span>Impulso: </span><input id="impulsePtlZone" type="text" style="width: 65px;" value="15">\
							<input id="rainPhy" type="button" value=" Dispersar " style="margin:5px 15px" class="">\
							<hr><p style="margin:5px"><b>▼ Puntos de brote ▼</b></p><hr>\
							<span>Cantidad: </span><input id="manyPtlEmisor" type="text" style="width: 65px;" value="1">\
							<span>Impulso: </span><input id="impulsePtlEmisor" type="text" style="width: 65px;" value="30">\
							<span>Tamaño: </span><input id="sizePtlEmisor" type="text" style="width: 65px;" value="1">\
							<span>Masa: </span><input id="massPtlEmisor" type="text" style="width: 65px;" value="150">\
							<input id="setEmisor" type="button" value="Insertar" style="margin:5px 0px 0px 5px;padding: 0px;" class="">\
							<input id="goEmisor" type="button" value="Emitir" style="padding: 0px;" class="">\
							<input id="stopGoEmisor" type="button" value="Parar" style="padding: 0px;" class="">\
							<input id="removeEmisors" type="button" value="Borrar Todos" style="padding: 0px;" class="">\
							<hr><p style="margin:5px"><b>▼ Bola ▼</b></p><hr>\
							<span>Impulso: </span><input id="impulsePtlBall" type="text" style="width: 65px;" value="30">\
							<span>Tamaño: </span><input id="sizePtlBall" type="text" style="width: 65px;" value="1">\
							<span>Masa: </span><input id="massPtlBall" type="text" style="width: 65px;" value="150">\
							<input id="goPscBall" type="button" value=" Emitir " style="margin:5px 15px" class="">\
							<hr><p style="margin:5px"><b>▼ General ▼</b></p><hr>\
							<span>Gravedad: </span><input id="gravityZone" type="text" style="width: 65px;" value="9.8">\
							<input id="clearPscsObjs" type="button" value=" Limpiar Partículas " style="margin:5px 0px 0px 10px;" class="">\
							<input id="updateGround" type="button" value=" Actualizar Terreno " style="margin-left:10px" class="">\
							<input id="updatePscs" type="button" value=" Actualizar Físicas " style="margin-left:10px" class=""><hr>\
						</div>\
						<label style="width:150px;float:left"><input class="" id="textIntoCheck" type="checkbox"><span id="textInto_spm">▲ Texto ▲</span></label>\
						<div id="textIntoDiv" style="display:none;border: 1px dashed gray;padding: 1px;float: left;width: 100%;">\
							<input id="minicolorText" type="text" style="width: 75%;height: 29px"; value="#ff6161">\
							<input id="inputTextInto" type="text" style="width: 100%;" placeholder="Añadir texto">\
							<input id="buttonTextInto" type="button" value="Insertar" style="" class="">\
							<input id="selectText" type="button" value="Seleccionar" style="" class="">\
							<input id="updateText" type="button" value="Actualizar" style="" class="">\
						</div>\
						<label style="width:150px;float:left"><input class="" id="lightIntoCheck" type="checkbox"><span id="lightInto_spm">▲ Punto de Luz ▲</span></label>\
						<div id="lightIntoDiv" style="display:none;border: 1px dashed gray;padding: 1px;float: left;width: 100%;">\
							<input id="minicolorLight" type="text" style="width: 75%;height: 29px"; value="#ff6161">\
							<span>Intensidad: </span><input id="intensLight" type="text" style="width: 65px;" value="1">\
							<span>Distancia: </span><input id="distLight" type="text" style="width: 65px;" value="100">\
							<input id="buttonLightInto" type="button" value="Insertar" style="" class="">\
							<input id="selectLight" type="button" value="Seleccionar" style="" class="">\
							<input id="updateLight" type="button" value="Actualizar" style="" class="">\
						</div>\
						<div style="float:left">\
							<input id="file_3d" type="file" accept=".glb,.ifc" style="opacity: 0; position: absolute; width: 100px;">\
							<input id="file_3d_fake" style="color: gray; width: 100px;" value=" Explorar GLB/IFC... ">\
							<span id="help3dObj" style="color:coral;text-decoration:underline;cursor:pointer"> ¡Ayuda!</span><br>\
							<span>&nbsp;- Exportación ⇩ </span><select id="exporter-type" >\
								<option value="terrain">Terreno</option>\
								<option value="scene">Todo</option>\
								<option value="selected">Seleccionado</option>\
							</select>\
							<input id="exportation" type="button" value="Exportar" onclick="TR3.changeExportType()">\
							<label id="size3dObj"></label>\
						</div>\
					</div>\
					<div id="orbitalMoves" style="text-align: center; box-shadow: rgb(136, 136, 136) 1px 1px 5px; border: medium outset #eee; float: left;">\
						<img id="imgOrbitalMoves" src="'+ TR3.config.src + 'img/eartharrow.png" draggable="false" style="margin: 5px;cursor:pointer"><br>\
						<input id="makeScene" type="button" value=" Restablecer " style="margin-bottom:5px" class=""><br>\
						<input id="pWalking" type="button" value=" Caminar " style="" class="">\
						<input id="pFlying" type="button" value=" &nbsp;Volar&nbsp; " style="" class="">\
						<input id="orbitPoint" type="button" value=" Orbitar " style="" class="">\
						<div id="exploreDiv" style="display:none">\
							<div id="personFlySliderDiv" style="display:none">\
								<div id="heightSliderValue">Altitud: </div>\
								<div id="heightSlider" style="margin:5px"></div></div>\
							<input id="lessV" type="button" value="- Velocidad"><input id="moreV" type="button" value="+ Velocidad">\
							<label style="font-weight: bold; margin: 5px;color: brown;">Camina y Vuela con las flechas de teclado</label>\
						</div>\
						<div style="text-align: left; margin: 5px">\
							<input id="autoRotate" type="checkbox" class="changeOpt"> Rotación \
							<input id="malla" type="checkbox" class="changeOpt"> Malla<br>\
							<input id="tentative" type="checkbox" class="changeOpt" checked> Tentativo\
							<input id="terrain" type="checkbox" class="changeOpt"> Terreno\
						</div>\
					</div>';
	var pnl2 = '<div id="advices"></div>';
	var pnl3 = '</div><img id="imgErrTR3evt" src onerror="TR3.setEvtPanel()">';


	//https://threejs.org/examples/?q=export#misc_exporter_gltf
	//https://gltf-viewer.donmccurdy.com/
	return panel + pnl2 + pnl3;
};

TR3.setEvtPanel = function () {

	// Create a new jQuery UI Slider element
	// and set some default parameters.
	$("#magnificationSlider").slider({
		min: 1,
		max: 15,
		slide: function (event, ui) {

			// While sliding, update the value in the #amount div element
			var tPixMesh = TR3.formatMeasure(TR3.tPixMesh);
			$("#magnificationSliderValue").html('Exagerar <b>x' + ui.value + '</b> (malla: ' + tPixMesh[0] + tPixMesh[1] + ')');
			TR3.setMagniValues(ui.value);

		}
	});

	$("#geomSegments_slider").slider({
		min: 0,
		max: 64,
		value: 32,
		slide: function (event, ui) {
			// While sliding, update the value in the #amount div element
			$("#geomSegments_value").html("Segments: " + ui.value);
		}
	});

	$("#geomWsegments_slider").slider({
		min: 0,
		max: 64,
		value: 32,
		slide: function (event, ui) {
			// While sliding, update the value in the #amount div element
			$("#geomWsegments_value").html("WidthSegments: " + ui.value);
		}
	});

	$("#geomHsegments_slider").slider({
		min: 0,
		max: 64,
		value: 32,
		slide: function (event, ui) {
			// While sliding, update the value in the #amount div element
			$("#geomHsegments_value").html("HeightSegments: " + ui.value);
		}
	});

	$("#geomPhiStart_slider").slider({
		min: 0,
		max: 2 * Math.PI,
		step: 0.001,
		value: 0,
		slide: function (event, ui) {
			// While sliding, update the value in the #amount div element
			$("#geomPhiStart_value").html("PhiStart: " + ui.value);
		}
	});

	$("#geomPhiLength_slider").slider({
		min: 0,
		max: 2 * Math.PI,
		step: 0.001,
		value: 2 * Math.PI,
		slide: function (event, ui) {
			// While sliding, update the value in the #amount div element
			$("#geomPhiLength_value").html("PhiLength: " + ui.value);
		}
	});

	$("#geomThetaStart_slider").slider({
		min: 0,
		max: 2 * Math.PI,
		step: 0.001,
		value: 0,
		slide: function (event, ui) {
			// While sliding, update the value in the #amount div element
			$("#geomThetaStart_value").html("ThetaStart: " + ui.value);
		}
	});

	$("#geomThetaLength_slider").slider({
		min: 0,
		max: 2 * Math.PI,
		step: 0.001,
		value: 2 * Math.PI,
		slide: function (event, ui) {
			// While sliding, update the value in the #amount div element
			$("#geomThetaLength_value").html("ThetaLength: " + ui.value);
		}
	});


	$("#heightSlider").slider({
		min: 0,
		max: 1000,
		slide: function (event, ui) {

			// While sliding, update the value in the #amount div element
			$('#heightSlider').slider("option", "max", Math.round((TR3.zMax - TR3.zMed) * TR3.valuesSet.magnification));
			$('#heightSlider').slider("option", "min", Math.round((TR3.zMin - TR3.zMed) * TR3.valuesSet.magnification));
			TR3.changeHeight(ui.value, true, false);
			$("#heightSliderValue").html('Altitud: ' + Math.round((ui.value / TR3.valuesSet.magnification) + TR3.zMed) + ' m');
		}
	});

	document.getElementById('lightIntoCheck').addEventListener("click", function () {
		var innerHTML = document.getElementById('lightInto_spm').innerHTML
		if (this.checked) {
			document.getElementById('lightIntoDiv').style.display = 'block';
			document.getElementById('lightInto_spm').innerHTML = innerHTML.replaceAll('▲', '▼');
		} else {
			document.getElementById('lightIntoDiv').style.display = 'none';
			document.getElementById('lightInto_spm').innerHTML = innerHTML.replaceAll('▼', '▲');
		}
	});
	document.getElementById('textIntoCheck').addEventListener("click", function () {
		var innerHTML = document.getElementById('textInto_spm').innerHTML
		if (this.checked) {
			document.getElementById('textIntoDiv').style.display = 'block';
			document.getElementById('textInto_spm').innerHTML = innerHTML.replaceAll('▲', '▼');
		} else {
			document.getElementById('textIntoDiv').style.display = 'none';
			document.getElementById('textInto_spm').innerHTML = innerHTML.replaceAll('▼', '▲');
		}
	});
	document.getElementById('anaglyphCheck').addEventListener("click", function () {
		var innerHTML = document.getElementById('anaglyphCheck_spm').innerHTML
		if (this.checked) {
			document.getElementById('anaglyphType').style.display = 'block';
			document.getElementById('anaglyphCheck_spm').innerHTML = innerHTML.replaceAll('▲', '▼');
		} else {
			document.getElementById('anaglyphType').style.display = 'none';
			document.getElementById('anaglyphCheck_spm').innerHTML = innerHTML.replaceAll('▼', '▲');
		}
	});

	document.getElementById('physicsCheck').addEventListener("click", function () {
		var innerHTML = document.getElementById('physics_spm').innerHTML
		if (this.checked) {
			document.getElementById('physicsDiv').style.display = 'block';
			document.getElementById('physics_spm').innerHTML = innerHTML.replaceAll('▲', '▼');
			TR3.pscs.updateGround();
		} else {
			document.getElementById('physicsDiv').style.display = 'none';
			document.getElementById('physics_spm').innerHTML = innerHTML.replaceAll('▼', '▲');

			TR3.pscs.emiter = false;
		}
	});

	document.getElementById('cursorCheck').addEventListener("click", function () {
		var innerHTML = document.getElementById('cursorCheck_spm').innerHTML
		if (this.checked) {
			document.getElementById('cursorCheck_div').style.display = 'block';
			document.getElementById('cursorCheck_spm').innerHTML = innerHTML.replaceAll('▲', '▼');

			TR3.lock3d('cursor3d');
		} else {
			document.getElementById('cursorCheck_div').style.display = 'none';
			document.getElementById('cursorCheck_spm').innerHTML = innerHTML.replaceAll('▼', '▲');
			document.getElementById('metrics').checked = false;

			TR3.vGeom.measure = false;
			TR3.endDraw();

			TR3.unlock3d('cursor3d');
		}
	}, false);

	document.getElementById('geomCheck').addEventListener("click", function () {
		var innerHTML = document.getElementById('geomCheck_spm').innerHTML

		var tPixMesh = TR3.tPixMesh * 2;
		document.getElementById('geomWidth_value').value = tPixMesh;
		document.getElementById('geomHeight_value').value = tPixMesh;
		document.getElementById('geomDepth_value').value = tPixMesh;
		document.getElementById('geomRadiusUnique_value').value = tPixMesh;
		document.getElementById('geomRadiusTop_value').value = tPixMesh;
		document.getElementById('geomRadiusBottom_value').value = tPixMesh;

		if (this.checked) {
			document.getElementById('geomCheck_div').style.display = 'block';
			document.getElementById('geomCheck_spm').innerHTML = innerHTML.replaceAll('▲', '▼');

			TR3.lock3d('cursor3d');
		} else {
			document.getElementById('geomCheck_div').style.display = 'none';
			document.getElementById('geomCheck_spm').innerHTML = innerHTML.replaceAll('▼', '▲');
		}
	}, false);

	document.getElementById('lblSroOpt').addEventListener("click", function () {
		var disp = document.getElementById('sroOpt').style.display;
		var sroOpt = document.getElementById('lblSroOpt');
		var innerHTML = sroOpt.innerHTML;
		if (disp == 'none') {
			document.getElementById('sroOpt').style.display = 'block';
			sroOpt.innerHTML = innerHTML.replaceAll('▲', '▼');
		} else {
			document.getElementById('sroOpt').style.display = 'none';
			sroOpt.innerHTML = innerHTML.replaceAll('▼', '▲');
		}
	}, false);

	var optPick = {
		// animation speed
		animationSpeed: 50,
		// easing function
		animationEasing: 'swing',
		// defers the change event from firing while the user makes a selection
		change: null,
		changeDelay: 0,
		// hue, brightness, saturation, or wheel
		control: 'hue',
		// default color
		defaultValue: '',
		// hex or rgb
		format: 'rgb',
		// show/hide speed
		//show: null,
		showSpeed: 100,
		//hide: null,
		hideSpeed: 100,
		// is inline mode?
		inline: false,
		// a comma-separated list of keywords that the control should accept (e.g. inherit, transparent, initial). 
		keywords: '',
		// uppercase or lowercase
		letterCase: 'lowercase',
		// enables opacity slider
		opacity: false,
		// custom position
		position: 'bottom left',
		// additional theme class
		theme: 'default TR3PickColor',
		// an array of colors that will show up under the main color <a href="https://www.jqueryscript.net/tags.php?/grid/">grid</a>
		swatches: []
	}
	$('#PickDrawStereo').minicolors(optPick);
	$('#minicolorText').minicolors(optPick);
	$('#minicolorLight').minicolors(optPick);
	//$('.TR3PickColor').css('display','none');

	var changeOpt = document.getElementsByClassName("changeOpt");
	for (var i = 0; i < changeOpt.length; i++) {
		changeOpt[i].addEventListener('click', TR3.setOpts, false)
	}

	/*if (!TR3.config.unic) {
		document.getElementById('acc2scn').addEventListener("click", function () {
			IIIkel.container.ctxScenes.show();
		}, false);
	}*/
	document.getElementById('buttonLightInto').addEventListener("click", function () {
		TR3.vGeom.newLight = true;
		TR3.canvasDest.style.cursor = "crosshair";
	}, false);
	document.getElementById('buttonTextInto').addEventListener("click", function () {
		TR3.vGeom.newText = true;
		TR3.canvasDest.style.cursor = "crosshair";
	}, false);
	document.getElementById('newGeom').addEventListener("click", function () {
		TR3.setOpts({ cursor3d: false });
		TR3.newGeom = true;
		TR3.canvasDest.style.cursor = "crosshair";
	}, false);
	document.getElementById('stopGoEmisor').addEventListener("click", function () {
		TR3.pscs.emiter = false;
		TR3.canvasDest.style.cursor = "default";
	}, false);
	document.getElementById('terrain').addEventListener("click", function () {
		TR3.makeZmesh();
	}, false);
	document.getElementById('goPscBall').addEventListener("click", function () {
		var ev = [];
		ev.keyCode = '66';
		TR3.camera.visible = true;
		TR3.keyDown(ev);
	}, false);
	document.getElementById('rainPhy').addEventListener("click", function () {
		TR3.pscs.rainPhy();
	}, false);
	document.getElementById('setEmisor').addEventListener("click", function () {
		TR3.canvasDest.style.cursor = "crosshair";
		TR3.pscs.emiter = true;
	}, false);
	document.getElementById('goEmisor').addEventListener("click", function () {
		TR3.pscs.emiter = false;
		TR3.pscs.goEmisor();
	}, false);
	document.getElementById('removeEmisors').addEventListener("click", function () {
		TR3.pscs.emiter = false;
		TR3.pscs.removeEmisors();
	}, false);
	document.getElementById('updateGround').addEventListener("click", function () {
		TR3.pscs.updateGround();
	}, false);
	document.getElementById('updatePscs').addEventListener("click", function () {
		TR3.pscs.getPscsValues();
	}, false);
	document.getElementById('clearPscsObjs').addEventListener("click", function () {
		TR3.pscs.clearPscsObjs();
	}, false);

	document.getElementById('makeScene').addEventListener("click", function () {
		TR3.lightBtn(this.id);
		TR3.setValuesSliderMagn("auto");
		TR3.moving = false;
		TR3.initPosCamera(true);
		TR3.cursor.helper.scale.set(1, 1, 1);
		document.getElementById('exploreDiv').style.display = 'none';
		document.getElementById('personFlySliderDiv').style.display = 'none';
		TR3.setOpts({ autoRotate: false });
	}, false);
	document.getElementById('orbitPoint').addEventListener("click", function () {
		TR3.lightBtn(this.id);

		TR3.moving = false;
		TR3.orbitalViewFn();

		document.getElementById('exploreDiv').style.display = 'none';
		document.getElementById('personFlySliderDiv').style.display = 'none';
		TR3.setOpts({ autoRotate: false });
	}, false);
	document.getElementById('pWalking').addEventListener("click", function () {
		TR3.lightBtn(this.id);
		this.blur();

		TR3.moveKey.walkClicked = true;
		TR3.canvasDest.style.cursor = "crosshair";

		if (TR3.optionsSet.imgControl) {
			document.getElementById('imgOrbitalMoves').focus();
		} else { document.getElementById('canvasDest').focus(); }
		document.getElementById('exploreDiv').style.display = 'block';
		document.getElementById('personFlySliderDiv').style.display = 'none';
		TR3.setOpts({ autoRotate: false });
	}, false);
	document.getElementById('pFlying').addEventListener("click", function () {
		TR3.lightBtn(this.id);
		TR3.moving = true;

		var hi = (TR3.zMax - TR3.zMin) / 2 * TR3.valuesSet.magnification;
		TR3.personViewFn(hi);
		TR3.setValuesSliderHeight(hi);
		TR3.moveKey.walk = false;

		if (TR3.optionsSet.imgControl) {
			document.getElementById('imgOrbitalMoves').focus();
		} else { document.getElementById('canvasDest').focus(); }
		document.getElementById('exploreDiv').style.display = 'block';
		document.getElementById('personFlySliderDiv').style.display = 'block';
		TR3.setOpts({ autoRotate: false });
	}, false);

	document.getElementById('metrics').addEventListener("click", function () {
		if (document.getElementById('metrics').checked) {
			TR3.vGeom.measure = true;
		} else {
			TR3.vGeom.measure = false;
		}
	}, false);

	var imgOrbitalMoves = document.getElementById('imgOrbitalMoves');
	imgOrbitalMoves.addEventListener("mouseover", function () { imgOrbitalMoves.src = TR3.config.src + 'img/eartharrow_over.png'; }, false);
	imgOrbitalMoves.addEventListener("mouseout", function () { imgOrbitalMoves.src = TR3.config.src + 'img/eartharrow.png'; }, false);
	//imgOrbitalMoves.addEventListener("mousedown", function(){TR3.setOpts({autoRotate:false});}, false);
	//imgOrbitalMoves.addEventListener("touchstart", function(){TR3.setOpts({autoRotate:false});}, false);
	//imgOrbitalMoves.addEventListener("wheel", function(){TR3.setOpts({autoRotate:false});}, false);
	document.getElementById('moreV').addEventListener("click", function () {
		if (TR3.optionsSet.imgControl) {
			imgOrbitalMoves.focus();
		} else { TR3.canvasDest.focus(); } TR3.controls.keyPanSpeed = TR3.controls.keyPanSpeed * 3;
	}, false);
	document.getElementById('lessV').addEventListener("click", function () {
		if (TR3.optionsSet.imgControl) {
			imgOrbitalMoves.focus();
		} else { TR3.canvasDest.focus(); }; TR3.controls.keyPanSpeed = TR3.controls.keyPanSpeed / 3;
	}, false)
	document.getElementById('newLine').addEventListener("click", function () { TR3.vGeom.polig = false; TR3.newVgeom(); }, false);
	document.getElementById('newPolig').addEventListener("click", function () { TR3.vGeom.polig = true; TR3.newVgeom(); }, false);
	document.getElementById('calcMetrics').addEventListener("click", function () { TR3.updateVgeom(); }, false);
	document.getElementById('del_vGeom').addEventListener("click", function () { TR3.del_vGeom(false, 'item'); TR3.del_vGeom(false, 'sprites'); document.getElementById('metrics').checked = false; }, false);
	document.getElementById('selectText').addEventListener("click", function () {
		var upnum = TR3.vGeom.sprites.length;
		var rndInt = Math.floor(Math.random() * upnum) + 0;
		TR3.transCtrlsEnabled(TR3.vGeom.sprites[rndInt]);
	}, false);
	document.getElementById('updateText').addEventListener("click", function () {
		var obj3d = TR3.transformControls.object;
		if (obj3d) {
			var pos = obj3d.position;
			TR3.del3dObj(obj3d, TR3.vGeom.sprites);

			var newText = document.getElementById("inputTextInto").value;
			var fSprite = TR3.formatedText(newText || 'hey!', $("#minicolorText").val(), pos);
			fSprite.position.set(pos.x, pos.y, pos.z);
			TR3.scene.add(fSprite);
			TR3.transCtrlsEnabled(fSprite);
			TR3.onCreateItem(fSprite);
		}
	}, false);
	document.getElementById('selectLight').addEventListener("click", function () {
		var upnum = TR3.vGeom.lights.length;
		var rndInt = Math.floor(Math.random() * upnum) + 0;
		if(TR3.vGeom.lights.length>0)
			TR3.transCtrlsEnabled(TR3.vGeom.lights[rndInt][0]);
	}, false);
	document.getElementById('updateLight').addEventListener("click", function () {
		var obj3d = TR3.transformControls.object;
		if (obj3d) {
			var pos = obj3d.position;
			TR3.del3dObj(obj3d, TR3.vGeom.lights);

			var color = $("#minicolorLight").val() || '#ffffff';
			var intensLight = document.getElementById("intensLight").value || 1;
			var distLight = document.getElementById("distLight").value || 100;

			var light = TR3.setLight(color,intensLight,distLight);
			light[0].position.set(pos.x, pos.y, pos.z);
			TR3.scene.add(light[0]);
			TR3.scene.add(light[1]);

			TR3.transCtrlsEnabled(light[0]);
			TR3.onCreateItem(light[0]);
		}
	}, false);

	document.getElementById('file_3d').addEventListener("change", function (evt) { TR3.handleFileSelect(evt); }, false);

	$("#advices").dialog({ position: { my: "left center", at: "left center", of: window }, title: "Información", autoOpen: false, width: 400 });
	document.getElementById('help3dObj').addEventListener("click", function () {
		var text = '<div id="infohelp3dObj" style="padding:10px">\
						<div align="center"><u>Operaciones y Transformaciones:</u></div><br />\
						<input type="button" onclick="TR3.UpdateKeys3D(87)" value="W"> Trasladar | <input type="button" onclick="TR3.UpdateKeys3D(69)" value="E"> Rotar | <input type="button" onclick="TR3.UpdateKeys3D(82)" value="R"> Escalar <I>·objeto·</I><br />\
						<br />\
						<input type="button" onclick="TR3.UpdateKeys3D(107)" value="+"> Aumentar | <input type="button" onclick="TR3.UpdateKeys3D(109)" value="-"> Disminuir <I>·ejes·</I><br />\
						<input type="button" onclick="TR3.UpdateKeys3D(27)" value="Esc"> Desactiva herramienta<br />\
						<br />\
						<input type="button" onclick="TR3.UpdateKeys3D(46)" value="Supr"> Elimina <I>·objeto·</I><br />\
						<input type="button" onclick="TR3.UpdateKeys3D(32)" value="Space"> Deselecciona <I>·objeto·</I><br />\
						<input type="button" onclick="TR3.UpdateKeys3D(76)" value="L"> Información geométrica del <I>·objeto·</I><br />\
						<input type="button" onclick="TR3.UpdateKeys3D(71)" value="G"> Ver geometría de Malla <I>·objeto·</I><br />\
						<input type="button" onclick="TR3.UpdateKeys3D(70)" value="F"> Influir sobre el terreno con el <I>·objeto·</I><br />\
						<input type="button" onclick="TR3.UpdateKeys3D(88)" value="X"> El <I>·objeto·</I> es eferencia en métricas de volumen<br />\
						<input type="button" onclick="TR3.UpdateKeys3D(86)" value="V"> Visibilidad <I>·objeto·</I><br />\
						<input type="button" onclick="TR3.UpdateKeys3D(84)" value="T"> Transparencia <I>·objeto·</I><br />\
						<input type="button" onclick="TR3.UpdateKeys3D(79)" value="O"> Baja al suelo el <I>·objeto·</I><br />\
						<input type="button" onclick="TR3.UpdateKeys3D(65)" value="A"> Clona <I>·objeto·</I> <br />\
						<input type="button" onclick="TR3.UpdateKeys3D(67)" value="C"> Recorta <I>·objeto·</I> + Rueda ratón <br />\
						<input type="button" onclick="TR3.UpdateKeys3D(73)" value="I"> Impulsar <I>·objeto·</I><br />\
						<input type="button" onclick="TR3.UpdateKeys3D(77)" value="M"> Dotar de masa <I>·objeto·</I><br />\
						<input type="button" onclick="TR3.UpdateKeys3D(90)" value="z"> Animar <I>·objeto·</I><br />\
						<input type="button" onclick="TR3.UpdateKeys3D(83)" value="s"> Cambiar material <I>·objeto·</I><br />\
						<br />\
						<input type="button" onclick="TR3.UpdateKeys3D(85)" value="U"> Sube en primera persona <br />\
						<input type="button" onclick="TR3.UpdateKeys3D(68)" value="D"> Baja en primera persona <br />\
						<input type="button" onclick="TR3.UpdateKeys3D(80)" value="P"> Target de movimientos en cursor <br />\
					</div>';
		document.getElementById('advices').innerHTML = text;
		$("#advices").dialog('open');
	}, false);

	var magniStep = document.getElementsByClassName("magniStep");
	var minMagniSlid = $("#magnificationSlider").slider("option", "min");
	var maxMagniSlid = $("#magnificationSlider").slider("option", "max");
	for (var i = 0; i < magniStep.length; i++) {
		magniStep[i].addEventListener("click", function (e) {
			var val = e.target.value;
			var magn = TR3.valuesSet.magnification
			if (val.indexOf('+') != -1) {
				magn = magn + 1
				if (magn > maxMagniSlid) { magn = maxMagniSlid }
				TR3.setValuesSliderMagn(magn);
			} else {
				magn = magn - 1;
				if (magn < minMagniSlid) { magn = minMagniSlid }
				TR3.setValuesSliderMagn(magn);
			}
		});
	}
};

TR3.lightBtn = function (id) {

	var drawPnl_bd = document.getElementsByClassName('btnDrawOn');
	for (var i = 0; i < drawPnl_bd.length; i++) {
		drawPnl_bd[i].style.border = '';
		drawPnl_bd[i].className = '';
	}
	if (id == 'makeScene') { id = 'orbitPoint'; }
	document.getElementById(id).className = 'btnDrawOn';
	document.getElementById(id).style.border = 'solid 2px';
};

TR3.setStart = function (params) {
	TR3.params = params;
	TR3.dfd_setMap = $.Deferred();
	if (params === undefined) params = {};

	var oriImg = params.hasOwnProperty("oriImg") ?
		params["oriImg"] : false;

	var oriDTM = params.hasOwnProperty("oriDTM") ?
		params["oriDTM"] : false;

	TR3.map = params.hasOwnProperty("desty") ?
		params["desty"] : false;

	var bbox = params.hasOwnProperty("bbox") ?
		params["bbox"] : false;

	TR3.srsImg = params.hasOwnProperty("projCode") ?
		params["projCode"] : "EPSG:3857";

	TR3.LyrFeatFromOri = params.hasOwnProperty("LyrFeat") ?
		params["LyrFeat"] : false;

	TR3.cameraDist = params.hasOwnProperty("cameraDist") ?
		params["cameraDist"] : 1;

	if (typeof (oriImg) != 'object') {
		oriImg = document.getElementById(oriImg);
		if (!oriImg) {
			alert("invalid Origin");
		}
	}

	if (typeof (TR3.map) != 'object') {

		TR3.map = document.getElementById(TR3.map);
		if (!TR3.map) {
			alert("invalid Destiny");
		}
	}

	var options = TR3.getOptions();
	var values = TR3.getValues();
	TR3.setValues(values);

	//TR3.sprite = TR3.config.sprite || true;
	TR3.setMeshMap(oriImg, oriDTM, bbox, options, { magnification: values.magnification, lookAt: TR3.config.lookAt });
	TR3.config.lookAt = false;
	TR3.setValuesSliderMagn(values);
	TR3.config.magni = 'auto';
	TR3.vGeom.measure = false;
	TR3.startAnimation();
	document.getElementById('metrics').checked = false;
	document.getElementById('exploreDiv').style.display = 'none';
	document.getElementById('personFlySliderDiv').style.display = 'none';

	return TR3.dfd_setMap.promise();
};

TR3.getOptions = function () {
	var imgControlOpt, cursor3dOpt, anaglyphOpt, autoRotateOpt, wireframeMeshOpt, tentativeOpt, terrainOpt;

	if (document.getElementById('imgOrbitalMoves').style.display == 'none') {
		imgControlOpt = false;
	} else {
		imgControlOpt = true;
	}

	if (document.getElementById('cursorCheck')) {
		cursor3dOpt = document.getElementById('cursorCheck').checked;
	} else {
		cursor3dOpt = false;
	}

	if (document.getElementById('anaglyphCheck')) {
		anaglyphOpt = document.getElementById('anaglyphCheck').checked;
	} else {
		anaglyphOpt = false;
	}

	if (document.getElementById('autoRotate')) {
		autoRotateOpt = document.getElementById('autoRotate').checked;
	} else {
		autoRotateOpt = false;
	}
	if (TR3.config.rotate == 1) { TR3.config.rotate = 0; autoRotateOpt = true; }//url start scn

	if (document.getElementById('malla')) {
		wireframeMeshOpt = document.getElementById('malla').checked;
	} else {
		wireframeMeshOpt = false;
	}

	if (document.getElementById('tentative')) {
		tentativeOpt = document.getElementById('tentative').checked;
	} else {
		tentativeOpt = false;
	}

	if (document.getElementById('terrain')) {
		terrainOpt = document.getElementById('terrain').checked;
	} else {
		terrainOpt = false;
	}

	return { imgControl: imgControlOpt, cursor3d: cursor3dOpt, anaglyph: anaglyphOpt, autoRotate: autoRotateOpt, wireframeMesh: wireframeMeshOpt, tentative: tentativeOpt, terrain: terrainOpt }
};

TR3.setOpts = function (change) {

	var options = TR3.getOptions();
	if (change) {
		if (change.imgControl != undefined) { options.imgControl = change.imgControl; }
		if (change.cursor3d != undefined) { options.cursor3d = change.cursor3d; }
		if (change.anaglyph != undefined) { options.anaglyph = change.anaglyph; }
		if (change.autoRotate != undefined) { options.autoRotate = change.autoRotate; }
		if (change.wireframeMesh != undefined) { options.wireframeMesh = change.wireframeMesh; }
		if (change.tentative != undefined) { options.tentative = change.tentative; }
		if (change.terrain != undefined) { options.terrain = change.terrain; }
	}
	TR3.setOptions(options.imgControl, options.cursor3d, options.anaglyph, options.autoRotate, options.wireframeMesh, options.tentative, options.terrain);
};

TR3.setOptions = function (imgControlOpt, cursorOpt, anaglyphOpt, autoRotateOpt, wireframeMeshOpt, tentativeOpt, terrainOpt) {

	if (imgControlOpt == true) {
		document.getElementById('imgOrbitalMoves').style.display = 'inline';
	} else {
		document.getElementById('imgOrbitalMoves').style.display = 'none';
	}

	if (cursorOpt == true) {
		document.getElementById('cursorCheck').checked = true;
	} else {
		document.getElementById('cursorCheck').checked = false;
	}

	if (wireframeMeshOpt == true) {
		document.getElementById('malla').checked = true;
	} else {
		document.getElementById('malla').checked = false;
	}

	if (autoRotateOpt == true) {
		document.getElementById('autoRotate').checked = true;
	} else {
		document.getElementById('autoRotate').checked = false;
	}

	if (anaglyphOpt == true) {
		document.getElementById('anaglyphCheck').checked = true;
	} else {
		document.getElementById('anaglyphCheck').checked = false;
	}

	if (tentativeOpt == true) {
		document.getElementById('tentative').checked = true;
	} else {
		document.getElementById('tentative').checked = false;
	}

	if (terrainOpt == true) {
		document.getElementById('terrain').checked = true;
	} else {
		document.getElementById('terrain').checked = false;
	}

	if (TR3.canvasDest) {
		var infoGeo3d = document.getElementById('infoGeo3d');
		var cursorCheck_div = document.getElementById('cursorCheck_div');
		if (terrainOpt !== TR3.optionsSet.terrain) {
			TR3.setStart(TR3.params);
		}

		if (cursorOpt !== TR3.optionsSet.cursor3d)
			if (cursorOpt == true) {
				cursorCheck_div.style.display = 'block';
				infoGeo3d.style.display = 'block';
				TR3.canvasDest.style.cursor = "none";
				TR3.cursor.helper.visible = true;
				TR3.controls.enableZoom = false;
			} else {
				cursorCheck_div.style.display = 'none';
				infoGeo3d.style.display = 'none';
				if (TR3.canvasDest.style.cursor === "none")
					TR3.canvasDest.style.cursor = "default";
				TR3.cursor.helper.visible = false;
				TR3.controls.enableZoom = true;
				//TR3.cursor.helper.hideShadowBase();
			}

		if (wireframeMeshOpt !== TR3.optionsSet.wireframeMesh)
			if (wireframeMeshOpt == true) {
				TR3.mesh.material.wireframe = true;
			} else {
				TR3.mesh.material.wireframe = false;
			}

		if (autoRotateOpt !== TR3.optionsSet.autoRotate)
			if (autoRotateOpt == true) {
				TR3.controls.autoRotate = true;
			} else {
				TR3.controls.autoRotate = false;
			}

		if (anaglyphOpt !== TR3.optionsSet.anaglyph)
			if (anaglyphOpt == true) {
				var raycaster = TR3.getRayCaster(false);
				var inter = TR3.getIntersect(raycaster, [TR3.mesh]);
				if (inter.length > 0 && inter[0][0] && inter[0][0].point) {
					var cPos = TR3.camera.position;
					TR3.zeroParallax = cPos.distanceTo(inter[0][0].point);
				}
			} else {
			}

		/*Anaglyph*/
		TR3.optionsSet = { imgControl: imgControlOpt, cursor3d: cursorOpt, anaglyph: anaglyphOpt, autoRotate: autoRotateOpt, wireframeMesh: wireframeMeshOpt, tentative: tentativeOpt, terrain: terrainOpt };
	}
	TR3.optionsSet.terrain = terrainOpt;
};

TR3.setValues = function (values) {

	if (values.magnification) {
		var magni = values.magnification;
		var magnific = 'auto';
		if (typeof (Number(magni)) == 'number' && !isNaN(magni)) {
			magnific = eval(magni);
		}

		TR3.config.magni = magnific;

		TR3.setValuesSliderMagn(magnific);
	}
	if (values.reducDTM) {
		TR3.reducDTM = values.reducDTM;
	}

};

TR3.getValues = function () {

	var values = new Object();
	values.magnification = TR3.config.magni;

	return values;
};

TR3.changeAnaglyphType = function () {

	TR3.anaglyphType = document.getElementById('anaglyph-type').value;
	TR3.anaglyphRenderer.updateAnaglyphType(TR3.scene, TR3.camera);

};

TR3.changeExportType = function () {
	var type = document.getElementById('exporter-type').value
	if (type != 'null')
		TR3.exportGLTF(type);

};

TR3.setValuesSliderMagn = function (magn) {
	if (magn && magn > 0 && magn < 51) {
		TR3.setMagniValues(magn);
	} else if (magn == "auto") {
		magn = TR3.setMagniValues();
	} else { magn = TR3.valuesSet.magnification }
	//var range = 2;
	//$('#magnificationSlider').slider("option", "max", parseInt(TR3.valuesSet.magnification*range));
	//$('#magnificationSlider').slider("option", "min", parseInt(TR3.valuesSet.magnification - TR3.valuesSet.magnification*(range-1)));
	$('#magnificationSlider').slider("value", magn);
	var tPixMesh = TR3.formatMeasure(TR3.tPixMesh);
	$("#magnificationSliderValue").html('Exagerar <b>x' + magn + '</b> (malla: ' + tPixMesh[0] + ' ' + tPixMesh[1] + ')');
};

TR3.setValuesSliderHeight = function (hi) {

	$('#heightSlider').slider("value", hi);
	$('#heightSlider').slider("option", "max", Math.round((TR3.zMax - TR3.zMed) * TR3.valuesSet.magnification));
	$('#heightSlider').slider("option", "min", Math.round((TR3.zMin - TR3.zMed) * TR3.valuesSet.magnification));
	$("#heightSliderValue").html('Altitud: ' + Math.round((hi / TR3.valuesSet.magnification) + TR3.zMed) + ' m');
};

TR3.geometryBySelect = function () {

	var valuesSelect = $("#geometry-type")[0].value.split(',');
	var geomDivElements = $("#geoOpts_div")[0].children;
	for (var i = 0; i < geomDivElements.length; i++) {
		geomDivElements[i].style.display = 'none';
		for (var j = 0; j < valuesSelect.length; j++) {
			if (geomDivElements[i].id.indexOf(valuesSelect[j]) != -1) {
				geomDivElements[i].style.display = 'block';
			}
		}
	}

};

TR3.setGeomBySelect = function () {

	var valuesSelect = $("#geometry-type")[0];
	var geom;
	var geomValues = new Object();
	for (var i = 0; i < valuesSelect.length; i++) {
		if (valuesSelect[i].selected === true) {
			geom = valuesSelect[i].innerHTML;
		}
	}

	var geomDivElements = $("#geoOpts_div")[0].children;
	for (var i = 0; i < geomDivElements.length; i++) {
		var children = geomDivElements[i].children;
		if (children.length > 0) {
			if (geomDivElements[i].tagName === "DIV" && children[1].value) {
				var string = children[0].innerHTML.replaceAll(":", "").replaceAll(" ", "");
				geomValues[string.charAt(0).toLowerCase() + string.slice(1)] = children[1].value * 1;
			} else {
				var slider = children[0].innerHTML.split(":");
				geomValues[slider[0].charAt(0).toLowerCase() + slider[0].slice(1)] = slider[1] * 1;
			}
		}
	}

	geomValues.geometry = geom;
	geomValues.openEnded = $("#geomOpenEnded_value")[0].checked;

	var mesh = TR3.setGeometry(geomValues, '', { transform: true, slctItem: true });

	if (!geomValues.height) { geomValues.height = 0; };
	mesh.position.set(TR3.cursor.coordClick.x,
		TR3.cursor.coordClick.y + geomValues.height / 2 * TR3.adjustScale,
		TR3.cursor.coordClick.z);

	mesh.scale.set(TR3.adjustScale, TR3.adjustScale, TR3.adjustScale);

	var box = TR3.getSizeObj(mesh);
	var size3dObj = document.getElementById('size3dObj');
	size3dObj.innerHTML = '<b>X:</b>' + (box[0][0] * 1 / TR3.adjustScale).toFixed(2) + '' + box[0][1] + ' <b>Y:</b>' + (box[2][0] * 1 / TR3.adjustScale).toFixed(2) + '' + box[2][1] + ' <b>Z:</b>' + (box[1][0] * 1 / TR3.adjustScale).toFixed(2) + '' + box[1][1];

	TR3.scene.add(mesh);
};/**
 * @author alteredq / http://alteredqualia.com/
 * @author mr.doob / http://mrdoob.com/
 */
'use strict';
 /*function OperSystem() {
	var OS = true;
	
	/*if (window.navigator.userAgent.indexOf("Windows NT 6.2") != -1) OS=//"Windows 8";
	if (window.navigator.userAgent.indexOf("Windows NT 6.1") != -1) OS=//"Windows 7";
	if (window.navigator.userAgent.indexOf("Windows NT 6.0") != -1) OS=//"Windows Vista";
	if (window.navigator.userAgent.indexOf("Windows NT 5.1") != -1) OS=//"Windows XP";
	if (window.navigator.userAgent.indexOf("Windows NT 5.0") != -1) OS=//"Windows 2000";
	if (window.navigator.userAgent.indexOf("Mac")!=-1) OS="Mac/iOS";
	if (window.navigator.userAgent.indexOf("X11")!=-1) OS="UNIX";
	if (window.navigator.userAgent.indexOf("Linux")!=-1) OS="Linux";*/
	
	/*if (window.navigator.userAgent.indexOf("Windows NT 5") != -1) OS = false;
	
	return OS;

}*/
function isMobile () {
	var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
	}
function isTouch() {
	try{ document.createEvent("TouchEvent"); return true; }
	catch(e){ return false; }
}

function isIE () {
  var myNav = navigator.userAgent.toLowerCase();
  return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : 100;
}

function isLandscape() {
	return (window.innerWidth > window.innerHeight);
}
var Detector = {
	isMobile: isMobile (),
	isTablet: (!isMobile () && isTouch()),
	isTouch: isTouch(),
	isIE: isIE(),
	isLandscape: isLandscape(),
	canvas: !! window.CanvasRenderingContext2D,
	webgl: ( function () {
					if (window.navigator.userAgent.indexOf("Windows NT 5") != -1 || isIE () < 10){
						return false; 
					}else{
						try {
							var canvas = document.createElement( 'canvas' );
							return !! window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) );
						} catch( e ) {
							return false;
						}
					}
				}
			)(),
	
	workers: !! window.Worker,
	fileapi: window.File && window.FileReader && window.FileList && window.Blob,

	getWebGLErrorMessage: function () {

		var element = document.createElement( 'div' );
		element.id = 'webgl-error-message';
		element.style.fontFamily = 'monospace';
		element.style.fontSize = '13px';
		element.style.fontWeight = 'normal';
		element.style.textAlign = 'center';
		element.style.background = '#fff';
		element.style.color = '#000';
		element.style.padding = '1.5em';
		element.style.width = '400px';
		element.style.margin = '5em auto 0';

		if ( ! this.webgl ) {

			element.innerHTML = window.WebGLRenderingContext ? [
				'Your graphics card does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br />',
				'Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.'
			].join( '\n' ) : [
				'Your browser does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br/>',
				'Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.'
			].join( '\n' );

		}

		return element;

	},

	addGetWebGLMessage: function ( parameters ) {

		var parent, id, element;

		parameters = parameters || {};

		parent = parameters.parent !== undefined ? parameters.parent : document.body;
		id = parameters.id !== undefined ? parameters.id : 'oldie';

		element = Detector.getWebGLErrorMessage();
		element.id = id;

		parent.appendChild( element );

	}

};/** 
 * @fileoverview Clase que realiza transformaciones entre sistemas de coordenadas
 * Basado en la librer&iacute;a jscoord.js de Jonathan Stott
 */
'use strict';
/**
 * 
 */
var wmsMap = new Object();
wmsMap.transCoord = function() {
	;
};

/**
 * Datum
 */
var  Datum_axis = { ED50: [6378388.000,  6356911.946 ],    // International 1924 - Hayford
                    WGS84: [6378137.000,  6356752.314 ],   // WGS84
                    ETRS89: [6378137.000,  6356752.314 ],  // GRS 1980
                    WGS72: [6378135.000,  6356750.520 ],   // WGS72
                    OSGB36: [6377563.396,  6356256.909 ]   // OSGB36
};

/**
 * Parametros de transformacion entre sistemas de referencia.
 */
var datToDat = {
	ETRS89toED50Pen: {tx:131.032,ty:100.251,tz:163.354,s:-0.00000939, rx:-0.0003455,ry:-0.0000054166,rz:-0.0003176666},
	ED50toETRS89Pen: {tx:-131.032,ty:-100.251,tz:-163.354,s:0.00000939, rx:0.0003455,ry:0.0000054166,rz:0.0003176666},
	ETRS89toED50Bal: {tx:181.4609,ty:90.2931,tz:187.1902,s:-0.00001757, rx:0.000039861,ry:0.000136722,rz:-0.000109306},
	ED50toETRS89Bal: {tx:-181.4609,ty:-90.2931,tz:-187.1902,s:0.00001757, rx:-0.000039861,ry:-0.000136722,rz:0.000109306},
	ETRS89toED50NWP: {tx:178.383,ty:83.172,tz:221.293,s:-0.0000212, rx:0.000150028,ry:-0.000147750,rz:-0.000035083},
	ED50toETRS89NWP: {tx:-178.383,ty:-83.172,tz:-221.293,s:0.0000212, rx:-0.000150028,ry:0.000147750,rz:0.000035083},
	WGS84toED50: {tx:89.5,ty:93.8,tz:123.1,s:-0.0000012, rx:0,ry:0,rz:-0.0000433},
	ED50toWGS84: {tx:-89.5,ty:-93.8,tz:-123.1,s:0.0000012, rx:0,ry:0,rz:0.0000433},
  OSGB36toWGS84: {tx:446.448,ty:-124.157,tz:542.060,s:-0.0000204894, rx:0.00004172222,ry:0.00006861111,rz:0.00023391666}
};
 
/**
 * Devuelve los parametros del elipsoide correspondiente al Datum indicado.
 * @param {Object} datum
 */
wmsMap.transCoord.getElipsoide = function(datum){
	var a = Datum_axis[datum][0];
	var b = Datum_axis[datum][1];
	var e2 = (a*a-b*b)/(a*a);
	
	return {a:a , b: b,  e2:e2};
};

/**
 * Transforma unas coordenadas entre diferentes sistemas de referencia.
 * @param {Object} c1 Coordenadas 'x' o longitud de entrada.
 * @param {Object} c2 Coordenada 'y' o latitud de entrada
 * @param {String} srsIn Sistema de referencia de entrada 'EPSG:xxx'.
 * @param {String} srsOut Sistema de referencia de salida 'EPSG:xxx'.
 */
wmsMap.transCoord.srsChange = function(c1,c2,srsIn, srsOut){

	var datum1 = this.getDatum(srsIn);
	var datum2 = this.getDatum(srsOut);
	
	//no hay cambio de datum
	if(datum1.datum == datum2.datum ){
		//No hay cambio de huso
		if(datum1.huso == datum2.huso){
			return {c1:c1,c2:c2};
		}
		//datum1 -> coordenadas geograficas
		else if(datum1.huso == ""){
			var coord = this.geoToUTM(c1, c2, datum1.datum, datum2.huso);
			return {c1:coord.x, c2:coord.y};
		}
		//datum2 -> Coordenadas geograficas
		else if(datum2.huso == ""){
			var coord = this.utmToGeo(c1, c2, datum1.datum, datum1.huso);
			return {c1:coord.lon, c2:coord.lat};
		}
		else{
			var latLon = this.utmToGeo(c1, c2, datum1.datum, datum1.huso);
			var coord = this.geoToUTM(latLon.lon, latLon.lat, datum1.datum, datum2.huso);
			return {c1:coord.x, c2:coord.y};
		}
	}
	//Hay cambio de datum
	else{
		//datum1 = coordenadas geograficas; datum2 = coordenadas geograficas; 
		if(datum1.huso == "" && datum2.huso == ""){
			var coord = this.changeDatum(c1, c2, datum1.datum, datum2.datum);
			return {c1:coord.lon, c2:coord.lat};
		}
		//datum1 = coordenadas geograficas; datum2 = coordenadas utm;
		else if(datum1.huso == "" && datum2.huso != ""){
			var coord = this.changeDatum (c1, c2, datum1.datum, datum2.datum);
			var coord1 = this.geoToUTM(coord.lon, coord.lat, datum2.datum, datum2.huso);
			return {c1:coord1.x, c2:coord1.y};
		}
		//datum1 = coordenadas utm; datum2 = coordenadas geograficas;
		else if(datum1.huso != "" && datum2.huso == ""){
			var coord = this.utmToGeo(c1, c2, datum1.datum, datum1.huso);
			var coord1 = this.changeDatum (coord.lon, coord.lat, datum1.datum, datum2.datum);
			return {c1:coord1.lon, c2:coord1.lat};
		}
		//datum1 = coordenadas utm; datum2 = coordenadas utm;
		else{
			var coord = this.utmToGeo(c1, c2, datum1.datum, datum1.huso);
			var coord1 = this.changeDatum (coord.lon, coord.lat, datum1.datum, datum2.datum);
			var coord2 = this.geoToUTM(coord1.lon, coord1.lat, datum2.datum, datum2.huso);
			return {c1:coord2.x, c2:coord2.y};
		}
	}
};

/**
 * Devuelve el nombre del datum y el huso si es utm.
 * @param {Object} srs Sistema de referencia 'EPSG:xxx'.
 */
wmsMap.transCoord.getDatum = function(srs){
	var n = srs.length;
	var datum="";
	var huso="";
	
	if (n==10){
		var proy = 'UTM';
		var code = srs.slice(5,8);

		if(code==326){
			datum='WGS84';
		}
		else if(code==230){
			datum='ED50';
		}
		else if(code==258){
			datum='ETRS89';
		}

		huso=srs.slice(-2);
	}
	else if(n==9){
		var proy = 'Lon-Lat';
		var code =srs.slice(5,9);
		if(code==4326){
			datum='WGS84';
		}
		else if(code==4230){
			datum='ED50';
		}
		else if(code==4258){
			datum='ETRS89';
		}
	}
	
	//if (datum == 'WGS84')datum='ETRS89';
	
	return { datum: datum, huso: huso, proy: proy};
};

/**
 * Devuelve el EPSG del sistema.
 * @param {Object} proy, datum, huso del Sistema de referencia.
 */
wmsMap.transCoord.getEPSG = function(proy,datum,huso){
	var EPSG;
	var refProy;
	var refDatum;
	var refHuso = huso;
	
	if(proy == 'UTM'){
		refProy = "";
	}else if(proy == 'Lon-Lat'){
		refProy = "4";
		refHuso = "";
	}
	if(datum == 'ETRS89'){
		refDatum = "258";
	}else if(datum == 'ED50'){
		refDatum = "230";
	}else if(datum == 'WGS84'){
		refDatum = "326";
	}
	EPSG = "EPSG:" + refProy + refDatum + refHuso;
	
	return{EPSG: EPSG}
}

wmsMap.transCoord.isGeo = function(srs) {

	var datum = wmsMap.transCoord.getDatum(srs);
	if ( datum.proy == 'Lon-Lat' ) return true;
	else return false;
		
};

wmsMap.transCoord.isUTM = function(srs) {

	var datum = wmsMap.transCoord.getDatum(srs);
	if ( datum.proy == 'UTM' ) return true;
	else return false;
		
};

/**
 * Transforma las coordenadas geograficas a UTM.
 * @param {Object} lon Longitud del punto
 * @param {Object} lat Latitud del punto
 * @param {String} datum Datum de la proyeccion
 * @param {Single} huso si se quiere obtener las coordenadas expandidas en 
 * otro huso se debe indicar este parametro. Si se omite se toma el huso correspondiente.
 * @return Coordenadas UTM
 */
wmsMap.transCoord.geoToUTM = function(lon, lat, datum, huso) {
  
	var UTM_F0   = 0.9996;
	var elipsoide = this.getElipsoide(datum);
	var a = elipsoide.a;
	var e2 = elipsoide.e2;
  
	var longitude = lon;
	var latitude = lat;
	
	var latitudeRad = latitude * (Math.PI / 180.0);
	var longitudeRad = longitude * (Math.PI / 180.0);
	if(huso){
		var longitudeZone = huso;
	}
	else{
		var longitudeZone = Math.floor((longitude + 180.0) / 6.0) + 1;
	}

	// Special zone for Norway
	if (latitude >= 56.0
		&& latitude < 64.0
		&& longitude >= 3.0
		&& longitude < 12.0) {
		longitudeZone = 32;
	}

	// Special zones for Svalbard
	if (latitude >= 72.0 && latitude < 84.0) {
		if (longitude >= 0.0 && longitude < 9.0) {
			longitudeZone = 31;
		} else if (longitude >= 9.0 && longitude < 21.0) {
			longitudeZone = 33;
		} else if (longitude >= 21.0 && longitude < 33.0) {
			longitudeZone = 35;
		} else if (longitude >= 33.0 && longitude < 42.0) {
			longitudeZone = 37;
		}
	}

	var longitudeOrigin = (longitudeZone - 1) * 6 - 180 + 3;
	var longitudeOriginRad = longitudeOrigin * (Math.PI / 180.0);

	ePrimeSquared = (e2) / (1 - e2);

	var n = a / Math.sqrt(1 - e2 * Math.sin(latitudeRad) * Math.sin(latitudeRad));
	var t = Math.tan(latitudeRad) * Math.tan(latitudeRad);
	var c = ePrimeSquared * Math.cos(latitudeRad) * Math.cos(latitudeRad);
	var A = Math.cos(latitudeRad) * (longitudeRad - longitudeOriginRad);

	var M = a * (  (1 - e2 / 4 - 3 * e2 * e2 / 64 - 5 * e2 * e2 * e2 / 256) * latitudeRad
               - (3 * e2 / 8 + 3 * e2 * e2 / 32 + 45 * e2 * e2 * e2 / 1024) * Math.sin(2 * latitudeRad)
               + (15 * e2 * e2 / 256 + 45 * e2 * e2 * e2 / 1024) * Math.sin(4 * latitudeRad)
               - (35 * e2 * e2 * e2 / 3072) * Math.sin(6 * latitudeRad));

  var UTMEasting = (UTM_F0 * n * (A + (1 - t + c) * Math.pow(A, 3.0) / 6
        				 + (5 - 18 * t + t * t + 72 * c - 58 * ePrimeSquared) 
        				 * Math.pow(A, 5.0) / 120) + 500000.0);

  var UTMNorthing = (UTM_F0 * (M + n * Math.tan(latitudeRad)
          * (A * A / 2 + (5 - t + (9 * c) + (4 * c * c)) * Math.pow(A, 4.0) / 24
            + (61 - (58 * t) + (t * t) + (600 * c) - (330 * ePrimeSquared))
              * Math.pow(A, 6.0) / 720)));

	// Adjust for the southern hemisphere
	if (latitude < 0) {
		UTMNorthing += 10000000.0;
	}
	
	return {x: UTMEasting, y: UTMNorthing};
};

/**
 * Transforma las coordenadas UTM a geograficas.
 * @param {Object} x Coordenada x del punto
 * @param {Object} y Coordenada y del punto
 * @param {String} datum Datum de la proyeccion
 * @param {Single} huso si se quiere obtener las coordenadas expandidas en 
 * otro huso se debe indicar este parametro. Si se omite se toma el huso correspondiente.
 * @return Coordenadas Geograficas (latitud y longitud)
 */
wmsMap.transCoord.utmToGeo = function(x, y, datum, huso) {
	var UTM_F0   = 0.9996;
	var elipsoide = this.getElipsoide(datum);
	var a = elipsoide.a;
	var e2 = elipsoide.e2;
  
	var ePrimeSquared = e2 / (1.0 - e2);
	var e1 = (1 - Math.sqrt(1 - e2)) / (1 + Math.sqrt(1 - e2));
	var x = x - 500000.0;;
	var y = y;
	var zoneNumber = huso;

	var longitudeOrigin = (zoneNumber - 1.0) * 6.0 - 180.0 + 3.0;

	var m = y / UTM_F0;
	var mu = m / (a * (1.0 - e2 / 4.0 - 3.0 * e2 * e2 / 64.0 - 5.0 * Math.pow(e2, 3.0) / 256.0));

	var phi1Rad =
    mu
      + (3.0 * e1 / 2.0 - 27.0 * Math.pow(e1, 3.0) / 32.0) * Math.sin(2.0 * mu)
      + (21.0 * e1 * e1 / 16.0 - 55.0 * Math.pow(e1, 4.0) / 32.0)
        * Math.sin(4.0 * mu)
      + (151.0 * Math.pow(e1, 3.0) / 96.0) * Math.sin(6.0 * mu);

	var n =
    a
      / Math.sqrt(1.0 - e2 * Math.sin(phi1Rad) * Math.sin(phi1Rad));
	var t = Math.tan(phi1Rad) * Math.tan(phi1Rad);
	var c = ePrimeSquared * Math.cos(phi1Rad) * Math.cos(phi1Rad);
	var r =
    a
      * (1.0 - e2)
      / Math.pow(
        1.0 - e2 * Math.sin(phi1Rad) * Math.sin(phi1Rad),
        1.5);
	var d = x / (n * UTM_F0);

	var latitude = (
    phi1Rad
      - (n * Math.tan(phi1Rad) / r)
        * (d * d / 2.0
          - (5.0
            + (3.0 * t)
            + (10.0 * c)
            - (4.0 * c * c)
            - (9.0 * ePrimeSquared))
            * Math.pow(d, 4.0)
            / 24.0
          + (61.0
            + (90.0 * t)
            + (298.0 * c)
            + (45.0 * t * t)
            - (252.0 * ePrimeSquared)
            - (3.0 * c * c))
            * Math.pow(d, 6.0)
            / 720.0)) * (180.0 / Math.PI);

	var longitude = longitudeOrigin + (
    (d
      - (1.0 + 2.0 * t + c) * Math.pow(d, 3.0) / 6.0
      + (5.0
        - (2.0 * c)
        + (28.0 * t)
        - (3.0 * c * c)
        + (8.0 * ePrimeSquared)
        + (24.0 * t * t))
        * Math.pow(d, 5.0)
        / 120.0)
      / Math.cos(phi1Rad)) * (180.0 / Math.PI);
	  
	return {lon: longitude, lat: latitude };
};

/**
 * Transformaci�n de coordenadas geodesicas a geoc&eacute;ntricas.
 * @param {Object} lon Longitud del punto
 * @param {Object} lat Latitud del punto
 * @param {Object} datumIn Datum de entrada
 * return Coordenadas geocentricas {z: x,y: y, z: z};
 */
wmsMap.transCoord.GeoToGeocentric = function(lon, lat, datumIn) {
	
		var elipsoide = this.getElipsoide(datumIn);
		var a = elipsoide.a;
		var b = elipsoide.b;
		var e2 = elipsoide.e2;
		
		var phi = wmsMap.oper.degToRad(lat);
		var lambda = wmsMap.oper.degToRad(lon);
		var v = a / (Math.sqrt(1 - e2 * wmsMap.oper.sin2(phi)));
		var H = 0; // Altura elipsoidal
		
		//Coordenadas geocentricas en el datum de partida:
		var x = (v + H) * Math.cos(phi) * Math.cos(lambda);
		var y = (v + H) * Math.cos(phi) * Math.sin(lambda);
		var z = ((1 - e2) * v + H) * Math.sin(phi);	
		return {x: x, y: y, z: z};
};

/**
 * Transformaci�n de coordenadas geocentricas a geod�sicas.
 * @param {Object} x Coodenada X en el datum origen
 * @param {Object} y Coodenada Y en el datum origen
 * @param {Object} z Coodenada Z en el datum origen
 * @param {Object} datumIn Datum de salida
 * return Coordenadas geod�sicas en el datum de salida {lon: lambdaB,lat: phiB}
 */
wmsMap.transCoord.GeocentricToGeo = function(x, y, z, datumOut) {
		
		elipsoide = this.getElipsoide(datumOut);
		a = elipsoide.a;
		b = elipsoide.b;
		excen = elipsoide.e2;
		
		var lambdaB = wmsMap.oper.radToDeg(Math.atan(y / x));
		var p = Math.sqrt((x * x) + (y * y));
		var phiN = Math.atan(z / (p * (1 - excen)));
		for (var i = 1; i < 10; i++) {
			v = a / (Math.sqrt(1 - excen * wmsMap.oper.sin2(phiN)));
			phiN1 = Math.atan((z + (excen * v * Math.sin(phiN))) / p);
			phiN = phiN1;
		}
		
		var phiB = wmsMap.oper.radToDeg(phiN);
		
		return {lon: lambdaB,lat: phiB};		
};

/**
 * Transformaci�n bursaWolf. Transformaci�n entre dos sistemas de referencia
 * @param {Object} x Coodenada X en el datum origen
 * @param {Object} y Coodenada Y en el datum origen
 * @param {Object} z Coodenada Z en el datum origen
 * @param {Object} param Parametros de transformaci�n entre los dos sistemas de referencia.
 		               param = { tx:tx[m], ty:ty[m], tz:tz[m], s:s, rx:rx[grados], ry:ry[grados], rz:rz[grados] };
 * return Coordenadas geocentricas en el datum de salida { x: xB, y: yB, z: zB}
 */
wmsMap.transCoord.bursaWolf = function(x, y, z, param) {
			
		var tx = param.tx;
		var ty = param.ty;
		var tz = param.tz;
		var s = param.s;
		var rx = wmsMap.oper.degToRad(param.rx);
		var ry = wmsMap.oper.degToRad(param.ry);
		var rz = wmsMap.oper.degToRad(param.rz);

	  var sin_f = Math.sin(ry);
	  var cos_f = Math.cos(ry);
	  var sin_w = Math.sin(rx);
	  var cos_w = Math.cos(rx);
	  var sin_k = Math.sin(rz);
	  var cos_k = Math.cos(rz);   
	  var m = 1 + s;
	  var r=[[],[],[]];
	  r[0][0] = m * (cos_f * cos_k);
	  r[1][0] = m * (-cos_f * sin_k);
	  r[2][0] = m * sin_f;
	  r[0][1] = m * (sin_w * sin_f * cos_k + cos_w * sin_k);
	  r[1][1] = m * (-sin_w * sin_f * sin_k + cos_w * cos_k);
	  r[2][1] = m * (-sin_w * cos_f);
	  r[0][2] = m * (-cos_w * sin_f * cos_k + sin_w * sin_k);
	  r[1][2] = m * (cos_w * sin_f * sin_k + sin_w * cos_k);
	  r[2][2] = m * (cos_w * cos_f);
  
		var xB = r[0][0]*x + r[0][1]*y + r[0][2]*z + tx;
		var yB = r[1][0]*x + r[1][1]*y + r[1][2]*z + ty;
		var zB = r[2][0]*x + r[2][1]*y + r[2][2]*z + tz;
		
		return { x: xB, y: yB, z: zB};
};

/**
 * Cambio de Datum.
 * @param {Object} lon Longitud del punto
 * @param {Object} lat Latitud del punto
 * @param {Object} datumIn Datum de entrada
 * @param {Object} datumOut Datum de salida
 */
wmsMap.transCoord.changeDatum = function(lon, lat, datumIn, datumOut) {
	
	// trata igual los 
	if ((datumIn == "ETRS89" && datumOut == "WGS84") || (datumOut == "ETRS89" && datumIn == "WGS84")) {
		return {lon: lon,lat: lat};
	}
	else {
		
		// Coordenadas geocentricas en el datum de partida
		gcIn = wmsMap.transCoord.GeoToGeocentric(lon, lat, datumIn);

		// Parametros de transformacion entre datums		
		var param = this.getParam(datumIn, datumOut,lon,lat);
		
		// Calculo de las coordenadas geocentricas en el nuevo datum
		gcOut = wmsMap.transCoord.bursaWolf(gcIn.x, gcIn.y, gcIn.z, param);	

		// Coordenadas geodesicas en el datum de salida
		gOut = wmsMap.transCoord.GeocentricToGeo(gcOut.x, gcOut.y, gcOut.z, datumOut);		
		
		return {lon: gOut.lon ,lat: gOut.lat };
	}
};

/**
 * Devuelve los parametros de transformacion seg&uacute;n el datum de entrada y de salida.
 * @param {Object} datumIn
 * @param {Object} datumOut
 */
wmsMap.transCoord.getParam = function(datumIn, datumOut,lon,lat){
	
	// Zonas para el cambio de ETRS89 a ED50
	// Noroeste Peninsula
	var xMinNWP = -9.416;
	var xMaxNWP = -4.5;
	var yMinNWP = 41.5;
	var yMaxNWP = 43.833;
	// Baleares
	var xMinBal = 1;
	var xMaxBal = 4.5;
	var yMinBal = 38.5;
	var yMaxBal = 40.3;
	//Resto peninsula
	var xMinPen = -10;
	var xMaxPen = 3.833;
	var yMinPen = 35.5;
	var yMaxPen = 44.833;
  var ETRS89toED50;
  var ED50toETRS89;
  
  if ( lon > xMinNWP && lon < xMaxNWP && lat > yMinNWP && lat < yMaxNWP ) {
  	// Noroeste Peninsula
    ETRS89toED50 = datToDat.ETRS89toED50NWP;
    ED50toETRS89 = datToDat.ED50toETRS89NWP; 
  } else if ( lon > xMinBal && lon < xMaxBal && lat > yMinBal && lat < yMaxBal ) {
    // Baleares
    ETRS89toED50 = datToDat.ETRS89toED50Bal;
    ED50toETRS89 = datToDat.ED50toETRS89Bal;
  } else if ( lon > xMinPen && lon < xMaxPen && lat > yMinPen && lat < yMaxPen ) {
    // Resto peninsular
    ETRS89toED50 = datToDat.ETRS89toED50Pen;
    ED50toETRS89 = datToDat.ED50toETRS89Pen;
  } else {
    // Resto mundo
    // Se utilizan los parametros de WGS84 a ED50
    ETRS89toED50 = datToDat.WGS84toED50;
    ED50toETRS89 = datToDat.ED50toWGS84;
  }
  
	if (datumIn=='ETRS89' && datumOut=='ED50')
		return ETRS89toED50;
	else if (datumIn=='ED50' && datumOut=='ETRS89')
		return ED50toETRS89;
	else if (datumIn=='WGS84' && datumOut=='ED50')
		return datToDat.WGS84toED50;
	else if (datumIn=='ED50' && datumOut=='WGS84')
		return datToDat.ED50toWGS84;
	else if(datumIn=='OSGB36' && datumOut=='WGS84')
		return datToDat.OSGB36toWGS84;
};

/**
 * Devuelve la latitud y la longitud de un punto en grados, minutos y segundos
 * @param {Object} longitud
 * @param {Object} latitud
 */
wmsMap.transCoord.getGradMinSeg = function(lon, lat){
	var lonMin = (Math.floor(lon)-lon)*60;
	var latMin = (Math.floor(lat)-lat)*60;
	var lonSeg = Math.floor((lonMin-Math.floor(lonMin))*60);
	var latSeg = Math.floor((latMin-Math.floor(latMin))*60);
	if (lon >= 0) {
		var longitud = Math.floor(lon) + '&ordm;' + Math.floor(Math.abs(lonMin)) + '\'' + Math.abs(lonSeg-59) + '\'\'';
		//var latitud = Math.floor(lat) + '&ordm;' + Math.floor(Math.abs(latMin)) + '\'' + Math.abs(latSeg-59) + '\'\'';
	}
	else{
		var longitud = '-' + Math.abs(Math.ceil(lon)) + '&ordm;' + Math.floor(lonMin+60) + '\'' + lonSeg + '\'\'';
		//var latitud = Math.ceil(lat) + '&ordm;' + Math.floor(latMin) + '\'' + latSeg + '\'\'';
	}
	var latitud = Math.floor(lat) + '&ordm;' + Math.floor(Math.abs(latMin)) + '\'' + Math.abs(latSeg-59) + '\'\'';
	return {lon:longitud,lat:latitud};
};

/**
 * Devuelve la latitud o la longitud de un punto en grados decimales
 * @param {Object} grados
 * @param {Object} minutos
 * @param {Object} segundos
 */
wmsMap.transCoord.getGradDeci = function(grad, min, seg){
	if(!grad){
		grad = 0
	}
	if(!min){
		min = 0
	}
	if(!seg){
		seg = 0
	}
	var grados = grad;
	var minutos = min;
	var segundos = seg;
	var gDeci = grados + minutos/60 + segundos/3600;
	return gDeci;
};

/**
 * Devuelve el area de un pol&iacute;gono.<br>
 * El &uacute;ltimo punto de la matriz puede ser coincidente con el primero o no. Para el c&aacute;lculo si no 
 * coinciden el punto inicial y final se duplica el primer punto para el c&aacute;lculo y se inserta al
 * final de la matriz.
 * @param {Array} matrixAux Matriz con las cordenadas del pol&iacute;gono.
 * @return superf Superficie.
 */
wmsMap.transCoord.getSuperficie = function(matrix,datum){
	var c;
	var vect=[];
	var matrixAux = [];
	
	//Se convierten las coordenadas geograficas a UTM.
	for(var i=0; i<matrix.length; i++){
		c = wmsMap.transCoord.geoToUTM(eval(matrix[i][0]),eval(matrix[i][1]),datum,30);
		var vect=[];
		vect[0]=c.x;
		vect[1]=c.y;
		matrixAux.push(vect); 
	}
	
	var superf=0;
	var n = matrixAux.length;

	if (matrixAux[0][0]==matrixAux[n-1][0] && matrixAux[0][1]==matrixAux[n-1][1] ){
		for(var j=0;j<n-1;j++){
    		superf +=((-matrixAux[j][0] * matrixAux[j + 1][1]) + (matrixAux[j + 1][0] * matrixAux[j][1]));
    	}
    	return	superf=Math.abs(superf/2);
	}
	else{
		for(var j=0;j<n-1;j++){
    	superf +=((-matrixAux[j][0] * matrixAux[j + 1][1]) + (matrixAux[j + 1][0] * matrixAux[j][1]));
    }
	
    superf +=((-matrixAux[n-1][0] * matrixAux[0][1]) + (matrixAux[0][0] * matrixAux[n-1][1]));
    return	superf=Math.abs(superf/2);
	}
};

/**
 * normalizeDegress devuelve las coordenadas entre +-90&ordm; y +-180&ordm;
 *
 * @param {Array} Vector que contiene las coordenadas de los bordes del mapa.
 * @return Vector con las coordenadas normalizadas.
 * @type Array
 */
wmsMap.transCoord.normalizeDegrees = function(arr){

	var max = [360,180];

	if(arr[0]<-max[0]){
		arr[0]+=max[0];
		arr[2]+=max[0];
	}
	if(arr[2]>max[0]){
		arr[2]-=max[0];
		arr[0]-=max[0];
	}
	if(arr[1]<-max[1]){
		arr[1]+=max[1];
		arr[3]+=max[1];
	}
	if(arr[3]>max[1]){
		arr[3]-=max[1];
		arr[1]-=max[1];
	}

	return arr;
};

/**
 * Retorna el huso del punto.
 * @param {Object} c1 Longitud o x del punto
 * @param {Object} c2 Latitud o y del punto
 * @param {String} srsIn srs
 * @return huso
 */
wmsMap.transCoord.geoZone = function(c1, c2, srsIn ) {
  var datum = this.getDatum(srsIn);
  
  if( datum.proy == 'UTM') {
  	var geo = this.srsChange(c1,c2,srsIn, "EPSG:4258");	
  } else {
  	var geo = {c1:c1, c2:c2};
  }
	var longitudeZone = Math.floor((geo.c1 + 180.0) / 6.0) + 1;
	return longitudeZone;
};

/**
 * Transformaci�n mundo a pixel de canvas.
 * @param x, y, z Coordenadas 'x', 'y' y 'z' del punto en el terreno (metros).
 * @param {Array} coef Coeficientes de la transformaci�n.
 * @param {int} ph foto izquierda(0) o derecha (1)
 * @return coordendas x,y en pantalla.
 * @type object
 */
wmsMap.transCoord.tw2c = function( x, y, z, coef, ph){
	var xcur,ycur;
	var pto = {};
	var ptc = {};
	if (coef.x00){
	  var dx = x - parseFloat(coef['x0'+ph]);
	  var dy = y - parseFloat(coef['y0'+ph]);
	  var dz = z - parseFloat(coef['z0'+ph]);
	  
	  daux = -parseFloat(coef['df'+ph]) / ( parseFloat(coef['r'+ph][2]) * dx + parseFloat(coef['r'+ph][5]) * dy + parseFloat(coef['r'+ph][8]) * dz );
	  
	  pto.x = ( parseFloat(coef['r'+ph][0]) * dx + parseFloat(coef['r'+ph][3]) * dy + parseFloat(coef['r'+ph][6]) * dz ) * daux;
	  pto.y = ( parseFloat(coef['r'+ph][1]) * dx + parseFloat(coef['r'+ph][4]) * dy + parseFloat(coef['r'+ph][7]) * dz ) * daux;
	  
	  ptc = wmsMap.tAfinDirect(pto,coef['tx'+ph],coef['ty'+ph],coef['r']);

	  var hMap = YAHOO.util.Dom.getStyle('contIzq','height');
	  if (hMap) ptc.y = parseInt(hMap) - ptc.y;
	}
	else{
		ptc.x = (coef[0+8*ph]*x*100+coef[1+8*ph])/(z*100+coef[2+8*ph])+coef[3+8*ph];
		ptc.y = (coef[4+8*ph]*y*100+coef[5+8*ph])/(z*100+coef[6+8*ph])+coef[7+8*ph];
	}	
	return ptc;
};

/**
 * Transformaci&oacute;n afin. 
 * Ejecuta la transformaci�n directa
 * @param {object} pto Coordenadas x, y  de entrada.
 * @param {Int} tx Translaci&oacute;n en x
 * @param {Int} ty Translaci&oacute;n en y. 
 * @param {Array} vector con los componentes de la matriz de rotaci&oacute;n. En lugar
 *                de ser una matriz es un vector con todos los elementos consecutivos. 
 * @return coordendas x,y salida.
 * @type object
 */
wmsMap.tAfinDirect = function( pto, tx, ty, r ){
	var ptt={};
  ptt.x = parseFloat(r[0]) * pto.x + parseFloat(r[1]) * pto.y + parseFloat(tx);
  ptt.y = parseFloat(r[2]) * pto.x + parseFloat(r[3]) * pto.y + parseFloat(ty);
  
  return ptt;
};

 
/**
 * Transformaci&oacute;n afin. 
 * Ejecuta la transformaci�n inversa
 * @param {object} pto Coordenadas x, y  de entrada.
 * @param {Int} tx Traslaci&oacute;n en x
 * @param {Int} ty Traslaci&oacute;n en y. 
 * @param {Array} vector con los componentes de la matriz de rotaci&oacute;n. En lugar
 *                de ser una matriz es un vector con todos los elementos consecutivos. 
 * @return coordendas x,y salida.
 * @type object
 */
wmsMap.tAfinInver = function( pto, tx, ty, r ){
  var x = pto.x;
  var y = pto.y;
  var ptt={};
  var det = r[0] * r[3] - r[2] * r[1];
  if ( det ) {
    ptt.x = (  parseFloat(r[3]) * x - parseFloat(r[1]) * y - parseFloat(r[3]) * tx + parseFloat(r[1]) * ty ) / det;
    ptt.y = ( -parseFloat(r[2]) * x + parseFloat(r[0]) * y - parseFloat(r[0]) * ty + parseFloat(r[2]) * tx ) / det;
  }
  return ptt;
};
'use strict';
/*
http://pierfrancescosoffritti.github.io/doodles/
	
https://www.arcgis.com/home/webscene/viewer.html?
https://docs.mapbox.com/mapbox-gl-js/example/add-3d-model/
https://maps3d.io/
https://wwwhatsnew.com/2017/01/28/mapas-3d-de-cualquier-parte-del-mundo/
http://graemefulton.com/writings/post/first-person-navigation-with-threejs
	
https://stackoverflow.com/questions/26071490/openlayers-3-how-to-calculate-distance-between-2-points
	
https://visor.grafcan.es/visorweb/
	
https://nagix.github.io/mini-tokyo-3d/#14/35.6814/139.767/0/60
*/
/*Object API*/
//var TR3 = new Object();

TR3.requestDTMwcs = false;

/*Scene Container*/
TR3.scene; TR3.renderer; TR3.camera; TR3.controls; TR3.mesh; TR3.fov = 30;
TR3.sourceFile = false;
TR3.blobs = new Array();
TR3.params;

/*Maps Params*/
TR3.geo2UTM;
TR3.bboxImgOri = []; TR3.srsImg; TR3.widthImg; TR3.heightImg; TR3.tPixImg; TR3.texture; TR3.maxResolMesh = 5; TR3.reducDTM = 1;
TR3.zMin; TR3.zMed; TR3.zMax;
TR3.arrayZ = [];
TR3.zone = [];
TR3.centerZone = [];
TR3.reducMeshW; TR3.reducMeshH;
TR3.timeoutReq = [];
TR3.timeoutReq[1] = 0;
TR3.newMap = false;
TR3.cameraDist = 1;

/*Pscs*/
TR3.pscs = [];
TR3.pscs.physicsWorld;
TR3.pscs.transformAux1 = false;
TR3.pscs.dynamicObjects = [];
TR3.pscs.plasmaBalls = [];
TR3.pscs.emiter = false;
TR3.pscs.emiters = [];
TR3.pscs.bricks = [];
TR3.pscs.rain = [];

/*obj3D files*/
TR3.loadedFiles = [];

/*Load Geometry*/
TR3.newGeom = false;
TR3.cloneObj = false;

//TR3.timeDelta = 0;
//TR3.objectTimePeriod = 3;
//TR3.timeNextSpawn = TR3.timeDelta + TR3.objectTimePeriod;
//TR3.maxNumObjects = 1500;

/*Terrain Container*/
TR3.map; TR3.canvasDest; TR3.loadingDiv;
TR3.canvasDestW; TR3.canvasDestH;//TR3.canvasDestZindex;
TR3.optionsSet = { imgControl: true, cursor3d: false, anaglyph: false, autoRotate: false, wireframeMesh: false, tentative: false, terrain: false };
TR3.valuesSet = { magnification: 'auto', height: 0 };

/*Cursor3d*/
TR3.cursor = { helper: false, setZterr: false, setkCde: false, causeLock: "", event: false, coordClick: false, mouseDownID: false };
TR3.slctBox = new Array();

TR3.newMeshMap = 1;
TR3.oneMeshMap = 2;
TR3.zeroParallax;

/*observer*/
TR3.moveKey = { is: false, size: 1.7, walk: false, azOriAng: 0, walkClicked: false };
TR3.CtrlDargClick = false;
TR3.cameraPositionFar;
TR3.lookAt;

/*Animations*/
TR3.oscillate = [];
TR3.rotate = [];
TR3.scalate = [];
TR3.rotatePart = [];
TR3.lookAtCamera = [];
TR3.idAnimation = -1;
TR3.mixer = new Array();

/*Draw*/
TR3.newDraw = -1;
TR3.vGeom = [];
TR3.vGeom.positions;
TR3.vGeom.measure = false;
TR3.vGeom.polig = false;
TR3.vGeom.newText = false;
TR3.vGeom.newLight = false;
TR3.vGeom.item = [];
TR3.vGeom.item.magni;
TR3.vGeom.item.nPoint = 0;

TR3.vGeom.sprites = [];
TR3.vGeom.lights = [];
TR3.vGeom.obj3d = [];
TR3.vGeom.build = [];

//TR3.sprite = true;
//TR3.featFromOri;

/*SINTETC STEREO*/
TR3.animate = function () {

	//request new frame
	TR3.idAnimation = requestAnimationFrame(TR3.animate);
	TR3.controls.update();
	TR3.renderScene();
	if (TR3.moveKey.is == true) {
		TR3.moveKeyFn();
	}

	//var v = new THREE.Vector3();
	//v.copy(object.position);

	//TR3.steve.position.copy( TR3.camera.position );

	var delta = TR3.clock.getDelta();
	var elapsedTime = TR3.clock.getElapsedTime();

	/*if ( TR3.pscs.dynamicObjects.length < TR3.maxNumObjects && TR3.timeDelta > TR3.timeNextSpawn && TR3.newMeshMap == 0 ) {

		TR3.pscs.rainPhy();
		TR3.timeNextSpawn = TR3.timeDelta + TR3.objectTimePeriod;

	}*/

	TR3.pscs.updatePhysics(delta);

	if (TR3.mixer) {
		for (var i = 0; i < TR3.mixer.length; i++) {
			TR3.mixer[i].update(delta);
		}
	}

	for (var i = 0; i < TR3.oscillate.length; i++) {
		var osciI = TR3.oscillate[i];
		var pos = osciI[0].position;
		var unfix = 0;

		var z = osciI[3] || 0;
		z += Math.sin(elapsedTime * osciI[1] + unfix) * osciI[2];
		pos.y = z;
	}

	for (var i = 0; i < TR3.rotatePart.length; i++) {
		var rotPi = TR3.rotatePart[i];
		var rot = rotPi[0].rotation;
		var unfix = 0;

		var z = rotPi[3] || 0;
		z += Math.sin(elapsedTime * rotPi[1] + unfix) * rotPi[2];
		rot.y = z;
	}

	for (var i = 0; i < TR3.rotate.length; i++) {
		var rotateI = TR3.rotate[i];
		rotateI[0].rotation.y += rotateI[1] || 0.02;
	}

	for (var i = 0; i < TR3.lookAtCamera.length; i++) {
		var lookAtCameraI = TR3.lookAtCamera[i];
		lookAtCameraI.lookAt(TR3.camera.position);
	}

	for (var i = 0; i < TR3.scalate.length; i++) {
		var scalateI = TR3.scalate[i];
		var scale = scalateI[0].scale;
		var y = scalateI[3] || 0;
		y += Math.sin(elapsedTime * scalateI[1]) * scalateI[2];
		scale.x = y;
		scale.y = y;
		scale.z = y;
	}

	if (TR3.pscs.plasmaBalls.length > 0 && TR3.camera.visible == true) {
		for (var i = 0; i < TR3.pscs.plasmaBalls.length; i++) {
			var pbi = TR3.pscs.plasmaBalls[i];
			if (!pbi.colision) {
				var frames = 25;
				var translate = -50 * delta;
				pbi.translateZ(translate);
				if (pbi.cont > frames && !pbi.distFrames) {
					var raycaster = TR3.getRayCaster([pbi.pos, pbi.vector], 'point-vector');

					var selectables = TR3.getSelectableObj();
					selectables.push(TR3.mesh);
					var intersect = TR3.getIntersect(raycaster, selectables)[0][0];
					if (intersect) {
						var distAct = intersect.distance;
						//if(!pbi.distance){pbi.distance = distAct*2;}
						//if(!pbi.distanceTot){pbi.distanceTot = distAct;}
						if (!pbi.distFrames) { pbi.distFrames = -distAct / translate; }
						//if(!pbi.point){pbi.point = intersect.point;}
						/*if(distAct<pbi.distance){
							pbi.cont = 0;
							pbi.pos.set(pbi.position.x,pbi.position.y,pbi.position.z);
							pbi.distance=distAct;
							console.log(distAct);
						}else{
							pbi.position.set(pbi.point.x, pbi.point.y, pbi.point.z);
							pbi.colision=true;
						}*/
					} else {
						pbi.distFrames = 'infinite';
					}

				}

				if (pbi.distFrames && pbi.distFrames != 'infinite' && pbi.distFrames < pbi.cont * parseInt(frames / 4)) {

					if (intersect /*&& intersect.distance < 50*/) {
						pbi.colision = true;
						pbi.position.set(intersect.point.x, intersect.point.y, intersect.point.z);
						//console.log(intersect.distance);
					} else {
						pbi.distFrames = false;
					}

				}
				pbi.cont++;
			}
		}
	}

	//var sky = TR3.scene.getObjectByName("Sky");
	var ray = TR3.sky.material.uniforms["rayleigh"].value;
	var osc = Math.round(TR3.oscillator(elapsedTime * 0.07 + 0.4, 1, 0.3, 0, 0.4) * 10) / 10;
	if (Math.round(elapsedTime * 0.07 * 200) % 9 === 0 && ray != osc) {
		TR3.sky.material.uniforms["rayleigh"].value = osc;
		//console.log(TR3.oscillator(elapsedTime*0.07, 1, 0.3, 0, 0.4));//time, frequency, amplitude, phase, offset
	}

	//TR3.timeDelta += delta;

};

TR3.startAnimation = function (e) {

	TR3.idAnimation = window.requestAnimationFrame(TR3.animate);
};

TR3.stopAnimation = function (e) {

	window.cancelAnimationFrame(TR3.idAnimation);
};

TR3.renderScene = function () {
	TWEEN.update();
	if (TR3.optionsSet.anaglyph && Detector.webgl) {
		TR3.anaglyphRenderer.render(TR3.scene, TR3.camera, TR3.zeroParallax);
	} else {
		TR3.renderer.render(TR3.scene, TR3.camera);
	}
};

TR3.exportGLTF = function (type) {
	var exporter = new Array();
	if(type == 'selected' && TR3.transformControls.object){
		exporter = TR3.transformControls.object;
	}else if (type == 'scene') {
		for (var i = 0; i < TR3.scene.children.length; i++) {
			var obj = TR3.scene.children[i]
			if (obj.type === 'Mesh' || obj.type === 'Group' || obj.type === 'Object3D' || obj.type === "Sprite")
				if( obj.name !== 'TransformControls' && obj.name !== 'G-hills' && obj.name !== 'cursor' && obj.name !== "planetary" && obj.name !== "starField"  && obj.name !== "Sky" && obj.name !== "Compass" && obj.name !== "N" && obj.name !== "S" && obj.name !== "E" && obj.name !== "W")
						exporter.push(exportObjItem(obj));
		};
	} else if(type == 'terrain') {
		exporter = TR3.mesh;
	}

	var gltfExporter = new TR3.GLTFExporter();

	var options = {
		trs: true,
		onlyVisible: true,
		binary: true,
		animations: false,
		maxTextureSize: 1024
	};

	//if(exporter.length > 0 || exporter.type == "Mesh")
	gltfExporter.parse(exporter, function (result) {

		if (result instanceof ArrayBuffer) {

			saveArrayBuffer(result, 'TR3_scene.glb');

		} else {

			var output = JSON.stringify(result, null, 2);
			//console.log( output );
			saveString(output, 'TR3_scene.gltf');

		}

	}, '', options);

	var link = document.createElement('a');
	link.style.display = 'none';
	document.body.appendChild(link); // Firefox workaround, see #6594

	function save(blob, filename) {

		link.href = URL.createObjectURL(blob);
		link.download = filename;
		link.click();

		// URL.revokeObjectURL( url ); breaks Firefox...

	}

	function saveString(text, filename) {

		save(new Blob([text], { type: 'text/plain' }), filename);

	}


	function saveArrayBuffer(buffer, filename) {

		save(new Blob([buffer], { type: 'application/octet-stream' }), filename);

	}

	function exportObjItem(obj3d2Exp) {
		var Obj3d;
		if (obj3d2Exp.type == 'Scene' || obj3d2Exp.type == 'Group') {
			Obj3d = obj3d2Exp;
		} else if (obj3d2Exp.scene) {
			Obj3d = obj3d2Exp.scene;
		}else{
			Obj3d = obj3d2Exp;
		}

		var Obj3dChild = TR3.SkeletonUtilsClone(Obj3d);//https://github.com/mrdoob/three.js/issues/11574

		return Obj3dChild;
	}

};/**
 * @author mrdoob / http://mrdoob.com/
 * @author marklundin / http://mark-lundin.com/
 * @author alteredq / http://alteredqualia.com/
 */
'use strict';
TR3.AnaglyphEffect = function ( renderer, width, height ) {

	var eyeRight = new THREE.Matrix4();
	var eyeLeft = new THREE.Matrix4();
	var _zeroParallax = 200;
	var focalLength = 200;
	var _aspect, _near, _far, _fov;

	var _cameraL = new THREE.PerspectiveCamera();
	_cameraL.matrixAutoUpdate = false;

	var _cameraR = new THREE.PerspectiveCamera();
	_cameraR.matrixAutoUpdate = false;

	var _camera = new THREE.OrthographicCamera( -1, 1, 1, - 1, 0, 1 );

	var _scene = new THREE.Scene();

	var _params = { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter, format: THREE.RGBAFormat };

	if ( width === undefined ) width = 512;
	if ( height === undefined ) height = 512;

	var _renderTargetL = new THREE.WebGLRenderTarget( width, height, _params );
	var _renderTargetR = new THREE.WebGLRenderTarget( width, height, _params );
	
	this.getAnaglyphColors = function() {
	
		var anaglyphType = '';
		if(TR3){anaglyphType = TR3.anaglyphType};
		//optimiced
		var AnaglyphColor = {
				lr1: "0.0", lg1: "0.7", lb1: "0.3",
				rr2: "0.0", rg2: "1.0", rb2: "0.0",
				rr3: "0.0", rg3: "0.0", rb3: "1.0"
		}
		
		switch (anaglyphType){
			case "normal":
				AnaglyphColor = {
					lr1: "1.0", lg1: "0.0", lb1: "0.0",
					rr2: "0.0", rg2: "1.0", rb2: "0.0",
					rr3: "0.0", rg3: "0.0", rb3: "1.0"
				}
			break;
			case "half":
				AnaglyphColor = {
					lr1: "0.299", lg1: "0.587", lb1: "0.114",
					rr2: "0.0", rg2: "1.0", rb2: "0.0",
					rr3: "0.0", rg3: "0.0", rb3: "1.0"
				}
			break;
			case "gray":
				AnaglyphColor = {
					lr1: "0.299", lg1: "0.587", lb1: "0.114",
					rr2: "0.299", rg2: "0.587", rb2: "0.114",
					rr3: "0.299", rg3: "0.587", rb3: "0.114"
				}
			break;
		}
		
		return(AnaglyphColor);
	}
	
	//var anaglyphColor = this.getAnaglyphColors();
	
	this.getFragmentShader = function() {
		var anaglyphColor = this.getAnaglyphColors();
		var _fragmentShader = [

			"uniform sampler2D mapLeft;",
			"uniform sampler2D mapRight;",
			"varying vec2 vUv;",

			"void main() {",

			"	vec4 colorL, colorR;",
			"	vec2 uv = vUv;",

			"	colorL = texture2D( mapLeft, uv );",
			"	colorR = texture2D( mapRight, uv );",

				// http://3dtv.at/Knowhow/AnaglyphComparison_en.aspx

			"	gl_FragColor = vec4( colorL.r * "+ anaglyphColor.lr1 +" + colorL.g * "+ anaglyphColor.lg1 +" + colorL.b * "+ anaglyphColor.lb1 +", colorR.r * "+ anaglyphColor.rr2 +" + colorR.g * "+ anaglyphColor.rg2 +" + colorR.b * "+ anaglyphColor.rb2 +", colorR.r * "+ anaglyphColor.rr3 +" + colorR.g * "+ anaglyphColor.rg3 +" + colorR.b * "+ anaglyphColor.rb3 +", colorL.a + colorR.a ) * 1.1;",

			"}"

		].join("\n");
		
		if( TR3 && TR3.anaglyphType == "interlaced" ) {
		
			_fragmentShader = [

				"uniform sampler2D mapLeft;",
				"uniform sampler2D mapRight;",
				"varying vec2 vUv;",

				"void main() {",


				"	vec2 uv = vUv;",

				"	if ( ( mod( gl_FragCoord.y, 2.0 ) ) < 1.00 ) {",

				"		gl_FragColor = texture2D( mapRight, uv );",

				"	} else {",



				"		gl_FragColor = texture2D( mapLeft, uv );",


				"	}",


				"}"

			].join("\n")
		
		} else if( TR3 && TR3.anaglyphType == "interlaced swap" ){
		
			_fragmentShader = [

				"uniform sampler2D mapLeft;",
				"uniform sampler2D mapRight;",
				"varying vec2 vUv;",

				"void main() {",


				"	vec2 uv = vUv;",

				"	if ( ( mod( gl_FragCoord.y, 2.0 ) ) < 1.00 ) {",

				"		gl_FragColor = texture2D( mapLeft, uv );",

				"	} else {",



				"		gl_FragColor = texture2D( mapRight, uv );",


				"	}",


				"}"

			].join("\n")
		
		}
		
		return _fragmentShader;
	}
	
	var _material = new THREE.ShaderMaterial( {

		uniforms: {

			"mapLeft": { type: "t", value: _renderTargetL },
			"mapRight": { type: "t", value: _renderTargetR }

		},

		vertexShader: [

			"varying vec2 vUv;",

			"void main() {",

			"	vUv = vec2( uv.x, uv.y );",
			"	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

			"}"

		].join("\n"),

		fragmentShader: this.getFragmentShader()/*[

			"uniform sampler2D mapLeft;",
			"uniform sampler2D mapRight;",
			"varying vec2 vUv;",

			"void main() {",

			"	vec4 colorL, colorR;",
			"	vec2 uv = vUv;",

			"	colorL = texture2D( mapLeft, uv );",
			"	colorR = texture2D( mapRight, uv );",

				// http://3dtv.at/Knowhow/AnaglyphComparison_en.aspx

			"	gl_FragColor = vec4( colorL.r * "+ anaglyphColor.lr1 +" + colorL.g * "+ anaglyphColor.lg1 +" + colorL.b * "+ anaglyphColor.lb1 +", colorR.r * "+ anaglyphColor.rr2 +" + colorR.g * "+ anaglyphColor.rg2 +" + colorR.b * "+ anaglyphColor.rb2 +", colorR.r * "+ anaglyphColor.rr3 +" + colorR.g * "+ anaglyphColor.rg3 +" + colorR.b * "+ anaglyphColor.rb3 +", colorL.a + colorR.a ) * 1.1;",

			"}"

		].join("\n")*/
	} );

	var mesh = new THREE.Mesh( new THREE.PlaneGeometry( 2, 2 ), _material );
	_scene.add( mesh );

	this.setSize = function ( width, height ) {

		if ( _renderTargetL ) _renderTargetL.dispose();
		if ( _renderTargetR ) _renderTargetR.dispose();
		_renderTargetL = new THREE.WebGLRenderTarget( width, height, _params );
		_renderTargetR = new THREE.WebGLRenderTarget( width, height, _params );

		_material.uniforms[ "mapLeft" ].value = _renderTargetL.texture;
		_material.uniforms[ "mapRight" ].value = _renderTargetR.texture;

		renderer.setSize( width, height );

	};

	/*
	 * Renderer now uses an asymmetric perspective projection
	 * (http://paulbourke.net/miscellaneous/stereographics/stereorender/).
	 *
	 * Each camera is offset by the eye seperation and its projection matrix is
	 * also skewed asymetrically back to converge on the same projection plane.
	 * Added a focal length parameter to, this is where the parallax is equal to 0.
	 */

	this.render = function ( scene, camera, zeroParallax ) {

		var currentRenderTarget = renderer.getRenderTarget();

		scene.updateMatrixWorld();

		if ( camera.parent === null ) camera.updateMatrixWorld();

		var hasCameraChanged = ( _aspect !== camera.aspect ) || ( _near !== camera.near ) || ( _far !== camera.far ) || ( _fov !== camera.fov ) ||
                            	( _zeroParallax !== zeroParallax );

		if ( hasCameraChanged ) {

			_aspect = camera.aspect;
			_near = camera.near;
			_far = camera.far;
			_fov = camera.fov;
			_zeroParallax = zeroParallax;
			focalLength = _zeroParallax;

			var projectionMatrix = camera.projectionMatrix.clone();
			var eyeSep = focalLength / 30 * 0.5;
			var eyeSepOnProjection = eyeSep * _near / focalLength;
			var ymax = _near * Math.tan( THREE.MathUtils.degToRad( _fov * 0.5 ) );
			var xmin, xmax;

			// translate xOffset

			eyeRight.elements[12] = eyeSep;
			eyeLeft.elements[12] = -eyeSep;

			// for left eye

			xmin = -ymax * _aspect + eyeSepOnProjection;
			xmax = ymax * _aspect + eyeSepOnProjection;

			projectionMatrix.elements[0] = 2 * _near / ( xmax - xmin );
			projectionMatrix.elements[8] = ( xmax + xmin ) / ( xmax - xmin );

			_cameraL.projectionMatrix.copy( projectionMatrix );

			// for right eye

			xmin = -ymax * _aspect - eyeSepOnProjection;
			xmax = ymax * _aspect - eyeSepOnProjection;

			projectionMatrix.elements[0] = 2 * _near / ( xmax - xmin );
			projectionMatrix.elements[8] = ( xmax + xmin ) / ( xmax - xmin );

			_cameraR.projectionMatrix.copy( projectionMatrix );
			
		}
		//My updates-->
		_cameraL.matrixWorld.copy( camera.matrixWorld ).multiply( eyeLeft );
		_cameraL.position.copy( camera.position );
		_cameraL.near = camera.near;
		_cameraL.far = camera.far;
		
		renderer.setRenderTarget( _renderTargetL );
		renderer.clear();
		renderer.render( scene, _cameraL);

		_cameraR.matrixWorld.copy( camera.matrixWorld ).multiply( eyeRight );
		_cameraR.position.copy( camera.position );
		_cameraR.near = camera.near;
		_cameraR.far = camera.far;
		
		renderer.setRenderTarget( _renderTargetR );
		renderer.clear();
		renderer.render( scene, _cameraR);

		renderer.setRenderTarget( null );
		renderer.render( _scene, _camera );
		renderer.setRenderTarget( currentRenderTarget );
		//<--
	};

	this.dispose = function() {
	
		if ( _renderTargetL ) _renderTargetL.dispose();
		if ( _renderTargetR ) _renderTargetR.dispose();
	}
	
	//Modifica los colores del Anaglifo
	this.updateAnaglyphType = function( scene, camera ) {
		
		var anaglyphColor = this.getAnaglyphColors();

		_material.fragmentShader = this.getFragmentShader();/*[
			"uniform sampler2D mapLeft;",
			"uniform sampler2D mapRight;",
			"varying vec2 vUv;",
			
			"void main() {",

			"	vec4 colorL, colorR;",
			"	vec2 uv = vUv;",
			"	colorL = texture2D( mapLeft, uv );",
			"	colorR = texture2D( mapRight, uv );",
	
			"	gl_FragColor = vec4( colorL.r * "+ anaglyphColor.lr1 +" + colorL.g * "+ anaglyphColor.lg1 +" + colorL.b * "+ anaglyphColor.lb1 +", colorR.r * "+ anaglyphColor.rr2 +" + colorR.g * "+ anaglyphColor.rg2 +" + colorR.b * "+ anaglyphColor.rb2 +", colorR.r * "+ anaglyphColor.rr3 +" + colorR.g * "+ anaglyphColor.rg3 +" + colorR.b * "+ anaglyphColor.rb3 +", colorL.a + colorR.a ) * 1.1;",
									
			"}"
		].join("\n")*/	
			
		_material.needsUpdate = true;
		
		this.render( scene, camera, _zeroParallax );
	
	};
	
};
'use strict';
TR3.getIntersect = function (raycaster, objSlct) {
	//if(TR3.vGeom.build.length>0){objSlct = TR3.vGeom.build};
	var obj3d = false;
	var intersects = false;
	var color = 0xffffff;
	var intsct = new Array();

	for (var i = 0; i < objSlct.length; i++) {
		var oSlcti = objSlct[i];
		var oSlctiChild = oSlcti;

		if (oSlcti.scene) {
			oSlctiChild = oSlcti.scene;
		} else if (oSlcti.parent && oSlcti.parent.scene) {
			oSlctiChild = oSlcti.parent.scene;
		}

		if (oSlctiChild)
			intsct = raycaster.intersectObject(oSlctiChild, true);
		if (intsct.length == 0) {
			//if (oSlcti.autoRotation == 0.00000000001) { oSlcti.autoRotation = true; }
		}
		if (intsct.length > 0 && TR3.slctBox.length === 0) {
			obj3d = oSlcti;
			intersects = intsct;

			TR3.intersectEvOver(obj3d);

			if (TR3.optionsSet.tentative && oSlctiChild.TR3 && oSlctiChild.TR3.hitbox) {

				/*if (oriScale.length < 4) { oriScale[3] = 'XYZ'; }
				if (oriScale === false) { oriScale[3] = ''; }
				var OS3 = oriScale[3].toLowerCase();
				if (OS3.indexOf('x') > -1) {
					oSlctiChild.scale.x = oSlctiChild.scale.x * 1.3;
				}
				if (OS3.indexOf('y') > -1) {
					oSlctiChild.scale.y = oSlctiChild.scale.y * 1.3;
				}
				if (OS3.indexOf('z') > -1) {
					oSlctiChild.scale.z = oSlctiChild.scale.z * 1.3;
				}*/

				/*function center (obj) {
					var scale = obj.scale;
					var box = obj.TR3.box;
					var objectCenter = new THREE.Vector3();
					objectCenter.x = (box.min.x + box.max.x)*scale.x/2;
					objectCenter.y = (box.min.y + box.max.y)*scale.y/2;
					objectCenter.z = (box.min.z + box.max.z)*scale.z/2;
					console.log('This is the center of your Object3D:', objectCenter );
					obj.position.sub( objectCenter ); // center the model
				}

				center(oSlctiChild);*/

				var hb = oSlctiChild.TR3.hitbox;
				var box = oSlctiChild.TR3.box;
				var scle = oSlctiChild.scale;
				var pos = oSlctiChild.position;
				var q = oSlctiChild.quaternion;

				if (typeof oSlctiChild.TR3.floorMesh !== 'undefined' && typeof oSlctiChild.TR3.floorMesh == 'number') { color = 0x777777; }
				if (typeof oSlctiChild.TR3.transformMesh !== 'undefined' && typeof oSlctiChild.TR3.transformMesh == 'number') { color = 0x0000ff; }
				if (typeof oSlctiChild.TR3.mass !== 'undefined' && typeof oSlctiChild.TR3.mass == 'number') { color = 0x00ff00; }

				var geom = new THREE.BoxGeometry(hb.x * scle.x, hb.y * scle.y, hb.z * scle.z);

				// wireframe
				var geomLine = new THREE.EdgesGeometry(geom); // or WireframeGeometry
				var matLine = new THREE.LineBasicMaterial({ color: color });
				var wireframeLineBox = new THREE.LineSegments(geomLine, matLine);
				//wireframeLineBox.position.set(pos.x, pos.y, pos.z);
				wireframeLineBox.position.set(pos.x + (box.max.x + box.min.x) * scle.x / 2, pos.y + (box.max.y + box.min.y) * scle.y / 2, pos.z + (box.max.z + box.min.z) * scle.z / 2);
				wireframeLineBox.quaternion.set(q.x, q.y, q.z, q.w);

				TR3.slctBox.push(wireframeLineBox);
				for (var j = 0; j < TR3.slctBox.length; j++) {
					TR3.scalate.push([TR3.slctBox[j], 6, 0.1, 1]);
					TR3.scene.add(TR3.slctBox[j]);
				}
			}
			i = objSlct.length;

		} else if (intsct.length < 1) {
			if (TR3.slctBox.length > 0) {

				/*if (oriScale.length < 4) { oriScale[3] = 'XYZ'; }
				if (oriScale === false) { oriScale[3] = ''; }
				var OS3 = oriScale[3].toLowerCase();
				if (OS3.indexOf('x') > -1) {
					oSlctiChild.scale.x = oSlctiChild.scale.x / 1.3;
				}
				if (OS3.indexOf('y') > -1) {
					oSlctiChild.scale.y = oSlctiChild.scale.y / 1.3;
				}
				if (OS3.indexOf('z') > -1) {
					oSlctiChild.scale.z = oSlctiChild.scale.z / 1.3;
				}*/

				for (var j = 0; j < TR3.slctBox.length; j++) {
					TR3.scene.remove(TR3.slctBox[j]);
				}
				TR3.slctBox = new Array();
			}
		} else {
			obj3d = oSlcti;
			if (!intersects) { intersects = intsct; }
			if (intersects[0].point.y < intsct[0].point.y) {
				intersects = intsct;
			}
		}
	}
	return [intersects/*, obj3d*/];
};

TR3.getRayCaster = function (event, mode, near, far) {

	var farRay = far || 1300000;
	var nearRay = near || 0;
	var start;
	var directionVector;

	if (!mode) {
		var getRayCam = getRayCaster_EventCam(event, farRay);
		start = getRayCam[0];
		directionVector = getRayCam[1];
	} else if (mode == 'point-point') {
		start = event[0];
		var end = new THREE.Vector3().copy(event[1]);

		directionVector = end.sub(start);
	} else if (mode == 'point-camera') {
		start = event[0];
		directionVector = new THREE.Vector3();

		TR3.camera.getWorldDirection(directionVector);
	} else if (mode == 'point-vector') {
		start = event[0];
		directionVector = new THREE.Vector3().copy(event[1]);
	}

	var raycasterRtrn = new THREE.Raycaster(start, directionVector.normalize(), nearRay, farRay);

	return raycasterRtrn;

	function getRayCaster_EventCam(event) {

		var contDiv = TR3.map;
		var contTop = contDiv.offsetTop;
		var contLeft = contDiv.offsetLeft;
		while (contDiv.parentElement) {
			contDiv = contDiv.parentElement;
			contTop += contDiv.offsetTop;
			contLeft += contDiv.offsetLeft;
		}

		//TR3.scene.add( TR3.cursor.helper );
		var evtX;
		var evtY;
		if (event && event.touches && event.touches.length > 0) {
			evtX = event.touches[0].clientX;
			evtY = event.touches[0].clientY;
		} else if (event) {
			evtX = event.clientX;
			evtY = event.clientY;
		} else {
			evtX = TR3.canvasDestW * 0.5
			evtY = TR3.canvasDestH * 0.5
			contLeft = 0;
			contTop = 0;
		}

		var mouseX = ((evtX - contLeft) / TR3.canvasDestW) * 2 - 1;
		var mouseY = -((evtY - contTop) / TR3.canvasDestH) * 2 + 1;

		var vector = new THREE.Vector3(mouseX, mouseY, TR3.camera.near);
		vector.unproject(TR3.camera);

		var cPos = TR3.camera.position;

		//var raycaster = new THREE.Raycaster(cPos, vector.sub(cPos).normalize(),0,farRay);
		//raycaster.firstHitOnly = true;

		return [cPos, vector.sub(cPos)];
	};

};

TR3.onIntersect = function (event) {
	var raycaster;
	var intersects;

	if (TR3.optionsSet.cursor3d) {
		raycaster = TR3.getRayCaster(event);
		intersects = TR3.getIntersect(raycaster, [TR3.mesh])[0];
		//TR3.cursor.helper.hideShadowBase();
		// Toggle rotation bool for meshes that we clicked
		if (intersects.length > 0) {

			//var interSct = intersects[0];
			var interSctPt = intersects[0].point;
			//var face = interSct.face;
			//var obj = interSct.object;
			//var geom = TR3.mesh.geometry;
			var valZ = interSctPt.y;
			var valZ2 = false;
			//var zTerr = TR3.cursor.setZterr;

			/*if (Number.isInteger(zTerr) && TR3.cursor.setkCde == 18) {
				//-->Tool edit mesh
				// specify the desired face index
				var faceIndex = interSct.faceIndex; // [ 0 ... num_faces-1 ]
				var faces = 3;
				// specify which face vertex you want
				// [ 0 or/and 1 or/and 2 ] ==> i
				// compute the index where the data is stored

				valZ = TR3.zM2T(zTerr, true);

				for (var i = 0; i < faces + 1; i++) {
					var index = geom.index.array[faces * faceIndex + i];

					geom.attributes.position.setY(index, valZ);
					TR3.arrayZ[index] = valZ;
				}
				geom.attributes.position.needsUpdate = true;
				//<--Tool edit mesh
			} else if (Number.isInteger(zTerr) && TR3.cursor.setkCde == 16) {
				valZ = TR3.zM2T(zTerr, true);
				valZ2 = valZ;
				//TR3.cursor.helper.showShadowBase();
			}*/

			TR3.cursor.helper.position.set(interSctPt.x, valZ, interSctPt.z);
			TR3.redrawInfo(interSctPt.x, interSctPt.y, interSctPt.z, valZ2);
		}
	} else {
		var selectables = TR3.getSelectableObj();
		if (selectables.length > 0 && TR3.optionsSet.tentative) {
			raycaster = TR3.getRayCaster(event);
			intersects = TR3.getIntersect(raycaster, selectables);
		}
	}

	TR3.cursor.event = event;
};

TR3.getSelectableObj = function () {

	var objts = TR3.vGeom.obj3d;
	var selectable = new Array();
	for (var i = 0; i < objts.length; i++) {
		if (objts[i].scene && objts[i].scene.TR3 && objts[i].scene.TR3.slctItem) { selectable.push(objts[i]); }
		else if (objts[i] && objts[i].TR3 && objts[i].TR3.slctItem) { selectable.push(objts[i]); }
	}
	return selectable;
};

TR3.redrawInfo = function (X, Y, Z, Zcur) {

	var mapCoor = TR3.getCoordsByXYmod(X, Z, false);

	var Xmap = mapCoor[0];
	var Ymap = mapCoor[1];
	var Zmap = mapCoor[2];
	var zInc = 0;

	var tPixMesh = TR3.formatMeasure(TR3.tPixMesh);
	if (Zcur) {
		zInc = Zcur - Zmap;
	}

	TR3.XYZ2Clip = [(Xmap).toFixed(3), (Ymap).toFixed(3), (Zmap).toFixed(2)];
	var info = '<b>Project: ' + proj4.Proj(TR3.srsImg).projName + ' - Datum:' + proj4.Proj(TR3.srsImg).title + '</b><br><b>X:</b> ' + TR3.XYZ2Clip[0] + '<br><b>Y:</b> ' + TR3.XYZ2Clip[1] + '<br><b>Z:</b> ' + TR3.XYZ2Clip[2] + '&nbsp;&nbsp;&nbsp;<b>±Zcur:</b> ' + (zInc * TR3.adjustScale).toFixed(2) + ' m' + '&nbsp;&nbsp;&nbsp;<b>Malla:</b> ' + (tPixMesh[0] * 1 / TR3.adjustScale).toFixed(2) + ' ' + tPixMesh[1];
	document.getElementById('infoGeo3d').innerHTML = info;
};

TR3.zCursor = function (delta) {

	var helpPos = TR3.cursor.helper.position;
	var helpPosY = TR3.zM2T(helpPos.y);
	var tPixMesh = delta * TR3.getSizePix();

	var valZterr = helpPosY + tPixMesh;
	var valZMod = TR3.zM2T(valZterr, true);

	helpPos.set(helpPos.x, valZMod, helpPos.z)
	TR3.redrawInfo(helpPos.x, helpPos.y, helpPos.z, valZterr);

	//TR3.cursor.helper.showShadowBase();

	TR3.optionsSet.cursor3d = false;
	setTimeout(function () {
		TR3.optionsSet.cursor3d = true;
	}, 3000);

};

TR3.click_Obj3d = function (evt) {

	var flagAnalglyph = true;
	var raycaster = TR3.getRayCaster(evt);
	var intersects = TR3.getIntersect(raycaster, [TR3.mesh]);
	var cPos = TR3.camera.position;
	TR3.cursor.coordClick = new THREE.Vector3();

	if (intersects.length > 0 && intersects[0].length) {
		var terr = intersects[0][0];
		TR3.cursor.coordClick.x = terr.point.x;
		TR3.cursor.coordClick.y = terr.point.y;
		TR3.cursor.coordClick.z = terr.point.z;
	} else {
		TR3.cursor.coordClick = false;
		console.log("Fail Position!");
	}

	if (!TR3.CtrlDargClick && TR3.optionsSet.tentative) {

		var selectables = TR3.getSelectableObj();
		//selectables.push(TR3.mesh);
		if (selectables.length > 0) {
			var raycaster = TR3.getRayCaster(evt);
			var inter = TR3.getIntersect(raycaster, selectables);
			if (inter[0] && TR3.cursor.mouseDownID === inter[0][0].object.uuid) {
				//inter[0][0].slctItem = inter[1].userData.slctItem;
				var request = { intersect: inter[0]/*, obj3d: inter[1]*/ };
				TR3.intersectEvClick(request);
				if (TR3.optionsSet.anaglyph === true) {
					TR3.zeroParallax = cPos.distanceTo(inter[0][0].point);
					flagAnalglyph = false;
				}
				return true;
			}
		}
	}
	
	TR3.CtrlDargClick = false;
	if (flagAnalglyph) {
		if (TR3.optionsSet.anaglyph === true && TR3.transformControls.visible == false) {
			TR3.zeroParallax = cPos.distanceTo(intersects[0][0].point);
		}
	}

	if (TR3.newGeom == true) {
		TR3.setGeomBySelect();
		TR3.canvasDest.style.cursor = "default";
		TR3.newGeom = false;
	}

	if (TR3.sourceFile) {
		TR3.loadFile({ slctItem: true });
		TR3.canvasDest.style.cursor = "default";
	}

	if (TR3.pscs.emiter == true) {
		TR3.pscs.setEmisor();
		//flag = true;
	}

	if (TR3.cloneObj == true) {
		var obj3d = TR3.transformControls.object;
		if (obj3d)
			TR3.setCloneObj(obj3d);
		else {
			TR3.cloneObj = false;
			TR3.canvasDest.style.cursor = "default";
		}
	}

	if (TR3.moveKey.walkClicked == true) {
		TR3.moving = true;
		TR3.personViewFn();
		TR3.moveKey.walk = true;
		TR3.moveKey.walkClicked = false;
		TR3.canvasDest.style.cursor = "default";
	}

	if (TR3.vGeom.newText == true) {
		var newText = document.getElementById("inputTextInto").value;
		if (newText != "") {
			var fSprite = TR3.formatedText(newText);
			TR3.scene.add(fSprite);
			TR3.vGeom.newText = false;
			TR3.transCtrlsEnabled(fSprite);

			TR3.onCreateItem(fSprite);
			TR3.canvasDest.style.cursor = "default";
		}
	}

	if (TR3.vGeom.newLight == true) {
		var color = $("#minicolorLight").val() || '#ffffff';
		var intensLight = document.getElementById("intensLight").value || 1;
		var distLight = document.getElementById("distLight").value || 100;

		var light = TR3.setLight(color, intensLight, distLight);
		light[0].position.set(TR3.cursor.coordClick.x, TR3.cursor.coordClick.y, TR3.cursor.coordClick.z);
		TR3.scene.add(light[0]);
		TR3.scene.add(light[1]);

		TR3.transCtrlsEnabled(light[0]);

		TR3.onCreateItem(light[0]);
		TR3.vGeom.newLight = false;
		TR3.canvasDest.style.cursor = "default";
	}



	if (TR3.cursor.helper.visible && TR3.vGeom.positions && TR3.newDraw != -1 && TR3.vGeom.item.length > 0) {
		TR3.addPoint();
	}

	/*if (TR3.transformControls.active == false && flag == false) {
		TR3.transCtrlsEnabled(false);
	}*/

	TR3.controls.active = false;
	TR3.setOpts({ autoRotate: false });
};

TR3.setCoods2clip = function (evt) {
	evt.preventDefault();
	if (TR3.XYZ2Clip) {
		var XYZ = document.getElementById('inputTextInto');
		XYZ.value = TR3.XYZ2Clip.toString();
		XYZ.select();
		document.execCommand("copy");
	}
};'use strict';
TR3.decorations = function(hills, starfield, planets, compass){
    var radius = 1300000;

    if(hills != false)
        TR3.setHills();
    if(starfield != false)
        TR3.setStarField(radius);
    if(planets != false)
        TR3.setPlanets(radius);
    if(compass != false)
	    TR3.setCompass();
};

TR3.setHills = function () {
    var hills = {
        src: TR3.config.src + 'hills.glb',
        scale: [Math.abs(TR3.zone[2]-TR3.zone[0])*0.8, Math.abs(TR3.zone[2]-TR3.zone[0])*0.8, Math.abs(TR3.zone[3]-TR3.zone[1])*0.8],
        pos: [TR3.centerZone[0], TR3.centerZone[1], TR3.zMed],
        aRotate: false,
        name: "Decoration",
        slctItem: false
    };

    TR3.loadFile(hills).then(function (obj) {
        obj[0].scene.name = "hills";
        var hitbox = TR3.getSizeObj(obj[0].scene);
        obj[0].scene.position.y = -hitbox[4].y/2;
        obj[0].scene.rotateY(Math.PI);

        var group = new THREE.Group();
        group.name = "G-hills";
        group.add( obj[0].scene );

        TR3.scene.add(group);
        //shadow.visible = true;
    });
};

TR3.setStarField = function (radius) {
    TR3.txtObject('N', "#888888", 30000, [0, 200000, 0 - radius], 0).then(function (meshTXT) {
        TR3.scene.add(meshTXT);
    });
    TR3.txtObject('S', "#888888", 30000, [0, 200000, 0 + radius], Math.PI).then(function (meshTXT) {
        TR3.scene.add(meshTXT);
    });
    TR3.txtObject('E', "#888888", 30000, [0 + radius, 200000, 0], -Math.PI / 2).then(function (meshTXT) {
        TR3.scene.add(meshTXT);
    });
    TR3.txtObject('W', "#888888", 30000, [0 - radius, 200000, 0], Math.PI / 2).then(function (meshTXT) {
        TR3.scene.add(meshTXT);
    });

    /*Planetary*/
    var starsGeometry = new THREE.BufferGeometry();//http://blog.cjgammon.com/threejs-geometry
    var stars = [];

    for (var i = 0; i < 600; i++) {
        var star = new THREE.Vector3();
        var lon = THREE.MathUtils.randFloat(0, 2 * Math.PI);
        var lat = THREE.MathUtils.randFloat(-Math.PI / 2, Math.PI / 2);

        star.x = radius * Math.sin(lon) * Math.cos(lat);
        star.y = radius * Math.sin(lon) * Math.sin(lat);
        star.z = radius * Math.cos(lon);
        stars.push(star);
    }

    starsGeometry.setFromPoints(stars);
    var starsMaterial = new THREE.PointsMaterial({ color: '#cccc88', size: 15000 });
    var starField = new THREE.Points(starsGeometry, starsMaterial);
    starField.name = 'starField';
    //starField.rotation.x = Math.PI / 2;
    //TR3.scene.add(starField);

    TR3.scene.add(starField);
};

TR3.setPlanets = function (radius) {

    var planetaryCenter = new THREE.BoxGeometry(0.01, 0.01, 0.01);
    var planetaryMaterial = new THREE.MeshBasicMaterial({});
    var planetary = new THREE.Mesh(planetaryCenter, planetaryMaterial);
    planetary.name = 'planetary';
    planetary.rotateX(Math.PI / 20);

    var planetSize = 50000;
    var planetGeometry = new THREE.IcosahedronGeometry(planetSize, 3);
    var planetMaterial = new THREE.MeshLambertMaterial({//http://threegraphs.com/charts/sample/world/
        //ambient : 0x444444,
        color: 0xaaaa5d,
        //shininess : 40, 
        //specular : 0x222222,
        //flatShading : THREE.SmoothShading,
        //side: THREE.DoubleSide,
        //map:matDif,
        //bumpMap:mapBump,
        //bumpScale: 10
    });
    var planet = new THREE.Mesh(planetGeometry, planetMaterial);
    planet.position.x = radius - planetSize;

    var ringPlanetGeometry = new THREE.RingGeometry(planetSize + 10000, planetSize + 40000, 32);
    var ringPlanetMaterial = new THREE.MeshLambertMaterial({//http://threegraphs.com/charts/sample/world/
        //ambient : 0x444444,
        color: 0xcccccc,
        //shininess : 40, 
        //specular : 0x222222,
        //flatShading : THREE.SmoothShading,
        side: THREE.DoubleSide,
        //map:matDif,
        //bumpMap:mapBump,
        //bumpScale: 10
    });
    var ringPlanet = new THREE.Mesh(ringPlanetGeometry, ringPlanetMaterial);
    ringPlanet.rotateX(Math.PI / 1.5);

    planet.add(ringPlanet);
    planetary.add(planet);
    TR3.rotate.push([planet, 0.01]);

    var planet2Material = new THREE.MeshLambertMaterial({//http://threegraphs.com/charts/sample/world/
        //ambient : 0x444444,
        color: 0xcccccc,
        //shininess : 40, 
        //specular : 0x222222,
        //flatShading : THREE.SmoothShading,
        //side: THREE.DoubleSide,
        //map:matDif,
        //bumpMap:mapBump,
        //bumpScale: 10
    });
    var planet2 = new THREE.Mesh(planetGeometry, planet2Material);
    planet2.position.x = -radius + planetSize;

    var ringPlanet2Material = new THREE.MeshLambertMaterial({//http://threegraphs.com/charts/sample/world/
        //ambient : 0x444444,
        color: 0xaaaa5d,
        //shininess : 40, 
        //specular : 0x222222,
        //flatShading : THREE.SmoothShading,
        side: THREE.DoubleSide,
        //map:matDif,
        //bumpMap:mapBump,
        //bumpScale: 10
    });
    var ringPlanet2 = new THREE.Mesh(ringPlanetGeometry, ringPlanet2Material);
    ringPlanet2.rotateX(Math.PI / 1.5);

    planet2.add(ringPlanet2);
    planetary.add(planet2);
    TR3.rotate.push([planet2, 0.01]);

    TR3.rotate.push([planetary, 0.001]);
    
    TR3.scene.add(planetary);
};

TR3.setCompass = function () {

    var dist = TR3.getCoordsDistance([TR3.zone[0], TR3.zone[1]], [TR3.zone[2], TR3.zone[3]]) / 1.5;
    var z = TR3.zM2T(TR3.zMin, true);
    var geometry = new THREE.RingGeometry(dist / 1.1, dist, 32);
    var material = new THREE.MeshBasicMaterial({ color: 0xF2E6FF, transparent: true, opacity: 0.5 });
    var circle = new THREE.Mesh(geometry, material);
    circle.name = "Compass";
    var semisphere = TR3.setGeometry({ geometry: "semisphere", radius: dist / 1.1 },new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.BackSide }));
    circle.add(semisphere);

    //circle.renderOrder = 100;
    circle.position.y = z * TR3.valuesSet.magnification - 5;
    circle.rotateX(3 * Math.PI / 2);
    circle.rotateZ(0.92);

    TR3.txtObject('- N -', "#888888", dist / 15, [0, z, 0 - dist], 0).then(function (meshTXT) {
        TR3.scene.add(meshTXT)
    });
    TR3.txtObject('- S -', "#888888", dist / 15, [0, z, 0 + dist], Math.PI).then(function (meshTXT) {
        TR3.scene.add(meshTXT)
    });
    TR3.txtObject('- E -', "#888888", dist / 15, [0 + dist, z, 0], -Math.PI / 2).then(function (meshTXT) {
        TR3.scene.add(meshTXT)
    });
    TR3.txtObject('-W-', "#888888", dist / 15, [0 - dist, z, 0], Math.PI / 2).then(function (meshTXT) {
        TR3.scene.add(meshTXT)
    });

    var geoLine = new THREE.WireframeGeometry(geometry); // or WireframeGeometry
    var matLine = new THREE.LineBasicMaterial({ color: 0xCCCCCC });
    var wireframeLine = new THREE.Line(geoLine, matLine);
    circle.add(wireframeLine);

    TR3.scene.add(circle);
};'use strict';
/*DRAW-->*/
// update line
TR3.updateVgeom = function () {
	var thisLine = TR3.vGeom.item[TR3.vGeom.item.length - 1];
	var txtMetric = TR3.getMetrics(thisLine);
	for (var i = 0; i < txtMetric.length; i++) {
		var posSprite = txtMetric[i][1] || TR3.cursor.coordClick;
		posSprite.inv = true;
		var TXTpms = {
			text: txtMetric[i][0],
			//font: { fontFace: "Arial", fontSize: 29, backgroundColor: {r:200, g:250, b:200, a:0.8}, bold: false }, 
			pos: posSprite,
			//canvas: { text_Width:292, text_Height:146, scale:1000, borderColor: {r:100, g:200, b:100, a:1.0}, borderThickness: 1 },
			//center: true
		};
		var spritey = TR3.makeTextSprite(TXTpms);
		TR3.scene.add(spritey);
	}
	TR3.MeasureEvEnd(txtMetric, spritey);
}

// mouse down handler
TR3.addPoint = function () {
	var coordClick = TR3.cursor.coordClick;
	var thisLine = TR3.vGeom.item[TR3.vGeom.item.length - 1];
	var nPoint = thisLine.nPoint;
	var positions = TR3.vGeom.positions;

	positions[nPoint * 3 + 0] = coordClick.x;
	positions[nPoint * 3 + 1] = coordClick.y;
	positions[nPoint * 3 + 2] = coordClick.z;
	thisLine.nPoint++;
	thisLine.geometry.setDrawRange(0, thisLine.nPoint);
	thisLine.geometry.attributes.position.needsUpdate = true;

	if (nPoint > 1 && TR3.vGeom.measure) {
		TR3.updateVgeom();
	}
}

// mouse down handler
TR3.newVgeom = function (evt) {
	TR3.newDraw++;
	// geometry
	var geometry = new THREE.BufferGeometry();
	var MAX_POINTS = 150;
	var positions = new Float32Array(MAX_POINTS * 3);
	geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
	TR3.vGeom.positions = positions;

	// material
	var material = new THREE.LineBasicMaterial({
		color: $("#PickDrawStereo").val()
		//https://stackoverflow.com/questions/11638883/thickness-of-lines-using-three-linebasicmaterial
	});

	// line
	var line;
	if (TR3.vGeom.polig == true) {
		line = new THREE.LineLoop(geometry, material); //LineLoop Surface!!!
	} else {
		TR3.distAlt = 0;
		TR3.dist2D = 0;
		TR3.dist3D = 0;
		TR3.distTerr = 0;
		line = new THREE.Line(geometry, material);
	}

	line.frustumCulled = false;
	line.nPoint = 0;
	line.magni = TR3.valuesSet.magnification;
	line.name = 'handMade';
	//line.geometry.computeBoundingSphere();
	TR3.scene.add(line);

	if (TR3.vGeom.sprites && TR3.vGeom.sprites.length) {
		for (var i = 0; i < TR3.vGeom.sprites.length; i++) {
			if (TR3.vGeom.sprites[i].reload == true) {
				TR3.vGeom.sprites[i].reload = false;
			}
		}
	}

	if (TR3.vGeom.item && TR3.vGeom.item.length) {
		for (var i = 0; i < TR3.vGeom.item.length; i++) {
			if (TR3.vGeom.item[i].reload == true) {
				TR3.vGeom.item[i].reload = false;
			}
		}
	}

	if (!TR3.vGeom.item) {
		TR3.vGeom.item = new Array(0);
	}
	TR3.vGeom.item.push(line);
	TR3.vGeom.item[0].reload = false;

}

TR3.endDraw = function (evt) {
	TR3.newDraw = -1;
}

TR3.getMetrics = function (thisLine) {
	var pos;
	var metric = new Array();
	metric.length = 0;

	if (TR3.vGeom.sprites && TR3.vGeom.sprites.length) {
		for (var i = 0; i < TR3.vGeom.sprites.length; i++) {
			if (TR3.vGeom.sprites[i].reload == true) {
				TR3.scene.remove(TR3.vGeom.sprites[i]);
				TR3.vGeom.sprites.splice(i, 1);
				i--;
			}
		}
	}

	if (TR3.vGeom.item && TR3.vGeom.item.length) {
		for (var i = 0; i < TR3.vGeom.item.length; i++) {
			if (TR3.vGeom.item[i].reload == true) {
				TR3.scene.remove(TR3.vGeom.item[i]);
				TR3.vGeom.item.splice(i, 1);
				i--;
			}
		}
	}


	if (TR3.vGeom.polig == true && thisLine.nPoint > 2) {
		pos = thisLine.geometry.getAttribute("position");
		var coords = new Array();
		var np = thisLine.nPoint;
		for (var i = np - 1; i > -1; i--) {
			var coorPos = TR3.getCoordsByXYmod(pos.getX(i), pos.getZ(i), false);
			coords.unshift(coorPos);
		}

		var getSurf = TR3.getSurf(coords, thisLine);
		metric.push([TR3.txtMetric([getSurf[0], getSurf[1], getSurf[2]]), new THREE.Vector3(pos.getX(0), pos.getY(0), pos.getZ(0))]);
		metric.push([TR3.txtMetric([getSurf[6]]), new THREE.Vector3(pos.getX(np - 1), pos.getY(np - 1), pos.getZ(np - 1))]);
		metric.push([TR3.txtMetric([getSurf[3], getSurf[4], getSurf[5]]),
		new THREE.Vector3(pos.getX(Math.floor(np / 2)), pos.getY(Math.floor(np / 2)), pos.getZ(Math.floor(np / 2)))]);
	}
	if (!TR3.vGeom.polig || TR3.vGeom.polig == false) {
		pos = thisLine.geometry.getAttribute("position");
		var np = thisLine.nPoint;
		var last = TR3.getCoordsByXYmod(pos.getX(np - 1), pos.getZ(np - 1), false);
		var first = TR3.getCoordsByXYmod(pos.getX(np - 2), pos.getZ(np - 2), false);

		var getDist = TR3.getDist(first[0], first[1], pos.getY(np - 2), last[0], last[1], pos.getY(np - 1))
		metric.push([TR3.txtMetric(getDist),]);
	}

	return metric;
}

TR3.txtMetric = function (metric) {
	var txtMetric = '';
	for (var i = 0; i < metric.length; i++) {
		if (metric[i]) {
			txtMetric += ' ' + metric[i].name + ': ' + metric[i].val + ' ' + metric[i].unit + '\n';
		} else { metric.splice(i, 1); i--; }
	}
	if (txtMetric && txtMetric.length > 2)
		txtMetric = txtMetric.slice(0, -1)
	return txtMetric;
}
/*<--DRAW*/

TR3.assignZgeometries = function () {

	/*for (var i = 0; i < TR3.vGeom.item.length; i++) {
		var item = TR3.vGeom.item[i];
		if (item.geometry && item.geometry.vertices) {
			var vert = item.geometry.vertices
			for (var j = 0; j < vert.length; j++) {
				vert[j].y = vert[j].y / TR3.vGeom.item[i].magni * TR3.valuesSet.magnification;
			}
			item.geometry.verticesNeedUpdate = true;
		} else {
			var pos = item.geometry.getAttribute("position");
			for (var j = 0; j <= TR3.vGeom.item[i].nPoint; j++) {
				pos.setY(j, pos.getY(j) / TR3.vGeom.item[i].magni * TR3.valuesSet.magnification);
			}
			pos.needsUpdate = true;
		}
		item.magni = TR3.valuesSet.magnification;
		item.geometry.computeVertexNormals();
	}*/
};

/*TEXT Marker-->*/
TR3.makeTextSprite = function (params) {
	//Sprite to CSS
	//https://ifcjs.github.io/ifcjs-crash-course/exercises/threejs/html-integration/index.html
	//https://stackoverflow.com/questions/27409074/converting-3d-position-to-2d-screen-position-r69
	//http://jsfiddle.net/meirm/kgxeuz24/186/
	//https://r105.threejsfundamentals.org/threejs/lessons/threejs-align-html-elements-to-3d.html

	if (params === undefined) params = {};

	var center = params.hasOwnProperty("center") ?
		params["center"] : false;

	var posSprite = params.hasOwnProperty("pos") ?
		params["pos"] : { x: 440000, y: 4440000, z: 900, inv: false };

	var message = params.hasOwnProperty("text") ?
		params["text"] : "";

	var isPixSize = params.hasOwnProperty("isPixSize") ?
		params["isPixSize"] : false;

	var extraData = params.hasOwnProperty("extraData") ?
		params["extraData"] : new Array();

	if (params.font === undefined) params.font = {};

	var fontface = params.font.hasOwnProperty("fontFace") ?
		params.font["fontFace"] : "Arial";

	var fontsize = params.font.hasOwnProperty("fontSize") ?
		params.font["fontSize"] : 24;

	var bold = params.font.hasOwnProperty("bold") ?
		params.font["bold"] : true;

	var textColor = params.font.hasOwnProperty("textColor") ?
		params.font["textColor"] : { r: 0, g: 0, b: 0, a: 1.0 };

	if (params.canvas === undefined) params.canvas = {};

	var backgroundColor = params.canvas.hasOwnProperty("backgroundColor") ?
		params.canvas["backgroundColor"] : { r: 255, g: 100, b: 100, a: 0.8 };

	var borderColor = params.canvas.hasOwnProperty("borderColor") ?
		params.canvas["borderColor"] : { r: 255, g: 0, b: 0, a: 1.0 };

	var borderThickness = params.canvas.hasOwnProperty("borderThickness") ?
		params.canvas["borderThickness"] : 4;

	var rounded = params.canvas.hasOwnProperty("rounded") ?
		params.canvas["rounded"] : 6;

	var borderColor = params.canvas.hasOwnProperty("borderColor") ?
		params.canvas["borderColor"] : { r: 255, g: 0, b: 0, a: 1.0 };

	var text_Height = params.canvas.hasOwnProperty("text_Height") ?
		params.canvas["text_Height"] : false;

	var text_Width = params.canvas.hasOwnProperty("text_Width") ?
		params.canvas["text_Width"] : false;

	var scale = params.canvas.hasOwnProperty("scale") ?
		params.canvas["scale"] : false;

	var depthTest = params.canvas.hasOwnProperty("depthTest") ?
		params.canvas["depthTest"] : true;

	var canvas = document.createElement('canvas');
	var context = canvas.getContext('2d');
	var txtBold = '';
	if (bold) { txtBold = "Bold " }
	context.font = txtBold + fontsize + "px " + fontface;
	//context.textAlign  = "center";

	// background color
	context.fillStyle = "rgba(" + backgroundColor.r + "," + backgroundColor.g + ","
		+ backgroundColor.b + "," + backgroundColor.a + ")";
	// border color
	context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + ","
		+ borderColor.b + "," + borderColor.a + ")";
	if (message == null) { message = '' };

	message = message.replace(new RegExp('---', 'g'), ' ');
	var lines = message.split("\n");
	if (lines.length <= 1) { lines = message.split("+++"); }

	var lineLength = lines.length;
	var heightTxt = fontsize + borderThickness;
	var heightTxt2 = text_Height || (fontsize * 1.2 + borderThickness) * lineLength;

	// get size data (height depends only on font size)
	var metrics = context.measureText(message);
	var textWidth = text_Width || metrics.width / lineLength * 1.2;

	if (heightTxt2 > 146) { heightTxt2 = 146; }
	if (textWidth > 292) { textWidth = 292; }

	context.lineWidth = borderThickness;
	TR3.roundRect(context, borderThickness / 2, borderThickness / 2, textWidth + borderThickness, heightTxt2, rounded);
	// 1.2 is extra height factor for text below baseline: g,j,p,q.

	// text color NECESARIO
	context.fillStyle = "rgba(" + textColor.r + "," + textColor.g + ","
		+ textColor.b + "," + textColor.a + ")";

	for (var i = 0; i < lineLength; ++i) {
		//context.fillText(lines[i], x, y);
		context.fillText(lines[i], borderThickness, heightTxt * (i + 1));
	}

	// canvas contents will be used for a texture
	var texture = new THREE.Texture(canvas)
	texture.needsUpdate = true;

	var spriteMaterial = new THREE.SpriteMaterial(
		{
			map: texture,
			alphaTest: 0.6 //https://discourse.threejs.org/t/issue-with-transparent-shadermaterial-and-a-sprite/23443
			, depthTest: depthTest/*, color: 0xcccccc*/
		});

	var sprite = new THREE.Sprite(spriteMaterial);
	sprite.TR3 = new Object();
	sprite.TR3.extraData = extraData;
	sprite.TR3.source = JSON.parse(JSON.stringify(params));

	sprite.reload = true;

	var coord = new THREE.Vector3();
	if (posSprite.inv) {
		coord.x = posSprite.x;
		coord.y = posSprite.y;
		coord.z = posSprite.z;
	} else {
		var coordM = TR3.coordM2T(posSprite.x, posSprite.y, posSprite.z, true);
		coord.x = coordM[0];
		coord.y = coordM[1];
		coord.z = coordM[2];
	}

	if (isPixSize) {
		coord.y = '$' + posSprite.z + '$P';
	}

	sprite.position.set(coord.x, coord.y, coord.z);
	var sDskMvl = TR3.config.spritesDskMvl;

	if (scale) {
		if (isPixSize) {
			sprite.scale.set(scale * TR3.getSizePix() * sDskMvl, scale / 2 * TR3.getSizePix() * sDskMvl, 1);
		} else {
			sprite.scale.set(scale, scale / 2, 1);
		}
	} else {
		sprite.scale.set(100 * TR3.getSizePix() * sDskMvl, 100 / 2 * TR3.getSizePix() * sDskMvl, 1);
	}

	var val = TR3.rectaValue(1, 0.7, 4, 0.05, lineLength);
	if (!center) { sprite.center.set(0, val); } else { sprite.center.set(0.5, 0.5); }


	/*if(!TR3.vGeom.sprites){
		TR3.vGeom.sprites = new THREE.Group();
	}
	TR3.vGeom.sprites.add( sprite );*/
	if (!TR3.vGeom.sprites) {
		TR3.vGeom.sprites = new Array(0);
	}
	TR3.vGeom.sprites.push(sprite);

	return sprite;
};

TR3.formatedText = function (newText, color, pos) {
	var nKeys = 25;
	var name1 = newText, name2 = "", name3 = "";
	if (name1.length > nKeys) {
		name1 = newText.slice(0, nKeys) + "-\n "
		name2 = newText.slice(nKeys * 1);
		if (name2.length > nKeys) {
			name2 = newText.slice(nKeys * 1, nKeys * 2) + "-\n ";
			name3 = newText.slice(nKeys * 2, nKeys * 3);
		}
	}

	var spacesName = (name1 + name2 + name3).split('-\n');
	var name2item = "";
	for (var j = 0; j < spacesName.length; j++) {
		var spacesNameJ = spacesName[j];
		name2item += spaces(nKeys - spacesNameJ.length) + spacesNameJ + "-\n";
	}
	newText = name2item.slice(0, -2);

	var col = color || $("#minicolorText").val() || '#ff00ff';
	var spriteColor = new THREE.Color(col);
	var colHEX = '#' + spriteColor.getHexString();
	var br = (newText.match(/\n/g) || []).length * 2;

	var coord = new THREE.Vector3();
	coord.x = (pos && pos[0]) ? pos[0] : TR3.cursor.coordClick.x || 0;
	coord.y = (pos && pos[1]) ? pos[1] + br : TR3.cursor.coordClick.y + br || 0;
	coord.z = (pos && pos[2]) ? pos[2] : TR3.cursor.coordClick.z || 0;

	var TXTpms = {
		text: newText,
		font: { fontFace: "Arial", bold: false },
		pos: { x: coord.x, y: coord.y, z: coord.z, inv: true },
		canvas: {
			text_Width: 292, backgroundColor: { r: spriteColor.r * 255, g: spriteColor.g * 255, b: spriteColor.b * 255, a: 0.8 },
			borderColor: { r: spriteColor.r * 155, g: spriteColor.g * 155, b: spriteColor.b * 155, a: 1 }, borderThickness: 1, depthTest: false
		},
		center: true
	};

	var textSprite = TR3.makeTextSprite(TXTpms);
	textSprite.TR3.source = { text: TXTpms.text, color: colHEX, pos: TXTpms.pos };

	textSprite.name = newText;
	return textSprite;
};

TR3.del_vGeom = function (last, type) {
	if(TR3.transformControls)
		TR3.transCtrlsEnabled(false);

	var i = last ? TR3.vGeom.sprites.length - 1 : 0;
	var k = last ? TR3.vGeom.obj3d.length - 1 : 0;
	var l = last ? TR3.vGeom.build.length - 1 : 0;
	var n = last ? TR3.vGeom.lights.length - 1 : 0;

	var sprites = true;
	var obj3d = true;
	var build = true;
	var lights = true;
	var item = true;
	if (type) {
		sprites = type == 'sprites' ? true : false;
		obj3d = type == 'obj3d' ? true : false;
		build = type == 'build' ? true : false;
		lights = type == 'lights' ? true : false;
		item = type == 'item' ? true : false;
	}

	if (lights && TR3.vGeom.lights && TR3.vGeom.lights.length) {
		for (n; n < TR3.vGeom.lights.length; n++) {
			TR3.onSuprFnc(TR3.vGeom.lights[n]);
			TR3.scene.remove(TR3.vGeom.lights[n][0]);
			TR3.scene.remove(TR3.vGeom.lights[n][1]);
			TR3.vGeom.lights.splice(n, 1);
			n--;
		}
		if (n === 0) TR3.vGeom.lights = [];
	}

	if (sprites && TR3.vGeom.sprites && TR3.vGeom.sprites.length) {
		for (i; i < TR3.vGeom.sprites.length; i++) {
			TR3.onSuprFnc(TR3.vGeom.sprites[i]);
			TR3.scene.remove(TR3.vGeom.sprites[i]);
			TR3.vGeom.sprites.splice(i, 1);
			i--;
		}
		if (i === 0) TR3.vGeom.sprites = [];
	}

	if (obj3d && TR3.vGeom.obj3d && TR3.vGeom.obj3d.length) {
		for (k; k < TR3.vGeom.obj3d.length; k++) {
			if (TR3.vGeom.obj3d[k].persist2Scene != true) {
				var thisObj = TR3.vGeom.obj3d[k];
				var obj
				if (thisObj.scene) {
					obj = thisObj.scene;
				} else if (thisObj.parent && thisObj.parent.scene) {
					obj = thisObj.parent.scene;
				} else {
					obj = thisObj;
				}
				TR3.onSuprFnc(obj);
				TR3.scene.remove(obj);
				TR3.vGeom.obj3d.splice(k, 1);
				k--;
			}
		}
		if (k === 0) TR3.vGeom.obj3d = [];
	}
	if (build && TR3.vGeom.build && TR3.vGeom.build.length) {
		for (l; l < TR3.vGeom.build.length; l++) {
			if (TR3.vGeom.build[l].persist2Scene != true) {
				var thisObj = TR3.vGeom.build[l];
				var obj
				if (thisObj.scene) {
					obj = thisObj.scene;
				} else if (thisObj.parent && thisObj.parent.scene) {
					obj = thisObj.parent.scene;
				} else {
					obj = thisObj;
				}
				TR3.scene.remove(obj);
				TR3.vGeom.build.splice(l, 1);
				l--;
			}
		}
		if (l === 0) TR3.vGeom.build = [];
	}

	if (item && TR3.vGeom.item && TR3.vGeom.item.length) {
		for (var j = 0; j < TR3.vGeom.item.length; j++) {
			TR3.scene.remove(TR3.vGeom.item[j]);
		}
		TR3.vGeom.item = false;
		TR3.vGeom.item.magni;
		if (TR3.vGeom.item.nPoint)
			TR3.vGeom.item.nPoint = 0;
	}

	TR3.newDraw = -1;
}

// function for drawing rounded rectangles
TR3.roundRect = function (ctx, x, y, w, h, r) {
	ctx.beginPath();
	ctx.moveTo(x + r, y);
	ctx.lineTo(x + w - r, y);
	ctx.quadraticCurveTo(x + w, y, x + w, y + r);
	ctx.lineTo(x + w, y + h - r);
	ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
	ctx.lineTo(x + r, y + h);
	ctx.quadraticCurveTo(x, y + h, x, y + h - r);
	ctx.lineTo(x, y + r);
	ctx.quadraticCurveTo(x, y, x + r, y);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
};
/*<--TEXT Marker*/

TR3.txtObject = async function (txt, color, size, pos, rot) {

	return new Promise(function (resolve) {
		//setTimeout(()=>{ resolve(42) }, 5000 );
		TR3.loaderFONT.load(TR3.config.src + 'helvetiker_regular.typeface.json', function (font) {

			var textGeo = new TR3.TextGeometry(txt, {

				font: font,

				size: size,
				height: 0.5,
				//curveSegments: 12,
				bevelEnabled: true,
				bevelThickness: 1,
				bevelSize: 1,
				bevelOffset: 0,
				bevelSegments: 1

			});

			var textMaterial = new THREE.MeshBasicMaterial({
				color: color
			});

			var mesh = new THREE.Mesh(textGeo, textMaterial);
			mesh.name = txt;
			mesh.position.set(pos[0], pos[1], pos[2]);
			mesh.rotation.y = rot;

			resolve(mesh);
		});
	});

}

TR3.getFeatFromOL = function (feat) {
	//var feat = TR3.LyrFeatFromOri.getSource().getFeatures();
	TR3.loadingDiv.style.display = 'block';
	/*TR3.prog.countFull = feat.length;
	TR3.progress();*/
	for (var i = 0; i < feat.length; i++) {

		//TR3.prog.index = i;
		var geometry = feat[i].getGeometry();//getSimplifyGeometry(0)
		var nAxis = geometry.layout;

		var typeGeom = geometry.getType();
		var typeSoport = ['Point', 'Line', 'LineString', 'Polygon', 'Circle'];
		var type;
		for (var m = 0; m < typeSoport.length; m++) {
			if (typeGeom.indexOf(typeSoport[m]) != -1) {
				type = typeSoport[m];
			}
		}

		if (nAxis && type) {
			var nAxisL = nAxis.length;
			var coord = new Array();
			var coord3d = new Array();

			if (type == "Circle") {//nAxisL?
				var coordOri = new THREE.Vector3();
				geometry.getCenter(coordOri);
				//var coordOri = geometry.getCenter();
				var radOri = geometry.getRadius();

				coord3d = TR3.getCoordsByXYmod(coordOri[0], -coordOri[1], false);
				if (coord3d)
					coord = new THREE.Vector4(coord3d[3], coord3d[4], coord3d[5], radOri);
				else
					coord = new THREE.Vector4(coordOri[0], TR3.zMed, -coordOri[1], radOri);
			} else if (type == "Point") {//nAxisL?
				var coordOri = geometry.getCoordinates();

				coord3d = TR3.getCoordsByXYmod(coordOri[0], -coordOri[1], false);
				if (coord3d)
					coord = new THREE.Vector3(coord3d[3], coord3d[4], coord3d[5]);
				else
					coord = new THREE.Vector3(coordOri[0], TR3.zMed, -coordOri[1]);
			} else {
				if (geometry.layout) {
					var coordOri = geometry.getCoordinates().toString().split(','); //cubes.forEach https://stackoverflow.com/questions/10021847/for-loop-in-multidimensional-javascript-array

					for (var j = 0; j < coordOri.length; j += nAxisL) {

						if (nAxisL == 2) {
							var coord3d6 = TR3.getCoordsByXYmod(coordOri[j], -coordOri[j + 1], false);
							if (coord3d6) {
								coord3d = [coord3d6[3], coord3d6[4], coord3d6[5]];
							} else {
								coord3d = [coordOri[j], TR3.zMed, -coordOri[j + 1]];
							}
						} else {
							if (coordOri[j + 2] == 0) {
								var coord3d6 = TR3.getCoordsByXYmod(coordOri[j], -coordOri[j + 1], false);
								if (coord3d6) {
									coord3d = [coord3d6[3], coord3d6[4], coord3d6[5]];
								} else {
									coord3d = [coordOri[j], TR3.zMed, -coordOri[j + 1]];
								}
							} else {
								var zM = TR3.zM2T(coordOri[j + 2], true);
								coord3d = [coordOri[j], zM, -coordOri[j + 1]];
							}
						}

						coord.push(new THREE.Vector3(coord3d[0], coord3d[1], coord3d[2]));
					}

				}
			}

			var styleFeat = feat[i].getStyle();//https://stackoverflow.com/questions/42376516/is-it-possible-to-extract-style-information-from-geojson-for-an-openlayers-javas
			var sColor = null;
			if (styleFeat && styleFeat.stroke_) {//color de la capa
				var color = styleFeat.getStroke().getColor();
				sColor = new THREE.Color(color[0] / 255, color[1] / 255, color[2] / 255);
			}
			var style = { color: sColor };
			var vItem = { reload: false };
			var feat3d = TR3.makeVectFeat(coord, type, style, vItem);
			TR3.scene.add(feat3d);
		}
	}
	TR3.loadingDiv.style.display = 'none';
	TR3.VectorEvEnd();
	//loadingTerrain.innerHTML  = 'Creating 3D maps, please wait...';
};

TR3.setFeatToOL = function () {
	//printFeature('Polygon',poligonCoords);
	var LyrFeatsOri = TR3.LyrFeatFromOri;
	var features = new Array();

	if (TR3.scene) {
		for (var i = 0; i < TR3.vGeom.item.length; i++) {

			var object = TR3.vGeom.item[i];
			if (object.name == "handMade") {
				var feat;
				var coordinates = new Array();
				var pos = object.geometry.getAttribute("position");
				var featLength = object.nPoint || pos.version
				for (var j = 0; j < featLength; j++) {
					coordinates.push([pos.getX(j), -pos.getZ(j), TR3.zM2T(pos.getY(j))]);
				}

				if (object.type == 'LineLoop') {
					feat = 'Polygon';
					coordinates.push([pos.getX(0), -pos.getZ(0), TR3.zM2T(pos.getY(0))]);
					coordinates = [coordinates]
				}
				else if (object.type == 'Point') { feat = 'Point'; }
				else { feat = 'LineString'; }

				var TR3Color = object.material.color;
				var TR3Style = new ol.style.Style({
					fill: new ol.style.Fill({
						color: 'rgba(100, 100, 100, 0.2)'
					}),
					stroke: new ol.style.Stroke({
						color: [TR3Color.r * 255, TR3Color.g * 255, TR3Color.b * 255, 1],
						width: 2
					})
				});

				var olFeat = new ol.Feature({
					geometry: new ol.geom[feat](coordinates)
				});
				olFeat.setStyle(TR3Style);
				LyrFeatsOri.getSource().addFeature(olFeat);
			}

		};
	}
};

TR3.extrude2Dfeature = function (vertex, height, center, easy) {

	var floor = TR3.getCoordsByXYmod(center[0], center[1], false, true)[4];
	var offset = 0;
	if (easy) {
		offset = 1;//incrusta el edificio en el terreno y lo eleva proporcionalmente
		floor -= offset;
	}

	var build = new THREE.Group();
	build.TR3 = new Object();

	var geometryWall = new THREE.PlaneGeometry(1, 1, vertex.length - 1, 1)
	var pointPosWall = geometryWall.getAttribute("position");

	var geometryRoof = [];

	for (var i = 0; i < vertex.length; i++) {
		var vertexMod = new Array();
		if (easy) {
			var vertex2D = TR3.translate2DbyXYmod(vertex[i][0], vertex[i][1], true);
			vertexMod = [0, 0, 0, vertex2D[0], floor, vertex2D[1]];
		} else {
			vertexMod = TR3.getCoordsByXYmod(vertex[i][0], vertex[i][1], false, true);
		}

		if (!vertexMod || vertexMod[6] == false) {
			return false;
		}
		vertex[i][0] = vertexMod[3];//vectores pequeños mejor estabilidad
		vertex[i][1] = vertexMod[5];

		pointPosWall.setXYZ(i, vertex[i][0], vertexMod[4], vertex[i][1]);

		//pos.setZ( i+1, (arrayZ[i] - TR3.zMed)*TR3.valuesSet.magnification )
	}

	for (var i = 0; i < vertex.length; i++) {

		pointPosWall.setXYZ(i + vertex.length, vertex[i][0], offset + floor + 3 * height, vertex[i][1]);

		var pointUp = new THREE.Vector2(
			vertex[i][0],
			vertex[i][1]
		);
		geometryRoof.push(pointUp);
	}

	pointPosWall.needsUpdate = true;
	var color = TR3.getRandomColor(100, 150).hex;

	var randomColor = Math.round(color);
	var materialWall = new THREE.MeshBasicMaterial({ color: randomColor });
	var materialRoof = new THREE.MeshBasicMaterial({ color: randomColor, side: THREE.BackSide, transparent: true, opacity: 0.5/*, depthWrite: false, depthTest: false*/ });

	var meshWall = new THREE.Mesh(geometryWall, materialWall);

	// wireframe
	var geoLine = new THREE.EdgesGeometry(meshWall.geometry); // or WireframeGeometry
	var matLine = new THREE.LineBasicMaterial({ color: 0xCCCCCC });
	var wireframeLine = new THREE.LineSegments(geoLine, matLine);

	var geomRoof = new THREE.ShapeGeometry(new THREE.Shape(geometryRoof));
	var meshRoof = new THREE.Mesh(geomRoof, materialRoof);
	//meshRoof.rotation.x = Math.PI;
	var geomRoofPos = geomRoof.getAttribute("position");
	for (var i = 0; i < geomRoofPos.count; i++) {
		geomRoofPos.setXYZ(i, geomRoofPos.getX(i), offset + floor + 3 * height, geomRoofPos.getY(i));
	}
	geomRoofPos.needsUpdate = true;

	build.add(wireframeLine);
	build.add(meshRoof);
	build.add(meshWall);

	TR3.scene.add(build);

	if (!TR3.vGeom.build) {
		TR3.vGeom.build = new Array(0);
	}

	TR3.vGeom.build.push(build);

	return build;
};

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

TR3.getRandomColor = function (min, max) {
	var r = getRandomInt(min, max);
	var g = getRandomInt(min, max);
	var b = getRandomInt(min, max);

	return {
		rgb: [r, g, b],
		hex: Number('0x' + r.toString(16) + g.toString(16) + b.toString(16))
	};
};

TR3.setGeometry = function (geom, mat, opts) {

	var geometry;
	if (geom === undefined) geom = {};

	var depth = geom.hasOwnProperty("depth") ?
		geom["depth"] : 5.97;
	var height = geom.hasOwnProperty("height") ?
		geom["height"] : 5.97;
	var width = geom.hasOwnProperty("width") ?
		geom["width"] : 5.97;
	var heightSegments = geom.hasOwnProperty("heightSegments") ?
		geom["heightSegments"] : 32;
	var openEnded = geom.hasOwnProperty("openEnded") ?
		geom["openEnded"] : false;
	var phiLength = geom.hasOwnProperty("phiLength") ?
		geom["phiLength"] : 2 * Math.PI;
	if (phiLength == 6.283) { phiLength = 2 * Math.PI; }
	var phiStart = geom.hasOwnProperty("phiStart") ?
		geom["phiStart"] : 0;
	var radius = geom.hasOwnProperty("radius") ?
		geom["radius"] : 100;
	var radiusBottom = geom.hasOwnProperty("radiusBottom") ?
		geom["radiusBottom"] : 100;
	var radiusTop = geom.hasOwnProperty("radiusTop") ?
		geom["radiusTop"] : 100;
	var thetaLength = geom.hasOwnProperty("thetaLength") ?
		geom["thetaLength"] : Math.PI;
	if (thetaLength == 6.283) { thetaLength = 2 * Math.PI; }
	var thetaStart = geom.hasOwnProperty("thetaStart") ?
		geom["thetaStart"] : 0;
	var segments = geom.hasOwnProperty("segments") ?
		geom["segments"] : 32;
	var widthSegments = geom.hasOwnProperty("widthSegments") ?
		geom["widthSegments"] : 32;

	if (opts === undefined) opts = {};

	var WireframeGeometry = opts.hasOwnProperty("WireframeGeometry") ?
		opts["WireframeGeometry"] : false;
	var EdgesGeometry = opts.hasOwnProperty("EdgesGeometry") ?
		opts["EdgesGeometry"] : false;
	var slctItem = opts.hasOwnProperty("slctItem") ?
		opts["slctItem"] : false;
	var transCtrl = opts.hasOwnProperty("transform") ?
		opts["transform"] : false;
	var color = opts.hasOwnProperty("color") ?
		opts["color"] : false;
	var extraData = opts.hasOwnProperty("extraData") ?
		opts["extraData"] : false;

	var material;
	if (!color)
		material = mat || new THREE.MeshNormalMaterial({ side: THREE.DoubleSide, opacity: 0.5, transparent: true, depthTest: true, depthWrite: true, flatShading: true });
	else
		material = mat || new THREE.MeshBasicMaterial({ color: color });

	switch (geom.geometry.toLowerCase()) {
		case "box":
			geometry = new THREE.BoxGeometry(width, height, depth, 1, 1, 1);
			//BoxGeometry(width : Float, height : Float, depth : Float, widthSegments : Integer, heightSegments : Integer, depthSegments : Integer)
			break;
		case "plane":
			geometry = new THREE.PlaneGeometry(width, height, 1, 1);
			geometry.rotateX(Math.PI / 2);
			//PlaneGeometry(width : Float, height : Float, widthSegments : Integer, heightSegments : Integer)
			break;
		case "cylinder":
			geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, segments, 1, openEnded, thetaStart, thetaLength)
			//CylinderGeometry(radiusTop : Float, radiusBottom : Float, height : Float, radialSegments : Integer, heightSegments : Integer, openEnded : Boolean, thetaStart : Float, thetaLength : Float)
			break;
		case "cone":
			geometry = new THREE.ConeGeometry(radius, height, segments, heightSegments, openEnded, thetaStart, thetaLength)
			//ConeGeometry(radius : Float, height : Float, radialSegments : Integer, heightSegments : Integer, openEnded : Boolean, thetaStart : Float, thetaLength : Float)
			break;
		case "circle":
			geometry = new THREE.CircleGeometry(radius, segments, thetaStart, thetaLength);
			geometry.rotateX(Math.PI / 2);
			//CircleGeometry(radius : Float, segments : Integer, thetaStart : Float, thetaLength : Float)
			break;
		case "sphere":
			geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength);
			//SphereGeometry(radius : Float, widthSegments : Integer, heightSegments : Integer, phiStart : Float, phiLength : Float, thetaStart : Float, thetaLength : Float)
			break;
		case "semisphere":
			geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments, 0, Math.PI, 0, Math.PI);
			geometry.rotateX(Math.PI);
			//SphereGeometry(radius : Float, widthSegments : Integer, heightSegments : Integer, phiStart : Float, phiLength : Float, thetaStart : Float, thetaLength : Float)
			break;
		default:
			geometry = new THREE.BoxGeometry(width, height, depth, 1, 1, 1);
			break;
	}


	var mesh = new THREE.Mesh(geometry, material);

	if (EdgesGeometry == true) {
		// wireframe
		var geoLine = new THREE.EdgesGeometry(geometry); // or WireframeGeometry
		var matLine = new THREE.LineBasicMaterial({ color: 0xCCCCCC });
		var wireframeLine = new THREE.LineSegments(geoLine, matLine);
		mesh.add(wireframeLine);
	}

	if (WireframeGeometry == true) {
		// wireframe
		var geoLine = new THREE.WireframeGeometry(geometry); // or WireframeGeometry
		var matLine = new THREE.LineBasicMaterial({ color: 0xCCCCCC });
		var wireframeLine = new THREE.LineSegments(geoLine, matLine);
		mesh.add(wireframeLine);
	}

	var box = TR3.getSizeObj(mesh);
	mesh.TR3 = new Object();
	mesh.TR3.box = box[3];
	mesh.TR3.hitbox = box[4];
	mesh.TR3.radius = box[5];
	mesh.TR3.slctItem = true;
	mesh.TR3.extraData = extraData || new Array();
	mesh.TR3.source = { geom: geom, mat: mat, opts: opts };

	if (slctItem == true) {
		TR3.vGeom.obj3d.push(mesh);
	}

	if (transCtrl == true) {
		TR3.transCtrlsEnabled(mesh);
	}

	return mesh;
};

TR3.setLight = function (color, inten, dist) {
	var color = color || '#ffffff';
	var intensLight = inten || 1;
	var distLight = dist || 100;

	var spriteColor = new THREE.Color(color);
	var colHEX = '#' + spriteColor.getHexString();
	
	var pointLight = new THREE.PointLight(spriteColor, intensLight, distLight);
	pointLight.TR3 = new Object();
	pointLight.TR3.extraData = new Array();
	pointLight.TR3.source = {color: colHEX, inten: intensLight, dist: distLight};

	var sphereSize = TR3.tPixMesh / 10;
	var pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize);

	TR3.vGeom.lights.push([pointLight, pointLightHelper]);

	return [pointLight,pointLightHelper];
};

function spaces(n) {
	var spaces = ' ';
	for (var i = 0; i < n - 1; i++) {
		spaces = spaces + ' ';
	}
	return spaces;
}'use strict';
TR3.personViewFn = function (height) {

	var heightVal = height || TR3.moveKey.size;
	TR3.controls.enableDamping = false;
	TR3.controls.maxPolarAngle = Infinity;
	TR3.controls.enableKeys = false;

	TR3.camera.position.x = TR3.cursor.coordClick.x;
	TR3.camera.position.z = TR3.cursor.coordClick.z;

	var coordCenterCamera = TR3.getOptModCoordCam();
	if (coordCenterCamera && coordCenterCamera[1] != -10000000) {

		TR3.changeHeight(coordCenterCamera[1] + heightVal, true, true, 1);

		TR3.cursor.helper.scale.set(0.05, 0.05, 0.05);
	} else {
		TR3.initPosCamera(true);
		setTimeout(function () { TR3.personViewFn(heightVal); }, 1500);
	}

};

TR3.orbitalViewFn = function () {

	TR3.moveKey.walk = false;
	TR3.controls.enableKeys = false;
	TR3.controls.maxPolarAngle = Math.PI / 2.25;
	TR3.controls.enableDamping = true;

	var raycaster = TR3.getRayCaster(false);
	var intersects = TR3.getIntersect(raycaster, [TR3.mesh]);

	if (intersects[0]) {
		var coordInter = TR3.getCoordsByXYmod(intersects[0][0].point.x, intersects[0][0].point.z, false );
		if (coordInter && coordInter[2]) {
			/*cPos.x = intersects[0].point.x;
			cPos.z = intersects[0].point.z;*/
			TR3.controls.target.set(coordInter[3], coordInter[4], coordInter[5]);

		}
		TR3.cursor.helper.scale.set(0.5, 0.5, 0.5);
	} else {
		TR3.initPosCamera(true);
		setTimeout(function () { TR3.orbitalViewFn(); }, 1500);
	}

};

TR3.initPosCamera = function (tween) {
	TR3.moveKey.walk = false;
	TR3.controls.enableDamping = true;

	if (tween == true) {
		new TWEEN.Tween(TR3.camera.position) //https://github.com/tweenjs/es6-tween
			.to({x:TR3.mesh.position.x, y:TR3.cameraPositionFar, z:TR3.mesh.position.z}, 2000)
			.easing(TWEEN.Easing.Linear)
			/*.on('update', function (coords) {
				TR3.scene.rotation.y += 0.03;
			})*/
			.on('complete', function (coords) {
				TR3.controls.target.set(coords.x, 0, coords.z);
				TR3.controls.update();
				TR3.CameraMoveEvEnd();
			})
			.start();
	} else {
		TR3.camera.position.set(TR3.mesh.position.x, TR3.cameraPositionFar, TR3.mesh.position.z);
		TR3.controls.target.set(0, 0, 0);
		TR3.controls.update();
	}

};

TR3.changeHeight = function (height, controls, tween, time) {
	var timeLapse = time || 2000
	TR3.zeroParallax = height;
	TR3.moveKey.azOriAng = TR3.controls.getAzimuthalAngle();

	if (tween == true) {
		new TWEEN.Tween(TR3.camera.position) //https://github.com/tweenjs/es6-tween
			.to({ y: height }, timeLapse)
			.easing(TWEEN.Easing.Linear)
			.on('complete', function (coords) {
				TR3.controls.target.set(coords.x + 0.01, coords.y, coords.z + 0.01);
				TR3.controls.update();
				
				TR3.setAzAngle(TR3.moveKey.azOriAng);
				TR3.controls.enableKeys = true;
				//TR3.controls.enableDamping = true;
				TR3.CameraMoveEvEnd();
			})
			.start();
	} else {
		TR3.camera.position.y = height;

	}

	if (controls == true) {
		TR3.controls.target.y = height;
		TR3.controls.update();
	}
	//TR3.camera.position.distanceTo(TR3.mesh.position);
};

TR3.moveKeyFn = function (height) {
	if (TR3.moveKey.walk == true) {

		var heightVal = height || TR3.moveKey.size;

		var heigtH = TR3.getOptModCoordCam();

		TR3.changeHeight(heigtH[1] + heightVal, true, false, 1);
	}

};'use strict';
//-->keys
TR3.keyDown = function (evt) {
	if (TR3.moving == true) {
		if (evt.keyCode == '37' || evt.keyCode == '38' || evt.keyCode == '39' || evt.keyCode == '40') {
			TR3.moveKey.is = true;
		}
	}
	//TR3.cursor.setkCde = evt.keyCode;
	//var setZterr = eval(document.getElementById('setZ').value);
	//if (Number.isInteger(setZterr) && evt.keyCode == 18) { TR3.cursor.setZterr = setZterr; } //Alt
	//if (Number.isInteger(setZterr) && evt.keyCode == 16) { TR3.cursor.setZterr = setZterr; /*TR3.cursor.helper.showShadowBase();*/ } //Shift
	var obj3d = TR3.transformControls.object;
	switch (evt.keyCode) {
		/*case 81: // Q
			TR3.transformControls.setSpace(TR3.transformControls.space === "local" ? "world" : "local");
			break;*/
		/*case 17: // Ctrl
			TR3.transformControls.setTranslationSnap(100);
			TR3.transformControls.setRotationSnap(THREE.MathUtils.degToRad(15));
			break;*/
		case 87: // W
			TR3.transformControls.setMode("translate");
			break;
		case 69: // E
			TR3.transformControls.setMode("rotate");
			break;
		case 82: // R
			TR3.transformControls.setMode("scale");
			break;
		case 107: // +, =, num+
			TR3.transformControls.setSize(TR3.transformControls.size + 0.1);
			break;
		case 109: // -, _, num-
			TR3.transformControls.setSize(Math.max(TR3.transformControls.size - 0.1, 0.1));
			break;
		case 32: // Spacebar
			TR3.transformControls.enabled = false;
			TR3.transCtrlsEnabled(false);
			break;
		case 86: // V
			obj3d.visible = !obj3d.visible;
			break;
		case 46: // Supr
			//if (obj3d.type === 'Mesh' || obj3d.type === 'Group' || obj.type === 'Object3D')
			if (TR3.transformControls.enabled && obj3d) {
				var arr = new Array();
				if (obj3d.type === "Sprite") {
					arr = TR3.vGeom.sprites;
				} else if (obj3d.type === "PointLight") {
					arr = TR3.vGeom.lights;
				} else {
					arr = TR3.vGeom.obj3d;
				}

				TR3.del3dObj(obj3d, arr);
				TR3.transformMeshByObj3d();
			}
			break;
		case 90: // Z
			if (TR3.transformControls.enabled && obj3d) {
				var anim = 1;
				if (!obj3d.TR3.animation) { obj3d.TR3.animation = 1; } else {
					obj3d.TR3.animation += 1;
					anim = obj3d.TR3.animation;
				}

				for (var i = 0; i < TR3.rotate.length; i++) {
					var rotateI = TR3.rotate[i][0];
					if (obj3d.uuid == rotateI.uuid) { TR3.rotate.splice(i, 1); i--; }
				}
				for (var i = 0; i < TR3.rotatePart.length; i++) {
					var rotatePartI = TR3.rotatePart[i][0];
					if (obj3d.uuid == rotatePartI.uuid) { TR3.rotatePart.splice(i, 1); i--; }
				}
				for (var i = 0; i < TR3.oscillate.length; i++) {
					var oscillateI = TR3.oscillate[i][0];
					if (obj3d.uuid == oscillateI.uuid) { TR3.oscillate.splice(i, 1); i--; }
				}

				switch (anim) {
					case 1:
						TR3.oscillate.push([obj3d, 6, 1, obj3d.position.y]);
						break;
					case 2:
						TR3.rotate.push([obj3d, 0.02]);
						break;
					case 3:
						TR3.rotatePart.push([obj3d, 2, 1, 1]);
						break;
					case 4:
						obj3d.TR3.animation = false;
						break;
				}
			}
			break;
		case 27: // Esc
			TR3.keyScape();
			break;
	}

	if (TR3.transformControls.enabled && obj3d && obj3d.TR3 && obj3d.type !== "Sprite" && obj3d.type !== "PointLight") {
		switch (evt.keyCode) {
			case 71: // G
				obj3d.edgesTC = !obj3d.edgesTC;
				if (obj3d.edgesTC) {
					obj3d.traverse(function (child) {

						if (child.isMesh) {


							// Add a mesh which will be used for our Edges
							var geometry = child.geometry;
							/*var material = child.material.color = new THREE.Color(0xcccccc);
							var mesh = new THREE.Mesh(geometry, material);

							mesh.name = 'meshEdges';
							TR3.scene.add(mesh);*/

							// Setup our Edges
							var edgesGeometry = new THREE.EdgesGeometry(geometry);
							var edgesMaterial = new THREE.LineBasicMaterial({ color: 0xcccccc });
							var edges = new THREE.LineSegments(edgesGeometry, edgesMaterial);

							edges.name = 'edges';
							child.add(edges);

						}

					});
				} else {
					TR3.keyScape();
				}
				break;
			case 73: // I
				//if (obj3d.userData.physicsBody) {
				TR3.transCtrlsEnabled(false);

				var pos = obj3d.position;
				var mass = TR3.pscs.getPscsValues().ball.mass;
				var impulse = TR3.pscs.getPscsValues().ball.impulse;

				var raycaster = TR3.getRayCaster([new THREE.Vector3(TR3.camera.position.x, pos.y, TR3.camera.position.z), new THREE.Vector3(pos.x, pos.y, pos.z)], 'point-point');

				/*obj3d.userData.physicsBody.setLinearVelocity(new Ammo.btVector3(
					raycaster.ray.direction.x*impulse, 
					raycaster.ray.direction.y*impulse, 
					raycaster.ray.direction.z*impulse));*/

				TR3.pscs.makePscObj({ pos: obj3d.position, mass: mass, mesh: obj3d, dir: raycaster.ray.direction.multiplyScalar(impulse) });
				//}
				break;
			case 65: // A
				if (TR3.cloneObj === false) {
					TR3.cloneObj = true;
					TR3.canvasDest.style.cursor = "crosshair";
				} else {
					TR3.keyScape();
				}
				break;
			case 77: // M
				TR3.transCtrlsEnabled(false);

				var pos = obj3d.position;
				var paramsPhy = TR3.pscs.getPscsValues().ball;
				if (obj3d.TR3)
					obj3d.TR3.mass = paramsPhy.mass;

				TR3.pscs.makePscObj({ pos: pos, mass: paramsPhy.mass, mesh: obj3d });
				break;
			case 70: // F
				if (!obj3d.TR3.transformMesh) { obj3d.TR3.transformMesh = 1; } else {
					obj3d.TR3.transformMesh += 1;
				}

				TR3.transformMeshByObj3d();
				break;
			case 88: // X
				TR3.keyScape();

				obj3d.TR3.floorMesh = !obj3d.TR3.floorMesh;
				break;
			case 79: // O
				var pos = TR3.getCoordsByXYmod(obj3d.position.x, obj3d.position.z);
				obj3d.position.y = pos[4] - 1 * obj3d.TR3.box.min.y * obj3d.scale.y;
				obj3d.TR3.zFalse = true;
				break;
			case 83: // S
				if (!obj3d.newMaterial) { obj3d.newMaterial = 0; }
				var arrMat = ['MeshBasicMaterial', 'MeshLambertMaterial', 'MeshPhongMaterial', 'MeshStandardMaterial'];
				obj3d.traverse(function (child) {
					if (child.isMesh && child.material && child.material.color) {
						var newMaterial = new THREE[arrMat[obj3d.newMaterial]]({ color: child.material.color });
						child.material = newMaterial;
					}
				})
				obj3d.newMaterial++;
				if (obj3d.newMaterial >= arrMat.length) { obj3d.newMaterial = false; }
				break;
			case 76: // L
				var posTerr = TR3.coordM2T(obj3d.position.x, obj3d.position.y, obj3d.position.z);

				var box = TR3.getSizeObj(obj3d);

				var Height3D = box[1][0] * 1 / TR3.adjustScale;
				var Width3D = box[0][0] * 1 / TR3.adjustScale;
				var Depth3D = box[2][0] * 1 / TR3.adjustScale;

				var Wangle3D = THREE.MathUtils.radToDeg(obj3d.rotation.x);
				var PHIangle3D = THREE.MathUtils.radToDeg(obj3d.rotation.y);
				var Kangle3D = THREE.MathUtils.radToDeg(obj3d.rotation.z);

				var text = '<div id="infohelp3dObj" style="padding:10px 40px">\
								<div align="center"><b>Position</b></div>\
								<input id="hidden3D" style="display: none" value="" autofocus><br>\
								<b><span>X: </span></b><input id="Xpos3D" type="text" style="" value="'+ posTerr[0] + '"><br>\
								<b><span>Y: </span></b><input id="Ypos3D" type="text" style="" value="'+ posTerr[1] + '"><br>\
								<b><span>Z: </span></b><input id="Zpos3D" type="text" style="" value="'+ posTerr[2] + '"><br>\
								<div align="center"><b>Size</b></div>\
								<b><span>Alto: </span></b><input id="Height3D" type="text" style="" value="'+ Height3D + '"><br>\
								<b><span>Largo: </span></b><input id="Width3D" type="text" style="" value="'+ Width3D + '"><br>\
								<b><span>Profundo: </span></b><input id="Depth3D" type="text" style="" value="'+ Depth3D + '"><br>\
								<label><input type="checkbox" id="normalizeSize"> Proporcionar</label><br>\
								<div align="center"><b>Angle</b></div>\
								<b><span>W: </span></b><input id="Wangle3D" type="text" style="" value="'+ Wangle3D + '"><br>\
								<b><span>Phi: </span></b><input id="PHIangle3D" type="text" style="" value="'+ PHIangle3D + '"><br>\
								<b><span>K: </span></b><input id="Kangle3D" type="text" style="" value="'+ Kangle3D + '"><br>\
								<div align="center"><input id="UpdateData3D" type="button"  onclick="TR3.UpdateKeys3D(76)" value=" Actualizar Datos " style="margin-left:10px" class=""><br>\
								<input id="UpdateGeom3D" type="button"  onclick="TR3.UpdateGeom3D(1)" value=" Posición " style="margin-left:10px" class="">\
								<input id="UpdateGeom3D" type="button"  onclick="TR3.UpdateGeom3D(2)" value=" Tamaño " style="margin-left:10px" class="">\
								<input id="UpdateGeom3D" type="button"  onclick="TR3.UpdateGeom3D(3)" value=" Ángulo " style="margin-left:10px" class="">\
								</div>\
							</div>';
				document.getElementById('advices').innerHTML = text;
				$("#advices").dialog('open');
				break;
			case 84: // T
				obj3d.transparentTC = !obj3d.transparentTC;
				if (obj3d.transparentTC) {
					obj3d.traverse(function (child) {

						if (child.isMesh) {

							var material = child.material;
							if (material.length) {
								for (var i = 0; i < material.length; i++) {
									var mati = material[i];
									if (!mati.transparent) {
										mati.transparentTC = mati.opacity;
										mati.opacity = 0.25;
										mati.transparent = true;
									}
								}
							} else {
								var material = child.material;
								if (!material.transparent) {
									material.side = 2; //???wny??? ThreeJS bug?
									material.sideTC = material.side;
									material.transparentTC = material.opacity;
									material.opacity = 0.25;
									material.transparent = true;
								}
							}
						}

					});
				} else {
					TR3.keyScape();
				}
				break;
			case 67: // C
				if (!obj3d.clippingPlanes) {
					TR3.controls.enableZoom = false;
					var obj3dSize = (TR3.getSizeObj(obj3d)[3].max.y + TR3.getSizeObj(obj3d)[3].min.y) / 2;
					var localPlane = new THREE.Plane(new THREE.Vector3(0, - 1, 0), obj3dSize);
					/*var mesh = new THREE.Mesh(
						localPlane,
						new THREE.MeshBasicMaterial({ color: Math.round(0xffffff * Math.random()) })
					);
					TR3.scene.add(mesh);*/
					obj3d.traverse(function (child) {

						if (child.isMesh) {

							var material = child.material;
							if (material.length) {
								for (var i = 0; i < material.length; i++) {
									var mati = material[i];
									mati.clippingPlanes = [localPlane];
								}
							} else {
								material.clippingPlanes = [localPlane];
							}
						}
					});
					obj3d.clippingPlanes = true;
				} else {
					TR3.keyScape();
				}
				break;
		}
	}

	if (evt.keyCode == '85') { // U
		for (var i = 0; i < TR3.vGeom.obj3d.length; i++) {
			var obj3di = TR3.vGeom.obj3d[i];
			if (obj3di.isFloor && obj3di.isFloor == true) {
				var raycaster = TR3.getRayCaster([TR3.camera.position, new THREE.Vector3(0, 1, 0)], 'point-vector', 0, 3);
				var intersect = TR3.getIntersect(raycaster, [obj3di])[0][0];
				if (intersect) {
					i = TR3.vGeom.obj3d.length;
					var point = intersect.point;

					TR3.changeHeight(point.y + TR3.moveKey.size, true, false);
				}

			}
		}
	}

	if (evt.keyCode == '68') { // D
		for (var i = 0; i < TR3.vGeom.obj3d.length; i++) {
			var obj3di = TR3.vGeom.obj3d[i];
			if (obj3di.isFloor && obj3di.isFloor == true) {
				var raycaster = TR3.getRayCaster([TR3.camera.position, new THREE.Vector3(0, -1, 0)], 'point-vector', TR3.moveKey.size + 1, 5);
				var intersect = TR3.getIntersect(raycaster, [obj3di])[0][0];
				if (intersect) {
					i = TR3.vGeom.obj3d.length;
					var point = intersect.point;

					TR3.changeHeight(point.y + TR3.moveKey.size, true, false);
				}

			}
		}
	}

	if (evt.keyCode == '80') { // P

		var raycaster = TR3.getRayCaster(TR3.cursor.event);
		var intersect = TR3.getIntersect(raycaster, [TR3.mesh])[0][0];

		if (intersect && intersect.point) {
			TR3.controls.target.set(intersect.point.x,
				intersect.point.y,
				intersect.point.z);
		}

	}

	if (TR3.camera.visible == true && evt.keyCode == '17') { // Ctrl

		var randomColor = Math.round(0xffffff * Math.random());

		var plasmaBall = new THREE.Mesh(
			new THREE.BoxGeometry(0.12, 0.12, 1),
			new THREE.MeshBasicMaterial({ color: randomColor })
		);

		//var emitPos = new THREE.Vector3();
		//var emitter = TR3.emitter.getWorldPosition(emitPos)
		var emitterPos = new THREE.Vector3(1, -1, 0).unproject(TR3.camera); //vectorWeapon
		plasmaBall.position.copy(emitterPos); // start position - the tip of the weapon
		plasmaBall.quaternion.copy(TR3.camera.quaternion); // apply camera's quaternion
		TR3.scene.add(plasmaBall);

		var raycaster = TR3.getRayCaster();

		plasmaBall.pos = emitterPos;
		plasmaBall.vector = raycaster.ray.direction;
		plasmaBall.cont = 0;
		plasmaBall.colision = false;
		plasmaBall.distFrames = false;
		//plasmaBall.pos.push(new THREE.Vector3( plasmaBall.position.x, plasmaBall.position.y, plasmaBall.position.z ));
		TR3.pscs.plasmaBalls.push(plasmaBall);

	}

	if (TR3.camera.visible == true && evt.keyCode == '66') { // B

		var paramsPhy = TR3.pscs.getPscsValues().ball;

		// Creates a ball
		var ballMass = paramsPhy.mass;
		var ballRadius = paramsPhy.size / 2;
		var impulse = paramsPhy.impulse * 2;

		var ball = new THREE.Mesh(
			new THREE.SphereGeometry(ballRadius, 10, 10),
			new THREE.MeshBasicMaterial({ color: Math.round(0xffffff * Math.random()) })
		);

		var emitterPos = new THREE.Vector3(1, -1, 0).unproject(TR3.camera); //vectorWeapon

		var raycaster = TR3.getRayCaster();
		raycaster.ray.direction.multiplyScalar(impulse);

		TR3.scene.add(ball);
		TR3.pscs.makePscObj({ pos: emitterPos/*raycaster.ray.origin*/, dir: raycaster.ray.direction, mesh: ball, mass: ballMass });

	}

	if (evt.keyCode == '16') { // Sift
		TR3.camera.visible = !TR3.camera.visible;
		if (TR3.camera.visible == false) {
			for (var i = 0; i < TR3.pscs.plasmaBalls.length; i++) {
				TR3.scene.remove(TR3.pscs.plasmaBalls[i]);
			}
			TR3.pscs.plasmaBalls = [];
		}
	}

};

TR3.UpdateKeys3D = function (keyCode) {
	var key = new Array();
	key.keyCode = keyCode;
	TR3.keyDown(key);
};

TR3.UpdateGeom3D = function (type) {
	var obj3d = TR3.transformControls.object;
	if (type == 1) {
		var X = document.getElementById('Xpos3D').value * 1;
		var Y = document.getElementById('Ypos3D').value * 1;
		var Z = document.getElementById('Zpos3D').value * 1;
		var XYZmod = TR3.coordM2T(X, Y, Z, true);

		obj3d.position.set(XYZmod[0], XYZmod[1], XYZmod[2]);
	}
	else if (type == 2) {

		var width = document.getElementById('Width3D').value;
		var height = document.getElementById('Height3D').value;
		var depth = document.getElementById('Depth3D').value;

		var box = TR3.getSizeObj(obj3d);
		var Height3D = box[1][0] * 1 / TR3.adjustScale;
		var Width3D = box[0][0] * 1 / TR3.adjustScale;
		var Depth3D = box[2][0] * 1 / TR3.adjustScale;

		var valSizeX = width / Width3D;
		var valSizeY = height / Height3D;
		var valSizeZ = depth / Depth3D;
		var norn = document.getElementById('normalizeSize').checked;
		if (norn) {
			if (width / Width3D !== 1) {
				valSizeX = valSizeY = valSizeZ = valSizeX;
			}
			else if (height / Height3D !== 1) {
				valSizeX = valSizeY = valSizeZ = valSizeY;
			}
			else if (depth / Depth3D !== 1) {
				valSizeX = valSizeY = valSizeZ = valSizeZ;
			}
		}

		obj3d.scale.x = obj3d.scale.x * valSizeX;
		obj3d.scale.y = obj3d.scale.y * valSizeY;
		obj3d.scale.z = obj3d.scale.z * valSizeZ;
	}
	else if (type == 3) {
		obj3d.rotation.x = 0;
		obj3d.rotation.y = 0;
		obj3d.rotation.z = 0;

		obj3d.rotateX(THREE.MathUtils.degToRad(document.getElementById('Wangle3D').value * 1));
		obj3d.rotateY(THREE.MathUtils.degToRad(document.getElementById('PHIangle3D').value * 1));
		obj3d.rotateZ(THREE.MathUtils.degToRad(document.getElementById('Kangle3D').value * 1));
	}
	TR3.UpdateKeys3D(76);
};

TR3.keyUp = function (evt) {
	TR3.moveKey.is = false;
	//if (evt.keyCode == 18) { TR3.cursor.setZterr = false; } //Alt
	//if (evt.keyCode == 16) { TR3.cursor.setZterr = false; /*TR3.cursor.helper.hideShadowBase();*/ }
	if (TR3.transformControls.enabled) {
		switch (evt.keyCode) {
			case 17: // Ctrl
				TR3.transformControls.setTranslationSnap(null);
				TR3.transformControls.setRotationSnap(null);
				break;
		}
	}
};

TR3.keyScape = function () {
	var obj3d = TR3.transformControls.object;

	if (obj3d.clippingPlanes && typeof obj3d.clippingPlanes == 'boolean') {
		TR3.controls.enableZoom = true;
		var localPlane = new THREE.Plane(new THREE.Vector3(0, - 1, 0), Infinity);
		obj3d.traverse(function (child) {

			if (child.isMesh) {
				var material = child.material;
				if (material.length) {
					for (var i = 0; i < material.length; i++) {
						var mati = material[i];
						mati.clippingPlanes = [localPlane];
					}
				} else {
					material.clippingPlanes = [localPlane];
				}
			}
		});
		obj3d.clippingPlanes = false;
	}


	if (obj3d.userData.physicsBody) {
		TR3.pscs.physicsWorld.removeRigidBody(obj3d.userData.physicsBody);
		obj3d.userData.physicsBody = false;
		obj3d.TR3.mass = false;
	}


	if (obj3d.transparentTC && typeof obj3d.transparentTC == 'boolean') {
		obj3d.transparentTC = false;
		obj3d.traverse(function (child) {
			if (child.isMesh) {
				var material = child.material;
				if (material.length) {
					for (var i = 0; i < material.length; i++) {
						var mati = material[i];
						if (mati.transparentTC) {
							mati.opacity = mati.transparentTC;
							mati.transparent = false;
						}
					}
				} else {
					if (material.transparentTC) {
						material.opacity = material.transparentTC;
						material.transparent = false;
					}
				}
			}
		});
	}

	if (obj3d.TR3.transformMesh && typeof obj3d.TR3.transformMesh === 'number') {
		obj3d.TR3.transformMesh = 4;
		TR3.transformMeshByObj3d();
	}

	if (obj3d.TR3.floorMesh) {
		obj3d.TR3.floorMesh = false;
	}

	if (typeof TR3.cloneObj == 'boolean') {
		TR3.cloneObj = false;
		TR3.canvasDest.style.cursor = "default";
	}


	if (obj3d.edgesTC && typeof obj3d.edgesTC == 'boolean') {
		obj3d.edgesTC = false;
		//TR3.scene.remove(TR3.scene.getObjectByName('Edges')); Not working...
		obj3d.traverse(function (child) {

			if (child.name == 'edges') {
				//var material = child.material.color = new THREE.Color(0xcccccc);
				child.parent.remove(child);
			}
		});
	}

	obj3d.visible = true;
	TR3.transCtrlsEnabled(false);
};'use strict';
TR3.getDist = function (x1, y1, z1, x2, y2, z2) {

	var dist3D, distTerr, distAlt, dist2D;

	var dAlt = (z2 - z1) * 1 / TR3.adjustScale;
	TR3.distAlt += dAlt;
	distAlt = TR3.formatMeasure(TR3.distAlt);

	var d2D = TR3.getCoordsDistance([x1, y1], [x2, y2]);//Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2)+Math.pow(0-0,2))
	TR3.dist2D += d2D
	dist2D = TR3.formatMeasure(TR3.dist2D);

	TR3.dist3D += Math.sqrt(Math.pow(d2D, 2) + Math.pow(dAlt, 2));//TR3.getCoordsDistance3D
	dist3D = TR3.formatMeasure(TR3.dist3D);

	var segments = TR3.setSegmentsByTerr(x1, y1, z1, x2, y2, z2, 3);
	var segMod = segments[1];

	var segGeom = new Array();
	for (var i = 0; i < segMod.length; i++) {
		segGeom.push(new THREE.Vector3(segMod[i][0], segMod[i][1], segMod[i][2]));
	}

	var material = { color: 0x00ff00 };
	var vItem = { reload: false };
	var Line = TR3.makeVectFeat(segGeom, 'Line', material, vItem);
	TR3.scene.add(Line);

	TR3.distTerr += segments[0];
	distTerr = TR3.formatMeasure(TR3.distTerr);

	dist3D = { name: 'Dist.3D', val: dist3D[0], unit: dist3D[1] };
	distTerr = { name: 'Dist.terr', val: distTerr[0], unit: distTerr[1] };
	dist2D = { name: 'Dist.2D', val: dist2D[0], unit: dist2D[1] };
	distAlt = { name: 'Dif.alt', val: distAlt[0], unit: distAlt[1] };

	return [dist2D, dist3D, distTerr, distAlt];
};

TR3.getSurf = function (coords, thisLine) {
	coords.push(coords[0]);
	var perim3D = 0;
	var perim2D = 0;
	var perimTerr = 0;
	var segGeomPeriTerr3d = [];
	var segGeomPeriTerr2d = [];
	
	var targetFloorMes = 0;
	var searchFloorMeshJ;

	//var coordOriMod = [coords[0][3], coords[0][4], coords[0][5]];

	for (var i = 0; i < coords.length - 1; i++) {
		var x1 = coords[i][0];
		var y1 = coords[i][1];
		var z1 = coords[i][2];
		var x2 = coords[i + 1][0];
		var y2 = coords[i + 1][1];
		var z2 = coords[i + 1][2];

		var segmentsPeri = TR3.setSegmentsByTerr(x1, y1, z1, x2, y2, z2, 3);
		for (var j = 0; j < segmentsPeri[1].length - 1; j++) {
			segGeomPeriTerr3d.push(new THREE.Vector3(segmentsPeri[1][j][0], segmentsPeri[1][j][1], segmentsPeri[1][j][2]));
			segGeomPeriTerr2d.push(new THREE.Vector2(segmentsPeri[1][j][0], segmentsPeri[1][j][2]));
		}

		perimTerr += segmentsPeri[0];

		var dAlt = (z2 - z1) * 1 / TR3.adjustScale;
		var d2D = TR3.getCoordsDistance([x1, y1], [x2, y2]);
		perim2D += d2D;
		perim3D += Math.sqrt(Math.pow(d2D, 2) + Math.pow(dAlt, 2));

		//fillmesh
		var searchFloorMesh = TR3.getSelectableObj();
		for (var j = 0; j < searchFloorMesh.length; j++) {
			searchFloorMeshJ = searchFloorMesh[j];
			if (searchFloorMeshJ.TR3 && searchFloorMeshJ.TR3.floorMesh) {
				var intersect = TR3.getCoordsByXYmod(coords[i][0], coords[i][1], [searchFloorMeshJ], true);
				if (intersect[6])
					targetFloorMes++;
			}
		}

	}

	var fillMesh;
	if (targetFloorMes == coords.length - 1) {
		fillMesh = searchFloorMeshJ;
	} else {
		var trianglesShape = THREE.ShapeUtils.triangulateShape(segGeomPeriTerr2d, []);
		var geometry3d = new THREE.BufferGeometry().setFromPoints(segGeomPeriTerr3d);
		var indices = [];
		for (var i = 0; i < trianglesShape.length; i++) {
			indices.push(trianglesShape[i][0], trianglesShape[i][1], trianglesShape[i][2]);
		}
		geometry3d.setIndex(indices);

		var style = { color: "#777777", side: THREE.DoubleSide, transparent: true, opacity: 0.75 };
		var vItem = { reload: true };
		fillMesh = TR3.makeMeshFeat(geometry3d, "Basic", style, vItem);
	}

	TR3.scene.add(fillMesh);

	var pos = thisLine.geometry.getAttribute("position");
	var vLine2d = [];
	var vLine2dTR = [];
	var vLine3dTR = [];
	for (var i = 0; i < thisLine.nPoint; i++) {
		var vTerr = TR3.coordM2T(pos.getX(i), pos.getY(i), pos.getZ(i));
		vLine2d.push(new THREE.Vector2(vTerr[0], vTerr[1]));
		vLine2dTR.push(new THREE.Vector2(pos.getX(i), pos.getZ(i)));
		vLine3dTR.push(new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i)));
	}
	var areaSurf2d = TR3.formatMeasure(Math.abs(THREE.ShapeUtils.area(vLine2d)), "surf");

	var triangles = THREE.ShapeUtils.triangulateShape(vLine2dTR, []);
	var geometry3d = new THREE.BufferGeometry().setFromPoints(vLine3dTR);
	var indices = [];
	var area3d = 0;
	var areaTer = 0;
	var volTer = 0;
	for (var i = 0; i < triangles.length; i++) {
		var t1 = triangles[i][0];
		var t2 = triangles[i][1];
		var t3 = triangles[i][2];

		geometry3d.setIndex(indices.push(t1, t2, t3));
		var pos = geometry3d.getAttribute("position");
		var va = new THREE.Vector3(pos.getX(t1), pos.getY(t1), pos.getZ(t1));
		var vb = new THREE.Vector3(pos.getX(t2), pos.getY(t2), pos.getZ(t2));
		var vc = new THREE.Vector3(pos.getX(t3), pos.getY(t3), pos.getZ(t3));
		var t = new THREE.Triangle(va, vb, vc);

		area3d += Math.abs(t.getArea());
		var geomTriangles = TR3.makeSubTriangles([t], 3);
		var metrics3d = TR3.get3dMetrics(geomTriangles, fillMesh);
		areaTer += metrics3d[0];
		volTer += metrics3d[1];
	}

	var areaSurf3d = TR3.formatMeasure(area3d, "surf");
	var areaSurfTer = TR3.formatMeasure(areaTer, "surf");
	var volSurfTer = TR3.formatMeasure(volTer, "vol");

	perim2D = TR3.formatMeasure(perim2D);
	perim3D = TR3.formatMeasure(perim3D);
	perimTerr = TR3.formatMeasure(perimTerr);

	var per2D, per3D, perTer, surf2D, surf3D, surfTer, volTer;
	per2D = { name: 'Per.2D', val: perim2D[0], unit: perim2D[1] };
	per3D = { name: 'Per.3D', val: perim3D[0], unit: perim3D[1] };
	perTer = { name: 'Per.terr', val: perimTerr[0], unit: perimTerr[1] };

	surf2D = { name: 'Surf.2D', val: areaSurf2d[0], unit: areaSurf2d[1] };
	surf3D = { name: 'Surf.3D', val: areaSurf3d[0], unit: areaSurf3d[1] };
	surfTer = { name: 'Surf.terr', val: areaSurfTer[0], unit: areaSurfTer[1] };

	volTer = { name: 'Vol.terr', val: volSurfTer[0], unit: volSurfTer[1] };

	return [per2D, per3D, perTer, surf2D, surf3D, surfTer, volTer];
};

TR3.makeSubTriangles = function (triangles, multi) {
	var multip = multi || 1;
	var areaTarget = (TR3.tPixMesh * TR3.tPixMesh / 2) / multip;
	var i = 0;
	var trianglesArr = new Array();

	for (var i = 0; i < triangles.length; i++) {
		var Tarr = triangles[i];
		var centroid = new THREE.Vector3((Tarr.a.x + Tarr.b.x + Tarr.c.x) / 3, (Tarr.a.y + Tarr.b.y + Tarr.c.y) / 3, (Tarr.a.z + Tarr.b.z + Tarr.c.z) / 3);
		var vertices = new Array();
		vertices.push(Tarr.a, Tarr.b, Tarr.c, Tarr.a);

		for (var j = 0; j < vertices.length - 1; j++) {
			var vCent = centroid;
			var va = vertices[j];
			var vb = vertices[j + 1];
			var vAB = new THREE.Vector3((va.x + vb.x) / 2, (va.y + vb.y) / 2, (va.z + vb.z) / 2);

			var t1 = new THREE.Triangle(vCent, vAB, va);
			trianglesArr.push(t1);

			var t2 = new THREE.Triangle(vCent, vAB, vb);
			trianglesArr.push(t2);
		}

	}

	if (Math.abs(trianglesArr[0].getArea()) > areaTarget) {
		return TR3.makeSubTriangles(trianglesArr, multip);
	} else {
		return trianglesArr;
	}
};

TR3.get3dMetrics = function (triangles, baseMesh) {

	var areaTer = 0;
	var volTer = 0;
	//var mesh = TR3.scene.getObjectById( baseMesh );
	var vItem = { reload: true };
	var groupFillMesh = TR3.makeMeshFeat('', "Group", '', vItem);

	for (var i = 0; i < triangles.length; i++) {
		var points3d = [];

		var coords = TR3.getCoordsByXYmod(triangles[i].a.x, triangles[i].a.z, false);
		points3d.push(new THREE.Vector3(coords[3], coords[4], coords[5]));

		var coords = TR3.getCoordsByXYmod(triangles[i].b.x, triangles[i].b.z, false);
		points3d.push(new THREE.Vector3(coords[3], coords[4], coords[5]));

		var coords = TR3.getCoordsByXYmod(triangles[i].c.x, triangles[i].c.z, false);
		points3d.push(new THREE.Vector3(coords[3], coords[4], coords[5]));

		var geometry = new THREE.BufferGeometry().setFromPoints(points3d)
		var material = new THREE.MeshBasicMaterial({/*map:texture*/
			color: "#00ff00",
			wireframe: true,
		});
		var fillMesh = new THREE.Mesh(geometry, material);
		groupFillMesh.add(fillMesh)

		var t3d = new THREE.Triangle(points3d[0], points3d[1], points3d[2]);
		var area3d = Math.abs(t3d.getArea());
		areaTer += area3d;

		var points2d = [];
		points2d.push(new THREE.Vector3(triangles[i].c.x, 0, triangles[i].b.z));
		points2d.push(new THREE.Vector3(triangles[i].c.x, 0, triangles[i].b.z));
		points2d.push(new THREE.Vector3(triangles[i].c.x, 0, triangles[i].b.z));

		var t2d = new THREE.Triangle(points2d[0], points2d[1], points2d[2]);
		var area2d = (Math.abs(t2d.getArea()) + area3d) / 2;

		var centroid = new THREE.Vector2((triangles[i].a.x + triangles[i].b.x + triangles[i].c.x) / 3, (triangles[i].a.z + triangles[i].b.z + triangles[i].c.z) / 3);
		//var centroid = t3d.getMidpoint();
		var Hsurf = TR3.getCoordsByXYmod(centroid.x, centroid.y, false);
		var CoordPeri = TR3.getCoordsByXYmod(centroid.x, centroid.y, [baseMesh]);
		var Hdif = Hsurf[2] - CoordPeri[2];
		volTer += area2d * Hdif;
	}
	TR3.scene.add(groupFillMesh);

	return [areaTer, volTer];

};

TR3.setSegmentsByTerr = function (x1, y1, z1, x2, y2, z2, multi, inv) {
	var vMod = new Array();
	var vTerr = new Array();
	var cp2;
	if (inv == true) {
		var XYZ1 = TR3.coordM2T(x1, y1, z1);
		x1 = XYZ1[0];
		y1 = XYZ1[1];
		z1 = XYZ1[2];
		var XYZ2 = TR3.coordM2T(x2, y2, z2);
		x2 = XYZ2[0];
		y2 = XYZ2[1];
		z2 = XYZ2[2];
	};
	var nSegX = Math.ceil(Math.abs((x2 - x1) / TR3.tPixMesh));
	var nSegY = Math.ceil(Math.abs((y2 - y1) / TR3.tPixMesh));
	var nSeg = Math.max(nSegX, nSegY) * multi;  //multi=3 mejor ajuste
	var distTerr = 0;

	var sizeSegX = (x2 - x1) / nSeg;
	var sizeSegY = (y2 - y1) / nSeg;

	for (var j = 0; j < nSeg; j++) {

		var xp1 = x1 + sizeSegX * j;
		var yp1 = y1 + sizeSegY * j;
		var cp1 = TR3.getCoordsByXYmod(xp1, yp1, false, true);

		vMod.push([cp1[3], cp1[4], cp1[5]]);
		vTerr.push([cp1[0], cp1[1], cp1[2]]);

		var xp2 = x1 + sizeSegX * (j + 1);
		var yp2 = y1 + sizeSegY * (j + 1);
		cp2 = TR3.getCoordsByXYmod(xp2, yp2, false, true);

		var alt = cp2[2] - cp1[2];
		var dist = TR3.getCoordsDistance([cp1[0], cp1[1]], [cp2[0], cp2[1]]);

		distTerr += Math.sqrt(Math.pow(dist, 2) + Math.pow(alt, 2));

		//distTerr += Math.sqrt(Math.pow(cp2[0]-cp1[0],2)+Math.pow(cp2[1]-cp1[1],2)+Math.pow(cp2[2]-cp1[2],2));
	}

	if (cp2 != null) {
		vMod.push([cp2[3], cp2[4], cp2[5]]);
		vTerr.push([cp2[0], cp2[1], cp2[2]]);
	}

	return [distTerr, vMod, vTerr];
}

TR3.getCoordsDistance = function (c1, c2) {
	var dist;
	if (typeof ol !== 'undefined') {
		var thisProj = TR3.srsImg;

		var c1 = ol.proj.toLonLat(c1, thisProj);
		var c2 = ol.proj.toLonLat(c2, thisProj);

		dist = ol.sphere.getDistance(c1, c2);
	} else if (typeof L !== 'undefined') {
		var sphProj = 'EPSG:4326';
		var c1 = L.latLng(proj4(proj4.defs(TR3.srsImg), proj4.defs(sphProj), c1));
		var c2 = L.latLng(proj4(proj4.defs(TR3.srsImg), proj4.defs(sphProj), c2));

		dist = c1.distanceTo(c2);
	}
	else { dist = Math.sqrt(Math.pow(c2[0] - c1[0], 2) + Math.pow(c2[1] - c1[1], 2)); }
	return dist;
}



TR3.getCoordsDistance3D = function (p1, p2) {

	var dAlt = (p2[2] - p1[2]) * 1 / (TR3.adjustScale || 1);
	var d2D = TR3.getCoordsDistance([p1[0], p1[1]], [p2[0], p2[1]]);//Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2)+Math.pow(0-0,2))

	var dist3D = Math.sqrt(Math.pow(d2D, 2) + Math.pow(dAlt, 2));//H2=c2+c2

	return dist3D;
};

TR3.formatMeasure = function (length, type) {
	var unit;
	var absLength;
	length = length || 1;
	if (type == "surf") {
		absLength = Math.abs(length);
		if (absLength > 1000000) {
			length = (length / 1000000).toFixed(3);
			unit = 'km2'
		} else {
			length = (length).toFixed(2);
			unit = 'm2'
		}
	} else if (type == "vol") {
		absLength = Math.abs(length);
		if (absLength > 1000000000) {
			length = (length / 1000000000).toFixed(3);
			unit = 'km3'
		} else {
			length = (length).toFixed(2);
			unit = 'm3'
		}
	} else {//dist
		absLength = Math.abs(length);
		if (absLength > 1000) {
			length = (length / 1000).toFixed(3);
			unit = 'km'
		} else {
			length = (length).toFixed(2);
			unit = 'm'
		}
	}

	return [length, unit];
};'use strict';
//https://www.3dcitydb.org/3dcitydb-web-map/1.7/3dwebclient/index.html?title=Berlin_Demo&batchSize=1&latitude=52.517479728958044&longitude=13.411141287558161&height=534.3099172951087&heading=345.2992773976952&pitch=-44.26228062802528&roll=359.933888621294&layer_0=url%3Dhttps%253A%252F%252Fwww.3dcitydb.org%252F3dcitydb%252Ffileadmin%252Fmydata%252FBerlin_Demo%252FBerlin_Buildings_rgbTexture_ScaleFactor_0.3%252FBerlin_Buildings_rgbTexture_collada_MasterJSON.json%26name%3DBrlin_Buildings_rgbTexture%26active%3Dtrue%26spreadsheetUrl%3Dhttps%253A%252F%252Fwww.google.com%252Ffusiontables%252FDataSource%253Fdocid%253D19cuclDgIHMqrRQyBwLEztMLeGzP83IBWfEtKQA3B%2526pli%253D1%2523rows%253Aid%253D1%26cityobjectsJsonUrl%3D%26minLodPixels%3D100%26maxLodPixels%3D1.7976931348623157e%252B308%26maxSizeOfCachedTiles%3D200%26maxCountOfVisibleTiles%3D200
//https://gis.stackexchange.com/questions/13585/is-there-an-open-source-gis-to-view-and-edit-citygml-models
//https://www.idee.es/resources/presentaciones/JIIDE13/miercoles/7_CityGML.pdf
//http://www.citygmlwiki.org/index.php/Open_Source
//http://www.citygmlwiki.org/index.php/Freeware

/*TR3.makeApilator = function (gltf, scale, n, animation, boxMin) {

	if (n == 100) {
		var nClon = 7;
		var R = 70;
		var ang = 2 * Math.PI / (nClon + 1);

		var xC = posObj3d.x;
		var yC = 1 * posObj3d.z - 70;

		for (i = 0; i <= nClon; i++) {
			if (i != 6) {
				var zeta = TR3.operaValues(- boxMin, posObj3d.y, 'suma');
				var pos = new THREE.Vector3(xC + (R * Math.cos(ang * i)), posObj3d.y - boxMin, yC - (R * Math.sin(ang * i)));
				var clon = TR3.makeClon(gltf, obj3d, pos, scale, animation)
				TR3.scene.add(clon);
			}
		}

	} else {
		for (var i = 0; i < n - 1; i++) {
			var zeta = TR3.operaValues(- boxMin, posObj3d.y, 'suma');
			var pos = new THREE.Vector3(posObj3d.x, zeta + size * (i + 1), posObj3d.z);
			var clon = TR3.makeClon(gltf, obj3d, pos, scale, animation)
			TR3.scene.add(clon);
		}
	}

};*/

TR3.setCloneObj = function (obj3d) {
	var clon = TR3.SkeletonUtilsClone(obj3d);
	clon.TR3 = JSON.parse(JSON.stringify(obj3d.TR3));
	clon.TR3.blob = 0;
	if(clon.TR3.extraData){
		clon.TR3.extraData.id = ''; // borra id para plataforma GB portal
		clon.TR3.extraData.changed = true; // subir para plataforma GB portal

	}

	var coord = new THREE.Vector3();
	if (TR3.cursor.coordClick) {
		coord.x = TR3.cursor.coordClick.x;
		coord.y = TR3.cursor.coordClick.y;
		coord.z = TR3.cursor.coordClick.z;
		coord.y = TR3.operaValues(-1*clon.TR3.box.min.y * clon.scale.y, coord.y, 'suma');
	} else {
		console.log('fail position Clone');
	}

	clon.position.set(coord.x, coord.y, coord.z);

	var aRotate = clon.TR3.aRotate;
	if (aRotate) {
		if (typeof aRotate[0] === "boolean" || typeof aRotate[0] === "number") {
			if (typeof aRotate[0] === "boolean") {
				TR3.rotate.push([clon, 0.02]);
			} else { clon.rotation.y = aRotate[0]; }
		} else {
			if (typeof aRotate === "boolean") {
				TR3.rotate.push([clon, 0.02]);
			} else { clon.rotation.y = aRotate; }
		}
	}

	/*if (clon.animations.length > 0 && animation) { TransformControls.object no da animation... Find origin mix and push
		var mixer = new THREE.AnimationMixer(clon);
		mixer.clipAction(clon.animations[0]).play();
		TR3.mixer.push(mixer);
	}*/

	if (!TR3.vGeom.obj3d) {
		TR3.vGeom.obj3d = new Array(0);
	}

	TR3.vGeom.obj3d.push(clon);
	TR3.scene.add(clon);
};

TR3.makeMultiPos = function (gltf, pos, scale, animation, extraData, slctItem, aRotate) {
	var obj3d = gltf.scene;
	for (var i = 1; i < pos.length; i++) {
		var posI = pos[i];
		var scaleI = scale[i];
		var extraDataI = extraData[i] || new Array();
		var slctItemI = slctItem[i];
		var aRotateI = aRotate[i];

		var coordM = TR3.coordM2T(posI[0], posI[1], posI[2], true);
		var posObj3d = new THREE.Vector3();
		posObj3d.x = coordM[0];
		posObj3d.y = coordM[1];
		posObj3d.z = coordM[2];
		posObj3d.w = posI[2];

		/*var clon = */TR3.makeClon(gltf, obj3d, posObj3d, scaleI, animation, extraDataI, slctItemI, aRotateI);
		//var shadow = TR3.setShadowBase(clon);
		//TR3.scene.add(clon);
	}
};

TR3.makeClon = function (gltf, obj3d, posObj3d, scale, animation, extraData, slctItem, aRotate) {
	var clon = obj3d.clone();//clone?...
	var clonGltf = new Array();
	Object.assign(clonGltf, gltf);

	clon.TR3 = new Object();
	clon.TR3 = JSON.parse(JSON.stringify(obj3d.TR3));

	clon.TR3.slctItem = slctItem;
	clon.TR3.aRotate = aRotate;
	clon.TR3.extraData = extraData;
	//clon.TR3.blob = false;

	if (typeof obj3d.TR3.mass !== 'undefined' && typeof obj3d.TR3.mass == "number") {
		if (TR3.pscs.physicsWorld){//tooFast 2 physics
			clon.TR3.mass = obj3d.TR3.mass;
			TR3.pscs.goBrick(clon);
		}else{
			clon.TR3.mass = obj3d.TR3.mass.toString();
		}
	}

	if (scale) {
		//if (typeof scale === "object") {
		if (clon.TR3.isPixSize) {
			var bboxObjGeom = clon.TR3.hitbox;

			scale[0] = TR3.pix2geo(scaleSet[0]) / bboxObjGeom.x;
			scale[1] = TR3.pix2geo(scaleSet[1]) / bboxObjGeom.z;
			scale[2] = TR3.pix2geo(scaleSet[2]) / bboxObjGeom.y;
		} else if (clon.TR3.isRealSize) {
			var size = scale[0] / clon.TR3.hitbox.y;
			scale = new Array();

			scale[0] = size;
			scale[1] = size;
			scale[2] = size;
		}
		//}
		clon.scale.set(scale[0], scale[2], scale[1]);

	}

	if (aRotate) {
		if (typeof aRotate[0] === "boolean" || typeof aRotate[0] === "number") {
			if (typeof aRotate[0] === "boolean" && aRotate[0] === true) {
				TR3.rotate.push([clon, 0.02]);
			} else if (typeof aRotate[0] === "number") {
				clon.rotation.y = aRotate;
			}
		} else if (typeof aRotate === "boolean" || typeof aRotate === "number") {
			if (typeof aRotate === "boolean" && aRotate === true) {
				TR3.rotate.push([clon, 0.02]);
			} else if (typeof aRotate === "number") {
				clon.rotation.y = aRotate;
			}
		}
	}

	if (clonGltf.animations.length > 0 && animation) {
		var mixer = new THREE.AnimationMixer(clon);
		mixer.clipAction(clonGltf.animations[clon.TR3.animateAction]).play();
		TR3.mixer.push(mixer);
	}

	if (posObj3d.w == false) { posObj3d.y = ( -1 * clon.TR3.box.min.y ) * clon.scale.y; }
	clon.position.set(posObj3d.x, posObj3d.y, posObj3d.z); // or any other coordinates

	clonGltf.scene = clon;
	if (!TR3.vGeom.obj3d) {
		TR3.vGeom.obj3d = new Array(0);
	}
	if (slctItem !== false) {
		TR3.vGeom.obj3d.push(clonGltf);
	}
	TR3.loadedFiles.push(clonGltf);
	//return clon;
};

TR3.handleFileSelect = function (evt) {
	TR3.sourceFile = false;
	if (evt.target.files) {
		var file = evt.target.files[0]; // FileList object

		document.getElementById(evt.target.id + '_fake').value = file.name;

		TR3.sourceFile = { blob: (window.URL || window.webkitURL).createObjectURL(file), src: file.name }
		/*file.text().then(
			function(t){
				TR3.sourceFile.blobText=t;}
		);*/
		var fileReader = new FileReader();
		fileReader.onload = function () {
			var flag = true;
			for (var i = 0; i < TR3.blobs.length; i++) {
				var blobsI = TR3.blobs[i];
				if (blobsI.src == TR3.sourceFile.src) {
					flag = false;
				}
			}
			if (flag === true) {
				TR3.blobs.push({ src: TR3.sourceFile.src, blobText: fileReader.result });
			}
			TR3.canvasDest.style.cursor = "crosshair";
		}
		fileReader.readAsDataURL(file);

	} else {
		alert("Acción no soportada por su navegador, actualicese o utilice algún otro");
	}

};

TR3.loadFile = function (params) {

	var dfd_LoadFile = $.Deferred();

	if (params === undefined) params = {};

	var srcLoad = params.hasOwnProperty("src") ?
		params["src"] : false;

	var ext;
	var size3dObj = document.getElementById('size3dObj');
	size3dObj.innerHTML = '';

	var loader = 'loaderGLTF';

	//var file_3d_fake = document.getElementById('file_3d_fake').value;

	if (!srcLoad) {
		ext = TR3.sourceFile.src.split('.')[1].toLowerCase();
		srcLoad = TR3.sourceFile.blob;

		params.src = TR3.sourceFile.src;
		//params.blob = TR3.sourceFile.blobText;
		params.slctItem = true;
		params.persist2Scene = true;
	} else {
		var split = srcLoad.split('.')
		ext = split[split.length - 1];
	}

	if (ext == 'ifc') { params.isFloor = true; loader = 'loaderIFC'; }
	params.ext = ext;
	//TR3.loaderGLTF.setCrossOrigin( 'anonymous' );

	if (srcLoad && (ext == 'glb' || ext == 'ifc')) {
		TR3[loader].load(srcLoad, function (gltf) {

			TR3.loaderGLTFsucces(gltf, dfd_LoadFile, params);

		}, function (xhr) {

			size3dObj.innerHTML = Math.round(xhr.loaded / xhr.total * 100) + '% loaded';

		}, function (error) {

			size3dObj.innerHTML = 'error: ' + error.message;
			console.log(error);
			TR3.unlock3d('obj3d');
		});
	} else { console.log('error srcLoad or extension'); }
	return dfd_LoadFile.promise();

};

TR3.loaderGLTFsucces = function (gltf, dfd_LoadFile, params) {

	if (params === undefined) params = {};

	var pos = params.hasOwnProperty("pos") ?
		params["pos"] : false;

	var animation = params.hasOwnProperty("animation") ?
		params["animation"] : true;

	var scale = params.hasOwnProperty("scale") ?
		params["scale"] : false;

	var aRotate = params.hasOwnProperty("aRotate") ?
		params["aRotate"] : false;

	var apilator = params.hasOwnProperty("apilator") ?
		params["apilator"] : false;

	var slctItem = params.hasOwnProperty("slctItem") ?
		params["slctItem"] : false;

	var isPixSize = params.hasOwnProperty("isPixSize") ?
		params["isPixSize"] : false;

	var isRealSize = params.hasOwnProperty("isRealSize") ?
		params["isRealSize"] : false;

	var isFloor = params.hasOwnProperty("isFloor") ?
		params["isFloor"] : false;

	var srcLoad = params.hasOwnProperty("src") ?
		params["src"] : false;

	var ext = params.hasOwnProperty("ext") ?
		params["ext"] : false;

	var persist2Scene = params.hasOwnProperty("persist2Scene") ?
		params["persist2Scene"] : false;

	var mass = params.hasOwnProperty("mass") ?
		params["mass"] : false;

	var extraData = params.hasOwnProperty("extraData") ?
		params["extraData"] : new Array();

	var animateAction = params.hasOwnProperty("animateAction") ?
		params["animateAction"] : 0;

	gltf.persist2Scene = persist2Scene;

	var objGLTF = gltf.scene || gltf;

	var box = TR3.getSizeObj(objGLTF);
	objGLTF.TR3 = new Object();
	objGLTF.TR3.box = box[3];
	objGLTF.TR3.hitbox = box[4];
	objGLTF.TR3.radius = box[5];
	objGLTF.TR3.srcLoad = srcLoad;
	//objGLTF.TR3.blob = blob;
	objGLTF.TR3.isPixSize = isPixSize;
	objGLTF.TR3.isRealSize = isRealSize;
	objGLTF.TR3.aRotate = aRotate;
	objGLTF.TR3.mass = mass;
	objGLTF.TR3.animateAction = animateAction;

	if (Array.isArray(slctItem)) {
		objGLTF.TR3.slctItem = slctItem[0];
	} else if (slctItem) {
		objGLTF.TR3.slctItem = slctItem;
	}

	/*var offsetPos = new THREE.Vector3();
	if (ext === 'ifc') {
	} else {
		offsetPos.x -= (objGLTF.TR3.box.max.x + objGLTF.TR3.box.min.x) / 2;
		offsetPos.y -= (objGLTF.TR3.box.max.y + objGLTF.TR3.box.min.y) / 2;
		offsetPos.z -= (objGLTF.TR3.box.max.z + objGLTF.TR3.box.min.z) / 2;
		for(var i=0;i<objGLTF.children.legnth;i++){
				objGLTF.children[i].position.set(offsetPos.x,offsetPos.y,offsetPos.z);}
	}*/

	var size3dObj = document.getElementById('size3dObj');
	size3dObj.innerHTML = '<b>X:</b>' + (box[0][0] * 1 / TR3.adjustScale).toFixed(2) + '' + box[0][1] + ' <b>Y:</b>' + (box[2][0] * 1 / TR3.adjustScale).toFixed(2) + '' + box[2][1] + ' <b>Z:</b>' + (box[1][0] * 1 / TR3.adjustScale).toFixed(2) + '' + box[1][1];

	//objGLTF.castShadow = true;
	//objGLTF.receiveShadow = false;
	var animateObj = false;
	if (gltf.animations && gltf.animations.length > 0 && animation) {
		animateObj = true;
		var mixer = new THREE.AnimationMixer(objGLTF);
		mixer.clipAction(gltf.animations[animateAction]).play();
		TR3.mixer.push(mixer);
	}

	/*if (srcLoad.indexOf("drinking_water") > -1) {
		console.log('hh');
	}*/
	if (typeof extraData[0] === "object") {
		objGLTF.TR3.extraData = extraData[0];
	} else if (extraData) {
		objGLTF.TR3.extraData = extraData;
	}
	objGLTF.TR3.source = JSON.parse(JSON.stringify(params));

	var posFalse = false;
	var coord = new THREE.Vector3();
	if (typeof pos[0] === "object") {
		if (pos[0][2] == false) { posFalse = true; }
		var coordM = TR3.coordM2T(pos[0][0], pos[0][1], pos[0][2], true);
		coord.x = coordM[0];
		coord.y = coordM[1];
		coord.z = coordM[2];
	} else if (pos) {
		if (pos[2] == false) { posFalse = true; }
		var coordM = TR3.coordM2T(pos[0], pos[1], pos[2], true);
		coord.x = coordM[0];
		coord.y = coordM[1];
		coord.z = coordM[2];
	} else {
		posFalse = true;
		if (TR3.cursor.coordClick) {
			coord.x = TR3.cursor.coordClick.x;
			coord.y = TR3.cursor.coordClick.y;
			coord.z = TR3.cursor.coordClick.z;
		} else {
			console.log('fallo loaderGLTFsucces');
		}
	}

	/*if( isPixSize ){
		coord.y = TR3.zM2T(TR3.pix2geo(pos[2]),true) - TR3.zM2T(0,true);
	}*/
	//gltf.zPos = coord.y;

	var scaleSet = [1, 1, 1];
	if (scale) {
		if (typeof scale[0] === "object") {
			scaleSet = JSON.parse(JSON.stringify(scale[0]));
		} else {
			scaleSet = JSON.parse(JSON.stringify(scale));
		}
		if (objGLTF.TR3.isPixSize) {
			var bboxObjGeom = objGLTF.TR3.hitbox;

			scaleSet[0] = TR3.pix2geo(scaleSet[0]) / bboxObjGeom.x;
			scaleSet[1] = TR3.pix2geo(scaleSet[1]) / bboxObjGeom.z;
			scaleSet[2] = TR3.pix2geo(scaleSet[2]) / bboxObjGeom.y;
		} else if (objGLTF.TR3.isRealSize) {
			var size = scaleSet[0] / objGLTF.TR3.hitbox.y

			scaleSet[0] = size;
			scaleSet[1] = size;
			scaleSet[2] = size;
		}

		objGLTF.scale.set(scaleSet[0], scaleSet[2], scaleSet[1]);
	}

	if (aRotate) {
		if (typeof aRotate[0] === "boolean" || typeof aRotate[0] === "number") {
			if (typeof aRotate[0] === "boolean" && aRotate[0] === true) {
				TR3.rotate.push([objGLTF, 0.02]);
			} else if (typeof aRotate[0] === "number") {
				objGLTF.rotation.y = aRotate;
			}
		} else if (typeof aRotate === "boolean" || typeof aRotate === "number") {
			if (typeof aRotate === "boolean" && aRotate === true) {
				TR3.rotate.push([objGLTF, 0.02]);
			} else if (typeof aRotate === "number") {
				objGLTF.rotation.y = aRotate;
			}
		}
	}

	if (isFloor) { gltf.isFloor = isFloor; }
	if (ext) { gltf.ext = ext; }



	/*objGLTF.traverse(function (child) {
		if (child instanceof THREE.Mesh) {
			
			var geometry = child.geometry;
			var outlineMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.BackSide, blending: THREE.AdditiveBlending, transparent: true, opacity: 0.5 });

			var outlineMesh = new THREE.Mesh(geometry, outlineMaterial);
			outlineMesh.scale.set(scaleSet[0], scaleSet[2], scaleSet[1]);
			outlineMesh.rotation.x = 3 * Math.PI / 2;
			outlineMesh.scale.multiplyScalar(1.05);
			objGLTF.add(outlineMesh);

		}
	});*/

	/*var scaleposY = 1;
	if (scale && scale[0][2]) { scaleposY = scale[0][2] }
	else if (scale && scale[2]) { scaleposY = scale[2] }*/

	if (posFalse === true){
		coord.y = TR3.operaValues(-1*objGLTF.TR3.box.min.y * objGLTF.scale.y, coord.y, 'suma');
		objGLTF.TR3.zFalse = true;
	}
	objGLTF.position.set(coord.x, coord.y, coord.z);
	//var shadow = TR3.setShadowBase(objGLTF);

	if (typeof mass !== 'undefined' && typeof mass == "number") {
		if (TR3.pscs.physicsWorld){//tooFast 2 physics
			objGLTF.TR3.mass = mass;
			TR3.pscs.goBrick(objGLTF);
		}else{
			objGLTF.TR3.mass = mass.toString();
			console.log('tooFast 2 physics');
		}
	}

	if (!TR3.vGeom.obj3d) {
		TR3.vGeom.obj3d = new Array(0);
	}

	if (slctItem !== false || animateObj) {
		TR3.vGeom.obj3d.push(gltf);
	}

	if (!TR3.sourceFile) {
		TR3.sourceFile = '';
		document.getElementById('file_3d_fake').value = 'Explorar GLB/IFC...';
	} else {
		TR3.scene.add(objGLTF);
		//shadow.visible = true;

		TR3.transCtrlsEnabled(objGLTF);
	}

	if (apilator && !isNaN(apilator)) { TR3.makeApilator(gltf, scale, apilator, animation); }
	if (typeof (pos[0]) == "object") { TR3.makeMultiPos(gltf, pos, scale, animation, extraData, slctItem, aRotate); }

	TR3.loadedFiles.push(gltf);

	TR3.onCompleteFilesEv(TR3.loadedFiles);
	dfd_LoadFile.resolve(TR3.loadedFiles/*, shadow*/);

	//endLoad
	TR3.loadedFiles = new Array();
	var file_3d = document.getElementById('file_3d');
	file_3d.value = '';
	var file_3d_fake = document.getElementById('file_3d_fake');
	file_3d_fake.value = ' Explorar GLB/IFC... ';
	TR3.sourceFile = false;
	if (TR3.canvasDest && TR3.canvasDest.style)
		TR3.canvasDest.style.cursor = "default";
};'use strict';
TR3.pscs.physicsConf = function () {
    // Physics configuration

    var collisionConfiguration = new Ammo.btDefaultCollisionConfiguration();
    var dispatcher = new Ammo.btCollisionDispatcher(collisionConfiguration);
    var broadphase = new Ammo.btDbvtBroadphase();
    var solver = new Ammo.btSequentialImpulseConstraintSolver();
    TR3.pscs.physicsWorld = new Ammo.btDiscreteDynamicsWorld(dispatcher, broadphase, solver, collisionConfiguration);
    TR3.pscs.physicsWorld.setGravity(new Ammo.btVector3(0, -9.8, 0));

    TR3.pscs.transformAux1 = new Ammo.btTransform();

    /*var gravityConstant = -90.8;
    var collisionConfiguration = new Ammo.btSoftBodyRigidBodyCollisionConfiguration();
    var dispatcher = new Ammo.btCollisionDispatcher( collisionConfiguration );
    var broadphase = new Ammo.btDbvtBroadphase();
    var solver = new Ammo.btSequentialImpulseConstraintSolver();
    var softBodySolver = new Ammo.btDefaultSoftBodySolver();
    TR3.pscs.physicsWorld = new Ammo.btSoftRigidDynamicsWorld( dispatcher, broadphase, solver, collisionConfiguration, softBodySolver);
    TR3.pscs.physicsWorld.setGravity( new Ammo.btVector3( 0, gravityConstant, 0 ) );
    TR3.pscs.physicsWorld.getWorldInfo().set_m_gravity( new Ammo.btVector3( 0, gravityConstant, 0 ) );*/
};

TR3.pscs.setGround = function () {

    var posMesh = TR3.mesh.position;
    var groundShape = TR3.pscs.createTerrainShapePscs();
    var groundTransform = new Ammo.btTransform();
    groundTransform.setIdentity();
    // Shifts the terrain, since bullet re-centers it on its bounding box.
    groundTransform.setOrigin(new Ammo.btVector3(posMesh.x, (TR3.zM2T(TR3.zMax, true) + TR3.zM2T(TR3.zMin, true)) / 2, posMesh.z));
    var groundMass = 0;
    var groundLocalInertia = new Ammo.btVector3(0, 0, 0);
    var groundMotionState = new Ammo.btDefaultMotionState(groundTransform);
    var groundBody = new Ammo.btRigidBody(new Ammo.btRigidBodyConstructionInfo(groundMass, groundMotionState, groundShape, groundLocalInertia));
    TR3.pscs.physicsWorld.addRigidBody(groundBody);

    TR3.mesh.userData.physicsBody = groundBody;

};

TR3.pscs.rainPhy = function () {

    var paramsPhy = TR3.pscs.getPscsValues().zone;

    var vertices = TR3.mesh.geometry.getAttribute("position");
    var terrainWidth = TR3.reducMeshW;
    var terrainDepth = TR3.reducMeshH;

    var cont = 0;
    var into = 1;
    var random = Math.random();
    var randomMesh = random * TR3.formatMeasure(TR3.tPixMesh)[0] / 10;
    var roundPtl = 10

    var geomRain = new THREE.SphereGeometry(paramsPhy.size, roundPtl, roundPtl);
    var matRain = new THREE.MeshBasicMaterial({ color: Math.round(0xffffff * random) });

    for (var i = into; cont < terrainDepth * terrainWidth - into * terrainWidth * 2; i++) {
        cont = i * paramsPhy.interval * terrainWidth;
        for (var j = into; j < terrainWidth - into;) {
            var pos = new THREE.Vector3();
            pos.x = vertices.getX(cont + j) + TR3.mesh.position.x + randomMesh;
            pos.z = vertices.getZ(cont + j) + TR3.mesh.position.z + randomMesh;
            pos.y = TR3.zM2T(TR3.zMax, true) * 1.1 + 100;

            var dir = new THREE.Vector3(paramsPhy.direction[0], paramsPhy.direction[1], paramsPhy.direction[2]);
            dir.multiplyScalar(paramsPhy.impulse);

            var rainBall = new THREE.Mesh(
                geomRain,
                matRain
            );

            TR3.pscs.rain.push(rainBall);
            TR3.scene.add(rainBall);

            TR3.pscs.makePscObj({ pos: pos, dir: dir, mesh: rainBall, mass: paramsPhy.mass });

            j = j + paramsPhy.interval;
        }
    }
};

TR3.pscs.createTerrainShapePscs = function () {

    // This parameter is not really used, since we are using PHY_FLOAT height data type and hence it is ignored
    var heightScale = 1;

    // Up axis = 0 for X, 1 for Y, 2 for Z. Normally 1 = Y is used.
    var upAxis = 1;

    // hdt, height data type. "PHY_FLOAT" is used. Possible values are "PHY_FLOAT", "PHY_UCHAR", "PHY_SHORT"
    var hdt = "PHY_FLOAT";

    // Set this to your needs (inverts the triangles)
    var flipQuadEdges = false;

    var terrainWidth = TR3.reducMeshW;
    var terrainDepth = TR3.reducMeshH;
    var zone = TR3.zone;

    var vertices = TR3.mesh.geometry.getAttribute("position");

    // Creates height data buffer in Ammo heapTR3.reducMeshW, TR3.reducMeshH
    var ammoHeightData = Ammo._malloc(4 * terrainWidth * terrainDepth);

    // Copy the javascript height data array to the Ammo one.
    var p = 0;
    var p2 = 0;

    var zMin = vertices.getY(0)
	var zMax = vertices.getY(0);

    for (var j = 0; j < terrainDepth; j++) {

        for (var i = 0; i < terrainWidth; i++) {

            // write 32-bit float data to memory
            var zi = vertices.getY(p);
            Ammo.HEAPF32[ammoHeightData + p2 >> 2] = zi;

            if (zi < zMin) { zMin = zi; }
			if (zi > zMax) { zMax = zi; }

            p++;

            // 4 bytes/float
            p2 += 4;

        }

    }
    TR3.zMin = zMin;
	TR3.zMax = zMax;

    // Creates the heightfield physics shape
    var heightFieldShape = new Ammo.btHeightfieldTerrainShape(
        terrainWidth,
        terrainDepth,

        ammoHeightData,

        heightScale,
        TR3.zM2T(TR3.zMin, true),
        TR3.zM2T(TR3.zMax, true),

        upAxis,
        hdt,
        flipQuadEdges
    );

    // Set horizontal scale
    var scaleX = (zone[2] - zone[0]) / (terrainWidth - 1);
    var scaleZ = (zone[3] - zone[1]) / (terrainDepth - 1);
    heightFieldShape.setLocalScaling(new Ammo.btVector3(scaleX, 1, scaleZ));

    heightFieldShape.setMargin(0.05);

    return heightFieldShape;

};

TR3.pscs.updatePhysics = function (deltaTime) {
    if (TR3.pscs.physicsWorld && TR3.pscs.physicsWorld.stepSimulation) {
        TR3.pscs.physicsWorld.stepSimulation(deltaTime, 10);
    }
    // Update objects
    for (var i = 0, il = TR3.pscs.dynamicObjects.length; i < il; i++) {

        var objThree = TR3.pscs.dynamicObjects[i];
        var TCactive = false;
        if (objThree.TR3)
            TCactive = objThree.TR3.TCactive;

        var objPhys = objThree.userData.physicsBody;
        if (!TCactive && objPhys) {
            var ms = objPhys.getMotionState();
            if (ms) {

                ms.getWorldTransform(TR3.pscs.transformAux1);
                var p = TR3.pscs.transformAux1.getOrigin();
                var q = TR3.pscs.transformAux1.getRotation();
                objThree.position.set(p.x(), p.y(), p.z());
                objThree.quaternion.set(q.x(), q.y(), q.z(), q.w());

                objThree.userData.collided = false;

            }
        } else {
            //console.log('TCactive');
        }

    }

};


TR3.pscs.clearPscsObjs = function () {

    for (var i = 0; i < TR3.pscs.rain.length; i++) {
        var object = TR3.pscs.rain[i];
        TR3.pscs.physicsWorld.removeRigidBody(object.userData.physicsBody);
        TR3.scene.remove(object);
    }
    TR3.pscs.rain = [];
    TR3.transCtrlsEnabled(false);

};

TR3.pscs.updateGround = function () {
    TR3.pscs.physicsWorld.removeRigidBody(TR3.mesh.userData.physicsBody);
    TR3.mesh.userData.physicsBody = false;

    TR3.pscs.setGround();
};

TR3.pscs.makePscObj = function (params) {

    if (params === undefined) params = {};

    var pos = params.hasOwnProperty("pos") ?
        params["pos"] : false;

    var dir = params.hasOwnProperty("dir") ?
        params["dir"] : false;

    var angVel = params.hasOwnProperty("angVel") ?
        params["angVel"] : false;

    var threeObject = params.hasOwnProperty("mesh") ?
        params["mesh"] : false;

    var customShape = params.hasOwnProperty("customShape") ?
        params["customShape"] : false;

    var massOpt = params.hasOwnProperty("mass") ?
        params["mass"] : false;

    var friction = params.hasOwnProperty("friction") ?
        params["friction"] : false;

    var shape = null;
    var margin = 0.05;
    var threeObjectHitbox = false;

    if (threeObject.TR3 && threeObject.TR3.hitbox) {
        var scle = threeObject.scale;
        var hb = threeObject.TR3.hitbox;
        threeObject.TR3.mass = massOpt;
        //var box = threeObject.TR3.box;

        var geom = new THREE.BoxGeometry(hb.x  * scle.x, hb.y * scle.y, hb.z * scle.z);
        //geom.translate(0,threeObject.TR3.hitbox.y/2,0);
        var mat = new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.5, wireframe: true });
        threeObjectHitbox = new THREE.Mesh(geom, mat);
        //TR3.scene.add(threeObjectHitbox);
        
        threeObjectHitbox.position.set(pos.x, pos, pos.z);
        //threeObjectHitbox.position.set(pos.x + (box.max.x+box.min.x)*scle.x/2, pos.y + (box.max.y+box.min.y)*scle.y/2, pos.z + (box.max.z+box.min.z)*scle.z/2);
        var q = threeObject.quaternion;
        threeObjectHitbox.quaternion.set(q.x, q.y, q.z, q.w);
    }
    
    var objMesh = threeObjectHitbox || threeObject;
    var objMeshPrms = objMesh.geometry.parameters;

    if (!customShape) {
        if (objMeshPrms.radius) {
            shape = new Ammo.btSphereShape(objMeshPrms.radius);
        } else if (objMeshPrms.depth) {
            var size = objMeshPrms;
            var scale = objMesh.scale;
            shape = new Ammo.btBoxShape(new Ammo.btVector3(size.width * 0.5 * scale.x, size.height * 0.5 * scale.y, size.depth * 0.5 * scale.z));
            //sahpeThree = new THREE.Mesh( new THREE.BoxGeometry( size.width * scale.x, size.height * scale.y, size.depth * scale.z, 1, 1, 1 ), new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.5, wireframe: true }) );
        }
    } else {
        shape = TR3.pscs.createTriangleShapeByBufferGeometry(objMesh);
    }

    shape.setMargin(margin);

    //threeObject.add(threeObjectHitbox);
    /*threeObjectHitbox.TR3 = new Object();
	threeObjectHitbox.TR3.slctItem = true;
    TR3.vGeom.obj3d.push(threeObjectHitbox);*/

    threeObject.position.set(pos.x, pos.y, pos.z);

    var quat = threeObject.quaternion;

    var mass = massOpt;
    var localInertia = new Ammo.btVector3(0, 0, 0);
    shape.calculateLocalInertia(mass, localInertia);

    var transform = new Ammo.btTransform();
    transform.setIdentity();
    transform.setOrigin(new Ammo.btVector3(pos.x, pos.y, pos.z));

    transform.setRotation(new Ammo.btQuaternion(quat.x, quat.y, quat.z, quat.w));

    var motionState = new Ammo.btDefaultMotionState(transform);
    var rbInfo = new Ammo.btRigidBodyConstructionInfo(mass, motionState, shape, localInertia);
    var body = new Ammo.btRigidBody(rbInfo);
    //body.type = 'dynamic';//dynamic(Default), static, kinematic

    if (!friction) { friction = 0.5 }

    body.setFriction(friction);

    if (dir) {
        /*var scalingFactor = dir.impulse || 0;
        var resultantImpulse = new Ammo.btVector3(dir.x, dir.y, dir.z);
        resultantImpulse.op_mul(scalingFactor);

        body.setLinearVelocity(resultantImpulse);*/

        body.setLinearVelocity(new Ammo.btVector3(dir.x, dir.y, dir.z));
    }

    if (angVel) {

        body.setAngularVelocity(new Ammo.btVector3(angVel.x, angVel.y, angVel.z));

    }

    threeObject.userData.physicsBody = body;
    threeObject.userData.collided = false;

    TR3.pscs.dynamicObjects.push(threeObject);

    if (mass > 0) {
        // Disable deactivation
        body.setActivationState(4);
    }

    TR3.pscs.physicsWorld.addRigidBody(body);

    return [body, threeObject, threeObjectHitbox];
};

TR3.pscs.createTriangleShapeByBufferGeometry = function (threeObject) {

    var geometry = threeObject.geometry;
    var index = geometry.index.array;
    var vertexPositionArray = geometry.attributes.position.array;
    var mesh = new Ammo.btTriangleMesh(true, true);
    var scalingFactor = 1;
    //mesh.setScaling(new Ammo.btVector3(scale[0], scale[1], scale[2]));
    for (var i = 0; i < index.length; i = i + 3) {
        var a = index[i] * 3;
        var b = index[i + 1] * 3;
        var c = index[i + 2] * 3;
        mesh.addTriangle(
            new Ammo.btVector3(vertexPositionArray[a + 0] * scalingFactor, vertexPositionArray[a + 1] * scalingFactor, vertexPositionArray[a + 2] * scalingFactor),
            new Ammo.btVector3(vertexPositionArray[b + 0] * scalingFactor, vertexPositionArray[b + 1] * scalingFactor, vertexPositionArray[b + 2] * scalingFactor),
            new Ammo.btVector3(vertexPositionArray[c + 0] * scalingFactor, vertexPositionArray[c + 1] * scalingFactor, vertexPositionArray[c + 2] * scalingFactor),
            false
        );
    }
    var shape = new Ammo.btBvhTriangleMeshShape(mesh, true, true);

    return shape;
}

TR3.pscs.getPscsValues = function () {

    var paramsPhy = new Object();
    paramsPhy.gravity = parseInt(parseFloat(document.getElementById('gravityZone').value) * -1);

    paramsPhy.zone = new Object();
    paramsPhy.zone.interval = parseInt(document.getElementById('coverZone').value);
    paramsPhy.zone.size = parseFloat(document.getElementById('sizePtlZone').value);
    paramsPhy.zone.mass = parseFloat(document.getElementById('massPtlZone').value);
    paramsPhy.zone.impulse = parseFloat(document.getElementById('impulsePtlZone').value);
    paramsPhy.zone.direction = document.getElementById('dirPtlZone').value.split(',').map(parseFloat);

    paramsPhy.emisor = new Object();
    paramsPhy.emisor.many = parseInt(document.getElementById('manyPtlEmisor').value);
    paramsPhy.emisor.impulse = parseFloat(document.getElementById('impulsePtlEmisor').value);
    paramsPhy.emisor.size = parseFloat(document.getElementById('sizePtlEmisor').value);
    paramsPhy.emisor.mass = parseFloat(document.getElementById('massPtlEmisor').value);

    paramsPhy.ball = new Object();
    paramsPhy.ball.impulse = parseFloat(document.getElementById('impulsePtlBall').value);
    paramsPhy.ball.size = parseFloat(document.getElementById('sizePtlBall').value);
    paramsPhy.ball.mass = parseFloat(document.getElementById('massPtlBall').value);

    if (TR3.pscs.physicsWorld && TR3.pscs.physicsWorld.getGravity().y() != paramsPhy.gravity) {
        TR3.pscs.physicsWorld.setGravity(new Ammo.btVector3(0, paramsPhy.gravity, 0));
    }

    return paramsPhy;
};

TR3.pscs.setEmisor = function () {
    var random = Math.random();

    var paramsPhy = TR3.pscs.getPscsValues().emisor;
    var geom = new THREE.SphereGeometry(paramsPhy.size, 4, 2);
    var mat = new THREE.MeshBasicMaterial({ color: Math.round(0xffffff * random) });
    var mesh = new THREE.Mesh(geom, mat);

    var edgesGeometry = new THREE.EdgesGeometry(geom);
    var edgesMaterial = new THREE.LineBasicMaterial({ color: 0xcccccc });
    var edges = new THREE.LineSegments(edgesGeometry, edgesMaterial);
    mesh.add(edges);

    var geomPos = geom.getAttribute('position').array;
    var geomDir = new THREE.SphereGeometry(paramsPhy.size / 4, 4, 2);
    var matDir = new THREE.MeshBasicMaterial({ color: 0x777777 });
    var meshDir = new THREE.Mesh(geomDir, matDir);
    mesh.add(meshDir);
    meshDir.position.set(geomPos[0], geomPos[1], geomPos[2]);

    if (!TR3.cursor.coordClick) {
        console.log('fallo setEmisor');
        return false;
    }

    mesh.position.set(  TR3.cursor.coordClick.x, 
                        TR3.cursor.coordClick.y + paramsPhy.size, 
                        TR3.cursor.coordClick.z );
    //mesh.name = 'codeMade';
    mesh.userData.slctItem = true;
    mesh.TR3 = new Object();

    if (!TR3.pscs.emiters) {
        TR3.pscs.emiters = new Array(0);
    }
    TR3.pscs.emiters.push(mesh);
    if (!TR3.vGeom.obj3d) {
        TR3.vGeom.obj3d = new Array(0);
    }
    TR3.vGeom.obj3d.push(mesh);

    TR3.scene.add(mesh);
    //shadow.visible = true;

    TR3.transCtrlsEnabled(mesh);
};

TR3.pscs.goEmisor = function () {
    if (TR3.pscs.emiters) {
        TR3.transCtrlsEnabled(false);
        var paramsPhy = TR3.pscs.getPscsValues().emisor;
        var emiters = TR3.pscs.emiters;
        var random = Math.random();
        for (var i = 0; i < emiters.length; i++) {
            var object = emiters[i];
            var roundPtl = 10;

            var emisorBall = new THREE.Mesh(
                new THREE.SphereGeometry(paramsPhy.size, roundPtl, roundPtl),
                new THREE.MeshBasicMaterial({ color: Math.round(0xffffff * random) })
            );

            for (var j = 0; j < paramsPhy.many; j++) {
                var posObj = object.position;
                var positionDir = object.geometry.getAttribute('position').array;

                var posDir = new THREE.Vector3();
                posDir.x = positionDir[0];
                posDir.y = positionDir[1];
                posDir.z = positionDir[2];

                posDir.applyMatrix4(object.matrixWorld);

                //var radius = TR3.getSizeObj(object)[5];

                //var rayCast = TR3.getRayCaster([posObj, posDir], 'point-point',radius);
                var dir = new THREE.Vector3();
                dir.subVectors(posObj, posDir).normalize().negate();
                //dir.copy(rayCast.ray.direction);
                dir.multiplyScalar(paramsPhy.impulse);

                TR3.scene.add(emisorBall);
                TR3.pscs.makePscObj({ pos: object.position, dir: dir, mesh: emisorBall, mass: paramsPhy.mass });
            }
        }
    }

};

TR3.pscs.removeEmisors = function () {
    if (TR3.pscs.emiters) {
        TR3.transCtrlsEnabled(false);
        var emiters = TR3.pscs.emiters;
        for (var i = 0; i < emiters.length; i++) {
            var object = emiters[i];
            TR3.del3dObj(object,TR3.vGeom.obj3d);
            TR3.pscs.physicsWorld.removeRigidBody(object.userData.physicsBody);
        }
        TR3.pscs.emiters = [];
    }
};

TR3.pscs.goBrick = function (OBJ3d,massForm) {
    var obj3d = OBJ3d || TR3.transformControls.object;

    if (TR3.pscs.bricks) {
        TR3.transCtrlsEnabled(false);
       //var bricks = TR3.pscs.bricks;
        var brickMass = TR3.pscs.getPscsValues().ball.mass;
        var mass;

        if (!obj3d.userData.physicsBody) {
            if (obj3d.TR3 && typeof (obj3d.TR3.mass) == "number") {
                TR3.pscs.bricks.push(obj3d);
                mass = obj3d.TR3.mass;
            }
            if(massForm){mass = brickMass}
            /*var mesh = */TR3.pscs.makePscObj({ pos: obj3d.position, mass: mass, mesh: obj3d });
            /*if (mesh[1].material) {
                mesh.material.trasnsparent = true;
                mesh.material.opacity = 0.95;
            }*/
            /*if (mesh[2]) {
                TR3.scene.add(mesh[2]);
            }*/
        }
    }

};'use strict';
TR3.clearMeshMap = function (e) {

	var canvasDest = TR3.canvasDest;
	var scene = TR3.scene;
	var renderer = TR3.renderer;

	if (e == 'evtOl') {
		TR3.setFeatToOL();
	}

	if (canvasDest && Detector.webgl) {

		var cleanMaterial = function (material) {
			//console.log('dispose material!');
			material.dispose();
			// dispose textures
			for (var _i = 0, _a = Object.keys(material); _i < _a.length; _i++) {
				var key = _a[_i];
				var value = material[key];
				if (value && typeof value === 'object' && 'minFilter' in value) {
					//console.log('dispose texture!');
					value.dispose();
				}
			}
		};

		//console.log('dispose renderer!');
		renderer.dispose();
		scene.traverse(function (object) {
			if (!object.isMesh) return;
			//console.log('dispose geometry!');
			if (object.userData && object.userData.physicsBody) {
				TR3.pscs.physicsWorld.removeRigidBody(object.userData.physicsBody);
			}
			object.geometry.dispose();
			if (object.material.isMaterial) {
				cleanMaterial(object.material);
			}
			else {
				// an array of materials
				for (var _i = 0, _a = object.material; _i < _a.length; _i++) {
					var material = _a[_i];
					cleanMaterial(material);
				}
			}
		});

		scene.remove.apply(scene, scene.children);

		while (scene.children.length > 0) {
			scene.remove(scene.children[0]);
		}

		/*for(var k in TR3){
			if(TR3[k] != null && TR3[k].dispose){
				TR3[k].dispose();
			}
		}
		
		var gl = canvasDest.getContext("webgl") || canvasDest.getContext("experimental-webgl");	// Initialize the GL context
		gl.clearColor(0.0, 0.0, 0.0, 1.0);                      // Set clear color to black, fully opaque
		if(gl){gl.enable(gl.DEPTH_TEST);                               // Enable depth testing
			gl.depthFunc(gl.LEQUAL);                                // Near things obscure far things
			gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);      // Clear the color as well as the depth buffer.
			gl.getExtension('WEBGL_lose_context').loseContext();
		}*/

		TR3.canvasDest = null;
		canvasDest.remove();

	} else if (canvasDest && Detector.canvas) {
		var ctx = canvasDest.getContext("2d");
		ctx.clearRect(0, 0, canvasDest.width, canvasDest.height);
		canvasDest.remove();
	}

	if (canvasDest) {
		/*window.removeEventListener('resize', TR3.onWindowResize, false );
		TR3.map.removeEventListener('mousemove', TR3.onIntersect, false);
		TR3.map.removeEventListener('contextmenu', TR3.setCoods2clip, false);
		window.removeEventListener('keydown', TR3.keyDown, false);
		window.removeEventListener('keyup',	TR3.keyUp, false);*/
		TR3.stopAnimation();
		TWEEN.removeAll();
	}

	TR3.del_vGeom();
};

TR3.onTransformEvTrue = function (obj) {

	// Create the event
	var event = new CustomEvent("TR3-onTransformEvTrue", { detail: obj });
	// Dispatch/Trigger/Fire the event
	TR3.map.dispatchEvent(event);
};

TR3.onSuprFnc = function (obj) {

	// Create the event
	var event = new CustomEvent("TR3-onSuprFnc", { detail: obj });
	// Dispatch/Trigger/Fire the event
	TR3.map.dispatchEvent(event);
};

TR3.onCreateItem = function (obj) {

	// Create the event
	var event = new CustomEvent("TR3-onCreateItem", { detail: obj });
	// Dispatch/Trigger/Fire the event
	TR3.map.dispatchEvent(event);
};

TR3.onCompleteFilesEv = function (obj) {

	// Create the event
	var event = new CustomEvent("TR3-onCompleteFiles", { detail: obj });
	// Dispatch/Trigger/Fire the event
	TR3.map.dispatchEvent(event);
};

TR3.intersectEvOver = function (intsct) {

	// Create the event
	var event = new CustomEvent("TR3-onIntersectEvOver", { detail: intsct });
	// Dispatch/Trigger/Fire the event
	TR3.map.dispatchEvent(event);
};

TR3.intersectEvClick = function (intsct) {

	// Create the event
	var event = new CustomEvent("TR3-onIntersectEvClick", { detail: intsct });
	// Dispatch/Trigger/Fire the event
	TR3.map.dispatchEvent(event);
};

TR3.CameraMoveEvEnd = function (msg) {
	if (msg) { console.log(msg); }

	// Create the event
	var event = new CustomEvent("TR3-onCameraMoveEnd", { "detail": "an event" });
	// Dispatch/Trigger/Fire the event
	TR3.map.dispatchEvent(event);
};

TR3.VectorEvEnd = function (msg) {
	if (msg) { console.log(msg); }

	// Create the event
	var event = new CustomEvent("TR3-onVectorEnd", { "detail": "an event" });
	// Dispatch/Trigger/Fire the event
	TR3.map.dispatchEvent(event);
};

TR3.MeasureEvEnd = function (txt, sprite) {

	// Create the event
	var event = new CustomEvent("TR3-onMeasureEnd", { detail: [txt, sprite] });
	// Dispatch/Trigger/Fire the event
	TR3.map.dispatchEvent(event);
};

TR3.setMeshMap = function (imgOri, dtmOri, bboxImgOri, optionsSet, valuesSet) {

	TR3.loadingDiv = document.getElementById('loadingTerrain');
	TR3.imgOri = imgOri;
	TR3.dtmOri = dtmOri;
	//THREE.Triangulation.setLibrary('libtess');
	document.getElementById('3doptions').style.display = 'none';
	if (TR3.bboxImgOri && JSON.stringify(bboxImgOri) == JSON.stringify(TR3.bboxImgOri) && TR3.loadingDiv && TR3.canvasDest && TR3.newMap == false) {
		TR3.setImageMesh(imgOri);
		document.getElementById('3doptions').style.display = 'block';
		/*}else if(TR3.loadingDiv && TR3.loadingDiv.style && TR3.loadingDiv.style.display == "block" && TR3.config.unic){
			return false;*/
		/*}else if (TR3.bboxImgOri && JSON.stringify(bboxImgOri) == JSON.stringify(TR3.bboxImgOri) && TR3.loadingDiv && !TR3.canvasDest) {
			return false; //nunca entra */
	} else {
		/*setMeshMap New*/
		TR3.newMeshMap = 1;
		TR3.newMap = false;
		TR3.clearMeshMap();

		/*INI params*/
		TR3.bboxImgOri = [eval(bboxImgOri[0]), eval(bboxImgOri[1]), eval(bboxImgOri[2]), eval(bboxImgOri[3])] || [585567, 4778782, 590139, 4782399];
		if (proj4.Proj(TR3.srsImg).projName === 'longlat') { TR3.geo2UTM = 40000000 / 360; } else { TR3.geo2UTM = 1; }
		TR3.zone = [TR3.bboxImgOri[0] * TR3.geo2UTM, TR3.bboxImgOri[1] * TR3.geo2UTM, TR3.bboxImgOri[2] * TR3.geo2UTM, TR3.bboxImgOri[3] * TR3.geo2UTM];
		TR3.centerZone = [(TR3.zone[0] + TR3.zone[2]) / 2, (TR3.zone[1] + TR3.zone[3]) / 2];

		var imgControl, cursor3d, anaglyph, magnification, autoRotate, wireframeMesh, tentative, terrain;

		imgControl = optionsSet.imgControl;
		cursor3d = optionsSet.cursor3d;
		anaglyph = optionsSet.anaglyph;
		autoRotate = optionsSet.autoRotate;
		wireframeMesh = optionsSet.wireframeMesh;
		tentative = optionsSet.tentative;
		terrain = optionsSet.terrain;

		magnification = valuesSet.magnification;
		TR3.lookAt = valuesSet.lookAt;
		/*Div container*/
		TR3.divContainer();

		/*Div loading*/
		TR3.divLoading();

		/*Set params*/
		TR3.setMagniValues(magnification);
		TR3.setMeshZone();

		TR3.canvasDest = TR3.cvsDesty();
		/*Detector Renderer*/
		if (Detector.canvas) {
			/*Get canvas Destiny*/
			if (!Detector.webgl) {
				TR3.renderer = new THREE.CanvasRenderer({ canvas: TR3.canvasDest });
				if (!TR3.widthImg) {//sólo al inicio para q no moleste
					var txtSupportWebgl = "Su navegador parece no soportar WebGl. Por favor, actualice su versión o pruebe algún otro.";
					alert(txtSupportWebgl);
					pSupportWebgl = document.createElement('p');
					pSupportWebgl.id = "pSupportWebgl";
					pSupportWebgl.style.color = "#ff0000";
					pSupportWebgl.innerHTML = txtSupportWebgl;
					document.getElementById('initDialog').appendChild(pSupportWebgl);
					document.getElementById('anaglyphCheck').style.display = 'none';
					document.getElementById('anaglyphType').style.display = 'none';
				}
			} else {
				TR3.renderer = new THREE.WebGLRenderer({ logarithmicDepthBuffer: true, canvas: TR3.canvasDest, antialias: true });
			}
		} else {
			if (!TR3.widthImg) {//sólo al inicio para q no moleste
				var txtSupportHTML5 = "Su navegador parece no soportar HTML5. Por favor, actualice su versión o pruebe algún otro.";
				alert(txtSupportHTML5);
				pSupportHTML5 = document.createElement('p');
				pSupportHTML5.id = "pSupportHTML5";
				pSupportHTML5.style.color = "#ff0000";
				pSupportHTML5.innerHTML = txtSupportHTML5;
				document.getElementById('initDialog').appendChild(pSupportHTML5);
				document.getElementById('OptionsDialog').style.display = 'none';
			}
		};
		TR3.renderer.localClippingEnabled = true;
		//TR3.renderer.setClearColor( 0xaaaaaa );
		//TR3.renderer.setPixelRatio( window.devicePixelRatio );
		TR3.renderer.physicallyCorrectLights = true; // This will be required for matching the glTF spec.
		//TR3.renderer.shadowMap.enabled = true;
		//TR3.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
		TR3.renderer.setSize(TR3.canvasDestW, TR3.canvasDestH);
		//TR3.renderer.setClearColor( 0xbfd1e5 );

		/*Anaglyph*/
		TR3.anaglyphRenderer = new TR3.AnaglyphEffect(TR3.renderer, 0);
		TR3.anaglyphRenderer.setSize(TR3.canvasDestW, TR3.canvasDestH);

		/*Scene*/
		TR3.scene = new THREE.Scene();

		/*Clock*/
		TR3.clock = new THREE.Clock();

		/*loaderGLTF*/
		TR3.loaderGLTF = new TR3.GLTFLoader();

		/*IFCLoader*/
		TR3.loaderIFC = new TR3.IFCLoader();
		TR3.loaderIFC.ifcManager.setWasmPath('../TR3-pack/THREE/loaders/ifc/');

		TR3.loaderIFC.ifcManager.applyWebIfcConfig({
			COORDINATE_TO_ORIGIN: true,
			USE_FAST_BOOLS: true
		});

		/*TR3.loaderIFC.ifcManager.parser.setupOptionalCategories({
			[IFCSPACE]: false,
			[IFCOPENINGELEMENT]: false
		})*/

		// viewer.IFC.loader.ifcManager.useWebWorkers(true, 'files/IFCWorker.js');

		/*loaderFONT*/
		TR3.loaderFONT = new TR3.FontLoader();

		/*SKY*/
		TR3.sky = new TR3.Sky();
		TR3.sky.name = "Sky";
		TR3.scene.add(TR3.sky);

		/*Camera*/
		TR3.camera = new THREE.PerspectiveCamera(TR3.fov, TR3.canvasDestW / TR3.canvasDestH, 1, 1300000);
		TR3.scene.add(TR3.camera);
		TR3.camera.visible = false;
		//(fov ratio->zone next far ) --> makeScene update
		//TR3.camera = new THREE.OrthographicCamera(-window.innerWidth / 2, window.innerWidth / 2, window.innerHeight / 2, -window.innerHeight / 2, 1, 5000)


		// Lights
		var hemispheric = new THREE.HemisphereLight(0xffffff, 0xffffff, 2);
		TR3.scene.add(hemispheric);

		/*var ambient = new THREE.AmbientLight(0xffffff, 1.5);
		TR3.scene.add(ambient);*/

		/*TR3.directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
		TR3.scene.add( TR3.directionalLight );*/

		var moves;
		var imgOrbitalMoves = document.getElementById('imgOrbitalMoves');
		if (imgControl) {
			moves = imgOrbitalMoves;
		} else {
			moves = TR3.canvasDest;
		}

		/*Orbit Controls*/
		TR3.controls = new TR3.OrbitControls(TR3.camera, moves); //orbitalmoves+canvasDest???
		TR3.controls.listenToKeyEvents(window);
		//TR3.controls.minPolarAngle = - Infinity; // radians
		TR3.controls.maxPolarAngle = Math.PI / 4;
		// How far you can orbit horizontally, upper and lower limits.
		// If set, must be a sub-interval of the interval [ - Math.PI, Math.PI ].
		//TR3.controls.minAzimuthAngle = - Infinity; // radians
		//TR3.controls.maxAzimuthAngle = Infinity; // radians
		TR3.controls.enableDamping = true;
		//TR3.controls.dampingFactor = 0.05;
		TR3.controls.screenSpacePanning = false;
		//TR3.controls.zoomSpeed = -1; //invierte zoom mouseweel

		/*Transform Controls*/
		TR3.transformControls = new TR3.TransformControls(TR3.camera, TR3.canvasDest);
		TR3.transformControls.name = "TransformControls";
		TR3.transformControls.enabled = false;
		TR3.scene.add(TR3.transformControls);
		//TR3.transformControls.addEventListener( 'change', TR3.renderer );
		TR3.transformControls.addEventListener('dragging-changed', function (event) {
			TR3.controls.enabled = !event.value;
			TR3.CtrlDargClick = true;

			var Tc = TR3.transformControls;
			var size3dObj = document.getElementById('size3dObj');
			if (Tc.enabled) {
				var obj3d = Tc.object;
				if (obj3d && obj3d.parent) {
					var XYZ = TR3.getSizeObj(obj3d);
					size3dObj.innerHTML = '<b>X:</b>' + (XYZ[0][0] * 1 / TR3.adjustScale).toFixed(2) + '' + XYZ[0][1] + ' <b>Y:</b>' + (XYZ[2][0] * 1 / TR3.adjustScale).toFixed(2) + '' + XYZ[2][1] + ' <b>Z:</b>' + (XYZ[1][0] * 1 / TR3.adjustScale).toFixed(2) + '' + XYZ[1][1];
				}

			} else { /*TR3.transCtrlsEnabled( false );*/ }
		});

		/*Create Image-Mesh*/
		TR3.makeSteve();
		TR3.makeWorld(imgOri);
		TR3.persist2Scene();
		TR3.setOptions(imgControl, cursor3d, anaglyph, autoRotate, wireframeMesh, tentative, terrain);
	}

	/*Events*/
	if (TR3.oneMeshMap != 0) {
		window.addEventListener('resize', TR3.onWindowResize, false);
		TR3.map.addEventListener('mousemove', TR3.onIntersect, false);
		TR3.map.addEventListener('contextmenu', TR3.setCoods2clip, false);

		TR3.map.addEventListener('click', TR3.click_Obj3d, false);
		TR3.map.addEventListener("mousedown", function (event) {
			var selectables = TR3.getSelectableObj();
			TR3.cursor.mouseDownID = false;
			if (selectables.length > 0 && TR3.optionsSet.tentative) {
				var raycaster = TR3.getRayCaster(event);
				var intersects = TR3.getIntersect(raycaster, selectables);
				if (intersects[0])
					TR3.cursor.mouseDownID = intersects[0][0].object.uuid;
			}
		}, false);
		TR3.map.addEventListener("touchstart", function (event) {
			var selectables = TR3.getSelectableObj();
			TR3.cursor.mouseDownID = false;
			if (selectables.length > 0 && TR3.optionsSet.tentative) {
				var raycaster = TR3.getRayCaster(event);
				var intersects = TR3.getIntersect(raycaster, selectables);
				if (intersects[0])
					TR3.cursor.mouseDownID = intersects[0][0].object.uuid;
			}
		}, false);
		TR3.map.addEventListener("touchend", function (e) {
			TR3.click_Obj3d(e);
		}, false);

		TR3.map.addEventListener('wheel', TR3.onMouseWheel, false);//Oritcontrols lock this event...
		window.addEventListener('keydown', TR3.keyDown, false);
		window.addEventListener('keyup', TR3.keyUp, false);


		Ammo().then(function (Ammo) {

			//Ammo = AmmoLib;

			TR3.pscs.physicsConf();

			TR3.animate();
			TR3.oneMeshMap--;
		});
	}
};

TR3.onMouseWheel = function (evt) {
	var delta = Math.max(-1, Math.min(1, (-evt.wheelDelta || evt.detail || evt.deltaY)));
	if (TR3.cursor.helper.visible) {
		TR3.zCursor(delta);
	}
	if (TR3.moveKey.walk == true) {
		var spd = delta * TR3.controls.keyPanSpeed / 5;
		TR3.controls.keyPanSpeed = TR3.controls.keyPanSpeed + spd;
	}
	if (TR3.optionsSet.anaglyph == true) {
		var raycaster = TR3.getRayCaster(false);
		var inter = TR3.getIntersect(raycaster, [TR3.mesh]);
		if (inter.length > 0) {
			var cPos = TR3.camera.position;
			TR3.zeroParallax = cPos.distanceTo(inter[0][0].point);
		}
	}
	if (TR3.transformControls.enabled) {
		var obj3d = TR3.transformControls.object;
		if (obj3d.clippingPlanes) {
			obj3d.traverse(function (child) {

				if (child.isMesh) {
					var material = child.material;
					if (material.length) {
						for (var i = 0; i < material.length; i++) {
							var mati = material[i];
							var nextClipp = mati.clippingPlanes[0].constant + delta / 60;
							mati.clippingPlanes[0].constant = nextClipp;
						}
					} else {
						var nextClipp = material.clippingPlanes[0].constant + delta / 3;
						material.clippingPlanes[0].constant = nextClipp;
					}
				}
			});
		}
	}
};

TR3.onWindowResize = function () {
	if (TR3.map.offsetWidth) {
		TR3.canvasDest.width = TR3.map.offsetWidth;
		TR3.canvasDest.height = TR3.map.offsetHeight;
		TR3.canvasDestW = TR3.map.offsetWidth;
		TR3.canvasDestH = TR3.map.offsetHeight;

		TR3.camera.aspect = TR3.canvasDestW / TR3.canvasDestH;
		TR3.camera.updateProjectionMatrix();
		TR3.renderer.setSize(TR3.canvasDestW, TR3.canvasDestH);
	}
};

TR3.onCompleteMap = function () { //TR3.onLoadEnd
	if (TR3.lookAt)
		TR3.setLookAt(TR3.lookAt);

	if (!TR3.mesh.userData.physicsBody && TR3.pscs.physicsWorld) {
		TR3.pscs.setGround();
	} else {
		setTimeout(function () { TR3.pscs.setGround(); }, 1000);
	}

	if (TR3.scene && TR3.scene.children) {
		for (var i = 0; i < TR3.scene.children.length; i++) {
			var childI = TR3.scene.children[i];
			if (childI.TR3) {
				if (typeof (childI.position.y) == 'string') {
					var z = childI.position.y.replaceAll('$', '');
					var zLast = z.slice(-1);
					var znum = z.slice(0, -1) * 1;
					var zPos;
					if (z && zLast == 'T') {
						zPos = TR3.zM2T(znum, true);
					} else if (zLast == 'P') {
						zPos = TR3.zM2T(TR3.pix2geo(znum), true) - TR3.zM2T(0, true);
					} else {
						zPos = z.replace(zLast, '');
					}
					childI.position.y = zPos * 1;
				} else
					if (childI.TR3.zFalse == true) {
						var coords = TR3.getCoordsByXYmod(childI.position.x, childI.position.z, false);
						var y = TR3.operaValues(-1 * childI.TR3.box.min.y * childI.scale.y, coords[4], 'suma');
						childI.position.y = y;
					}
				if (typeof (childI.TR3.mass) == 'string') {
					childI.TR3.mass = childI.TR3.mass * 1;
					TR3.pscs.goBrick(childI);
				}
			}
		}
	}

	TR3.loadingDiv.style.display = 'none';
	TR3.dfd_setMap.resolve(TR3.mesh);
	document.getElementById('3doptions').style.display = 'block';
	TR3.newMeshMap = 0;
	if (TR3.oneMeshMap > 0) TR3.oneMeshMap--;
};

TR3.persist2Scene = function () {
	if (TR3.vGeom.obj3d)
		for (var i = 0; i < TR3.vGeom.obj3d.length; i++) {
			var Obj3d;
			var obj3d2Exp = TR3.vGeom.obj3d[i];
			if (obj3d2Exp.persist2Scene == true) {
				if (obj3d2Exp.scene) {
					Obj3d = obj3d2Exp.scene;
				} else if (obj3d2Exp.parent && obj3d2Exp.parent.scene) {
					Obj3d = obj3d2Exp.parent.scene;
				} else {
					Obj3d = obj3d2Exp;
				}
				TR3.scene.add(Obj3d);
			}
		}
}

TR3.lock3d = function (cause) {
	TR3.cursor.causeLock += cause;
	//TR3.canvasDest.style.zIndex = '9';
};

TR3.unlock3d = function (cause) {
	if (TR3.cursor.causeLock.indexOf(cause) > -1) {
		var splitCause = TR3.cursor.causeLock.split(cause);
		TR3.cursor.causeLock = splitCause.toString().replace(/,/g, '');
		//if (TR3.cursor.causeLock == '')
		//TR3.canvasDest.style.zIndex = '0';
	}
};'use strict';
TR3.rectaValue = function (x1, y1, x2, y2, valx) {

	var y = (valx - x1) / (x2 - x1) * (y2 - y1) + y1;
	return y;
}

TR3.rectaValue3D = function (x1, y1, z1, x2, y2, z2, valx) {

	var y = TR3.rectaValue(x1, y1, x2, y2, valx);
	var z = TR3.rectaValue(x1, z1, x2, z2, valx);
	return [valx, y, z];
}

TR3.geo2pix = function (geo) {

	var pix = geo * 1 / (TR3.tPixImg * TR3.geo2UTM);
	return pix;
}

TR3.pix2geo = function (pix) {

	var geo = pix * (TR3.tPixImg * TR3.geo2UTM);
	return geo;
}

TR3.getSizePix = function () {
	//sizeMeters??
	var tPixW = (TR3.zone[2] - TR3.zone[0]) / TR3.widthImg;
	var tPixH = (TR3.zone[3] - TR3.zone[1]) / TR3.heightImg;
	var tPix = (tPixW + tPixH) / 2;
	return tPix;
};

TR3.setAzAngle = function (oriAzAng) {

	var auxAzAng = TR3.controls.getAzimuthalAngle();
	var oriRight;
	var auxRight;

	if (oriAzAng <= 0) { oriRight = -oriAzAng; } else { oriRight = 2 * Math.PI - oriAzAng; }
	if (auxAzAng <= 0) { auxRight = -auxAzAng; } else { auxRight = 2 * Math.PI - auxAzAng; }

	if (oriRight > 2 * Math.PI) { oriRight = oriRight - 2 * Math.PI; }
	if (auxRight > 2 * Math.PI) { auxRight = auxRight - 2 * Math.PI; }

	var rightAng = auxRight - oriRight;
	if (rightAng > 0) { rightAng = 2 * Math.PI - rightAng } else { rightAng = Math.abs(rightAng) };

	if (typeof TR3.controls.rotateLeft === "function")
		TR3.controls.rotateLeft(rightAng);//+-?

}

TR3.getOptModCoordCam = function () {

	var cPos = TR3.camera.position;
	var heigtH = -10000000;;

	var coordNormalCamera = new Array();
	var offset = TR3.getSizePix() * 2;

	var az = TR3.controls.getAzimuthalAngle();
	var X = cPos.x + offset * Math.sin(az);
	var Y = cPos.z - offset * Math.cos(az);

	for (var i = 0; i < TR3.vGeom.obj3d.length; i++) {
		var obj3di = TR3.vGeom.obj3d[i];
		if (obj3di.isFloor && obj3di.isFloor == true) {
			var coord = TR3.getCoordsByXYmod(X, Y, [obj3di], false, cPos.y);
			if (coord && coord[6] == true)
				coordNormalCamera.push(coord);
		}
	}

	coordNormalCamera.push(TR3.getCoordsByXYmod(X, Y, false, false, cPos.y));

	for (var i = 0; i < coordNormalCamera.length; i++) {
		if (coordNormalCamera[i] && heigtH < coordNormalCamera[i][4])
			heigtH = coordNormalCamera[i][4];
	}

	return [cPos.x, heigtH, cPos.z];

}

TR3.getCoordsByXYmod = function (X, Y, mesh, inv, zup) {
	//var cPos = TR3.camera.position;
	if (!zup) { zup = false }
	var zUp = zup || TR3.zM2T(TR3.zMax + 500, true) * TR3.valuesSet.magnification * 3;
	var zDown = Math.abs(TR3.zM2T(TR3.zMin - 500, true) * TR3.valuesSet.magnification * 3);
	var target;

	/*if(mesh == 'build'){
		target = TR3.vGeom.build;
		target.push(TR3.mesh);
	}
	else */if (mesh) {
		target = mesh; //need array
		//target.push(TR3.mesh);
	}
	else if (!mesh) {
		target = [TR3.mesh];
	}

	//var Xori = X;
	//var Yori = Y;

	if (inv) {
		X = X - TR3.centerZone[0];
		Y = -(Y - TR3.centerZone[1]);
	}

	var start = new THREE.Vector3(X, zUp, Y);
	var vector = new THREE.Vector3(0, -1, 0);

	var raycaster = TR3.getRayCaster([start, vector], 'point-vector', 0, zUp + zDown);
	//raycaster.firstHitOnly = true;
	var intersect = TR3.getIntersect(raycaster, target)[0][0];

	var Xterr, Yterr, Zterr, Xmod, Ymod, Zmod, isInto;

	if (intersect) {

		var point = intersect.point;

		Xterr = TR3.centerZone[0] + point.x;
		Yterr = TR3.centerZone[1] - point.z;
		Zterr = TR3.zM2T(point.y, false);

		Xmod = point.x;
		Ymod = point.y;
		Zmod = point.z;
		isInto = true;
	} else {
		Xterr = X + TR3.centerZone[0];
		Yterr = -Y + TR3.centerZone[1];
		Zterr = TR3.zMed;

		Xmod = X;
		Ymod = TR3.zM2T(TR3.zMed, true);;
		Zmod = Y;
		isInto = false;
	}

	return [Xterr, Yterr, Zterr, Xmod, Ymod, Zmod, isInto];
};

TR3.translate2DbyXYmod = function (X, Y, inv) {

	var Xtrans, Ytrans;

	if (inv) {
		Xtrans = -(TR3.centerZone[0] - X);
		Ytrans = TR3.centerZone[1] - Y;
	} else {
		Xtrans = X + TR3.centerZone[0];
		Ytrans = TR3.centerZone[1] - Y;
	}

	return [Xtrans, Ytrans];
};

//X Y -Z???
TR3.coordM2T = function (X, Y, Z, inv) {
	var x, y, z;
	var ByXY;
	if (inv) {
		ByXY = TR3.getCoordsByXYmod(X, Y, false, true);
		if (!ByXY) { return false; }
		if (!Z && Z !== 0) {
			if (ByXY && ByXY[2]) {
				Z = ByXY[2];
			} else {
				Z = TR3.zM2T(TR3.zMed, true);
			}
		}

		x = ByXY[3];
		y = TR3.zM2T(Z, inv);
		z = ByXY[5];

	} else {
		ByXY = TR3.getCoordsByXYmod(X, Z, false);
		if (!ByXY) { return false; }
		if (!Y && Y !== 0) {
			if (ByXY && ByXY[5]) {
				Y = ByXY[5];
			} else {
				Y = TR3.zM2T(TR3.zMed);
			}
		}
		if (Y === 0) { Y = 0 }

		x = ByXY[0];
		y = ByXY[1];
		z = TR3.zM2T(Y, inv);

	}

	return [x, y, z];
};

TR3.zM2T = function (Zori, inv) {
	var z;
	if (inv) {
		z = (Zori - TR3.zMed) * TR3.valuesSet.magnification;
	} else {
		z = Zori / TR3.valuesSet.magnification + TR3.zMed;
	}

	if (typeof (Zori) != 'string') {
		if (inv) {
			if (/*!z || */typeof (z) != 'number' || isNaN(z)) { z = '$' + Zori + '$T'; }
		} else {
			if (/*!z || */typeof (z) != 'number' || isNaN(z)) { z = '$' + Zori + '$M'; }
		}
	} else {
		z = Zori;
	}
	return z;
};

TR3.makeVectFeat = function (coords, type, style, vItem) {  //BufferGeometries!!!! ExporterGTLF
	var geomFeat = new THREE.BufferGeometry();
	var feat;

	var randomColor = Math.round(0xffffff * Math.random());

	var thisStyle = new Array;
	thisStyle.color = style.color || randomColor;
	thisStyle.side = style.side || THREE.DoubleSide;
	thisStyle.transparent = style.transparent || false;
	thisStyle.wireframe = style.wireframe || false;
	thisStyle.opacity = style.opacity || 1;

	if (type == "Circle") {

		var geomCirc = new THREE.CircleGeometry(coords.w, 20);
		geomCirc.rotateX(Math.PI / 2);

		var pos = geomCirc.vertices;
		for (var j = 0; j < pos.length; j++) {
			pos[j].x = coords.x + pos[j].x;
			pos[j].z = coords.z + pos[j].z;
			var z = TR3.getCoordsByXYmod(pos[j].x, pos[j].z, false);

			if (z) { pos[j].y = z[4]; }
			else if (coords.y) { pos[j].y = coords.y; }
			else { pos[j].y = TR3.zMed; }
		}
		pos.push(pos[1]);
		pos.shift();

		geomFeat.setFromPoints(pos);

		var material = new THREE.LineBasicMaterial({
			color: thisStyle.color
		});

		feat = new THREE.LineLoop(geomFeat, material);
	} else if (type == "Point") {
		geomFeat.setFromPoints(coords);
		var sizeP = TR3.getSizePix() * 50;

		var material = new THREE.PointsMaterial({/*map:texture*/
			color: thisStyle.color,
			size: sizeP
		});

		feat = new THREE.Points(geomFeat, material);
	} else if (type == 'Poligon') {
		geomFeat.setFromPoints(coords);
		var material = new THREE.LineBasicMaterial({
			color: thisStyle.color
		});

		feat = new THREE.LineLoop(geomFeat, material);
	} else {
		geomFeat.setFromPoints(coords);
		var material = new THREE.LineBasicMaterial({
			color: thisStyle.color
		});

		feat = new THREE.Line(geomFeat, material);
	}

	if (vItem) {
		feat.reload = vItem.reload || false; //borrar y redibujar
		feat.magni = TR3.valuesSet.magnification;
		TR3.vGeom.item.unshift(feat);
	}

	return feat;
};

TR3.makeMeshFeat = function (geom, type, style, vItem) {
	//var geomFeat;
	var feat;

	var randomColor = Math.round(0xffffff * Math.random());

	var thisStyle = new Array;
	thisStyle.color = style.color || randomColor;
	thisStyle.side = style.side || THREE.DoubleSide;
	thisStyle.transparent = style.transparent || false;
	thisStyle.wireframe = style.wireframe || false;
	thisStyle.opacity = style.opacity || 1;

	var material = new THREE.MeshBasicMaterial({/*map:texture*/
		color: thisStyle.color,
		side: thisStyle.side,
		transparent: thisStyle.transparent,
		wireframe: thisStyle.wireframe,
		opacity: thisStyle.opacity
	});

	/*if(type == "Circle"){

		geomFeat = new THREE.CircleBufferGeometry( coords.w, 20 );
		feat = new THREE.Mesh( geomFeat, material );
		
		var y = TR3.getCoordsByXYmod(coords.x,coords.z) || 0;
		feat.position.x = coords.x;
		feat.position.y = coords.y || y[4];
		feat.position.z = coords.z;
		feat.rotation.x = Math.PI/2;
		
		var pos = feat.geometry.getAttribute("position");
		for(var j=0 ; j<pos.count; j++){
			var z = TR3.getCoordsByXYmod(feat.position.x + pos.getX( j ),feat.position.z + pos.getY( j )) || 0;
			var z4 = coords.y || z[4];
			pos.setZ( j, feat.position.y - z4 );
		}
		pos.needsUpdate = true;
	}else */
	if (type == 'Basic') {
		feat = new THREE.Mesh(geom, material);
	} else if (type == 'Group') {
		feat = new THREE.Group();
	}

	if (vItem) {
		feat.reload = vItem.reload || false; //borrar y redibujar
		feat.magni = TR3.valuesSet.magnification;
		TR3.vGeom.item.unshift(feat);
	}

	return feat;
};

TR3.setLookAtini = function (lookPCTh, lookPCTv) {
	var zone = TR3.zone;
	var zoneMod = TR3.coordM2T(zone[2] - 0.1, zone[1] + 0.1, 0, true);

	var Xcenter = TR3.mesh.position.x;
	var Ycenter = 0;
	var Zcenter = TR3.mesh.position.y;

	if (typeof (lookPCTh) != 'number' || isNaN(lookPCTh) || lookPCTh < 5) { lookPCTh = 100; }
	if (typeof (lookPCTv) != 'number' || isNaN(lookPCTv) || lookPCTv < 0) { lookPCTv = 4; }
	var camZ = TR3.cameraPositionFar * lookPCTv / 100;
	var dist3D = TR3.getCoordsDistance3D([Xcenter, Zcenter, Ycenter], [zoneMod[0], -zoneMod[2], camZ]);

	var camPOS = TR3.rectaValue3D(Xcenter, Zcenter, Ycenter, zoneMod[0], -zoneMod[2], camZ, Xcenter + lookPCTh / 100 * dist3D)

	TR3.setLookAt([Xcenter, Ycenter, Zcenter, camPOS[0], camZ, camPOS[1]]);
};

TR3.setLookAt = function (lookAt) {
	var destiPos = { x: lookAt[3], y: lookAt[4], z: lookAt[5] };
	var targetPos = new THREE.Vector3(lookAt[0], lookAt[1], lookAt[2]);

	if (lookAt[6] && lookAt[6] === true) {
		var lookAtOri = TR3.coordM2T(lookAtOri[3], lookAtOri[4], lookAtOri[5], true);
		var lookAtTgt = TR3.coordM2T(lookAtOri[0], lookAtOri[1], lookAtOri[2], true);

		destiPos = { x: lookAtOri[0], y: lookAtOri[1], z: lookAtOri[2] };
		targetPos = new THREE.Vector3(lookAtTgt[0], lookAtTgt[1], lookAtTgt[2]);
	}

	//if (lookAt[0] < TR3.zone[0] || lookAt[0] > TR3.zone[2]) {
	//	targetPos = new THREE.Vector3((TR3.zone[0] + TR3.zone[2]) / 2, 0, -(TR3.zone[1] + TR3.zone[3]) / 2);
	//}
	/*TR3.camera.position.set ( TR3.CPS.x, TR3.CPS.y, TR3.CPS.z );
	TR3.controls.target.set( TR3.TGT.x, TR3.TGT.y, TR3.TGT.z );*/

	new TWEEN.Tween(TR3.camera.position) //https://github.com/tweenjs/es6-tween
		.to(destiPos, 1000)
		.easing(TWEEN.Easing.Linear)
		.on('start', function () {
			TR3.controls.target = targetPos;
			TR3.controls.update();
			TR3.lookAt = false;
		})
		.on('complete', function () {
			TR3.mesh.rotation.z = 0;
			TR3.CameraMoveEvEnd();
		})
		.start();
};

TR3.goScenes = function (SCN) {
	var scn = SCN || TR3.config.actual.loc;
	TR3.config.lookAt = scn.look;
	TR3.setLookAt(TR3.config.lookAt, scn);
	TR3.setOpts({ autoRotate: true });
};

TR3.oscillator = function (time, frequency, amplitude, phase, offset) {
	return Math.sin(time * frequency * Math.PI * 2 + phase * Math.PI * 2) * amplitude + offset;
};

TR3.operaValues = function (num, value, operation) {
	var zeta;
	if (typeof (value) == 'string') {
		var z = value.replaceAll('$', '');
		var zLast = z.slice(-1);
		var znum = z.slice(0, -1) * 1;
		if (operation == 'suma')
			zeta = '$' + (znum + num) + '$' + zLast;
	} else {
		if (operation == 'suma')
			zeta = value + num;
	}

	return zeta;
};

TR3.del3dObj = function (obj3dPrm,vGeom,noEv) {
	var obj3d;
	if (vGeom && vGeom.length > 0) {
		var idObj;
		if (obj3dPrm || TR3.transformControls.enabled) {
			obj3d = obj3dPrm || TR3.transformControls.object;
			TR3.transCtrlsEnabled(false);
			for (var i = 0; i < vGeom.length; i++) {
				var flagHelper = false;//lights helper
				var uuid;
				var vGeomI = vGeom[i];
				if(vGeomI[0]){vGeomI = vGeomI[0];flagHelper = true}//lights helper

				if (vGeomI.scene) { uuid = vGeomI.scene.uuid; } else { uuid = vGeomI.uuid; }
				if (obj3d.uuid == uuid){
					if(flagHelper){obj3d = new Array();obj3d.push(vGeom[i][0]);obj3d.push(vGeom[i][1]);}//lights helper
					idObj = i;
					i = vGeom.length;
				}
			}
		}

		if (typeof idObj === 'undefined') idObj = vGeom.length - 1;

		if (obj3d.scene) {
			TR3.scene.remove(obj3d.scene);
		} else {
			if(obj3d.length>0){
				for(var i=0;i<obj3d.length;i++){//lights helper
					TR3.scene.remove(obj3d[i]);
				}
			}else{
				TR3.scene.remove(obj3d);
			}
		}
		vGeom.splice(idObj, 1);
		if(noEv !== true)
			TR3.onSuprFnc(obj3d);
	}

};

TR3.transCtrlsEnabled = function (boo) {
	if (typeof (boo) == "object") {
		TR3.transformControls.attach(boo);
		boo = true;
	}
	var object;
	if (boo) {
		object = TR3.transformControls.object;
		if (object && object.TR3)
			object.TR3.TCactive = true;
			
		object.TR3.zFalse = false;
		TR3.onTransformEvTrue(TR3.transformControls);
		TR3.lock3d('obj3d');
	} else {
		TR3.unlock3d('obj3d');
		object = TR3.transformControls.object;
		if (object) {
			if (object.userData.physicsBody) {
				TR3.pscs.physicsWorld.removeRigidBody(object.userData.physicsBody);
				object.userData.physicsBody = new Object();

				var pos = object.position;
				var mass = object.TR3.mass||0

				TR3.pscs.makePscObj({ pos: pos, mass: mass, mesh: object });
			}

			TR3.transformMeshByObj3d();
			if (object.TR3)
				object.TR3.TCactive = false;
		}

		TR3.transformControls.detach();
		TR3.controls.enableZoom = true;
	}

	TR3.transformControls.enabled = boo;
	TR3.transformControls.showX = boo;
	TR3.transformControls.showY = boo;
	TR3.transformControls.showZ = boo;
};

TR3.getSizeObj = function (objGeom) {
	var hitbox = new THREE.Vector3();

	var box = new THREE.Box3().setFromObject(objGeom);
	box.getSize(hitbox);
	var radius = box.getBoundingSphere(new THREE.Sphere()).radius;

	var X = TR3.formatMeasure(hitbox.x);
	var Y = TR3.formatMeasure(hitbox.y);
	var Z = TR3.formatMeasure(hitbox.z);

	return [X, Y, Z, box, hitbox, radius];
};

TR3.getIgridByXY = function (X, Y) {
	var wDTM = TR3.reducMeshW;

	if (X >= wDTM) return false;

	return (wDTM * Y) + X;
};

TR3.getXYgridByI = function (i) {
	var wDTM = TR3.reducMeshW;
	var hDTM = TR3.reducMeshH;
	var X = (i / wDTM - parseInt(i / wDTM)) * wDTM;
	var Y = parseInt(i / wDTM);

	if (X >= wDTM) return false;
	if (Y >= hDTM) return false;

	return [X, Y];
};

TR3.getIndexMeshZoneFromObj3d = function (obj3d) {
	var pos = obj3d.position;
	var size = TR3.getSizeObj(obj3d);
	var hb = size[4];
	//var box = size[3];
	var scle = obj3d.scale;

	/*var GeomBox = new THREE.BoxGeometry(hb.x * scle.x, hb.y * scle.y, hb.z * scle.z);
	var verticesGeomBox = GeomBox.getAttribute("position");
	var xMax = verticesGeomBox.getX(0);
	var yMax = verticesGeomBox.getZ(0);
	var xMin = verticesGeomBox.getX(0);
	var yMin = verticesGeomBox.getZ(0);

	for (var i = 0; i < verticesGeomBox.count; i++) {
		if (xMax < verticesGeomBox.getX(i))
			xMax = verticesGeomBox.getX(i);
		if (yMax < verticesGeomBox.getZ(i))
			yMax = verticesGeomBox.getZ(i);
		if (xMin > verticesGeomBox.getX(i))
			xMin = verticesGeomBox.getX(i);
		if (yMin > verticesGeomBox.getZ(i))
			yMin = verticesGeomBox.getZ(i);
	}*/
	var xMax = hb.x*scle.x/2;
	var yMax = hb.z*scle.z/2;
	var xMin = -hb.x*scle.x/2;
	var yMin = -hb.z*scle.z/2;

	var bboxMesh = [pos.x + xMin, pos.z + yMin, pos.x + xMax, pos.z + yMax];	
	var indexX;
	var indexY;
	var cero = true;
	var uno = true;

	var verticesMesh = TR3.mesh.geometry.getAttribute("position");
	for (var i = 0; i < verticesMesh.count; i++) {
		var xV = verticesMesh.getX(i);
		var yV = verticesMesh.getZ(i * TR3.reducMeshW);
		if (xV > bboxMesh[0] && cero === true) {
			indexX = i;
			cero = false;
		}
		if (yV > bboxMesh[1] && uno === true) {
			indexY = i;
			uno = false;
		}

		if (cero === false && uno === false) { i = verticesMesh.count; }

	}

	var rangeX = Math.floor((bboxMesh[2] - bboxMesh[0]) / TR3.tPixMesh);
	var rangeY = Math.floor((bboxMesh[3] - bboxMesh[1]) / TR3.tPixMesh);
	var indexMesh = new Array();

	for (var i = 0; i < rangeY; i++) {
		for (var j = 0; j < rangeX; j++) {
			indexMesh.push(TR3.getIgridByXY(indexX + j, indexY + i));
		}
	}

	return indexMesh;
}


TR3.transformMeshByObj3d = function (obj3d) {

	TR3.assignZmeshByIndex();
	var verticesMesh = TR3.mesh.geometry.getAttribute("position");

	var selectables = new Array();
	if (!obj3d) { selectables = TR3.getSelectableObj(); } else { selectables.push(obj3d); }

	for (var j = 0; j < selectables.length; j++) {
		var oSlcti = selectables[j];
		var obj3dI = oSlcti;

		if (oSlcti.scene) {
			obj3dI = oSlcti.scene;
		} else if (oSlcti.parent && oSlcti.parent.scene) {
			obj3dI = oSlcti.parent.scene;
		}

		if (obj3dI.TR3 && obj3dI.TR3.transformMesh) {
			//if (!obj3dI.TR3.transformMesh) { obj3dI.TR3.transformMesh = 1; }
			var indexMesh = TR3.getIndexMeshZoneFromObj3d(obj3dI);

			switch (obj3dI.TR3.transformMesh) {
				case 1:
					for (var i = 0; i < indexMesh.length; i++) {
						var pos = new THREE.Vector3().fromBufferAttribute(verticesMesh, indexMesh[i]);

						var raycasterUp = TR3.getRayCaster([pos, new THREE.Vector3(0, 1, 0)], 'point-vector', 0, false);//Up
						var intersectUp = TR3.getIntersect(raycasterUp, [obj3dI])[0][0];

						var raycasterDown = TR3.getRayCaster([pos, new THREE.Vector3(0, -1, 0)], 'point-vector', 0, false);//Up
						var intersectDown = TR3.getIntersect(raycasterDown, [obj3dI])[0][0];

						if (intersectUp && intersectDown) {
							if (intersectUp.distance < intersectDown.distance) {
								verticesMesh.setY(indexMesh[i], intersectUp.point.y);
							} else {
								verticesMesh.setY(indexMesh[i], intersectDown.point.y);
							}
						} else if (intersectUp) {
							verticesMesh.setY(indexMesh[i], intersectUp.point.y);
						} else if (intersectDown) {
							verticesMesh.setY(indexMesh[i], intersectDown.point.y);
						}

					}
					break;
				case 2:
					for (var i = 0; i < indexMesh.length; i++) {
						var pos = new THREE.Vector3().fromBufferAttribute(verticesMesh, indexMesh[i]);

						var raycasterUp = TR3.getRayCaster([pos, new THREE.Vector3(0, 1, 0)], 'point-vector', 0, false);//Up
						var intersectUp = TR3.getIntersect(raycasterUp, [obj3dI])[0][0];

						if (intersectUp)
							verticesMesh.setY(indexMesh[i], intersectUp.point.y);
					}
					break;
				case 3:
					for (var i = 0; i < indexMesh.length; i++) {
						var pos = new THREE.Vector3().fromBufferAttribute(verticesMesh, indexMesh[i]);

						var raycasterDown = TR3.getRayCaster([pos, new THREE.Vector3(0, -1, 0)], 'point-vector', 0, false);//Up
						var intersectDown = TR3.getIntersect(raycasterDown, [obj3dI])[0][0];

						if (intersectDown)
							verticesMesh.setY(indexMesh[i], intersectDown.point.y);
					}
					break;
				case 4:
					obj3dI.TR3.transformMesh = false;
					break;
			}

			verticesMesh.needsUpdate = true;
			TR3.mesh.geometry.computeVertexNormals();
		}
	}
	TR3.pscs.updateGround();
};'use strict';
TR3.makeWorld = function (imgOri) {

	if (typeof (imgOri) == 'object') {
		TR3.makeObjects(imgOri);
	} else {
		var imgOriUper = imgOri.toUpperCase();
		if (imgOriUper.indexOf('HTTP://') == -1) {
			TR3.obtainImageFromID(imgOri);
		} else {
			TR3.obtainImageFromPath(imgOri);
		}
	}
};

TR3.obtainImageFromPath = function (image) {

	var imgConteint = new Image();
	var trying = 5;
	imgConteint.onload = function () {

		TR3.makeObjects(imgConteint);
	};

	imgConteint.onerror = function () {

		if (trying >= 0) {
			imgConteint.src = image;
			trying--;
		} else {
			alert("can not load image correctly");
			TR3.loadingDiv.style.display = 'none';
		}
	};
	imgConteint.crossOrigin = "anonymus";
	imgConteint.src = image;
};

TR3.obtainImageFromID = function (image) {

	//var imgConteint = new Image();
	var imgConteint = document.getElementById(image);
	//var context = canvas.getContext('2d');
	//imgConteint.src = canvas.toDataURL();
	TR3.makeObjects(imgConteint);
};

TR3.makeScene = function () {

	var radianFOV = TR3.fov * 2 * Math.PI / 360;
	var zone = TR3.zone;
	//TR3.controls.autoRotate = false;
	var tpix = TR3.tPixMesh;
	var val = TR3.rectaValue(2828, 10000000, 6, 30000, tpix);
	if (val < 5000) { val = 5000 };
	TR3.controls.keyPanSpeed = val;
	TR3.controls.enableKeys = false;
	TR3.controls.maxPolarAngle = Math.PI / 2.25;
	TR3.moveKey.walk = false;

	/*<--POSITIONS-->*/
	//x,y,z --> x,z,-y OrbitalMoves theta polar
	TR3.zeroParallax = TR3.cameraPositionFar = Math.cos(radianFOV / 2) * (zone[3] - zone[1]) / (2 * Math.sin(radianFOV / 2));
	/*if(cameraPositionY < TR3.zMax*TR3.valuesSet.magnification)
		cameraPositionY = TR3.zMax*TR3.valuesSet.magnification+100;*/

	var Xcenter = 0;//(zone[2] + zone[0]) / 2;
	var Ycenter = 0;
	var Zcenter = 0;//-(zone[3] + zone[1]) / 2;

	TR3.camera.position.set(Xcenter, TR3.cameraPositionFar/TR3.cameraDist, Zcenter);
	//TR3.camera.position.set( zone[2], TR3.cameraPositionFar, -zone[1] );


	var color = 0xFFFFFF;
	var intensity = 1;
	var zoneMod = TR3.getCoordsByXYmod(zone[0],zone[1],false, true);
	var light = new THREE.DirectionalLight(color, intensity);
	light.position.set(zoneMod[3], TR3.cameraPositionFar / 4, zoneMod[5]);
	light.target.position.set(Xcenter, 0, Zcenter);
	TR3.scene.add(light);
	TR3.scene.add(light.target);

	//var helper = new THREE.DirectionalLightHelper(light);
	//TR3.scene.add(helper);

	light.target.updateMatrixWorld();
	//helper.update();

	//var color = 0xFFFFFF;
	//var intensity = 1;
	var zoneMod = TR3.getCoordsByXYmod(zone[2],zone[1],false, true);
	var light = new THREE.DirectionalLight(color, intensity);
	light.position.set(zoneMod[3], TR3.cameraPositionFar / 4, zoneMod[5]);
	light.target.position.set(Xcenter, 0, Zcenter);
	TR3.scene.add(light);
	TR3.scene.add(light.target);

	//var helper = new THREE.DirectionalLightHelper(light);
	//TR3.scene.add(helper);

	light.target.updateMatrixWorld();
	//helper.update();

	//TR3.mesh.rotation.x = 3 * Math.PI / 2;//= - Math.PI / 2 
	TR3.mesh.position.set(Xcenter, Ycenter, Zcenter);
	TR3.centerZone = [TR3.centerZone[0]-Xcenter,TR3.centerZone[1]-(-Zcenter)];

	/*Set Center Movements*/
	TR3.controls.target.set(Xcenter, 0, Zcenter);
	/*<--POSITIONS-->*/

	/*updateProjectionMatrix - PETA EL CURSOR*/
	TR3.camera.near = 1;//TR3.camera.position.y-zMax*TR3.valuesSet.magnification;
	TR3.camera.far = 5000000;//TR3.camera.position.y-zMin*TR3.valuesSet.magnification;
	TR3.camera.fov = TR3.fov;

	TR3.cursor.helper.scale.set(1, 1, 1);

	//TR3.controls.keyPanSpeed = 20000;

	/*function updateCamera() {
		// update the light target's matrixWorld because it's needed by the helper
		TR3.directionalLight.target.updateMatrixWorld();
		// update the light's shadow camera's projection matrix
		TR3.directionalLight.shadow.camera.updateProjectionMatrix();
		// and now update the camera helper we're using to show the light's shadow camera
		TR3.cameraHelper.update();
	}
	//updateCamera();
	setTimeout(updateCamera);*/

	TR3.renderScene();
	TR3.initSky(Xcenter, Ycenter, Zcenter);
};

TR3.initSky = function (Xcenter, Ycenter, Zcenter) {

	// Add Sky
	var sky = TR3.scene.getObjectByName("Sky");
	sky.scale.setScalar(1300000);
	sky.position.set(Xcenter, Ycenter, Zcenter);
	sky.rotation.y = Math.PI / 2;

	var sun = new THREE.Vector3();

	/// GUI

	var effectController = {
		turbidity: 0,
		rayleigh: 0.5,
		mieCoefficient: 0.005,
		mieDirectionalG: 0.7,
		inclination: 0.49, // elevation / inclination
		azimuth: 0.25, // Facing front,
		exposure: 0.5//TR3.renderer.toneMappingExposure
	};

	function guiChanged() {

		var uniforms = sky.material.uniforms;
		uniforms["turbidity"].value = effectController.turbidity;
		uniforms["rayleigh"].value = effectController.rayleigh;
		uniforms["mieCoefficient"].value = effectController.mieCoefficient;
		uniforms["mieDirectionalG"].value = effectController.mieDirectionalG;

		var theta = Math.PI * -(effectController.inclination - 0.5);
		var phi = 2 * Math.PI * -(effectController.azimuth - 0.5);

		sun.x = Math.cos(phi);
		sun.y = Math.sin(phi) * Math.sin(theta);
		sun.z = Math.sin(phi) * Math.cos(theta);

		uniforms["sunPosition"].value.copy(sun);

		TR3.renderer.toneMappingExposure = effectController.exposure;
		TR3.renderer.render(TR3.scene, TR3.camera);

	}

	/*var gui = new GUI();
	
	gui.add( effectController, "turbidity", 0.0, 20.0, 0.1 ).onChange( guiChanged );
	gui.add( effectController, "rayleigh", 0.0, 4, 0.001 ).onChange( guiChanged );
	gui.add( effectController, "mieCoefficient", 0.0, 0.1, 0.001 ).onChange( guiChanged );
	gui.add( effectController, "mieDirectionalG", 0.0, 1, 0.001 ).onChange( guiChanged );
	gui.add( effectController, "inclination", 0, 1, 0.0001 ).onChange( guiChanged );
	gui.add( effectController, "azimuth", 0, 1, 0.0001 ).onChange( guiChanged );
	gui.add( effectController, "exposure", 0, 1, 0.0001 ).onChange( guiChanged );*/

	guiChanged();

}

TR3.makeSteve = function () {
	var vectorWeapon = new THREE.Vector3(1, -1, 0).unproject(TR3.camera);
	var vCube = [0.12, 0.12, 1];
	var weapon = new THREE.Mesh(
		new THREE.BoxGeometry(vCube[0], vCube[1], vCube[2]),
		new THREE.MeshBasicMaterial({ color: 0xdddddd })
	);
	weapon.position.copy(vectorWeapon);
	TR3.camera.add(weapon);

	// wireframe weapon

	var wireframeLine = new THREE.LineSegments(
		new THREE.EdgesGeometry(new THREE.BoxGeometry(vCube[0], vCube[1], vCube[2])),
		new THREE.LineBasicMaterial({ color: 0xaaaaaa })
	);
	//wireframeLine.position.copy( vectorWeapon );
	weapon.add(wireframeLine);

	var emitter = new THREE.Object3D();
	emitter.position.copy(vectorWeapon);
	TR3.camera.add(emitter);

	/*var reticle = new THREE.Mesh(
		new THREE.RingGeometry( 0.02,0.04, 8),
		new THREE.MeshBasicMaterial( {color: 0xffffff })
	);
	reticle.position.set(0, 0, -2);
	TR3.camera.add(reticle);*/
}

TR3.makeObjects = function (imgConteint) {

	TR3.widthImg = /*imgConteint.naturalWidth ||*/ imgConteint.width;
	TR3.heightImg = /*imgConteint.naturalHeight ||*/ imgConteint.height;

	var zone = TR3.zone;

	/*Texture-Material*/
	var texture = new THREE.Texture(imgConteint);
	texture.needsUpdate = true;
	texture.minFilter = THREE.LinearFilter;
	var material = new THREE.MeshBasicMaterial({ map: texture });/*MeshPhongMaterial*/

	/*Reduction Mesh*/
	var pct = 89;
	do {
		pct += 1;
		TR3.reducMesh = (1 - (pct / 100))/TR3.reducDTM;
		TR3.reducMeshW = Math.round(TR3.widthImg * TR3.reducMesh) + 1;
		TR3.reducMeshH = Math.round(TR3.heightImg * TR3.reducMesh) + 1;
	} while (TR3.getSizePix() / TR3.reducMesh < TR3.maxResolMesh);

	TR3.tPixImg = TR3.getSizePix();
	TR3.tPixMesh = TR3.tPixImg / TR3.reducMesh;

	/*Image-Mesh*/
	var geometry = new THREE.PlaneGeometry(zone[2] - zone[0], zone[3] - zone[1], TR3.reducMeshW - 1, TR3.reducMeshH - 1);
	geometry.rotateX(- Math.PI / 2);
	//geometry.applyMatrix4( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );

	TR3.mesh = new THREE.Mesh(geometry, material);
	//TR3.mesh.castShadow = true;
	//TR3.mesh.receiveShadow = true;
	TR3.mesh.geometry.dynamic = true;
	TR3.mesh.name = "mesh3d";
	TR3.scene.add(TR3.mesh);

	/*Geometry Cursor3d*/
	var reducPointer = 50;
	var geometry = new THREE.CylinderGeometry((zone[2] - zone[0]) / (4 * reducPointer), 0, (zone[2] - zone[0]) / reducPointer, 3);
	geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(0, (zone[2] - zone[0]) / (2 * reducPointer), 0));
	//geometry.applyMatrix4( new THREE.Matrix4().makeRotationX( Math.PI / 2 ) );
	TR3.cursor.helper = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial());
	TR3.cursor.helper.name = 'cursor';
	TR3.cursor.helper.visible = false;
	//var shadowHelper = TR3.setShadowBase( TR3.cursor.helper );
	//TR3.cursor.helper.hideShadowBase();

	//TR3.scene.add( shadowHelper );
	TR3.scene.add(TR3.cursor.helper);

	TR3.quaternion = new THREE.Quaternion();

	TR3.makeScene();
	
	/*Add Z values to Mesh*/
	TR3.makeZmesh();
};

TR3.cvsDesty = function () {
	var canvasDest = document.getElementById("canvasDest");
	if (canvasDest) { canvasDest.remove(); }

	var canvasDest = TR3.canvasDest;
	if (!canvasDest) {
		canvasDest = document.createElement('CANVAS');
		canvasDest.id = 'canvasDest';
		/*if (!TR3.config.unic) {
			canvasDest.style.position = 'absolute';
			canvasDest.style.top = '0px';
			canvasDest.style.left = '0px';
		}*/
		//canvasDest.setAttribute("width", TR3.canvasDestW);
		//canvasDest.setAttribute("height", TR3.canvasDestH);

		TR3.map.insertAdjacentElement('afterbegin', canvasDest);
	} else {
		//canvasDest.style.width = '100%';
		//canvasDest.style.height = '100%';
	}

	return canvasDest;
};

TR3.divLoading = function () {
	/*Cursor3d*/
	var infoGeo3d = document.getElementById('infoGeo3d');
	if (!infoGeo3d) {
		infoGeo3d = document.createElement('div');
		infoGeo3d.id = "infoGeo3d";
		infoGeo3d.style.position = "absolute";
		infoGeo3d.style.fontSize = "10px";
		infoGeo3d.style.margin = "25px";
		infoGeo3d.style.backgroundColor = "#fff";
		infoGeo3d.style.top = '10px';
		infoGeo3d.style.zIndex = '999';
		TR3.map.appendChild(infoGeo3d);
	}

	var loadingTerrain = TR3.loadingDiv;
	if (!loadingTerrain) {
		loadingTerrain = document.createElement('div');
		loadingTerrain.id = 'loadingTerrain';
		loadingTerrain.style.position = "absolute";
		loadingTerrain.style.top = "0px";
		loadingTerrain.style.marginTop = TR3.canvasDestH / 2 + "px";
		loadingTerrain.style.marginLeft = TR3.canvasDestW / 2.5 + "px";
		loadingTerrain.style.fontSize = "15px";
		loadingTerrain.style.backgroundColor = "#bbb";
		loadingTerrain.style.border = 'solid';
		//loadingTerrain.style.zIndex = TR3.canvasDestZindex + 1;
		loadingTerrain.innerHTML = '&nbsp;&nbsp;&nbsp;Loading ...&nbsp;&nbsp;&nbsp;';

		TR3.map.appendChild(loadingTerrain);
	} else {
		loadingTerrain.innerHTML = '&nbsp;&nbsp;&nbsp;Loading ...&nbsp;&nbsp;&nbsp;';
		loadingTerrain.style.display = 'block';
	}
	TR3.loadingDiv = loadingTerrain;
};

TR3.divContainer = function () {

	if (typeof (TR3.map) != 'object') {
		TR3.map = document.getElementById(TR3.map);
	}

	TR3.canvasDestW = TR3.map.clientWidth || parseInt(TR3.map.style.width) || document.documentElement.offsetWidth;
	TR3.canvasDestH = TR3.map.clientHeight || parseInt(TR3.map.style.height) || document.documentElement.offsetHeight;
	//TR3.canvasDestZindex = 1000;
	//TR3.map.style.position='relative';
};

TR3.setImageMesh = function (imgConteint) {

	var texture = new THREE.Texture(imgConteint);
	texture.needsUpdate = true;
	texture.minFilter = THREE.LinearFilter;

	TR3.mesh.material.map = texture;
};

TR3.setMeshZone = function () {

	if (TR3.newMeshMap == 0 && TR3.widthImg) {
		TR3.loadingDiv.style.display = 'block';
		TR3.makeScene();
	}
};'use strict';
TR3.assignZmesh = function () {

	var arrayZ = TR3.arrayZ;

	var zGreedH = TR3.reducMeshH;
	var zGreedW = TR3.reducMeshW;
	var posZ = Math.round(zGreedH / 2) * zGreedW + Math.round(zGreedW / 2);//F/2*C+C/2

	TR3.zMed = arrayZ[posZ];

	var distRealXc = TR3.getCoordsDistance([TR3.zone[0],TR3.centerZone[1]],[TR3.zone[2],TR3.centerZone[1]]);
	var dostCoordXc = Math.abs(TR3.zone[2] - TR3.zone[0]);

	var distRealXd = TR3.getCoordsDistance([TR3.zone[0],TR3.zone[1]],[TR3.zone[2],TR3.zone[1]]);
	var dostCoordXd = Math.abs(TR3.zone[0] - TR3.zone[2]);

	var distRealXt = TR3.getCoordsDistance([TR3.zone[0],TR3.zone[3]],[TR3.zone[2],TR3.zone[3]]);
	var dostCoordXt = Math.abs(TR3.zone[0] - TR3.zone[2]);

	var distRealYc = TR3.getCoordsDistance([TR3.zone[1],TR3.centerZone[0]],[TR3.zone[3],TR3.centerZone[0]]);
	var dostCoordYc = Math.abs(TR3.zone[3] - TR3.zone[1]);

	var distRealYl = TR3.getCoordsDistance([TR3.zone[0],TR3.zone[1]],[TR3.zone[0],TR3.zone[3]]);
	var dostCoordYl = Math.abs(TR3.zone[1] - TR3.zone[3]);

	var distRealYr = TR3.getCoordsDistance([TR3.zone[2],TR3.zone[1]],[TR3.zone[2],TR3.zone[3]]);
	var dostCoordYr = Math.abs(TR3.zone[1] - TR3.zone[3]);
	
	TR3.adjustScale = (dostCoordXc/distRealXc + dostCoordYc/distRealYc + dostCoordYl/distRealYl + dostCoordYr/distRealYr +
	dostCoordXd/distRealXd + dostCoordXt/distRealXt)/6;

	var vertices = TR3.mesh.geometry.getAttribute("position");
	for (var i = 0; i < arrayZ.length; i++) {
		//zTerr0 = arrayZ[i];
		//zPix[i] = TR3.GetGeo2pix(zTerr0);
		//TR3.mesh.geometry.vertices[i].z = arrayZ[i]*TR3.valuesSet.magnification - TR3.zMed*TR3.valuesSet.magnification;//zPix[i]*TR3.valuesSet.magnification;
		//TR3.mesh.geometry.verticesNeedUpdate = true;
		vertices.setY(i, (arrayZ[i] * TR3.adjustScale - TR3.zMed) * TR3.valuesSet.magnification); //= (arrayZ[i] - TR3.zMed)*TR3.valuesSet.magnification
	}

	TR3.renderScene();

	vertices.needsUpdate = true;
	TR3.mesh.geometry.computeVertexNormals();

	if (TR3.newMeshMap == 1) {
		TR3.onCompleteMap();
		setTimeout(function(){
			TR3.onCompleteMap();
		}, 3000);
	} else {
		TR3.loadingDiv.style.display = 'none';
	}

};

TR3.assignZmeshByIndex = function (index) {

	var arrayZ = TR3.arrayZ;

	var vertices = TR3.mesh.geometry.getAttribute("position");
	if (index) {
		for (var i = 0; i < index.length; i++) {
			vertices.setY(index[i], (arrayZ[index[i]] * TR3.adjustScale - TR3.zMed) * TR3.valuesSet.magnification); //= (arrayZ[i] - TR3.zMed)*TR3.valuesSet.magnification
		}
	} else {
		for (var i = 0; i < arrayZ.length; i++) {
			vertices.setY(i, (arrayZ[i] * TR3.adjustScale - TR3.zMed) * TR3.valuesSet.magnification); //= (arrayZ[i] - TR3.zMed)*TR3.valuesSet.magnification
		}
	}

	vertices.needsUpdate = true;
	TR3.mesh.geometry.computeVertexNormals();

};

TR3.obtainZmeshWCS = function (widthDTM, heightDTM, bboxDTM0, bboxDTM1, bboxDTM2, bboxDTM3, srsDTM, timeout) {
	if (!timeout && TR3.timeoutReq && TR3.timeoutReq[0]) {
		clearTimeout(TR3.timeoutReq[0]);
	}

	if (TR3.requestDTMwcs) {
		TR3.requestDTMwcs.abort();
	}

	TR3.requestDTMwcs = new XMLHttpRequest();
	var tPixMesh = TR3.tPixMesh;
	var posName = 1000;

	if (tPixMesh > 1000) {

	} else if (tPixMesh < 1000 && tPixMesh >= 500) {
		var posName = 1000;
	} else if (tPixMesh < 500 && tPixMesh >= 200) {
		var posName = 200;
	} else if (tPixMesh < 200 && tPixMesh >= 25) {
		var posName = 25;
	} else {
		var posName = 5;
	}

	var c1 = proj4(proj4.defs(TR3.srsImg), proj4.defs('EPSG:4326'), [bboxDTM0, bboxDTM1]);
	var preName = 'Elevacion25830_';
	if (c1[0] < -13 || c1[1] < 29.5) { preName = 'Elevacion4083_'; }

	TR3.requestDTMwcs.open('GET', 'https://servicios.idee.es/wcs-inspire/mdt?SERVICE=WCS&REQUEST=GetCoverage&VERSION=1.0.0&interpolationMethod=bilinear&FORMAT=ArcGrid&CRS=' + srsDTM + '&BBOX=' + bboxDTM0 + ',' + bboxDTM1 + ',' + bboxDTM2 + ',' + bboxDTM3 + '&WIDTH=' + widthDTM + '&HEIGHT=' + heightDTM + '&COVERAGE=' + preName + posName);
	TR3.requestDTMwcs.onload = function () {
		var txtDTMwcs = TR3.requestDTMwcs.responseText;
		var str = '\n ';
		if (txtDTMwcs && txtDTMwcs.indexOf(str) != -1) {
			var zConteint = txtDTMwcs.slice(txtDTMwcs.indexOf(str) + str.length);

			var sinSalto = zConteint.replace(/\r\n/g, " ");
			var sinFin = sinSalto.slice(0, sinSalto.length - 1);
			var arrayZ = sinFin.split(" ");
			var lengthDTM = widthDTM * heightDTM; //vienen filas de más...
			var evalZ;
			var zMin = arrayZ[0] * 1;
			var zMax = arrayZ[0] * 1;

			if (arrayZ.length < 100) {
				//alert("WCS no load, trying DTM alternative");
				TR3.errorDTMwcs(widthDTM, heightDTM, bboxDTM0, bboxDTM1, bboxDTM2, bboxDTM3, srsDTM);
			} else {
				for (var i = 0; i < lengthDTM; i++) {
					TR3.arrayZ[i] = evalZ = eval(arrayZ[i]);
					if (evalZ < -1000 || evalZ > 4000) {
						TR3.arrayZ[i] = 0;
					}

					if (TR3.arrayZ[i] < zMin) { zMin = TR3.arrayZ[i]; }
					if (TR3.arrayZ[i] > zMax) { zMax = TR3.arrayZ[i]; }
				}

				TR3.zMin = zMin;
				TR3.zMax = zMax;

				TR3.assignZmesh();
				//console.log('hh');
			}
		} else {
			TR3.errorDTMwcs(widthDTM, heightDTM, bboxDTM0, bboxDTM1, bboxDTM2, bboxDTM3, srsDTM);
		}
		TR3.requestDTMwcs = false;
	}

	TR3.requestDTMwcs.onerror = function (err) {
		TR3.errorDTMwcs(widthDTM, heightDTM, bboxDTM0, bboxDTM1, bboxDTM2, bboxDTM3, srsDTM);
	};

	TR3.requestDTMwcs.send();
};

TR3.errorDTMwcs = function (widthDTM, heightDTM, bboxDTM0, bboxDTM1, bboxDTM2, bboxDTM3, srsDTM) {
	var lengthDTM = widthDTM * heightDTM;
	for (var i = 0; i < lengthDTM; i++) {
		TR3.arrayZ[i] = 0;
	}

	TR3.assignZmesh();

	if (TR3.timeoutReq[1] < 3) {
		TR3.timeoutReq[1]++;
		TR3.timeoutReq[0] = setTimeout(function () { TR3.obtainZmeshWCS(widthDTM, heightDTM, bboxDTM0, bboxDTM1, bboxDTM2, bboxDTM3, srsDTM, true); }, 3000);
	} else {
		TR3.timeoutReq[1] = 0;
		clearTimeout(TR3.timeoutReq[0]);
	}
};

/*TR3.obtainZmeshRtr = function(widthDTM,heightDTM,bboxDTM0,bboxDTM1,bboxDTM2,bboxDTM3,srsDTM){
	
	var imgDTMconteint = new Image();
	imgDTMconteint.onload = function() {
		var j = 0;
		
		var canvasDTMrtr = document.getElementById('canvasDTMrtr');
		if(!canvasDTMrtr){
			canvasDTMrtr = document.createElement('CANVAS');
			canvasDTMrtr.id = 'canvasDTMrtr';
		}
		
		canvasDTMrtr.setAttribute('width',widthDTM);
		canvasDTMrtr.setAttribute('height',heightDTM);
		
		//document.body.appendChild(canvasDTMrtr);
		//this.addObjToResize(canvas.id);
		var ctxDTMrtr = canvasDTMrtr.getContext("2d"); 
		ctxDTMrtr.drawImage(imgDTMconteint, 0, 0, widthDTM, heightDTM);
		
		var imageData = ctxDTMrtr.getImageData(0,0,widthDTM,heightDTM);
		var pixels = imageData.data;
		for (var i = 0, il = pixels.length; i < il; i+= 4) {
			//TR3.arrayZ[j] = (pixels[i+0]*1024 + pixels[i+1]*32 + pixels[i+2])*2/8;
			var arrayZ;
			TR3.arrayZ[j] = arrayZ = pixels[i+0]*256 + ((pixels[i+1])*(2047-31.875)/255 ) + pixels[i+2]/8;
			if(arrayZ < -1000 || arrayZ > 4000){
				TR3.arrayZ[j] = 0;
			}
			j++;
		}
		TR3.assignZmesh();

	};
	imgDTMconteint.crossOrigin="anonymus";
	
	//imgDTMconteint.src = 'http://sintetico.sigrid3d.com/SgdWms/SgdWms.dll/WMS?&VERSION=1.1.1&REQUEST=GetMap&LAYERS=DTM_espana_5m_etrs89&FORMAT=image/bmp&SRS='+srsDTM+'&BBOX='+bboxDTM0+','+bboxDTM1+','+bboxDTM2+','+bboxDTM3+'&EXCEPTIONS=application/vnd.ogc.se_inimage&WIDTH='+widthDTM+'&HEIGHT='+heightDTM;
	//imgDTMconteint.src = 'http://www.ign.es/3d-stereo/sintetico/SgdWms.dll/WMS?&VERSION=1.1.1&REQUEST=GetMap&LAYERS=DTM_espana_5m_etrs89&FORMAT=image/bmp&SRS='+srsDTM+'&BBOX='+bboxDTM0+','+bboxDTM1+','+bboxDTM2+','+bboxDTM3+'&EXCEPTIONS=application/vnd.ogc.se_inimage&WIDTH='+widthDTM+'&HEIGHT='+heightDTM;
	imgDTMconteint.src = 'http://www.ign.es/3d-stereo/sintetico/SgdWms.dll/WMS?&VERSION=1.1.1&REQUEST=GetMap&LAYERS=DTM_espana_5m_etrs89&FORMAT=image/bmp&SRS='+srsDTM+'&BBOX='+bboxDTM0+','+bboxDTM1+','+bboxDTM2+','+bboxDTM3+'&WIDTH='+widthDTM+'&HEIGHT='+heightDTM;
};*/

TR3.makeZmesh = function () {

	var widthDTM = TR3.reducMeshW;
	var heightDTM = TR3.reducMeshH;

	var bboxDTM0 = eval(TR3.zone[0]) - TR3.tPixMesh / 2;
	var bboxDTM1 = eval(TR3.zone[1]) - TR3.tPixMesh / 2;
	var bboxDTM2 = eval(TR3.zone[2]) + TR3.tPixMesh / 2;
	var bboxDTM3 = eval(TR3.zone[3]) + TR3.tPixMesh / 2;
	var srsDTM = TR3.srsImg;
	TR3.arrayZ = Array(widthDTM * heightDTM).fill(0);
	TR3.zMin = 0;
	TR3.zMax = 0;

	if (TR3.optionsSet.terrain == true) {
		document.getElementById('loadingTerrain').style.display = 'block';
		if (TR3.dtmOri) {
			fetch(TR3.dtmOri)
				.then(response => response.text())
				.then(data_mdt => {
					var txtDTMwcs = data_mdt;
					var str = '\n ';
					var zConteint = txtDTMwcs.slice(txtDTMwcs.indexOf(str) + str.length);
					var sinSalto = zConteint.replace(/\r\n/g, " ");
					var sinFin = sinSalto.slice(0, sinSalto.length - 1);
					var arrayZ = sinFin.split(" ");
					var lengthDTM = widthDTM * heightDTM; //vienen filas de más...
					var evalZ;
					var zMin = arrayZ[0] * 1;
					var zMax = arrayZ[0] * 1;

					if (arrayZ.length < 100) {
						//alert("WCS no load, trying DTM alternative");
						//TR3.errorDTMwcs(widthDTM, heightDTM, bboxDTM0, bboxDTM1, bboxDTM2, bboxDTM3, srsDTM);
					} else {
						for (var i = 0; i < lengthDTM; i++) {
							TR3.arrayZ[i] = evalZ = eval(arrayZ[i]);
							if (evalZ < -1000 || evalZ > 4000) {
								TR3.arrayZ[i] = 0;
							}

							if (TR3.arrayZ[i] < zMin) { zMin = TR3.arrayZ[i]; }
							if (TR3.arrayZ[i] > zMax) { zMax = TR3.arrayZ[i]; }
						}

						TR3.zMin = zMin;
						TR3.zMax = zMax;

						TR3.assignZmesh();
						//console.log('hh');
					}
				});
		} else {
			TR3.obtainZmeshWCS(widthDTM, heightDTM, bboxDTM0, bboxDTM1, bboxDTM2, bboxDTM3, srsDTM);
		}
	} else {
		TR3.assignZmesh();
	}
};

TR3.setMagniValues = function (magn) {

	var magniB4 = TR3.valuesSet.magnification;
	var magni;

	if (!isNaN(parseFloat(magn))) {
		TR3.valuesSet.magnification = Math.round(magn);
	} else if (TR3.tPixMesh) {
		var zoom = TR3.tPixMesh;
		var magni = Math.round(TR3.rectaValue(7000, 11, 5, 1, zoom));

		var bigZ = Math.abs(TR3.zMax - TR3.zMin);
		var bigX = Math.abs(TR3.zone[2] - TR3.zone[0]);
		var bigY = Math.abs(TR3.zone[3] - TR3.zone[1]);
		var bigXY;

		if (bigX - bigY > 0) {
			bigXY = bigX;
		} else { bigXY = bigY; }

		if (bigXY / bigZ <= 25) { magni = magni / 4; }
		if (zoom < 90 || magni < 1) { magni = 1; }	//$('#magnificationSlider').slider("option", "min"
		if (magni > 15) { magni = 15; }			//$('#magnificationSlider').slider("option", "max"
		TR3.valuesSet.magnification = magni;
	} else {
		TR3.valuesSet.magnification = 1;
	}

	if (magniB4 != magn && TR3.newMeshMap == 0 && TR3.widthImg) {
		//document.getElementById('loadingTerrain').style.display = 'block';
		TR3.assignZmesh();
		TR3.assignZgeometries();
		TR3.newDraw = -1;
	}

	return TR3.valuesSet.magnification;
};