var  tableImages = $('.tableImages');
const arrayImages =  ['images/alce.jpg', 'images/epelante.jpg', 'images/nena.jpg', 
'images/peces.jpg', 'images/unichancho.jpg','images/zapas.jpg','images/alce.jpg', 'images/epelante.jpg', 'images/nena.jpg', 
'images/peces.jpg', 'images/unichancho.jpg','images/zapas.jpg'];


//Validacion de nombre
$(".buttons").on("click", function(e) {
  e.preventDefault()
  var input = $("#validar").val();
  if (input == null || input.length == 0 || /^\s+$/.test(input)) {
   $(".advert").html('<p>UPSS...El nombre es requerido.</p>');
   
  }
});

//aparece el tablero
$("#easy").on("click", function() {
  $('.mainContainer').addClass('ocultar');
  $('#memoT').removeClass('ocultar')
});

//dar vuelta a las imagesnes
var cartaLength = $('img').length
for (var i = 0; i < cartaLength; i++) {
 $('img').eq(i).attr('data-img', arrayImages[i])
 
}

$('img').on('click', function() {
  var visible = $(this).attr('data-img')
  $(this).attr('src', visible)
  
})
// imagenes random
const aleatorio = mix(arrayImages)
function mix(l) {
  for(var i = l.length -1; i > 0; i--){
    const h = Math.floor(Math.random() * (i + 1));
    [l[i], l[h]] = [l[h], l[i]];
  }
  return l;
}
$('img').on('click', function(e) {
  const imgId = e.target.id
  const id = $('#' + imgId).attr('data-id')
  $('#' + imgId).attr('src', aleatorio[id - 1])
})

//como capturar el nombe y mostrarlo
$(".buttons").on('click',function(){
  var name= $('#validar').val();
  $("#welcome").html(`<p>Hola  ${name} </p>`); 
})


//comprobar si son iguales





