'use strict';
/*Object API*/
var TR3 = new Object();
var THREE = new Object();
TR3.version = "rev:2.121.10";
TR3.imgOri = false;
TR3.imgDesty = false;
TR3.lock3d=false;
TR3.config = new Object();

if(typeof IIIkel !== 'undefined'){
	TR3.config = IIIkel.config.TR3;
}else{
	TR3.config = {
		unic: true,
		src: false,
		flag3d: true,
		rotate: false,
		lookAt: false,
		magni: 'auto',
		spritesDskMvl: 1,
		zoomMapDskMvl: 0};
}


TR3.setLoader = function( src, TR3three ){
	
	if (typeof (src) == 'undefined') { src = '' };
	
	TR3.config.src = src;

	//if (typeof (TR3three) != 'undefined') { TR3cfg = TR3three };

	THREE = TR3three.THREE || THREE;
	TR3.OrbitControls = TR3three.OrbitControls || OrbitControls || THREE.OrbitControls;
	TR3.TransformControls = TR3three.TransformControls || TransformControls || THREE.TransformControls;
	TR3.SkeletonUtils = TR3three.SkeletonUtils || SkeletonUtils || THREE.SkeletonUtils;
	//TR3.BufferGeometryUtils = TR3three.BufferGeometryUtils || BufferGeometryUtils || THREE.BufferGeometryUtils;
	TR3.GLTFExporter = TR3three.GLTFExporter || GLTFExporter || THREE.GLTFExporter;
	TR3.GLTFLoader = TR3three.GLTFLoader || GLTFLoader || THREE.GLTFLoader;
	TR3.IFCLoader = TR3three.IFCLoader || IFCLoader || THREE.IFCLoader;
	TR3.Sky = TR3three.Sky || Sky || THREE.Sky;
}

/*PANEL*/
TR3.setPanel = function(){
	
	var panel =	'\
				<div id="3doptions" style="border: solid;margin: 5px; padding: 5px; display: none;float:left">\
					<label id="lblSroOpt" style="font-weight: bold;margin-bottom: 5px;border: solid 2px royalblue;text-align: center;color: royalblue;cursor: pointer">▲ Herramientas 3D ▲</label>\
					<div id="sroOpt" style="display:none">\
						<div id="magnificationSliderValue">Exagerar x</div>\
						<input type="button" class="magniStep" style="float:left" value="&nbsp;-&nbsp;"><div id="magnificationSlider" style="float:left;width:95px;margin:4px"></div><input type="button" class="magniStep" style="float:left" value="+">\
						<!--<label><input class="changeOpt" id="DTMcheck" type="checkbox"> DTM  alternativo WCS</label><br>-->\
						<label style="width:150px;float:left"><input class="changeOpt" id="cursorCheck" type="checkbox"><span id="cursorCheck_spm">▲ 3D Cursor ▲</span></label><br>\
						<div id="cursorCheck_div" style="display:none;border: 1px dashed gray;padding: 1px;float: left;width: 100%">\
							<input id="newLine" style="float:left;" type="button" value=" Línea " class="">\
							<input id="newPolig" style="float:left;" type="button" value=" Polígono " class="">\
							<span><input id="metrics" type="checkbox" style="margin:3px 0 3px 3px">Medir</span><br>\
							<input id="PickDrawStereo" type="text" style="width: 50px;"; value="#ff6161">\
							<input id="del_vGeom" type="button" value="Borrar Todo" class="">\
							<span>Valor de Z: </span><input id="setZ" type="text" style="width: 50px;"; value=""><span id="helpSetZ" style="color:royalblue;text-decoration:underline;cursor:pointer">Ayuda</span>\
						</div>\
						<label><input class="changeOpt" id="anaglyphCheck" type="checkbox"><span id="anaglyphCheck_spm">▲ Stereo 3D ▲</span></label>\
						<div id="anaglyphType" style="display:none;border: 1px dashed gray;padding: 1px;float: left;width: 100%">\
							<span>&nbsp;- Modo: </span><select id="anaglyph-type" onchange="TR3.changeAnaglyphType()">\
								<option value="optimiced">Optimizado</option>\
								<option value="normal">Normal</option>\
								<option value="half">Intermedio</option>\
								<option value="gray">Gris</option>\
								<option value="interlaced">Entrelazado</option>\
							</select>\
							<a target="_blank" href="'+ TR3.config.src +'docStereo.pdf">Gafas 3d</a>\
						</div>\
						<div style="float:left">\
							<input id="file_3d" type="file" accept=".glb,.ifc" style="opacity: 0; position: absolute; width: 100px;">\
							<input id="file_3d_fake" style="color: gray; width: 100px;" value=" Explorar GLB/IFC... ">\
							<input id="del3dObj" type="button" value=" Fin ">\
							<span id="help3dObj" style="color:royalblue;text-decoration:underline;cursor:pointer"> Ayuda</span><br>\
							<span>&nbsp;- Exportar ⇩ </span><select id="exporter-type" onchange="TR3.changeExportType()">\
								<option value="null" style="background-color:#ccc" selected>tipo GLTF</option>\
								<option value="terrain">Terreno</option>\
								<option value="obj3d">Objetos</option>\
								<option value="items">Vectores</option>\
								<option value="scene">Todo</option>\
							</select>\
							<label id="size3dObj"></label>\
						</div>\
					</div>\
					<div id="orbitalMoves" style="width: 155px; text-align: center; box-shadow: rgb(136, 136, 136) 1px 1px 5px; border: medium outset #eee; float: left;">\
						<img id="imgOrbitalMoves" src="'+ TR3.config.src +'img/eartharrow.png" draggable="false" style="margin: 5px;cursor:pointer"><br>\
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
						<div style="text-align: left; margin: 5px"><input id="autoRotate" type="checkbox" class="changeOpt"> Rotación <input id="malla" type="checkbox" class="changeOpt"> Malla</div>\
					</div>';
				var pnl2 = "";
				var pnl3 = "";
				if(!TR3.config.unic){
					pnl2 = '<div id="slctScenes"><b><div align="center"><input id="viewScenes" type="checkbox" class="" checked> Acceso a Escenas:</div></b>\
						<div align="center" id="btnsScenes">\
							<input id="acc2scn" type="button" value=" Paisajes Increíbles " style="color:royalblue;" class="">\
						</div>\
					</div>';
				}
				pnl3 = '</div><img id="imgErrTR3evt" src onerror="TR3.setEvtPanel()">\
				<div id="advices"></div>';
				
				//https://threejs.org/examples/?q=export#misc_exporter_gltf
				//https://gltf-viewer.donmccurdy.com/
	return panel+pnl2+pnl3;
};

TR3.setEvtPanel = function(){
	
	// Create a new jQuery UI Slider element
	// and set some default parameters.
	$( "#magnificationSlider" ).slider({
		min:1,
		max:15,
		slide: function( event, ui ) {
		
			// While sliding, update the value in the #amount div element
			var tPixMesh = TR3.formatMeasure(TR3.tPixMesh);
			$( "#magnificationSliderValue" ).html( 'Exagerar <b>x' + ui.value + '</b> (malla: ' + tPixMesh[0] + tPixMesh[1] + ')');
			TR3.setMagniValues(ui.value);
	
		}
	});
	
	$( "#heightSlider" ).slider({
		min:0,
		max:1000,
		slide: function( event, ui ) {
	
			// While sliding, update the value in the #amount div element
			$('#heightSlider').slider( "option", "max", Math.round( (TR3.zMax - TR3.zMed)*TR3.valuesSet.magnification ) );
			$('#heightSlider').slider( "option", "min", Math.round( (TR3.zMin - TR3.zMed)*TR3.valuesSet.magnification ) );
			TR3.changeHeight( ui.value, true, false);
			$( "#heightSliderValue" ).html( 'Altitud: ' + Math.round( (ui.value/TR3.valuesSet.magnification) + TR3.zMed ) + ' m' );
		}
	});
	
	$("#anaglyphCheck").on("change", function() {
		if (!this.checked) {
			document.getElementById('anaglyphType').style.display = 'none';
			document.getElementById('anaglyphCheck_spm').innerHTML = '▲ Stereo 3D ▲';
		}else{
			document.getElementById('anaglyphType').style.display = 'block';
			document.getElementById('anaglyphCheck_spm').innerHTML = '▼ Stereo 3D ▼';
		}
	});
	
	$("#viewScenes").on("change", function() {
		if (!this.checked) {
			document.getElementById('btnsScenes').style.display = 'none';
			TR3.viewScenes = false;
		}else{
			document.getElementById('btnsScenes').style.display = 'block';
			TR3.viewScenes = true;
		}
	});
	
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
	//$('.TR3PickColor').css('display','none');
	
	var changeOpt = document.getElementsByClassName("changeOpt");
	for (var i = 0; i<changeOpt.length; i++) {
		changeOpt[i].addEventListener('click', TR3.setOpts, false)
	}
	
	if(!TR3.config.unic){
		document.getElementById('acc2scn').addEventListener("click", function(){ 
			IIIkel.container.ctxScenes.show();
		}, false);
	}
	document.getElementById('makeScene').addEventListener("click", function(){
		TR3.lightBtn(this.id);
		TR3.setValuesSliderMagn("auto");
		TR3.moving = false;
		TR3.initPosCamera(true);
		TR3.cursor.helper.scale.set(1,1,1);
		document.getElementById('exploreDiv').style.display = 'none';
		document.getElementById('personFlySliderDiv').style.display = 'none';
		TR3.setOpts({autoRotate:false});
	}, false);
	document.getElementById('orbitPoint').addEventListener("click", function(){
		TR3.lightBtn(this.id);
		TR3.moving = false;
		TR3.orbitalViewFn();
		document.getElementById('exploreDiv').style.display = 'none';
		document.getElementById('personFlySliderDiv').style.display = 'none';
		TR3.setOpts({autoRotate:false});
	}, false);
	document.getElementById('pWalking').addEventListener("click", function(){
		TR3.lightBtn(this.id);
		TR3.moving = true;
		TR3.personViewFn();
		TR3.moveKey.walk = true;
		if(TR3.optionsSet.imgControl){document.getElementById('imgOrbitalMoves').focus();
		}else{document.getElementById('canvasDest').focus();}
		document.getElementById('exploreDiv').style.display = 'block';
		document.getElementById('personFlySliderDiv').style.display = 'none';
		TR3.setOpts({autoRotate:false});
	}, false);
	document.getElementById('pFlying').addEventListener("click", function(){
		TR3.lightBtn(this.id);
		TR3.moving = true;
		var hi = (TR3.zMax-TR3.zMin)/2*TR3.valuesSet.magnification;
		TR3.personViewFn(hi);
		TR3.setValuesSliderHeight(hi);
		TR3.moveKey.walk = false;
		if(TR3.optionsSet.imgControl){document.getElementById('imgOrbitalMoves').focus();
		}else{document.getElementById('canvasDest').focus();}
		document.getElementById('exploreDiv').style.display = 'block';
		document.getElementById('personFlySliderDiv').style.display = 'block';
		TR3.setOpts({autoRotate:false});
	}, false);
	
	document.getElementById('cursorCheck').addEventListener("click", function(){
		if(document.getElementById('cursorCheck').checked){
			document.getElementById('cursorCheck_div').style.display = 'block';
			document.getElementById('cursorCheck_spm').innerHTML = '▼ 3d cursor ▼';
			
			TR3.lock3d('cursor3d');
		}else{
			document.getElementById('cursorCheck_div').style.display = 'none';
			document.getElementById('cursorCheck_spm').innerHTML = '▲ 3d cursor ▲';
			document.getElementById('metrics').checked = false;
			TR3.vGeom.measure=false;
			TR3.endDraw();
			
			TR3.unlock3d('cursor3d');
		}
	}, false);
	
	document.getElementById('metrics').addEventListener("click", function(){
		if(document.getElementById('metrics').checked){
			TR3.vGeom.measure=true;
		}else{
			TR3.vGeom.measure=false;
		}
	}, false);
	
	document.getElementById('lblSroOpt').addEventListener("click", function(){
		var disp = document.getElementById('sroOpt').style.display;
		var sroOpt = document.getElementById('lblSroOpt');
		if(disp == 'none'){
			document.getElementById('sroOpt').style.display = 'block';
			sroOpt.innerHTML = '▼ Herramientas 3D ▼';
		}else{
			document.getElementById('sroOpt').style.display = 'none';
			sroOpt.innerHTML = '▲ Herramientas 3D ▲';
		}
	}, false);
	
	var imgOrbitalMoves = document.getElementById('imgOrbitalMoves');
	imgOrbitalMoves.addEventListener("mouseover", function(){imgOrbitalMoves.src = TR3.config.src+'img/eartharrow_over.png';}, false);
	imgOrbitalMoves.addEventListener("mouseout", function(){imgOrbitalMoves.src = TR3.config.src+'img/eartharrow.png';}, false);
	//imgOrbitalMoves.addEventListener("mousedown", function(){TR3.setOpts({autoRotate:false});}, false);
	//imgOrbitalMoves.addEventListener("touchstart", function(){TR3.setOpts({autoRotate:false});}, false);
	//imgOrbitalMoves.addEventListener("wheel", function(){TR3.setOpts({autoRotate:false});}, false);
	document.getElementById('moreV').addEventListener("click", function(){	if(TR3.optionsSet.imgControl){imgOrbitalMoves.focus();
																			}else{TR3.canvasDest.focus();}TR3.controls.keyPanSpeed=TR3.controls.keyPanSpeed*3;}, false);
	document.getElementById('lessV').addEventListener("click", function(){	if(TR3.optionsSet.imgControl){imgOrbitalMoves.focus();
																			}else{TR3.canvasDest.focus();};TR3.controls.keyPanSpeed=TR3.controls.keyPanSpeed/3;}, false)
	document.getElementById('newLine').addEventListener("click", function(){TR3.vGeom.polig=false;TR3.newVgeom()}, false);
	document.getElementById('newPolig').addEventListener("click", function(){TR3.vGeom.polig=true;TR3.newVgeom()}, false);
	document.getElementById('del_vGeom').addEventListener("click", function(){TR3.del_vGeom();document.getElementById('metrics').checked = false}, false);
	
	document.getElementById('file_3d').addEventListener("change", function(evt){ TR3.handleFileSelect(evt); }, false);
	document.getElementById('del3dObj').addEventListener("click", function(){	//TR3.del3dObj(); 
																				var file_3d = document.getElementById('file_3d');
																				file_3d.value=''; 
																				var file_3d_fake = document.getElementById('file_3d_fake');
																				file_3d_fake.value=' Explorar GLB/IFC... '; 
																				TR3.sourceFile = false;}, false);
	document.getElementById('help3dObj').addEventListener("click", function(){
		var text = '<div id="infohelp3dObj" style="padding:10px">\
						<div align="center"><u>Carga el modelo y Presiona la tecla:</u></div><br />\
						<b>"W"</b> Trasladar | <b>"E"</b> Rotar | <b>"R"</b> scale<br />\
						<b>"+"</b> Aumentar | <b>"-"</b> Disminuir<br />\
						<b>"Q"</b> Cambia world/local espacio <br />\
						<b>"X"</b> Cambia X | <b>"Y"</b> Cambia Y | <b>"Z"</b> Cambia Z<br />\
						<b>"Barra espaciadora"</b> activa/desactiva <br /><br />\
						<div align="center"><u>Hazlo tú mismo:</u></div>\
						<b>1) Modelos 3D:</b><a href="https://sketchfab.com/" target="_blank"> sketchfab</a><br />\
						<b>2) GLTF to GLB:</b><a href="https://glb-packer.glitch.me/" target="_blank"> glb-packer</a><br />\
						<b>3) ¡Úsalo aquí!</b><br />\
						Visor GLTF: <a href="https://gltf-viewer.donmccurdy.com/" target="_blank"> gltf viewer</a><br />\
					</div>';
		document.getElementById('advices').innerHTML = text;
		$( "#advices" ).dialog();
	}, false);
	
	document.getElementById('helpSetZ').addEventListener("click", function(){
		var text = '<div id="infohelpSetZ" style="padding:10px">\
						<div align="center"><u>Introduce valor de Z y Presiona la tecla:</u></div><br />\
						<b>"Alt"</b> Cambia Z Terreno<br />\
						<b>"Shift"</b> Cambia Z Cursor<br />\
					</div>';
		document.getElementById('advices').innerHTML = text;
		$( "#advices" ).dialog();
	}, false);
	
	var magniStep = document.getElementsByClassName("magniStep");
	for ( var i = 0; i < magniStep.length; i++ ) {
		magniStep[i].addEventListener("click", function(e) {
			var val = e.target.value;
			var magn = TR3.valuesSet.magnification
			if( val.indexOf('+') != -1 ){
				magn = magn+1
				if(magn>15){magn=15}
				TR3.setValuesSliderMagn(magn);
			}else{
				magn = magn-1;
				if(magn<1){magn=1}
				TR3.setValuesSliderMagn(magn);
			}
		});
	}
};

TR3.lightBtn = function(id){
	
	var drawPnl_bd = document.getElementsByClassName('btnDrawOn');
	for(var i = 0 ; i < drawPnl_bd.length ; i++){
		drawPnl_bd[i].className = '';
	}
	if(id == 'makeScene'){id='orbitPoint';}
	document.getElementById(id).className = 'btnDrawOn';
};

TR3.setStart = function( params, TR3three ){
	TR3.dfd_setMap = $.Deferred();
	if ( params === undefined ) params = {};
		
	var ori = params.hasOwnProperty("ori") ? 
		params["ori"] : false;
	
	TR3.map = params.hasOwnProperty("desty") ? 
		params["desty"] : false;
	
	var bbox = params.hasOwnProperty("bbox") ? 
		params["bbox"] : false;
		
	TR3.srsImg = params.hasOwnProperty("projCode") ? 
		params["projCode"] : "EPSG:25830";
	
	TR3.LyrFeatFromOri = params.hasOwnProperty("LyrFeat") ? 
		params["LyrFeat"] : false;
		
	var zone = params.hasOwnProperty("zone") ? 
		params["zone"] : false;
	
	if(typeof(ori) != 'object'){

		ori = document.getElementById(ori);
		if(!ori){
			alert("invalid Origin");
		}
	}
	
	if(typeof(TR3.map) != 'object'){

		TR3.map = document.getElementById(TR3.map);
		if(!TR3.map){
			alert("invalid Destiny");
		}
	}
	
	var options = TR3.getOptions();
	var values = TR3.getValues();
	var zone = false;
	
	TR3.sprite = TR3.config.sprite || true;
	TR3.setMeshMap( ori, bbox, options, {magnification: values, lookAt: TR3.config.lookAt}, zone, TR3three );
	TR3.config.lookAt = false;
	TR3.setValuesSliderMagn( values );
	TR3.config.magni = 'auto';
	TR3.vGeom.measure=false;
	TR3.startAnimation();
	document.getElementById('metrics').checked = false;
	document.getElementById('exploreDiv').style.display = 'none';
	document.getElementById('personFlySliderDiv').style.display = 'none';
	
	return TR3.dfd_setMap.promise();
};

