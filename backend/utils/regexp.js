const linkRegex = /^https?:\/\/(www\.)?.+#?/;
const mailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/;

module.exports = {
  linkRegex,
  mailRegex,
};
