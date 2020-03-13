var ABSMAX, ABSMIN;

function getSlider(props) {
    return d3
            .sliderBottom()
            .min(props.showMin)
            .max(props.showMax)
            .ticks(5)
            .tickFormat(d3.format('.0f'))
            .default([props.pointMin, props.pointMax])
            .fill('#2196f3');
}//getSlider

function updateSlider(selection, props, data) {
    var prevMin = props.showMin,
        changeSlider = false;
    slider = getSlider(props)
    slider
        .on("onchange", val => {
            d3.select('p#value-range').text(val.map(d3.format('.0f')).join(' - '));
        })
        .on('end', val => {
            dataSelection = getPeriod(data, val[0], val[1]);
            if (dataSelection.creation_year.length == 0) {
                val[0] = props.pointMin;
                val[1] = props.pointMax;
                slider.value([props.pointMin, props.pointMax]);
                selection.call(slider);
            }//if
            else {
                cultureSelectGroup.selectAll("rect").remove();
                genderSelectGroup.selectAll("rect").remove();
                genderBar(genderGroup, dataSelection);
                cultureBar(cultureGroup, dataSelection);
                donutSelectGroup.selectAll("path").remove();
                donutChart(donutChartGroup, dataSelection, gSelected);
                loadBackground(dataSelection);

                if (Math.abs(val[1]-val[0]) <= 500 && Math.abs(props.showMax-props.showMin) > 1000) {
                    changeSlider = true;
                    props.showMin = val[0] - 50;
                    props.showMax = val[1] + 50;
                    if (props.showMin < ABSMIN) props.showMin=ABSMIN;
                    if (props.showMax > ABSMAX) props.showMax=ABSMAX;
                }//if
                else if (Math.abs(props.showMax-props.showMin) < 1000 &&
                         val[0] == props.showMin && val[1] == props.showMax) {
                    changeSlider = true
                    props.showMin = ABSMIN;
                    props.showMax = ABSMAX;
                }//else if

                props.pointMin = val[0];
                props.pointMax = val[1];

                if (changeSlider) {

                    selection.transition().attr('transform', 'translate(250,20)')
                             .call(slider.value([prevMin, prevMin]).width(0));
                    selection.transition().delay(200).remove();
                    selection = d3.select("svg").append("g");
                    setTimeout(() => {
                        slider = updateSlider(selection, props, data);
                        selection.attr('transform', 'translate(250,20)').call(slider.width(0));
                        selection.transition().attr('transform', 'translate(30,20)')
                                 .call(slider.width(width-2*30))
                    }, 400);
                    setTimeout(() => {
                        selection.call(slider.value([val[0], val[1]]));
                    }, 480);
                }//if
                else
                    selection.call(slider);
            }//else
    });
    return slider;
}//updateSlider

function timeSlider(selection, data) {
    ABSMIN = d3.min(data.creation_year);
    ABSMAX = d3.max(data.creation_year);
    var props = { pointMin: ABSMIN, pointMax: ABSMAX,
                  showMin:  ABSMIN, showMax:  ABSMAX }
    var slider = updateSlider(selection, props, data);

    selection
        .attr('transform', 'translate(250,20)')
        .call(slider.width(0))
        .transition()
        .attr('transform', 'translate(30,20)')
        .call(slider.width(width-2*30));

    d3.select('p#value-range').text(
        slider
          .value()
          .map(d3.format('.0f'))
          .join(' - '));
    console.log(slider.value())
}//timeSlider