TR3.getOptions = function(){		
	var imgControlOpt, cursor3dOpt, anaglyphOpt, autoRotateOpt, wireframeMeshOpt;
	
	if(document.getElementById('imgOrbitalMoves').style.display == 'none'){
		imgControlOpt = false;
	}else{
		imgControlOpt = true;
	}
	
	if(document.getElementById('cursorCheck')){
		cursor3dOpt = document.getElementById('cursorCheck').checked;
	}else{
		cursor3dOpt = false;
	}

	if(document.getElementById('anaglyphCheck')){
		anaglyphOpt = document.getElementById('anaglyphCheck').checked;
	}else{
		anaglyphOpt = false;
	}
	
	if(document.getElementById('autoRotate')){
		autoRotateOpt = document.getElementById('autoRotate').checked;
	}else{
		autoRotateOpt = false;
	}
	if(TR3.config.rotate == 1){TR3.config.rotate = 0;autoRotateOpt = true;}//url start scn
	
	if(document.getElementById('malla')){
		wireframeMeshOpt = document.getElementById('malla').checked;
	}else{
		wireframeMeshOpt = false;
	}
	
	return {imgControl: imgControlOpt, cursor3d: cursor3dOpt, anaglyph: anaglyphOpt, autoRotate: autoRotateOpt, wireframeMesh: wireframeMeshOpt}
};

TR3.setOpts = function(change){
	
	var options= TR3.getOptions();
	if(change){
		if(change.imgControl != undefined){options.imgControl = change.imgControl;}
		if(change.cursor3d != undefined){options.cursor3d = change.cursor3d;}
		if(change.anaglyph != undefined){options.anaglyph = change.anaglyph;}
		if(change.autoRotate != undefined){options.autoRotate = change.autoRotate;}
		if(change.wireframeMesh != undefined){options.wireframeMesh = change.wireframeMesh;}
	}
	TR3.setOptions(options.imgControl, options.cursor3d, options.anaglyph, options.autoRotate, options.wireframeMesh);
};

TR3.setOptions = function(imgControlOpt, cursorOpt, anaglyphOpt, autoRotateOpt, wireframeMeshOpt){
	
	if( imgControlOpt == true ){
		document.getElementById('imgOrbitalMoves').style.display = 'inline';
	}else{
		document.getElementById('imgOrbitalMoves').style.display = 'none';
	}

	if( cursorOpt == true ){
		document.getElementById('cursorCheck').checked = true;
	}else{
		document.getElementById('cursorCheck').checked = false;
	}
		
	if( wireframeMeshOpt == true ){
		document.getElementById('malla').checked = true;
	}else{
		document.getElementById('malla').checked = false;
	}
	
	if( autoRotateOpt == true ){
		document.getElementById('autoRotate').checked = true;
	}else{
		document.getElementById('autoRotate').checked = false;
	}
		
	if( anaglyphOpt == true ){
		document.getElementById('anaglyphCheck').checked = true;
	}else{
		document.getElementById('anaglyphCheck').checked = false;
	}
	
	if(TR3.map){
		var infoGeo3d = document.getElementById('infoGeo3d');
		var cursorCheck_div = document.getElementById('cursorCheck_div')
		if( cursorOpt == true ){
			cursorCheck_div.style.display = 'block';
			infoGeo3d.style.display = 'block';
			TR3.map.style.cursor = "none";
			TR3.cursor.helper.visible = true;
		}else{
			cursorCheck_div.style.display = 'none';
			infoGeo3d.style.display = 'none';
			TR3.map.style.cursor = "auto";
			TR3.cursor.helper.visible = false;
			//TR3.cursor.helper.hideShadowBase();
		}
		
		if( wireframeMeshOpt == true ){
			TR3.mesh.material.wireframe = true;
		}else{
			TR3.mesh.material.wireframe = false;
		}
	
		if( autoRotateOpt == true ){
			TR3.controls.autoRotate = true;
		}else{
			TR3.controls.autoRotate = false;
		}
		
		if( anaglyphOpt == true ){
			var inter = TR3.getIntersect();
			if (inter.length > 0) {
				var cPos = TR3.camera.position;
				TR3.zeroParallax = cPos.distanceTo(inter[0].point);
			}
		}else{
		}
		//TR3.renderScene();//anaglyph
	}
	/*Anaglyph*/
	TR3.optionsSet = {imgControl: imgControlOpt, cursor3d: cursorOpt, anaglyph: anaglyphOpt, autoRotate: autoRotateOpt, wireframeMesh: wireframeMeshOpt};
	
};

TR3.setValues = function( magni ){
	
	var magnific = 'auto';
	if( typeof(Number(magni)) == 'number' &&  !isNaN(magni)){
		magnific = eval(magni);
	}
	
	TR3.config.magni = magnific;
	
	TR3.setValuesSliderMagn( magnific );
	
};

TR3.getValues = function(){
	
	return TR3.config.magni;
	
};

TR3.changeAnaglyphType = function(){
	
	TR3.anaglyphType = document.getElementById('anaglyph-type').value;
	TR3.anaglyphRenderer.updateAnaglyphType( TR3.scene, TR3.camera );

};

TR3.changeExportType = function(){
	var type = document.getElementById('exporter-type').value
	if(type != 'null')
		TR3.exportGLTF( type );

};

TR3.setValuesSliderMagn = function(magn){
	if(magn && magn>0 && magn<51){
		TR3.setMagniValues(magn);
	}else if(magn == "auto"){
		magn = TR3.setMagniValues();
	}else{magn = TR3.valuesSet.magnification}
	//var range = 2;
	//$('#magnificationSlider').slider("option", "max", parseInt(TR3.valuesSet.magnification*range));
	//$('#magnificationSlider').slider("option", "min", parseInt(TR3.valuesSet.magnification - TR3.valuesSet.magnification*(range-1)));
	$( '#magnificationSlider' ).slider( "value", magn );
	var tPixMesh = TR3.formatMeasure(TR3.tPixMesh);
	$( "#magnificationSliderValue" ).html( 'Exagerar <b>x' + magn + '</b> (malla: ' + tPixMesh[0] + ' ' + tPixMesh[1] + ')');
};

TR3.setValuesSliderHeight = function(hi){
	
	$('#heightSlider').slider( "value", hi );
	$('#heightSlider').slider( "option", "max", Math.round( (TR3.zMax - TR3.zMed)*TR3.valuesSet.magnification ) );
	$('#heightSlider').slider( "option", "min", Math.round( (TR3.zMin - TR3.zMed)*TR3.valuesSet.magnification ) );
	$( "#heightSliderValue" ).html( 'Altitud: ' + Math.round( (hi/TR3.valuesSet.magnification) + TR3.zMed ) + ' m' );
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
	var mobile=false;
	if (typeof window.orientation !== 'undefined') {
		mobile = true;
	}
	return mobile;
}

function isIE () {
  var myNav = navigator.userAgent.toLowerCase();
  return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : 100;
}

var Detector = {

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
/**
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

		_material.uniforms[ "mapLeft" ].value = _renderTargetL;
		_material.uniforms[ "mapRight" ].value = _renderTargetR;

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
			var ymax = _near * Math.tan( THREE.Math.degToRad( _fov * 0.5 ) );
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
TR3.getIntersect = function (event, objSlct) {
	var raycaster = TR3.getRayCaster(event);
	var objSlcted = objSlct || TR3.mesh;
	var intersects = false;
	if (objSlcted.name == 'mesh3d') {
		var intersectsTry = raycaster.intersectObject(objSlcted);
		if (intersectsTry.length > 0) { intersects = intersectsTry; }
	} else {
		for (var i = 0; i < objSlcted.length; i++) {
			var oSlcti = objSlcted[i];
			var oSlctiChild;
			if (oSlcti.scene) {
				oSlctiChild = oSlcti.scene;
			} else if (oSlcti.parent && oSlcti.parent.scene) {
				oSlctiChild = oSlcti.parent.scene;
			} else {
				oSlctiChild = oSlcti;
			}

			var intersectsTry = raycaster.intersectObject(oSlctiChild, true);
			var oriScale = oSlcti.scaleByCode;
			if (intersectsTry.length > 0 && typeof (oriScale) != "string") {
				intersects = oSlcti;
				TR3.intersectEvOver(intersects);

				if (oriScale.length < 4) { oriScale[3] = 'XYZ'; }
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
				}

				if (oSlcti.autoRotation == true) { oSlcti.autoRotation = 0.00000000001; }
				oSlcti.scaleByCode = oriScale.toString();
				i = objSlcted.length;

			} else if (intersectsTry.length < 1) {
				if (typeof (oriScale) == "string") {
					oriScale = oriScale.split(",");
					oSlcti.scaleByCode = oriScale;

					if (oriScale.length < 4) { oriScale[3] = 'XYZ'; }
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
					}

					if (oSlcti.autoRotation == 0.00000000001) { oSlcti.autoRotation = true; }
				}
			} else { intersects = oSlcti; }
		}
	}
	return intersects;
};

TR3.getRayCaster = function (event) {

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
	if (event && event.touches) {
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

	var raycaster = new THREE.Raycaster(cPos, vector.sub(cPos).normalize());
	//raycaster.firstHitOnly = true;

	return raycaster;
};

TR3.onIntersect = function (event) {

	if (TR3.optionsSet.cursor3d) {

		var intersects = TR3.getIntersect(event);
		//TR3.cursor.helper.hideShadowBase();
		// Toggle rotation bool for meshes that we clicked
		if (intersects.length > 0) {

			var interSct = intersects[0];
			var interSctPt = intersects[0].point;
			var face = interSct.face;
			var obj = interSct.object;
			var geom = TR3.mesh.geometry;
			var valZ = interSctPt.y;
			var valZ2 = false;
			var zTerr = TR3.cursor.setZterr;

			if (Number.isInteger(zTerr) && TR3.cursor.setkCde == 18) {
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

					geom.attributes.position.setZ(index, valZ);
					TR3.arrayZ[index] = valZ;
				}
				geom.attributes.position.needsUpdate = true;
				//<--Tool edit mesh
			} else if (Number.isInteger(zTerr) && TR3.cursor.setkCde == 16) {
				valZ = TR3.zM2T(zTerr, true);
				valZ2 = valZ;
				//TR3.cursor.helper.showShadowBase();
			}

			TR3.cursor.helper.position.set(interSctPt.x, valZ, interSctPt.z);
			TR3.redrawInfo(interSctPt.x, interSctPt.y, interSctPt.z, valZ2);

			TR3.vGeom.drawVector = TR3.cursor.helper.position; //draw
		}
	} else {
		var selectables = TR3.getSelectableObj();
		if (selectables.length > 0) {
			var intersects = TR3.getIntersect(event, selectables);
		}
	}
};

TR3.getSelectableObj = function () {

	var objts = TR3.vGeom.obj3d;
	var selectable = new Array();
	for (var i = 0; i < objts.length; i++) {
		if (objts[i].name == "codeMade" && objts[i].slctItem) { selectable.push(objts[i]); }
	}
	return selectable;
};

TR3.redrawInfo = function (X, Y, Z, Zcur) {

	var mapCoor = TR3.getCoordsByXYmod(X, Z);

	var Xmap = mapCoor[0];
	var Ymap = mapCoor[1];
	var Zmap = mapCoor[2];
	var zInc = 0;

	var tPixMesh = TR3.formatMeasure(TR3.tPixMesh);
	if (Zcur) {
		zInc = Zcur - Zmap;
	}

	TR3.XYZ2Clip = [Math.round(Xmap * 1000) / 1000, Math.round(Ymap * 1000) / 1000, Math.round(Zmap * 100) / 100];
	var info = '<b>Project: ' + proj4.Proj(TR3.srsImg).projName + ' - Datum:' + proj4.Proj(TR3.srsImg).title + '</b><br><b>X:</b> ' + TR3.XYZ2Clip[0] + '<br><b>Y:</b> ' + TR3.XYZ2Clip[1] + '<br><b>Z:</b> ' + TR3.XYZ2Clip[2] + '&nbsp;&nbsp;&nbsp;<b>±Zcur:</b> ' + Math.round(zInc * 100) / 100 + ' m' + '&nbsp;&nbsp;&nbsp;<b>Malla:</b> ' + tPixMesh[0] + ' ' + tPixMesh[1];
	document.getElementById('infoGeo3d').innerHTML = info;
};
//<--Cursor

//-->keys
TR3.keyDown = function (evt) {
	if (TR3.moving == true) { TR3.moveKey.is = true; }
	TR3.cursor.setkCde = evt.keyCode;
	var setZterr = eval(document.getElementById('setZ').value);
	if (Number.isInteger(setZterr) && evt.keyCode == 18) { TR3.cursor.setZterr = setZterr; } //Alt
	if (Number.isInteger(setZterr) && evt.keyCode == 16) { TR3.cursor.setZterr = setZterr; /*TR3.cursor.helper.showShadowBase();*/ } //Shift
	if (TR3.transformControls.enabled) {
		switch (evt.keyCode) {
			case 81: // Q
				TR3.transformControls.setSpace(TR3.transformControls.space === "local" ? "world" : "local");
				break;
			case 17: // Ctrl
				TR3.transformControls.setTranslationSnap(100);
				TR3.transformControls.setRotationSnap(THREE.Math.degToRad(15));
				break;
			case 87: // W
				TR3.transformControls.setMode("translate");
				break;
			case 69: // E
				TR3.transformControls.setMode("rotate");
				break;
			case 82: // R
				TR3.transformControls.setMode("scale");
				break;
			case 187:
			case 107: // +, =, num+
				TR3.transformControls.setSize(TR3.transformControls.size + 0.1);
				break;
			case 189:
			case 109: // -, _, num-
				TR3.transformControls.setSize(Math.max(transformControls.size - 0.1, 0.1));
				break;
			case 88: // X
				TR3.transformControls.showX = !TR3.transformControls.showX;
				break;
			case 89: // Y
				TR3.transformControls.showY = !TR3.transformControls.showY;
				break;
			case 90: // Z
				TR3.transformControls.showZ = !TR3.transformControls.showZ;
				break;
			case 32: // Spacebar
				TR3.transformControls.enabled = !TR3.transformControls.enabled;
				break;
			case 46: // Esc
				TR3.del3dObj();
				break;
		}
	} else {
		switch (evt.keyCode) {
			case 46: // Esc
				TR3.del3dObj();
				break;
		}

	}
};

TR3.keyUp = function (evt) {
	TR3.moveKey.is = false;
	if (evt.keyCode == 18) { TR3.cursor.setZterr = false; } //Alt
	if (evt.keyCode == 16) { TR3.cursor.setZterr = false; /*TR3.cursor.helper.hideShadowBase();*/ }
	if (TR3.transformControls.enabled) {
		switch (evt.keyCode) {
			case 17: // Ctrl
				TR3.transformControls.setTranslationSnap(null);
				TR3.transformControls.setRotationSnap(null);
				break;
		}
	}
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

	TR3.vGeom.drawVector = { x: helpPos.x, y: valZMod, z: helpPos.z }; //draw

	TR3.optionsSet.cursor3d = false;
	setTimeout(function () {
		TR3.optionsSet.cursor3d = true;
	}, 3000);

};

TR3.click_Obj3d = function (evt) {
	document.getElementById('autoRotate').checked = false;
	TR3.setOpts();

	var sel3dObj = TR3.getSelectableObj();
	if (sel3dObj.length > 0) {
		var intersect = TR3.getIntersect(evt, sel3dObj);
		if (intersect) {
			TR3.intersectEvClick(intersect);
			return true;
		}
		/*var thisLooking= intersect.looking;
		if( thisLooking && JSON.stringify(TR3.idLooking) != JSON.stringify(thisLooking) ){
			TR3.goScenes( intersect.looking );
			TR3.idLooking = thisLooking;
		}else if( intersect.slctItem ){
			window.open(
				intersect.slctItem,
				'_blank' // <- This is what makes it open in a new window.
			);
		}else if( intersect ){
			var TR3Obj = TR3.config;
			for(var k in TR3Obj){
				if(TR3Obj[k].URL && intersect.href.indexOf( TR3Obj[k].URL )>-1){
					TR3.goScenes( TR3Obj[k].loc );
				}
			}
			TR3.idLooking = false;
		}else{
			//console.log('nop');
		}*/
	}

	if (TR3.sourceFile && TR3.controls.active == true && TR3.transformControls.active == false) {
		TR3.loadFile({ slctItem: true, mouseEvt: evt });
	}

	if (TR3.transformControls.active == false) {
		TR3.transCtrlsEnabled(false);
	}
	TR3.transformControls.active = false;
};

