$(function() {
    fetch('https://jsonplaceholder.typicode.com/photos', {method: "GET"})
    .then(res => res.json())
    .then(result =>{
        let newArr = result.slice(0,100);
        let carCont = $('.main-carousel');
        $(newArr).each((idx,val) => {
            let currImg = $('<div class="carousel-cell"><img src="'+val.url+'"/><h class="item-specs"><p class="item-title"><span class="compKey">TITLE: </span><span class="compVal">'+val.title+'</span></p><p class="item-id"><span class="compKey">ID: </span><span class="compVal">'+val.id+'</span></p><p class="item-url"><span class="compKey">URL: </span><span class="compVal">'+val.url+'</span></p></h><button class="cmpBtn" onclick="cmpBtnClick(this)">COMPARE</button><button class="rmvBtn" onclick="rmvBtnClick(this)" style="display:none;">REMOVE</button></div>');
            carCont.append(currImg);
        });
        $('body').append($('<script src="https://unpkg.com/flickity@2/dist/flickity.pkgd.min.js"></script>'));
        carCont.show();
    });
});

function cmpBtnClick(elm) {
    $('.table-content').show();
    let currElm = $(elm); 
    currElm.hide().next('.rmvBtn').show();
    let outputElms = currElm.prev('.item-specs').children();
    let tableBodyElm = $('.comp-table tbody');
    let tableHtml = $('<tr><td>photo ' + ($('tbody tr').length+1) + '</td><td>'+$(outputElms[1]).find('.compVal').text()+'</td><td>'+$(outputElms[2]).find('.compVal').text()+'</td><td>'+$(outputElms[0]).find('.compVal').text()+'</td></tr>');
    tableBodyElm.append(tableHtml);
    let tableContentDiv = $('.table-content');
    tableContentDiv.prop('scrollTop', tableContentDiv.prop("scrollHeight"));
}

function rmvBtnClick(elm) {
    let currElm = $(elm); 
    currElm.hide().prev('.cmpBtn').show();
    let remElmId = $(currElm.prev().prev('.item-specs').children()[1]).find('.compVal').text();
    let loopElms = $('tbody tr');
    for(let i=0; i< loopElms.length; i++) {
        let currRow = loopElms[i];
        if($($(currRow).find('td')[1]).text() == remElmId) {
            $(currRow).remove();
            for(let j=i; j<loopElms.length-1; j++) {
                let photoIndex = 'photo ' + (j + 1);
                $($(loopElms[j+1]).find('td')[0]).text(photoIndex);
            }
            if(!$('tbody tr').length) $('.table-content').hide();
            break;
        }
    }
}