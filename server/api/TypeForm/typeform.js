const router = require('express').Router();
const axios = require('axios');

router.get('/responses', (req, res) => {
  const formId = 'X8EgMpWd';
  const accessToken =
    'tfp_BdF92AGMJtpnSjw95c3gDmGa6KbWvS6DYJE6HtKDGjY5_3paaWFAe864boV';

  const url = `https://api.typeform.com/forms/${formId}/responses`;

  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  axios
    .get(url, { headers })
    .then((response) => {
      res.json(response.data.items);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send('Internal Server Error');
    });
});

module.exports = router;
