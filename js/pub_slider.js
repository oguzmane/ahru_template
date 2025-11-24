function pubYearSliderFUN(data_in,key_in) {

    const all_year = data_in.map(obj=>obj[key_in]); // array, so .map() is needed

    const minYear = Math.min(...all_year); // spread operator needed bc Math.min takes in a list, not an array 
    const maxYear = Math.max(...all_year); // same thing here
    
    const slider = document.getElementById('pubYearSlider'); 
    noUiSlider.create(slider, {
        start: [minYear, maxYear],   // initial handles
        connect: true,
        step: 1,                     // integer steps
        range: {
            'min': minYear,
            'max': maxYear
        },
        tooltips: true,              // show current values
        format: {
            to: value => Math.round(value),
            from: value => Number(value)
        }
    });

    return slider;

}

function getSelectedPubYearFUN(slider_in) {
    // .get() returns an array of strings by default, so convert to numbers
    const values = slider_in.noUiSlider.get().map(Number);
    const minPubYear = values[0];
    const maxPubYear = values[1];
    return { minPubYear, maxPubYear };
}

