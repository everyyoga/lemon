// reacting to object inserted
export function lemon_object_create(lemon,keyName,originalObject) {
      // 'new Proxy' is used to be able to detect changes in the properties.
      return new Proxy(originalObject, {
        // Create reactivity by overriding the set function.
        set: function (target, key, value) {
          const oldTarget = JSON.parse(JSON.stringify(target)); // Copy Old Target Reference
          const oldValue = target[key]; // Target is the original Lemon object.
          const newValue = value;
          target[key] = value; // updates the value in the 'real' element

          // Fires the Lemon.watch event: Executes functions that have been defined per key.
          if(key in lemon.watchers) {
            lemon.watchers[keyName + '.' + key].forEach((watcher) => {
              watcher(newValue,oldValue);
            });
          }

          // for using Lemon.watch("this",(value) =>{  }); to watch entire Lemon object store
          if("this" in lemon.watchers) {
            lemon.watchers["this"].forEach((watcher) => {
              watcher(lemon,keyName + '.' + key);
            });
          }

          // Fires the Lemon.watch for parent (notes.1 to notes)
          if(keyName in lemon.watchers) {
            lemon.watchers[keyName].forEach((watcher) => {
              watcher(target,oldTarget);
            });
          }

          return true; // by default returns false and throws error otherwise
        }
      });
}

// reacting to object inserted
export function lemon_list_create(lemon, keyName,originalObject) {
      // 'new Proxy' is used to be able to detect changes in the properties.
      return new Proxy(originalObject, {
        // Create reactivity by overriding the set function.
        set: function (target, key, value) {
          const oldValue = target[key]; // Target is the original Lemon object.
          const newValue = value;
          target[key] = value; // updates the value in the 'real' element


          if(key !== 'length') { // length used to avoid trigger twice on push
            // Fires the Lemon.watch event: Executes functions that have been defined per key.
            if(key in lemon.watchers) {
              lemon.watchers[keyName + '.' + key].forEach((watcher) => {
                watcher(newValue,oldValue);
              });
            }

            // for using Lemon.watch("this",(value) =>{  }); to watch entire Lemon object store
            if("this" in lemon.watchers) {
              lemon.watchers["this"].forEach((watcher) => {
                watcher(lemon,keyName + '.' + key);
              });
            }

            // Fires the Lemon.watch for parent (notes.1 to notes)
            if(keyName in lemon.watchers) {
              lemon.watchers[keyName].forEach((watcher) => {
                watcher(target,oldValue);
              });
            }

          }

          return true; // by default returns false and throws error otherwise
        }
      });
}


// helper function to determine which element property to update for reactivity
export function getReplaceProperty(element) {
 if(element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
        return 'value';
  }
  else {
        return 'innerText';
  }
}
// helper function to determine which element event to use for reactivity
export function getReactiveEventName(element) {
 if(element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
        return 'input';
  }
  else {
        return '?';
  }
}

// helper function to create map if array is given instead
export function convertGlobalsMap(lemonGlobals) {
  let lemonGlobalsMap = {};
  for(let i=0;i<lemonGlobals.length;i++) {
      let querySelector = '.' + lemonGlobals[i];
      lemonGlobalsMap[querySelector] = lemonGlobals[i];
  }

  return lemonGlobalsMap;
}
