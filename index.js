var clicks = 0;
var primerClick;
var attempts = 0;
var hits = 0;
var niveles = 0;
var num = 0;
var inName = $("#validar").val();

var tableImages = $(".tableImages");
const arrayImages = [
  "images/alce.jpg",
  "images/epelante.jpg",
  "images/nena.jpg",
  "images/peces.jpg",
  "images/unichancho.jpg",
  "images/zapas.jpg",
  "images/alce.jpg",
  "images/epelante.jpg",
  "images/nena.jpg",
  "images/peces.jpg",
  "images/unichancho.jpg",
  "images/zapas.jpg"
];

//Validacion de nombre y nivel
$(".buttons").on("click", function(e) {
  e.preventDefault();
  var inName = $("#validar").val();
  if (inName != null && inName != 0) {
    $(".mainContainer").addClass("ocultar");
    $("#memoT").removeClass("ocultar");
  } else {
    $(".advert").html("<p>UPSS...El nombre es requerido.</p>");
  }
});

//dar vuelta a las imagesnes
var cartaLength = $("img").length;
for (var i = 0; i < cartaLength; i++) {
  $("img")
    .eq(i)
    .attr("data-img", arrayImages[i]);
}
$("img").on("click", function() {
  var visible = $(this).attr("data-img");
  // console.log(visible);
  $(this).attr("src", visible);
});
// imagenes random
const aleatorio = mix(arrayImages);
function mix(l) {
  for (var i = l.length - 1; i > 0; i--) {
    const h = Math.floor(Math.random() * (i + 1));
    [l[i], l[h]] = [l[h], l[i]];
  }
  return l;
}
$("img").on("click", function(e) {
  const imgId = e.target.id;
  const id = $("#" + imgId).attr("data-id");
  $("#" + imgId).attr("src", aleatorio[id - 1]);
});

// capturar el nombe y mostrarlo
$(".buttons").on("click", function() {
  inName = $("#validar").val();
  $("#welcome").html(`<p>Hola  ${inName} </p>`);
  
});

//capturar nivel
$("#easy").on("click", function() {
  niveles = "facil";
  num = 18;
  $("#level").html(` </p><p>Encontra todos los pares en menos de <font color="blue">${num}</font> intentos</p><p> Nivel  ${niveles}`);
 
});

$("#intermediate").on("click", function() {
  niveles = "intermedio";
  num = 12;
  $("#level").html(` </p><p>Encontra todos los pares en menos de <font color="blue">${num}</font> intentos</p><p> Nivel  ${niveles}`);
});

$("#expert").on("click", function() {
  niveles = "experto";
  num = 9;
  $("#level").html(` </p><p>Encontra todos los pares en menos de <font color="blue">${num}</font> intentos</p><p> Nivel  ${niveles}`);
});

//efecto flip
$(".imagesTapada").on("click", function() {
  $(this).addClass("flip");
});

//comprobar si son iguales
$("img").on("click", function() {
  clicks = clicks + 1;
  if (clicks == 1) {
    var id = $(this).attr("id");
    var img = $(this).attr("src");

    firstClick = {
      id: id,
      img: img
    };
  } else {
    if (firstClick.img == $(this).attr("src")) {
      $(this).addClass("pintar");
      $("#" + firstClick.id).addClass("pintar");
      attempts = attempts + 1;
      hits = hits + 1;

      if (attempts <= num && hits == 6) {
        var inName = $("#validar").val();
        var winners = {
          name: inName,
          level: attempts,
          intentos: niveles
        };
        var saveInfo = localStorage.getItem("info");
        saveInfo = JSON.parse(saveInfo);

        if (saveInfo == null) {
          saveInfo = [];
        }

        saveInfo.push(winners);

        // pasar mi obj a un string
        localStorage.setItem("info", JSON.stringify(saveInfo));

        var winnersHtml = "";
        $(".minMod").removeClass("ocultar");
        for (var i = 0; i < saveInfo.length; i++) {
          winnersHtml += `<tr>
            <td>${saveInfo[i].name}</td> 
            <td>${saveInfo[i].level}</td>
            <td>${saveInfo[i].intentos}</td>
          </tr>`;
        }
        $(".minMod")
          .html(`<p> Ganaste  <i class="em em-bouquet"></i> ! con  ${attempts} intentos.<p> Ya podes volver a jugar</p></p> <table  class="ranking">
        <tr>
            <th>NOMBRE</th>
            <th>NIVEL</th>
            <th>INTENTOS</th>
        </tr>
        ${winnersHtml}
     </table> `);
        $(".minMod").append(
          `<a  href="index.html"><input type="botton"  name="button" value="VOLVER A JUGAR"/> </a>`
        );
        // attempts = 0
      }

      //data-img hay que verificar por que no esta funcionando
    } else {
      var that = this;
      setTimeout(function() {
        $(that).attr("src", "images/tapada.jpg");
        $("#" + firstClick.id).attr("src", "images/tapada.jpg");
      }, 1000);
      attempts = attempts + 1;
    }
    if (attempts > num) {
      $(".minMod").removeClass("ocultar");
      $(".minMod").html(
        `<p> PERDISTE <i class="em em-worried"></i> </p> <a  href="index.html"><input type="botton"  name="button" value="VOLVER A INTENTAR"/></a>`
      );
      $("#memoT").addClass("trans");
      attempts = attempts - 1;
    }

    $(".attempts").html(` ${attempts} `);

    //COMPARACION
    clicks = 0;
  }
});
