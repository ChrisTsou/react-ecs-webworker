const bench = () => {
  const mw = new Worker('/src/benchmarks/mapWorker.ts', { type: 'module' });
  const ow = new Worker('/src/benchmarks/mapWorker.ts', { type: 'module' });
  const bw = new Worker('/src/benchmarks/bufferWorker.ts', { type: 'module' });

  const LENGTH = 1000;
  const dataMap = new Map();
  for (let i = 0; i < LENGTH; i++) {
    dataMap.set(`test${i}`, (Math.random() * 4294967296) >>> 0);
  }

  const dataObj = {};
  for (let i = 0; i < LENGTH; i++) {
    dataObj[`test${i}`] = (Math.random() * 4294967296) >>> 0;
  }

  let before = performance.now();
  mw.postMessage(dataMap);
  mw.onmessage = (e) => {
    console.log(`Map : ${performance.now() - before}`);
    console.log(`length: ${e.data.size}`);

    before = performance.now();
    ow.postMessage(dataObj);
    ow.onmessage = (e) => {
      console.log(`object : ${performance.now() - before}`);
      console.log(`length: ${Object.entries(e.data).length}`);

      //taking into account conversions
      //also will need extra complexity to map data keys to indices
      before = performance.now();
      const typedData = Uint32Array.from(dataMap.values());
      bw.postMessage(typedData.buffer, [typedData.buffer]);
      bw.onmessage = (e) => {
        const array = new Uint32Array(e.data);
        console.log(`buffer : ${performance.now() - before}`);
        console.log(`length: ${array.length}`);
      };
    };
  };
};

export default bench;
