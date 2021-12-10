function register({ registerHook, peertubeHelpers }) {

 // to display content in the route /plugins/information
  registerHook({
    target: "action:router.navigation-end",
    handler: async ({ path }) => {
      if (path === "/my-information") {
        await fetch(peertubeHelpers.getBaseRouterRoute() + "/mydata", {
          method: "GET",
          headers: peertubeHelpers.getAuthHeader(),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("HEELO::", data.email);
            const mainRow = document.getElementsByClassName("main-row")[0];
            const notFound =
              document.getElementsByTagName("my-page-not-found")[0];

            mainRow.removeChild(notFound);

            const element = document.createElement("div");
            element.setAttribute("id", "new-value");

            const h1 = document.createElement("h1");

            const newContext = document.createTextNode(data.email);

            h1.appendChild(newContext);

            element.appendChild(h1);

            mainRow.appendChild(element);
          });
      } else {
        const deleteNode = document.getElementById("new-value");
        deleteNode.parentElement.removeChild(deleteNode);
      }
    },
  });

  // to add item in left menu
  registerHook({
    target: "filter:left-menu.links.create.result",
    handler: (items) => {
      return [
        ...items,
        {
          key: "features",
          title: "Additional Features",
          links: [
            {
              label: "My Information",
              icon: "trending",
              shortLabel: "My Information",
              path: "/my-information",
            },
          ],
        },
      ];
    },
  });
}

export { register };
