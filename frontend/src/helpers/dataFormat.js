function formatData(arr) {
  const options = {
    year: 'numeric',
  };
  return arr
    .map((entry) => entry.answers)
    .map((answer) => {
      return {
        startYear: Math.trunc(
          new Date(answer[0].date).toLocaleDateString('tr', options)
        ),
        education: answer[1].text,
        field: answer[2].text,
        job: answer[3].text,
      };
    });
}

export { formatData };
