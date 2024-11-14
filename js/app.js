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
  constructor(type) {
    this.type = type;
    this.elementsAll = [...document.querySelectorAll(`.input-${type}`)];
  }
}

class Metric extends Units {
  constructor() {
    super();
    this.elements = new Units('metric').elementsAll;
    console.log(this.elements)
  }
}

class Imperial extends Units {
  constructor() {
    super();
    this.elements = new Units('imperial').elementsAll;
    console.log(this.elements)
  }
}

const metric = new Metric();
const imperial = new Imperial();

