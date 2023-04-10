export interface IGif {
  id: string,
  title: string,
  url: string,
  userProfile: string,
  username: string,
  displayName: string,
  userAvatar: string
}

export interface State {
  gifs: IGif[] | null,
  gif: IGif | null
}
