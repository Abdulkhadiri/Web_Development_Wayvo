export default async function handler(req, res) {
    const resu = await fetch('https://whiskyhunter.net/api/auctions_data');
    const data = await resu.json();
    const filteredData = data.map(item => ({
      dt: item.dt,
      auction_lots_count: item.auction_lots_count,
      all_auctions_lots_count: item.all_auctions_lots_count,
      auction_name: item.auction_name,
    }));
    res.status(200).json(filteredData);
  }