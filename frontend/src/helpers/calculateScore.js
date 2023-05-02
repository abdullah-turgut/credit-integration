function successRate(score) {
  if (score < 60) {
    return 'Yüksek Risk';
  } else if (score >= 60 && score < 80) {
    return 'Orta Risk';
  } else {
    return 'Düşük Risk';
  }
}

function preferOrder(field, job, score) {
  if (field === 'Üretim' && job === 'Takım Lideri') {
    return 2;
  } else if (score < 60) {
    return 5;
  } else if (score >= 60 && score < 70) {
    return 4;
  } else if (score >= 70 && score < 80) {
    return 3;
  } else if (score >= 80 && score < 90) {
    return 2;
  } else {
    return 1;
  }
}

export { successRate, preferOrder };
