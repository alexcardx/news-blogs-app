export default async function handler(req, res) {
  const { category, q } = req.query;

  const url =
    `https://gnews.io/api/v4/top-headlines?` +
    `category=${category}&lang=en` +
    (q ? `&q=${q}` : ``) +
    `&apikey=${process.env.GNEWS_API_KEY}`;

  const r = await fetch(url);
  const data = await r.json();

  res.status(200).json(data);
}
