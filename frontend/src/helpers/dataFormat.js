function formatData(arr) {
  // return arr
  //   .map((item) => {
  //     return {
  //       user_id: item['#'],
  //       username: item['İsim Soyisim'],
  //       job: item['Hangi Pozisyonda Çalışıyorsun?'],
  //       field: item['Sektör'],
  //       education: item['Son Mezuniyet'],
  //       startYear: item['Çalışmaya ilk başladığın yıl nedir?'],
  //       PS: item['PS'],
  //       SS: item['SectorScore'],
  //       creditScore: (
  //         item['PS'] * 0.4 +
  //         item['SectorScore'] * 0.5 -
  //         (2023 - Number(item['Çalışmaya ilk başladığın yıl nedir?'])) * 0.1
  //       ).toFixed(1),
  //     };
  //   })
  //   .filter((item) => item.startYear >= 2015 && item.education !== 'Lise');
  return arr
    .map((entry) => {
      return {
        ...entry,
        creditScore: Number(
          (
            entry.PS * 0.4 +
            entry.sectorScore * 0.5 -
            (new Date().getFullYear() - entry.startYear) * 0.1
          ).toFixed(1)
        ),
      };
    })
    .filter((item) => item.startYear >= 2015 && item.education !== 'Lise');
}

export { formatData };
