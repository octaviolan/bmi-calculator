//Seleccionar el tipo de sistema de medicion (metric o imperial)
document.querySelector(".radio").addEventListener("click", (e) => {
  const metricElement = document.getElementById('metric');
  const imperialElement = document.getElementById('imperial');
  const welcomeElement = document.querySelector('.welcome');
  const outputContainer = document.querySelector('.output-container');
  const inputTypeNumber = document.querySelectorAll("input[type='number']");

  if(e.target.value === 'metric' || e.target.value === 'imperial') {
    metricElement.style.display = e.target.value === 'metric' ? 'block' : 'none';
    imperialElement.style.display = e.target.value === 'imperial' ? 'block' : 'none';

    //Mostrar siempre seccion welcome y ocultar resultados bmi
    welcomeElement.style.display = 'block';
    outputContainer.style.display = 'none'

    //limpiar inputs
    for(input of inputTypeNumber) {
      console.log(input.value);
      input.value = '';
    }
  }
});

//Clase Units
class Units {
  constructor() {
    
  }
  getElements(type) {
    return [...document.querySelectorAll(`.input-${type}`)];
  }
  showBmi(bmi) {
    //Mostrar siempre seccion resultados y ocultar welcome
    document.querySelector('.welcome').style.display = 'none';
    document.querySelector('.output-container').style.display = 'flex';
    
    //Mostar bmi
    document.getElementById('bmi').textContent = bmi;

    //Clasificacion de resultados
    if(bmi < 18.5) {
      document.getElementById('classification').textContent = 'Underweight';
    } else if (bmi >= 18.5 && bmi < 24.9) {
      document.getElementById('classification').textContent = 'Healthy weight';
    } else if (bmi >= 25 && bmi < 29.9) {
      document.getElementById('classification').textContent = 'Overweight';
    } else if(bmi > 30){
      document.getElementById('classification').textContent = 'Obese';
    }    
  }

}

//Subclase metric
class Metric extends Units {
  constructor() {
    super();
    this.elements = this.getElements('metric');

    this.elements.forEach(element => {
      element.addEventListener('input', this.getBmiMetric.bind(this))
    })
    
  }
  getBmiMetric() {
    const [cm, kg] = this.elements;
    if(cm.value !== '' && kg.value !== '') {
      const bmiMetric = kg.value / Math.pow((cm.value / 100), 2)
      const bmiMetricFixed = bmiMetric.toFixed(1);
      console.log({cm: cm.value, kg: kg.value, bmiMetric: bmiMetric.toFixed(1)});
      this.showBmi(bmiMetricFixed);
    }
  }
}

//Subclase Imperial
class Imperial extends Units {
  constructor() {
    super();
    this.elements = this.getElements('imperial');
  
  }
}

//Instancias
const metric = new Metric();
const imperial = new Imperial();

