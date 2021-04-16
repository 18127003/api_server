const express = require("express");
const Chemical = require("../model/Chemical");
const router = express.Router();
const path = require('path');
var multipart = require("connect-multiparty");
var multipartMiddleware = multipart();

var chemicalList = [
    'Sodium hydrogen sulfate',
    'Silicon dioxide',
    'Octasulfur',
    'Tetraamminecopper(II) hydroxide',
    'Nitrogen oxide',
    'Potassium iodide',
    'Hydrogen sulfide',
    'Silver bromide',
    'Phosphorus',
    'Carbon dioxide',
    'Ammonium hydrogen phosphate',
    'Hydrobromic acid',
    'Barium chloride',
    'Iron (III) oxide',
    'Magnesium nitride',
    'Triamminetriaquachromium(III) chloride',
    'Dichlorine heptoxide',
    'Potassium dichromate',
    'Ammonia',
    'Lithium hydride',
    'sulfur hexafluoride',
    'ammonium dihydrogen phosphate',
    'sodium hypobromite',
    'diamminecsilver(I) hydroxide',
    'dinitrogen oxide',
    'manganese (II) sulfate',
    'lithium nitride',
    'potassium permanganate',
    'helium',
    'carbon monoxide',
    'iron (II,III) oxide',
    'copper (I) sulfide',
    'aluminium chloride',
    'calcium carbide',
    'oxygen',
    'calcium silicate',
    'phosphorous acid',
    'sodium chromate',
    'methane',
    'hydrogen peroxide',
    'sulfurous acid',
    'bromine',
    'silver chloride',
    'sodium dicyanoargenate(I)',
    'sulfur dioxide',
    'barium hydrogen carbonate',
    'aluminium carbide',
    'diboron trioxide',
    'copper',
    'iron (III) sulfate',
    'magnesium oxide',
    'ammonium nitrate',
    'chloric acid',
    'mercury (II) sulfide',
    'sodium tetrahydroxozincate(II)',
    'sodium hydride',
    'hydrogen chloride',
    'hydroiodic acid',
    'ozone',
    'hydrogen peroxide'
]
var formulaList = [ 
    'NaHSO4',
    'SiO2',
    'S8',
    '[Cu(NH3)4](OH)2',
    'NO',
    'KI',
    'H2S (khí)',
    'AgBr',
    'P',
    'CO2',
    '(NH4)2HPO4',
    'HBr (dung dịch)',
    'BaCl2',
    'Fe2O3',
    'Mg3N2',
    '[Cr(NH3)3(H2O)3]Cl3',
    'Cl2O7',
    'K2Cr2O7',
    'NH3',
    'LiH',
    'SF6',
    'NH4H2PO4',
    'NaBrO',
    '[Ag(NH3)2](OH)',
    'N2O',
    'MnSO4',
    'Li3N',
    'KMnO4',
    'He',
    'CO',
    'Fe3O4',
    'Cu2S',
    'AlCl3',
    'CaC2',
    'O2',
    'CaSiO3',
    'H3PO3',
    'Na2CrO4',
    'CH4',
    'H2O2',
    'H2SO3',
    'Br2',
    'AgCl',
    'Na2[Ag(CN)2]',
    'SO2',
    'Ba(HCO3)2',
    'Al4C3',
    'B2O3',
    'Cu',
    'Fe2(SO4)3',
    'MgO',
    'NH4NO3',
    'HClO3',
    'HgS',
    'Na2[Zn(OH)4]',
    'NaH',
    'HCl (khí)',
    'HI (dd)',
    'O3',
    'H2O2'
]




var prepareData = function(test_number){
    var chems = [];

    for(let j=0;j<20;++j){
        let formula = '', chemical='';
        switch(Math.floor(Math.random()*3)){
            case 1:
                chemical = chemicalList[test_number*20+j];
                break;
            case 2:
                formula = formulaList[test_number*20+j];
                break;
            default:
                break;
        }
        var chem = new Chemical( formula, chemical, `/audio/${test_number+1},${j+1}.mp3`);
        chems.push(chem);
    }
    return chems;
}

router.get("/",(req, res)=> {
    var test1 = prepareData(0)
    var test2 = prepareData(1)
    var test3 = prepareData(2)
    tests = [test1, test2, test3]
    res.render("test",{tests: tests})
});

router.post("/check",multipartMiddleware,(req, res)=>{
    index = req.query.index;

    ansFormula = JSON.parse(req.body.ansFormula);
    ansChemical = JSON.parse(req.body.ansChemical);

    var right = 0;
    wrongFormula = [];
    wrongChemical = [];
    ansFormula.forEach(formula => {
        answer = JSON.parse(formula)
        if(answer.answer.toLowerCase()==formulaList[index*20+answer.index].toLowerCase()){
            right++;
        } else {
            wrongFormula.push(JSON.stringify({
                index: answer.index,
                truth: formulaList[index*20+answer.index]
            }))
        }
    });
    ansChemical.forEach(chemical=>{
        answer = JSON.parse(chemical)
        if(answer.answer.toLowerCase()==chemicalList[index*20+answer.index].toLowerCase()){
            right++;
        } else {
            wrongChemical.push(JSON.stringify({
                index: answer.index,
                truth: chemicalList[index*20+answer.index]
            }))
        }
    })
    res.json({
        score: `${right}/${ansFormula.length+ansChemical.length}`,
        wrongFormula: JSON.stringify(wrongFormula),
        wrongChemical: JSON.stringify(wrongChemical),
    });
})


module.exports = router;