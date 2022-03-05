import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useSession } from 'next-auth/react';
import { Dispatch, SetStateAction } from 'react';
import { Controller } from 'react-hook-form';
import { Mention, MentionsInput } from 'react-mentions';
import useSWR from 'swr';
import { IEmployee } from 'utils/types';
import { fetcher } from 'utils/utils';

type CommentEditorProps = {
  onSubmit: () => void;
  updateMentions: (arg0: number, arg1: string, arg2: string) => void;
  // eslint-disable-next-line
  control: any;
  cancel: Dispatch<SetStateAction<boolean>>;
  cancelText: string;
  confirmText: string;
};
const CommentEditor = ({ onSubmit, control, cancel, cancelText, confirmText, updateMentions }: CommentEditorProps) => {
  const { data: session } = useSession();
  const { data: employees } = useSWR(session?.user ? `/api/employees` : null, fetcher);
  const theme = useTheme();

  const formatedEmployees: IEmployee[] = employees?.map((e: IEmployee) => {
    return { id: e.id, display: `${e.firstName} ${e.lastName}` };
  });

  return (
    <form noValidate style={{ marginTop: '32px' }}>
      <Controller
        control={control}
        name='comment'
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <MentionsInput
              onChange={onChange}
              style={{
                control: {
                  backgroundColor: theme.palette.background.default,
                  fontSize: 14,
                  fontWeight: 'normal',
                  minHeight: 63,
                  border: '1px solid red',
                },
                input: {
                  color: theme.palette.text.primary,
                  padding: 9,
                  ...(error?.message && { border: `1px solid ${theme.palette.error.main}` }),
                },
                highlighter: {
                  padding: 9,
                },
                suggestions: {
                  list: {
                    border: '1px solid rgba(0,0,0,0.15)',
                  },
                  item: {
                    padding: '2px 10px',
                    backgroundColor: theme.palette.background.default,
                    color: theme.palette.text.primary,
                    '&focused': {
                      backgroundColor: theme.palette.primary.main,
                      color: theme.palette.text.secondary,
                    },
                  },
                },
              }}
              value={value}
            >
              <Mention
                data={formatedEmployees}
                displayTransform={(id, display) => `@${display}`}
                markup={'@**__display__**'}
                onAdd={(id, display) => {
                  const employee = employees.find((employee) => employee.id === id);
                  updateMentions(id, display, employee.email);
                }}
                trigger='@'
              />
            </MentionsInput>
            {error?.message && (
              <Typography color='error' variant='body2'>
                {error?.message}
              </Typography>
            )}
          </>
        )}
        rules={{
          required: 'Kommentar er påkrevd',
        }}
      />
      <Box display='flex' flexDirection='row' justifyContent='space-between'>
        <Button onClick={() => cancel(false)} type='submit'>
          {cancelText}
        </Button>
        <Button onClick={onSubmit} type='submit'>
          {confirmText}
        </Button>
      </Box>
    </form>
  );
};
export default CommentEditor;
