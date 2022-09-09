
// load HTML/CSS components with Ajax. relativePaths based on public/components by default.
// dataType='html' or 'css','js'
// getComponents({"./components":['basic-awesome-elements'], "./": [''] })
export async function load(dirRelativePathDict, dataType='html') {
  const componentSingleton = {}; // prevents multiple fetches per dataType(html/css/js)

    /*
  // prevent load from retrieving files again
  if("js" in componentSingleton) {
    return new Promise((resolve) => { resolve(componentSingleton[dataType]); });
  }*/
    let promises = [];

  // try to fetch all html/css/js files
  componentSingleton['js'] = {};
  componentSingleton['css'] = {};
  componentSingleton['html'] = {};
  const keys = Object.keys(dirRelativePathDict);
  for(let k = 0; k < keys.length; k++) {
    const componentDir = keys[k];
    const relativePaths = dirRelativePathDict[keys[k]];
    const promises = [];
    for(let i=0;i<relativePaths.length;i++) {
      let relativePath = relativePaths[i];
      let extensions = ['js','css','html'];
      for(let ii=0;ii<extensions.length;ii++) {
        let extension = extensions[ii];



        let p = await new Promise((resolve,reject) => {
            // ex. .components/home.html
            fetch(componentDir + relativePath + "." + extension).then((response) => {

                  if (response.status == 404) {
                    console.log("file " + relativePath + "." + extension + " doesn't exist!");
                    resolve();
                  }

                response.text().then((code) => {
                    componentSingleton[extension][relativePath] = code;
                    resolve();
                }).catch((err) => {
                    console.log('FETCH ERR',String(err));
                    resolve();
                });
            }).catch((err) => {
                console.log('FETCH ERR',String(err));
                resolve();
            });
        });
        promises.push(p);
      }
    }
  }

  await Promise.all(promises);
  return componentSingleton[dataType];
}
// ^ could be replaces with generated constant in JavaScript file
// using simple { components } from './components-generated.json';

// Prevents fetching at all if fetches once
export async function loadAndCache(config,dataType='html') {
	// loads all components, optionally cached
  let components;

  // tries to load from cache
  if(localStorage.getItem("lemon_components")) {
      components = JSON.parse(localStorage.getItem("lemon_components"));
  } else {
      components = await load(config,dataType);
    // sets cache if empty
    localStorage.setItem("lemon_components",JSON.stringify(components))
  }

  return components;
}
