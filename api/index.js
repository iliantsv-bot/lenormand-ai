export default async function handler(req, res) {
  try {
    const spreads = {
      "1": 1,
      "3": 3,
      "5": 5,
      "mirror": 3,
      "yesno": 1,
      "full": 5
    };

    const spread = req.query.spread || "3";
    const count = spreads[spread] || 3;

    const cardsList = [
      "Rider","Clover","Ship","House","Tree","Clouds","Snake","Coffin",
      "Bouquet","Scythe","Whip","Birds","Child","Fox","Bear","Stars",
      "Stork","Dog","Tower","Garden","Mountain","Crossroads","Mice",
      "Heart","
