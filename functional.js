/**
 * Created by VP on 4/8/16.
 */

var object = [];
var amount = 0;
var MAX_NUM = 718;



$(document).ready(function ()
{
    $.ajax({
        url: "http://pokeapi.co/api/v1/pokedex/1/",
        method: "GET",
        success: function (result) {
            var pokemon = result.pokemon;
            //console.log(result);


            $.each(pokemon, function (index, value) {
                var id = value['resource_uri'].slice(6).match(/\d+/).toString();
                if (id < MAX_NUM + 1) {
                    object[id] =
                    {
                        id: id,
                        name: value.name.charAt(0).toUpperCase() + value.name.slice(1),
                        url: "http://pokeapi.co/" + value.resource_uri,
                        img: "http://pokeapi.co/media/img/" + id + ".png",
                        types: []
                    };
                }
            });
            console.log(object);


            var divpokemon = [];
            var imagepokemon = [];
            var names = [];
            var powers = [];

            var cataloge = document.getElementById("pokemons");





            function Load() {
                for (var i = 0; i < 12; i++) {
                    var j = amount + i  + 1;
                    if (j > MAX_NUM) {
                        break;
                    }
                    console.log(1 + " " + j);
                    divpokemon[j] = document.createElement("div");
                    divpokemon[j].className = 'shityClass';
                    imagepokemon[j] = document.createElement("img");
                    names[j] = document.createElement("p");
                }

                //console.log(divpokemon);
                //console.log(imagepokemon);
                //console.log(names);
                console.log(powers);


                for (var i = 0; i < 12; i++) {
                        (function () {
                        var j = amount + 1 + i;
                            if (j > MAX_NUM) {
                                return;
                            }
                        var url = [];
                        url[j] = object[j].url;
                        $.ajax({
                            url: url[j],
                            method: "GET",
                            success: function (result) {
                                object[j].types = result.types;
                                object[j].attack = result.attack;
                                object[j].defense = result.defense;
                                object[j].hp = result.hp;
                                object[j].sp_atk = result.sp_atk;
                                object[j].sp_def = result.sp_def;
                                object[j].speed = result.speed;
                                object[j].weight = result.weight;
                                object[j].moves = result.moves;

                                console.log(result);

                                console.log(object[j].types);
                                for (var q = 0; q < object[j].types.length; q++) {
                                    var element = document.createElement("div");
                                    var powers = document.getElementById("pokemon_" + j).appendChild(element);
                                    powers.innerHTML = object[j].types[q].name.charAt(0).toUpperCase() + object[j].types[q].name.slice(1);
                                    powers.className = object[j].types[q].name;
                                    document.getElementById("pokemon_" + j).onclick = function () {
                                        Click(object[j]);
                                    };
                                    //console.log(powers[j][q]);
                                }

                            }
                        });
                    })();
                }


                for (var i = 0; i < 12; i++) {
                    console.log(2 + " " + j);
                    var  j = i + 1 + amount;
                    if (j > MAX_NUM) {
                        break;
                    }
                    divpokemon[j].id = "pokemon_" + j;
                    names[j].innerHTML = object[j].name;
                    names[j].className = "name";
                    imagepokemon[j].setAttribute("src", object[j].img);
                    imagepokemon[j].className = "pokemonimage";
                    divpokemon[j].appendChild(imagepokemon[j]);
                    divpokemon[j].appendChild(names[j]);
                    cataloge.appendChild(divpokemon[j]);
                }

                function Click(object) {
                    DeleteSelectedPokemonBox();

                    var rightcataloge = document.createElement("div");
                    rightcataloge.onclick = function () {
                        DeleteSelectedPokemonBox();
                    };
                    rightcataloge.id = "SelectedPokemonId";
                    var info = document.createElement("table");
                    info.className = 'mainTable';


                    var image = document.createElement("img");
                    var name = document.createElement("p");

                    name.innerHTML = object.name;
                    name.className = "name1";

                    image.setAttribute("src", object.img);
                    image.className = "pokemonimage1";


                    info.appendChild(image);
                    info.appendChild(name);
                    for (var i = 0; i < object.types.length; i++) {
                        Add(info, "Type " + (i + 1), object.types[i].name.charAt(0).toUpperCase() + object.types[i].name.slice(1));
                    }
                    Add(info, "Attack ", object.attack);
                    Add(info, "Defense ", object.defense);
                    Add(info, "HP ", object.hp);
                    Add(info, "Special Attack ", object.sp_atk);
                    Add(info, "Special Defense ", object.sp_def);
                    Add(info, "Speed ", object.speed);
                    Add(info, "Weight ", object.weight);
                    Add(info, "All moves ", object.moves.length);

                    rightcataloge.appendChild(info);
                    console.log(rightcataloge);
                    document.getElementsByTagName('body')[0].appendChild(rightcataloge);

                }

                amount += 12;
            }
            Load();

            function Add (table, name, value) {
                var tr =document.createElement("tr");
                var td1 = document.createElement("td");
                var td2 = document.createElement("td");
                td1.innerHTML = name;
                td2.innerHTML = value;
                tr.appendChild(td1);
                tr.appendChild(td2);
                table.appendChild(tr);
            }

            function DeleteSelectedPokemonBox() {
                var dummyRightCataloge = document.getElementById("SelectedPokemonId");
                if (dummyRightCataloge != null) {
                    document.getElementsByTagName('body')[0].removeChild(dummyRightCataloge);
                    dummyRightCataloge.remove();
                }
            }

            var button = document.getElementById("click");

            button.onclick = function () {
                Load();
            }


        }
    });
});