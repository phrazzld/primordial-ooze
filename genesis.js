// cellular automata
// define genesis conditions
// watch dumb simplicity transform into grand complexity

// mvp: run rule 30 slow

// define genesis conditions
var genesisConditions = {
  "from111": false,
  "from110": false,
  "from101": false,
  "from100": true,
  "from011": true,
  "from010": true,
  "from001": true,
  "from000": false
}

// define function to write a generation of cells to a row in html
var spawnRow = function (cells) {
  var generation = document.createElement("p")
  cells.forEach(function (cell) {
    var member = document.createTextNode("#")
    var memberType = document.createElement("span")
    if (!cell) { memberType.className = "empty" }
    memberType.appendChild(member)
    generation.appendChild(memberType)
  })
  document.getElementById("spawn-pool").appendChild(generation)
}

// define function to set genesis conditions from form values
var setGenesisConditions = function () {
  genesisConditions.from111 = document.getElementById("from111").checked
  genesisConditions.from110 = document.getElementById("from110").checked
  genesisConditions.from101 = document.getElementById("from101").checked
  genesisConditions.from100 = document.getElementById("from100").checked
  genesisConditions.from011 = document.getElementById("from011").checked
  genesisConditions.from010 = document.getElementById("from010").checked
  genesisConditions.from001 = document.getElementById("from001").checked
  genesisConditions.from000 = document.getElementById("from000").checked
}

// spawn first cell, regardless of genesis conditions
var abiogenesis = function () {
  spawnRow([true])
}

// spawn n generations
var spawnGenerations = function (n) {
  abiogenesis()
  var lastGen = [true]
  for (var i = 0; i < n; i++) {
    var thisGen = spawnGeneration(lastGen)
    lastGen = thisGen
  }
}

var idParents = function (parents) {
  var a = parents[0]
  var b = parents[1]
  var c = parents[2]
  var parentType = ""
  // go through genesis conditions
  if      ( a &&  b &&  c) { return "from111" }
  else if ( a &&  b && !c) { return "from110" }
  else if ( a && !b &&  c) { return "from101" }
  else if (!a &&  b &&  c) { return "from011" }
  else if ( a && !b && !c) { return "from100" }
  else if (!a &&  b && !c) { return "from010" }
  else if (!a && !b &&  c) { return "from001" }
  else                     { return "from000" }
}

// look at last generation to make this one
var spawnGeneration = function (lastGen) {
  console.log("in spawnGeneration, lastGen: " + lastGen)
  // stub thisGen
  var thisGen = []
  // pad lastGen
  lastGen.unshift(false, false)
  lastGen.push(false, false)
  console.log("lastGen, post unshift and push: " + lastGen)
  for (var i = 0; i < lastGen.length-2; i++) {
    // id parents
    var parents = []
    parents.push(lastGen[i], lastGen[i+1], lastGen[i+2])
    console.log("i: " + i)
    console.log("parents: " + parents)
    var parentType = idParents(parents)
    console.log("parentType: " + parentType)
    // push to thisGen, based on genesis conditions
    thisGen.push(genesisConditions[parentType])
    console.log("thisGen, post-push: " + thisGen)
  }
  // display
  spawnRow(thisGen)
  return thisGen
}

var form = document.getElementById("genesis")
form.addEventListener("submit", function (event) {
  event.preventDefault()
  setGenesisConditions()
  spawnGenerations(20) // spawn 20 generations
})
