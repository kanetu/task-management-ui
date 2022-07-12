const detectLink = (str: string) => {
  const regex: RegExp =
    /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;
  const detectList = str.match(regex);
  return detectList ? detectList.length : 0;
};

export default detectLink;
