var slider = document.getElementById("slider");

noUiSlider.create(slider, {
    start: [0, 1000000],
    connect: true,
    range: {
        min: 0,
        max: 1000000,
    },
    tooltips: [
        true, // no tooltip
        wNumb({ decimals: 1 }), // tooltip with custom formatting
    ],
});

var gridItem = function (product) {
    return `<div class="col-sm-6 col-md-4 col-lg-3">
                <div class="item">
                    <div class="products">
                        <div class="product">
                        <div class="product-image">
                            <div class="image">
                                <a href="/products/detail/${product._id}">
                                    <img src="${product.image[0]}" alt=""/>
                                    <img class="hover-image" src="${
                                        product.image[1]
                                    }" alt=""/>
                                </a>
                                <div class="tag sale">
                                    <span>Sale</span>
                                </div>
                            </div>
                        </div>
                        <!-- /.product-image-->
                        <div class="product-info text-left">
                            <h3 class="name"><a href="/products/detail/${
                                product._id
                            }">${product.name}</a></h3>
                            <div class="rating rateit-small">
                                <div class="description">
                                    <div class="product-price">
                                    <span class="price">${product.priceSale.toLocaleString(
                                        "vi",
                                        { style: "currency", currency: "VND" }
                                    )}</span>
                                    ${
                                        product.sale > 0
                                            ? `<span class="price-before-discount">${product.price.toLocaleString(
                                                  "vi",
                                                  {
                                                      tyle: "currency",
                                                      currency: "VND",
                                                  }
                                              )}</span>`
                                            : ""
                                    }}
                                </div>
                            </div>
                            </div>
                        </div>
                        <div class="cart clearfix animate-effect">
                            <div class="action">
                            <ul class="list-unstyled">
                                <li class="add-cart-button btn-group"><a class="btn btn-primary icon" href="/products/add-to-cart/${
                                    product._id
                                }"><i class="fa fa-shopping-cart"></i></a></li>
                                <li class="lnk wishlist"><a class="add-to-cart" href="/products/add-to-wishlist/${
                                    product._id
                                }" title="Wishlist"><i class="icon fa fa-heart"></i></a></li>
                            </ul>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
            </div>`;
};

var listItem = function (product) {
    return `<div class="category-product-inner">
                <div class="products">
                    <div class="product-list product">
                    <div class="row product-list-row">
                        <div class="col col-sm-3 col-lg-3">
                        <div class="product-image">
                            <div class="image"><img src="${
                                product.image[0]
                            }"/></div>
                        </div>
                        <!-- /.product-image-->
                        </div>
                        <!-- /.col-->
                        <div class="col col-sm-9 col-lg-9">
                        <div class="product-info">
                            <h3 class="name"><a href="/products/detail/${
                                product._id
                            }">${product.name}</a></h3>
                            <div class="rateit-small">
                            <div class="product-price">
                                <span class="price">${product.priceSale.toLocaleString(
                                    "vi",
                                    {
                                        tyle: "currency",
                                        currency: "VND",
                                    }
                                )}</span>
                                <span class="price-before-discount">${product.price.toLocaleString(
                                    "vi",
                                    {
                                        tyle: "currency",
                                        currency: "VND",
                                    }
                                )}</span>
                            </div>
                            <!-- /.product-price-->
                            <div class="description m-t-10">
                                <ul>
                                    ${product.description.map((item) => {
                                        return `<li>${item}</li>`;
                                    })}
                                </ul>
                            </div>
                            <div class="cart clearfix animate-effect">
                                <div class="action">
                                <ul class="list-unstyled">
                                    <li class="add-cart-button btn-group">
                                    <button class="btn btn-primary icon" data-toggle="dropdown" type="button"><i class="fa fa-shopping-cart"></i></button>
                                    <button class="btn btn-primary cart-btn" type="button">Add to cart</button>
                                    </li>
                                    <li class="lnk wishlist"><a class="add-to-cart" href="detail.html" title="Wishlist"><i class="icon fa fa-heart"></i></a></li>
                                </ul>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div class="tag new"><span>new</span></div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>`;
};

document.getElementById("btn-slider").addEventListener("click", function () {
    var value = slider.noUiSlider.get();

    value.forEach(item => {
        console.log(parseFloat(item))
    })
});
