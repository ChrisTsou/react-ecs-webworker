onmessage = (e) => {
  const array = new Uint32Array(e.data);
  postMessage(array.buffer, [array.buffer]);
};
