import 'whatwg-fetch';

// load HTML/CSS components with Ajax. relativePaths based on public/components by default.
// dataType='html' or 'css','js' or 'all' to return keys with values
// getComponents({"./components":['basic-awesome-elements'], "./": [''] })
export async function load(dirRelativePathDict, cache=false, dataType='html') {

  // tries to load from cache
  if(cache && localStorage.getItem("lemon_components")) {
        if(dataType==='all') {
          return JSON.parse(localStorage.getItem("lemon_components"));
        } else {
          return (JSON.parse(localStorage.getItem("lemon_components")))[dataType];
        }
  } 

  const fetchedComponents = {}; // prevents multiple fetches per dataType(html/css/js)
  let promises = [];

  // try to fetch all html/css/js files
  fetchedComponents['js'] = {};
  fetchedComponents['css'] = {};
  fetchedComponents['html'] = {};
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
                    fetchedComponents[extension][relativePath] = code;
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
  if(cache) {
    // sets cache if empty
    localStorage.setItem("lemon_components",JSON.stringify(fetchedComponents));
  }

    if(dataType==='all') {
      return fetchedComponents;
    } else { 
      return fetchedComponents[dataType];
    }
}
