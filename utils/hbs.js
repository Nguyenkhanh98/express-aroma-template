const hbsHelper = {
  times: (n, e, block) => {
    if (block) {
      let accum = '';
      const data = {

      };
      for (let i = 0; i < n - e; ++i) {
        data.iTime = i;
        accum += block.fn(data);
      }
      return accum;
    }
    let accum = '';
    const data = {

    };
    for (let i = 0; i < n; ++i) {
      data.iTime = i;
      accum += e.fn(data);
    }
    return accum;
  },

  timesReverse: (n, arg, block) => {
    let accum = '';
    console.log(arg);
    const data = {

    };
    for (let i = n; i > 0; i--) {
      data.iTimeR = i;
      data.data = arg;
      accum += block.fn(data);
    }
    return accum;
  },
  getStars: (starsCount, starType) => {
    console.log(starsCount, starType);
    if (starsCount[`${starType}`]) {
      return starsCount[`${starType}`];
    }
    return 0;
  },
};
module.exports = hbsHelper;
