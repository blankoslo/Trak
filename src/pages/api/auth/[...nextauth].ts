import { trakClient } from 'lib/prisma';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { NotificationTypeEnum } from 'utils/types';

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  debug: true,
  session: {
    jwt: true,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  callbacks: {
    //eslint-disabe-next-line
    async signIn(_, __, profile) {
      try {
        const user = await trakClient.employee.findUnique({
          where: {
            email: profile.email,
          },
        });
        if (user && profile.verified_email) {
          await trakClient.employeeSettings.upsert({
            where: {
              employeeId: user.id,
            },
            update: {},
            create: {
              employeeId: user.id,
              notificationSettings: [
                NotificationTypeEnum.DELEGATE,
                NotificationTypeEnum.DEADLINE,
                NotificationTypeEnum.WEEK_BEFORE_DEADLINE,
                NotificationTypeEnum.HIRED,
                NotificationTypeEnum.TERMINATION,
              ],
            },
          });
          return true;
        }
        // eslint-disable-next-line no-empty
      } catch (err) {}
      return false;
    },
    async session(session, user) {
      try {
        const user_id = await trakClient.employee.findUnique({
          where: {
            email: user.email,
          },
          select: {
            id: true,
          },
        });
        session.user.id = user_id.id.toString();
        // eslint-disable-next-line no-empty
      } catch (err) {}
      return session;
    },
  },
});
