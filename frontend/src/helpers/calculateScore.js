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

export { successRate };
