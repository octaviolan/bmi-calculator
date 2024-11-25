//Seleccionar el tipo de sistema de medicion (metric o imperial)
document.querySelector(".radio").addEventListener("click", (e) => {
  //Acceder a los elementos del DOM
  const metricElement = document.getElementById("metric");
  const imperialElement = document.getElementById("imperial");
  const welcomeElement = document.querySelector(".welcome");
  const outputContainer = document.querySelector(".output-container");
  const inputTypeNumber = document.querySelectorAll("input[type='number']");

  //Condicional que muestra u oculta el contenedor metric o imperial
  if (e.target.value === "metric" || e.target.value === "imperial") {
    metricElement.style.display =
      e.target.value === "metric" ? "block" : "none";
    imperialElement.style.display =
      e.target.value === "imperial" ? "block" : "none";

    //Mostrar siempre seccion welcome y ocultar resultados bmi
    welcomeElement.style.display = "block";
    outputContainer.style.display = "none";

    //limpiar inputs
    for (input of inputTypeNumber) {
      input.value = "";
    }
  }
});

//Clase Units
class Units {
  constructor() {}
  getElements(type) {
    return [...document.querySelectorAll(`.input-${type}`)];
  }
  showBmi(bmi) {
    //Mostrar siempre seccion resultados y ocultar welcome
    document.querySelector(".welcome").style.display = "none";
    document.querySelector(".output-container").style.display = "flex";

    //Mostar bmi
    document.getElementById("bmi").textContent = bmi;
  }
  weightClassification(bmi) {
    //Clasificacion de resultados de acuerdo al BMI
    if (bmi > 30) {
      document.getElementById("classification").textContent = "Obese";
    } else if (bmi > 25) {
      document.getElementById("classification").textContent = "Overweight";
    } else if (bmi > 18.5) {
      document.getElementById("classification").textContent = "Healthy weight";
    } else if (bmi > 0) {
      document.getElementById("classification").textContent = "Underweight";
    }
  }
  healthyWeight(height, type) {
    //Bmi minimo y maximo
    const lowerBmi = 18.5;
    const upperBmi = 25;

    let lowerWeight, upperWeight;

    if (type === "metric") {
      //Formula que calcula el peso minimo y maximo para unidad metrico decimal
      const lowerWeightFormulaMetric = lowerBmi * Math.pow(height / 100, 2);
      const upperWeightFormulaMetric = upperBmi * Math.pow(height / 100, 2);

      //Peso ideal a 3 cifras significativas
      const lowerWeightFixed = lowerWeightFormulaMetric.toFixed(1);
      const upperWeightFixed = upperWeightFormulaMetric.toFixed(1);

      //Magnitud con su unidad de medida metric
      lowerWeight = `${lowerWeightFixed}kg`;
      upperWeight = `${upperWeightFixed}kg`;
    } else {
      //Convertir a libras con la formula sistema Imperial
      const lowerWeightFormulaImperial = (lowerBmi * height) / 703;
      const upperWeightFormulaImperial = (upperBmi * height) / 703;

      //Convertir a Stone
      const lowerStone = Math.floor(lowerWeightFormulaImperial / 14);
      const upperStone = Math.floor(upperWeightFormulaImperial / 14);

      //Convertir el resto a libras
      const lowerLbs = Math.floor(lowerWeightFormulaImperial % 14);
      const upperLbs = Math.floor(upperWeightFormulaImperial % 14);

      //Magnitud con su unidad de medida Imperial
      lowerWeight = `${lowerStone}st ${lowerLbs}lbs`;
      upperWeight = `${upperStone}st ${upperLbs}Lbs`;
    }

    //Mostar los resultados en el DOM
    document.getElementById(
      "range"
    ).textContent = `${lowerWeight} - ${upperWeight}`; //condicional ternario
  }
}

//Subclase metric
class Metric extends Units {
  constructor() {
    super();
    this.elements = this.getElements("metric");

    this.elements.forEach((element) => {
      element.addEventListener("input", this.getBmiMetric.bind(this));
    });
  }
  getBmiMetric() {
    const [cm, kg] = this.elements;

    if (this.elements.every((input) => input.value !== "")) {
      const bmiMetric = kg.value / Math.pow(cm.value / 100, 2);
      const bmiMetricFixed = bmiMetric.toFixed(1);

      this.showBmi(bmiMetricFixed);
      this.weightClassification(bmiMetricFixed);
      this.healthyWeight(cm.value, "metric");
    }
  }
}

//Subclase Imperial
class Imperial extends Units {
  constructor() {
    super();
    this.elements = this.getElements("imperial");

    this.elements.forEach((element) => {
      element.addEventListener("input", this.getBmiImperial.bind(this));
    });
  }
  getBmiImperial() {
    const [ft, pulg, st, lbs] = this.elements;

    if (this.elements.every((input) => input.value !== "")) {
      const heightImperial = Math.pow(
        Number(ft.value * 12) + Number(pulg.value),
        2
      );
      const bmiImperial =
        ((Number(st.value * 14) + Number(lbs.value)) * 703) / heightImperial;
      const bmiImperialFixed = bmiImperial.toFixed(1);

      this.showBmi(bmiImperialFixed);
      this.weightClassification(bmiImperialFixed);
      this.healthyWeight(heightImperial, "imperial");
    }
  }
}

//Instancias
const metric = new Metric();
const imperial = new Imperial();
