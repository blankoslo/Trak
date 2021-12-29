import { useSession } from 'next-auth/react';
import { createContext, useContext } from 'react';
import useSWR from 'swr';
import { ColorMode } from 'utils/types';
import { fetcher } from 'utils/utils';

const DataContext = createContext(ColorMode.LIGHT);

function useData() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const context: any = useContext(DataContext);
  if (!context) {
    throw new Error(`useData must be used within a DataProvider`);
  }
  return context;
}

function DataProvider(props) {
  const { data: session } = useSession();

  const { data: professions } = useSWR(session?.user ? `/api/professions` : null, fetcher);
  const { data: tags } = useSWR(session?.user ? `/api/tags` : null, fetcher);
  const { data: employees } = useSWR(session?.user ? `/api/employees` : null, fetcher);
  const { data: processTemplates } = useSWR(session?.user ? `/api/processTemplates` : null, fetcher);
  return <DataContext.Provider value={{ professions: professions, tags: tags, employees: employees, processTemplates: processTemplates }} {...props} />;
}
export { DataProvider, useData };
