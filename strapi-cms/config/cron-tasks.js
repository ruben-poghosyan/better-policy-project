module.exports = {  
    updateFeaturedContent: {
      task: ({ strapi }) => {
        strapi.log.info("Updating Featured Content")
      },
      options: {
        rule: "*/1 * * * *",
      },
    },
  };