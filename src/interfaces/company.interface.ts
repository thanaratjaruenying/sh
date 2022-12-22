import { Base } from './base.interface';

export interface Company extends Base {
  active?: boolean;
  address1: string;
  address2?: string;
  district: string;
  email: string;
  name: string;
  phone: string;
  postcode: string;
  province: string;
  subdistrict: string;
}
