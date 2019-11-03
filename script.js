

$(".section3").css("display", "none");
let product = [] 

/* Check localStorage for books */
if(window.localStorage.getItem('product')){
    product = JSON.parse(window.localStorage.getItem('product'));
}
if(product.length != 0){
    product.forEach(element => {
        $('.product-row').append('<div class="col"><div class="card" style="width: 18rem; height: 22rem ;"><img src="'+ element.url +'" class="card-img-top" alt="..."><div class="card-body"><h5 class="card-title">'+ element.name +'</h5><p class="card-text">price: '+ element.price +' bdt</p><p class="card-text2" style="display: none;">'+ element.description +'</p><a id="view" class="view-details" href="#" >View Details</a><a href="#" class="btn btn-primary addCart">Add To Cart</a></div></div></div>');
    });
}

$('#submit').click(function(event){
    
    var name = $('#formGroupExampleInput').val();
    var description = $('#formGroupExampleInput2').val();
    var url = $('#formGroupExampleInput3').val();
    var quantity =  $('#formGroupExampleInput4').val();
    var price = $('#formGroupExampleInput5').val();

    product.push({name:name, description:description, url:url, quantity:quantity, price:price });
        window.localStorage.setItem('product',JSON.stringify(product));
        

    $('.product-row').append('<div class="col"><div class="card" style="width: 18rem; height: 22rem ;"><img src="'+ $('#formGroupExampleInput3').val() +'" class="card-img-top" alt="..."><div class="card-body"><h5 class="card-title">'+ $('#formGroupExampleInput').val() +'</h5><p class="card-text">price: '+ $('#formGroupExampleInput5').val() +'</p> <p class="card-text2" style="display: none;">'+('#formGroupExampleInput2').val()+'</p> <a id="view" class="view-details" href="#" >View Details</a> <a href="#" class="btn btn-primary addCart ">Add To Cart</a></div></div></div>');
    $(".section1").css("display", "initial");





});



$('#add').click(function(event){
  
    $(".section1").css("display", "none");
    $(".section2").css("display", "initial");
    $(this).hide();
});


var buttonclass = document.getElementsByClassName('view-details');
var num = buttonclass.length;

console.log(num);

for(var i = 0; i< num; i++ ){
    var button = buttonclass[i];
    button.addEventListener('click', viewDetails)
}

function viewDetails(event){
    $(".section1").css("display", "none");
    var button1 = event.target
    var shopitem = button1.parentElement.parentElement
    var title = shopitem.getElementsByClassName('card-title')[0].innerText
    var price =  shopitem.getElementsByClassName('card-text')[0].innerText
    var imgsrc = shopitem.getElementsByClassName('card-img-top')[0].src
    var bio = shopitem.getElementsByClassName('card-text2')[0].innerText
        $('.section3').append('<div class="card mb-3" style="max-width: 540px; background-position: center; padding-top: 3rem; "><div class="row no-gutters"><div class="col-md-4"><img src="'+imgsrc +' " class="card-img" alt="..."></div><div class="col-md-8"> <div class="card-body"><h5 class="card-title"><b>'+ title +' </b></h5><p class="card-text2" style="display: initial;">'+ bio +' </p><p class="card-text"><b>'+price+' </b> </p> </div> </div></div> </div>');
        $(".section3").css("display", "initial"); 
}


let cart = [];

if(window.localStorage.getItem('cart')){
    cart = JSON.parse(window.localStorage.getItem('cart'));
}

var addtocartbutton = document.getElementsByClassName('addCart')

for(var i =0; i<addtocartbutton.length;i++){
    var buton = addtocartbutton[i];
    buton.addEventListener('click', addtocartclick)
}

function addtocartclick(event){
    var button1 = event.target
    var shopitem = button1.parentElement.parentElement
    var title = shopitem.getElementsByClassName('card-title')[0].innerText
    var price =  shopitem.getElementsByClassName('card-text')[0].innerText
    var imgsrc = shopitem.getElementsByClassName('card-img-top')[0].src
    cart.push({title:title,price:price, imageSrc:imgsrc });
        window.localStorage.setItem('cart',JSON.stringify(cart));
        $('.cart-items').append( '<div class="cart-row"><div class="cart-item cart-column"><img class="cart-item-image" src="'+ imgsrc +'" width="100" height="100"><span class="cart-item-title">'+ title + '</span><span class="cart-price cart-column">'+ price+'</span><div class="cart-quantity cart-column" ><input class="cart-quantity-input" type="number" value="1"><button class="btn btn-danger" type="button">REMOVE</button> </div></div> </div>')

        $(".nav-link .counter").text(cart.length);
}


$('.nav-link').click(function(event){
  
    $(".section1").css("display", "none");
    if(cart.length != 0){
    $(".section4").css("display", "initial");
    }
    else{
        $(".section5").css("display", "initial");
        $('#add').hide()
    }
    
})
   
var removebuttons = document.getElementsByClassName('btn-danger')
console.log(removebuttons.length)
for(var i=0; i< removebuttons.length; i++){
    var button = removebuttons[i]
    button.addEventListener('click', function(event){
        var buttonclick = event.target
     buttonclick.parentElement.parentElement.remove()
   updateCartTotal()
    })
}

function updateCartTotal(){
    var cartitemcontainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartitemcontainer.getElementsByClassName('cart-row')
    var total = 0;
    for(var i = 0; i<cartRows.length; i++){
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('price:', 'bdt', ''))
        var quantity = parseInt(quantityElement.val())
        total = total + (price* quantity)
    }
    document.getElementsByClassName('cart-total-price')[0].innerText = total + 'bdt'

}