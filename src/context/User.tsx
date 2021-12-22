import { useSession } from 'next-auth/react';
import { createContext, useContext } from 'react';
import useSWR, { responseInterface } from 'swr';
import { IEmployee } from 'utils/types';
import { fetcher } from 'utils/utils';

const UserContext = createContext(undefined);
function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error(`useUser must be used within a UserProvider`);
  }
  return context;
}

function UserProvider(props) {
  const { data: session } = useSession();
  const { data: user }: responseInterface<IEmployee, unknown> = useSWR(session?.user ? `/api/employees/${session?.user?.id}` : null, fetcher);

  return <UserContext.Provider value={{ user: user }} {...props} />;
}
export { UserProvider, useUser };
