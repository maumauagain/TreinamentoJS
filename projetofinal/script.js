let baseUrl = 'http://localhost:3000/v1';
let contacts = [];
let contato = [];
var favorito = 0;
var observacao = 0;



function isFavorite(){
	if($('#btnfav').val() == 0){
		$('#btnfav').val(1);
	}
	else {
		$('#btnfav').val(0);
	}

}


function isObs(){
	
	if($('#btnobs').val() == 0){
		$('#btnobs').val(1);
	}
	else {
		$('#btnobs').val(0);
	}
}


let handleGetContacts = (data) => {
    contacts = data;

    if (!contacts) return false;

    criaHtml();

    
  
}

let handleError = (err) => {
    console.log(`Erro ao buscar contatos --> status: ${err.status}`)
    $('.circular-spinner').hide()
}


function criaHtml(){
	contacts.forEach((contact) => {
        let html = `
        			<div class="contatos">
						<ul class="contactlist">
								<!-- Contatos -->
							<button type="button" onclick="deleteFunc('${contact._id}')" style="float: right;margin-left: 5px; margin-top: 5px; color: black;">
		  						<span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
							</button>

							<a href="editar.html?id=${contact._id}"><button type="button" style="float: right; margin-top: 5px;">
		  						<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
							</button></a>

						
		                    <li class="data-list-item">
		                        <p class="paragraph" class="title">Nome: ${contact.firstName}</p>                        
		                    </li>
		                    <li class="data-list-item">
		                    	<p class="paragraph">Email: ${contact.email}</p>
		                    </li>

		                    <li class="data-list-item">
		                    	<p class="paragraph">Sexo: ${contact.sexo}</p>
		                    </li> 

		                    <li class="data-list-item">
		                    	<p class="paragraph">Endereço: ${contact.address}</p>
		                    </li>

		                    <li class="data-list-item">
		                    	<p class="paragraph">Observações: ${contact.comments}</p>
		                    </li>  

		                    <div style="float: right; padding-top: 38px; margin-right: 5px;" class="footer">

				                <span class="${(contact.favorito == 1) ? 'glyphicon glyphicon-star' : null} "></span>
			                	<span class="${(contact.observacao == 1) ? 'glyphicon glyphicon-info-sign' : null}" aria-hidden="true"></span>
		
		               		</div>
		                </ul>


					
					</div>



                `
                
         $('#contatos').append(html);

    })
}


function deleteFunc(id){

	var resp = confirm("Você deseja remover esse contato?");

	if(resp == true){

	    $.ajax({
			method: 'DELETE',
	    	url: `${baseUrl}/contacts/${id}`,
	    	contentType: 'application/json',
	    	success: function(response){
	    		console.log({response});
	    		if(response.success == true){
	    			//var i = contacts.findIndex((contact)=>{ return contact._id == id});
	    			//console.log(i);
	    			//var elementosRemovidos = contacts.splice(i, 1);
	    			window.location.reload();
	    			//criaHtml();
	    		}

	    	},
	    	error: removeError
	    })

	    
	}

}

let removeError = (err) => {
	 console.log(`Erro ao remover contato --> status: ${err.status}`)
}

$(document).ready(function(){
	const param = window.location.href.split('?');
	const id = param[1] ? param[1].split('=')[1] : null

	alteraFunc(id)
	
	function alteraFunc(id){
		//let nome = document.getElementById('nome');
		//let email = document.getElementById('email');
		//let sexo = document.getElementById('sexo');
		//let endereco = document.getElementById('endereco');
		//let obs = document.getElementById('obs');
		if(!id) return

		$.ajax({
        method: 'GET',
        url: `${baseUrl}/contacts/${id}`,
        success: function(response){
        	console.log(response);
        	$('#newnome').val(`${response.firstName}`);
        	$('#newemail').val(response.email);
        	$('#newsexo').val(response.sexo);
        	$('#newendereco').val(response.address);
        	$('#newobs').val(response.comments);
        	$('#btnfav').val(response.favorito);
        	$('#btnobs').val(response.observacao);
        },
        error: function(request, status, error){
        	console.log(request.responseText);
        }
    })

    $("#novoform").submit(function(event){
    	console.log("Editar !!!");
    	event.preventDefault();

    	var nome = $('#newnome').val();
    	var email = $('#newemail').val();
		var sexo = $('#newsexo').val();
		var endereco = $('#newendereco').val();
		var obs = $('#newobs').val();
		var favorito = $('#btnfav').val();
		var observacao = $('#btnobs').val();

		$.ajax({
			method: 'PUT',
			url: `${baseUrl}/contacts/${id}`,
			data: {
				firstName: nome,
				email: email,
				sexo: sexo,
				address: endereco,
				comments: obs,
				favorito: favorito,
				observacao: observacao

			},
			success: function(edit){
				alert("Atualização Efetuada");
					$('#newnome').val('');
					$('#newemail').val('');
					$('#newsexo').val('');
					$('#newendereco').val('');
					$('#newobs').val('');
					$('#favbt').val(0);
					$('#obsbt').val(0);
					window.location.reload();
			},
			error: function(request, status, error){
				console.log(request.editText);
			}
		})
    })

	
	}




	$("#meuform").submit(function(event) {
		console.log('form chamado!');
		event.preventDefault();
		var nome = $('#nome').val();
		var email = $('#email').val();
		var sexo = $('#sexo').val();
		var endereco = $('#endereco').val();
		var obs = $('#obs').val();
		var favbt = $('#btnfav').val();
		var obsbt = $('#btnobs').val();

		$.ajax({
			method: 'POST',
			url: `${baseUrl}/contacts`,
			data: {
				firstName: nome,
				email: email,
				sexo: sexo,
				address: endereco,
				comments: obs,
				favorito: favbt,
				observacao: obsbt
			},
			success: function(response){
					alert("Cadastro efetuado");

					$('#nome').val('');
					$('#email').val('');
					$('#sexo').val('');
					$('#endereco').val('');
					$('#obs').val('');
					$('#favbt').val(0);
					$('#obsbt').val(0);
					window.location.reload();


			},
			error: function(request, status, error){
				console.log(request.responseText);
			}
		})
	});


	 $.ajax({
        method: 'GET',
        url: `${baseUrl}/contacts`,
        success: handleGetContacts,
        error: handleError
    })

    $('#button').click(function() {
  		var doc = new jsPDF();
  		doc.fromHTML($('#contatos').get(0), 10,10, {
  			'width': 500
  		});
   			doc.save("contatos.pdf");
  		
	});


});

