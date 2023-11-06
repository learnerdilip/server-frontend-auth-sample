export interface TextInputs {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  profilephotos: FileList;
  avatar?: FileList;
}

export interface LoginInputs {
  email: string;
  password: string;
}
