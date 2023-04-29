import { nanoid } from 'nanoid';

function formatData(arr) {
  return arr.map((item) => {
    return {
      user_id: item['#'],
      username: item['İsim Soyisim'],
      job: item['Hangi Pozisyonda Çalışıyorsun?'],
      field: item['Sektör'],
      education: item['Son Mezuniyet'],
      startYear: item['Çalışmaya ilk başladığın yıl nedir?'],
      PS: item['PS'],
      SS: item['SectorScore'],
      creditScore:
        item['PS'] * 0.4 +
        item['SectorScore'] * 0.5 -
        (2023 - Number(item['Çalışmaya ilk başladığın yıl nedir?'])) * 0.1,
    };
  });
}

export { formatData };
