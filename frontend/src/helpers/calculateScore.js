function successRate(PS, SS, ES) {
  let year = new Date().getFullYear();
  let score = PS * 0.4 + SS * 0.5 - Number(year - ES) * 0.1;

  if (score < 60) {
    return 'Yüksek Risk';
  } else if (score >= 60 && score < 80) {
    return 'Orta Risk';
  } else {
    return 'Düşük Risk';
  }
}

function preferOrder(field, job, PS, SS, ES) {
  let year = new Date().getFullYear();
  let score = PS * 0.4 + SS * 0.5 - Number(year - ES) * 0.1;

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
