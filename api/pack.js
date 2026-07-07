// api/videos.js

const videos = [
  {
    id: 1,
    title: "Video 1",
    url: "https://example.com/video.mp4"
  },
  {
    id: 2,
    title: "Video 2",
    url: "https://example.com/video2.mp4"
  }
];

export default function handler(req, res) {
  res.status(200).json(videos);
}
