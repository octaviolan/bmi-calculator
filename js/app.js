//Seleccionar el tipo de sistema de medicion (metric o imperial)
document.querySelector(".radio").addEventListener("click", (e) => {
  if(e.target.value === 'metric') {
    document.getElementById('metric').style.display = 'block';
    document.getElementById('imperial').style.display = 'none';
  } else if(e.target.value === 'imperial') {
    document.getElementById('metric').style.display = 'none';
    document.getElementById('imperial').style.display = 'block';
  } else {
    return;
  }
});

class Units {
  constructor() {
    
  }
  getElements(type) {
    return [...document.querySelectorAll(`.input-${type}`)];
  }
}

class Metric extends Units {
  constructor() {
    super();
    this.elements = this.getElements('metric');
    console.log(this.elements); 
  }
}

class Imperial extends Units {
  constructor() {
    super();
    this.elements = this.getElements('imperial');
    console.log(this.elements);
    
  }
}

const metric = new Metric();
const imperial = new Imperial();

