import { IBaseRepsonse } from '../common/IBaseResponse';

export interface ILoginResponse extends IBaseRepsonse {
  data: {
    name: string;
    email: string;
    phoneNumber: string;
    birthday: string;
    isActive: boolean;
    avatarUrl: string;
    role: {
      name: string;
      permissions: { title: string; active: boolean }[];
    };
  };
}
