export interface Profile {
  id: number;
  createdAt: string;
  updatedAt: string;
  profilePicture: string;
  fullName: string;
  bio: string;
  bgProfilePicture: string;
}

export interface User {
  username: string;
  id: number;
  profile: Profile;
}

export interface LoginCredentials {
  usernameOrEmail: string;
  password: string;
}

export interface Group {
  id: number;
  name: string;
  author: User;
}

export interface Media {
  id: number,
  createdAt: string,
  updatedAt: string,
  type: "TEXT" | "IMAGE",
  mediaUrl: string,
  mediaText: string,
}

export interface Post {
  id: number;
  title: string;
  author: User;
  group?: Group;
  media: Media;
  votesCount: number;
  comments: number;
  hasVoted?: number;
}