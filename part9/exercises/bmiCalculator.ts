
const calculateBmi = (height: number, weight: number): string => {
  const heightMeters: number = height / 100;

  const n: number = weight / (heightMeters * heightMeters)

  if (n < 16.0) {return 'Underweight (Severe thinness)'} else
  if (n >= 16.0 && n <= 16.9) {return 'Underweight (Moderate thinness)'} else
  if (n >= 17.0 && n <= 18.4) {return 'Underweight (Mild thinness)'} else
  if (n >= 18.5 && n <= 24.9) {return 'Normal (Healthy weight)'} else
  if (n >= 25.0 && n <= 29.9) {return 'Overweight (Pre-obese)'} else
  if (n >= 30.0 && n <= 34.9) {return 'Obese (Class I)'} else
  if (n >= 35.0 && n <= 39.9) {return 'Obese (Class II)'} else
  if (n >= 40.0) {return 'Obese (Class III)'}
}

console.log(calculateBmi(180, 74))