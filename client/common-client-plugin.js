function register({ registerHook, peertubeHelpers, registerClientRoute }) {
  // to display content in the route /p/my-information
  const options = {
    route: "my-information",
    onMount: async (options) => {
      const { rootEl } = options;
      await fetch(peertubeHelpers.getBaseRouterRoute() + "/mydata", {
        method: "GET",
        headers: peertubeHelpers.getAuthHeader(),
      })
        .then((res) => res.json())
        .then((data) => {
          const z = document.createElement("h3");
          z.innerHTML = data.email;
          // rootEl.setAttribute("id", "root");
          rootEl.appendChild(z);
        });
    },
  };
  registerClientRoute(options);

  console.log("plugin route", peertubeHelpers.getBasePluginClientPath());

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
              path: "/p/my-information",
            },
          ],
        },
      ];
    },
  });
}

export { register };
