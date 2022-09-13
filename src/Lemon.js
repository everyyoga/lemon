import {lemon_object_create,lemon_list_create,convertGlobalsMap, getReactiveEventName,getReplaceProperty} from './utils/reactivity.js';

import * as LemonComponents from './utils/components.js';

// Converts original Lemon object (store) to a proxified one to make reactivity possible on it's properties.
function lemon_create(LemonOriginal) {
      // 'new Proxy' is used to be able to detect changes in the properties.
      return new Proxy(LemonOriginal, {
        get(target, key)
        {
            if (key === 'isProxy')
                return true;

            return Reflect.get(...arguments);

            // normal get handler code here
        },

        // Create reactivity by overriding the set function.
        set: function (target, key, value) {
          const oldValue = target[key]; // Target is the original Lemon object.
          const newValue = value;
          target[key] = value; // updates the value in the 'real' element

          // Fires the Lemon.watch event: Executes functions that have been defined per key.
          if(key in target.watchers) {
            target.watchers[key].forEach((watcher) => {
              watcher(newValue,oldValue);
            });
          }

          // for using Lemon.watch("this",(value) =>{  }); to watch entire Lemon object store
          if("this" in target.watchers) {
            target.watchers["this"].forEach((watcher) => {
              watcher(target,key);
            });
          }

          let isPrimitive = (val) => {
            if(val === null || val === undefined){
                return true;
            }
            if(typeof val == "object" || typeof val == "function"){
              return false;
            }else{
              return true;
            }
          };

          // if object/list make these parts reactive too, just one layer deep
          if(!( target[key].isProxy )) {
            if(Array.isArray(target[key])) {
              // proxy object to make ex. loginForm.username changes react
              target[key] = lemon_list_create(target,key,target[key]);
            }
            else if( !isPrimitive(target[key]) && target[key] instanceof Object ) {
              // proxy object to make ex. loginForm.username changes react
              target[key] = lemon_object_create(target,key,target[key]);
            }
          }


          return true; // by default returns false and throws error otherwise
        }
      });
}

class LemonApp {

  watchers = {};
  route;
  #lemonKeys = {};

  constructor() {
  }

  // Adds watch event for a Lemon.property (name) that executes the given function (func) when that watch event is triggered.
  watch(name, func) {
    if(!(name in this.watchers)) {
      this.watchers[name] = [];
    }

    this.watchers[name].push(func);
  }

  // shorthand for reactivity with format {"inputs":{".count":"count"}, "outputs": {".count":"count"} }
  react(renderInputsOutputs={}) {
      let inputsData = renderInputsOutputs['inputs'];
      let outputsData = renderInputsOutputs['outputs'];
      if(inputsData) {
        this.inputs(inputsData); // equivalent to Lemon.inputs({".count":"count"})
      }

      if(outputsData) {
        this.outputs(outputsData); // equivalent to Lemon.outputs({".count":"count"})
      }
  }

  // Adds reactivity to elements by adding keyup event and setting their values on change
  inputs(lemonGlobals) {
    const thiz = this;
    if(!lemonGlobals) {
      throw new Error("lemonGlobals not defined for inputs");
    }

        // if array given, convert list to map, ex. ['count'] to {".count" => "count"}
        let lemonGlobalsMap;
        if(Array.isArray(lemonGlobals)) {
            lemonGlobalsMap = convertGlobalsMap(lemonGlobals);
        } else {
            lemonGlobalsMap = lemonGlobals;
        }

        let lemonGlobalKeys = Object.keys(lemonGlobalsMap);
        lemonGlobalKeys.forEach((globalQuerySelector) => {
            let lemonGlobalKey = lemonGlobalsMap[globalQuerySelector];

            // Adds reactivity to elements by adding keyup event
            let inputElement = document.querySelector(globalQuerySelector);
            if(inputElement) {
                let reactiveEventName = getReactiveEventName(inputElement); // ex. keyup
                inputElement.addEventListener(reactiveEventName,()=>{
                      // check if newValue is different to avoid infinite loops?
                      let newValue = inputElement.value;
                      let lemonGlobalValue;

                      // support both Lemon.loginForm and Lemon.loginForm.username events
                      if(lemonGlobalKey.split('.').length === 2) {
                        let lemonGlobalKeySplit = lemonGlobalKey.split('.');
                        lemonGlobalValue = thiz[lemonGlobalKeySplit[0]][lemonGlobalKeySplit[1]];

                        if(newValue !== lemonGlobalValue) {
                          thiz[lemonGlobalKeySplit[0]][lemonGlobalKeySplit[1]] = newValue;
                        }
                      } else if(newValue !== lemonGlobalValue) {
                        lemonGlobalValue = thiz[lemonGlobalKey];
                        if(newValue !== lemonGlobalValue) {
                            thiz[lemonGlobalKey] = newValue;
                        }
                      }
                  });
            }

            // Adds reactivity to elements by setting their values on change
            thiz.watch(lemonGlobalKey, () => {
                document.querySelectorAll(globalQuerySelector).forEach((element) => {
                  let value = thiz[lemonGlobalKey];
                  let replaceProperty = getReplaceProperty(element);
                  element[replaceProperty] = value; // ex. element.innerText = value or element.value = value;
                });
            });
        });
  }

  // Adds reactivity to elements by setting their values on change
  outputs(lemonGlobals) {
    const thiz = this;
    if(!lemonGlobals) {
      throw new Error("lemonGlobals not defined for outputs");
    }

        // if array given, convert list to map, ex. ['count'] to {"count" => ".count"}
        let lemonGlobalsMap;
        if(Array.isArray(lemonGlobals)) {
          lemonGlobalsMap = convertGlobalsMap(lemonGlobals);
        } else {
            lemonGlobalsMap = lemonGlobals;
        }

        // replace vars + bind forms if lemonGlobals given
        let lemonGlobalKeys = Object.keys(lemonGlobalsMap);
        lemonGlobalKeys.forEach((globalQuerySelector) => {
            // foreach property whenever something changes replace the querySelector's value + event (if necessary? maybe only once)
            let lemonGlobalKey = lemonGlobalsMap[globalQuerySelector];            // foreach property whenever something changes replace the querySelector's value + event (if necessary? maybe only once)


              thiz.watch(lemonGlobalKey, () => {
                  let elements = document.querySelectorAll(globalQuerySelector);
                  elements.forEach((element) => {
                    let value;
                    if(lemonGlobalKey==='this') { // to support Lemon.watch("this") for whole object
                      value = this;
                    } else {
                      value = thiz[lemonGlobalKey];
                    }
                    let replaceProperty = getReplaceProperty(element);
                    element[replaceProperty] = value; // ex. element.innerText = value or element.value = value;
                  })
              });
        });
  }

  // Simply render HTML component to querySelector(s) and optionally execute function afterwards
  render(querySelector, htmlComponent, func=null) {
    const thiz = this; // to reference your Lemon inside other scopes
    return new Promise((resolve, reject) => {
        // make whole thing async
        setTimeout(async() => {
            let parents = document.querySelectorAll(querySelector);
            if(parents.length===0) {
                reject("Parent not found: " + querySelector);
                return;
            } else {
              parents.forEach((parent) => {
                parent.innerHTML = htmlComponent;
              })
            }

            if(func) {
                await func();
            }

            resolve();
        },0);
    });
  }
}

// Initiate & Proxy Your Lemon
window.Lemon = lemon_create(new LemonApp());
window.LemonComponents = LemonComponents;
