import { trakClient } from 'lib/prisma';
import NextAuth from 'next-auth';
import GoogleProviders from 'next-auth/providers/google';

export default NextAuth({
  providers: [
    GoogleProviders({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  secret: process.env.NEXT_AUTH_SECRET,
  debug: true,
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  callbacks: {
    //eslint-disabe-next-line
    async signIn({ profile }) {
      try {
        const user = await trakClient.employee.findUnique({
          where: {
            email: profile.email,
          },
        });

        if (user && profile.email_verified) {
          await trakClient.employeeSettings.upsert({
            where: {
              employeeId: user.id,
            },
            update: {},
            create: {
              employeeId: user.id,
              slack: true,
              deadline: true,
              delegate: true,
              hired: true,
              termination: true,
              week_before_deadline: true,
            },
          });
          return true;
        }
      } catch (err) {
        // eslint-disable-next-line
        console.log(err);
      }
      return false;
    },
    async session({ session }) {
      try {
        const user_id = await trakClient.employee.findUnique({
          where: {
            email: session.user.email,
          },
          select: {
            id: true,
          },
        });
        session.user.id = user_id.id.toString();
      } catch (err) {
        // eslint-disable-next-line
        console.log(err);
      }
      return session;
    },
  },
});
