import axios from 'axios';
import { NextRouter } from 'next/router';
import qs from 'qs';
import { Dispatch, SetStateAction } from 'react';
import { IEmployeeTask } from 'utils/types';

export type TimeSectionType = {
  title?: string;
  date?: string;
  data: IEmployeeTask[];
  error?: boolean;
  defaultOpen?: boolean;
};

export const prismaDateToFormatedDate = (date: string, isSmallFormat = false) => {
  if (isSmallFormat) {
    return new Date(date).toLocaleDateString('nb-NO', { year: 'numeric', month: 'short', day: 'numeric' });
  }
  return new Date(date).toLocaleDateString('nb-NO', { year: 'numeric', month: 'long', day: 'numeric' });
};

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const axiosBuilder = (
  axiosFunc: Promise<unknown>,
  text: string,
  router: NextRouter,
  showProgressbar: (boolean) => void,
  showSnackbar: (arg0: string, arg1: string) => void,
  closeModal: () => void,
) => {
  showProgressbar(true);
  axiosFunc
    .then(() => {
      closeModal();
      router
        .push({
          pathname: router.asPath,
        })
        .finally(() => {
          showProgressbar(false);
          showSnackbar(text, 'success');
        });
    })
    .catch((error) => {
      showProgressbar(false);
      showSnackbar(error.response.data.message, 'error');
    });
};

export const toggleCheckBox = async (
  employeeTask: IEmployeeTask,
  completed: boolean,
  setCompleted: Dispatch<SetStateAction<boolean>>,
  showSnackbar: (arg0: string, arg1: string) => void,
) => {
  await axios
    .put(`/api/employeeTasks/${employeeTask.id}`, {
      completed: !completed,
      dueDate: employeeTask.dueDate,
      responsibleId: employeeTask.responsible.id,
    })
    .then(() => {
      showSnackbar(`Oppgave markert som ${completed ? 'ikke' : ''} fullført`, 'success');
      setCompleted(!completed);
    })
    .catch((error) => {
      showSnackbar(error.response.data?.message, 'error');
    });
};

export const addDays = (date: Date, days: number) => {
  const copy = new Date(Number(date));
  copy.setDate(date.getDate() + days);
  return copy;
};

export const getMonths = () => {
  return ['Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Desember'];
};
export const slackMessager = async (email: string, text: string) => {
  try {
    const response = await axios.get(`https://slack.com/api/users.lookupByEmail?email=${email}`, {
      headers: {
        Authorization: `Bearer ${process.env.SLACK_TOKEN}`,
      },
    });
    const userInSlackWorkspace = response.data.user;
    if (userInSlackWorkspace) {
      await axios.post(
        'https://slack.com/api/chat.postMessage',
        qs.stringify({
          token: process.env.SLACK_TOKEN,
          channel: response.data.user.id,
          text: text,
        }),
      );
    }
  } catch (err) {
    // eslint-disable-next-line
    console.log(err);
  }
};

export const isToday = (someDate) => {
  const today = new Date();
  return someDate.getDate() === today.getDate() && someDate.getMonth() === today.getMonth() && someDate.getFullYear() === today.getFullYear();
};
