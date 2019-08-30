
class BasicSlideLoader {
  //@ts-ignore
  getSlide(z, x, y, url, completion) {
    const image = document.createElement("img");
    image.src = url;
    image.onload = () => { completion(undefined, image); };
    image.onerror = () => { completion("error", null); };
  }
}

class StackSlideLoader {
  //@ts-ignore
  constructor(loader, queryLimit) {
    //@ts-ignore
    this.loader = loader;
    //@ts-ignore
    this.stack = [];
    //@ts-ignore
    this.queryLimit = queryLimit;
    //@ts-ignore
    this.activeQueries = 0;
  }
  //@ts-ignore
  startNextLoad() {
    //@ts-ignore
    if(this.stack.length === 0) return;
    //@ts-ignore
    if(this.activeQueries >= this.queryLimit) return;
    //@ts-ignore
    this.activeQueries += 1;
    //@ts-ignore
    const [z, x, y, url, completion] = this.stack.pop();
    //@ts-ignore
    this.loader.getSlide(z, x, y, url, (error, image) => {
      completion(error, image);
      //@ts-ignore
      this.activeQueries -= 1;
      this.startNextLoad();
    });
  }
  //@ts-ignore
  getSlide(z, x, y, url, completion) {
    //@ts-ignore
    this.stack.push([z, x, y, url, completion]);
    this.startNextLoad();
  }
}

export {
  BasicSlideLoader,
  StackSlideLoader
}
