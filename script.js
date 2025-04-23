const ctx = document.getElementById("entropyChart").getContext("2d");
let entropyData = [];
let timeData = [];
let time = 0; 

const entropyChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: timeData,
      datasets: [{
        label: "ΔS (Entropy)",
        data: entropyData,
        borderColor: "#2c3e50",
        fill: false,
      }]
    },
    options: {
      animation: false,
      scales: {
        x: { title: { display: true, text: "Time" }},
        y: { title: { display: true, text: "ΔS (Entropy)" }}
      }
    }
  });

  const gamma = 1;
  const instability = 0.6; 

  function updateGraph(){
    const C = parseFloat(document.getElementById("coherence").value);
    const O = parseFloat(document.getElementById("observation").value); 

    document.getElementById("cVal").textContent = C; 
    document.getElementById("oVal").textContent = O; 

    const deltaS = instability * (1 - C) + gamma * O; //entropy equation 

    entropyData.push(deltaS.toFixed(3)); 
    timeData.push(time++); 

    if (entropyData.length > 50){
        entropyData.shift(); 
        timeData.shift();
    }

    entropyChart.update(); 
  }

  setInterval(updateGraph, 500);