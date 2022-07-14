export interface TripletexEmployee {
  id: number;
  firstName: string;
  lastName: string;
  displayName: string;
  dateOfBirth: string;
  email: string;
  employments: { id: number }[];
}

export interface TripletexEmployeeWithEmploymentDates extends TripletexEmployee {
  startDate: string | null;
  endDate: string | null;
}

export interface TripletexEmployment {
  id: number;
  startDate: string;
  endDate: string | null;
}
