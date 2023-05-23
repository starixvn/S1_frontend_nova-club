const banners = [
  {
    image: 'cat-event-sea-game-banner.jpg',
    action: {
      type: 'internalRedirect',
      payload: {
        uri: '/event/sea-game-event-tnc',
        params: {
          locale: 'vn',
        },
      },
    },
    alt: 'seagames',
  },
  {
    image: 'luckywheel-banner-3.jpg',
    action: {
      type: 'downloadApp',
    },
    alt: 'free spin, download now',
  },
  {
    image: 'b1-agent-recruitment.jpg?v=2',
    action: {
      type: 'internalRedirect',
      payload: {
        uri: '/banner/agent-tnc',
        params: {
          locale: 'vn',
        },
      },
    },
    alt: 'join us now',
  },
  {
    image: 'b2.jpg',
    action: {
      type: 'livechat',
    },
    alt: 'contact us',
  },
  {
    image: 'b3-2.jpg',
    alt: "vui123"
  },
]

export default banners
