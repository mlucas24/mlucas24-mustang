const MINIMUMDISTRIBUTION = [
  25.6,
  24.7,
  23.8,
  22.9,
  22.0,
  21.2,
  20.3,
  19.5,
  18.7,
  17.9,
  17.1,
  16.3,
  15.5,
  14.8,
  14.1,
  13.4,
  12.7,
  12.0,
  11.4,
  10.8,
  10.2,
  9.6,
  9.1,
  8.6
];
const TAXBRACKET = [
  {
    bracketTopSingle: 9700,
    bracketTopMarried: 19400,
    bracketBottomSingle: 0,
    bracketBottomMarried: 0,
    rate: 0.1
  },
  {
    bracketTopSingle: 39475,
    bracketTopMarried: 78950,
    bracketBottomSingle: 9701,
    bracketBottomMarried: 19401,
    rate: 0.12
  },
  {
    bracketTopSingle: 84200,
    bracketTopMarried: 168400,
    bracketBottomSingle: 39476,
    bracketBottomMarried: 78951,
    rate: 0.22
  },
  { 
    bracketTopSingle: 160725,
    bracketTopMarried: 321450,
    bracketBottomSingle: 84201,
    bracketBottomMarried: 168401,
    rate: 0.24
  },
  {
    bracketTopSingle: 204100,
    bracketTopMarried: 408200,
    bracketBottomSingle: 160726,
    bracketBottomMarried: 321451,
    rate: 0.32
  },
  {
    bracketTopSingle: 510300,
    bracketTopMarried: 612350,
    bracketBottomSingle: 204101,
    bracketBottomMarried: 408201,
    rate: 0.35
  },
  {
    bracketTopSingle: Infinity,
    bracketTopMarried: Infinity,
    bracketBottomSingle: 510301,
    bracketBottomMarried: 612351,
    rate: 0.37
  }
];
const mustang = (
  age,
  savings,
  RothIRA,
  IRA,
  Traditional401K,
  Traditional,
  AnnualBudget,
  AnnualPensions,
  SocialSecurityAge,
  SocialSecurity,
  otherIncome,
  totalDebts,
  status,
  taxArray = [],
  nestEggArray = []
) => {
  age = Number(age);
  savings = Number(savings);
  RothIRA = Number(RothIRA);
  IRA = Number(IRA);
  Traditional401K = Number(Traditional401K);
  Traditional = Number(Traditional);
  AnnualBudget = Number(AnnualBudget);
  AnnualPensions = Number(AnnualPensions);
  SocialSecurityAge = Number(SocialSecurityAge);
  SocialSecurity = Number(SocialSecurity);
  otherIncome = Number(otherIncome);
  totalDebts = Number(totalDebts);

  // console.log('age', age);
  // console.log( 'savings', savings);
  // console.log( 'Roth', RothIRA);
  // console.log( 'IRA', IRA);
  // console.log( '401k', Traditional401K);
  // console.log( 'Traditional', Traditional);
  // console.log( 'budget', AnnualBudget);
  // console.log( 'pensions', AnnualPensions);
  // console.log( 'SSage', SocialSecurityAge);
  // console.log( 'SS', SocialSecurity);
  // console.log( 'income', otherIncome);
  // console.log( 'debts', totalDebts);

  //to keep from mutating the actual budget variable, create a placeholder budget variable
  let budget = AnnualBudget;
  //the taxable amount of income is the taxable variable
  let taxable = 0;
  //pay 8% of your debts every year
  taxable += totalDebts - (totalDebts * .92);
  totalDebts = totalDebts * .92;
  //lower the budget by pensions and other income
  taxable += AnnualPensions + otherIncome;
  budget -= AnnualPensions + otherIncome;
  //if age is greater than social security, collect and tax social security
  if (age >= SocialSecurityAge) {
    taxable += SocialSecurity * .5;
    budget -= SocialSecurity;
  }
    // if you are older than 72, you are required to take minimum distributions
    // from your IRA and 401k
  //subtract these values from the budget and the respective account
  if (age >= 72) {
    const reduceIRA = IRA / (MINIMUMDISTRIBUTION[age - 72]);
    IRA -= reduceIRA;
    budget -= reduceIRA;
    taxable += reduceIRA;
    const reduce401K = Traditional401K / ( MINIMUMDISTRIBUTION[age - 72]);
    Traditional401K -= reduce401K;
    budget -= reduce401K;
    taxable += reduce401K;
  }
  //if you've earned enough in social security, pensions,
  //other income, and the minimum distributions to
  //satisfy the budget, invest the overflow into the traditional account
  if (budget <= 0) {
    Traditional -= budget;
  }



  let index = 0;
  while (budget > 0) {
    //if you can sustain your roth, go ahead and pay off your excess
    if (RothIRA > (budget * (95 - age))) {
      RothIRA -= budget;
      budget = 0;
    }
    let top = status === 'single' ? TAXBRACKET[index].bracketTopSingle
    : TAXBRACKET[index].bracketTopMarried;
    if (taxable <= top && budget >= top - taxable) {
      //budget payment order -- traditional, 401k, ira, roth, savings, debt
        if (Traditional >= top - taxable) {
          Traditional -= top - taxable;
          budget -= top - taxable;
          taxable = top;
        }

        if (Traditional <= top - taxable) {
          taxable += Traditional;
          budget -= Traditional;
          Traditional = 0;
        }
        if (Traditional401K >= top - taxable) {
          Traditional401K -= top - taxable;
          budget -= top - taxable;
          taxable = top;
        }
        if (Traditional401K <= top - taxable) {
          taxable += Traditional401K;
          budget -= Traditional401K;
          Traditional401K = 0;
        }
        if (IRA >= top - taxable) {
          IRA -= top - taxable;
          budget -= top - taxable;
          taxable = top;
        }
        if (IRA <= top - taxable) {
          taxable += IRA;
          budget -= IRA;
          IRA = 0;
        }
        if (RothIRA >= top - taxable) {
          RothIRA -= top - taxable;
          budget -= top - taxable;
        }
        if (RothIRA <= top - taxable) {
          budget -= RothIRA;
          RothIRA = 0;
        }
        if (savings >= top - taxable) {
          savings -= top - taxable;
          budget -= top - taxable;
        }
        if (savings <= top - taxable) {
          budget -= savings;
          savings = 0;
        }
        if (Traditional === 0 && Traditional401K === 0 && IRA === 0 && RothIRA === 0 && savings === 0) {
          totalDebts += budget;
          budget = 0;
        }
    }
    if (budget > 0 && top - taxable > 0 && budget < top - taxable) {
      //budget payment order -- traditional, 401k, ira, roth, savings, debt
      if (Traditional >= budget) {
        Traditional -= budget;
        taxable += budget;
        budget = 0;
      }
      if (Traditional <= budget) {
        taxable += Traditional;
        budget -= Traditional;
        Traditional = 0;
      }

      if (Traditional401K >= budget) {
        Traditional401K -= budget;
        taxable += budget;
        budget = 0;
      }
      if (Traditional401K <= budget) {
        taxable += Traditional401K;
        budget -= Traditional401K;
        Traditional401K = 0;
      }

      if (IRA >= budget) {
        IRA -= budget;
        taxable += budget;
        budget = 0;
      }
      if (IRA <= budget) {
        taxable += IRA;
        budget -= IRA;
        IRA = 0;
      }

      if (RothIRA >= budget) {
        RothIRA -= budget;
        budget = 0;
      }
      if (RothIRA <= budget) {
        budget -= RothIRA;
        RothIRA = 0;
      }

      if (savings >= budget) {
        savings -= budget;
        budget = 0;
      }
      if (savings <= budget) {
        budget -= savings;
        savings = 0;
      }

      if (Traditional === 0 && Traditional401K === 0 && IRA === 0 && RothIRA === 0 && savings ===0 ) {
        totalDebts += budget;
        budget = 0;
      }
    }
    index++;
  }
    //the actual amount of taxes owed is the taxes variable
    let taxes = 0;
  //pay taxes by comparing taxable to the taxbracket and converting the rate and taxable
  //in each tier into taxes
  for (let i = 0; i < TAXBRACKET.length; i++) {
    if (taxable === 0) {
      break;
    }
    let top = status === 'single' ? TAXBRACKET[i].bracketTopSingle
    : TAXBRACKET[i].bracketTopMarried;
    let bottom = status === 'single' ? TAXBRACKET[i].bracketBottomSingle
    : TAXBRACKET[i].bracketBottomMarried;
    if (taxable < top - bottom) {
      taxes += TAXBRACKET[i].rate * taxable;
      taxable = 0;
    }
    else if (taxable > top - bottom) {
      taxes += TAXBRACKET[i].rate * (top - bottom);
      taxable -= top - bottom;
    }
  }
  taxArray.push(taxes);
  if (Traditional >= taxes) {
    Traditional -= taxes;
    taxes = 0;
  }
  if ( taxes >= Traditional) {
    taxes -= Traditional;
    Traditional = 0;
  }
  if (Traditional401K >= taxes) {
    Traditional401K -= taxes;
    taxes = 0;
  }
  if ( taxes >= Traditional401K) {
    taxes -= Traditional401K;
    Traditional401K = 0;
  }
  if (IRA >= taxes) {
    IRA -= taxes;
    taxes = 0;
  }
  if ( taxes >= IRA) {
    taxes -= IRA;
    IRA = 0;
  }
  if (RothIRA >= taxes) {
    RothIRA -= taxes;
    taxes = 0;
  }
  if ( taxes >= RothIRA) {
    taxes -= RothIRA;
    RothIRA = 0;
  }
  if (savings >= taxes) {
    savings -= taxes;
    taxes = 0;
  }
  if ( taxes >= savings) {
    taxes -= savings;
    savings = 0;
  }
  if (Traditional === 0 && Traditional401K === 0 && IRA === 0 && RothIRA === 0 && savings === 0) {
    totalDebts += taxes;
    taxes = 0;
  }

    //make interest on your accounts
    let interest = 8;
    let stdev = 5;
    let ror =
      Math.random() * (interest + 2 * stdev - (interest - 2 * stdev)) -
      (interest - 2 * stdev);
    RothIRA += RothIRA * (ror / 100);
    IRA += IRA * (ror / 100);
    Traditional401K += Traditional401K * (ror / 100);
    Traditional += Traditional * (ror / 100);
    //savings increases 1.5%, social security increases 1.5%, annual budget increases 2%
    savings += savings * 0.015;
    SocialSecurity += SocialSecurity * 0.015;
    AnnualBudget += AnnualBudget * 0.02;
    const nestEgg = savings + Traditional + Traditional401K + IRA + RothIRA - totalDebts;
    nestEggArray.push(nestEgg);

    if (age < 95) {
      age++;
      return mustang(
        age,
        savings,
        RothIRA,
        IRA,
        Traditional401K,
        Traditional,
        AnnualBudget,
        AnnualPensions,
        SocialSecurityAge,
        SocialSecurity,
        otherIncome,
        totalDebts,
        status,
        taxArray,
        nestEggArray
      );
    } else if (age === 95) {
      //format numbers to have 2 decimal places at the end
      for (let i = 0; i < nestEggArray.length; i++) {
        nestEggArray[i] = Number.parseFloat(nestEggArray[i]).toFixed(2);
        taxArray[i] = Number.parseFloat(taxArray[i]).toFixed(2);
      }
    }
  
    if (nestEgg > 0) {
      return [true, taxArray, nestEggArray];
    } else {
      return [false, taxArray, nestEggArray];
    }
  };
  
  module.exports = mustang;

  