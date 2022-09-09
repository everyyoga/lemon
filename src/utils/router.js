export async function simpleLemonRouter(parentQuerySelector,appController,components,yourLemon,routes, beforeRouteFunc=null,afterRouteFunc=null) {
  // Load app's basic template/skeleton
  if(appController.before) {
    appController.before(components.html);
  }

  // Simple Routing Initial state
  document.querySelector('#app').innerHTML += '<div id="lemon-css-holder"></div><div id="lemon-js-holder"></div>';

  yourLemon.watch("route",async(newValue,oldValue) => {
    if(newValue===oldValue) return; // don't reload when same page is selected

    if(beforeRouteFunc) {
      beforeRouteFunc(newValue,oldValue);
    }

    // refresh url based on path
    history.pushState(null, '', yourLemon.route);

    // View: Rendering and re-rendering events
    let parentElement = document.querySelector(parentQuerySelector);
    if(!parentElement) {
        throw new Error("Parent element not found for router. Query selector: " + parentQuerySelector);
    }

    // load html/css/js components defined in custom route
    //const components = routes[yourLemon.route]['components'];

    // View: only load css once per component
    document.querySelector("#lemon-css-holder").innerHTML = ''; // reset CSS
    Object.keys(components['css']).forEach((cssCodeKey)=>{
      const cssCode = components['css'][cssCodeKey];
      if(cssCode) {
          document.querySelector('#lemon-css-holder').innerHTML += '<style>' + cssCode + '</style>';
      }
    });

    // View: render route component with simple html component if defined
    let htmlComponent = routes[yourLemon.route]['html'];
    if(htmlComponent) {
      // replace content holder with HTML
      parentElement.innerHTML = htmlComponent; // why is this not working for loginform1?
    } else {
      console.log("The .html component for this route is undefined. Have you included the component in your components.js file?");
    }

    // View: load custom render functions if defined
    let controller = routes[yourLemon.route]['controller'];
    if(controller) {
      let before = controller.before;
      if(before) {
        await before(components.html);
      }
    }

    // Controller: only load js once per component
    document.querySelector("#lemon-js-holder").innerHTML = ''; // reset JS
    Object.keys(components['js']).forEach((jsCodeKey)=>{
      const node = document.createElement("script");
      const jsCode = components['js'][jsCodeKey];
      if(jsCode) {
        node.innerHTML = components['js'][jsCodeKey];
        document.querySelector('#lemon-js-holder').appendChild(node);
      }
    });

    // Controller: Loading actions (click, etc) after dom is created
    if(controller) {
      let after = controller.after;
      if(after) {
        await after();
      }
    }

    if(afterRouteFunc) {
      afterRouteFunc(newValue,oldValue);
    }
  });

  if(appController.after) {
    appController.after();
  }

  // Load current path/route based on given url
  yourLemon.route = window.location.pathname;
}
