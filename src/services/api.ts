export const BASE_URL = `https://api.spotify.com/v1`;

export const apiEndpoints = {
  getUserPlaylist: () => {
    return `/browse/new-releases?country=IN`;
  },
  getAlbums: (id:any) => {
    return `/albums/`+id;
  },
};
