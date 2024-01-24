import { ReactNode } from "react";

export interface IMarkerProps {
  id: string;
  title: string;
  description: string;
  contact: string;
  category: string;
  latitude: number;
  longitude: number;
}

export interface MarkerEditProps {
  marker: IMarkerProps;
  onClose: () => void;
}
