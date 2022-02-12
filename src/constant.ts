// export const API_URL = "http://localhost:5000/api/v1";
export const API_URL = "https://netime.glitch.me/api/v1";

export const GENRES = [
  { slug: "hanh-dong", name: "Hành Động" },
  { slug: "vien-tuong", name: "Viễn Tưởng" },
  { slug: "lang-man", name: "Lãng Mạn" },
  { slug: "kinh-di", name: "Kinh Dị" },
  { slug: "vo-thuat", name: "Võ Thuật" },
  { slug: "hai-huoc", name: "Hài Hước" },
  { slug: "truong-hoc", name: "Trường Học" },
  { slug: "trinh-tham", name: "Trinh Thám" },
  { slug: "am-nhac", name: "Âm Nhạc" },
  { slug: "phieu-luu", name: "Phiêu Lưu" },
  { slug: "sieu-nhien", name: "Siêu Nhiên" },
  { slug: "doi-thuong", name: "Đời Thường" },
  { slug: "gia-tuong", name: "Giả Tưởng" },
  { slug: "robot", name: "Robot" },
  { slug: "game", name: "Game" },
  { slug: "the-thao", name: "Thể Thao" },
  { slug: "kich-tinh", name: "Kịch Tính" },
];

export const RANKINGS = [
  {
    slug: "ngay",
    name: "Top Ngày",
  },
  {
    slug: "tuan",
    name: "Top tuần",
  },
  {
    slug: "thang",
    name: "Top tháng",
  },
  {
    slug: "nam",
    name: "Top năm",
  },
];

export const YEARS = () => {
  let arr = [];
  for (let i = 1; i <= 13; i++) {
    arr.push(2009 + i);
  }
  return arr;
};
