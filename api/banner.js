export default function handler(req, res) {
  const banners = [
    {
      name: "Kitasan Black Banner",
      image: "https://github.com/Penyoy/hor/blob/main/api/14de8482db93dba04f98a7992afd1c96.jpg",
      rate_up: ["Kitasan Black", "Satono Diamond"],
      end_date: "2026-06-01"
    },
    {
      name: "New Year Banner",
      image: "banner02.jpg",
      rate_up: ["Oguri Cap", "Gold Ship"],
      end_date: "2026-01-10"
    }
  ];

  res.status(200).json({
    status: true,
    data: banners
  });
    }
