export default {
  async fetch(request) {
    const destinationURL = "https://your-new-destination.com";
    const statusCode = 301; // Use 301 for permanent, 302 for temporary

    return Response.redirect(destinationURL, statusCode);
  },
};
