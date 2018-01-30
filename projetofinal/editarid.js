document.getElementById('formulario').addEventListener('submit', pesquisarContato);

function pesquisarContato(e){
	var contatoPesquisa = document.getElementById('pesquisar').value;
	buscarContatos(contatoPesquisa);
	e.preventDefault();
}

function buscarContatos(contatoPesquisa){
	axios.get('http://localhost:3000/v1/contacts/?firstName=' + contatoPesquisa)
  .then(function (response) {
    console.log(response);
    var contact = response.data;
    var mostrarContatos = '';

    for(var i = 0; i < contact.length; i++){
    	mostrarContatos += `
    		<div class="col-md-6 col-sm-6 col-xs-12 col-lg-6">
						<ul class="data-list" data-list="contacts" style="height: 200px;">
								<!-- Contatos -->

							<a href="editar.html?id=${contact[i]._id}"><button type="button" style="float: right;">
		  						<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
							</button></a>

						
		                    <li class="data-list-item">
		                        <span class="title">Nome: ${contact[i].firstName}</span>                        
		                    </li>
		                    <li class="data-list-item">
		                    	<span class="title">Email: ${contact[i].email}</span>
		                    </li>

		                    <li class="data-list-item">
		                    	<span class="title">Sexo: ${contact[i].sexo}</span>
		                    </li> 

		                    <li class="data-list-item">
		                    	<span class="title">Endereço: ${contact[i].address}</span>
		                    </li>

		                    <li class="data-list-item">
		                    	<span class="title">Observações: ${contact[i].comments}</span>
		                    </li>  

		                    <div style="float: right; padding-top: 65px;" class="footer">

				                <span class="${(contact[i].favorito == 1) ? 'glyphicon glyphicon-star' : null} "></span>
			                	<span class="${(contact[i].observacao == 1) ? 'glyphicon glyphicon-info-sign' : null}" aria-hidden="true"></span>
		
		               		</div>
		                </ul>


					
					</div>
    	`;
    	
    }
    document.getElementById('contatos1').innerHTML = mostrarContatos;
  })
  .catch(function (error) {
    console.log(error);
  });
}