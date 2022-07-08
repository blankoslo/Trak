export interface TripletexEmployee {
  id: number;
  firstName: string;
  lastName: string;
  displayName: string;
  dateOfBirth: string;
  email: string;
  employments: { id: string }[];
}
