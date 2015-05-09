//Parse GET parameters and do appropriate mouse actions
function categoryNav(){
    $( document ).ready(function() {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        $('#' +vars[i]).click();
    }
    });
}
