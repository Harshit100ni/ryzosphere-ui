export interface iSignInProps {
  isOpenModal: boolean;
  setIsOpenModal: (value: boolean) => void;
}

export interface SignInFormValue {
  username: string;
  password: string;
}
