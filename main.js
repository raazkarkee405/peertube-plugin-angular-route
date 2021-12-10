async function register({ peertubeHelpers, registerHook, getRouter }) {
  const logger = peertubeHelpers.logger;
  const router = getRouter();

  router.get("/mydata", async (req, res) => {

    const username = 'root'
    const results = await peertubeHelpers.database.query(
      'SELECT "email" from "user" WHERE "username" = $username',
      {
        type: 'SELECT',
        bind: { username }
      }
    )

    logger.info('root email is ' + results[0]['email'])
    return res.json({ email: results[0]['email'] });
  });
}

async function unregister() {
  return;
}

module.exports = {
  register,
  unregister,
};
