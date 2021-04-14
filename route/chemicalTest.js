const express = require("express");
const Chemical = require("../model/Chemical");
const router = express.Router();
const path = require('path')

router.get("/",(req, res)=> {
    var chems = prepareData();
    res.render("test",{test: chems})
});
var chemicalList = [
    'Sodium hydrogen sulfate',
    'Silicon dioxide',
    'Octasulfur',
    'Tetraamminecuprate(II) hydroxide',
    'Nitrogen oxide',
    'Potassium iodide',
    'Hydrogen sulfide',
    'Silver bromide',
    'Phosphorus',
    'Carbonic',
    'Ammonium hydrogen phosphate',
    'Hydrobromic acid',
    'Barium chloride',
    'Iron (III) oxide',
    'Magnesium nitride',
    'Triamminetriaquachromium(III) chloride',
    'Dichlorine heptoxide',
    'Potassium dichromate',
    'Ammonia',
    'Lithium hydride'
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
]
var prepareData = function(){
    var chems = [];
    for(let i =0;i<3;++i){
        for(let j=0;j<20;++j){
            let formula = '', chemical='';
            switch(Math.floor(Math.random()*3)){
                case 1:
                    chemical = chemicalList[j];
                    break;
                case 2:
                    formula = formulaList[j];
                    break;
                default:
                    break;
            }
            var chem = new Chemical( formula, chemical, `/audio/1,2.mp3`);
            chems.push(chem);
        }
    }
    return chems;
}

module.exports = router;