// if you operate on two numbers with bigger exponent
// difference than this it will be a no_op
const IncNum = (base: number = 0, exp: number = 0) => {
  const NO_OP_EXP_DIFFERENCE = 6;
  const NO_OP_EXP_DIFFERENCE_NUMBER = 10 ** NO_OP_EXP_DIFFERENCE;

  interface IncNum {
    base: number;
    exp: number;
  }

  if (!(Number.isInteger(base) && Number.isInteger(exp))) {
    throw new Error('IncNum accepts only integers as base and exponent');
  }

  const normalize = (incNum: IncNum, inRespect?: IncNum): IncNum => {
    //normalize in respect to parameter
    if (inRespect) {
      return { base, exp };
      //normalize self
    } else {
      const expForm = base.toExponential(NO_OP_EXP_DIFFERENCE - 1);
      const newExp = exp + Number(expForm.split('e+')[1]);
      const newBase = Number(expForm.split('e+')[0]);

      return {
        base: newBase,
        exp: newExp,
      };
    }
  };

  const normalized = normalize({ base, exp });

  const toString = () => {
    return `${normalized.base}e${normalized.exp}`;
  };

  return {
    toString,
  };
};

export default IncNum;
