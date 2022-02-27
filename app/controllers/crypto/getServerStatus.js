const getServerStatus = async (req, res) => {
  res.status(200).send({
    status: true,
    message: "Welcome to EXZOSWAP!. You can use REST API endpoints now. :)"
  });
};

export { getServerStatus };