import { Base } from './base.interface';

export interface Company extends Base {
  active?: boolean;
  address1: string;
  address2?: string;
  district: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  postcode: string;
  province: string;
  subdistrict: string;
}
