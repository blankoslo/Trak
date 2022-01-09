import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import { useSession } from 'next-auth/react';
import { Controller } from 'react-hook-form';
import useSWR from 'swr';
import { IEmployee } from 'utils/types';
import { fetcher } from 'utils/utils';
export type EmployeeSelectorProps = {
  // eslint-disable-next-line
  control: any;
  name: string;
  label: string;
  required?: boolean;
};

export const EmployeeSelector = ({ control, name, label, required = false }: EmployeeSelectorProps) => {
  const { data: session } = useSession();
  const { data: employees } = useSWR(session?.user ? `/api/employees` : null, fetcher);
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <EmployeeSelectorComponent employees={employees ?? []} label={label} required={required} setValue={onChange} value={value} />
      )}
      rules={{ required: required }}
    />
  );
};

export type EmployeeSelectorComponentProps = {
  employees: IEmployee[];
  setValue: (IEmployee) => void;
  label: string;
  value: IEmployee;
  required: boolean;
};
export const EmployeeSelectorComponent = ({
  employees,
  setValue,
  label,
  required,
  value = {
    firstName: '',
    lastName: '',
    id: null,
    email: undefined,
    birthDate: null,
    profession: undefined,
    hrManager: undefined,
    employees: undefined,
    employeeTask: undefined,
    employeeSettings: undefined,
  },
}: EmployeeSelectorComponentProps) => {
  return (
    <Autocomplete
      getOptionLabel={(employee: IEmployee) => `${employee.firstName} ${employee.lastName}`.trim()}
      loading={!employees.length}
      noOptionsText={'Ingen ansatte funnet'}
      onChange={(_, employee) => setValue(employee)}
      options={employees}
      popupIcon={<></>}
      renderInput={(params) => (
        <TextField
          {...params}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {!employees.length && <CircularProgress size={20} />}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
          fullWidth
          label={label}
          required={required}
          variant='standard'
        />
      )}
      value={value}
    />
  );
};

export default EmployeeSelector;
