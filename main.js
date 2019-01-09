var deleteSVG = '<svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://web.resource.org/cc/" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" version="1.0" id="svg2" x="0px" y="0px" width="600px" height="600px" viewBox="0 0 600 600" enable-background="new 0 0 600 600" xml:space="preserve" sodipodi:version="0.32" inkscape:version="0.45.1" sodipodi:docname="Red_x.svg" inkscape:output_extension="org.inkscape.output.svg.inkscape" sodipodi:docbase="C:\Documents and Settings\KevinDuke\Desktop"><metadata id="metadata7"><rdf:RDF><cc:Work rdf:about=""><dc:format>image/svg+xml</dc:format><dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"/></cc:Work></rdf:RDF></metadata><defs id="defs5"/><sodipodi:namedview inkscape:window-height="573" inkscape:window-width="744" inkscape:pageshadow="2" inkscape:pageopacity="0.0" guidetolerance="10.0" gridtolerance="10.0" objecttolerance="10.0" borderopacity="1.0" bordercolor="#666666" pagecolor="#ffffff" id="base" inkscape:zoom="0.65666667" inkscape:cx="300" inkscape:cy="299.93054" inkscape:window-x="44" inkscape:window-y="58" inkscape:current-layer="svg2"/><path class="fill" id="X" d="M 9.8338399,496.17685 C 9.8338399,487.031 49.463818,441.11833 97.902797,394.14401 C 146.33877,347.1727 193.01835,301.56379 201.63487,292.79088 C 210.25139,284.01797 201.30104,233.09779 181.74921,179.63627 C 141.24104,68.884658 137.54781,32.054673 165.51165,17.681775 C 203.73111,-1.9602819 256.1791,27.059196 300.20907,92.204901 L 344.81347,158.20173 L 428.57567,89.83799 C 483.65223,44.887724 522.96642,24.86672 543.37539,31.377982 C 583.75424,44.265169 607.05945,94.686098 576.54223,103.14623 C 541.90472,112.7462 398.55169,294.16531 398.82537,328.05094 C 398.95469,344.09902 419.32156,386.6914 444.08842,422.70334 C 461.55905,448.10178 485.03869,468.14383 475.71841,481.92124 L 425.89297,555.56617 C 416.22984,569.84885 380.53368,531.76774 338.24807,494.80241 L 264.48585,430.32137 L 182.71462,510.96779 C 137.74029,555.32257 95.749419,591.38564 89.406578,591.10594 C 83.063736,590.82624 9.8338399,505.31968 9.8338399,496.17685 z "</svg>'

var doneSVG = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path class="fill" d="M0 12.116l2.053-1.897c2.401 1.162 3.924 2.045 6.622 3.969 5.073-5.757 8.426-8.678 14.657-12.555l.668 1.536c-5.139 4.484-8.902 9.479-14.321 19.198-3.343-3.936-5.574-6.446-9.679-10.251z"/></svg>'

var data = (localStorage.getItem('TasksList')) ? JSON.parse(localStorage.getItem('TasksList')):{
  tasks: [],
  finished: []
};

rendering();

console.log(data);

document.getElementById('add').addEventListener('click', function() {
  var value = document.getElementById('item').value;
  if (value) {
    itemAdd(value);
    document.getElementById('item').value='';
    data.tasks.push(value);
    saveData();
    }
  });

document.getElementById('item').addEventListener('keydown',function(e) {
  var value = this.value;
  if (e.code==='Enter'  && value) {
    addItem(value);
  }
});

function addItem (value){
  itemAdd(value);
  document.getElementById('item').value='';

  data.tasks.push(value);
  saveData();
}

function deleteItem() {
  var item = this.parentNode.parentNode;
  var parent = item.parentNode;
  var id = parent.id;
  var value = item.innerText;
  parent.removeChild(item);

  if (id === 'tasks') {
    data.tasks.splice(data.tasks.indexOf(value),1);
  }
  else {
    data.finished.splice(data.finished.indexOf(value),1);
  }
  saveData();
}

function doneItem() {
  var item = this.parentNode.parentNode;
  var parent = item.parentNode;
  var id = parent.id;
  var target;
  var value = item.innerText;

  if (id === 'tasks') {
    target = document.getElementById('finished');
    data.tasks.splice(data.tasks.indexOf(value),1);
    data.finished.push(value);
  }
  else {
    target = document.getElementById('tasks');
    data.finished.splice(data.finished.indexOf(value),1);
    data.tasks.push(value);
  }
  saveData();
  parent.removeChild(item);
  target.insertBefore(item, target.childNodes[0]);
}

// add item to the tasks list
function itemAdd(text,finished) {
  var list = (finished) ? document.getElementById('finished'):document.getElementById('tasks');

  // variable for items in html
  var item = document.createElement('li');
  item.innerText = text;

  // variable for buttons with specified class
  var buttons = document.createElement('div');
  buttons.classList.add('buttons');

  var remove = document.createElement('button');
  remove.classList.add('remove');
  remove.innerHTML = deleteSVG;
  remove.addEventListener('click', deleteItem);

  var done = document.createElement('button');
  done.classList.add('done');
  done.innerHTML = doneSVG;
  done.addEventListener('click',doneItem);

  buttons.appendChild(remove);
  buttons.appendChild(done);
  item.appendChild(buttons);
  list.insertBefore(item, list.childNodes[0]);
}

function saveData() {
  localStorage.setItem('TasksList',JSON.stringify(data));
}

function rendering() {
  if (!data.tasks.length && !data.finished.length) return;

  for (var i=0;i<data.tasks.length;i++) {
    var value = data.tasks[i];
  }
  for (var j=0;j<data.finished.length;j++) {
    var value = data.finished[j];
  }
}
