$(document).ready(function() {
    var detailFunction = function(btnClass, ulClass) {
        $(btnClass).click(function () {
            if($(ulClass).hasClass("d-none"))
                $(ulClass).removeClass("d-none")
            else
                $(ulClass).addClass("d-none");
        });
    };

    detailFunction(".btn-detail-gundam", ".gundam-cate");
    detailFunction(".btn-detail-tools", ".tools-cate");
    detailFunction(".btn-detail-paints", ".paints-cate");
})