TR3.setCoods2clip = function (evt) {
	evt.preventDefault();
	if (TR3.XYZ2Clip) {
		var setZ = document.getElementById('setZ');
		setZ.value = TR3.XYZ2Clip.toString();
		setZ.select();
		document.execCommand("copy");
	}
};
	'use strict';
	/*DRAW-->*/
	// update line
	TR3.updateVgeom = function() {
		var mouse = TR3.vGeom.drawVector;
		var thisLine = TR3.vGeom.item[TR3.vGeom.item.length-1];
		var nPoint = thisLine.nPoint;
		var positions = TR3.vGeom.positions;
		
		positions[nPoint * 3 - 3] = mouse.x;
		positions[nPoint * 3 - 2] = mouse.y;
		positions[nPoint * 3 - 1] = mouse.z;
		thisLine.geometry.attributes.position.needsUpdate = true;
		
		if(nPoint>1 && TR3.vGeom.measure){
			var txtMetric = TR3.getMetrics(thisLine);
			for(var i=0; i<txtMetric.length; i++){
				var posSprite = txtMetric[i][1] || mouse;
				var TXTpms = {	text: txtMetric[i][0], 
					//font: { fontFace: "Arial", fontSize: 29, backgroundColor: {r:200, g:250, b:200, a:0.8}, bold: false }, 
					position: posSprite, 
					//canvas: { text_Width:292, text_Height:146, scale:1000, borderColor: {r:100, g:200, b:100, a:1.0}, borderThickness: 1 },
					//center: true
					};
				var spritey = TR3.makeTextSprite( TXTpms );
				TR3.scene.add( spritey );
			}
			TR3.MeasureEvEnd(txtMetric,spritey);
		}
		
	}
	
	// mouse down handler
	TR3.addPoint = function() {
		if ( TR3.cursor.helper.visible && TR3.vGeom.positions && TR3.newDraw!=-1 ) {
			var mouse = TR3.vGeom.drawVector;
			var thisLine = TR3.vGeom.item[TR3.vGeom.item.length-1];
			var nPoint = thisLine.nPoint;
			var positions = TR3.vGeom.positions;
		
			positions[nPoint * 3 + 0] = mouse.x;
			positions[nPoint * 3 + 1] = mouse.y;
			positions[nPoint * 3 + 2] = mouse.z;
			thisLine.nPoint++;
			thisLine.geometry.setDrawRange(0, thisLine.nPoint);
			TR3.updateVgeom();
		}
	}
	
	// mouse down handler
	TR3.newVgeom = function(evt) {
		TR3.newDraw++;
		// geometry
		var geometry = new THREE.BufferGeometry();
		var MAX_POINTS = 150;
		var positions = new Float32Array(MAX_POINTS * 3);
		geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
		TR3.vGeom.positions = positions;
		
		// material
		var material = new THREE.LineBasicMaterial({
			color: new THREE.Color($( "#PickDrawStereo" ).val())
			//https://stackoverflow.com/questions/11638883/thickness-of-lines-using-three-linebasicmaterial
		});
		
		// line
		var line;
		if(TR3.vGeom.polig == true){
			line = new THREE.LineLoop(geometry, material); //LineLoop Surface!!!
		}else{
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
		
		if(TR3.vGeom.sprites && TR3.vGeom.sprites.length){
			for(var i=0; i<TR3.vGeom.sprites.length; i++){
				if(TR3.vGeom.sprites[i].reload == true){
					TR3.vGeom.sprites[i].reload = false;
				}
			}
		}
		
		if(TR3.vGeom.item && TR3.vGeom.item.length){
			for(var i=0; i<TR3.vGeom.item.length; i++){
				if(TR3.vGeom.item[i].reload == true){
					TR3.vGeom.item[i].reload = false;
				}
			}
		}

		if(!TR3.vGeom.item){
			TR3.vGeom.item = new Array(0);
		}
		TR3.vGeom.item.push( line );
		TR3.vGeom.item[0].reload = false;

	}
	
	TR3.endDraw = function(evt) {
		TR3.newDraw = -1;
	}
	
	TR3.getMetrics = function(thisLine) {
		var pos;
		var metric = new Array();
		metric.length = 0;
		
		if(TR3.vGeom.sprites && TR3.vGeom.sprites.length){
			for(var i=0; i<TR3.vGeom.sprites.length; i++){
				if(TR3.vGeom.sprites[i].reload == true){
					TR3.scene.remove( TR3.vGeom.sprites[i] );
					TR3.vGeom.sprites.splice(i, 1);
					i--;
				}
			}
		}
		
		if(TR3.vGeom.item && TR3.vGeom.item.length){
			for(var i=0; i<TR3.vGeom.item.length; i++){
				if(TR3.vGeom.item[i].reload == true){
					TR3.scene.remove( TR3.vGeom.item[i] );
					TR3.vGeom.item.splice(i, 1);
					i--;
				}
			}
		}
		
		
		if(TR3.vGeom.polig == true && thisLine.nPoint > 2){
			pos = thisLine.geometry.getAttribute("position");
			var coords = new Array();
			for(var i=thisLine.nPoint-1; i>-1; i--){
				var coorPos = TR3.getCoordsByXYmod( pos.getX( i ), pos.getZ( i ) );
				coords.unshift(coorPos);
			}
			
			var getSurf = TR3.getSurf( coords, thisLine );
			metric.push( [TR3.txtMetric( [getSurf[0], getSurf[1], getSurf[2]] ), new THREE.Vector3( pos.getX( 0 ), pos.getY(0), pos.getZ( 0 ) )] );
			metric.push( [TR3.txtMetric( [getSurf[6]] ), new THREE.Vector3( pos.getX( 1 ), pos.getY(1), pos.getZ( 1 ) )] );
			metric.push( [TR3.txtMetric( [getSurf[3], getSurf[4], getSurf[5]] ),] );
		}
		if(!TR3.vGeom.polig || TR3.vGeom.polig == false){
			pos = thisLine.geometry.getAttribute("position");
			var last = TR3.getCoordsByXYmod( pos.getX( thisLine.nPoint-1 ), pos.getZ( thisLine.nPoint-1 ) );
			var first = TR3.getCoordsByXYmod( pos.getX( thisLine.nPoint-2 ), pos.getZ( thisLine.nPoint-2 ) );
			
			var getDist = TR3.getDist(first[0] ,first[1] ,first[2] ,last[0] , last[1] , last[2] )
			metric.push( [TR3.txtMetric( getDist ),] );
		}
		
		return metric;
	}
	
	TR3.txtMetric = function( metric ){
		var txtMetric = '';
		for(var i=0;i<metric.length;i++){
			if(metric[i]){
				txtMetric += ' '+metric[i].name+': '+metric[i].val+' '+metric[i].unit+'\n';
			}else{metric.splice(i, 1);i--;}
		}
		if(txtMetric && txtMetric.length>2)
			txtMetric = txtMetric.slice(0, -2)
		return txtMetric;
	}
	/*<--DRAW*/
	
	TR3.assignZgeometries = function(){

		for(var i=0;i<TR3.vGeom.item.length;i++){
			var item = TR3.vGeom.item[ i ];
			if(item.geometry.vertices){
				var vert = item.geometry.vertices
				for(var j=0 ; j<vert.length ; j++){
					vert[j].y=vert[j].y/TR3.vGeom.item[ i ].magni*TR3.valuesSet.magnification;
				}
				item.geometry.verticesNeedUpdate = true;
			}else{
				var pos = item.geometry.getAttribute("position");
				for(var j=0 ; j<=TR3.vGeom.item[ i ].nPoint ; j++){
					pos.setY( j, pos.getY( j )/TR3.vGeom.item[ i ].magni*TR3.valuesSet.magnification );
				}
				pos.needsUpdate = true;
			}
			item.magni = TR3.valuesSet.magnification;
			item.geometry.computeVertexNormals();
		}
	};

	/*TEXT Marker-->*/
	TR3.makeTextSprite = function( params ){
		
		if ( params === undefined ) params = {};
		
		var center = params.hasOwnProperty("center") ? 
			params["center"] : false;
			
		var posSprite = params.hasOwnProperty("position") ? 
			params["position"] : {x: 440000, y:4440000, z:900, inv:true};
			
		var message = params.hasOwnProperty("text") ? 
			params["text"] : "";
		
		var isPixSize = params.hasOwnProperty("isPixSize") ?
			params["isPixSize"] : false;
		
		if ( params.font === undefined ) params.font = {};

		var fontface = params.font.hasOwnProperty("fontFace") ? 
			params.font["fontFace"] : "Arial";
		
		var fontsize = params.font.hasOwnProperty("fontSize") ? 
			params.font["fontSize"] : 24;
		
		var bold = params.font.hasOwnProperty("bold") ? 
			params.font["bold"] : true;
			
		if ( params.canvas === undefined ) params.canvas = {};
			
		var textColor = params.canvas.hasOwnProperty("textColor") ?
			params.canvas["textColor"] : { r:0, g:0, b:0, a:1.0 };
		
		var backgroundColor = params.font.hasOwnProperty("backgroundColor") ?
			params.font["backgroundColor"] : { r:255, g:100, b:100, a:0.8 };
		
		var borderThickness = params.canvas.hasOwnProperty("borderThickness") ? 
			params.canvas["borderThickness"] : 4;
		
		var rounded = params.canvas.hasOwnProperty("rounded") ? 
			params.canvas["rounded"] : 6;
		
		var borderColor = params.canvas.hasOwnProperty("borderColor") ?
			params.canvas["borderColor"] : { r:255, g:0, b:0, a:1.0 };
			
		var text_Height = params.canvas.hasOwnProperty("text_Height") ?
			params.canvas["text_Height"] : false;
		
		var text_Width = params.canvas.hasOwnProperty("text_Width") ?
			params.canvas["text_Width"] : false;
		
		var scale = params.canvas.hasOwnProperty("scale") ?
			params.canvas["scale"] : false;
			
		var canvas = document.createElement('canvas');
		var context = canvas.getContext('2d');
		var txtBold = '';
		if(bold){txtBold = "Bold "}
		context.font = txtBold + fontsize + "px " + fontface;
		
		// background color
		context.fillStyle   = "rgba(" + backgroundColor.r + "," + backgroundColor.g + ","
									+ backgroundColor.b + "," + backgroundColor.a + ")";
		// border color
		context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + ","
									+ borderColor.b + "," + borderColor.a + ")";
		if(message == null){message=''};
		message = message.replace(new RegExp('---', 'g'), ' ');
		var lines = message.split("\n");
		if(lines.length<=1){lines = message.split("+++");}
		var lineLength = lines.length;
		var heightTxt = fontsize + borderThickness;
		var heightTxt2 = text_Height || (fontsize * 1.2 + borderThickness)*lineLength;
		
		// get size data (height depends only on font size)
		var metrics = context.measureText( message );
		var textWidth = text_Width || metrics.width/lineLength*1.2;
		
		if(heightTxt2>146){heightTxt2=146;}
		if(textWidth>292){textWidth=292;}
		
		context.lineWidth = borderThickness;
		TR3.roundRect(context, borderThickness/2, borderThickness/2, textWidth + borderThickness, heightTxt2, rounded);
		// 1.2 is extra height factor for text below baseline: g,j,p,q.
		
		// text color
		context.fillStyle = "rgba(" + textColor.r + "," + textColor.g + ","
									+ textColor.b + "," + textColor.a + ")";
		
		for (var i = 0; i < lineLength; ++i) {
			//context.fillText(lines[i], x, y);
			context.fillText( lines[i], borderThickness, heightTxt*(i+1));
		}
		
		// canvas contents will be used for a texture
		var texture = new THREE.Texture(canvas) 
		texture.needsUpdate = true;
	
		var spriteMaterial = new THREE.SpriteMaterial( 
			{ map: texture/*, depthTest: false*/ } );
		
		var sprite = new THREE.Sprite( spriteMaterial );
		sprite.reload = true;
		
		var coord = new THREE.Vector3();
		if(posSprite.inv){
			var coordM = TR3.coordM2T(posSprite.x,posSprite.y,posSprite.z,posSprite.inv);
			coord.x = coordM[0];
			coord.y = coordM[1];
			coord.z = coordM[2];
		}else{
			coord.x = posSprite.x;
			coord.y = posSprite.y;
			coord.z = posSprite.z;
		}
		
		if( isPixSize ){
			coord.y = TR3.zM2T(TR3.pix2geo(posSprite.z),true) - TR3.zM2T(0,true) + 4;
		}
		
		sprite.position.set( coord.x, coord.y, coord.z );
		var sDskMvl = TR3.config.spritesDskMvl;
		
		if(scale){
			if( isPixSize ){
				sprite.scale.set(scale*TR3.getSizePix()*sDskMvl,scale/2*TR3.getSizePix()*sDskMvl,1);
			}else{
				sprite.scale.set(scale,scale/2,1);}
		}else{
			sprite.scale.set(100*TR3.getSizePix()*sDskMvl,100/2*TR3.getSizePix()*sDskMvl,1);}
				
		var val = TR3.rectaValue(1,0.7,4,0.05,lineLength);
		if(!center){sprite.center.set(0,val);}else{sprite.center.set(0.9-val,0.5);}
		
		
		/*if(!TR3.vGeom.sprites){
			TR3.vGeom.sprites = new THREE.Group();
		}
		TR3.vGeom.sprites.add( sprite );*/
		if(!TR3.vGeom.sprites){
			TR3.vGeom.sprites = new Array(0);
		}
		TR3.vGeom.sprites.push( sprite );
		
		return sprite;	
	};
	
	TR3.del_vGeom = function() {
		
		if(TR3.vGeom.sprites && TR3.vGeom.sprites.length)
			for(var i=0; i<TR3.vGeom.sprites.length; i++){
				TR3.scene.remove( TR3.vGeom.sprites[i] );
			}
		if(TR3.vGeom.item && TR3.vGeom.item.length)
			for(var i=0; i<TR3.vGeom.item.length; i++){
				TR3.scene.remove( TR3.vGeom.item[i] );
			}
		if(TR3.vGeom.obj3d && TR3.vGeom.obj3d.length)
			for(var i=0; i<TR3.vGeom.obj3d.length; i++){
				if( TR3.vGeom.obj3d[i].persist2Scene != true ){
					var thisObj = TR3.vGeom.obj3d[i];
					var obj
					if (thisObj.scene) {
						obj = thisObj.scene;
					} else if (thisObj.parent && thisObj.parent.scene) {
						obj = thisObj.parent.scene;
					} else {
						obj = thisObj;
					}
					TR3.scene.remove( obj );
					TR3.vGeom.obj3d.splice(i, 1);
					i--;
				}
			}
		
		TR3.newDraw = -1;
		TR3.vGeom.item = [];
		TR3.vGeom.sprites = false;
		TR3.vGeom.item.magni;
		TR3.vGeom.item.nPoint = 0;
	}
	
	// function for drawing rounded rectangles
	TR3.roundRect = function(ctx, x, y, w, h, r) {
		ctx.beginPath();
		ctx.moveTo(x+r, y);
		ctx.lineTo(x+w-r, y);
		ctx.quadraticCurveTo(x+w, y, x+w, y+r);
		ctx.lineTo(x+w, y+h-r);
		ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
		ctx.lineTo(x+r, y+h);
		ctx.quadraticCurveTo(x, y+h, x, y+h-r);
		ctx.lineTo(x, y+r);
		ctx.quadraticCurveTo(x, y, x+r, y);
		ctx.closePath();
		ctx.fill();
		ctx.stroke();   
	};
	/*<--TEXT Marker*/
	
	TR3.txtObject = function(txt, color, size, pos, rot) {
		
		TR3.loaderFONT.load( TR3.config.src+'helvetiker_regular.typeface.json', function ( font ) {
		
			var textGeo = new THREE.TextGeometry( txt, {
		
				font: font,
		
				size: size,
				/*height: 50,
				curveSegments: 12,
		
				bevelThickness: 2,
				bevelSize: 5,
				bevelEnabled: true*/
		
			} );
		
			var textMaterial = new THREE.MeshPhongMaterial( { color: color } );
		
			var mesh = new THREE.Mesh( textGeo, textMaterial );
			mesh.position.set( pos[0], pos[1], pos[2] );
			mesh.rotation.y = rot;
			TR3.scene.add( mesh );
		
		} );
	}
	
	TR3.getFeatFromOL = function(feat){
		//var feat = TR3.LyrFeatFromOri.getSource().getFeatures();
		TR3.loadingDiv.style.display = 'block';
		/*TR3.prog.countFull = feat.length;
		TR3.progress();*/
		for(var i=0 ; i<feat.length; i++){
			
			//TR3.prog.index = i;
			var geometry = feat[i].getGeometry();//getSimplifyGeometry(0)
			var nAxis = geometry.layout;
			
			var typeGeom = geometry.getType();
			var typeSoport = ['Point','Line','LineString','Polygon','Circle'];
			var type;
			for(var m=0 ; m<typeSoport.length ; m++){
				if(typeGeom.indexOf(typeSoport[m])!=-1){
					type = typeSoport[m];
				}
			}
			
			if(nAxis && type){
				var nAxisL = nAxis.length;
				var coord = new Array();
				var coord3d = new Array();
				
				if(type == "Circle"){//nAxisL?
					var coordOri = geometry.getCenter();
					var radOri = geometry.getRadius();
					
					coord3d = TR3.getCoordsByXYmod( coordOri[0],  -coordOri[1] );
					if(coord3d)
						coord = new THREE.Vector4( coord3d[3], coord3d[4], coord3d[5], radOri );
					else
						coord = new THREE.Vector4( coordOri[0], TR3.zMed, -coordOri[1], radOri );
				}else if(type == "Point"){//nAxisL?
					var coordOri = geometry.getCoordinates();
					
					coord3d = TR3.getCoordsByXYmod( coordOri[0],  -coordOri[1] );
					if(coord3d)
						coord = new THREE.Vector3( coord3d[3], coord3d[4], coord3d[5] );
					else
						coord = new THREE.Vector3( coordOri[0], TR3.zMed, -coordOri[1] );
				}else{
					if(geometry.layout){
						var coordOri = geometry.getCoordinates().toString().split(','); //cubes.forEach https://stackoverflow.com/questions/10021847/for-loop-in-multidimensional-javascript-array

						for( var j=0 ; j<coordOri.length; j+=nAxisL){
							
							if( nAxisL==2 ){
								var coord3d6 = TR3.getCoordsByXYmod(coordOri[j], -coordOri[j+1]);
								if(coord3d6){
									coord3d = [coord3d6[3], coord3d6[4], coord3d6[5]];
								}else{
								coord3d = [coordOri[j], TR3.zMed, -coordOri[j+1]];}
							}else{
								if(coordOri[j+2] == 0){
									var coord3d6 = TR3.getCoordsByXYmod(coordOri[j], -coordOri[j+1]);
									if(coord3d6){
										coord3d = [coord3d6[3], coord3d6[4], coord3d6[5]];
									}else{
										coord3d = [coordOri[j], TR3.zMed, -coordOri[j+1]];}
								}else{
									var zM = TR3.zM2T(coordOri[j+2],true);
									coord3d = [coordOri[j], zM, -coordOri[j+1]];
								}
							}
							
							coord.push(new THREE.Vector3( coord3d[0], coord3d[1], coord3d[2] ));
						}
						
					}
				}
				
				var styleFeat = feat[i].getStyle();//https://stackoverflow.com/questions/42376516/is-it-possible-to-extract-style-information-from-geojson-for-an-openlayers-javas
				var sColor = null;
				if(styleFeat && styleFeat.stroke_){//color de la capa
					var color = styleFeat.getStroke().getColor();
					sColor = new THREE.Color( color[0]/255, color[1]/255, color[2]/255 );
				}
				var style = { color: sColor };
				var vItem = { reload: false };
				var feat3d = TR3.makeVectFeat(coord, type, style, vItem);
				TR3.scene.add( feat3d );
			}
		}
		TR3.loadingDiv.style.display = 'none';
		TR3.VectorEvEnd();
		//loadingTerrain.innerHTML  = 'Creating 3D maps, please wait...';
	};
	
	TR3.setFeatToOL = function(){
		//printFeature('Polygon',poligonCoords);
		var LyrFeatsOri = TR3.LyrFeatFromOri;
		var features = new Array();
		
		if(TR3.scene){
			for(var i=0; i<TR3.vGeom.item.length; i++){
				
				var object = TR3.vGeom.item[i];
				if (object.name == "handMade"){
					var feat;
					var coordinates = new Array();
					var pos = object.geometry.getAttribute("position");
					var featLength = object.nPoint || pos.version
					for(var j=0; j<featLength; j++){
						coordinates.push([pos.getX( j ), -pos.getZ( j ), TR3.zM2T(pos.getY( j ))]);
					}
					
					if(object.type == 'LineLoop'){	feat = 'Polygon';
													coordinates.push([pos.getX( 0 ), -pos.getZ( 0 ), TR3.zM2T(pos.getY( 0 ))]);
													coordinates = [coordinates]}
					else if(object.type == 'Point'){feat = 'Point';}
					else{feat = 'LineString';}
					
					var TR3Color = object.material.color;
					var TR3Style = new ol.style.Style({
						fill: new ol.style.Fill({
							color: 'rgba(100, 100, 100, 0.2)'
						}),
						stroke: new ol.style.Stroke({
							color: [TR3Color.r*255, TR3Color.g*255, TR3Color.b*255, 1],
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
	
	TR3.extrude2Dfeature = function ( vertex, height, center  ) {
		
		var floor = TR3.getCoordsByXYmod( center[0], center[1], false , true ) || TR3.zM2T(TR3.zMed,true);
		
		var build = new THREE.Group();
		
		var geometryWall = new THREE.PlaneBufferGeometry( 1, 1, vertex.length-1, 1 )
		var pointPosWall = geometryWall.getAttribute("position");
		
		var geometryRoof = [];
		
        for (var i = 0; i < vertex.length; i++) {
			vertex[i][0] = vertex[i][0] - center[0];//vectores pequeños mejor estabilidad
			vertex[i][1] = vertex[i][1] - center[1];
			
			pointPosWall.setXYZ( i, vertex[i][0], floor[4], -vertex[i][1] );
			//pos.setZ( i+1, (arrayZ[i] - TR3.zMed)*TR3.valuesSet.magnification )
        }
		
		for (var i = 0; i < vertex.length; i++) {

			pointPosWall.setXYZ( i+vertex.length, vertex[i][0], floor[4]+3*height, -vertex[i][1] );
			
			var pointUp = new THREE.Vector2(
                vertex[i][0],
               -vertex[i][1]
            );
			geometryRoof.push(pointUp);
        }
		
		pointPosWall.needsUpdate = true;
		
		var color = Math.round(0xffffff * Math.random());
		var materialWall = new THREE.MeshBasicMaterial({color: color});
		var materialRoof = new THREE.MeshBasicMaterial({color: color, side: THREE.BackSide, transparent: true, opacity: 0.5/*, depthWrite: false, depthTest: false*/});
		
		var meshWall = new THREE.Mesh( geometryWall, materialWall );
		
		// wireframe
		var geoLine = new THREE.EdgesGeometry( meshWall.geometry ); // or WireframeGeometry
		var matLine = new THREE.LineBasicMaterial( { color: 0xCCCCCC } );
		var wireframeLine = new THREE.LineSegments( geoLine, matLine );
		
		var geomRoof = new THREE.ShapeBufferGeometry(new THREE.Shape(geometryRoof));
		var meshRoof = new THREE.Mesh(geomRoof, materialRoof);	
		//meshRoof.rotation.x = Math.PI;
		var geomRoofPos = geomRoof.getAttribute("position");
		for (var i = 0; i < geomRoofPos.count; i++) {
			geomRoofPos.setXYZ( i, geomRoofPos.getX(i), floor[4]+3*height, geomRoofPos.getY(i) );
        }
		geomRoofPos.needsUpdate = true;
		
		build.add(wireframeLine);
		build.add(meshRoof);
		build.add(meshWall);
		
		build.position.set( center[0], 0, -center[1] );
		
		TR3.scene.add(build);
	};	'use strict';
	TR3.personViewFn = function(height){
		
		var heightVal = height || TR3.moveKey.size;
		
		TR3.controls.enableDamping = false;
		
		TR3.controls.maxPolarAngle = Infinity;
		
		TR3.controls.enableKeys = false;

		var coordCenterCamera =	TR3.getOptModCoordCam();//TR3.getCoordsByXYmod(intersects[0].point.x,intersects[0].point.z,true)
		if (coordCenterCamera && coordCenterCamera[1] != -10000000 ) {
			
			//TR3.setMarker(coordCenterCamera);
			
			TR3.changeHeight(coordCenterCamera[1] + heightVal, true, true);

			TR3.cursor.helper.scale.set(0.05,0.05,0.05);
		}else{
			TR3.initPosCamera(true);
			setTimeout(function(){ TR3.personViewFn(heightVal); }, 1500);
		}
		
	};
	
	TR3.orbitalViewFn = function(){
		
		TR3.moveKey.walk = false;
		TR3.controls.enableKeys = false;
		TR3.controls.maxPolarAngle = Math.PI/2;
		
		var intersects = TR3.getIntersect();

		if (intersects[0]) {
			var coordInter = TR3.getCoordsByXYmod(intersects[0].point.x,intersects[0].point.z);//TR3.getCoordsByXYmod(intersects[0].point.x,intersects[0].point.z,true)
			if(coordInter && coordInter[2]){
				/*cPos.x = intersects[0].point.x;
				cPos.z = intersects[0].point.z;*/
				TR3.controls.target.set( coordInter[3], coordInter[4], coordInter[5] );
				
				//TR3.setMarker( [coordInter[3], coordInter[4], coordInter[5]] );
				
			}
			TR3.cursor.helper.scale.set(0.5,0.5,0.5);
		}else{
			TR3.initPosCamera(true);
			setTimeout(function(){ TR3.orbitalViewFn(); }, 1500);
		}
		
	};
	
	TR3.initPosCamera = function( tween ){
		TR3.moveKey.walk = false;
		
		if(tween==true){
			new TWEEN.Tween( TR3.camera.position ) //https://github.com/tweenjs/es6-tween
					.to( TR3.startPos , 1000 )
					.easing( TWEEN.Easing.Linear )
					.on('update', function( coords ){
						TR3.mesh.rotation.z += 0.007;
					})
					.on('complete', function( coords ){
						TR3.mesh.rotation.z = 0;
						TR3.controls.target.set(coords.x, 0, coords.z);
						TR3.controls.update();
						TR3.CameraMoveEvEnd();
					})
					.start();
		}else{
			TR3.camera.position.copy(TR3.camera.position.initPos);
			TR3.controls.update();
		}
		
	};
	
	TR3.changeHeight = function(height,controls,tween){	
		
		TR3.zeroParallax = height;
		TR3.moveKey.azOriAng = TR3.controls.getAzimuthalAngle();
		
		if(tween==true){
			new TWEEN.Tween( TR3.camera.position ) //https://github.com/tweenjs/es6-tween
					.to({y : height}, 1000)
					.easing( TWEEN.Easing.Linear )
					.on('complete', function( coords ){
						TR3.controls.target.set(coords.x+1, coords.y, coords.z+1);
						TR3.controls.update();
						TR3.setAzAngle(TR3.moveKey.azOriAng);
						TR3.controls.enableKeys = true;
						TR3.controls.enableDamping = true;
						TR3.CameraMoveEvEnd();
					})
					.start();
		}else{
			TR3.camera.position.y = height;
		}

		if(controls == true){
			TR3.controls.target.y = height;
			TR3.controls.update();
		}
		//TR3.camera.position.distanceTo(TR3.mesh.position);
	};
	
	TR3.moveKeyFn = function(height){
		if( TR3.moveKey.walk == true ){
		
			var heightVal = height || TR3.moveKey.size;
		
			var heigtH = TR3.getOptModCoordCam();
				
			TR3.changeHeight(heigtH[1] + heightVal, true, false);
		}

	};	'use strict';
	TR3.getDist = function( x1, y1, z1, x2, y2, z2 ) {
		
		var dist3D, distTerr, distAlt, dist2D;

		var dAlt = z2-z1;
		TR3.distAlt += dAlt;
		distAlt = TR3.formatMeasure( TR3.distAlt );
		
		var d2D = TR3.getCoordsDistance([x1,y1],[x2,y2]);//Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2)+Math.pow(0-0,2))
		TR3.dist2D += d2D
		dist2D = TR3.formatMeasure( TR3.dist2D );
		
		TR3.dist3D += Math.sqrt(Math.pow(d2D,2)+Math.pow(dAlt,2));//TR3.getCoordsDistance3D
		dist3D = TR3.formatMeasure( TR3.dist3D );
		
		var segments = TR3.setSegmentsByTerr(x1,y1,z1,x2,y2,z2,3);
		var segMod = segments[1];
		
		var segGeom = new Array();
		for(var i=0; i<segMod.length; i++){
			segGeom.push(new THREE.Vector3( segMod[i][0],segMod[i][1],segMod[i][2] ));
		}
		
		var material = {color: 0x00ff00};
		var vItem = { reload: false };
		var Line = TR3.makeVectFeat(segGeom, 'Line', material, vItem);
		TR3.scene.add( Line );
		
		TR3.distTerr += segments[0];
		distTerr = TR3.formatMeasure( TR3.distTerr );
		
		dist3D = {name:'Dist.3D', val:dist3D[0], unit: dist3D[1]};
		distTerr = {name:'Dist.terr', val:distTerr[0], unit: distTerr[1]};
		dist2D = {name:'Dist.2D', val:dist2D[0], unit: dist2D[1]};
		distAlt = {name:'Dif.alt', val:distAlt[0], unit: distAlt[1]};
		
		return [dist2D, dist3D, distTerr, distAlt];
	};
	
	TR3.getSurf = function( coords, thisLine ) {
		coords.push(coords[0]);
		var perim3D = 0;
		var perim2D = 0;
		var perimTerr = 0;
		var segGeomPeriTerr3d = [];
		var segGeomPeriTerr2d = [];
		
		var coordOriMod = [coords[0][3],coords[0][4],coords[0][5]];

		for(var i=0;i<coords.length-1;i++){
			var x1=coords[i][0];
			var y1=coords[i][1];
			var z1=coords[i][2];
			var x2=coords[i+1][0];
			var y2=coords[i+1][1];
			var z2=coords[i+1][2];
			
			var segmentsPeri = TR3.setSegmentsByTerr( x1, y1, z1, x2, y2, z2, 3 );
			for(var j=0; j<segmentsPeri[1].length-1; j++){
				segGeomPeriTerr3d.push(new THREE.Vector3( segmentsPeri[1][j][0], segmentsPeri[1][j][1], segmentsPeri[1][j][2] ));
				segGeomPeriTerr2d.push(new THREE.Vector2( segmentsPeri[1][j][0], segmentsPeri[1][j][2] ));
			}
			
			perimTerr += segmentsPeri[0];
			
			var dAlt = z2-z1;
			var d2D = TR3.getCoordsDistance([x1,y1],[x2,y2]);
			perim2D += d2D;
			perim3D += Math.sqrt(Math.pow(d2D,2)+Math.pow(dAlt,2));

		}
		
		var triangles = THREE.ShapeUtils.triangulateShape( segGeomPeriTerr2d, [] );
		var geometry3d = new THREE.BufferGeometry().setFromPoints( segGeomPeriTerr3d );
		var indices = [];
		for( var i = 0; i < triangles.length; i++ ){
			indices.push( triangles[i][0], triangles[i][1], triangles[i][2] );
		}
		geometry3d.setIndex( indices );

		var style = { color: "#ffffff", side: THREE.DoubleSide, transparent: true, opacity: 0.75 };
		var vItem = { reload: true };
		var fillMesh = TR3.makeMeshFeat( geometry3d, "Basic",  style, vItem );
		TR3.scene.add( fillMesh );
	
		var pos = thisLine.geometry.getAttribute("position");
		var vLine2d = [];
		var vLine2dTR = [];
		var vLine3dTR = [];
		for(var i=0 ; i<thisLine.nPoint; i++){
			var vTerr =	TR3.coordM2T( pos.getX( i ), pos.getY( i ), pos.getZ( i ) );
			vLine2d.push( new THREE.Vector2( vTerr[0], vTerr[1] ) );
			vLine2dTR.push( new THREE.Vector2( pos.getX( i ), pos.getZ( i ) ) );
			vLine3dTR.push( new THREE.Vector3( pos.getX( i ), pos.getY( i ), pos.getZ( i ) ) );
		}
		var areaSurf2d = TR3.formatMeasure(Math.abs(THREE.ShapeUtils.area( vLine2d )), "surf");

		var triangles = THREE.ShapeUtils.triangulateShape( vLine2dTR, [] );
		var geometry3d = new THREE.BufferGeometry().setFromPoints( vLine3dTR );
		var indices = [];
		var area3d = 0;
		var areaTer = 0;
		var volTer = 0;
		for( var i = 0; i < triangles.length; i++ ){
			geometry3d.setIndex( indices.push( triangles[i][0], triangles[i][1], triangles[i][2] ) );
			var pos = geometry3d.getAttribute("position");
			var va = new THREE.Vector3(pos.getX(0),pos.getY(0),pos.getZ(0));
			var vb = new THREE.Vector3(pos.getX(1),pos.getY(1),pos.getZ(1));
			var vc = new THREE.Vector3(pos.getX(2),pos.getY(2),pos.getZ(2));
			var t = new THREE.Triangle(va, vb, vc);
			
			area3d += Math.abs( t.getArea() );
			var geomTriangles = TR3.makeSubTriangles( [t], 3 );
			var metrics3d = TR3.get3dMetrics( geomTriangles, fillMesh.id );
			areaTer += metrics3d[0];
			volTer += metrics3d[1];
		}

		var areaSurf3d = TR3.formatMeasure( area3d, "surf" );
		var areaSurfTer = TR3.formatMeasure( areaTer, "surf" );
		var volSurfTer = TR3.formatMeasure( volTer, "vol" );
		
		perim2D = TR3.formatMeasure(perim2D);
		perim3D = TR3.formatMeasure(perim3D);
		perimTerr = TR3.formatMeasure(perimTerr);
		
		var per2D, per3D, perTer, surf2D, surf3D, surfTer, volTer;
		per2D = {name:'Per.2D', val:perim2D[0], unit: perim2D[1]};
		per3D = {name:'Per.3D', val:perim3D[0], unit: perim3D[1]};
		perTer = {name:'Per.terr', val:perimTerr[0], unit: perimTerr[1]};
		
		surf2D = {name:'Surf.2D', val:areaSurf2d[0], unit: areaSurf2d[1]};
		surf3D = {name:'Surf.3D', val:areaSurf3d[0], unit: areaSurf3d[1]};
		surfTer = {name:'Surf.terr', val:areaSurfTer[0], unit: areaSurfTer[1]};
		
		volTer = {name:'Vol.terr', val:volSurfTer[0], unit: volSurfTer[1]};
		
		return [per2D, per3D, perTer, surf2D, surf3D, surfTer, volTer];
	};
	
	TR3.makeSubTriangles = function( triangles, multi ){
		var multip = multi || 1;
		var areaTarget = (TR3.tPixMesh*TR3.tPixMesh/2)/multip;
		var i = 0;
		var trianglesArr = new Array();
					
		for(var i=0; i<triangles.length; i++){
			var Tarr = triangles[i];
			var centroid = new THREE.Vector3( (Tarr.a.x+Tarr.b.x+Tarr.c.x)/3, (Tarr.a.y+Tarr.b.y+Tarr.c.y)/3, (Tarr.a.z+Tarr.b.z+Tarr.c.z)/3 );
			var vertices = new Array();
			vertices.push(Tarr.a,Tarr.b,Tarr.c,Tarr.a);
			
			for(var j=0;j<vertices.length-1;j++){
				var vCent = centroid;
				var va = vertices[j];
				var vb = vertices[j+1];
				var vAB = new THREE.Vector3( (va.x+vb.x)/2, (va.y+vb.y)/2, (va.z+vb.z)/2 );

				var t1 = new THREE.Triangle(vCent,vAB,va);
				trianglesArr.push(t1);
				
				var t2 = new THREE.Triangle(vCent,vAB,vb);
				trianglesArr.push(t2);
			}
			
		}
		
		if( Math.abs(trianglesArr[0].getArea()) > areaTarget ){
			return TR3.makeSubTriangles( trianglesArr, multip );
		}else{
			return trianglesArr;
		}
	};
	
	TR3.get3dMetrics = function( triangles, baseMesh ){

		var areaTer = 0;
		var volTer = 0;
		var groupFillMesh = new THREE.Group();

		for(var i=0;i<triangles.length;i++){
			var points3d = [];

			var coords = TR3.getCoordsByXYmod( triangles[i].a.x, triangles[i].a.z );
			points3d.push(new THREE.Vector3(coords[3], coords[4], coords[5]));

			var coords = TR3.getCoordsByXYmod( triangles[i].b.x, triangles[i].b.z );
			points3d.push(new THREE.Vector3(coords[3], coords[4], coords[5]));

			var coords = TR3.getCoordsByXYmod( triangles[i].c.x, triangles[i].c.z );
			points3d.push(new THREE.Vector3(coords[3], coords[4], coords[5]));

			var geometry = new THREE.BufferGeometry().setFromPoints( points3d )	
			var style = { color: "#00ff00", side: THREE.DoubleSide/*, transparent: true, opacity: 0.75*/, wireframe: true };
			var vItem = { reload: true };
			var fillMesh = TR3.makeMeshFeat( geometry, "Basic",  style, vItem );
			groupFillMesh.add(fillMesh)

			var t3d = new THREE.Triangle(points3d[0],points3d[1],points3d[2]);
			var area3d = Math.abs( t3d.getArea() );
			areaTer += area3d;

			var points2d = [];
			points2d.push(new THREE.Vector3(triangles[i].c.x, 0, triangles[i].b.z));
			points2d.push(new THREE.Vector3(triangles[i].c.x, 0, triangles[i].b.z));
			points2d.push(new THREE.Vector3(triangles[i].c.x, 0, triangles[i].b.z));
			
			var t2d = new THREE.Triangle(points2d[0],points2d[1],points2d[2]);
			var area2d = (Math.abs( t2d.getArea() ) + area3d)/2;

			var centroid = new THREE.Vector3( (triangles[i].a.x+triangles[i].b.x+triangles[i].c.x)/3, (triangles[i].a.y+triangles[i].b.y+triangles[i].c.y)/3, (triangles[i].a.z+triangles[i].b.z+triangles[i].c.z)/3 );
			var Hsurf = TR3.zM2T(centroid.y);
			var mesh = TR3.scene.getObjectById( baseMesh );
			var CoordPeri = TR3.getCoordsByXYmod( centroid.x, centroid.z, mesh );
			var Hdif = Hsurf - CoordPeri[2];
			volTer += area2d * Hdif;
		}
		TR3.scene.add(groupFillMesh);
		
		return [areaTer,volTer];
		
	};
	
	TR3.setSegmentsByTerr = function(x1,y1,z1,x2,y2,z2,multi,inv){
		var vMod= new Array();
		var vTerr = new Array();
		var cp2;
		if(inv==true){
			var XYZ1 = TR3.coordM2T(x1,y1,z1);
			x1=XYZ1[0];
			y1=XYZ1[1];
			z1=XYZ1[2];
			var XYZ2 = TR3.coordM2T(x2,y2,z2);
			x2=XYZ2[0];
			y2=XYZ2[1];
			z2=XYZ2[2];
		};
		var nSegX =  Math.ceil( Math.abs( (x2-x1)/TR3.tPixMesh ) );
		var nSegY =  Math.ceil( Math.abs( (y2-y1)/TR3.tPixMesh ) );
		var nSeg = Math.max(nSegX, nSegY)*multi;  //multi=3 mejor ajuste
		var distTerr = 0;
		
		var sizeSegX = (x2-x1)/nSeg;
		var sizeSegY = (y2-y1)/nSeg;
		
		for(var j=0; j<nSeg; j++){
			
			var xp1 = x1 + sizeSegX*j;
			var yp1 = y1 + sizeSegY*j;
			var cp1 = TR3.getCoordsByXYmod(xp1,-yp1);
			
			vMod.push([cp1[3], cp1[4], cp1[5]]);
			vTerr.push([cp1[0], cp1[1], cp1[2]]);
			
			var xp2 = x1 + sizeSegX*(j+1);
			var yp2 = y1 + sizeSegY*(j+1);
			cp2 = TR3.getCoordsByXYmod(xp2,-yp2);
			
			var alt = cp2[2]-cp1[2];
			var dist = TR3.getCoordsDistance([cp1[0],cp1[1]],[cp2[0],cp2[1]]);

			distTerr += Math.sqrt(Math.pow(dist,2)+Math.pow(alt,2));

			//distTerr += Math.sqrt(Math.pow(cp2[0]-cp1[0],2)+Math.pow(cp2[1]-cp1[1],2)+Math.pow(cp2[2]-cp1[2],2));
		}
		
		if(cp2 != null){
			vMod.push([cp2[3], cp2[4], cp2[5]]);
			vTerr.push([cp2[0], cp2[1], cp2[2]]);
		}

		return [distTerr, vMod, vTerr];
	}
	
	TR3.getCoordsDistance = function(p1, p2) {
		var dist;
		if( typeof ol !== 'undefined' ){
			var sphProj = 'EPSG:4326';
			var thisProj = TR3.srsImg;
		
			var c1 = ol.proj.transform(p1, thisProj, sphProj);
			var c2 = ol.proj.transform(p2, thisProj, sphProj);
		
			dist = ol.sphere.getDistance(c1,c2);
		}else if( typeof L !== 'undefined' ){
			var c1 = L.latLng(proj4(proj4.defs(TR3.srsImg),proj4.defs('EPSG:4326'), p1));
			var c2 = L.latLng(proj4(proj4.defs(TR3.srsImg),proj4.defs('EPSG:4326'), p2));
			
			dist = c1.distanceTo(c2);
		}
		else{ dist = Math.sqrt(Math.pow(p2[0]-p1[0],2)+Math.pow(p2[1]-p1[1],2)); }
		return dist;
	}
	
	TR3.getCoordsDistance3D = function(p1, p2) {
		
		var dAlt = p2[2]-p1[2];
		var d2D = TR3.getCoordsDistance([p1[0],p1[1]],[p2[0],p2[1]]);//Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2)+Math.pow(0-0,2))
		
		var dist3D = Math.sqrt(Math.pow(d2D,2)+Math.pow(dAlt,2));//H2=c2+c2
		
		return dist3D;
	};
	
	TR3.formatMeasure = function(length,type) {
		var unit;
		var absLength
		if(type == "surf"){
			absLength = Math.abs(length);
			if (absLength > 1000000) {
				length = Math.round(length / 1000000 * 1000) / 1000;
				unit = 'km2'
			} else {
				length = Math.round(length * 100) / 100;
				unit = 'm2'
			}
		}else if(type == "vol"){
			absLength=Math.abs(length);
			if (absLength > 1000000000) {
				length = Math.round(length / 1000000000 * 1000) / 1000;
				unit = 'km3'
			} else {
				length = Math.round(length * 100) / 100;
				unit = 'm3'
			}
		}else{//dist
			absLength = Math.abs(length);
			if (absLength > 1000) {
				length = Math.round(length / 1000 * 1000) / 1000;
				unit = 'km'
			} else {
				length = Math.round(length * 100) / 100;
				unit = 'm'
			}
		}
		
		return [length,unit];
	};'use strict';
//https://www.3dcitydb.org/3dcitydb-web-map/1.7/3dwebclient/index.html?title=Berlin_Demo&batchSize=1&latitude=52.517479728958044&longitude=13.411141287558161&height=534.3099172951087&heading=345.2992773976952&pitch=-44.26228062802528&roll=359.933888621294&layer_0=url%3Dhttps%253A%252F%252Fwww.3dcitydb.org%252F3dcitydb%252Ffileadmin%252Fmydata%252FBerlin_Demo%252FBerlin_Buildings_rgbTexture_ScaleFactor_0.3%252FBerlin_Buildings_rgbTexture_collada_MasterJSON.json%26name%3DBrlin_Buildings_rgbTexture%26active%3Dtrue%26spreadsheetUrl%3Dhttps%253A%252F%252Fwww.google.com%252Ffusiontables%252FDataSource%253Fdocid%253D19cuclDgIHMqrRQyBwLEztMLeGzP83IBWfEtKQA3B%2526pli%253D1%2523rows%253Aid%253D1%26cityobjectsJsonUrl%3D%26minLodPixels%3D100%26maxLodPixels%3D1.7976931348623157e%252B308%26maxSizeOfCachedTiles%3D200%26maxCountOfVisibleTiles%3D200
//https://gis.stackexchange.com/questions/13585/is-there-an-open-source-gis-to-view-and-edit-citygml-models
//https://www.idee.es/resources/presentaciones/JIIDE13/miercoles/7_CityGML.pdf
//http://www.citygmlwiki.org/index.php/Open_Source
//http://www.citygmlwiki.org/index.php/Freeware

TR3.makeApilator = function (gltf, scale, n, animation) {

	var obj3d = gltf.scene;
	var bboxObjGeom = new THREE.Vector3();
	new THREE.Box3().setFromObject(obj3d).getSize(bboxObjGeom);
	var size = bboxObjGeom.y;
	var posObj3d = obj3d.position;

	if (n == 100) {
		var nClon = 7;
		var R = 70;
		var ang = 2 * Math.PI / (nClon + 1);

		var xC = posObj3d.x;
		var yC = 1 * posObj3d.z - 70;

		for (i = 0; i <= nClon; i++) {
			if (i != 6) {
				var pos = new THREE.Vector3(xC + (R * Math.cos(ang * i)), posObj3d.y, yC - (R * Math.sin(ang * i)));
				var clon = TR3.makeClon(gltf, obj3d, pos, scale, animation)
				TR3.scene.add(clon);
			}
		}

	} else {
		for (var i = 0; i < n - 1; i++) {
			var pos = new THREE.Vector3(posObj3d.x, posObj3d.y + size * (i + 1), posObj3d.z);
			var clon = TR3.makeClon(gltf, obj3d, pos, scale, animation)
			TR3.scene.add(clon);
		}
	}

};

TR3.makeMultiPos = function (gltf, pos, scale, animation) {
	var obj3d = gltf.scene;
	for (var i = 1; i < pos.length; i++) {
		var posi = pos[i];
		var scalei;
		if (typeof scale === "object") { scalei = scale[i]; } else { scalei = scale; }
		var coordM = TR3.coordM2T(posi[0], posi[1], posi[2], true);
		var posObj3d = new THREE.Vector3();
		posObj3d.x = coordM[0];
		posObj3d.y = coordM[1];
		posObj3d.z = coordM[2];

		var clon = TR3.makeClon(gltf, obj3d, posObj3d, scalei, animation, posi);
		//var shadow = TR3.setShadowBase(clon);
		TR3.scene.add(clon);
	}
};

TR3.makeClon = function (gltf, obj3d, posObj3d, scale, animation, looking) {
	var clon = obj3d.clone();//clone?...
	var clonGltf = new Array();
	var clonGltfVal = Object.assign(clonGltf, gltf);

	clon.name = 'codeMade';
	clon.position.set(posObj3d.x, posObj3d.y, posObj3d.z); // or any other coordinates

	if (scale) {
		if (typeof scale === "object") {
			//clon.scale.set( scale[0], scale[2], scale[1] ); 
			clon.children[0].scale.x = scale[0];
			clon.children[0].scale.y = scale[2];
			clon.children[0].scale.z = scale[1];
			clonGltf.scaleByCode = scale;
		}
	}
	if (clonGltf.animations.length > 0 && animation) {
		clonGltf.mixer = new THREE.AnimationMixer(clon);
		var action = clonGltf.mixer.clipAction(clonGltf.animations[0]);
		action.play();
	}

	clonGltf.scene = clon;
	clonGltf.looking = looking;
	clonGltf.zPos = posObj3d.y;
	if (!TR3.vGeom.obj3d) {
		TR3.vGeom.obj3d = new Array(0);
	}
	TR3.vGeom.obj3d.push(clonGltf);

	return clon;
};

TR3.handleFileSelect = function (evt, obj) {
	TR3.sourceFile = false;
	if (evt.target.files) {
		var file = evt.target.files[0]; // FileList object

		var output = escape(file.name)/* + ' - ' + file.size + ' bytes'*/;

		document.getElementById(evt.target.id + '_fake').value = output;

		TR3.sourceFile = (window.URL || window.webkitURL).createObjectURL(file);

		/*if(src && extens){
			obj.getFile4features(src,extens);
			obj.parent.tvectorDraw.imgWait.style.display = 'block';			}*/
	} else {
		alert("Acción no soportada por su navegador, actualicese o utilice algún otro");
	}

};

TR3.loadFile = function (params) {

	var dfd_LoadFile = $.Deferred();

	if (params === undefined) params = {};

	var src = params.hasOwnProperty("src") ?
		params["src"] : false;

	var srcLoad;
	var ext;
	var size3dObj = document.getElementById('size3dObj');
	size3dObj.innerHTML = '';

	var file_3d_fake = document.getElementById('file_3d_fake').value;

	if (!src) {
		ext = document.getElementById('file_3d_fake').value.split('.')[1];
		srcLoad = TR3.sourceFile;
		params.slctItem = true;
		params.persist2Scene = true;
	} else {
		ext = src.split('.')[1];
		srcLoad = src;
	}

	//TR3.loaderGLTF.setCrossOrigin( 'anonymous' );

	if (srcLoad && ext == 'glb') {
		TR3.loaderGLTF.load(srcLoad, function (gltf) {

			TR3.loaderGLTFsucces(gltf, dfd_LoadFile, params);

		}, function (xhr) {

			size3dObj.innerHTML = Math.round(xhr.loaded / xhr.total * 100) + '% loaded';

		}, function (error) {

			size3dObj.innerHTML = 'error: ' + error.message;
			console.log(error);
			TR3.unlock3d('obj3d');
		});
	}
	if (srcLoad && ext == 'ifc') {
		TR3.loaderIFC.load(srcLoad, function (gltf) {

			TR3.loaderGLTFsucces(gltf, dfd_LoadFile, params);

		}, function (xhr) {

			size3dObj.innerHTML = Math.round(xhr.loaded / xhr.total * 100) + '% loaded';

		}, function (error) {

			size3dObj.innerHTML = 'error: ' + error.message;
			console.log(error);
			TR3.unlock3d('obj3d');
		});

	}
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

	var transform = params.hasOwnProperty("transform") ?
		params["transform"] : false;

	var apilator = params.hasOwnProperty("apilator") ?
		params["apilator"] : false;

	var slctItem = params.hasOwnProperty("slctItem") ?
		params["slctItem"] : false;

	var isPixSize = params.hasOwnProperty("isPixSize") ?
		params["isPixSize"] : false;

	var href = params.hasOwnProperty("href") ?
		params["href"] : false;

	var isFloor = params.hasOwnProperty("isFloor") ?
		params["isFloor"] : false;

	var mouseEvt = params.hasOwnProperty("mouseEvt") ?
		params["mouseEvt"] : false;

	var persist2Scene = params.hasOwnProperty("persist2Scene") ?
		params["persist2Scene"] : false;

	gltf.persist2Scene = persist2Scene;

	var objGLTF = gltf.scene || gltf;

	//objGLTF.castShadow = true;
	//objGLTF.receiveShadow = false;
	if (gltf.animations && gltf.animations.length > 0 && animation) {
		gltf.mixer = new THREE.AnimationMixer(objGLTF);
		var action = gltf.mixer.clipAction(gltf.animations[0]);
		action.play();
	}

	var coord = new THREE.Vector3();
	if (typeof pos[0] === "object") {
		var coordM = TR3.coordM2T(pos[0][0], pos[0][1], pos[0][2], true);
		coord.x = coordM[0];
		coord.y = coordM[1];
		coord.z = coordM[2];
		gltf.looking = pos[0];
	} else if (pos) {
		var coordM = TR3.coordM2T(pos[0], pos[1], pos[2], true);
		coord.x = coordM[0];
		coord.y = coordM[1];
		coord.z = coordM[2];
	} else {
		var intersects = TR3.getIntersect(mouseEvt);
		if (intersects.length > 0) {
			var terr = intersects[0];

			coord.x = terr.point.x;
			coord.y = terr.point.y;
			coord.z = terr.point.z;
		} else {
			coord.x = TR3.mesh.position.x;
			coord.y = TR3.zMed + (TR3.zMax - TR3.zMin) / 3;
			coord.z = TR3.mesh.position.z;
		}
	}

	/*if( isPixSize ){
		coord.y = TR3.zM2T(TR3.pix2geo(pos[2]),true) - TR3.zM2T(0,true);
	}*/
	gltf.zPos = coord.y;

	var scaleSet = [1, 1, 1];
	gltf.scaleByCode = scaleSet;
	if (scale) {
		if (typeof scale[0] === "object") {
			scaleSet = JSON.parse(JSON.stringify(scale[0]));
		} else {
			scaleSet = JSON.parse(JSON.stringify(scale));
		}
		if (isPixSize) {
			var bboxObjGeom = new THREE.Vector3();
			new THREE.Box3().setFromObject(objGLTF).getSize(bboxObjGeom);

			scaleSet[0] = TR3.pix2geo(scaleSet[0]) / bboxObjGeom.x;
			scaleSet[1] = TR3.pix2geo(scaleSet[1]) / bboxObjGeom.z;
			scaleSet[2] = TR3.pix2geo(scaleSet[2]) / bboxObjGeom.y;
		}

		objGLTF.children[0].scale.x = scaleSet[0];
		objGLTF.children[0].scale.y = scaleSet[2];
		objGLTF.children[0].scale.z = scaleSet[1];
		gltf.scaleByCode = scaleSet;
	} else {
		gltf.scaleByCode = [objGLTF.children[0].scale.x, objGLTF.children[0].scale.y, objGLTF.children[0].scale.z]
	}

	if (aRotate) {
		if (typeof aRotate === "boolean") { gltf.autoRotation = aRotate; } else { objGLTF.rotation.y = aRotate; }
	}
	if (isFloor) { gltf.isFloor = isFloor; }
	if (href) { gltf.href = href; }
	if (slctItem) { gltf.slctItem = slctItem; }

	objGLTF.position.set(coord.x, coord.y, coord.z);
	//var shadow = TR3.setShadowBase(objGLTF);

	if (!TR3.vGeom.obj3d) {
		TR3.vGeom.obj3d = new Array(0);
	}
	TR3.vGeom.obj3d.push(gltf);
	gltf.name = 'codeMade';

	if (!TR3.sourceFile) {
		TR3.sourceFile = '';
		document.getElementById('file_3d_fake').value = 'Explorar GLB/IFC...';
	} else {
		TR3.scene.add(objGLTF);
		//shadow.visible = true;

		TR3.transCtrlsEnabled(true);
		TR3.transformControls.attach(objGLTF);
	}

	if (apilator && !isNaN(apilator)) { TR3.makeApilator(gltf, scale, apilator, animation); }
	if (typeof (pos[0]) == "object") { TR3.makeMultiPos(gltf, pos, scale, animation); }

	dfd_LoadFile.resolve(objGLTF/*, shadow*/);
};

TR3.del3dObj = function () {
	var TR3obj = TR3.vGeom.obj3d;
	if (TR3.vGeom && TR3obj && TR3obj.length > 0) {
		var idObj;
		if (TR3.transformControls.enabled) {
			var obj3d = TR3.transformControls.object;

			for (var i = 0; i < TR3obj.length; i++) {
				var uuid
				if (TR3obj[i].scene) { uuid = TR3obj[i].scene.uuid; } else { uuid = TR3obj[i].uuid; }
				if (obj3d.uuid == uuid)
					idObj = i;

			}
		}

		idObj = idObj || TR3obj.length - 1;

		if (TR3.vGeom && TR3obj && TR3obj.length > 0) {
			var obj3d = TR3obj[idObj];
			if (obj3d.scene) {
				TR3.scene.remove(obj3d.scene);
			} else {
				TR3.scene.remove(obj3d);
			}
			TR3obj.splice(idObj, 1);
		}


		TR3.transCtrlsEnabled(false);
	}

};

TR3.transCtrlsEnabled = function (boo) {

	if (boo) {
		TR3.lock3d('obj3d');
	} else {
		TR3.unlock3d('obj3d');
	}

	TR3.transformControls.enabled = boo;
	TR3.transformControls.showX = boo;
	TR3.transformControls.showY = boo;
	TR3.transformControls.showZ = boo;
	document.getElementById('size3dObj').innerHTML = "";

};

TR3.getSizeObj = function (objGeom) {
	var bboxObjGeom = new THREE.Vector3();

	new THREE.Box3().setFromObject(objGeom/*.children[0]*/).getSize(bboxObjGeom);
	var X = TR3.formatMeasure(bboxObjGeom.x);
	var Y = TR3.formatMeasure(bboxObjGeom.y);
	var Z = TR3.formatMeasure(bboxObjGeom.z);

	return [X, Y, Z];
};'use strict';
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
TR3.starField;

/*Maps Params*/
TR3.geo2UTM;
TR3.bboxImgOri = []; TR3.srsImg; TR3.widthImg; TR3.heightImg; TR3.tPixImg; TR3.texture; TR3.maxResolMesh = 5;
TR3.zMin; TR3.zMed; TR3.zMax;
TR3.arrayZ = [];
TR3.zone = [];
TR3.reducMeshW; TR3.reducMeshH;

/*Terrain Container*/
TR3.map; TR3.canvasDest; TR3.loadingDiv;
TR3.canvasDestW; TR3.canvasDestH;//TR3.canvasDestZindex;
TR3.optionsSet = { imgControl: true, cursor3d: false, anaglyph: false, autoRotate: false, wireframeMesh: false };
TR3.valuesSet = { magnification: 'auto', height: 0 };

/*Cursor3d*/
TR3.cursor = { helper: false, setZterr: false, setkCde: false, causeLock: "" };

TR3.newMeshMap = 1;
TR3.oneMeshMap = 1;
TR3.idAnimation = -1;
TR3.zeroParallax;

/*observer*/
TR3.moveKey = { is: false, size: 2, walk: false, azOriAng: 0 };
TR3.startPos;
TR3.lookAt;
TR3.viewScenes = true;
TR3.idLooking = false;
/*prrgress count*/
//TR3.prog = {index: 0, countFull: 0};

/*Draw*/
TR3.newDraw = -1;
TR3.vGeom = [];
TR3.vGeom.drawVector;
TR3.vGeom.positions;
TR3.vGeom.sprites = [];
TR3.vGeom.measure = false;
TR3.vGeom.polig = false;
TR3.vGeom.item = [];
TR3.vGeom.item.magni;
TR3.vGeom.item.nPoint = 0;
TR3.vGeom.obj3d = false;
TR3.sprite = true;
TR3.featFromOri;

/*SINTETC STEREO*/
TR3.animate = function () {

	//request new frame
	TR3.idAnimation = requestAnimationFrame(TR3.animate);
	TR3.controls.update();
	TR3.renderScene();
	if (TR3.moveKey.is == true) {
		TR3.moveKeyFn();
	}
	//TR3.starField.rotation.y += 0.0005;

	var delta = TR3.clock.getDelta();
	if (TR3.vGeom && TR3.vGeom.obj3d) {
		var flag = false;
		for (var i = 0; i < TR3.vGeom.obj3d.length; i++) {
			if (TR3.vGeom.obj3d[i].mixer) { TR3.vGeom.obj3d[i].mixer.update(delta) };

			var aRotate = TR3.vGeom.obj3d[i].autoRotation;
			if (aRotate) { if (typeof aRotate === "boolean") { TR3.vGeom.obj3d[i].scene.rotation.y += 0.01; } else { TR3.vGeom.obj3d[i].scene.children[0].rotation.y += aRotate; aRotate = false; } }

			flag = true;
		}
	}

	/*TR3.quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0).normalize(), 0.005);
	if(TR3.moon)
		TR3.moon.position.applyQuaternion(TR3.quaternion);*/
	var orbitRadius = 1500000;
	var date = TR3.clock.getElapsedTime() * 0.02;
	var zone = TR3.zone;
	if (TR3.moon/* && TR3.sun*/) {
		TR3.moon.position.set(
			Math.cos(date) * orbitRadius + (zone[2] + zone[0]) / 2,
			Math.sin(date) * 700000 - 200000,
			Math.sin(date) * orbitRadius + -(zone[3] + zone[1]) / 2
		);
		/*TR3.sun.position.set(
				Math.cos(date) * orbitRadius + ( zone[2] + zone[0] )/2,
				Math.sin(date) * 700000 - 200000,
				Math.sin(date) * orbitRadius + -( zone[3] + zone[1] )/2
		);*/

	}

	var sky = TR3.scene.getObjectByName("Sky");
	var ray = sky.material.uniforms["rayleigh"].value;
	var osc = Math.round(TR3.oscillator(date + 0.4, 1, 0.3, 0, 0.4) * 10) / 10;
	if (Math.round(date * 200) % 9 === 0 && ray != osc) {
		sky.material.uniforms["rayleigh"].value = osc;
		//console.log(TR3.oscillator(date, 1, 0.3, 0, 0.4));//time, frequency, amplitude, phase, offset
	}

};

TR3.startAnimation = function (e) {

	TR3.idAnimation = window.requestAnimationFrame(TR3.animate);
}

TR3.stopAnimation = function (e) {

	window.cancelAnimationFrame(TR3.idAnimation);
}

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
	if (type == 'scene') {
		if (TR3.vGeom.item && TR3.vGeom.item.length > 0)
			for (i = 0; i < TR3.vGeom.item.length; i++) {
				var item = TR3.vGeom.item[i]
				if (item.geometry.type == 'BufferGeometry')
					exporter.push(TR3.vGeom.item[i]);
			}
		if (TR3.vGeom.obj3d && TR3.vGeom.obj3d.length > 0)
			for (i = 0; i < TR3.vGeom.obj3d.length; i++) {
				//var Obj3d = TR3.vGeom.obj3d[i].scene.children[0].clone();//https://github.com/mrdoob/three.js/issues/11574
				exporter.push(exportObjItem(TR3.vGeom.obj3d[i]));
			}
		/*if(TR3.vGeom.sprites && TR3.vGeom.sprites.length>0) SPRITES!!??
			for(i=0;i<TR3.vGeom.sprites.length;i++){
				//var Obj3d = new THREE.Mesh( TR3.vGeom.sprites[0].geometry, TR3.vGeom.sprites[0].material );
				exporter.push( TR3.vGeom.sprites[i].scale.set(150*TR3.getSizePix(),150/2*TR3.getSizePix(),1.0) );
			}*/
		exporter.push(TR3.mesh);
	} else if (type == 'obj3d') {
		if (TR3.vGeom.obj3d && TR3.vGeom.obj3d.length > 0)
			for (i = 0; i < TR3.vGeom.obj3d.length; i++) {
				//var Obj3d = TR3.vGeom.obj3d[i].scene.children[0].clone();//https://github.com/mrdoob/three.js/issues/11574
				exporter.push(exportObjItem(TR3.vGeom.obj3d[i]));
			}
	} else if (type == 'items' && !TR3.config.unic) {
		IIIkel.util.vectorDraw.prototype.exportLyr(TR3.LyrFeatFromOri.getSource().getFeatures());
		if (TR3.vGeom.item && TR3.vGeom.item.length > 0)
			for (i = 0; i < TR3.vGeom.item.length; i++) {
				var item = TR3.vGeom.item[i]
				if (item.geometry.type == 'BufferGeometry')
					exporter.push(TR3.vGeom.item[i]);
			}
	} else {
		exporter = TR3.mesh;
	}

	var gltfExporter = new GLTFExporter();

	var options = {
		/*trs: document.getElementById( 'option_trs' ).checked,
		onlyVisible: document.getElementById( 'option_visible' ).checked,
		truncateDrawRange: document.getElementById( 'option_drawrange' ).checked,
		binary: document.getElementById( 'option_binary' ).checked,
		forceIndices: document.getElementById( 'option_forceindices' ).checked,
		forcePowerOfTwoTextures: document.getElementById( 'option_forcepot' ).checked,
		maxTextureSize: Number( document.getElementById( 'option_maxsize' ).value ) || Infinity // To prevent NaN value*/
	};

	//if(exporter.length > 0 || exporter.type == "Mesh")
	gltfExporter.parse(exporter, function (result) {

		if (result instanceof ArrayBuffer) {

			saveArrayBuffer(result, 'scene.glb');

		} else {

			var output = JSON.stringify(result, null, 2);
			//console.log( output );
			saveString(output, 't3scene.gltf');

		}

	}, options);

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
		} else {
			Obj3d = obj3d2Exp.scene;
		}

		var Obj3dCero = Obj3d.children[0];
		var Obj3dChild = TR3.SkeletonUtils.clone(Obj3dCero);//https://github.com/mrdoob/three.js/issues/11574

		if (obj3d2Exp.scaleByCode) {
			Obj3dChild.scale.x *= obj3d2Exp.scaleByCode[0];
			Obj3dChild.scale.y *= obj3d2Exp.scaleByCode[0];
			Obj3dChild.scale.z *= obj3d2Exp.scaleByCode[0];
		} else {
			var bboxObj = new THREE.Vector3();
			new THREE.Box3().setFromObject(Obj3dCero).getSize(bboxObj);

			var bboxObjChild = new THREE.Vector3();
			new THREE.Box3().setFromObject(Obj3dChild).getSize(bboxObjChild);

			var scaleObjGeom = (bboxObj.x + bboxObj.y + bboxObj.z) / 3;

			Obj3dChild.scale.x = bboxObj.x / bboxObjChild.x;
			Obj3dChild.scale.y = bboxObj.y / bboxObjChild.y;
			Obj3dChild.scale.z = bboxObj.z / bboxObjChild.z;
		}

		var posObj = Obj3d.position.clone();
		var posObjChild = Obj3dChild.position.clone();
		Obj3dChild.position.set(posObj.x + posObjChild.x, posObj.y + posObjChild.y, posObj.z + posObjChild.z);

		return Obj3dChild;

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
		/*while(scene && scene.children.length > 0){ 
			scene.remove(scene.children[0]); 
		}*/

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

		while(scene.children.length > 0){ 
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
		TR3.map.removeEventListener('click', TR3.addPoint, false);
		window.removeEventListener('keydown', TR3.keyDown, false);
		window.removeEventListener('keyup',	TR3.keyUp, false);*/
		TR3.stopAnimation();
		TWEEN.removeAll();
	}

	TR3.del_vGeom();
}

TR3.intersectEvOver = function (intsct) {

	// Create the event
	var event = new CustomEvent("TR3-onIntersectEvOver", { detail: intsct });
	// Dispatch/Trigger/Fire the event
	TR3.map.dispatchEvent(event);
}

TR3.intersectEvClick = function (intsct) {

	// Create the event
	var event = new CustomEvent("TR3-onIntersectEvClick", { detail: intsct });
	// Dispatch/Trigger/Fire the event
	TR3.map.dispatchEvent(event);
}

TR3.CameraMoveEvEnd = function (msg) {
	if (msg) { console.log(msg); }

	// Create the event
	var event = new CustomEvent("TR3-onCameraMoveEnd", { "detail": "an event" });
	// Dispatch/Trigger/Fire the event
	TR3.map.dispatchEvent(event);
}

TR3.VectorEvEnd = function (msg) {
	if (msg) { console.log(msg); }

	// Create the event
	var event = new CustomEvent("TR3-onVectorEnd", { "detail": "an event" });
	// Dispatch/Trigger/Fire the event
	TR3.map.dispatchEvent(event);
}

TR3.MeasureEvEnd = function (txt, sprite) {

	// Create the event
	var event = new CustomEvent("TR3-onMeasureEnd", { detail: [txt, sprite] });
	// Dispatch/Trigger/Fire the event
	TR3.map.dispatchEvent(event);
}

TR3.setMeshMap = function ( imgOri, bboxImgOri, optionsSet, valuesSet, zone ) {

	TR3.loadingDiv = document.getElementById('loadingTerrain');
	//THREE.Triangulation.setLibrary('libtess');
	document.getElementById('3doptions').style.display = 'none';
	if (TR3.bboxImgOri && JSON.stringify(bboxImgOri) == JSON.stringify(TR3.bboxImgOri) && TR3.loadingDiv && TR3.canvasDest) {
		TR3.setImageMesh(imgOri);
		document.getElementById('3doptions').style.display = 'block';
		/*}else if(TR3.loadingDiv && TR3.loadingDiv.style && TR3.loadingDiv.style.display == "block" && TR3.config.unic){
			return false;*/
	} else {
		/*setMeshMap New*/
		TR3.newMeshMap = 1;
		TR3.clearMeshMap();

		/*INI params*/
		TR3.bboxImgOri = [eval(bboxImgOri[0]), eval(bboxImgOri[1]), eval(bboxImgOri[2]), eval(bboxImgOri[3])] || [585567, 4778782, 590139, 4782399];
		if (proj4.Proj(TR3.srsImg).projName === 'longlat') { TR3.geo2UTM = 40000000 / 360; } else { TR3.geo2UTM = 1; }
		TR3.zone = [TR3.bboxImgOri[0] * TR3.geo2UTM, TR3.bboxImgOri[1] * TR3.geo2UTM, TR3.bboxImgOri[2] * TR3.geo2UTM, TR3.bboxImgOri[3] * TR3.geo2UTM];

		var imgControl, cursor3d, anaglyph, magnification, autoRotate, wireframeMesh, lookAt;

		imgControl = optionsSet.imgControl;
		cursor3d = optionsSet.cursor3d;
		anaglyph = optionsSet.anaglyph;
		autoRotate = optionsSet.autoRotate
		wireframeMesh = optionsSet.wireframeMesh
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

		//TR3.renderer.gammaOutput = true; // if >r88, models are dark unless you activate gammaOutput
		//TR3.renderer.gammaFactor = 2.2; // def 1
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

		/*loaderIFC*/
		TR3.loaderIFC = new TR3.IFCLoader();

		/*loaderFONT*/
		TR3.loaderFONT = new THREE.FontLoader();

		/*SKY*/
		var sky = new TR3.Sky();
		sky.name = "Sky";
		TR3.scene.add(sky);

		/*Camera*/
		TR3.camera = new THREE.PerspectiveCamera(TR3.fov, TR3.canvasDestW / TR3.canvasDestH, 1, 5000000);
		//(fov ratio->zone next far ) --> makeScene update
		//TR3.camera = new THREE.OrthographicCamera(-window.innerWidth / 2, window.innerWidth / 2, window.innerHeight / 2, -window.innerHeight / 2, 1, 5000);

		// Lights
		var hemispheric = new THREE.HemisphereLight(0xffffff, 0xffffff, 1.5);
		TR3.scene.add(hemispheric);

		var ambient = new THREE.AmbientLight(0xffffff, 1.5);
		TR3.scene.add(ambient);

		/*TR3.directionalLight = new THREE.SpotLight( 0xffffff, 5000000 );
		TR3.directionalLight.castShadow = true;
		TR3.scene.add( TR3.directionalLight );
		TR3.cameraHelper = new THREE.CameraHelper(TR3.directionalLight.shadow.camera);
		TR3.scene.add(TR3.cameraHelper);*/

		var moves;
		var imgOrbitalMoves = document.getElementById('imgOrbitalMoves');
		if (imgControl) {
			moves = imgOrbitalMoves;
		} else {
			moves = TR3.canvasDest;
		}

		/*Orbit Controls*/
		TR3.controls = new TR3.OrbitControls(TR3.camera, moves); //orbitalmoves+canvasDest???
		//TR3.controls.minPolarAngle = - Infinity; // radians
		TR3.controls.maxPolarAngle = Math.PI / 2;
		// How far you can orbit horizontally, upper and lower limits.
		// If set, must be a sub-interval of the interval [ - Math.PI, Math.PI ].
		//TR3.controls.minAzimuthAngle = - Infinity; // radians
		//TR3.controls.maxAzimuthAngle = Infinity; // radians
		TR3.controls.enableDamping = true;
		TR3.controls.dampingFactor = 0.19;
		TR3.controls.screenSpacePanning = false;

		TR3.controls.addEventListener('change', function (event) {
			TR3.transCtrlsEnabled(false);
			TR3.controls.active = false;
		});

		TR3.controls.addEventListener('end', function (event) {
			var id = setInterval(function () {
				if (TR3.controls.active) { clearInterval(id) };
				TR3.controls.active = true;
			}, 500);
			TR3.setOpts({ autoRotate: false });
		});

		/*Transform Controls*/
		TR3.transformControls = new TR3.TransformControls(TR3.camera, TR3.canvasDest);
		TR3.transformControls.enabled = false;
		TR3.scene.add(TR3.transformControls);
		//TR3.transformControls.addEventListener( 'change', TR3.renderer );
		TR3.transformControls.addEventListener('dragging-changed', function (event) {
			TR3.controls.enabled = !event.value;

			var Tc = TR3.transformControls;
			var size3dObj = document.getElementById('size3dObj');
			if (Tc.enabled) {
				var obj3d = Tc.object;
				if (obj3d && obj3d.parent) {
					var XYZ = TR3.getSizeObj(obj3d);
					size3dObj.innerHTML = '<b>X:</b>' + XYZ[0][0] + '' + XYZ[0][1] + ' <b>Y:</b>' + XYZ[2] + '' + XYZ[2][1] + ' <b>Z:</b>' + XYZ[1][0] + '' + XYZ[1][1];
				}

			} else { /*TR3.transCtrlsEnabled( false );*/ }
		});

		TR3.transformControls.addEventListener('mouseDown', function (event) {
			TR3.transformControls.active = true;
		});

		/*Create Image-Mesh*/
		TR3.makeWorld(imgOri);
		TR3.persist2Scene();
		TR3.setOptions(imgControl, cursor3d, anaglyph, autoRotate, wireframeMesh);
	}

	/*Events*/
	if (TR3.oneMeshMap == 1) {
		window.addEventListener('resize', TR3.onWindowResize, false);
		TR3.map.addEventListener('mousemove', TR3.onIntersect, false);
		TR3.map.addEventListener('contextmenu', TR3.setCoods2clip, false);
		TR3.map.addEventListener('click', TR3.addPoint, false);
		TR3.map.addEventListener('click', TR3.click_Obj3d, false);
		TR3.map.addEventListener("touchstart", function (e) { /*TR3.setOpts({ autoRotate: false });*/ TR3.click_Obj3d(e) }, false);
		//TR3.map.addEventListener("mousedown", function () { TR3.setOpts({ autoRotate: false }); }, false);
		TR3.map.addEventListener('wheel', TR3.onMouseWheel, false);//Oritcontrols lock this event...
		window.addEventListener('keydown', TR3.keyDown, false);
		window.addEventListener('keyup', TR3.keyUp, false);
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
		var inter = TR3.getIntersect();
		if (inter.length > 0) {
			var cPos = TR3.camera.position;
			TR3.zeroParallax = cPos.distanceTo(inter[0].point);
		}
	}
};

TR3.onWindowResize = function () {

	TR3.camera.aspect = TR3.canvasDestW / TR3.canvasDestH;
	TR3.camera.updateProjectionMatrix();
	TR3.renderer.setSize(TR3.canvasDestW, TR3.canvasDestH);
};

TR3.onCompleteMap = function () { //TR3.onLoadEnd
	if (TR3.lookAt) {
		TR3.setLookAt(TR3.lookAt);
	}
	if (!TR3.config.unic) { setTimeout(function () { TR3.setObj3d(); TR3.getFeatFromOL(); }, 2000); } //tween oncomplete tools

	//position early objects
	for (var i = 0; i < TR3.scene.children.length; i++) {
		if (typeof (TR3.scene.children[i].position.y) == 'string') {
			var zTerr = TR3.scene.children[i].position.y.split('$');
			if (zTerr[1])
				TR3.scene.children[i].position.y = TR3.zM2T(zTerr[1], true);
		}
	}
	TR3.loadingDiv.style.display = 'none';
	TR3.dfd_setMap.resolve(TR3.mesh);
	document.getElementById('3doptions').style.display = 'block';
	TR3.newMeshMap = 0;
	TR3.oneMeshMap = 0;
};

TR3.persist2Scene = function () {
	if (TR3.vGeom.obj3d)
		for (var i = 0; i < TR3.vGeom.obj3d.length; i++) {
			var Obj3d;
			var obj3d2Exp = TR3.vGeom.obj3d[i];
			if(obj3d2Exp.persist2Scene == true){
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
	TR3.canvasDest.style.zIndex = '9';
};

TR3.unlock3d = function (cause) {
	if (TR3.cursor.causeLock.indexOf(cause) > -1) {
		var splitCause = TR3.cursor.causeLock.split(cause);
		TR3.cursor.causeLock = splitCause.toString().replace(/,/g, '');
		if (TR3.cursor.causeLock == '')
			TR3.canvasDest.style.zIndex = '0';
	}
};	'use strict';
	TR3.rectaValue = function( x1 ,y1 ,x2 ,y2 ,valx ){
	
		var y = (valx-x1)/(x2-x1)*(y2-y1)+y1;
		return y;
	}
	
	TR3.rectaValue3D = function( x1 ,y1, z1 ,x2 ,y2, z2 ,valx ){
	
		var y = TR3.rectaValue( x1 ,y1 ,x2 ,y2 ,valx );
		var z = TR3.rectaValue( x1 ,z1 ,x2 ,z2 ,valx );
		return [valx,y,z];
	}
	
	TR3.geo2pix = function( geo ){
	
		var pix = geo*1/(TR3.tPixImg*TR3.geo2UTM);
		return pix;
	}
	
	TR3.pix2geo = function( pix ){
	
		var geo = pix*(TR3.tPixImg*TR3.geo2UTM);
		return geo;
	}
	
	TR3.getSizePix = function(){
		//sizeMeters??
		var tPixW = (TR3.bboxImgOri[2]-TR3.bboxImgOri[0])/TR3.widthImg;
		var tPixH = (TR3.bboxImgOri[3]-TR3.bboxImgOri[1])/TR3.heightImg;
		var tPix = (tPixW+tPixH)/2;
		return tPix;
	};
	
	TR3.setAzAngle = function( oriAzAng ){
		
		var auxAzAng = TR3.controls.getAzimuthalAngle();
		var oriRight;
		var auxRight;
		
		if(oriAzAng<=0){oriRight = -oriAzAng;}else{oriRight = 2*Math.PI-oriAzAng;}
		if(auxAzAng<=0){auxRight = -auxAzAng;}else{auxRight = 2*Math.PI-auxAzAng;}
		
		if(oriRight>2*Math.PI){oriRight = oriRight-2*Math.PI;}
		if(auxRight>2*Math.PI){auxRight = auxRight-2*Math.PI;}
		
		var rightAng = auxRight - oriRight;
		if(rightAng>0){rightAng = 2*Math.PI-rightAng}else{rightAng = Math.abs(rightAng)};
		
		TR3.controls.rotateLeft(rightAng);//+-?
		
	}
	
	TR3.getOptModCoordCam = function(){
		
		var cPos = TR3.camera.position;
		var heigtH = -10000000;;

		var coordNormalCamera = new Array();
		var offset = TR3.getSizePix()*2;
		
		var az = TR3.controls.getAzimuthalAngle();
		var X = cPos.x+offset*Math.sin(az);
		var Y = cPos.z-offset*Math.cos(az);
			
		for(var i=0; i<TR3.vGeom.obj3d.length; i++){
			var obj3di = TR3.vGeom.obj3d[i];
			if(obj3di.isFloor && obj3di.isFloor == true){
				var coord = TR3.getCoordsByXYmod(X,Y,obj3di);
				if(coord)
					coordNormalCamera.push(coord);
			}
		}
		
		coordNormalCamera.push(TR3.getCoordsByXYmod(X,Y));
		
		for(var i=0; i<coordNormalCamera.length; i++){
			if(coordNormalCamera[i] && heigtH < coordNormalCamera[i][4])
				heigtH = coordNormalCamera[i][4];
		}
		
		return [cPos.x,heigtH,cPos.z];
		
	}
	
	TR3.getCoordsByXYmod = function( X, Y, mesh, inv ){
		//var cPos = TR3.camera.position;
		var zUp = 1000000;
		var zDown = -1000000;
		var meshObj = mesh || TR3.mesh;
		
		if (inv){Y = -Y;}
		
		var start = new THREE.Vector3( X, zUp, Y );
		var end = new THREE.Vector3( X, zDown, Y );
		
		var directionVector = end.sub( start );
		var raycasterLineMesh = new THREE.Raycaster( start, directionVector.clone().normalize() );
		//raycasterLineMesh.firstHitOnly = true;
		
		var intersectsNormalMesh;
		
		if(meshObj.scene && meshObj.scene.children){
			intersectsNormalMesh = raycasterLineMesh.intersectObject( meshObj.scene.children[0], true );
		}else{
			intersectsNormalMesh = raycasterLineMesh.intersectObject( meshObj );
		}
		
		if (intersectsNormalMesh[0]) {
			//console.log(intersectsNormalMesh);
			 //visualize the ray for debugging
			/*var material = new THREE.LineBasicMaterial({
				color: 0xff0000
			});
			const points = []
			points.push(cPos);
			points.push(intersectsNormalMesh[0].point);
			let geometry = new THREE.BufferGeometry().setFromPoints( points )
			var line = new THREE.Line(geometry, material);
			TR3.scene.add( line );*/
			
			var point = intersectsNormalMesh[0].point;
			
			var Xterr, Yterr, Zterr, Xmod, Ymod, Zmod;

			Xterr= point.x;
			Yterr= -point.z;
			Zterr= TR3.zM2T(point.y,false);

			Xmod= point.x;
			Ymod= point.y;
			Zmod= point.z;
		}
		
		return [Xterr, Yterr, Zterr, Xmod, Ymod, Zmod];
	};
	
	TR3.coordM2T = function( X, Y, Z, inv ){
		var x, y, z;
		if (inv) {
			if(!Z){
				var ByXYmod = TR3.getCoordsByXYmod(X,-Y);
				if(ByXYmod && ByXYmod[2]){
					Z = ByXYmod[2];
				}else{
					Z = TR3.zM2T(TR3.zMed, true);
				}
			}
		
			x = X;
			y = TR3.zM2T(Z,inv);
			z = -Y;
			
		}else{
			if(!Y){
				var ByXYmod = TR3.getCoordsByXYmod(X,-Z);
				if(ByXYmod && ByXYmod[5]){
					Y = ByXYmod[5];
				}else{
					Y = TR3.zM2T(TR3.zMed);
				}
			}
			
			x = X;
			y = -Z;
			z = TR3.zM2T(Y,inv);
			
		}
		
		return [x, y, z];
	};
	
	TR3.zM2T = function( Z, inv ){
		var z;
		if (inv) {
			z = (Z - TR3.zMed)*TR3.valuesSet.magnification;
		}else{
			z = Z/TR3.valuesSet.magnification + TR3.zMed;
		}
		if(/*!z || */typeof(z)!='number' || isNaN(z)){z='$'+Z+'$';}
		return z;
	};
	
	TR3.makeVectFeat = function( coords, type, style, vItem ){  //BufferGeometries!!!! ExporterGTLF
		var geomFeat = new THREE.BufferGeometry();
		var feat;
		
		var sColor = new THREE.Color( 0xffffff );
		sColor.setHex( Math.random() * 0xffffff );
		
		var thisStyle = new Array;
		thisStyle.color =  style.color || sColor;
		thisStyle.side = style.side || THREE.DoubleSide ;
		thisStyle.transparent = style.transparent || false;
		thisStyle.wireframe = style.wireframe || false; 
		thisStyle.opacity = style.opacity || 1;
		
		if(type == "Circle"){

			var geomCirc = new THREE.CircleGeometry( coords.w, 20 );
			geomCirc.rotateX(Math.PI/2);
			
			var pos = geomCirc.vertices;
			for(var j=0 ; j<pos.length; j++){
				pos[j].x = coords.x + pos[j].x;
				pos[j].z = coords.z + pos[j].z;
				var z = TR3.getCoordsByXYmod(pos[j].x, pos[j].z);
				
				if(z){pos[j].y = z[4];}
				else if(coords.y){pos[j].y = coords.y;}
				else{pos[j].y = TR3.zMed;}
			}
			pos.push(pos[1]);
			pos.shift();
			
            geomFeat.setFromPoints( pos );
			
			var material = new THREE.LineBasicMaterial({
				color: thisStyle.color
			});
			
			feat = new THREE.LineLoop( geomFeat, material );
		}else if(type == "Point"){
			geomFeat.setFromPoints( coords );
			var sizeP = TR3.getSizePix()*50;

			var material = new THREE.PointsMaterial( {/*map:texture*/ 
				color: thisStyle.color, 
				size: sizeP
			} );

			feat = new THREE.Points( geomFeat, material );
		}else if(type == 'Poligon'){
			geomFeat.setFromPoints( coords );
			var material = new THREE.LineBasicMaterial({
				color: thisStyle.color
			});
			
			feat = new THREE.LineLoop( geomFeat, material );
		}else{
			geomFeat.setFromPoints( coords );
			var material = new THREE.LineBasicMaterial({
				color: thisStyle.color
			});
			
			feat = new THREE.Line( geomFeat, material );
		}
		
		if(vItem){
			feat.reload = vItem.reload || false; //borrar y redibujar
			feat.magni = TR3.valuesSet.magnification;
			TR3.vGeom.item.unshift(feat);
		}
		
		return feat;
	};
	
	TR3.makeMeshFeat = function( geom, type, style, vItem ){
		//var geomFeat;
		var feat;
		
		var sColor = new THREE.Color( 0xffffff );
		sColor.setHex( Math.random() * 0xffffff );
		
		var thisStyle = new Array;
		thisStyle.color =  style.color || sColor;
		thisStyle.side = style.side || THREE.DoubleSide ;
		thisStyle.transparent = style.transparent || false;
		thisStyle.wireframe = style.wireframe || false;
		thisStyle.opacity = style.opacity || 1;
		
		var material = new THREE.MeshBasicMaterial( {/*map:texture*/ 
			color: thisStyle.color, 
			side: thisStyle.side,
			transparent: thisStyle.transparent,
			wireframe: thisStyle.wireframe,
			opacity: thisStyle.opacity
		} );
		
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
		if(type == 'Basic'){
			feat = new THREE.Mesh( geom, material );
		}
		
		if(vItem){
			feat.reload = vItem.reload || false; //borrar y redibujar
			feat.magni = TR3.valuesSet.magnification;
			TR3.vGeom.item.unshift(feat);
		}
		
		return feat;
	};
	
	TR3.getLookAt = function(){
		
		var TGT = TR3.getIntersect()[0].point;
		var CPS = TR3.camera.position.clone();
		 
		return [TGT.x,TGT.y,TGT.z,CPS.x,CPS.y,CPS.z];
	};
	
	TR3.setLookAtini = function(lookPCTh, lookPCTv){
		var radianFOV = TR3.fov*2*Math.PI/360;
		var zone = TR3.zone;
		var zoom=TR3.tPixMesh;
		
		/*<--POSITIONS-->*/
		//x,y,z --> x,z,-y OrbitalMoves theta polar
		var cameraPositionFar = Math.cos(radianFOV/2)*(zone[3] - zone[1])/(2*Math.sin(radianFOV/2));

		var Xcenter = ( zone[2] + zone[0] )/2;
		var Ycenter = 0;
		var Zcenter = -( zone[3] + zone[1] )/2;
		
		if(typeof(lookPCTh)!='number' || isNaN(lookPCTh) || lookPCTh<5){lookPCTh=100;}
		if(typeof(lookPCTv)!='number' || isNaN(lookPCTv) || lookPCTv<0){lookPCTv=4;}
		var camZ = cameraPositionFar/lookPCTv;
		var dist3D = TR3.getCoordsDistance3D([Xcenter,Zcenter,Ycenter] ,[zone[2],-zone[1],camZ]);
		
		/*var camX = zone[2]+0/100*dist3D;
		var camY = TR3.rectaValue(Xcenter, Zcenter, zone[2], -zone[1], camX);*/
		
		var camPOS = TR3.rectaValue3D( Xcenter,Zcenter,Ycenter, zone[2],-zone[1],camZ , Xcenter+lookPCTh/100*dist3D )

		TR3.setLookAt([Xcenter,Ycenter,Zcenter ,camPOS[0],camZ,camPOS[1]]);
	}
	
	TR3.setLookAt = function(lookAt, newMap){
		var destiPos = { x:lookAt[3], y:lookAt[4], z:lookAt[5] };
		var targetPos = new THREE.Vector3( lookAt[0], lookAt[1], lookAt[2] );
		
		if( lookAt[0] < TR3.bboxImgOri[0] || lookAt[0] > TR3.bboxImgOri[2] ){
			targetPos = new THREE.Vector3( (TR3.bboxImgOri[0] + TR3.bboxImgOri[2])/2, 0, -(TR3.bboxImgOri[1] + TR3.bboxImgOri[3])/2 );
		}
		/*TR3.camera.position.set ( TR3.CPS.x, TR3.CPS.y, TR3.CPS.z );
		TR3.controls.target.set( TR3.TGT.x, TR3.TGT.y, TR3.TGT.z );*/
		
		new TWEEN.Tween( TR3.camera.position ) //https://github.com/tweenjs/es6-tween
				.to( destiPos , 2000 )
				.easing( TWEEN.Easing.Linear )
				.on('start', function(){
					TR3.controls.target = targetPos;
					TR3.controls.update();
					TR3.lookAt = false;
				})
				.on('complete', function(){
					TR3.mesh.rotation.z = 0;
					TR3.CameraMoveEvEnd();
					if( newMap && !TR3.config.unic ){
						IIIkel.AFs.skinMap.setCenterMap( newMap.pos ); 
						if(newMap.lyr)
							IIIkel.AFs.skinMap.setVisibleLayer( IIIkel.AFs.skinMap.getLayersByName( newMap.lyr )[0], true );
					}
				})
				.start();
	};
	
	TR3.goScenes = function( SCN ){
		var scn = SCN || TR3.config.actual.loc;
		TR3.config.lookAt = scn.look;
		TR3.setLookAt( TR3.config.lookAt, scn );
		TR3.setOpts({autoRotate:true});
	};
	
	TR3.oscillator = function(time, frequency, amplitude, phase, offset){
		return Math.sin(time * frequency * Math.PI * 2 + phase * Math.PI * 2) * amplitude + offset; 
	};
	
	/*TR3.progress = function() {
		var interval = setInterval(function() {
			
			//loadingTerrain.innerHTML = 'Loading features: '+TR3.prog.countFull+'/'+TR3.prog.index+' '+TR3.prog.index*100/TR3.prog.countFull+'%';

			if (TR3.prog.index == TR3.prog.countFull-1)
				clearInterval(interval);
		}, 3000);
	};*/	'use strict';
	TR3.makeWorld = function( imgOri ){
		
		if(typeof(imgOri) == 'object'){
			TR3.makeObjects(imgOri);
		}else{
			var imgOriUper = imgOri.toUpperCase();
			if(imgOriUper.indexOf('HTTP://')==-1){
				TR3.obtainImageFromID(imgOri);
			}else{
				TR3.obtainImageFromPath(imgOri);
			}
		}
	};
	
	TR3.obtainImageFromPath = function(image){
	
		var imgConteint = new Image();
		var trying = 5;
		imgConteint.onload = function() {
		
			TR3.makeObjects(imgConteint);
		};
		
		imgConteint.onerror = function() {
			
			if(trying>=0){
				imgConteint.src = image;
				trying--;
			}else{
				alert("can not load image correctly");
				TR3.loadingDiv.style.display='none';
			}
		};
		imgConteint.crossOrigin="anonymus";
		imgConteint.src = image;
	};
	
	TR3.obtainImageFromID = function(image){
		
		//var imgConteint = new Image();
		var imgConteint = document.getElementById(image);
		//var context = canvas.getContext('2d');
		//imgConteint.src = canvas.toDataURL();
		TR3.makeObjects(imgConteint);
	};
	
	TR3.makeScene = function(){
	
		var radianFOV = TR3.fov*2*Math.PI/360;
		var zone = TR3.zone;
		//TR3.controls.autoRotate = false;
		var zoom=TR3.tPixMesh;
		var val = TR3.rectaValue(7000,20000,55,350,zoom);
		if( val<50 ){ val=50 };
		TR3.controls.keyPanSpeed = val;
		TR3.controls.enableKeys = false;
		TR3.controls.maxPolarAngle = Math.PI/2;
		TR3.moveKey.walk = false;
		
		/*<--POSITIONS-->*/
		//x,y,z --> x,z,-y OrbitalMoves theta polar
		var cameraPositionFar = Math.cos(radianFOV/2)*(zone[3] - zone[1])/(2*Math.sin(radianFOV/2));
		/*if(cameraPositionY < TR3.zMax*TR3.valuesSet.magnification)
			cameraPositionY = TR3.zMax*TR3.valuesSet.magnification+100;*/
		var Xcenter = ( zone[2] + zone[0] )/2;
		var Ycenter = 0;
		var Zcenter = -( zone[3] + zone[1] )/2;
		
		TR3.camera.position.set( Xcenter, cameraPositionFar, Zcenter );
		//TR3.camera.position.set( zone[2], cameraPositionFar, -zone[1] );
		TR3.startPos = {x:TR3.camera.position.x, y:TR3.camera.position.y, z:TR3.camera.position.z};
		
		/*TR3.directionalLight.position.set( Xcenter, cameraPositionFar, Zcenter );
		TR3.directionalLight.target.position.set( Xcenter, 0, Zcenter );
		TR3.directionalLight.distance = 2*cameraPositionFar;
		TR3.directionalLight.angle = 1;*/
		
		TR3.mesh.rotation.x = 3*Math.PI/2;
		TR3.mesh.position.set( Xcenter, Ycenter, Zcenter );
		
		//TR3.starField.position.set( Xcenter, Ycenter, Zcenter );
		//TR3.sun.position.set( Xcenter, 200000, Zcenter );
		//TR3.moon.position.set( Xcenter, 100000, Zcenter );
		
		TR3.txtObject('N',"#888888",30000,[Xcenter, 200000, Zcenter-1300000],0);
		TR3.txtObject('S',"#888888",30000,[Xcenter, 200000, Zcenter+1300000],Math.PI);
		TR3.txtObject('E',"#888888",30000,[Xcenter+1300000, 200000, Zcenter],-Math.PI/2);
		TR3.txtObject('W',"#888888",30000,[Xcenter-1300000, 200000, Zcenter],Math.PI/2);
		
		/*Set Center Movements*/
		TR3.controls.target.set( Xcenter, 0, Zcenter);
		/*<--POSITIONS-->*/
		
		/*updateProjectionMatrix - PETA EL CURSOR*/
		TR3.camera.near = 1;//TR3.camera.position.y-zMax*TR3.valuesSet.magnification;
		TR3.camera.far = 5000000;//TR3.camera.position.y-zMin*TR3.valuesSet.magnification;
		TR3.camera.fov = TR3.fov;
		
		TR3.zeroParallax = cameraPositionFar;
		
		TR3.cursor.helper.scale.set(1,1,1);
		
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
	
	TR3.initSky = function(Xcenter, Ycenter, Zcenter) {

		// Add Sky
		var sky = TR3.scene.getObjectByName( "Sky" );
		sky.scale.setScalar( 45000000000 );
		sky.position.set( Xcenter, Ycenter, Zcenter );
		sky.rotation.y = Math.PI/2;
	
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
			uniforms[ "turbidity" ].value = effectController.turbidity;
			uniforms[ "rayleigh" ].value = effectController.rayleigh;
			uniforms[ "mieCoefficient" ].value = effectController.mieCoefficient;
			uniforms[ "mieDirectionalG" ].value = effectController.mieDirectionalG;
	
			var theta = Math.PI * -( effectController.inclination - 0.5 );
			var phi = 2 * Math.PI * -( effectController.azimuth - 0.5 );
	
			sun.x = Math.cos( phi );
			sun.y = Math.sin( phi ) * Math.sin( theta );
			sun.z = Math.sin( phi ) * Math.cos( theta );
	
			uniforms[ "sunPosition" ].value.copy( sun );
	
			TR3.renderer.toneMappingExposure = effectController.exposure;
			TR3.renderer.render( TR3.scene, TR3.camera );
	
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
	
	TR3.makeObjects = function(imgConteint){
		
		TR3.widthImg = /*imgConteint.naturalWidth ||*/ imgConteint.width;
		TR3.heightImg = /*imgConteint.naturalHeight ||*/ imgConteint.height;
		
		var zone = TR3.zone;
		
		/*Texture-Material*/
		var texture = new THREE.Texture( imgConteint );
		texture.needsUpdate = true;
		texture.minFilter = THREE.LinearFilter;
		var material = new THREE.MeshBasicMaterial( { map: texture } );/*MeshPhongMaterial*/
		
		/*Reduction Mesh*/
		var pct = 89;
		do{
			pct += 1;
			TR3.reducMesh = 1-(pct/100);
			TR3.reducMeshW = Math.round( TR3.widthImg*TR3.reducMesh );
			TR3.reducMeshH = Math.round( TR3.heightImg*TR3.reducMesh );
		}while(TR3.getSizePix()/TR3.reducMesh<TR3.maxResolMesh);
		
		TR3.tPixImg = TR3.getSizePix();
		TR3.tPixMesh = TR3.tPixImg/TR3.reducMesh;
		
		/*Image-Mesh*/
		var geometry = new THREE.PlaneBufferGeometry( zone[2] - zone[0], zone[3] - zone[1], TR3.reducMeshW, TR3.reducMeshH );
		//geometry.applyMatrix4( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );
		TR3.mesh = new THREE.Mesh( geometry, material );
		//TR3.mesh.castShadow = true;
		//TR3.mesh.receiveShadow = true;
		TR3.mesh.geometry.dynamic = true;
		TR3.mesh.name = "mesh3d";
		TR3.scene.add(TR3.mesh);
		
		/*Planetary*/
		var moonMat = new THREE.MeshPhongMaterial({//http://threegraphs.com/charts/sample/world/
			//ambient : 0x444444,
			color : 0x777777,
			shininess : 40, 
			specular : 0x222222,
			flatShading : THREE.SmoothShading,
			side: THREE.DoubleSide,
			/*map:matDif,
			bumpMap:mapBump,
			bumpScale: 10*/
		});
		var moonGeometry = new THREE.IcosahedronGeometry(30000, 3);
		//var moonMaterial = new THREE.MeshBasicMaterial({color: "#ffffff"});
		var moon = new THREE.Mesh(moonGeometry, moonMat);
		TR3.scene.add(moon);
		TR3.moon = moon;

		/*var sunGeometry = new THREE.IcosahedronGeometry(100000, 3);
		var sunMaterial = new THREE.MeshPhongMaterial({//http://threegraphs.com/charts/sample/world/
			//ambient : 0x444444,
			color : 0xaaaa5d,
			shininess : 40, 
			specular : 0x222222,
			flatShading : THREE.SmoothShading,
			side: THREE.DoubleSide,
			//map:matDif,
			//bumpMap:mapBump,
			//bumpScale: 10
		});
		var sun = new THREE.Mesh(sunGeometry, sunMaterial);
		TR3.scene.add(sun);
		TR3.sun = sun;
		
		var starsGeometry = new THREE.BufferGeometry();//http://blog.cjgammon.com/threejs-geometry
		var stars = [];
		for ( var i = 0; i < 250; i ++ ) {
	
			var star = new THREE.Vector3();
			var radius = 2000000;
			var lon = THREE.Math.randFloat( 0, 2*Math.PI );
			var lat = THREE.Math.randFloat( -Math.PI/2, Math.PI/2 );
			
			star.x = radius*Math.sin(lon)*Math.cos(lat);
			star.y = radius*Math.sin(lon)*Math.sin(lat);
			star.z = radius*Math.cos(lon);
			stars.push(star);
	
		}

		starsGeometry.setFromPoints( stars );
		var starsMaterial = new THREE.PointsMaterial( { color: '#888888', size: 10000 } );
		TR3.starField = new THREE.Points( starsGeometry, starsMaterial );
		TR3.starField.rotation.x = Math.PI/2;
		TR3.scene.add( TR3.starField );*/
		
		/*Geometry Cursor3d*/
		var reducPointer = 50;
		var geometry = new THREE.CylinderGeometry( (zone[2] - zone[0])/(4*reducPointer), 0, (zone[2] - zone[0])/reducPointer, 3 );
		geometry.applyMatrix4( new THREE.Matrix4().makeTranslation( 0, (zone[2] - zone[0])/(2*reducPointer), 0 ) );
		//geometry.applyMatrix4( new THREE.Matrix4().makeRotationX( Math.PI / 2 ) );
		TR3.cursor.helper = new THREE.Mesh( geometry, new THREE.MeshNormalMaterial() );
		TR3.cursor.helper.name = 'cursor';
		TR3.cursor.helper.visible = false;
		//var shadowHelper = TR3.setShadowBase( TR3.cursor.helper );
		//TR3.cursor.helper.hideShadowBase();
		
		//TR3.scene.add( shadowHelper );
		TR3.scene.add( TR3.cursor.helper );
		
		TR3.quaternion = new THREE.Quaternion();
		
		TR3.makeScene();
		/*Add Z values to Mesh*/
		TR3.makeZmesh();
	};
	
	TR3.cvsDesty = function(){
		var canvasDest = document.getElementById("canvasDest");
		if(canvasDest){canvasDest.remove();}
		
		var canvasDest = TR3.canvasDest;
		if(!canvasDest){
			canvasDest = document.createElement('CANVAS');
			canvasDest.id = 'canvasDest';
			if(!TR3.config.unic){
				canvasDest.style.position = 'absolute';
				canvasDest.style.top = '0px';
				canvasDest.style.left = '0px';
			}
			//canvasDest.setAttribute("width", TR3.canvasDestW);
			//canvasDest.setAttribute("height", TR3.canvasDestH);
	
			TR3.map.insertAdjacentElement('afterbegin',canvasDest);
		}else{
			//canvasDest.style.width = '100%';
			//canvasDest.style.height = '100%';
		}
		
		return canvasDest;
	};
	
	TR3.divLoading = function(){
		/*Cursor3d*/
		var infoGeo3d = document.getElementById('infoGeo3d');
		if(!infoGeo3d){
			infoGeo3d = document.createElement('div');
			infoGeo3d.id = "infoGeo3d";
			infoGeo3d.style.position = "absolute";
			infoGeo3d.style.fontSize = "10px";
			infoGeo3d.style.margin = "25px";
			infoGeo3d.style.backgroundColor = "#fff";
			infoGeo3d.style.top = '10px';
			infoGeo3d.style.zIndex = '10';
			TR3.map.appendChild(infoGeo3d);
		}
		
		var loadingTerrain = TR3.loadingDiv;
		if(!loadingTerrain){
			loadingTerrain = document.createElement('div');
			loadingTerrain.id = 'loadingTerrain';
			loadingTerrain.style.position = "absolute";
			loadingTerrain.style.top = "0px";
			loadingTerrain.style.marginTop = TR3.canvasDestH/2 + "px";
			loadingTerrain.style.marginLeft = TR3.canvasDestW/2.5 + "px";
			loadingTerrain.style.fontSize = "15px";
			loadingTerrain.style.backgroundColor = "#bbb";
			loadingTerrain.style.border = 'solid';
			//loadingTerrain.style.zIndex = TR3.canvasDestZindex + 1;
			loadingTerrain.innerHTML  = '&nbsp;&nbsp;&nbsp;Loading ...&nbsp;&nbsp;&nbsp;';

			TR3.map.appendChild(loadingTerrain);
		}else{
			loadingTerrain.innerHTML  = '&nbsp;&nbsp;&nbsp;Loading ...&nbsp;&nbsp;&nbsp;';
			loadingTerrain.style.display = 'block';
		}
		TR3.loadingDiv = loadingTerrain;
	};
	
	TR3.divContainer = function(){
	
		if(typeof(TR3.map) != 'object'){
			TR3.map = document.getElementById(TR3.map);
		}
		
		TR3.canvasDestW = TR3.map.clientWidth || parseInt(TR3.map.style.width) || document.documentElement.offsetWidth;
		TR3.canvasDestH = TR3.map.clientHeight || parseInt(TR3.map.style.height) || document.documentElement.offsetHeight;
		//TR3.canvasDestZindex = 1000;
		//TR3.map.style.position='relative';
	};
	
	TR3.setImageMesh = function( imgConteint ){
		
		var texture = new THREE.Texture( imgConteint );
		texture.needsUpdate = true;
		texture.minFilter = THREE.LinearFilter;
		
		TR3.mesh.material.map = texture;
	};
	
	TR3.setMeshZone = function(){
	
		if(TR3.newMeshMap == 0 && TR3.widthImg){
			TR3.loadingDiv.style.display = 'block';
			TR3.makeScene();
		}
	};'use strict';
TR3.assignZmesh = function () {

	var arrayZ = TR3.arrayZ;
	var zMin = arrayZ[0];
	var zMax = arrayZ[0];

	for (var i = 0; i < arrayZ.length; i++) {
		if (arrayZ[i] < zMin) { zMin = arrayZ[i]; }
		if (arrayZ[i] > zMax) { zMax = arrayZ[i]; }
	}

	var zGreedH = TR3.reducMeshH + 1;
	var zGreedW = TR3.reducMeshW + 1;
	var posZ = Math.round(zGreedH / 2) * zGreedW + Math.round(zGreedW / 2);//F/2*C+C/2

	TR3.zMed = arrayZ[posZ];
	TR3.zMax = zMax;
	TR3.zMin = zMin;

	var pos = TR3.mesh.geometry.getAttribute("position");
	for (var i = 0; i < arrayZ.length; i++) {
		//zTerr0 = arrayZ[i];
		//zPix[i] = TR3.GetGeo2pix(zTerr0);
		//TR3.mesh.geometry.vertices[i].z = arrayZ[i]*TR3.valuesSet.magnification - TR3.zMed*TR3.valuesSet.magnification;//zPix[i]*TR3.valuesSet.magnification;
		//TR3.mesh.geometry.verticesNeedUpdate = true;
		pos.setZ(i, (arrayZ[i] - TR3.zMed) * TR3.valuesSet.magnification); //= (arrayZ[i] - TR3.zMed)*TR3.valuesSet.magnification
	}

	TR3.renderScene();

	pos.needsUpdate = true;
	TR3.mesh.geometry.computeVertexNormals();


	if (TR3.newMeshMap == 1) {
		TR3.onCompleteMap();
	} else {
		TR3.loadingDiv.style.display = 'none';
	}

};

TR3.obtainZmeshWCS = function (widthDTM, heightDTM, bboxDTM0, bboxDTM1, bboxDTM2, bboxDTM3, srsDTM) {
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

	TR3.requestDTMwcs.open('GET', 'https://servicios.idee.es/wcs-inspire/mdt?SERVICE=WCS&REQUEST=GetCoverage&VERSION=1.0.0&FORMAT=ArcGrid&CRS=' + srsDTM + '&BBOX=' + bboxDTM0 + ',' + bboxDTM1 + ',' + bboxDTM2 + ',' + bboxDTM3 + '&WIDTH=' + widthDTM + '&HEIGHT=' + heightDTM + '&COVERAGE=' + preName + posName);
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
			if (arrayZ.length < 100) {
				//alert("WCS no load, trying DTM alternative");
				TR3.errorDTMwcs(widthDTM, heightDTM, bboxDTM0, bboxDTM1, bboxDTM2, bboxDTM3, srsDTM);
			} else {
				for (var i = 0; i < lengthDTM; i++) {
					TR3.arrayZ[i] = evalZ = eval(arrayZ[i]);
					if (evalZ < -1000 || evalZ > 4000) {
						TR3.arrayZ[i] = 0;
					}
				}
				TR3.assignZmesh();
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
	setTimeout(function () { TR3.obtainZmeshWCS(widthDTM, heightDTM, bboxDTM0, bboxDTM1, bboxDTM2, bboxDTM3, srsDTM); }, 3000);
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

	var arrZ;
	var widthDTM = TR3.reducMeshW + 1;
	var heightDTM = TR3.reducMeshH + 1;

	var bboxDTM0 = eval(TR3.bboxImgOri[0]) - TR3.tPixMesh / 2;
	var bboxDTM1 = eval(TR3.bboxImgOri[1]) - TR3.tPixMesh / 2;
	var bboxDTM2 = eval(TR3.bboxImgOri[2]) + TR3.tPixMesh / 2;
	var bboxDTM3 = eval(TR3.bboxImgOri[3]) + TR3.tPixMesh / 2;
	var srsDTM = TR3.srsImg;
	TR3.arrayZ = [];

	arrZ = TR3.obtainZmeshWCS(widthDTM, heightDTM, bboxDTM0, bboxDTM1, bboxDTM2, bboxDTM3, srsDTM);
};

TR3.setMagniValues = function (magn) {

	var magniB4 = TR3.valuesSet.magnification;
	var magni;

	if (!isNaN(parseFloat(magn))) {
		TR3.valuesSet.magnification = Math.round(magn);
	} else {
		var zoom = TR3.tPixMesh;
		var magni = Math.round(TR3.rectaValue(7000, 11, 5, 1, zoom));

		var bigZ = Math.abs(TR3.zMax - TR3.zMin);
		var bigX = Math.abs(TR3.bboxImgOri[2] - TR3.bboxImgOri[0]);
		var bigY = Math.abs(TR3.bboxImgOri[3] - TR3.bboxImgOri[1]);
		var bigXY;

		if (bigX - bigY > 0) {
			bigXY = bigX;
		} else { bigXY = bigY; }

		if (bigXY / bigZ <= 25) { magni = magni / 4; }
		if (zoom < 90 || magni < 1) { magni = 1; }	//$('#magnificationSlider').slider("option", "min"
		if (magni > 15) { magni = 15; }			//$('#magnificationSlider').slider("option", "max"
		TR3.valuesSet.magnification = magni;
	}

	if (magniB4 != magn && TR3.newMeshMap == 0 && TR3.widthImg) {
		//document.getElementById('loadingTerrain').style.display = 'block';
		TR3.assignZmesh();
		TR3.assignZgeometries();
		TR3.newDraw = -1;
	}

	return TR3.valuesSet.magnification;
};