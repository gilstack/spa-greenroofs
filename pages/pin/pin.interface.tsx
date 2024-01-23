import { ReactNode } from "react";

export interface IPin {
  id: string;
  title: string;
  description: string;
  contact: string;
  category: string;
  latitude: number;
  longitude: number;
}
