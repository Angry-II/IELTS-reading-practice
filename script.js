const options = {
  A:"urban centres",
  B:"finance companies",
  C:"flexible",
  D:"tram line",
  E:"cosmopolitan",
  F:"service industries",
  G:"capital",
  H:"high-speed train",
  I:"infrastructure",
  J:"unskilled workers",
  K:"jobs",
  L:"medical-technology",
  M:"professionals",
  N:"European Union",
  O:"amenities",
  P:"middle-age",
  Q:"overtime",
  R:"university"
};

const correct = {
  q1: ["B","F","G"],
  q4: ["C","E","F"],
  q7:"F",
  q8:"R",
  q9:"G",
  q10:"H",
  q11:"O",
  q12:"M",
  q13:"C"
};


// đổ option vào dropdown
window.onload = () => {
  for(let i=7;i<=13;i++){
    let select = document.getElementById("q"+i);

    // option trắng mặc định
    let blank = document.createElement("option");
    blank.value = "";
    blank.text = " ";
    blank.selected = true;
    select.appendChild(blank);

    for (let key in options){
      let opt = document.createElement("option");
      opt.value = key;
      opt.text = key + " - " + options[key];
      select.appendChild(opt);
    }
  }
};

function save(){
  let data = {};

  data.q1 = [...document.querySelectorAll('input[name="q1"]:checked')].map(e=>e.value);
  data.q4 = [...document.querySelectorAll('input[name="q4"]:checked')].map(e=>e.value);

  for(let i=7;i<=13;i++){
    data["q"+i] = document.getElementById("q"+i).value;
  }

  localStorage.setItem("ielts_answers", JSON.stringify(data));
  alert("Answer saved");
}
let highlightMode = false;

function toggleHighlight(){
  highlightMode = !highlightMode;
  const btn = document.getElementById("highlightBtn");
  btn.innerText = highlightMode ? "Highlight: ON" : "Highlight Mode";
}

document.addEventListener("mouseup", function(){
  if(!highlightMode) return;

  const selection = window.getSelection();
  if(selection.isCollapsed) return;

  const range = selection.getRangeAt(0);
  const parent = range.commonAncestorContainer.parentNode;

  // Nếu đoạn đang nằm trong highlight thì remove
  if(parent.classList && parent.classList.contains("highlight")){
      parent.outerHTML = parent.innerHTML;
      selection.removeAllRanges();
      return;
  }

  // Tạo highlight mới
  const span = document.createElement("span");
  span.className = "highlight";

  try{
    span.appendChild(range.extractContents());
    range.insertNode(span);
  }catch(e){
    console.log("Highlight error:", e);
  }

  selection.removeAllRanges();
});
function check(){
  let score = 0;
  let total = 13;
  let output = "";

  const q1 = [...document.querySelectorAll('input[name="q1"]:checked')].map(e=>e.value).sort();
  const q4 = [...document.querySelectorAll('input[name="q4"]:checked')].map(e=>e.value).sort();

  if(JSON.stringify(q1) === JSON.stringify(correct.q1)){
    score += 3;
    output += "Questions 1–3: ✅ Correct<br>";
  } else output += "Questions 1–3: ❌ Wrong (Correct: B F G)<br>";

  if(JSON.stringify(q4) === JSON.stringify(correct.q4)){
    score += 3;
    output += "Questions 4–6: ✅ Correct<br>";
  } else output += "Questions 4–6: ❌ Wrong (Correct: C E F)<br>";

  for(let i=7;i<=13;i++){
    const val = document.getElementById("q"+i).value;
    if(val === correct["q"+i]){
      score++;
    } else {
      output += `Question ${i}: ❌ (Correct: ${correct["q"+i]})<br>`;
    }
  }

  output += `<br><b>Total Score: ${score}/13</b>`;
  document.getElementById("result").innerHTML = output;
}

