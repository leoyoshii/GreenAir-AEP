export default {
  jwt: {
    secret: `${process.env.APP_SECRET}`,
    expiresIn: 86400000,
  },
};
