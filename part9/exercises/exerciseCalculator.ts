interface Report {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (hoursArr: Array<number>, target: number) : Report => {
  const trainingDays: number = hoursArr.reduce((total: number, day: number): number => {
    if (day > 0) {
      return total + 1;
    } else {
      return total;
    }
  }, 0)

  const getSuccess = () : boolean => {
    let success: boolean = true;
    hoursArr.forEach(h => {
      if (h < target) {
        success = false;
      }
    })
    return success;
  }

  const getAverage = () : number => {
    return hoursArr.reduce((t, d) => t + d) / hoursArr.length
  }

  const getRating = () : number => {
    if (!getSuccess()) {
      return 1
    } else if (getAverage() <= target + 1) {
      return 2
    } else {return 3}
  }

  const getRatingDescription = () : string => {
    switch (getRating()) {
      case 1:
        return 'didnt meet target'
      case 2:
        return 'met target exactly'
      case 3:
        return 'exceeded target'
      default:
        return 'wrong data'
    }
  }

  return {
    periodLength: hoursArr.length,
    trainingDays: trainingDays,
    success: getSuccess(),
    rating: getRating(),
    ratingDescription: getRatingDescription(),
    target: target,
    average: getAverage()
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));