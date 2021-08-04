import Images from '../../components/exportFiles/exportImages';
let images = new Images();

/* let initialState = [
    {id:5,itemName:"Beats Solo On Ear Headphones - Black" ,image:images.BeatsSoloBlack1(),price:499},
    {id:6,itemName:"Apple Mac Pro" ,image:images.AppleMac(),price:parseInt(499)},
    {id:7,itemName:"Beats Solo On Ear Headphones - Red" ,image:images.BeatsSoloRed1(),price:499},
    {id:8,itemName:"Netatmo Rain Gauge" ,image:images.RainGauge(),price:499},
    {id:9,itemName:"Go Pro" ,image:images.GoPro(),price:499},
    {id:10,itemName:"Occulus Rift" ,image:images.OcculusRift(),price:499},
    {id:11, itemName: "HvTray", image:images.HvTray(), price:499},
    {id:12, itemName: "Beats Solo On Ear Headphones - Pink", image:images.BeatsSoloPink1(),price:499}
];*/
let initialState = false;
const Store = (state = initialState,action) => {
    switch(action.type){  
        case 'SET_INIT':
            state = action.payload.products;
            return state;      
        default:
            return state;
    }
}

export default Store;