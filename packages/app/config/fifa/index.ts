import { CONTENT_URI, MEDIA_DOMAIN } from '@env'

const enum FIFA_TEAMS {
  Uruguay = 152,
  Tunisia = 169,
  Croatia = 171,
  Poland = 172,
  Denmark = 175,
  Netherlands = 178,
  Portugal = 182,
  England = 184,
  USA = 191,
  Japan = 217,
  Switzerland = 235,
  Germany = 238,
  Spain = 250,
  Belgium = 254,
  Canada = 264,
  Cameroon = 269,
  Morocco = 748,
  Iran = 818,
  France = 928,
  Ghana = 1064,
  Senegal = 1262,
  Qatar = 1922,
  SaudiArabia = 2133,
  Ecuador = 2793,
  Australia = 3397,
  Wales = 7078,
  Serbia = 7804,
  KoreaRepublic = 9917,
  CostaRica = 12055,
  Brazil = 18955,
  Argentina = 18956,
  Mexico = 18958,
}

type FIFA_TEAMS_ID =
  | 152
  | 169
  | 171
  | 172
  | 175
  | 178
  | 182
  | 184
  | 191
  | 217
  | 235
  | 238
  | 250
  | 254
  | 264
  | 269
  | 748
  | 818
  | 928
  | 1064
  | 1262
  | 1922
  | 2133
  | 2793
  | 3397
  | 7078
  | 7804
  | 9917
  | 12055
  | 18955
  | 18956
  | 18958

export const FifaTeam: { [key in FIFA_TEAMS_ID]: string } = {
  152: `${MEDIA_DOMAIN}/${CONTENT_URI}/fifa/152.png`,
  169: `${MEDIA_DOMAIN}/${CONTENT_URI}/fifa/169.png`,
  171: `${MEDIA_DOMAIN}/${CONTENT_URI}/fifa/171.png`,
  172: `${MEDIA_DOMAIN}/${CONTENT_URI}/fifa/172.png`,
  175: `${MEDIA_DOMAIN}/${CONTENT_URI}/fifa/175.png`,
  178: `${MEDIA_DOMAIN}/${CONTENT_URI}/fifa/178.png`,
  182: `${MEDIA_DOMAIN}/${CONTENT_URI}/fifa/182.png`,
  184: `${MEDIA_DOMAIN}/${CONTENT_URI}/fifa/184.png`,
  191: `${MEDIA_DOMAIN}/${CONTENT_URI}/fifa/191.png`,
  217: `${MEDIA_DOMAIN}/${CONTENT_URI}/fifa/217.png`,
  235: `${MEDIA_DOMAIN}/${CONTENT_URI}/fifa/235.png`,
  238: `${MEDIA_DOMAIN}/${CONTENT_URI}/fifa/238.png`,
  250: `${MEDIA_DOMAIN}/${CONTENT_URI}/fifa/250.png`,
  254: `${MEDIA_DOMAIN}/${CONTENT_URI}/fifa/254.png`,
  264: `${MEDIA_DOMAIN}/${CONTENT_URI}/fifa/264.png`,
  269: `${MEDIA_DOMAIN}/${CONTENT_URI}/fifa/269.png`,
  748: `${MEDIA_DOMAIN}/${CONTENT_URI}/fifa/748.png`,
  818: `${MEDIA_DOMAIN}/${CONTENT_URI}/fifa/818.png`,
  928: `${MEDIA_DOMAIN}/${CONTENT_URI}/fifa/928.png`,
  1064: `${MEDIA_DOMAIN}/${CONTENT_URI}/fifa/1064.png`,
  1262: `${MEDIA_DOMAIN}/${CONTENT_URI}/fifa/1262.png`,
  1922: `${MEDIA_DOMAIN}/${CONTENT_URI}/fifa/1922.png`,
  2133: `${MEDIA_DOMAIN}/${CONTENT_URI}/fifa/2133.png`,
  2793: `${MEDIA_DOMAIN}/${CONTENT_URI}/fifa/2793.png`,
  3397: `${MEDIA_DOMAIN}/${CONTENT_URI}/fifa/3397.png`,
  7078: `${MEDIA_DOMAIN}/${CONTENT_URI}/fifa/7078.png`,
  7804: `${MEDIA_DOMAIN}/${CONTENT_URI}/fifa/7804.png`,
  9917: `${MEDIA_DOMAIN}/${CONTENT_URI}/fifa/9917.png`,
  12055: `${MEDIA_DOMAIN}/${CONTENT_URI}/fifa/12055.png`,
  18955: `${MEDIA_DOMAIN}/${CONTENT_URI}/fifa/18955.png`,
  18956: `${MEDIA_DOMAIN}/${CONTENT_URI}/fifa/18956.png`,
  18958: `${MEDIA_DOMAIN}/${CONTENT_URI}/fifa/18958.png`,
}

export default FifaTeam
