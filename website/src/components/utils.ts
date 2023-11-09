export interface RegisterInputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profilephotos: FileList;
  avatar: FileList;
}

export interface LoginInputs {
  email: string;
  password: string;
}
